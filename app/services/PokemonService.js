import { STORE } from "../store.js";

class PokemonService {
  async getPokemonList(url = "https://pokeapi.co/api/v2/pokemon") {
    let response = await fetch(url);
    let data = await response.json();
    console.log("data is ready");
    STORE.state.pokemon = data.results;
    STORE.state.next = data.next;
    STORE.state.previous = data.previous;
  }
}

export const pokemonService = new PokemonService();
