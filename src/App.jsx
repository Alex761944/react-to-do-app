import { useEffect, useState } from "react";
import "./App.css";
import { ToDo } from "./components/ToDo/ToDo";
import { ToDoList } from "./components/ToDoList/ToDoList";

const sortOptions = [
  { label: "Date Ascending", value: "date-ascending" },
  { label: "Date Descending", value: "date-descending" },
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

  function addToDo() {
    setToDos((prev) => [
      ...prev,
      { isDone: false, text: ``, isInEditMode: true, createdAt: new Date() },
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

  function saveToDo(index, newText) {
    setToDos((prevToDos) =>
      prevToDos.map((toDo, i) =>
        i === index ? { ...toDo, text: newText, isInEditMode: false } : toDo
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

      <ToDoList>
        {toDos.sort(sortFunction).map((toDo, index) => (
          <li key={index}>
            <ToDo
              isDone={toDo.isDone}
              text={toDo.text}
              onToggle={() => toggleToDo(index)}
              handleTrashcanClick={() => deleteToDo(index)}
              handleSave={(newText) => saveToDo(index, newText)}
              handleEditClick={() => editToDo(index)}
              isInEditMode={toDo.isInEditMode}
            />
          </li>
        ))}
      </ToDoList>

      <button className="Button" onClick={addToDo}>
        Add To Do
      </button>
    </>
  );
}

export default App;
