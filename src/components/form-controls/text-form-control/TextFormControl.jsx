import './TextFormControl.css';

function TextFormControl({id, controlName, labelText, required, register, error }) {
  return(<>
    <label htmlFor={id}>
      {labelText}:
      <input
        type="text"
        id={id}
        autoComplete="off"
        {...register(controlName, {
          required: {
            value: required,
            message: `${labelText} is verplicht.`
          }
        })}
      />
    </label>
    {error && <span className="error-message">{error.message}</span>}
  </>)
}

export default TextFormControl;