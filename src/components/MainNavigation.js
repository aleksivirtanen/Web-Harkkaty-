import { Link } from "react-router-dom";
import "./MainNavigation.css";

const MainNavigation = () => {
  return (
    <header className="header">
      <h2>Webstore</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Shop</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
