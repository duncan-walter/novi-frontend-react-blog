import './NewBlogPage.css';

import CalculateReadTime from "../../helpers/calculateReadTime.js";

import {useForm} from 'react-hook-form';
import {useNavigate} from "react-router-dom";

import TextFormControl from "../../components/form-controls/text-form-control/TextFormControl.jsx";
import TextareaFormControl from "../../components/form-controls/textarea-form-control/TextareaFormControl.jsx";
import Button from "../../components/button/Button.jsx";

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

      <Button type="submit" text="Toevoegen" />
    </form>
  </>);
}

export default NewBlogPage;