import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';
import { FC } from "react";
import Personaje from "../../types/personaje.types";
import { useNavigate } from "react-router-dom";

/**
 * Tarjeta para cada personaje dentro de la grilla de personajes. 
 * 
 * Deberás agregar las propiedades necesarias para mostrar los datos de los personajes
 * 
 * @param  {Personaje} personaje
 * @returns {React.ReactElement} JSX element
 */
const TarjetaPersonaje: FC <{ personaje: Personaje }> = ({ personaje }) => {
    let navigate = useNavigate();
  
    /**
     * Función que redirije a la página de detalle del personaje al hacer click en la tarjeta
     */
    const irAPagDetalle = () => {
      navigate(`/detail/${personaje.id}`, { state: { personaje: personaje } });
    };



    return (
        <div className="tarjeta-personaje">
            <img src={personaje.image} onClick={irAPagDetalle} alt={personaje.name}/>
        <div className="tarjeta-personaje-body">
            <span>{personaje.name}</span>
            <BotonFavorito personaje={personaje} />
        </div>
        </div>
    );
};

export default TarjetaPersonaje;