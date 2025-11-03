import "./ToDo.css";

export function ToDo({ isDone, text, onToggle, isInEditMode }) {
  return (
    <label className={`ToDo ${isDone ? "ToDo--Done" : ""}`}>
      <input type="checkbox" checked={isDone} onChange={onToggle} />
      {isInEditMode ? <input type="text" /> : <p>{text}</p>}
    </label>
  );
}
