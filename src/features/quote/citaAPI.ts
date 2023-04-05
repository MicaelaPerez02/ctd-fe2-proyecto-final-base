import { API_URL } from "../../app/constants";
import { ICita } from "./types";

/**
Obtiene una cita de la API de forma aleatoria o por personaje.
@async
@function
@param {string} [personaje] - Nombre del personaje de la cita (opcional).
@throws {Error} Si el nombre del personaje es un número.
@returns {Promise<ICita>} - Objeto que representa la cita obtenida de la API.
*/
export const obtenerCita: (personaje?: string) => Promise<ICita> = async (
  personaje
) => {
  if (personaje && parseInt(personaje)) {
    throw new Error("El nombre debe ser un texto");
  }

  const url = personaje ? `${API_URL}?character=${personaje}` : API_URL;
  const respuesta = await fetch(url);
  const [data] = await respuesta.json();

  const dataNormalizada = {
    cita: data.quote,
    personaje: data.character,
    imagen: data.image,
    direccionPersonaje: data.characterDirection,
  };

  return dataNormalizada;
};
