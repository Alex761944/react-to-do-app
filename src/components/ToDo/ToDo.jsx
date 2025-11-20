import "./ToDo.css";
import { Button } from "../Button/Button";
import { useState, useEffect, useRef } from "react";
import { Text } from "../Text/Text";
import { SquarePen, CheckSquare, Trash2 } from "lucide-react";
import { priorityOptions } from "../../App";
import { Select } from "../Select/Select";
import { Checkbox } from "../Checkbox/Checkbox";
import { Icon } from "../Icon/Icon";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return date.toLocaleDateString("de-DE", options);
}

export function ToDo({
  text,
  priority,
  createdAt,
  isDone,
  isInEditMode,
  onToggle,
  handleSave,
  handleTrashcanClick,
  handleEditClick,
  handlePriorityChange,
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
      <label className="ToDo__Content">
        <Checkbox checked={isDone} onChange={onToggle} />
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

      {isInEditMode && (
        <Select
          value={currentPriority}
          options={priorityOptions}
          onChange={(event) => {
            setCurrentPriority(event.target.value);
            handlePriorityChange(inputValue, event.target.value);
          }}
        />
      )}

      <div
        className="ToDo__PriorityIndicator"
        style={{ "--indicator-color": indicatorColor }}
      ></div>

      <div className="ToDo__Actions">
        {isInEditMode ? (
          <Button
            icon={<Icon lucideIcon={<CheckSquare color="var(--success)" />} />}
            variant="icon"
            onClick={() => handleSave(inputValue, currentPriority)}
          />
        ) : (
          <Button
            icon={<Icon lucideIcon={<SquarePen color="var(--warning)" />} />}
            variant="icon"
            onClick={handleEditClick}
          />
        )}

        <Button
          icon={<Icon lucideIcon={<Trash2 color="var(--danger)" />} />}
          variant="icon"
          onClick={handleTrashcanClick}
        />
      </div>

      <div className="ToDo__CreatedAt">
        <Text variant="body-small" color="muted">
          {formatDate(createdAt)}
        </Text>
      </div>
    </div>
  );
}
