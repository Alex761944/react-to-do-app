import "./Checkbox.css";

export function Checkbox(isChecked, onChange) {
  return <input type="checkbox" isChecked={isChecked} onChange={onChange} />;
}
