// src/components/MDXContent.tsx
'use client';
import { Box, Typography } from '@mui/joy';
import { MDXRemote } from 'next-mdx-remote';
import { mdxComponents, ChessBoard } from './mdx/index';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useState, useEffect } from 'react';

interface MDXContentProps {
  mdxSource: MDXRemoteSerializeResult;
}

export default function MDXContent({ mdxSource }: MDXContentProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render anything on the server
  if (!isClient) {
    return <Box>Loading...</Box>;
  }

  console.log('Available mdxComponents:', Object.keys(mdxComponents));

  const components = {
    h1: (props: any) => <Typography level="h1" sx={{ mb: 3, mt: 4, fontWeight: 'bold' }} {...props} />,
    h2: (props: any) => <Typography level="h2" sx={{ mb: 3, mt: 4, fontWeight: 'bold' }} {...props} />,
    h3: (props: any) => <Typography level="h3" sx={{ mb: 3, mt: 4, fontWeight: 'bold' }} {...props} />,
    h4: (props: any) => <Typography level="h4" sx={{ mb: 3, mt: 4, fontWeight: 'bold' }} {...props} />,
    p: (props: any) => <Typography level="body-lg" sx={{ mb: 3, lineHeight: 1.7 }} {...props} />,
    a: (props: any) => (
      <Typography
        component="a"
        sx={{
          color: 'primary.500',
          textDecoration: 'underline',
          '&:hover': { color: 'primary.700' }
        }}
        {...props}
      />
    ),
    blockquote: (props: any) => (
      <Box
        component="blockquote"
        sx={{
          mb: 3,
          pl: 2,
          borderLeft: '4px solid',
          borderColor: 'divider',
          fontStyle: 'italic',
        }}
        {...props}
      />
    ),
    code: (props: any) => (
      <Box
        component="code"
        sx={{
          backgroundColor: 'background.level1',
          px: 0.5,
          py: 0.25,
          borderRadius: 'sm',
          fontSize: '0.875em',
        }}
        {...props}
      />
    ),
    pre: (props: any) => (
      <Box
        component="pre"
        sx={{
          backgroundColor: 'background.level1',
          p: 2,
          borderRadius: 'md',
          overflow: 'auto',
          mb: 3,
        }}
        {...props}
      />
    ),
    Chessboard: ChessBoard,
    ...mdxComponents,
  };

  return (
    <Box
      sx={{
        fontSize: 'lg',
        lineHeight: 1.7,
        color: 'text.primary',
        maxWidth: 'none',
      }}
    >
      <MDXRemote {...mdxSource} components={components} />
    </Box>
  );
}