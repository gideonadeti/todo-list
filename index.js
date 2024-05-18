import "./index.css";

import { Store } from "./modules/store.js";
import { UI } from "./modules/ui.js";
import { Project } from "./modules/project.js";
import { Todo } from "./modules/todo.js";
import { DOMManipulation } from "./modules/domm.js";

const domManipulation = new DOMManipulation();

let myTodos = Store.getProject(0);
if (myTodos) {
  UI.displayTodos(myTodos);
} else {
  myTodos = new Project("My Todos");
  Store.addProject(myTodos);
  UI.displayTodos(myTodos);
}

let inbox = Store.getProject(1);
if (!inbox) {
  inbox = new Project("Inbox");
  Store.addProject(inbox);
}

domManipulation.addTodoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const { title, description, dueDate, priority, parentProjectId } =
    domManipulation.getAddTodoFormValues();

  const todo = new Todo(title, description, dueDate, priority, parentProjectId);

  Store.addTodoToProject(todo, parentProjectId);

  const currentProjectName =
    document.querySelector(".project-name").textContent;
  const currentProjectId = Store.getProjectId(currentProjectName);

  const currentProject = Store.getProject(currentProjectId);
  UI.displayTodos(currentProject);

  domManipulation.clearAddTodoFormValues();
  domManipulation.closeAddTodoDialog();
});

domManipulation.addProjectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const projectName = domManipulation.getAddProjectFormValues();
  const newProject = new Project(projectName);
  Store.addProject(newProject);

  UI.displayProjects();

  domManipulation.clearAddProjectFormValues();
  domManipulation.closeAddProjectDialog();
});
