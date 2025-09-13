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
  const sceneRef = useRef<THREE.Scene>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const labelsRef = useRef<THREE.Group>(null);
  const animationIdRef = useRef<number>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());

  const [data, setData] = useState<EmbeddingsData | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<'tsne' | 'pca' | 'umap'>('pca');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(false);
  const [selectedNode, setSelectedNode] = useState<EmbeddingNode | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  // Generate sample data for testing
  const generateSampleData = (): EmbeddingsData => {
    const nodes: EmbeddingNode[] = [];
    const numNodes = 100;
    
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        id: `node_${i}`,
        name: `Artist ${i}`,
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 20,
      });
    }
    
    return {
      metadata: {
        method: 'sample',
        num_nodes: numNodes,
        dimensions: 3
      },
      nodes
    };
  };

  // Load embeddings data
  const loadData = async (method: string) => {
    setIsLoading(true);
    setError(null);
    setDebugInfo('Loading data...');
    
    try {
      // First try to load from file
      const response = await fetch(`/music_data/3d/embeddings_3d_${method}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${method} embeddings - using sample data instead`);
      }
      const embeddingsData: EmbeddingsData = await response.json();
      setData(embeddingsData);
      setDebugInfo(`Loaded ${embeddingsData.nodes.length} nodes from file`);
    } catch (err) {
      // Fallback to sample data
      console.warn('Using sample data:', err);
      const sampleData = generateSampleData();
      setData(sampleData);
      setError('Using sample data - place JSON files in public/music_data/3d/');
      setDebugInfo(`Generated ${sampleData.nodes.length} sample nodes`);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize Three.js scene
  const initScene = () => {
    if (!mountRef.current) return;

    setDebugInfo('Initializing scene...');

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 50);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights (not needed for points, but good to have)
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Labels group
    const labelsGroup = new THREE.Group();
    scene.add(labelsGroup);
    labelsRef.current = labelsGroup;
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
      if (!isMouseDown || !cameraRef.current) return;

      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;

      // Rotate camera around origin
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
      if (!rendererRef.current || !cameraRef.current || !sceneRef.current || !pointsRef.current || !data) {
        return;
      }

      const rect = rendererRef.current.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.params.Points = { threshold: 3.0 };
      raycasterRef.current.setFromCamera(mouse, cameraRef.current);

      const intersects = raycasterRef.current.intersectObject(pointsRef.current);
      
      if (intersects.length > 0) {
        const intersection = intersects[0];
        const index = intersection.index;
        
        if (index !== undefined && data.nodes[index]) {
          const clickedNode = data.nodes[index];
          setSelectedNode(clickedNode);
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

  // Create visualization from data
  const createVisualization = (embeddingsData: EmbeddingsData) => {
    if (!sceneRef.current) {
      return;
    }


    // Clear existing points and labels
    if (pointsRef.current) {
      sceneRef.current.remove(pointsRef.current);
      pointsRef.current.geometry.dispose();
      if (Array.isArray(pointsRef.current.material)) {
        pointsRef.current.material.forEach(material => material.dispose());
      } else {
        pointsRef.current.material.dispose();
      }
    }
    if (labelsRef.current) {
      labelsRef.current.clear();
    }

    const nodes = embeddingsData.nodes;
    
    if (nodes.length === 0) {
      return;
    }

    // Create geometry and materials for points
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(nodes.length * 3);
    const colors = new Float32Array(nodes.length * 3);

    // Find the range of coordinates for normalization
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;

    nodes.forEach(node => {
      minX = Math.min(minX, node.x);
      maxX = Math.max(maxX, node.x);
      minY = Math.min(minY, node.y);
      maxY = Math.max(maxY, node.y);
      minZ = Math.min(minZ, node.z);
      maxZ = Math.max(maxZ, node.z);
    });

    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;
    const rangeZ = maxZ - minZ || 1;
    const maxRange = Math.max(rangeX, rangeY, rangeZ);
    const scale = 30 / maxRange;

    setDebugInfo(`Coordinate ranges: X(${minX.toFixed(2)} to ${maxX.toFixed(2)}), Y(${minY.toFixed(2)} to ${maxY.toFixed(2)}), Z(${minZ.toFixed(2)} to ${maxZ.toFixed(2)}), scale: ${scale.toFixed(2)}`);

    nodes.forEach((node, i) => {
      positions[i * 3] = node.x * scale;
      positions[i * 3 + 1] = node.y * scale;
      positions[i * 3 + 2] = node.z * scale;

      // Color based on normalized position 
      const hue = ((node.x - minX) / rangeX);
      const color = new THREE.Color().setHSL(hue, 0.7, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create points material with larger size for visibility
    const material = new THREE.PointsMaterial({
      size: 5.0, // Increased from 2.0
      vertexColors: true,
      transparent: true,
      opacity: 0.9, // Increased opacity
      sizeAttenuation: false, // Points maintain constant size regardless of distance
    });

    // Create points mesh
    const points = new THREE.Points(geometry, material);
    sceneRef.current.add(points);
    pointsRef.current = points;


    // Create labels if enabled
    if (showLabels && labelsRef.current) {
      createLabels(nodes, scale);
    }
  };

  // Create text labels for nodes
  const createLabels = (nodes: EmbeddingNode[], scale: number) => {
    if (!labelsRef.current) return;

    // Sample nodes to avoid too many labels
    const sampledNodes = nodes.filter((_, i) => i % Math.max(1, Math.floor(nodes.length / 50)) === 0);
    
    sampledNodes.forEach(node => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return;

      canvas.width = 256;
      canvas.height = 64;
      context.fillStyle = 'rgba(0, 0, 0, 0.7)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = 'white';
      context.font = '16px Arial';
      context.textAlign = 'center';
      context.fillText(node.name.substring(0, 20), canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      
      sprite.position.set(
        node.x * scale,
        node.y * scale + 2,
        node.z * scale
      );
      sprite.scale.set(4, 1, 1);
      
      labelsRef.current?.add(sprite);
    });
  };

  // Animation loop
  const animate = () => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationIdRef.current = requestAnimationFrame(animate);
  };

  // Handle window resize
  const handleResize = () => {
    if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
    
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
  };

  // Effects
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const cleanup = initScene();
    animate();
    
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      cleanup?.();
      
      if (rendererRef.current && mountRef.current && rendererRef.current.domElement.parentNode) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    loadData(selectedMethod);
  }, [selectedMethod, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    if (data) {
      createVisualization(data);
    }
  }, [data, showLabels, isMounted]);

  // Don't render on server
  if (!isMounted) {
    return (
      <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading 3D visualization...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-900 relative">
      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 bg-gray-800 p-4 rounded-lg text-white max-w-xs">
        <h2 className="text-lg font-bold mb-4">Artist Collaboration Network</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Dimensionality Reduction Method:
          </label>
          <select 
            value={selectedMethod} 
            onChange={(e) => setSelectedMethod(e.target.value as 'tsne' | 'pca' | 'umap')}
            className="bg-gray-700 text-white p-2 rounded w-full"
            disabled={isLoading}
          >
            <option value="pca">PCA</option>
            <option value="tsne">t-SNE</option>
            <option value="umap">UMAP</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
              className="mr-2"
            />
            Show Labels
          </label>
        </div>

        {data && (
          <div className="text-sm text-gray-300 mb-4">
            <div>Method: {data.metadata.method}</div>
            <div>Nodes: {data.metadata.num_nodes}</div>
            <div>Dimensions: {data.metadata.dimensions}D</div>
          </div>
        )}

        {selectedNode && (
          <div className="bg-gray-700 p-3 rounded mb-4">
            <h3 className="font-semibold text-sm mb-1">Selected Artist:</h3>
            <div className="text-sm">
              <div>Name: {selectedNode.name}</div>
              {selectedNode.genre && <div>Genre: {selectedNode.genre}</div>}
            </div>
          </div>
        )}

        {debugInfo && (
          <div className="text-xs text-blue-300 mb-2 bg-gray-700 p-2 rounded">
            Debug: {debugInfo}
          </div>
        )}

        {isLoading && (
          <div className="text-blue-400">Loading embeddings...</div>
        )}

        {error && (
          <div className="text-red-400 text-sm">{error}</div>
        )}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 z-10 bg-gray-800 p-3 rounded-lg text-white text-sm">
        <div>Drag to rotate</div>
        <div>Scroll to zoom</div>
        <div>Click points to select</div>
      </div>

      {/* 3D Canvas Container */}
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};

export default ArtistVisualization;