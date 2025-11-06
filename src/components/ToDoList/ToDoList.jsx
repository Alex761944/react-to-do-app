import "./ToDoList.css";

export function ToDoList({ children }) {
  return <ul className="ToDoList u-NoList">{children}</ul>;
}
