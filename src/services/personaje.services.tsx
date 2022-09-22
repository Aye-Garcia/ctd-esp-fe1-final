import Episodio from "../types/episodio.types";
import detallePag from "../types/detallePag.types";
import Personaje from "../types/personaje.types";

/**
 * Funcion que devuelve un array de personajes y los ordena por nombre
 *
 * @param {string | undefined} nombre
 * @returns {Promise<[Personaje[], detallePag, number] | [any, any, number]>} retorna un array de personajes y un objeto con la paginacion
 */
export const getPersonajesAPI = async (
  name?: string
): Promise<[Personaje[], detallePag, number] | [any, any, number]> => {
  let nameParam = "";
  if (name !== "" && name !== undefined) {
    nameParam = `name=${name}`;
  }
  return fetch(`https://rickandmortyapi.com/api/character?${nameParam}`).then(
    function (response) {
      return response
        .json()
        .then((data) => [data.results, data.info, response.status]);
    }
  );
};

/**
 *  Funcion que retorna los personajes de la página
 *
 * @param {string } url
 * @returns {Promise<[Personaje[], detallePag]>} retorna personajes e info de la paginacion
 */
export const cambiarPag = async (
  url: string
): Promise<[Personaje[], detallePag]> => {
  return fetch(url)
    .then((data) => data.json())
    .then((data) => [data.results, data.info]);
};

/**
 * Funcion que devuelve un array de episodios por personaje
 *
 * @param {Array<number>} arrayEpisodioID
 * @returns {Promise<Episodio | Episodio[]>} retorna los episodios de un personaje
 */
export const fetchEpisodios = async (
  arrayEpisodioID: (string | undefined)[]
): Promise<Episodio | Episodio[]> => {
  return (
    await fetch(`https://rickandmortyapi.com/api/episode/${arrayEpisodioID}`)
  ).json();
};
