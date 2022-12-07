import { useState, useEffect } from "react";
import ProductCartList from "../components/ProductCartList";

const CartPage = (props) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  const [totalPrice, setPrice] = useState(0);

  // Ostoskorissa olevien tuotteiden tietojen haku tietokannasta ensimmäisellä lataus kerralla.
  useEffect(() => {
    fetchSelectedProductsDB();
  }, []);

  // Hakee ostoskorissa olevat tuotteet tietokannasta, muotoilee datan ja laskee ostoskorissa olevien tuotteiden kokonaishinnan.
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
      // Firebasesta haetun objektin muotoilu, keyt talteen valitun tuotteen poistamista varten tietokannasta.
      for (const key in selectedProducts) {
        transformedData.push({
          id: selectedProducts[key].id,
          // Object.keys() ja laskuria hyödyntäen sain tietokannassa olevien objektien nimet talteen.
          // Esim. -NIhI4hxQRGZxVGDXXPa
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

  // Funktio, joka laskee ostoskorissa olevien tuotteiden yhteenlasketun hinnan.
  const countCartPrice = async (productsInCart) => {
    let price = 0;
    productsInCart.forEach(function (arrayItem) {
      price += arrayItem.price;
    });
    console.log("price: " + price);
    setPrice(price);
  };

  // Poistaa valitun tuotteen tietokannasta, annetaan propsina ProductCartList -> ProductCart komponenteille.
  // Parametrina kyseisen tuotteen/tuotteiden tietokanta avaimen lisäksi niiden määrä.
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
      // App.js propsina saatu handleri, joka käsittelee navigaatiopalkissa näkyvää ostoskorissa olevien tuotteiden määrää.
      props.quantityHandler(selectedProductQuantity);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
    // Tuotteen poistamisen jälkeen haetaan tämänhetkinen tuotelista tietokannasta.
    fetchSelectedProductsDB();
  };

  let content;

  // Ehdollinen sivulla näkyvä sisältö joko error, loading, ostoskori tyhjä tai tuotelista ja kokonaishinta.
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
