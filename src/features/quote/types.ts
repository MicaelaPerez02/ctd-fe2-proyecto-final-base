/**
 * @typedef {Object} ICita
 * @property {string} personaje - El nombre del personaje que dijo la cita.
 * @property {string} cita - La cita del personaje.
 * @property {string} imagen - URL de la imagen del personaje.
 * @property {string} direccionPersonaje - La dirección del personaje en la cita.
 */

export interface ICita {
  personaje: string;
  cita: string;
  imagen: string;
  direccionPersonaje: string;
}
