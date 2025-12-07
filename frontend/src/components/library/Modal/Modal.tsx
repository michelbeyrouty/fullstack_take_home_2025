import "./Modal.css";

interface IModalProps {
  message: string;
  onClose: () => void;
}

export default function Modal({ message, onClose }: IModalProps) {
  return (
    <div className="app-modal-backdrop" aria-modal="true">
      <div className="app-modal-dialog">
        <div className="app-modal-message">{message}</div>
        <div className="app-modal-actions">
          <button className="app-modal-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
