import './BlogsOverviewPage.css';

import {useEffect, useState} from "react";
import axios from "axios";

import BlogListItem from "../../components/blog-list-item/BlogListItem.jsx";
import Button from "../../components/button/Button.jsx";

function BlogsOverviewPage() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');

  // Normaal zal ik deze url gebruiken, maar ik had cors problemen.
  // De oplossing was om een proxy te gebruiken zodat de cors problemen niet voorkomen omdat de communicatie server > server is.
  // Alle calls naar /api/... worden door de proxy opgevangen en doorgestuurd naar de APIBaseURL zoals die hieronder staat.
  // Dit staat geconfigureerd in vite.config.js.
  const APIBaseURL = 'https://novi-backend-api-wgsgz.ondigitalocean.app/api';
  const APIProjectIDHeader = {'Novi-Education-Project-Id': 'ec0bf4cc-4e94-4807-8041-d95b0731722b'};

  async function getBlogs() {
    setError('');

    try {
      const response = await axios.get('/api/blogs', {
        headers: {
          ...APIProjectIDHeader
        }
      });

      setBlogs(response.data);
    } catch (e) {
      setError('Er ging iets fout tijdens het ophalen van de blogs!');
    }
  }

  async function getBlogById(id) {
    try {
      const response = await axios.get(`/api/blogs/${id}`, {
        headers: {
          ...APIProjectIDHeader
        }
      });

      console.log(response.data);

      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  async function postBlog() {
    try {
      const blog = {
        'title': 'Wat gebruiker heeft ingevuld',
        'subtitle': 'Wat gebruiker heeft ingevuld',
        'content': 'Wat gebruiker heeft ingevuld, in dit geval meer dan 300 letters. Wat gebruiker heeft ingevuld, in dit geval meer dan 300 letters. Wat gebruiker heeft ingevuld, in dit geval meer dan 300 letters. Wat gebruiker heeft ingevuld, in dit geval meer dan 300 letters. Wat gebruiker heeft ingevuld, in dit geval meer dan 300 letters. Wat gebruiker heeft ingevuld, in dit geval meer dan 300 letters. Wat gebruiker heeft ingevuld, in dit geval meer dan 300 letters. Wat gebruiker heeft ingevuld, in dit geval meer dan 300 letters.',
        'author': 'Voornaam achternaam',
        'created': '2023-09-21T09:30:00Z',
        'readTime': 1,
        'comments': 0,
        'shares': 0
      }

      const response = await axios.post('/api/blogs', blog, {
        headers: {
          ...APIProjectIDHeader
        }
      });

      console.log(`Blog id: ${response.data.id} is succesvol toegevoegd!`);
      console.log(response);
    } catch (e) {
      console.error('Blog kon niet worden toegevoegd!');
      console.error(e);
    }
  }

  async function updateBlogById(id) {
    try {
      // Voor de opdracht wordt nu de eerste blog gebruikt.
      const firstBlog = await getBlogById(1);
      firstBlog.subtitle = 'Updated!';

      const response = await axios.put(`/api/blogs/${firstBlog.id}`, firstBlog, {
        headers: {
          ...APIProjectIDHeader
        }
      });

      console.log(`Blog id: ${response.data.id} is succesvol geüpdatet!`);
      console.log(response);
    } catch (e) {
      console.error(`Blog kon niet worden geüpdatet!`)
      console.error(e);
    }
  }

  async function deleteBlogById(id) {
    try {
      await axios.delete(`/api/blogs/${id}`, {
        headers: {
          ...APIProjectIDHeader
        }
      });

      console.log(`Blog (id: ${id}) is succesvol verwijdert!`);
    } catch (e) {
      console.error(`Blog (id: ${id}) kon niet worden verwijdert!`)
      console.error(e);
    }
  }

  useEffect(() => {
    // Ik kan dit niet awaiten in useEffect?
    // Wat is de nette manier om dit asynchroon te doen?
    getBlogs();
  }, []);

  return (
    <div className="inner-container">
      {/* Debugging controls */}
      <div>
        <Button text="Voeg hardcoded blog toe" handleClick={async () => {
          await postBlog()
        }}/>
        <Button text="Update blog" handleClick={async () => {
          await updateBlogById(1)
        }}/>
        <Button text="Delete blog" handleClick={async () => {
          await deleteBlogById(19)
        }}/>
      </div>

      <h1>Bekijk alle {blogs.length} blogs op het platform</h1>

      {error ? (
        <span className="error-message">{error}</span>
      ) : (
        <div className="blog-overview">
          {blogs.map(blog => <BlogListItem key={blog.id} blog={blog}/>)}
        </div>
      )}
    </div>
  );
}

export default BlogsOverviewPage;