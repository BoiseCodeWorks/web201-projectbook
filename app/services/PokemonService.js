import { STORE } from "../store.js";

class PokemonService {
  getPokemonList(onSuccess, onError) {
    console.log("Fetching pokemon list");
    // handle async problem
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then(res => res.json())
      .then(data => {
        // do something with the data
        console.log("The pokemon list has returned");
        STORE.state.pokemon = data.results;
        STORE.state.next = data.next;
        STORE.state.previous = data.previous;
        console.log(data);
        onSuccess();
      })
      .catch(error => {
        // do something with the error
        console.error(error);
        onError(error);
      });
  }
}

export const pokemonService = new PokemonService();
