export const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

export const register = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error en el registro:", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }
    const data = await response.json();
    console.log("Inicio de sesión exitoso;", data.token);
    localStorage.setItem("token", data.token);
    return data.token;
  } catch (error) {
    console.log("Error al iniciar sesión:", error.message);
    throw error;
  }
};
