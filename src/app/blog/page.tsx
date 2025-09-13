//src/app/blog/page.tsx
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import { Metadata } from 'next';
import ResponsiveAppBar from '@/components/ResponsiveAppBar'
import { Container, Grid } from '@mui/material';
import { Box, Typography } from '@mui/joy';
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
          <p className="text-gray-600">No blog posts available yet.</p>
        ) : (
          <Grid container direction="column" spacing={2}>
            {allPostsData.map(({ slug, date, title, excerpt, author, tags }) => (
              <article key={slug} className="border-b border-gray-200 pb-6">
                <Link href={`/blog/${slug}`} className="group">
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {title}
                  </h2>
                </Link>
               
                <div className="text-gray-600 mb-3 text-sm">
                  <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
                  {author && <span> • By {author}</span>}
                </div>
               
                {tags && tags.length > 0 && (
                  <div className="mb-3">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-700 mr-2 mb-1"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
               
                <p className="text-gray-800 mb-3">{excerpt}</p>
               
                <Link
                  href={`/blog/${slug}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}