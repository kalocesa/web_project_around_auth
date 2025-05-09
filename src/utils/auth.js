export const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

export const register = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();
    console.log("Respuesta del json:", responseJson);
    return { status: response.status, data: responseJson.data };
  } catch (error) {
    console.log("Error en el registro:", error);
    return { status: 500, data: null };
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
    const data = await response.json();
    console.log("Inicio de sesión exitoso;", data.token);
    localStorage.setItem("token", data.token);
    return data.token;
  } catch (error) {
    console.log("Error al iniciar sesión:", error.message);
    throw error;
  }
};
