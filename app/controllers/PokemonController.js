import { pokemonService } from "../services/PokemonService.js";
import { STORE } from "../store.js";

function drawPokeList() {
  console.log("draw the pokemon", STORE.state.pokemon);
  let template = "";
  STORE.state.pokemon.forEach(pokemon => {
    template += `<div>${pokemon.name}</div>`;
  });

  if (STORE.state.previous) {
    template += `<button onclick="app.pokemonController.getPokemonList('${STORE.state.previous}')">previous</button>`;
  }

  if (STORE.state.next) {
    template += `<button onclick="app.pokemonController.getPokemonList('${STORE.state.next}')">Next</button>`;
  }
  document.getElementById("pokelist").innerHTML = template;
}
function drawError(error) {
  alert(error);
}

export class PokemonController {
  async getPokemonList(url) {
    try {
      console.log("You clicked the poke button");
      await pokemonService.getPokemonList(url);
      drawPokeList();
    } catch (e) {
      drawError(e);
    }
  }
}
