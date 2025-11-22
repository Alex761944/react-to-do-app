import "./Droppable.css";
import { useDroppable } from "@dnd-kit/core";

export function Droppable({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}
