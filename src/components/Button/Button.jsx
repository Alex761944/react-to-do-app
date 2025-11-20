import "./Button.css";

export function Button({ icon, onClick, children }) {
  let classes = "Button";

  if (icon) {
    classes += " Button--Icon";
  }

  return (
    <button className={classes} onClick={onClick}>
      {icon && icon}
      {children}
    </button>
  );
}
