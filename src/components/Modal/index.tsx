type ModalProps = {
  open: boolean
  children: React.ReactNode;
}

function Modal({open, children}: ModalProps) {
  return (
    <div className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/50": "invisible"}`}>
      <div className={`transition-opacity ${open ? "opacity-100": "opacity-0"}`}>
        {children}
      </div>
    </div>
  )
}

export default Modal;