import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="login_container">
      <h1 className="login_title">Inicia sesión</h1>
      <form>
        <fieldset className="login_fieldset">
          <input
            className="login_input"
            type="email"
            placeholder="Correo electrónico"
          />
          <input
            className="login_input"
            type="password"
            placeholder="Contraseña"
          />
        </fieldset>
        <button className="login_button">Inicia sesión</button>
      </form>
      <p className="login_text">
        ¿Aún no eres miembro? Regístrate{" "}
        <Link to={"/signup"} className="login_link">
          aquí
        </Link>
      </p>
    </div>
  );
};
