import './TextareaFormControl.css';

function TextareaFormControl({id, controlName, labelText, required, register, error, minLength = -1, maxLength = -1}) {
  return (<>
    <label htmlFor={id}>{labelText}:</label>
    <textarea
      id={id}
      rows="10" // Voor nu even lekker "hard coded"
      autoComplete="off"
      {...register(controlName, {
        required: {
          value: required,
          message: `${labelText} is verplicht.`
        },
        // Dit is een manier om conditioneel validatieregels toe te voegen.
        // Standaard zal deze niet worden toegevoegd omdat de standaardwaarde van de parameter op -1 staat.
        ...(minLength > -1 && {
          minLength: {
            value: minLength,
            message: `${labelText} moet minimaal ${minLength} karakters lang zijn.`
          }
        }),
        ...(maxLength > -1 && {
          maxLength: {
            value: maxLength,
            message: `${labelText} moet maximaal ${maxLength} karakters lang zijn.`
          }
        })
      })}
    />
    {error && <span className="error-message">{error.message}</span>}
  </>)
}

export default TextareaFormControl;