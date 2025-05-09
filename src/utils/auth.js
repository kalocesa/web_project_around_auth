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

    if (!response.ok) {
      let errorMessage = "Ocurrió un error inesperado";
      if (response.status === 400) {
        errorMessage = "No se ha proporcionado uno o más campos.";
      } else if (response.status === 401) {
        errorMessage =
          "No se ha encontrado al usuario con el correo electrónico especificado.";
      }
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const data = await response.json();
    console.log("Inicio de sesión exitoso:", data.token);
    return data;
  } catch (error) {
    console.error("Error en la solicitud de login:", error.message);
    throw error;
  }
};

export const getToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("token no encontrado");
  }
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: Token inválido o formato incorrecto`
      );
    }
    const data = await response.json();
    return data.data.email;
  } catch (error) {
    console.error("Error al verificar el token:", error.message);
    throw error;
  }
};
