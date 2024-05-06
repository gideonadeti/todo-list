import "./index.css";

import { Store } from "./modules/store.js";
import { UI } from "./modules/ui.js";
import { Project } from "./modules/project.js";

const navDivs = document.querySelectorAll("nav div");

navDivs.forEach((div) => {
  div.addEventListener("click", () => {
    navDivs.forEach((div) => {
      div.classList.remove("focus");
    });
    div.classList.add("focus");
  });
});

if (Store.getProject("My Todos")) {
  const project = Store.getProject("My Todos");
  UI.displayTodos(project);
} else {
  const defaultProject = new Project("My Todos");
  Store.addProject(defaultProject);
  UI.displayTodos(defaultProject);
}
