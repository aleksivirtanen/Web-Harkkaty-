import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCartList from "../components/ProductCartList";

const CartPage = (props) => {
  //const history = useHistory();
  //history.push("/");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  const [totalPrice, setPrice] = useState(0);

  useEffect(() => {
    fetchSelectedProductsDB();
  }, []);

  const fetchSelectedProductsDB = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://webstore-b2c37-default-rtdb.europe-west1.firebasedatabase.app/selectedproducts.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const selectedProducts = await response.json();
      console.log(selectedProducts);
      if (selectedProducts === null) {
        setEmpty(true);
      }
      let transformedData = [];
      let counter = 0;
      // Firebasesta haetun objektin muotoilu, keyt talteen tietokannasta poistamista varten.
      for (const key in selectedProducts) {
        transformedData.push({
          id: selectedProducts[key].id,
          keyDB: Object.keys(selectedProducts)[counter],
          title: selectedProducts[key].title,
          image: selectedProducts[key].image,
          quantity: selectedProducts[key].quantity,
          price: selectedProducts[key].price,
        });
        counter++;
      }
      console.log(transformedData);
      setProducts(transformedData);
      countCartPrice(transformedData);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
    setLoading(false);
  };

  const countCartPrice = async (productsInCart) => {
    let count = 0;
    let price = 0;
    productsInCart.forEach(function (arrayItem) {
      count += arrayItem.quantity;
      price += arrayItem.price;
    });
    console.log("price: " + price);
    setPrice(price);
  };

  const removeProductDB = async (
    selectedProductKey,
    selectedProductQuantity
  ) => {
    console.log(selectedProductKey);
    try {
      const response = await fetch(
        `https://webstore-b2c37-default-rtdb.europe-west1.firebasedatabase.app/selectedproducts/${selectedProductKey}.json`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      props.quantityHandler(selectedProductQuantity);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
    fetchSelectedProductsDB();
  };

  let content;

  if (error) {
    content = <h3>{error}</h3>;
  } else if (isLoading) {
    content = <h3>Loading...</h3>;
  } else if (isEmpty) {
    content = <h3>Cart is empty!</h3>;
  } else {
    content = (
      <section>
        <ProductCartList
          products={products}
          onRemoveProductDB={removeProductDB}
        />
        <h2 className="totalPrice">
          Total Price: ${Number(totalPrice).toFixed(2)}
        </h2>
      </section>
    );
  }

  return (
    <div>
      <section>{content}</section>
    </div>
  );
};

export default CartPage;
