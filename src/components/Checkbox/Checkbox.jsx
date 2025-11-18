import { Check } from "lucide-react";
import "./Checkbox.css";

export function Checkbox({ checked, onChange }) {
  return (
    <label className="Checkbox">
      <input
        className="u-Hidden"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />

      {checked && <Check size={20} strokeWidth={4} />}
    </label>
  );
}
