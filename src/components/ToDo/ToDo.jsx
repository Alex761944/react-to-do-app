import "./ToDo.css";
import { Button } from "../Button/Button";
import { useState, useEffect, useRef } from "react";
import { Text } from "..//Text/Text";

export function ToDo({
  isDone,
  text,
  onToggle,
  isInEditMode,
  handleSave,
  handleTrashcanClick,
  handleEditClick,
}) {
  const [inputValue, setInputValue] = useState(text);

  useEffect(() => {
    setInputValue(text);
  }, [text]);

  useEffect(() => {
    if (isInEditMode) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isInEditMode]);

  const inputRef = useRef();

  return (
    <div className={`ToDo ${isDone ? "ToDo--Done" : ""}`}>
      <label className="ToDo__Content">
        <input type="checkbox" checked={isDone} onChange={onToggle} />
        {isInEditMode ? (
          <form onSubmit={() => handleSave(inputValue)}>
            <input
              className="ToDo__Input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              ref={inputRef}
            />
          </form>
        ) : isDone ? (
          <Text as="del">{text}</Text>
        ) : (
          <Text as="p">{text}</Text>
        )}
      </label>

      <div className="ToDo__Actions">
        {isInEditMode ? (
          <Button
            icon="checkmark"
            variant="icon"
            onClick={() => handleSave(inputValue)}
          />
        ) : (
          <Button icon="edit" variant="icon" onClick={handleEditClick} />
        )}

        <Button icon="trashcan" variant="icon" onClick={handleTrashcanClick} />
      </div>
    </div>
  );
}
