const Product = (props) => {
  const clickHandler = () => {
    props.productToCartHandler(props.id, 1);
  };

  return (
    <li>
      <h2>{props.title}</h2>
      <img src={props.image} width="150" height="170" />
      <h3>{props.description}</h3>
      <p>
        Rating: {props.rating} Count: {props.ratingCount}
      </p>
      <p>Price: {props.price}</p>
      <button onClick={clickHandler}>Buy</button>
    </li>
  );
};

export default Product;
