import "./Filter.css";

export function Filter({ children, value, active, onChange }) {
  return (
    <label>
      <input
        className="u-Hidden"
        type="checkbox"
        value={value}
        checked={active}
        onChange={onChange}
      />

      {children}
    </label>
  );
}
