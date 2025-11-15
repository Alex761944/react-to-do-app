import { toPascalCase } from "../../util/string";
import "./Text.css";

export function Text({ as: Tag = "p", variant, children, color }) {
  let classes = "Text";

  if (variant) {
    classes += ` Text--${toPascalCase(variant)}`;
  }

  if (color) {
    classes += ` Text--${color}`;
  }

  return <Tag className={classes}>{children}</Tag>;
}
