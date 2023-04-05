import { useState } from "react";
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";
import * as Styled from "./Bio.styled";


/**
Componente Bio que muestra información de personajes de Los Simpson.
@returns {JSX.Element} Elemento JSX que muestra la información del personaje seleccionado.
*/
const Bio = () => {
  const [bioActiva, setBioActiva] = useState(
    INFO_SIMPSONS[NombresSimpsons.BART]
  );


  /**
  Manejador de evento que cambia el estado de la biografía activa.
  @param {NombresSimpsons} nombre - El nombre del personaje cuya biografía se va a mostrar.
  @returns {void}
  */
  const onClick: (nombre: NombresSimpsons) => void = (nombre) =>
    setBioActiva(INFO_SIMPSONS[nombre]);

  /**
  Crea los botones de los personajes a partir de la constante INFO_SIMPSONS.
  @returns {JSX.Element[]} Arreglo de elementos JSX que contienen los botones de los personajes.
  */

  const crearBotones = () => {
    return Object.keys(INFO_SIMPSONS).map((nombre: string) => (
      <Styled.BotonBio
        key={nombre as string}
        onClick={() => onClick(nombre as NombresSimpsons)}
        botonClass={bioActiva.id === nombre ? "activo" : "inactivo"}
      >
        {nombre}
      </Styled.BotonBio>
    ));
  };


  return (
    <Styled.BioContainer>
      <Styled.ContenedorBotones>{crearBotones()}</Styled.ContenedorBotones>
      <div>
        <div>
          <Styled.BioImagen src={bioActiva.image} alt={bioActiva.nombre} />
        </div>
        <div>
          <Styled.BioNombre>{bioActiva.nombre}</Styled.BioNombre>
          <Styled.BioDescripcion>{bioActiva.descripcion}</Styled.BioDescripcion>
        </div>
      </div>
    </Styled.BioContainer>
  );
};

export default Bio;
