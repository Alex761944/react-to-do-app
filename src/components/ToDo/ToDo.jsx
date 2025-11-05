import "./ToDo.css";
import { Button } from "../Button/Button";

export function ToDo({
  isDone,
  text,
  onToggle,
  isInEditMode,
  handleCheckmarkClick,
  handleTrashcanClick,
  handleEditClick,
}) {
  return (
    <label className={`ToDo ${isDone ? "ToDo--Done" : ""}`}>
      <input type="checkbox" checked={isDone} onChange={onToggle} />
      {isInEditMode ? (
        <input className="ToDoInput" type="text" />
      ) : (
        <p>{text}</p>
      )}

      {isInEditMode && (
        <Button
          icon="checkmark"
          variant="icon"
          onClick={handleCheckmarkClick}
        />
      )}

      <Button icon="edit" variant="icon" onClick={handleEditClick} />
      <Button icon="trashcan" variant="icon" onClick={handleTrashcanClick} />
    </label>
  );
}
