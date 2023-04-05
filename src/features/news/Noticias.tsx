import { useCallback, useEffect, useState } from "react";
import { SuscribeImage, CloseButton as Close } from "../../assets";
import * as Styled from "./styled";
import Noticia, { INoticiasNormalizadas } from "./Noticia";
import INoticiasProvider from "./NoticiasProvider";

/**
 * Componente que muestra una lista de noticias y permite ver más detalles de cada una en un modal.
 * @param {Object} props - Propiedades del componente.
 * @param {INoticiasProvider} props.noticiasProvider - Proveedor de noticias.
 */

const Noticias = ({ noticiasProvider }: { noticiasProvider: INoticiasProvider }) => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  /**
  * Función que obtiene la información de las noticias.
  * @function
  */
  const obtenerInformacionNoticias = useCallback(async () => {
    const noticiasApi = await noticiasProvider.obtenerNoticias();
    const noticiasNormalizadas = noticiasApi.map((noticia) => Noticia(noticia));
    setNoticias(noticiasNormalizadas);
  }, [noticiasProvider]);

  useEffect(() => {
    const actualizarNoticias = async () => {
      await obtenerInformacionNoticias();
    };
    actualizarNoticias();
  }, [obtenerInformacionNoticias]);

  /**
 * Función que maneja la suscripción al newsletter.
 * @function
 */
  const handleSubscribe = () => {
    setTimeout(() => {
      alert("Suscripto!");
      setModal(null);
    }, 1000);
  };

  return (
    <Styled.ContenedorNoticias>
      <Styled.TituloNoticias>Noticias de los Simpsons</Styled.TituloNoticias>
      <Styled.ListaNoticias>
        {noticias.map((noticia) => (
          <Styled.TarjetaNoticia>
            <Styled.ImagenTarjetaNoticia src={noticia.imagen} />
            <Styled.TituloTarjetaNoticia>{noticia.titulo}</Styled.TituloTarjetaNoticia>
            <Styled.FechaTarjetaNoticia>{noticia.fecha.toLocaleString()}</Styled.FechaTarjetaNoticia>
            <Styled.DescripcionTarjetaNoticia>
              {noticia.descripcionCorta}
            </Styled.DescripcionTarjetaNoticia>
            <Styled.BotonLectura onClick={() => setModal(noticia)}>Ver más</Styled.BotonLectura>
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
                    onClick={handleSubscribe}
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
