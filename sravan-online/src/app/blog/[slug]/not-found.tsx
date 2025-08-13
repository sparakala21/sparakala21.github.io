import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
      <p className="text-gray-600 mb-6">
        Sorry, we couldn't find the blog post you're looking for.
      </p>
      <Link 
        href="/blog" 
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back to Blog
      </Link>
    </div>
  );
}