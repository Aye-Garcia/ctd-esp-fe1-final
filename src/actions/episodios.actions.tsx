import { Action, ActionCreator, ThunkAction } from "@reduxjs/toolkit";
import { fetchEpisodios } from "../services/personaje.services";
import { IRootState } from "../store/store";
import Episodio from "../types/episodio.types";

interface getEpisodiosAccion extends Action {
  type: "GET_EPISODES";
  query: string;
}
interface getEpisodiosSuccessAccion extends Action {
  type: "GET_EPISODES_SUCCESS";
  episodios: Episodio | Episodio[];
}
interface getEpisodiosErrorAccion extends Action {
  type: "GET_EPISODES_ERROR";
  error: string;
}

const getEpisodios: ActionCreator<getEpisodiosAccion> = (query: string) => {
  return {
    type: "GET_EPISODES",
    query: query,
  };
};

const getEpisodiosSuccess: ActionCreator<getEpisodiosSuccessAccion> = (
  episodios: Episodio | Episodio[]
) => {
  return {
    type: "GET_EPISODES_SUCCESS",
    episodios: episodios,
  };
};

const getEpisodiosError: ActionCreator<getEpisodiosErrorAccion> = (
  mensaje: string
) => {
  return {
    type: "GET_EPISODES_ERROR",
    error: mensaje,
  };
};

export type EpisodiosActions =
  | ReturnType<typeof getEpisodios>
  | ReturnType<typeof getEpisodiosSuccess>
  | ReturnType<typeof getEpisodiosError>;

interface FetchEpisodiosThunkAction
  extends ThunkAction<void, IRootState, unknown, EpisodiosActions> {}

export const getEpisodiosThunk = (
  arrayEpisodioID: (string | undefined)[]
): FetchEpisodiosThunkAction => {
  return async (dispatch, getState) => {
    try {
      const response = await fetchEpisodios(arrayEpisodioID);
      if (response !== undefined) {
        dispatch(getEpisodiosSuccess(response));
      }
    } catch (e) {
      dispatch(getEpisodiosError(e));
    }
  };
};
