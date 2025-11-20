import { Check } from "lucide-react";
import { Icon } from "../Icon/Icon";
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

      {checked && <Icon lucideIcon={<Check size={20} strokeWidth={4} />} />}
    </label>
  );
}
