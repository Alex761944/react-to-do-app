import "./Select.css";

export function Select({ value, options, onChange }) {
  return (
    <select className="Select" value={value} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
