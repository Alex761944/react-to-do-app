import "./Text.css";

export function Text({ as, variant, color, children }) {
  const TextComponent = as;

  const classes = ["Text", `Text--${variant}`, `Text--${color}`].join(" ");

  return <TextComponent className={classes}>{children}</TextComponent>;
}
