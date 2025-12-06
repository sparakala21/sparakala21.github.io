'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Types for the embeddings data
interface EmbeddingNode {
  id: string;
  name: string;
  x: number;
  y: number;
  z: number;
  [key: string]: any;
}

interface EmbeddingsData {
  metadata: {
    method: string;
    num_nodes: number;
    dimensions: number;
  };
  nodes: EmbeddingNode[];
}

const ArtistVisualization: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const hoveredRef = useRef<number | null>(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  const [data, setData] = useState<EmbeddingsData | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<'tsne' | 'pca' | 'umap'>('pca');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<EmbeddingNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<EmbeddingNode | null>(null);
  const [debugInfo, setDebugInfo] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  const createPointsFromEmbeddings = (embeddingsData: EmbeddingsData, scene: THREE.Scene) => {
    // Remove old points if they exist
    if (pointsRef.current) {
      scene.remove(pointsRef.current);
      pointsRef.current.geometry.dispose();
      (pointsRef.current.material as THREE.Material).dispose();
    }

    const nodeCount = embeddingsData.nodes.length;
    
    // Create geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    const sizes = new Float32Array(nodeCount);

    // Find bounds for normalization
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;

    embeddingsData.nodes.forEach(node => {
      minX = Math.min(minX, node.x);
      maxX = Math.max(maxX, node.x);
      minY = Math.min(minY, node.y);
      maxY = Math.max(maxY, node.y);
      minZ = Math.min(minZ, node.z);
      maxZ = Math.max(maxZ, node.z);
    });

    // Scale factor to fit the visualization
    const scaleFactor = 40; // Adjust this to change the spread of points

    // Fill positions and colors from embeddings data
    embeddingsData.nodes.forEach((node, i) => {
      const i3 = i * 3;

      // Normalize and scale positions
      positions[i3] = ((node.x - minX) / (maxX - minX) - 0.5) * scaleFactor * 2;
      positions[i3 + 1] = ((node.y - minY) / (maxY - minY) - 0.5) * scaleFactor * 2;
      positions[i3 + 2] = ((node.z - minZ) / (maxZ - minZ) - 0.5) * scaleFactor * 2;

      // Color based on position for visual variety
      const normalizedX = (node.x - minX) / (maxX - minX);
      const normalizedY = (node.y - minY) / (maxY - minY);
      const normalizedZ = (node.z - minZ) / (maxZ - minZ);

      // Create gradient colors based on position
      colors[i3] = 0.3 + normalizedX * 0.7; // R
      colors[i3 + 1] = 0.2 + normalizedY * 0.5; // G
      colors[i3 + 2] = 0.5 + normalizedZ * 0.5; // B

      // Vary sizes slightly
      sizes[i] = 2.0 + Math.random() * 1.5;
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Store node data for interaction
    geometry.userData = { nodes: embeddingsData.nodes };

    // Create custom shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: window.devicePixelRatio },
        highlightIndex: { value: -1 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vHighlight;
        uniform float time;
        uniform float pixelRatio;
        uniform float highlightIndex;

        void main() {
          vColor = color;
          vHighlight = (highlightIndex >= 0.0 && abs(float(gl_VertexID) - highlightIndex) < 0.5) ? 1.0 : 0.0;
          
          vec3 pos = position;
          
          // Subtle animation
          float animScale = 0.2;
          pos.x += sin(time * 0.5 + position.y * 0.1) * animScale;
          pos.y += cos(time * 0.5 + position.x * 0.1) * animScale;
          pos.z += sin(time * 0.5 + position.z * 0.1) * animScale;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          float finalSize = size;
          if (vHighlight > 0.5) {
            finalSize *= 2.0;
          }
          
          gl_PointSize = finalSize * pixelRatio * (100.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vHighlight;

        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(gl_PointCoord, center);
          
          if (dist > 0.5) discard;
          
          float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
          
          vec3 finalColor = vColor;
          if (vHighlight > 0.5) {
            finalColor = vec3(1.0, 1.0, 0.0); // Yellow for highlighted
            alpha = 1.0;
          }
          
          vec3 glowColor = finalColor * (1.0 + (1.0 - dist) * 0.5);
          
          gl_FragColor = vec4(glowColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const points = new THREE.Points(geometry, material);
    pointsRef.current = points;
    scene.add(points);

    return points;
  };

  const loadData = async (method: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/music_data/3d/embeddings_3d_${method}_large.json`);
      
      if (!response.ok) {
        throw new Error(`Failed to load ${method} embeddings`);
      }

      const embeddingsData: EmbeddingsData = await response.json();
      setData(embeddingsData);
      setDebugInfo(`Loaded ${embeddingsData.nodes.length} nodes using ${method.toUpperCase()}`);
      
      // Create visualization if scene is ready
      if (sceneRef.current) {
        createPointsFromEmbeddings(embeddingsData, sceneRef.current);
      }
    } catch (err) {
      setError(`Error loading data: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setDebugInfo('Failed to load embeddings data');
    } finally {
      setIsLoading(false);
    }
  };

  const initScene = () => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.Fog(0x0a0a0a, 50, 200);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 60);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Add grid for reference
    const gridHelper = new THREE.GridHelper(80, 20, 0x444444, 0x222222);
    gridHelper.position.y = -40;
    scene.add(gridHelper);

    // Mouse controls
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseDown = (event: MouseEvent) => {
      isMouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      // Update mouse position for raycasting
      if (mountRef.current) {
        const rect = mountRef.current.getBoundingClientRect();
        mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      }

      // Handle rotation
      if (!isMouseDown || !cameraRef.current) return;

      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;

      const spherical = new THREE.Spherical();
      spherical.setFromVector3(cameraRef.current.position);
      spherical.theta -= deltaX * 0.01;
      spherical.phi += deltaY * 0.01;
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

      cameraRef.current.position.setFromSpherical(spherical);
      cameraRef.current.lookAt(0, 0, 0);

      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleWheel = (event: WheelEvent) => {
      if (!cameraRef.current) return;
      const scale = event.deltaY > 0 ? 1.1 : 0.9;
      cameraRef.current.position.multiplyScalar(scale);
    };

    const handleClick = (event: MouseEvent) => {
      if (!mountRef.current || !cameraRef.current || !pointsRef.current) return;

      const rect = mountRef.current.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );

      raycasterRef.current.setFromCamera(mouse, cameraRef.current);
      const intersects = raycasterRef.current.intersectObject(pointsRef.current);

      if (intersects.length > 0) {
        const index = intersects[0].index;
        if (index !== undefined && data) {
          const node = data.nodes[index];
          setSelectedNode(node);
        }
      }
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('wheel', handleWheel);
    renderer.domElement.addEventListener('click', handleClick);

    // Cleanup function
    return () => {
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('wheel', handleWheel);
      renderer.domElement.removeEventListener('click', handleClick);
    };
  };

  const animate = () => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    // Update time uniform for shader animation
    if (pointsRef.current && pointsRef.current.material) {
      const material = pointsRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = performance.now() * 0.001;
    }

    // Check for hover
    if (pointsRef.current && data) {
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObject(pointsRef.current);

      if (intersects.length > 0) {
        const index = intersects[0].index;
        if (index !== undefined) {
          const node = data.nodes[index];
          setHoveredNode(node);
          const material = pointsRef.current.material as THREE.ShaderMaterial;
          material.uniforms.highlightIndex.value = index;
        }
      } else {
        setHoveredNode(null);
        const material = pointsRef.current.material as THREE.ShaderMaterial;
        material.uniforms.highlightIndex.value = -1;
      }
    }

    // Gentle rotation
    if (pointsRef.current && !hoveredNode) {
      pointsRef.current.rotation.y += 0.0005;
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationIdRef.current = requestAnimationFrame(animate);
  };

  const handleResize = () => {
    if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const cleanup = initScene();
    animate();
    loadData(selectedMethod);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      if (cleanup) cleanup();
    };
  }, [isMounted]);

  // Load new data when method changes
  useEffect(() => {
    if (isMounted && sceneRef.current) {
      loadData(selectedMethod);
    }
  }, [selectedMethod]);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        Loading 3D visualization...
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-gray-900">
      {/* 3D Canvas Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Controls */}
      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white max-w-sm">
        <h2 className="text-xl font-bold mb-3">Artist Embeddings Visualization</h2>
        
        {/* Method Selector */}
        <div className="mb-3">
          <label className="text-sm text-gray-300 block mb-1">Embedding Method:</label>
          <div className="flex gap-2">
            {(['pca', 'tsne', 'umap'] as const).map(method => (
              <button
                key={method}
                onClick={() => setSelectedMethod(method)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  selectedMethod === method
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {method.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Info Display */}
        <div className="text-sm space-y-1 text-gray-300">
          <p>• Drag to rotate</p>
          <p>• Scroll to zoom</p>
          <p>• Click to select artist</p>
          {data && <p>• {data.nodes.length} artists loaded</p>}
          {debugInfo && <p className="text-xs text-gray-400">{debugInfo}</p>}
        </div>

        {/* Loading/Error States */}
        {isLoading && (
          <div className="mt-3 text-yellow-400 text-sm">Loading embeddings...</div>
        )}
        {error && (
          <div className="mt-3 text-red-400 text-sm">{error}</div>
        )}
      </div>

      {/* Hover Info */}
      {hoveredNode && (
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
          <p className="font-semibold">{hoveredNode.name}</p>
          <p className="text-xs text-gray-400">ID: {hoveredNode.id}</p>
        </div>
      )}

      {/* Selected Node Info */}
      {selectedNode && (
        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white max-w-md">
          <h3 className="font-bold mb-2">Selected Artist</h3>
          <p className="font-semibold">{selectedNode.name}</p>
          <div className="text-sm text-gray-300 mt-2">
            <p>ID: {selectedNode.id}</p>
            <p>Position: ({selectedNode.x.toFixed(3)}, {selectedNode.y.toFixed(3)}, {selectedNode.z.toFixed(3)})</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistVisualization;