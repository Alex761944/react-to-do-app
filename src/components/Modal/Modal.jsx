import "./Modal.css";

export function Modal({ children }) {
  return (
    <dialog className="Modal" data-model="settings">
      <div className="Modal__Content">
        <div className="Modal__Close">
          <Button
            icon={<X />}
            variant="icon"
            onClick={() => {
              const dialog = document.querySelector('[data-modal="settings"]');
              dialog.close();
            }}
          />
        </div>
        {children}
      </div>
    </dialog>
  );
}
