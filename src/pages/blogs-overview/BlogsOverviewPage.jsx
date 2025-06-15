import './BlogsOverviewPage.css';

import {useEffect, useState} from "react";
import axios from "axios";

import BlogListItem from "../../components/blog-list-item/BlogListItem.jsx";

function BlogsOverviewPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, toggleLoading] = useState(false);
  const [error, setError] = useState('');

  // Normaal zal ik deze url gebruiken, maar ik had cors problemen.
  // De oplossing was om een proxy te gebruiken zodat de cors problemen niet voorkomen omdat de communicatie server > server is.
  // Alle calls naar /api/... worden door de proxy opgevangen en doorgestuurd naar de APIBaseURL zoals die hieronder staat.
  // Dit staat geconfigureerd in vite.config.js.
  const APIBaseURL = 'https://novi-backend-api-wgsgz.ondigitalocean.app/api';
  const APIProjectIDHeader = {'Novi-Education-Project-Id': 'ec0bf4cc-4e94-4807-8041-d95b0731722b'};

  async function getBlogs() {
    setError('');
    toggleLoading(true);

    try {
      const response = await axios.get('/api/blogs', {
        headers: {
          ...APIProjectIDHeader
        }
      });

      setBlogs(response.data);
    } catch (e) {
      setError('Er ging iets fout tijdens het ophalen van de blogs!');
    } finally {
      toggleLoading(false);
    }
  }

  // Update blog is voor nu uitgecommentarieerd omdat de getBlogById functie verhuist is.
  // async function updateBlogById(id) {
  //   try {
  //     // Voor de opdracht wordt nu de eerste blog gebruikt.
  //     const firstBlog = await getBlogById(1);
  //     firstBlog.subtitle = 'Updated!';
  //
  //     const response = await axios.put(`/api/blogs/${firstBlog.id}`, firstBlog, {
  //       headers: {
  //         ...APIProjectIDHeader
  //       }
  //     });
  //
  //     console.log(`Blog id: ${response.data.id} is succesvol geüpdatet!`);
  //     console.log(response);
  //   } catch (e) {
  //     console.error(`Blog kon niet worden geüpdatet!`)
  //     console.error(e);
  //   }
  // }

  useEffect(() => {
    // Ik kan dit niet awaiten in useEffect?
    // Wat is de nette manier om dit asynchroon te doen?
    getBlogs();
  }, []);

  return (
    <div className="inner-container">
      {loading ? (
        <div>Alle blogs worden nu opgehaald...</div>
      ) : (<>
        <h1>Bekijk alle {blogs.length} blogs op het platform</h1>

        {error ? (
          <span className="error-message">{error}</span>
        ) : (
          <div className="blog-overview">
            {blogs.map(blog => <BlogListItem key={blog.id} blog={blog}/>)}
          </div>
        )}
      </>)}
    </div>
  );
}

export default BlogsOverviewPage;