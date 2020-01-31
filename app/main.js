import { ProjectController } from "./controllers/ProjectController.js";
import { ContactsController } from "./controllers/ContactsController.js";

// Entry Point

class App {
  // Container to hold all the things
  projectController = new ProjectController();
  contactsController = new ContactsController();
}

const APP = new App();
window["app"] = APP;
