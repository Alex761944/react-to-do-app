import "./Button.css";

export function Button({ icon, variant, onClick, children }) {
  const classes = `Button${variant === "icon" ? " Button--Icon" : ""}`;

  return (
    <button className={classes} onClick={onClick}>
      {icon && icon}
      {children}
    </button>
  );
}
