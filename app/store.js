import { Project } from "./models/Project.js";
import { Contact } from "./models/Contact.js";

let bigTank = new Project({
  id: "8",
  name: "Big Tank",
  description: "this is a big thought project"
});

class Store {
  state = {
    projects: [
      bigTank,
      new Project({
        id: "2",
        name: "CodeWorks",
        description: "dont you wish your code worked"
      })
    ],
    activeProject: bigTank,
    contacts: [
      new Contact({ name: "Jimmy Tester", projectId: "8" }),
      new Contact({ name: "Billy Bob", projectId: "2" })
    ],
    groups: []
  };
}

export const STORE = new Store();
