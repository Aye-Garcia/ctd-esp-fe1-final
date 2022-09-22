import './boton-favorito.css';
import { FC } from "react";
import { IRootState } from "../../store/store";
import Personaje from "../../types/personaje.types";
import { toggleFavorito } from "../../actions/favoritos.actions";
import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector as useReduxSelector,
  } from "react-redux";
/**
 * Boton que indica si un elemento es favorito o no, y da la posibilidad de marcarlo/desmarcarlo
 * 
 * Deberás tipar las propiedades si usas este componente
 * 
 * @param {Personaje} personaje
 * @returns un JSX element 
 */
const BotonFavorito: FC<{personaje: Personaje }> = ({ personaje }) => {
    const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
    const favoritoMap = useSelector((state) => state.favoritos.favoritosMap);
    const dispatch = useDispatch();

    const src = require(favoritoMap.has(personaje.id)
    ? "../../Img/favorito.png"
    : "../../Img/sinFavorito.png");

  /**
   * Esta función actualiza el estado de "Favoritos" en el store
   * @param {event} event
   */

    const toggleFavoritos = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        dispatch(toggleFavorito(personaje));
     };

  return (
    <button className="boton-favorito" onClick={toggleFavoritos} type="button">
      <img src={src} alt={"favorito"} />
    </button>
  );
};

export default BotonFavorito;