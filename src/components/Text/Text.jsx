import "./Text.css";

export function Text({ as: Tag = "p", variant, className = "", children }) {
  const classes = ["Text", variant ? `Text--${variant}` : "", className]
    .filter(Boolean)
    .join(" ");

  return <Tag className={classes}>{children}</Tag>;
}
