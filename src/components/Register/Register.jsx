import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <div className="register_container">
      <h1 className="register_title">Regístrate</h1>
      <form>
        <fieldset className="register_fieldset">
          <input
            className="register_input"
            type="email"
            placeholder="Correo electrónico"
          />
          <input
            className="register_input"
            type="password"
            placeholder="Contraseña"
          />
        </fieldset>
        <button className="register_button">Regístrate</button>
      </form>
      <p className="register_text">
        ¿Ya eres miembro? Inicia sesión{" "}
        <Link to={"/signin"} className="register_link">
          aquí
        </Link>
      </p>
    </div>
  );
};
