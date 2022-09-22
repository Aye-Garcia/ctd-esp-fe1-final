import './paginacion.css';
import React, { FC, useState } from "react";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { cambiarPagThunk } from "../../actions/personajes.actions";
import { IRootState } from "../../store/store";

/**
 * Componente que contiene los botones para paginar
 * 
 * Deberás agregar las propiedades necesarias para que funcione correctamente
 * 
 * 
 * @returns {React.ReactElement} JSX element 
 */

const Paginacion: FC = () => {
    const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
    const dispatch = useDispatch();
  
    const detallePag = useSelector((state) => state.personajes.detallePag);
    const { count, next, pages, prev } = detallePag;
  
    const prevPag = () => {
      dispatch(cambiarPagThunk(prev));
    };
  
    const nextPag = () => {
      dispatch(cambiarPagThunk(next));
    };

    return (
        <div className="paginacion">
            <button onClick={prevPag} disabled={prev === null ? true : false} className={"primary"}>Anterior</button>
            <button onClick={nextPag} disabled={next === null ? true : false} className={"primary"}>Siguiente</button>
        </div>
    );
};

export default Paginacion;