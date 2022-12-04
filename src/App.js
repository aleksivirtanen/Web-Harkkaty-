import { Route, Switch } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import ProductsPage from "./pages/ProductsPage";
import AddPage from "./pages/AddPage";

const App = () => {
  return (
    <div>
      <MainNavigation />
      <Switch>
        <Route path="/" exact>
          <ProductsPage />
        </Route>
        <Route path="/add">
          <AddPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
