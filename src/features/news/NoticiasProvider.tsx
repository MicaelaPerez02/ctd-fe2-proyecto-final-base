import { INoticias } from "./fakeRest";

/** 
Función que devuelve una promesa que resuelve en una lista de noticias.
@function
@returns {Promise<INoticias[]>} - Promesa que resuelve en una lista de noticias.
*/
export interface INoticiasProvider {
  obtenerNoticias: () => Promise<INoticias[]>;
}

export default INoticiasProvider;
