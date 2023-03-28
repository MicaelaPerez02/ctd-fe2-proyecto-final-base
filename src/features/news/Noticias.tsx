import { useEffect, useState } from "react";
import { SuscribeImage, CloseButton as Close } from "../../assets";
import { obtenerNoticias } from "./fakeRest";
import * as Styled from "./styled";

export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: number | string;
  esPremium: boolean;
  imagen: string;
  descripcionCorta?: string;
}

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();

      const data = respuesta.map((n) => {
        const titulo = n.titulo
          .split(" ")
          .map((str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
          })
          .join(" ");

        const ahora = new Date();
        const minutosTranscurridos = Math.floor(
          (ahora.getTime() - n.fecha.getTime()) / 60000
        );

        return {
          id: n.id,
          titulo,
          descripcion: n.descripcion,
          fecha: `Hace ${minutosTranscurridos} minutos`,
          esPremium: n.esPremium,
          imagen: n.imagen,
          descripcionCorta: n.descripcion.substring(0, 100),
        };
      });

      setNoticias(data);
    };

    obtenerInformacion();
  }, []);

  return (
    <Styled.ContenedorNoticias>
      <Styled.TituloNoticias>Noticias de los Simpsons</Styled.TituloNoticias>
      <Styled.ListaNoticias>
        {noticias.map((n) => (
          <Styled.TarjetaNoticia>
            <Styled.ImagenTarjetaNoticia src={n.imagen} />
            <Styled.TituloTarjetaNoticia>{n.titulo}</Styled.TituloTarjetaNoticia>
            <Styled.FechaTarjetaNoticia>{n.fecha}</Styled.FechaTarjetaNoticia>
            <Styled.DescripcionTarjetaNoticia>
              {n.descripcionCorta}
            </Styled.DescripcionTarjetaNoticia>
            <Styled.BotonLectura onClick={() => setModal(n)}>Ver más</Styled.BotonLectura>
          </Styled.TarjetaNoticia>
        ))}
        {modal ? (
          modal.esPremium ? (
            <Styled.ContenedorModal>
              <Styled.TarjetaModal>
                <Styled.CloseButton onClick={() => setModal(null)}>
                  <img src={Close} alt="close-button" />
                </Styled.CloseButton>
                <Styled.ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
                <Styled.CotenedorTexto>
                  <Styled.TituloModal>Suscríbete a nuestro Newsletter</Styled.TituloModal>
                  <Styled.DescripcionModal>
                    Suscríbete a nuestro newsletter y recibe noticias de
                    nuestros personajes favoritos.
                  </Styled.DescripcionModal>
                  <Styled.BotonSuscribir
                    onClick={() =>
                      setTimeout(() => {
                        alert("Suscripto!");
                        setModal(null);
                      }, 1000)
                    }
                  >
                    Suscríbete
                  </Styled.BotonSuscribir>
                </Styled.CotenedorTexto>
              </Styled.TarjetaModal>
            </Styled.ContenedorModal>
          ) : (
            <Styled.ContenedorModal>
              <Styled.TarjetaModal>
                <Styled.CloseButton onClick={() => setModal(null)}>
                  <img src={Close} alt="close-button" />
                </Styled.CloseButton>
                <Styled.ImagenModal src={modal.imagen} alt="news-image" />
                <Styled.CotenedorTexto>
                  <Styled.TituloModal>{modal.titulo}</Styled.TituloModal>
                  <Styled.DescripcionModal>{modal.descripcion}</Styled.DescripcionModal>
                </Styled.CotenedorTexto>
              </Styled.TarjetaModal>
            </Styled.ContenedorModal>
          )
        ) : null}
      </Styled.ListaNoticias>
    </Styled.ContenedorNoticias>
  );
};

export default Noticias;
