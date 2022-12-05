import Dropdown from "./Dropdown";
import { useState } from "react";

const Product = (props) => {
  const [amount, setAmount] = useState(1);

  const clickHandler = () => {
    const selectedProduct = {
      id: props.id,
      title: props.title,
      image: props.image,
      price: props.price * amount,
      quantity: amount,
    };
    props.selectedProductsToDB(selectedProduct);
  };

  const imageClicked = () => {
    props.imageClickHandler(props.image, props.description);
  };

  const dropdownHandler = (selectedAmount) => {
    setAmount(selectedAmount);
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <img
        src={props.image}
        className="image"
        width="150"
        height="160"
        onClick={imageClicked}
      />
      <p>
        Rating: {props.rating} Votes: {props.ratingCount}
      </p>
      <p>Price: ${props.price * amount} </p>
      <Dropdown dropdownHandler={dropdownHandler} />
      <button onClick={clickHandler}>Buy</button>
    </div>
  );
};

export default Product;
