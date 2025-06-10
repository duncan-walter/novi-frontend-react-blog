import './NewBlogPage.css';

import CalculateReadTime from "../../helpers/calculateReadTime.js";

import {useForm} from 'react-hook-form';
import {useNavigate} from "react-router-dom";

import TextFormControl from "../../components/form-controls/text-form-control/TextFormControl.jsx";

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
      <TextFormControl
        id="newBlogFormTitle"
        labelText="Titel"
        controlName="title"
        required={true}
        register={register}
        error={errors.title}
      />

      <TextFormControl
        id="newBlogFormSubTitle"
        labelText="Subtitel"
        controlName="subtitle"
        required={true}
        register={register}
        error={errors.subtitle}
      />

      <TextFormControl
        id="newBlogFormAuthor"
        labelText="Auteur"
        controlName="author"
        required={true}
        register={register}
        error={errors.author}
      />

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