import { projectService } from "../services/ProjectService.js";
import { STORE } from "../store.js";

// Private Parts
function drawProjects() {
  let template = "";
  STORE.state.projects.forEach(project => {
    template += project.ListTemplate;
  });

  document.getElementById("projects").innerHTML = template;
}

function drawProjectDetails() {
  let project = STORE.state.activeProject;
  if (!project.id) {
    return;
  }
  document.getElementById("projectDetails").innerHTML = project.DetailTemplate;
}

function drawPokemon() {
  document.getElementById("temp-card").innerHTML =
    STORE.state.activePokemon.MyPokemonTemplate;
}

// The controllers job is to manage view
export class ProjectController {
  constructor() {
    drawProjects();
    drawProjectDetails();
    STORE.subscribe("activePokemon", drawPokemon);
  }

  // Public Parts
  createProject() {
    event.preventDefault();
    let form = event.target;
    try {
      projectService.createProject({
        // @ts-ignore
        name: form.projectName.value,
        // @ts-ignore
        description: form.projectDescription.value
      });
      // @ts-ignore
      form.reset();
      drawProjects();
    } catch (error) {
      alert(error);
    }
  }

  viewProject(projectId) {
    try {
      projectService.setActiveProject(projectId);
      drawProjectDetails();
    } catch (error) {
      alert(error);
    }
  }
}
