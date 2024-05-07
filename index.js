import "./index.css";

import { Store } from "./modules/store.js";
import { UI } from "./modules/ui.js";
import { Project } from "./modules/project.js";

const navDivs = document.querySelectorAll("nav div");
const addIcon = document.querySelector(".add-icon");
const addTodoDialog = document.querySelector(".add-todo-dialog");

const closeAddTodoDialog = addTodoDialog.querySelector("button[type='button']");

navDivs.forEach((div) => {
  div.addEventListener("click", () => {
    navDivs.forEach((div) => {
      div.classList.remove("focus");
    });
    div.classList.add("focus");
  });
});

let myTodos = Store.getProject("My Todos");
if (myTodos) {
  UI.displayTodos(myTodos);
} else {
  myTodos = new Project("My Todos");
  Store.addProject(myTodos);
  UI.displayTodos(myTodos);
}

let inbox = Store.getProject("Inbox");
if (!inbox) {
  inbox = new Project("inbox");
  Store.addProject(inbox);
}

addIcon.addEventListener("click", () => {
  addTodoDialog.showModal();
});

closeAddTodoDialog.addEventListener("click", () => {
  addTodoDialog.close();
});
