import { useState } from "react";
import "./App.css";
import { ToDo } from "./components/ToDo/ToDo";

function App() {
  const [toDos, setToDos] = useState([]);

  function addToDo() {
    setToDos((prev) => [
      ...prev,
      { isDone: false, text: `New ToDo #${prev.length + 1}` },
    ]);
  }

  function toggleToDo(index) {
    setToDos((prev) =>
      prev.map((todo, i) =>
        i === index ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  }

  return (
    <>
      {toDos.map((toDo, index) => (
        <ToDo
          key={index}
          isDone={toDo.isDone}
          text={toDo.text}
          onToggle={() => toggleToDo(index)}
        />
      ))}

      <button onClick={addToDo}>Add To Do</button>
    </>
  );
}

export default App;
