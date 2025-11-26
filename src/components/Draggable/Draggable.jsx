import "./Draggable.css";
import { useDraggable } from "@dnd-kit/core";

export function Draggable({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const transformStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return <>{children({ setNodeRef, listeners, attributes, transformStyle })}</>;
}
