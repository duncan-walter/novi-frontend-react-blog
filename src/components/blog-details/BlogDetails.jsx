import './BlogDetails.css';
import formatDate from "../../helpers/formatDate.js";

import {Link} from "react-router-dom";

import {CaretLeftIcon, TimerIcon} from "@phosphor-icons/react";

function BlogDetails({blog}) {
  return (
    <div className="blog-details">
      <h1>{blog.title}</h1>
      <h2>{blog.subtitle}</h2>
      <p>Geschreven door {blog.author} op {formatDate(blog.created)}</p>
      <span className="blog-details__read-time">
        <TimerIcon/>{blog.readTime} {blog.readTime > 1 ? "minuten" : "minuut"} lezen
      </span>
      <p>{blog.content}</p>
      <p>{blog.comments} reacties - {blog.shares} keer gedeeld</p>
      <Link to="/blogs">
        {/* Ik geef de icon geen size mee zodat hij meeschaalt met de fontsize */}
        <CaretLeftIcon/>
        Terug naar de overzichtspagina</Link>
    </div>
  );
}

export default BlogDetails;