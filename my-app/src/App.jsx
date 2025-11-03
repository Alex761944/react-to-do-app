import { useState } from "react";
import "./App.css";
import { ToDo } from "./components/ToDo/ToDo";

function App() {
  const [toDos, setToDos] = useState([
    {
      isDone: false,
      text: "First ToDo",
    },
    {
      isDone: true,
      text: "Second ToDo",
    },
  ]);

  return (
    <>
      {toDos.map((toDo, index) => {
        return <ToDo isDone={toDo.isDone} text={toDo.text} key={index} />;
      })}
    </>
  );
}

export default App;
