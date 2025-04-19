import Portal from './Portal';
import '../styles/Modal.css';

function Modal({ isOpen, onClose, children }:{isOpen: boolean, onClose: any, children: React.ReactNode}) {
  if (!isOpen) return null;
  
  return (
    <Portal>
      <div className="modal-overlay">
        <div className="modal-container">
          <button className="modal-close" onClick={onClose}>×</button>
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default Modal;