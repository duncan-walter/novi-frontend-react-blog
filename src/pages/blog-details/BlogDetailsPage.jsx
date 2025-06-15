import './BlogDetailsPage.css';

import {useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom';
import axios from "axios";

import BlogDetails from "../../components/blog-details/BlogDetails.jsx";
import Button from "../../components/button/Button.jsx";

function BlogDetailsPage() {
  const [blog, setBlog] = useState(undefined);
  const [loading, toggleLoading] = useState(false);
  const [error, setError] = useState('');
  const [blogDeleted, toggleBlogDeleted] = useState(false);

  const {id} = useParams();

  // Omdat deze header vaker gebruikt wordt op verschillende plekken in dit project is het mooi om deze ergens globaal neer te zetten.
  const APIProjectIDHeader = {'Novi-Education-Project-Id': 'ec0bf4cc-4e94-4807-8041-d95b0731722b'};

  async function getBlogById(id) {
    setError('')
    toggleLoading(true);

    try {
      const response = await axios.get(`/api/blogs/${id}`, {
        headers: {
          ...APIProjectIDHeader
        }
      });

      setBlog(response.data)
    } catch (e) {
      setError(`Er ging iets fout tijdens het ophalen van de blog! (id: ${id})`)
    } finally {
      toggleLoading(false);
    }
  }

  async function deleteBlogById(id) {
    try {
      await axios.delete(`/api/blogs/${id}`, {
        headers: {
          ...APIProjectIDHeader
        }
      });

      toggleBlogDeleted(true);
    } catch (e) {
      setError(`Er ging iets fout tijdens het verwijderen van de blog! Refresh de pagina en probeer het opnieuw!`);
    }
  }

  useEffect(() => {
    getBlogById(id);
  }, []);

  return (
    <div className="inner-container">
      {blogDeleted ? (
        <div className="blog-details__deleted">
          <span>👋De blogpost is succesvol verwijdert. Klik <Link to='/blogs'>hier</Link> om naar het overzicht te gaan.👋</span>
        </div>
      ) : (
        loading ? (
          <div>De details van de blog worden nu opgehaald...</div>
        ) : (
          error ? (
            <span className='error-message'>{error}</span>
          ) : (
            blog && <div className="blog-details-container">
              <BlogDetails blog={blog}/>
              <Button text="Verwijder blog" variant="danger" handleClick={() => deleteBlogById(id)}/>
            </div>
          )
        )
      )}
    </div>
  );
}

export default BlogDetailsPage;