
// Fetching gata
export async function fetchBlogPosts() {
    const res = await fetch('/api/blogs');
    if (!res.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    return res.json();
  }
  