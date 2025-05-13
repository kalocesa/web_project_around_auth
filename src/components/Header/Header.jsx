import logo from "../../images/logo.png";
import line from "../../images/Line.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = ({ handleLogout, userEmail }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignout = () => {
    handleLogout();
    navigate("/signin");
  };

  const getNavLink = () => {
    switch (location.pathname) {
      case "/":
        return (
          <>
            <p className="header_email">{userEmail}</p>
            <Link onClick={handleSignout} className="header_signin">
              Cerrar sesión
            </Link>
          </>
        );
      case "/signup":
        return (
          <Link to="/signin" className="header_signin">
            Iniciar sesión
          </Link>
        );
      case "/signin":
        return (
          <Link to="/signup" className="header_signin">
            Registrarse
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <header className="header">
      <div className="header_container">
        <img
          id="image-logo"
          src={logo}
          alt="Icono con texto alrededor de México"
          className="header__icon"
        />
        <div className="header_container-profile">{getNavLink()}</div>
      </div>
      <img id="image-line" src={line} alt="line" className="header__line" />
    </header>
  );
};

export default Header;
