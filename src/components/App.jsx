import Main from "./Main/Main";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Register } from "./Register/Register";
import { Login } from "./Login/Login";
import { InfoTooltip } from "./InfoTooltip/InfoTooltip";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useState, useEffect } from "react";
import { api } from "../utils/api";
import goodRegister from "../images/register-good.png";
import badRegister from "../images/register-bad.png";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipInfo, setTooltipInfo] = useState({ img: "", text: "" });

  const handleRegister = async (email, password) => {
    try {
      await api.register(email, password);
      setTooltipInfo({
        img: goodRegister,
        text: "¡Correcto! Ya estás registrado.",
      });
    } catch (error) {
      setTooltipInfo({
        img: badRegister,
        text: "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
      });
    }
    setIsTooltipOpen(true); // Mostrar el modal
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
    <BrowserRouter>
      <CurrentUserContext.Provider
        value={{ currentUser, handleUpdateUser, setCurrentUser }}
      >
        <div className="page">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signin" element={<Login />} />
            <Route
              path="/signup"
              element={<Register handleRegister={handleRegister} />}
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
    </BrowserRouter>
  );
}

export default App;
