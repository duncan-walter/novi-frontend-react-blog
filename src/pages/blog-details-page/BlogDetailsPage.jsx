import './BlogDetailsPage.css';
import blogs from '../../constants/data.json';
import formatDate from "../../helpers/formatDate.js";

import {Link, useParams} from 'react-router-dom';

function BlogDetailsPage() {
  const {id} = useParams();
  const blog = blogs.find(blog => blog.id.toString() === id);

  // Ik wilde de gebruiker graag navigeren naar de not found pagina indien het id niet voorkomt:
  // if (!blogs.some(blog => blog.id === id)) { useNavigate('/not-found'); }
  // Dit kon ik alleen niet in de body van deze BlogDetailsPage functie kwijt en ook niet in de return statement.
  return (
    <div className="blog-details">
      <h1>{blog.title} ({blog.readTime} minuten)</h1>
      <h2>{blog.subtitle}</h2>
      <span>Geschreven door {blog.author} op {formatDate(blog.created)}</span>
      <p>{blog.content}</p>
      <p>{blog.comments} reacties - {blog.shares} keer gedeeld</p>
      <Link to="/blogs">&lt; Terug naar de overzichtspagina</Link>
    </div>
  );
}

export default BlogDetailsPage;