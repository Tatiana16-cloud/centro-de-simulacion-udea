import './Modal.css'

const Modal = ({ isOpen, onClose, message, title="Ha ocurrido un error!" }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>{title}</h2>
          <p>{message}</p>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    );
  };

  export default Modal;