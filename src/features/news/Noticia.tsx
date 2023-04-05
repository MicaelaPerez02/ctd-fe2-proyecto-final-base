import { capitalize } from "./capitalize";

/**
Interfaz que define la estructura de una noticia
@interface INoticiasNormalizadas
@property {number} id - ID de la noticia.
@property {string} titulo - Título de la noticia.
@property {string} descripcion - Descripción de la noticia.
@property {Date} fecha - Fecha de la noticia.
@property {boolean} esPremium - Indica si la noticia es premium o no.
@property {string} imagen - URL de la imagen asociada a la noticia.
@property {string} descripcionCorta - Descripción corta de la noticia.
@property {number} minutosTranscurridos - Minutos transcurridos desde la publicación de la noticia.
*/
export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  esPremium: boolean;
  imagen: string;
  descripcionCorta?: string;
  minutosTranscurridos?: number;
}

/**
 * Normaliza una noticia con algunas propiedades modificadas
 * @param {INoticiasNormalizadas} noticia - La noticia que se va a normalizar
 * @returns {INoticiasNormalizadas} - La noticia normalizada
 */
const Noticia = (noticia: INoticiasNormalizadas): INoticiasNormalizadas => {
  const titulo = capitalize(noticia.titulo);
  const fechaNoticia = new Date(noticia.fecha);
  const fechaActual = new Date();
  const minutosTranscurridos = Math.floor(
    (fechaActual.getTime() - fechaNoticia.getTime()) / 60000
  );
  const descripcionCorta = noticia.descripcion.substring(0, 100);
  return {
    ...noticia,
    titulo,
    fecha: fechaNoticia,
    descripcionCorta,
    minutosTranscurridos,
  };
};

export default Noticia;
