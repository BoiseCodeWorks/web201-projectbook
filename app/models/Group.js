import { generateId } from "../utils.js";

export class Group {
  constructor({ name, color, projectId, id = generateId() }) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.projectId = projectId;
  }
}
