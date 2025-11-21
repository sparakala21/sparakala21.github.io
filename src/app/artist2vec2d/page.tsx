"use client";

import { 
  Typography, 
  Container, 
  Box, 
  Select, 
  Option, 
  FormLabel, 
  FormControl,
  Card,
  CircularProgress,
  Sheet
} from '@mui/joy';
import React, { useState, useEffect, useRef } from 'react';

// Type definitions
interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
}

interface EmbeddingMetadata {
  method: string;
  [key: string]: unknown;
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    loadEmbeddings(selectedMethod);
  }, [selectedMethod]);

  const loadEmbeddings = async (method: VisualizationMethod): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(`/music_data/${method}-embeddings.json`);
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

    // Draw nodes
    nodes.forEach(node => {
      // Scale coordinates to canvas
      const x = ((node.x - xMin) / xRange) * (width - 2 * padding) + padding;
      const y = ((node.y - yMin) / yRange) * (height - 2 * padding) + padding;

      // Draw point
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = '#4ecdc4';
      ctx.fill();
    });
  };

  const handleMethodChange = (
    _event: React.SyntheticEvent | null,
    newValue: VisualizationMethod | null,
  ): void => {
    if (newValue) {
      setSelectedMethod(newValue);
    }
  };

  useEffect(() => {
    drawVisualization();
  }, [embeddings]);

  if (loading) {
    return (
      <Container
        sx={{ 
          bgcolor: 'background.surface',
          minHeight: "calc(100vh - 64px)",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress size="lg" />
          <Typography level="body-lg">Loading embeddings...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      sx={{ 
        bgcolor: 'background.body',
        minHeight: "calc(100vh - 64px)",
        py: 4,
        px: { xs: 2, sm: 3, md: 4 },
        position: 'relative',
      }}
    >
      
      <Sheet
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          p: 3,
          borderRadius: 'md',
          boxShadow: 'sm',
          bgcolor: 'background.surface',
        }}
      >
        <Typography level="h1" textAlign="center">
          Artist Collaboration Network
        </Typography>
        
        <Typography level="body-lg" textAlign="center" sx={{ maxWidth: '800px' }}>
          Using the power of Dimensionality Reduction, we can visualize the relationships 
          between artists based on other similar artists. I&apos;ll have a writeup ready soon.
        </Typography>

        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <FormLabel>Visualization Method</FormLabel>
            <Select
              value={selectedMethod}
              onChange={handleMethodChange}
              variant="outlined"
            >
              <Option value="tsne">t-SNE</Option>
              <Option value="pca">PCA</Option>
              <Option value="umap">UMAP</Option>
            </Select>
          </FormControl>
        </Box>

        {embeddings && (
          <Typography level="body-sm" color="neutral">
            Showing {embeddings.nodes.length} artists using {embeddings.metadata.method} dimensionality reduction
          </Typography>
        )}

        <Card
          variant="outlined"
          sx={{ 
            overflow: 'hidden',
            width: '100%',
            maxWidth: '1000px',
          }}
        >
          <canvas
            ref={canvasRef}
            width={1000}
            height={600}
            style={{ 
              width: '100%', 
              height: 'auto',
              display: 'block'
            }}
          />
        </Card>
      </Sheet>
    </Container>
  );
};

export default EmbeddingVisualizer;