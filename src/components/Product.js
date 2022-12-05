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
      <h3 className="productTitle">{props.title}</h3>
      <img
        src={props.image}
        className="image"
        width="150"
        height="160"
        onClick={imageClicked}
      />
      <div>
        <p className="wrap-content">Rating:</p>&nbsp;
        <h3 className="wrap-content">{props.rating}</h3>&nbsp;
        <p className="wrap-content">Votes:</p>&nbsp;
        <h3 className="wrap-content">{props.ratingCount}</h3>
      </div>
      <div className="priceRow">
        <p className="wrap-content">Price:</p>
        &nbsp;
        <h3 className="wrap-content">${props.price * amount} </h3>
      </div>
      <Dropdown dropdownHandler={dropdownHandler} />
      <button onClick={clickHandler} className="btn">
        Buy
      </button>
    </div>
  );
};

export default Product;
