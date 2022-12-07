import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import MainNavigation from "./components/MainNavigation";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";

const App = () => {
  const [totalQuantity, setQuantity] = useState(0);

  // Ostoskorissa olevien tuotteiden määrän haku tietokannasta ensimmäisellä lataus kerralla.
  useEffect(() => {
    fetchCurrentQuantity();
  }, []);

  // Handleri, joka annetaan propsina ProductsPagelle. Lisää ostoskorissa olevien tuotteiden määrää
  // käsittelevään stateen parametrina saadun määrän.
  const quantityHandlerAdd = async (quantity) => {
    console.log("App.js: " + quantity);
    setQuantity(totalQuantity + quantity);
  };

  // Handleri, joka annetaan propsina CartPagelle. Vähentää ostoskorissa olevien tuotteden määrää
  // käsittelevästä statesta parametrina saadun määrän.
  const quantityHandlerRemove = async (quantity) => {
    console.log("App.js: " + quantity);
    setQuantity(totalQuantity - quantity);
  };

  // Hakee tietokannasta tämän hetkisen tuotteiden määrän.
  const fetchCurrentQuantity = async () => {
    const response = await fetch(
      "https://webstore-b2c37-default-rtdb.europe-west1.firebasedatabase.app/selectedproducts.json"
    );
    const data = await response.json();
    console.log(data);

    let count = 0;
    for (const key in data) {
      count += data[key].quantity;
    }
    setQuantity(count);
  };

  // Navigaatiopalkille propsina ostoskorissa olevien tuotteiden määrä, handlerit sivuille.
  // Navigointi sivujen välillä.
  return (
    <div>
      <MainNavigation totalQuantity={totalQuantity} />
      <Switch>
        <Route path="/" exact>
          <ProductsPage quantityHandler={quantityHandlerAdd} />
        </Route>
        <Route path="/cart">
          <CartPage quantityHandler={quantityHandlerRemove} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
