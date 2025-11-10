import "./Button.css";
import { SquarePen, CheckSquare, Trash2 } from "lucide-react";

export function Button({ icon, variant, onClick, children }) {
  const icons = {
    edit: SquarePen,
    checkmark: CheckSquare,
    trashcan: Trash2,
  };

  const IconComponent = icons[icon];
  const classes = `Button${variant === "icon" ? " Button--Icon" : ""}`;

  return (
    <button className={classes} onClick={onClick}>
      {IconComponent && <IconComponent size={20} strokeWidth={2} />}
      {children}
    </button>
  );
}
