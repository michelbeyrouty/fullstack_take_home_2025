import "./NavMenu.css";
import NavMenuLink from "./NavMenuLink";
import logo from "../../../assets/logo.svg";

export default function NavMenu() {
  return (
    <div className="nav-menu-wrapper">
      <NavMenuLink to="/" className="logo-link">
        <img src={logo} className="app-logo" alt="logo" />
      </NavMenuLink>
      <ul className="nav-menu">
        <li>
          <NavMenuLink to="/workorders/create">Create</NavMenuLink>
        </li>
        <li>
          <NavMenuLink to="/workorders" end>
            WorkOrders
          </NavMenuLink>
        </li>
        <li>
          <NavMenuLink to="/productivity">Productivity</NavMenuLink>
        </li>
      </ul>
    </div>
  );
}
