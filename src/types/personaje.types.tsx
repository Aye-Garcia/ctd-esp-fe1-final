interface Personaje {
    id: number;
    name: string;
    status: string;
    image: string;
    species: string;
    gender: string;
    origin: {
        name: string,
        url: string
    }
    episodio: string[];
}

export default Personaje;