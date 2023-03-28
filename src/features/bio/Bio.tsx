import { useState } from "react";
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";
import * as Styled from "./Bio.styled";

const Bio = () => {
  const [bioActiva, setBioActiva] = useState(
    INFO_SIMPSONS[NombresSimpsons.BART]
  );

  const onClick: (nombre: NombresSimpsons) => void = (nombre) =>
    setBioActiva(INFO_SIMPSONS[nombre]);

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
