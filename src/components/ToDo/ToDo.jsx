import "./ToDo.css";
import { Button } from "../Button/Button";
import { useState } from "react";

export function ToDo({
  isDone,
  text,
  onToggle,
  isInEditMode,
  onTextChange,
  handleCheckmarkClick,
  handleTrashcanClick,
  handleEditClick,
}) {
  const [inputValue, setInputValue] = useState(text);

  return (
    <div className={`ToDo ${isDone ? "ToDo--Done" : ""}`}>
      <input type="checkbox" checked={isDone} onChange={onToggle} />
      {isInEditMode ? (
        <input
          className="ToDoInput"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : (
        <p>{text}</p>
      )}

      {isInEditMode && (
        <Button
          icon="checkmark"
          variant="icon"
          onClick={() => handleCheckmarkClick(inputValue)}
        />
      )}

      <Button icon="edit" variant="icon" onClick={handleEditClick} />
      <Button icon="trashcan" variant="icon" onClick={handleTrashcanClick} />
    </div>
  );
}
