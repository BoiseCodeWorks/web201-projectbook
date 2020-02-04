import { ProjectController } from "./controllers/ProjectController.js";
import { ContactsController } from "./controllers/ContactsController.js";
import { PokemonController } from "./controllers/PokemonController.js";

// Entry Point

class App {
  // Container to hold all the things
  projectController = new ProjectController();
  contactsController = new ContactsController();
  pokemonController = new PokemonController();
}

const APP = new App();
window["app"] = APP;
