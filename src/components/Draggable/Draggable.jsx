import "./Draggable.css";
import { useDraggable } from "@dnd-kit/core";

export function Draggable({ id, className, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      className={className}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}
