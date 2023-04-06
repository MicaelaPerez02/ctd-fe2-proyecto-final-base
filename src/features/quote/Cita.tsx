import { useState } from "react";
import { shallowEqual } from "react-redux";
import { Boton, Input, AutorCita, ContenedorCita, TextoCita } from "./styled";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  obtenerCitaDelEstado,
  limpiar,
  obtenerEstadoDelPedido,
  obtenerCitaDeLaAPI,
} from "./citaSlice";
import { obtenerMensaje } from "./utils";

export type CitaType = {
  cita: string;
  personaje: string;
}

/**
Componente Cita
Este componente se encarga de mostrar una cita de Rick y Morty obtenida desde una API, ya sea
aleatoria o buscando por autor. También permite borrar la cita actual y buscar nuevas citas.
@returns {JSX.Element} Elemento JSX que representa el componente.
*/
function Cita() {
  const [valorInput, setValorInput] = useState("");
  const { cita = "", personaje = "" } =
    useAppSelector(obtenerCitaDelEstado, shallowEqual) || {};
  const estadoPedido = useAppSelector(obtenerEstadoDelPedido);

  const dispatch = useAppDispatch();

  /**
  Función que se encarga de buscar una cita por autor.
  @function onClickObtenerCita
  */
  const onClickObtenerCita = () => dispatch(obtenerCitaDeLaAPI(valorInput));

  /**
  Función que se encarga de borrar la cita actual.
  @function onClickBorrar
  */
  const onClickBorrar = () => {
    dispatch(limpiar());
    setValorInput("");
  };

  return (
    <ContenedorCita>
      <TextoCita>{obtenerMensaje(cita, estadoPedido)}</TextoCita>
      <AutorCita>{personaje}</AutorCita>
      <Input
        aria-label="Author Cita"
        value={valorInput}
        onChange={(e) => setValorInput(e.target.value)}
        placeholder="Ingresa el nombre del autor"
      />
      <Boton
        aria-label={valorInput ? "Obtener Cita" : "Obtener cita aleatoria"}
        onClick={onClickObtenerCita}
      >
        {valorInput ? "Obtener Cita" : "Obtener cita aleatoria"}
      </Boton>
      <Boton aria-label="Borrar" onClick={onClickBorrar} secondary={true}>
        Borrar
      </Boton>
    </ContenedorCita>
  );
}
export default Cita;
