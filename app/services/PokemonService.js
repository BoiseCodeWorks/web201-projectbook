import { STORE } from "../store.js";
import { Pokemon } from "../models/Pokemon.js";

const BASEURL = "https://pokeapi.co/api/v2/pokemon/";
const SANDBOXURL = "http://bcw-sandbox.herokuapp.com/api/jake/pokemon/";

class PokemonService {
  async getPokemonList(url = BASEURL) {
    let response = await fetch(url);
    let data = await response.json();
    let pokemon = data.results.map(pokeData => new Pokemon(pokeData));
    STORE.commit("pokemon", pokemon);
    STORE.commit("next", data.next);
    STORE.commit("previous", data.previous);
  }
  async getMyPokemonList() {
    let response = await fetch(SANDBOXURL);
    let data = await response.json();
    STORE.state.myPokemon = data.data.map(pokeData => new Pokemon(pokeData));
  }

  async getPokemon(name) {
    let response = await fetch(BASEURL + name);
    let pokemonData = await response.json();
    let pokemon = new Pokemon(pokemonData);
    STORE.commit("activePokemon", pokemon);
  }

  async catchPokemon() {
    let activePokemon = STORE.state.activePokemon;
    let found = STORE.state.myPokemon.find(p => p.name == activePokemon.name);

    if (found) {
      throw new Error(
        "GREEDY GREEDY SAVE SOME FOR THE OTHER 10 YEAR OLDS! (Like Gary)"
      );
    }

    let response = await fetch(SANDBOXURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(activePokemon)
    });
    let data = await response.json();

    let pokemon = new Pokemon(data.data);
    STORE.state.myPokemon.push(pokemon);
    STORE.state.activePokemon = pokemon;
  }

  async releasePokemon(id) {
    await fetch(SANDBOXURL + id, {
      method: "DELETE"
    });
    let i = STORE.state.myPokemon.findIndex(p => p._id == id);
    if (i != -1) {
      STORE.state.myPokemon.splice(i, 1);
    }
    STORE.state.activePokemon = new Pokemon();
  }
}

export const pokemonService = new PokemonService();
