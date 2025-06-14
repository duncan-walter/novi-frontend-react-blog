import './NewBlogPage.css';

import CalculateReadTime from "../../helpers/calculateReadTime.js";

import {useState} from "react";
import {useForm} from 'react-hook-form';
import {Link} from "react-router-dom";
import axios from 'axios';

import TextFormControl from "../../components/form-controls/text-form-control/TextFormControl.jsx";
import TextareaFormControl from "../../components/form-controls/textarea-form-control/TextareaFormControl.jsx";
import Button from "../../components/button/Button.jsx"

function NewBlogPage() {
  const {
    handleSubmit,
    formState: {
      errors
    },
    register
  } = useForm();
  const [createdBlogId, setCreatedBlogId] = useState('');
  const [error, setError] = useState('');

  const APIProjectIDHeader = {'Novi-Education-Project-Id': 'ec0bf4cc-4e94-4807-8041-d95b0731722b'};

  async function handleFormSubmit(data) {
    const newBlog = {
      ...data,
      shares: 0,
      comments: 0,
      created: new Date().toISOString(),
      readTime: CalculateReadTime(data.content)
    }

    await postBlog(newBlog);
  }

  async function postBlog(blog) {
    setError('');

    try {
      const response = await axios.post('/api/blogs', blog, {
        headers: {
          ...APIProjectIDHeader
        }
      });

      setCreatedBlogId(response.data.id);
    } catch (e) {
      setError('Er ging iets mis tijdens het opslaan van de blog! Probeer het opnieuw.');
    }
  }

  return (
    <div className="new-blog inner-container">
      <h1>Blog toevoegen</h1>
      {createdBlogId ? (
        <div className="new-blog__success">
          <span>🎉De blogpost is succesvol toegevoegd. Je kunt deze <Link to={`/blog/${createdBlogId}`}>hier</Link> bekijken.🎉</span>
        </div>
      ) : (
        <div className="new-blog__container">
          {error && <span className="error-message">{error}</span>}

          <form className="new-blog__form" onSubmit={handleSubmit(handleFormSubmit)}>
            <TextFormControl
              id="newBlogFormTitle"
              controlName="title"
              labelText="Titel"
              required={true}
              register={register}
              error={errors.title}
            />

            <TextFormControl
              id="newBlogFormSubTitle"
              controlName="subtitle"
              labelText="Subtitel"
              required={true}
              register={register}
              error={errors.subtitle}
            />

            <TextFormControl
              id="newBlogFormAuthor"
              controlName="author"
              labelText="Auteur"
              required={true}
              register={register}
              error={errors.author}
            />

            <TextareaFormControl
              id="newBlogFormContent"
              controlName="content"
              labelText="Content"
              required={true}
              minLength={300}
              maxLength={2000}
              register={register}
              error={errors.content}
            />

            <Button type="submit" text="Toevoegen"/>
          </form>
        </div>
      )}
    </div>
  )
    ;
}

export default NewBlogPage;