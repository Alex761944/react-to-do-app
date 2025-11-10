import "./Text.css";

export function Text({ as, variant, children }) {
  const TextComponent = as;

  const classes = ["Text", `Text--${variant}`].join(" ");

  return <TextComponent className={classes}>{children}</TextComponent>;
}
