import './NewBlogPage.css';

import CalculateReadTime from "../../helpers/calculateReadTime.js";

import {useForm} from 'react-hook-form';
import {useNavigate} from "react-router-dom";

function NewBlogPage() {
  const {
    handleSubmit,
    formState: {
      errors
    },
    register
  } = useForm();
  const navigate = useNavigate();

  function handleFormSubmit(data) {
    const newBlog = {
      ...data,
      shares: 0,
      comments: 0,
      created: new Date().toISOString(),
      readTime: CalculateReadTime(data.content)
    }

    console.log(newBlog);

    navigate("/blogs");
  }

  return (<>
    <h1>Blog toevoegen</h1>
    <form className="new-blog-form" onSubmit={handleSubmit(handleFormSubmit)}>
      <label htmlFor="newBlogFormTitle">Titel:
        <input
          type="text"
          id="newBlogFormTitle"
          autoComplete="off"
          {...register("title", {
            required: {
              value: true,
              message: "Titel is verplicht"
            }
          })}
        />
      </label>
      {errors.title && <span className="error-message">{errors.title.message}</span>}

      <label htmlFor="newBlogFormSubTitle">Subtitel:
        <input
          type="text"
          id="newBlogSubTitle"
          autoComplete="off"
          {...register("subtitle", {
            required: {
              value: true,
              message: "Subtitel is verplicht"
            }
          })}
        />
      </label>
      {errors.subtitle && <span className="error-message">{errors.subtitle.message}</span>}

      <label htmlFor="newBlogFormAuthor">Auteur:
        <input
          type="text"
          id="newBlogFormAuthor"
          autoComplete="off"
          {...register("author", {
            required: {
              value: true,
              message: "Auteur is verplicht"
            }
          })}
        />
      </label>
      {errors.author && <span className="error-message">{errors.author.message}</span>}

      <label htmlFor="newBlogFormContent">Content:</label>
      <textarea
        id="newBlogFormContent"
        rows="5"
        autoComplete="off"
        {...register("content", {
          required: {
            value: true,
            message: "Content is verplicht"
          },
          minLength: {
            value: 300,
            message: "Content moet minimaal 300 karakters lang zijn"
          },
          maxLength: {
            value: 2000,
            message: "Content moet maximaal 2000 karakters lang zijn"
          }
        })}
      />
      {errors.content && <span className="error-message">{errors.content.message}</span>}

      <button type="submit">Toevoegen</button>
    </form>
  </>);
}

export default NewBlogPage;