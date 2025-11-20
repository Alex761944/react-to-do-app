import "./Modal.css";
import { Button } from "../Button/Button";
import { X } from "lucide-react";
import { useRef } from "react";

export function Modal({ triggerIcon, triggerText, children }) {
  const dialogRef = useRef();

  return (
    <div className="Modal">
      <Button icon={triggerIcon} onClick={() => dialogRef.current.showModal()}>
        {triggerText}
      </Button>

      <dialog className="Modal__Dialog" ref={dialogRef}>
        <div className="Modal__Content">
          <div className="Modal__Close">
            <Button icon={<X />} onClick={() => dialogRef.current.close()} />
          </div>
          {children}
        </div>
      </dialog>
    </div>
  );
}
