import logo from "../../images/logo.png";
import line from "../../images/Line.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header_container">
        <img
          id="image-logo"
          src={logo}
          alt="Icono con texto alrededor de México"
          className="header__icon"
        />
        <Link to="/signin" className="header_signin">
          Iniciar sesión
        </Link>
      </div>
      <img id="image-line" src={line} alt="line" className="header__line" />
    </header>
  );
};

export default Header;
