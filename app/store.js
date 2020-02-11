import { Project } from "./models/Project.js";
import { Contact } from "./models/Contact.js";
import { Pokemon } from "./models/Pokemon.js";

let bigTank = new Project({
  id: "8",
  name: "Big Tank",
  description: "this is a big thought project"
});

let _subscribers = {
  projects: [],
  activeProject: [],
  contacts: [],
  groups: [],
  pokemon: [],
  myPokemon: [],
  activePokemon: [],
  next: [],
  previous: []
};

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
    groups: [],
    /**
     * @type {Pokemon[]}
     */
    pokemon: [],
    /**
     * @type {Pokemon[]}
     */
    myPokemon: [],
    activePokemon: new Pokemon(),
    next: "",
    previous: ""
  };

  /**
   * Subscribe to data events on the state
   * @param {string} prop
   * @param {Function} fn
   */
  subscribe(prop, fn) {
    // SANITY CHECKS
    if (!_subscribers.hasOwnProperty(prop)) {
      throw new Error(
        `Unable to subscribe to ${prop} because it is not registered as a subscribable`
      );
    }
    if (typeof fn != "function") {
      throw new Error(
        `Unable to subscribe to ${prop} please provide a function`
      );
    }
    _subscribers[prop].push(fn);
  }

  commit(prop, data) {
    if (
      !this.state.hasOwnProperty(prop) ||
      !_subscribers.hasOwnProperty(prop)
    ) {
      throw new Error(
        `Unable to update ${prop} because it is not registered in the state`
      );
    }
    // TODO save for later create a state snapshot or history COMMAND PATTERN
    this.state[prop] = data;
    _subscribers[prop].forEach(fn => fn());
  }
}

export const STORE = new Store();
