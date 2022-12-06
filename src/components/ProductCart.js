const ProductCart = (props) => {
  const clickHandler = () => {
    console.log(props.keyDB);
    props.onRemoveProductDB(props.keyDB, props.quantity);
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <img src={props.image} width="75" height="80" alt="" />
      <p>Quantity: {props.quantity}</p>
      <p>Price: ${props.price}</p>
      <button onClick={clickHandler}>Remove</button>
    </div>
  );
};

export default ProductCart;
