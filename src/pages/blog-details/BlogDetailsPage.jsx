import './BlogDetailsPage.css';
import formatDate from "../../helpers/formatDate.js";

import {useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom';
import axios from "axios";

import {CaretLeftIcon, TimerIcon} from "@phosphor-icons/react";

function BlogDetailsPage() {
  const [blog, setBlog] = useState({});
  const {id} = useParams();

  const APIProjectIDHeader = {'Novi-Education-Project-Id': 'ec0bf4cc-4e94-4807-8041-d95b0731722b'};

  async function getBlogById(id) {
    try {
      const response = await axios.get(`/api/blogs/${id}`, {
        headers: {
          ...APIProjectIDHeader
        }
      });

      setBlog(response.data)
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getBlogById(id);
  }, []);

  // Ik wilde de gebruiker graag navigeren naar de not found pagina indien het id niet voorkomt:
  // if (!blogs.some(blog => blog.id === id)) { useNavigate('/not-found'); }
  // Dit kon ik alleen niet in de body van deze BlogDetailsPage functie kwijt en ook niet in de return statement.
  return (
    // Ik twijfel of ik voor de details van een blog een apart component zal maken, of dat de pagina zelf hiervoor voldoende is.
    <div className="blog-details inner-container">
      <h1>{blog.title}</h1>
      <h2>{blog.subtitle}</h2>
      <p>Geschreven door {blog.author} op {formatDate(blog.created)}</p>
      <span className="read-time">
        <TimerIcon />{blog.readTime} {blog.readTime > 1 ? "minuten" : "minuut"} lezen
      </span>
      <p>{blog.content}</p>
      <p>{blog.comments} reacties - {blog.shares} keer gedeeld</p>
      <Link to="/blogs">
        {/* Ik geef de icon geen size mee zodat hij meeschaalt met de fontsize */}
        <CaretLeftIcon />
        Terug naar de overzichtspagina</Link>
    </div>
  );
}

export default BlogDetailsPage;