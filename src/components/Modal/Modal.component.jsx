import './Modal.css'

const Modal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Ha ocurrido un error!</h2>
          <p>{message}</p>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    );
  };

  export default Modal;