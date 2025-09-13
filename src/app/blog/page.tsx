//src/app/blog/page.tsx
import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts';
import { Metadata } from 'next';
import { Box, Typography, Stack, Chip } from '@mui/joy';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest blog posts and updates',
};

export default async function BlogPage() {
  const allPostsData = getSortedPostsData();
  
  return (
    <Box
      sx={{
        backgroundColor: '#32131c',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fdfdfd",
          width: '960px',
          minHeight: '100vh',
          px: { xs: 2, sm: 3, md: 4 },
          py: 4,
        }}
      >
        {allPostsData.length === 0 ? (
          <Typography level="body-md" sx={{ color: 'text.tertiary' }}>
            No blog posts available yet.
          </Typography>
        ) : (
          <Stack spacing={3}>
            {allPostsData.map(({ slug, date, title, excerpt, author, tags }) => (
              <Box 
                key={slug} 
                component="article" 
                sx={{ 
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  pb: 3
                }}
              >
                <Link href={`/blog/${slug}`} style={{ textDecoration: 'none' }}>
                  <Typography 
                    level="h2" 
                    sx={{ 
                      mb: 1,
                      '&:hover': { color: 'primary.500' },
                      transition: 'color 0.2s ease',
                      cursor: 'pointer'
                    }}
                  >
                    {title}
                  </Typography>
                </Link>
               
                <Box sx={{ mb: 2 }}>
                  <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
                    <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
                    {author && <span> • By {author}</span>}
                  </Typography>
                </Box>
               
                {tags && tags.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                      {tags.map((tag: boolean | Key | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined) => (
                        <Chip
                          key={String(tag)}
                          variant="soft"
                          size="sm"
                          sx={{ fontSize: '0.75rem' }}
                        >
                          #{tag}
                        </Chip>
                      ))}
                    </Stack>
                  </Box>
                )}
               
                <Typography level="body-md" sx={{ mb: 2, color: 'text.primary' }}>
                  {excerpt}
                </Typography>
               
                <Link
                  href={`/blog/${slug}`}
                  style={{
                    textDecoration: 'none',
                    color: 'var(--joy-palette-primary-500)',
                    fontWeight: 500,
                  }}
                >
                  <Typography 
                    level="body-md" 
                    sx={{ 
                      color: 'primary.500',
                      fontWeight: 'md',
                      '&:hover': { 
                        color: 'primary.700',
                        textDecoration: 'underline' 
                      }
                    }}
                  >
                    Read more →
                  </Typography>
                </Link>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}