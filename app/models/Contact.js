import { generateId } from "../utils.js";

export class Contact {
  constructor({ name, projectId, id = generateId() }) {
    this.id = id;
    this.name = name;
    this.projectId = projectId;
  }

  get ListTemplate() {
    return /*html */ `
      <div class="contact">
        ${this.name}
      </div>
    `;
  }
}
