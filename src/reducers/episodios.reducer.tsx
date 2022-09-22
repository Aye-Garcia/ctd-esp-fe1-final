import { Reducer } from "@reduxjs/toolkit";
import { EpisodiosActions } from "../actions/episodios.actions";
import Episodio from "../types/episodio.types";

interface EpisodiosState {
  status: "IDLE" | "LOADING" | "COMPLETED" | "FAILED";
  episodios: Episodio | Episodio[];
  error: string | null;
}

const initialState: EpisodiosState = {
  status: "IDLE",
  episodios: [],
  error: null,
};

/**
 * Episodios reducer
 *
 * @param {State} state
 * @param {DataStore.Reducer<EpisodiosState, EpisodiosActions>} action
 *
 * @returns {State}
 */

const episodiosReducer: Reducer<EpisodiosState, EpisodiosActions> = (
  state = initialState,
  action
): EpisodiosState => {
  switch (action.type) {
    case "GET_EPISODES":
      return {
        ...state,
        status: "LOADING",
        episodios: [],
        error: null,
      };
    case "GET_EPISODES_SUCCESS":
      return {
        ...state,
        status: "COMPLETED",
        episodios: action.episodios,
      };
    case "GET_EPISODES_ERROR":
      return {
        ...state,
        status: "FAILED",
        error: action.error,
      };
    default:
      return { ...state };
  }
};

export default episodiosReducer;
