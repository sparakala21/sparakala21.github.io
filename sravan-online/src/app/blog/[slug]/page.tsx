import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostData, getAllPostSlugs } from '@/lib/posts';
import { Metadata } from 'next';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import { Container } from '@mui/material';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getPostData(params.slug);
    
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
      title: 'Post Not Found',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let postData;
  
  try {
    postData = await getPostData(params.slug);
  } catch (error) {
    notFound();
  }

  return (
    <Container
        sx={{
            bgcolor: '#f0ead6',
            minHeight: "calc(100vh - 64px)",
            py: 4,
            px: { xs: 2, sm: 3, md: 4 },
            position: 'relative'
        }}
    >

        <ResponsiveAppBar />
      <Link 
        href="/blog" 
        className="text-blue-600 hover:text-blue-800 hover:underline mb-6 inline-flex items-center"
      >
        ← Back to Blog
      </Link>
      
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            {postData.title}
          </h1>
          
          <div className="text-gray-600 mb-4">
            <time dateTime={postData.date} className="block">
              Published on {new Date(postData.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {postData.author && <p>By {postData.author}</p>}
          </div>
          
          {postData.tags && postData.tags.length > 0 && (
            <div className="mb-6">
              {postData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700 mr-2 mb-2"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>
        
        <div 
          className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
      </article>
    </Container>
  );
}