const ProductCart = (props) => {
  const clickHandler = () => {
    console.log(props.keyDB);
    props.onRemoveProductDB(props.keyDB);
  };

  return (
    <li>
      <h2>{props.title}</h2>
      <img src={props.image} width="75" height="80" />
      <p>Price: {props.price}</p>
      <p>Quantity: {props.quantity}</p>
      <button onClick={clickHandler}>Remove</button>
    </li>
  );
};

export default ProductCart;
