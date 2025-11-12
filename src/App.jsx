import { useEffect, useState } from "react";
import "./App.css";
import { ToDo } from "./components/ToDo/ToDo";
import { ToDoList } from "./components/ToDoList/ToDoList";
import { Text } from "./components/Text/Text";
import { Button } from "./components/Button/Button";

const sortOptions = [
  { label: "Date Ascending", value: "date-ascending" },
  { label: "Date Descending", value: "date-descending" },
];

export const priorityOptions = [
  {
    label: "High",
    value: "high",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Low",
    value: "low",
  },
];

function App() {
  const [toDos, setToDos] = useState(
    JSON.parse(localStorage.getItem("to-dos")) || []
  );

  useEffect(() => {
    localStorage.setItem("to-dos", JSON.stringify(toDos));
  }, [toDos]);

  const [selectedSortOption, setSelectedSortOption] = useState(
    localStorage.getItem("selected-sort-option") || "date-ascending"
  );

  useEffect(() => {
    localStorage.setItem("selected-sort-option", selectedSortOption);
  }, [selectedSortOption]);

  const [selectedFilters, setSelectedFilters] = useState(
    JSON.parse(localStorage.getItem("selected-filters")) || []
  );

  useEffect(() => {
    localStorage.setItem("selected-filters", JSON.stringify(selectedFilters));
  }, [selectedFilters]);

  function addToDo() {
    setToDos((prev) => [
      ...prev,
      {
        isDone: false,
        text: ``,
        isInEditMode: true,
        createdAt: new Date(),
        priority: "medium",
      },
    ]);
  }

  function toggleToDo(index) {
    setToDos((prevToDos) =>
      prevToDos.map((todo, i) => {
        if (i === index) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      })
    );
  }

  function saveToDo(index, newText, priority) {
    setToDos((prevToDos) =>
      prevToDos.map((toDo, i) =>
        i === index
          ? { ...toDo, text: newText, isInEditMode: false, priority: priority }
          : toDo
      )
    );
  }

  function editToDo(index) {
    setToDos((prevToDos) =>
      prevToDos.map((toDo, i) =>
        i === index ? { ...toDo, isInEditMode: true } : toDo
      )
    );
  }

  function deleteToDo(index) {
    const newToDos = toDos.filter((_, i) => {
      if (index === i) {
        return false;
      } else {
        return true;
      }
    });

    setToDos(newToDos);
  }

  function sortFunction(toDoA, toDoB) {
    if (selectedSortOption === "date-ascending") {
      return toDoA.createdAt > toDoB.createdAt ? 1 : -1;
    } else {
      return toDoA.createdAt < toDoB.createdAt ? 1 : -1;
    }
  }

  return (
    <>
      <Text as="h1" variant="HeadingLarge">
        To-Do List
      </Text>

      <Text as="h2" variant="HeadingSmall">
        Organize your tasks and stay productive.
      </Text>

      <div className="Navigation">
        <select
          value={selectedSortOption}
          onChange={(event) => {
            setSelectedSortOption(event.target.value);
          }}
        >
          {sortOptions.map((sortOption, index) => (
            <option key={index} value={sortOption.value}>
              {sortOption.label}
            </option>
          ))}
        </select>

        <div className="Navigation__Prioritys">
          {priorityOptions.map((priorityOption, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={priorityOption.value}
                checked={selectedFilters.includes(priorityOption.value)}
                onChange={(event) => {
                  const priority = event.target.value;
                  setSelectedFilters((prevFilters) => {
                    if (prevFilters.includes(priority)) {
                      return prevFilters.filter(
                        (filter) => filter !== priority
                      );
                    } else {
                      return [...prevFilters, priority];
                    }
                  });
                }}
              />
              <Text as="p">{priorityOption.label}</Text>
            </label>
          ))}
        </div>
      </div>

      <ToDoList>
        {toDos
          .filter(
            (todo) =>
              selectedFilters.length === 0 ||
              selectedFilters.includes(todo.priority)
          )
          .sort(sortFunction)
          .map((toDo, index) => (
            <li key={index}>
              <ToDo
                isDone={toDo.isDone}
                text={toDo.text}
                priority={toDo.priority}
                onToggle={() => toggleToDo(index)}
                handleTrashcanClick={() => deleteToDo(index)}
                handleSave={(newText, priority) =>
                  saveToDo(index, newText, priority)
                }
                handleEditClick={() => editToDo(index)}
                isInEditMode={toDo.isInEditMode}
              />
            </li>
          ))}
      </ToDoList>

      <Button onClick={addToDo}>Add To Do</Button>
    </>
  );
}

export default App;
