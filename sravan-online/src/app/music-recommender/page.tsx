"use client";

import { Typography, Container } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
// Type definitions
interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
}

interface EmbeddingMetadata {
  method: string;
  [key: string]: any;
}

interface EmbeddingData {
  nodes: Node[];
  metadata: EmbeddingMetadata;
}

type VisualizationMethod = 'tsne' | 'pca' | 'umap';

const EmbeddingVisualizer: React.FC = () => {
  const [embeddings, setEmbeddings] = useState<EmbeddingData | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<VisualizationMethod>('tsne');
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    loadEmbeddings(selectedMethod);
  }, [selectedMethod]);

  const loadEmbeddings = async (method: VisualizationMethod): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(`/music_data/embeddings_2d_${method}.json`);
      const data: EmbeddingData = await response.json();
      setEmbeddings(data);
    } catch (error) {
      console.error('Error loading embeddings:', error);
    } finally {
      setLoading(false);
    }
  };

  const drawVisualization = (): void => {
    if (!embeddings || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate bounds
    const nodes = embeddings.nodes;
    const xValues = nodes.map(n => n.x);
    const yValues = nodes.map(n => n.y);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    // Add padding
    const padding = 50;
    const xRange = xMax - xMin;
    const yRange = yMax - yMin;

    // Filter nodes based on search
    const filteredNodes = nodes.filter(node => 
      node.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Draw nodes
    filteredNodes.forEach(node => {
      // Scale coordinates to canvas
      const x = ((node.x - xMin) / xRange) * (width - 2 * padding) + padding;
      const y = ((node.y - yMin) / yRange) * (height - 2 * padding) + padding;

      // Draw point
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = hoveredNode === node.id ? '#ff6b6b' : '#4ecdc4';
      ctx.fill();

      // Draw label if hovered or if search matches
      if (hoveredNode === node.id || (searchTerm && node.name.toLowerCase().includes(searchTerm.toLowerCase()))) {
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.fillText(node.name, x + 6, y - 6);
      }
    });
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!embeddings) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const nodes = embeddings.nodes;
    const xValues = nodes.map(n => n.x);
    const yValues = nodes.map(n => n.y);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    const padding = 50;
    const xRange = xMax - xMin;
    const yRange = yMax - yMin;

    // Find closest node
    let closestNode: string | null = null;
    let minDistance = Infinity;

    nodes.forEach(node => {
      const x = ((node.x - xMin) / xRange) * (canvas.width - 2 * padding) + padding;
      const y = ((node.y - yMin) / yRange) * (canvas.height - 2 * padding) + padding;
      
      const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
      if (distance < minDistance && distance < 20) {
        minDistance = distance;
        closestNode = node.id;
      }
    });

    setHoveredNode(closestNode);
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedMethod(e.target.value as VisualizationMethod);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleMouseLeave = (): void => {
    setHoveredNode(null);
  };

  useEffect(() => {
    drawVisualization();
  }, [embeddings, hoveredNode, searchTerm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Loading embeddings...</div>
      </div>
    );
  }

  return (
    <Container
    sx={{ 
          bgcolor: '#f0ead6',
          minHeight: "calc(100vh - 64px)", // Adjust for AppBar height
          py: 4, // Vertical padding (top/bottom)
          px: { xs: 2, sm: 3, md: 4 }, // Responsive horizontal padding
          position: 'relative',
        }}>

    <ResponsiveAppBar />
      <Container
      sx={{
            display: 'flex',
            flexDirection: { xs: 'row', sm: 'row' }, // Stack on small screens, row on larger
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap', // Allow wrapping
            gap: 1, // Space between cards
            padding: 2, // Padding around the container
            backgroundColor: '#ffffff', // Background color
            borderRadius: 2, // Rounded corners
            boxShadow: 1, // Shadow for depth
          }}>
        <Typography variant="h1">
            Artist Collaboration Network
        </Typography>
        <Typography variant="h3" >
          Using the power of Dimensionality Reduction, we can visualize the relationships between artists based on other similar artists. I'll have a writeup ready soon.
        </Typography>
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Visualization Method:</label>
            <select 
              value={selectedMethod} 
              onChange={handleMethodChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="tsne">t-SNE</option>
              <option value="pca">PCA</option>
              <option value="umap">UMAP</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Search Artists:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Type artist name..."
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {embeddings && (
          <div className="text-sm text-gray-600 mb-4">
            Showing {embeddings.nodes.length} artists using {embeddings.metadata.method} dimensionality reduction
          </div>
        )}


      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={1000}
          height={600}
          onMouseMove={handleCanvasMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full cursor-crosshair"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>

          </Container>

      {hoveredNode && embeddings && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold">
            {embeddings.nodes.find(n => n.id === hoveredNode)?.name}
          </h3>
          <p className="text-sm text-gray-600">
            ID: {hoveredNode}
          </p>
        </div>
      )}
    </Container>
  );
};

export default EmbeddingVisualizer;