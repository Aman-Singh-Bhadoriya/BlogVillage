interface BlogListProps {
    blogs: any[]; // Replace `any[]` with a proper Blog type
  }
  
  const BlogList = ({ blogs }: BlogListProps) => {
    return (
      <div>
        {blogs.map((blog) => (
          <div key={blog.id} className="mb-4 p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="text-gray-600">{blog.excerpt}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default BlogList;
  