import { Link } from "react-router-dom";
import "./MainNavigation.css";

const MainNavigation = () => {
  return (
    <header className="header">
      <h2>Verkkokauppa</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">View</Link>
          </li>
          <li>
            <Link to="/add">Add</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
