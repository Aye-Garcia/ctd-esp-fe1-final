import "./Detalle.css";
import BotonFavorito from "../componentes/botones/boton-favorito.componente";
import TarjetaEpisodio from "../componentes/episodios/tarjeta-episodio.componente";
import { useLocation } from "react-router-dom";
import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector as useReduxSelector,
} from "react-redux";
import Personaje from "../types/personaje.types";
import { IRootState } from "../store/store";
import { FC, useEffect, useState } from "react";
import Episodio from "../types/episodio.types";
import { getEpisodiosThunk } from "../actions/episodios.actions";


/**
 * Pagina de detalle: muestra la vista sobre el personaje seleccionado junto con la lista de episodios en los que aparece

@returns {React.ReactElement} JSX element
 */
const PaginaDetalle: FC = () => {
    const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
    const { episodios, status } = useSelector((state) => state.episodios);
    const dispatch = useDispatch();
  
    const location = useLocation();
    const state: any = location.state;
    const personaje: Personaje = { ...state.personaje };
  
    const [arrayEpisodioID, setArrayEpisodioID] = useState<(string | undefined)[]>(
      []
    );
  
    useEffect(() => {
      /**
       *  Array IDs de episodios
       */
      const array: (string | undefined)[] = personaje.episodio.map((episodio) => {
        return episodio.split("/").at(-1);
      });
      setArrayEpisodioID(array);
    }, [personaje.episodio]);
  
    useEffect(() => {
      dispatch(getEpisodiosThunk(arrayEpisodioID));
    }, [arrayEpisodioID, dispatch]);

    return (
    <div className="container">
        <h3>{personaje.name}</h3>
        <div className={"detalle"}>
            <div className={"detalle-header"}>
                <img src={personaje.image} alt={personaje.name} />
                <div className={"detalle-header-texto"}>
                <p>{personaje.name}</p>
                <p>Planeta: {personaje.origin.name}</p>
                <p>Genero: {personaje.gender}</p>
                </div>
                <BotonFavorito personaje={personaje} />
            </div>
        </div>
        <h4>Lista de episodios donde apareció el personaje</h4>
        <div className={"episodios-grilla"}>
        {status === "LOADING" ? (
          <div>Cargando personajes...</div>
        ) : status === "FAILED" ? (
          <div>Ups! La carga falló.</div>
        ) : !episodios ? (
          <></>
        ) : Array.isArray(episodios) ? (
          episodios.map((episodio: Episodio) => {
            return (
                <div key={`episodio_${episodio.id}_${personaje.name}`}>     
                    <TarjetaEpisodio episodio={episodio} />
                    </div>
            );
          })
        ) : (
            <TarjetaEpisodio episodio={episodios} />
        )}
      </div>
    </div>
  );
};

export default PaginaDetalle;