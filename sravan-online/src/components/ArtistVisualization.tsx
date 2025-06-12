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
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const pointsRef = useRef<THREE.Points>();
  const labelsRef = useRef<THREE.Group>();
  const animationIdRef = useRef<number>();

  const [data, setData] = useState<EmbeddingsData | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<'tsne' | 'pca' | 'umap'>('pca');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<EmbeddingNode | null>(null);
  const [showLabels, setShowLabels] = useState(false);

  // Load embeddings data
  const loadData = async (method: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // You'll need to place your JSON files in the public directory
      const response = await fetch(`music_data/3d/embeddings_3d_${method}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${method} embeddings`);
      }
      const embeddingsData: EmbeddingsData = await response.json();
      setData(embeddingsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      console.error('Error loading embeddings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize Three.js scene
  const initScene = () => {
    if (!mountRef.current) return;

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

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Labels group
    const labelsGroup = new THREE.Group();
    scene.add(labelsGroup);
    labelsRef.current = labelsGroup;

    // Mouse controls (basic rotation)
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

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('wheel', handleWheel);

    // Cleanup function
    return () => {
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('wheel', handleWheel);
    };
  };

  // Create visualization from data
  const createVisualization = (embeddingsData: EmbeddingsData) => {
    if (!sceneRef.current) return;

    // Clear existing points and labels
    if (pointsRef.current) {
      sceneRef.current.remove(pointsRef.current);
    }
    if (labelsRef.current) {
      labelsRef.current.clear();
    }

    const nodes = embeddingsData.nodes;
    
    // Create geometry and materials for points
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(nodes.length * 3);
    const colors = new Float32Array(nodes.length * 3);

    // Normalize positions to fit in view
    const maxCoord = Math.max(
      ...nodes.flatMap(node => [Math.abs(node.x), Math.abs(node.y), Math.abs(node.z)])
    );
    const scale = 30 / maxCoord;

    nodes.forEach((node, i) => {
      positions[i * 3] = node.x * scale;
      positions[i * 3 + 1] = node.y * scale;
      positions[i * 3 + 2] = node.z * scale;

      // Color based on position or you can use other attributes
      const hue = (node.x * scale + 30) / 60; // Normalize to 0-1
      const color = new THREE.Color().setHSL(hue, 0.7, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create points material
    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
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
    const sampledNodes = nodes.filter((_, i) => i % Math.max(1, Math.floor(nodes.length / 100)) === 0);
    
    sampledNodes.forEach(node => {
      // Create text sprite (simplified approach)
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
    const cleanup = initScene();
    animate();
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      cleanup?.();
      
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    loadData(selectedMethod);
  }, [selectedMethod]);

  useEffect(() => {
    if (data) {
      createVisualization(data);
    }
  }, [data, showLabels]);

  return (
    <div className="w-full h-screen bg-gray-900 relative">
      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 bg-gray-800 p-4 rounded-lg text-white">
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
          <div className="text-sm text-gray-300">
            <div>Method: {data.metadata.method}</div>
            <div>Nodes: {data.metadata.num_nodes}</div>
            <div>Dimensions: {data.metadata.dimensions}D</div>
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
        <div>🖱️ Drag to rotate</div>
        <div>🔄 Scroll to zoom</div>
      </div>

      {/* 3D Canvas Container */}
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};

export default ArtistVisualization;