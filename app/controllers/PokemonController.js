import { pokemonService } from "../services/PokemonService.js";
import { STORE } from "../store.js";

function drawPokeList() {
  console.log("draw the pokemon", STORE.state.pokemon);
}
function drawError(error){
  
}

export class PokemonController {
  getPokemonList() {
    try {
      console.log("You clicked the poke button");
      pokemonService.getPokemonList(drawPokeList, drawError);
    } catch (e) {
      alert(e);
    }
  }
}
