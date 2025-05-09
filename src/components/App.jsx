import Main from "./Main/Main";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Register } from "./Register/Register";
import { Login } from "./Login/Login";
import { InfoTooltip } from "./InfoTooltip/InfoTooltip";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useState, useEffect } from "react";
import { api } from "../utils/api";
import * as auth from "../utils/auth";
import goodRegister from "../images/register-good.png";
import badRegister from "../images/register-bad.png";
import { getToken, setToken } from "../utils/token";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipInfo, setTooltipInfo] = useState({ img: "", text: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (email, password) => {
    try {
      const response = await auth.register(email, password);
      if (response.status === 200 || response.status === 201) {
        setTooltipInfo({
          img: goodRegister,
          text: "¡Correcto! Ya estás registrado.",
        });
        navigate("/signin");
      } else {
        setTooltipInfo({
          img: badRegister,
          text: "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
        });
      }
    } catch (error) {
      setTooltipInfo({
        img: badRegister,
        text: "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
      });
    }
    setIsTooltipOpen(true);
  };

  const handleLogin = async (email, password) => {
    try {
      const data = await auth.login(email, password); // auth.login ya devuelve JSON

      if (data.token) {
        setToken(data.token);
        console.log("Sesión iniciada correctamente, redirigiendo...");

        setTooltipInfo({
          img: goodRegister,
          text: "¡Correcto! Has iniciado sesión.",
        });
        setIsLoggedIn(true);
        navigate("/");
      } else {
        setTooltipInfo({
          img: badRegister,
          text: "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
        });
      }
    } catch (error) {
      setTooltipInfo({
        img: badRegister,
        text: "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
      });
      console.error("Error al iniciar sesión:", error.message);
    }
    setIsTooltipOpen(true);
  };

  useEffect(() => {
    api.getProfileInfo().then((data) => {
      setCurrentUser(data);
    });
  }, []);

  const handleUpdateUser = (data) => {
    api.editProfile(data.name, data.about).then((newData) => {
      console.log(newData);
      setCurrentUser(newData);
    });
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, setCurrentUser }}
    >
      <div className="page">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route
            path="*"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Routes>
        <Footer />
        {isTooltipOpen && (
          <InfoTooltip
            img={tooltipInfo.img}
            text={tooltipInfo.text}
            handleClose={() => setIsTooltipOpen(false)}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
