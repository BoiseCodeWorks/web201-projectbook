import { pokemonService } from "../services/PokemonService.js";
import { STORE } from "../store.js";

function drawPokeList() {
  console.log("draw the pokemon", STORE.state.pokemon);
  let template = "";
  STORE.state.pokemon.forEach(pokemon => {
    template += pokemon.ListTemplate;
  });

  if (STORE.state.previous) {
    template += `<button onclick="app.pokemonController.getPokemonList('${STORE.state.previous}')">previous</button>`;
  }

  if (STORE.state.next) {
    template += `<button onclick="app.pokemonController.getPokemonList('${STORE.state.next}')">Next</button>`;
  }
  document.getElementById("pokelist").innerHTML = template;
}

function drawActivePokemon() {
  if (!STORE.state.activePokemon.name) {
    document.getElementById("activePokemon").innerHTML = "";
    return;
  }
  document.getElementById("activePokemon").innerHTML =
    STORE.state.activePokemon.DetailsTemplate;
}

function drawMyPokemon() {
  let template = "";
  STORE.state.myPokemon.forEach(pokemon => {
    template += pokemon.MyPokemonTemplate;
  });
  document.getElementById("myPokemon").innerHTML = template;
}

function drawError(error) {
  alert(error);
}

export class PokemonController {
  constructor() {
    this.getPokemonList();
    this.getMyPokemon();
  }
  async getPokemonList(url) {
    try {
      console.log("You clicked the poke button");
      await pokemonService.getPokemonList(url);
      drawPokeList();
    } catch (e) {
      drawError(e);
    }
  }

  async getMyPokemon() {
    try {
      await pokemonService.getMyPokemonList();
      drawMyPokemon();
    } catch (e) {
      drawError(e);
    }
  }

  /**
   * finds a pokemon by name and sets it as the active pokemon
   * @param {string} name
   */
  async getPokemon(name) {
    try {
      await pokemonService.getPokemon(name);
      drawActivePokemon();
    } catch (error) {
      drawError(error);
    }
  }

  async catchPokemon() {
    try {
      await pokemonService.catchPokemon();
      drawMyPokemon();
      drawActivePokemon();
    } catch (e) {
      drawError(e);
    }
  }

  async releasePokemon(id) {
    try {
      await pokemonService.releasePokemon(id);
      drawActivePokemon();
      drawMyPokemon();
    } catch (error) {
      drawError(error);
    }
  }
}
