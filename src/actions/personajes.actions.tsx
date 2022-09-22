import { Action, ActionCreator, ThunkAction } from "@reduxjs/toolkit";
import { getPersonajesAPI, cambiarPag } from "../services/personaje.services";
import { IRootState } from "../store/store";
import detallePag from "../types/detallePag.types";
import Personaje from "../types/personaje.types";

interface getPersonajesAccion extends Action {
  type: "GET_CHARACTERS";
  query: string;
}
interface getPersonajesSuccessAccion extends Action {
  type: "GET_CHARACTERS_SUCCESS";
  personajes: Personaje[];
  detallePag: detallePag;
}
interface getPersonajesErrorAccion extends Action {
  type: "GET_CHARACTERS_ERROR";
  error: string | number;
}

const getPersonajes: ActionCreator<getPersonajesAccion> = (query: string) => {
  return {
    type: "GET_CHARACTERS",
    query: query,
  };
};

const getPersonajesSuccess: ActionCreator<getPersonajesSuccessAccion> = (
  personajes: Personaje[],
  detallePag: detallePag
) => {
  return {
    type: "GET_CHARACTERS_SUCCESS",
    personajes: personajes,
    detallePag: detallePag,
  };
};

const getPersonajesError: ActionCreator<getPersonajesErrorAccion> = (
  mensaje: string | number
) => {
  return {
    type: "GET_CHARACTERS_ERROR",
    error: mensaje,
  };
};

export type PersonajeActions =
  | ReturnType<typeof getPersonajes>
  | ReturnType<typeof getPersonajesSuccess>
  | ReturnType<typeof getPersonajesError>;

interface FetchPersonajesThunkAction
  extends ThunkAction<void, IRootState, unknown, PersonajeActions> {}

export const fetchPersonajesThunk = (
  query: string
): FetchPersonajesThunkAction => {
  return async (dispatch, getState) => {
    dispatch(getPersonajes(query));
    try {
      const response = await getPersonajesAPI(query);
      const [personajes, info, status] = response;
      if (status === 200) {
        dispatch(getPersonajesSuccess(personajes, info));
      } else {
        dispatch(getPersonajesError(status));
      }
    } catch (e) {
      dispatch(getPersonajesError(e));
    }
  };
};

export const cambiarPagThunk = (url: string): FetchPersonajesThunkAction => {
  return async (dispatch, getState) => {
    try {
      const [personajes, info] = await cambiarPag(url);
      dispatch(getPersonajesSuccess(personajes, info));
    } catch (e) {
      dispatch(getPersonajesError(e));
    }
  };
};
