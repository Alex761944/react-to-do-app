import "./ToDo.css";

function handleChange(event) {
  console.log(event);
}

export function ToDo({ isDone, text }) {
  return (
    <div className="ToDo">
      <input type="checkbox" checked={isDone} onChange={handleChange} />
      <p>{text}</p>
    </div>
  );
}
