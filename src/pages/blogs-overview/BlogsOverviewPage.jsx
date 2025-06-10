import './BlogsOverviewPage.css';
import blogs from '../../constants/data.json';

import BlogListItem from "../../components/blog-list-item/BlogListItem.jsx";

function BlogsOverviewPage() {
  return (<>
    <h1>Bekijk alle {blogs.length} blogs op het platform</h1>
    <div className="blog-overview">
      {blogs.map(blog => <BlogListItem key={blog.id} blog={blog}/>)}
    </div>
  </>);
}

export default BlogsOverviewPage;