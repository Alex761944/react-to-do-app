import "./ToDo.css";

export function ToDo({ isDone, text, onToggle }) {
  return (
    <div className={`ToDo ${isDone ? "ToDo--done" : ""}`}>
      <input type="checkbox" checked={isDone} onChange={onToggle} />
      <p>{text}</p>
    </div>
  );
}
