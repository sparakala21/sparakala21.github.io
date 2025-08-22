import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostData, getAllPostSlugs } from '../../../lib/posts';
import { Metadata } from 'next';
import { Box, Container, Typography } from '@mui/joy';
import FormattedDate from '../../../components/FormattedDate';
import { useTheme } from '@mui/joy/styles'
interface ResourcePostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({
  params,
}: ResourcePostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getPostData(slug);
    
    return {
      title: post.title,
      description: post.excerpt,
      authors: post.author ? [{ name: post.author }] : undefined,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        authors: post.author ? [post.author] : undefined,
      },
    };
  } catch (error) {
    return {
      title: 'Resource Not Found',
    };
  }
}

export default async function ResourcePostPage({ params }: ResourcePostPageProps) {
  // const theme = useTheme()
  let postData;
  
  try {
    const { slug } = await params;
    postData = await getPostData(slug);
  } catch (error) {
    notFound();
  }

  return (
    <><Box sx={{
      maxWidth: '960px',
      margin: '0 auto',
      width: '100%',
      px: 2,
      justifyContent: 'center'
    }}>
      <Link
        href="/blog"
        className="text-blue-600 hover:text-blue-800 hover:underline mb-8 inline-flex items-center"
      >
        ← Back to Blog
      </Link>

      <article>
        <header className="mb-10">
          <Typography level='h1'>
            {postData.title}
          </Typography>

          <Typography level='body-lg'>
            <FormattedDate date={postData.date} className="block" />
            {postData.author && <p>By {postData.author}</p>}
          </Typography>

          {postData.tags && postData.tags.length > 0 && (
            <div className="mb-8">
              {postData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700 mr-2 mb-3 mt-3"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <Box
          sx={{
            fontSize: 'lg',
            lineHeight: 1.7,
            color: 'text.primary',
            maxWidth: 'none',
            
            '& h1, & h2, & h3, & h4, & h5, & h6': {
              fontWeight: 'bold',
              mb: 3,
              mt: 4,
              color: 'text.primary',
            },
            
            '& p': {
              mb: 3,
              color: 'text.primary',
            },
            
            '& a': {
              color: 'primary.500',
              textDecoration: 'underline',
              '&:hover': {
                color: 'primary.700',
              },
            },
            
            '& ul, & ol': {
              mb: 3,
            },
            
            '& blockquote': {
              mb: 3,
              pl: 2,
              borderLeft: '4px solid',
              borderColor: 'divider',
              fontStyle: 'italic',
            },
            
            // Image styles
            '& img': {
              my: 4,
              borderRadius: 'md',
              boxShadow: 'sm',
              maxWidth: '100%',
              height: 'auto',
            },
            
            '& code': {
              backgroundColor: 'background.level1',
              px: 0.5,
              py: 0.25,
              borderRadius: 'sm',
              fontSize: '0.875em',
            },
            
            '& pre': {
              backgroundColor: 'background.level1',
              p: 2,
              borderRadius: 'md',
              overflow: 'auto',
              mb: 3,
            },
          }}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
      </article>
    </Box><div className="pb-16"></div></>
  );
}