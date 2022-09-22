import './filtros.css';
import { ChangeEvent, FC } from "react";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { fetchPersonajesThunk } from "../../actions/personajes.actions";
import { IRootState } from "../../store/store";

/**
 * Este componente muestra los filtros de búsqueda
 *
 * @returns {React.ReactElement} JSX element
 */

const Filtros: FC = () => {
    const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
    const query = useSelector((state) => state.personajes.query);
    const dispatch = useDispatch();
  
    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
      let query = e.target.value;
      dispatch(fetchPersonajesThunk(query));
    };
  
    return (
    <div className="filtros">
        <label htmlFor="nombre">Filtrar por nombre:</label>
        <input type="text" placeholder="Rick, Morty, Beth, Alien, ...etc" onChange={onChange} value={query} name="nombre" autoFocus={true} />
    </div>
    );
};

export default Filtros;