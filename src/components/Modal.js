const Modal = (props) => {
  return (
    <div className="modal">
      <img src={props.image} width="330" height="352" />
      <h3>{props.description}</h3>
    </div>
  );
};

export default Modal;
