import './BlogDetailsPage.css';

import {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";

import BlogDetails from "../../components/blog-details/BlogDetails.jsx";

function BlogDetailsPage() {
  const [blog, setBlog] = useState(undefined);
  const [error, setError] = useState('');

  const {id} = useParams();

  // Omdat deze header vaker gebruikt wordt op verschillende plekken in dit project is het mooi om deze ergens globaal neer te zetten.
  const APIProjectIDHeader = {'Novi-Education-Project-Id': 'ec0bf4cc-4e94-4807-8041-d95b0731722b'};

  async function getBlogById(id) {
    setError('')

    try {
      const response = await axios.get(`/api/blogs/${id}`, {
        headers: {
          ...APIProjectIDHeader
        }
      });

      setBlog(response.data)
    } catch (e) {
      setError(`Er ging iets fout tijdens het ophalen van de blog! (id: ${id})`)
    }
  }

  useEffect(() => {
    getBlogById(id);
  }, []);

  return (
    <div className="blog-details inner-container">
      {error ? (
        <span className='error-message'>{error}</span>
      ) : (
        blog && <BlogDetails blog={blog} />
      )}
    </div>
  );
}

export default BlogDetailsPage;