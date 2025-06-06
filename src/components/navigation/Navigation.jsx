import './Navigation.css';
import logo from '../../assets/logo-medium.png';
import {NavLink} from "react-router-dom";

function Navigation() {
  return (<>
    <div className="navigation">
      <img src={logo} className="nav-company-logo" alt="Company logo"/>
      <nav>
        <NavLink
          to="/"
          className={({isActive}) => isActive ? 'nav-item-active' : 'nav-item'}
        >
          Home
        </NavLink>

        <NavLink
          to="/blogs"
          className={({isActive}) => isActive ? 'nav-item-active' : 'nav-item'}
        >
          Alle blogs
        </NavLink>

        <NavLink
          to="/nieuwe-blog"
          className={({isActive}) => isActive ? 'nav-item-active' : 'nav-item'}
        >
          Nieuwe blog
        </NavLink>
      </nav>
    </div>
  </>);
}

export default Navigation;