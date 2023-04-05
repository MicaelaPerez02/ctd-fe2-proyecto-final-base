import {
  ESTADO_FETCH,
  NOMBRE_INVALIDO,
  MENSAJE_CARGANDO,
  NO_ENCONTRADO,
} from "./constants";

/**
Retorna un mensaje en función del estado de la petición y de la cita obtenida
@param {string} cita - La cita obtenida
@param {ESTADO_FETCH} estadoPedido - El estado de la petición
@returns {string} - El mensaje correspondiente al estado y la cita obtenida
*/
export const obtenerMensaje: (
  cita: string,
  estadoPedido: ESTADO_FETCH
) => string = (cita, estadoPedido) => {
  if (estadoPedido === ESTADO_FETCH.CARGANDO) {
    return MENSAJE_CARGANDO;
  }

  if (estadoPedido === ESTADO_FETCH.ERROR) {
    return NOMBRE_INVALIDO;
  }

  return cita ? `${cita}` : NO_ENCONTRADO;
};
