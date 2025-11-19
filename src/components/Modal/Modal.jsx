import "./Modal.css";
import { Button } from "../Button/Button";
import { X } from "lucide-react";

export function Modal({ modalRef, onClose, children }) {
  return (
    <dialog className="Modal" ref={modalRef}>
      <div className="Modal__Content">
        <div className="Modal__Close">
          <Button icon={<X />} variant="icon" onClick={onClose} />
        </div>
        {children}
      </div>
    </dialog>
  );
}
