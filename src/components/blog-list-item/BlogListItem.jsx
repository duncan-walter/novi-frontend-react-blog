import './BlogListItem.css';

import {Link} from "react-router-dom";

function BlogListItem({blog}) {
  return (
    <div key={blog.id} className="blog-list-item">
      <Link to={`/blog/${blog.id}`}>
        <h4>{blog.title} ({blog.author})</h4>
      </Link>
      <span>{blog.comments} reacties - {blog.shares} keer gedeeld</span>
    </div>
  )
}

export default BlogListItem;