import './Button.css';

function Button({text, type = "button", variant = "primary", handleClick = () => {}}) {
  return (<>
    <button
      className={`button-base button-${variant}`}
      type={type}
      onClick={handleClick}
    >
      {text}
    </button>
  </>);
}

export default Button;