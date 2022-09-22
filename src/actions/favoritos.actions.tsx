import { Action, ActionCreator } from "@reduxjs/toolkit";
import Personaje from "../types/personaje.types";

interface FavoritoAction extends Action {
  type: "TOGGLE_FAVORITE";
  personaje: Personaje;
}

interface FavoritoRemoveAllAction extends Action {
  type: "REMOVE_ALL_FAVORITE";
}

export const toggleFavorito: ActionCreator<FavoritoAction> = (
  personaje: Personaje
) => ({
  type: "TOGGLE_FAVORITE",
  personaje,
});

export const removeAllFavorito: ActionCreator<
  FavoritoRemoveAllAction
> = () => ({
  type: "REMOVE_ALL_FAVORITE",
});

export type FavoritoActions =
  | ReturnType<typeof toggleFavorito>
  | ReturnType<typeof removeAllFavorito>;
