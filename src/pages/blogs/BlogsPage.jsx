import './BlogsPage.css';
import blogs from '../../constants/data.json';
import {Link} from "react-router-dom";

function BlogsPage() {
  return (<>
    <h1>Bekijk alle {blogs.length} blogs op het platform</h1>
    <div className="blog-overview">
      {blogs.map((blog) => { return (
        <div key={blog.id} className="blog-preview">
          <Link to={`/blog/${blog.id}`}>
            <h4>{blog.title} ({blog.author})</h4>
          </Link>
          <span>{blog.comments} reacties - {blog.shares} keer gedeeld</span>
        </div>
      );})}
    </div>
  </>);
}

export default BlogsPage;