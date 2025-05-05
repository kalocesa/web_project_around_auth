import logo from "../../images/logo.png";
import line from "../../images/Line.svg";

const Header = () => {
  return (
    <header className="header">
      <img
        id="image-logo"
        src={logo}
        alt="Icono con texto alrededor de México"
        className="header__icon"
      />
      <img id="image-line" src={line} alt="line" className="header__line" />
    </header>
  );
};

export default Header;
