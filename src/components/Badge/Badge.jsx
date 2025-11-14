import { Text } from "../Text/Text";
import "./Badge.css";

export function Badge({ highlightColor, text, hasActiveState = false }) {
  let classes = "Badge";
  if (hasActiveState) {
    classes += " Badge--HasActiveState";
  }

  return (
    <div
      className={classes}
      style={{ "--badge-highlight-color": highlightColor }}
    >
      <Text>{text}</Text>
    </div>
  );
}
