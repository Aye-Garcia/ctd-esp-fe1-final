import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { fetchPersonajesThunk } from "../actions/personajes.actions";
import { FC } from "react";
import { useDispatch } from "react-redux"; 
/**
 * Esta es la pagina principal. Aquí se debera ver el panel de filtros junto con la grilla de personajes.
 * 
 * Uso: 
 * ``` <PaginaInicio /> ```
 * 
 * @returns la pagina de inicio
 */
const PaginaInicio: FC = () => {
    const dispatch = useDispatch();

      /**
   * Function para remover filtros
   */
  const borrarFiltros = () => {
    dispatch(fetchPersonajesThunk(""));
  };

    return (
    <div className="container">
        <div className="actions">
            <h3>Catálogo de Personajes</h3>
            <button className="danger" onClick={borrarFiltros}>Borrar filtros</button>
        </div>
        <Filtros />
        <Paginacion />
        <GrillaPersonajes />
        <Paginacion />
    </div>
    );
};

export default PaginaInicio;