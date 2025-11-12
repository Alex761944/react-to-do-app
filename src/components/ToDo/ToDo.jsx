import "./ToDo.css";
import { Button } from "../Button/Button";
import { useState, useEffect, useRef } from "react";
import { Text } from "..//Text/Text";
import { SquarePen, CheckSquare, Trash2 } from "lucide-react";
import { priorityOptions } from "../../App";

export function ToDo({
  text,
  priority,
  isDone,
  isInEditMode,
  onToggle,
  handleSave,
  handleTrashcanClick,
  handleEditClick,
}) {
  const [inputValue, setInputValue] = useState(text);
  const [currentPriority, setCurrentPriority] = useState(priority);

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

  let indicatorColor = null;
  if (priority === "high") {
    indicatorColor = "var(--danger)";
  } else if (priority === "medium") {
    indicatorColor = "var(--warning)";
  } else if (priority === "low") {
    indicatorColor = "var(--success)";
  }

  return (
    <div className={`ToDo ${isDone ? "ToDo--Done" : ""}`}>
      {isInEditMode ? (
        <select
          value={currentPriority}
          onChange={(event) => setCurrentPriority(event.target.value)}
        >
          {priorityOptions.map((priorityOption, index) => (
            <option key={index} value={priorityOption.value}>
              {priorityOption.label}
            </option>
          ))}
        </select>
      ) : (
        <div
          className="ToDo__PriorityIndicator"
          style={{ "--indicator-color": indicatorColor }}
        ></div>
      )}

      <label className="ToDo__Content">
        <input type="checkbox" checked={isDone} onChange={onToggle} />
        {isInEditMode ? (
          <form onSubmit={() => handleSave(inputValue, currentPriority)}>
            <input
              className="ToDo__Input"
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
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
            icon={<CheckSquare color="var(--success)" />}
            variant="icon"
            onClick={() => handleSave(inputValue, currentPriority)}
          />
        ) : (
          <Button
            icon={<SquarePen color="var(--warning)" />}
            variant="icon"
            onClick={handleEditClick}
          />
        )}

        <Button
          icon={<Trash2 color="var(--danger)" />}
          variant="icon"
          onClick={handleTrashcanClick}
        />
      </div>
    </div>
  );
}
