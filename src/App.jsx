import { useEffect, useState } from "react";
import "./App.css";
import { ToDo } from "./components/ToDo/ToDo";
import { ToDoList } from "./components/ToDoList/ToDoList";

function App() {
  const [toDos, setToDos] = useState(
    JSON.parse(localStorage.getItem("to-dos")) || []
  );

  useEffect(() => {
    localStorage.setItem("to-dos", JSON.stringify(toDos));
  }, [toDos]);

  function addToDo() {
    setToDos((prev) => [
      ...prev,
      { isDone: false, text: ``, isInEditMode: true },
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

  function deleteToDo(index) {
    const newToDos = toDos.filter((toDo, i) => {
      if (index === i) {
        return false;
      } else {
        return true;
      }
    });

    setToDos(newToDos);
  }

  return (
    <>
      <ToDoList>
        {toDos.map((toDo, index) => (
          <ToDo
            key={index}
            isDone={toDo.isDone}
            text={toDo.text}
            onToggle={() => toggleToDo(index)}
            handleTrashcanClick={() => deleteToDo(index)}
            isInEditMode={toDo.isInEditMode}
          />
        ))}
      </ToDoList>

      <button className="Button" onClick={addToDo}>
        Add To Do
      </button>
    </>
  );
}

export default App;
