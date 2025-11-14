import "./Text.css";

export function Text({ as: Tag = "p", variant, children }) {
  const classes = ["Text", variant ? `Text--${variant}` : ""].join(" ");

  return <Tag className={classes}>{children}</Tag>;
}
