import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import MainNavigation from "./components/MainNavigation";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";

const App = () => {
  const [totalQuantity, setQuantity] = useState(0);

  useEffect(() => {
    fetchCurrentQuantity();
  }, []);

  const quantityHandlerAdd = async (quantity) => {
    console.log("App.js: " + quantity);
    setQuantity(totalQuantity + quantity);
  };

  const quantityHandlerRemove = async (quantity) => {
    console.log("App.js: " + quantity);
    setQuantity(totalQuantity - quantity);
  };

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
