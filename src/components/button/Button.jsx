import './Button.css';

function Button({text, type = "button", handleClick = () => {}}) {
  return (<>
    <button
      className="button-base"
      type={type}
      onClick={handleClick}
    >
      {text}
    </button>
  </>);
}

export default Button;