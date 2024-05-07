import "./index.css";

import { Store } from "./modules/store.js";
import { UI } from "./modules/ui.js";
import { Project } from "./modules/project.js";
import { Todo } from "./modules/todo.js";

const navDivs = document.querySelectorAll("nav div");
const addIcon = document.querySelector(".add-icon");
const addTodoDialog = document.querySelector(".add-todo-dialog");
const addTodoForm = addTodoDialog.querySelector(".add-todo-form");

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
  inbox = new Project("Inbox");
  Store.addProject(inbox);
}

function clearAddTodoFormValues() {
  addTodoForm.querySelector("#title").value = "";
  addTodoForm.querySelector("#description").value = "";
  addTodoForm.querySelector("#due-date").value = "";
  addTodoForm.querySelector("#priority").value = "medium";
  addTodoForm.querySelector("#parent-project-name").value = "Inbox";
}

addIcon.addEventListener("click", () => {
  addTodoDialog.showModal();
});

closeAddTodoDialog.addEventListener("click", () => {
  addTodoDialog.close();
});

addTodoDialog.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = addTodoForm.querySelector("#title").value;
  const description = addTodoForm.querySelector("#description").value;
  const dueDate = addTodoForm.querySelector("#due-date").value;
  const priority = addTodoForm.querySelector("#priority").value;
  const parentProjectName = addTodoForm.querySelector(
    "#parent-project-name"
  ).value;

  const todo = new Todo(
    title,
    description,
    dueDate,
    priority,
    parentProjectName
  );
  Store.addTodoToProject(todo, "My Todos");
  Store.addTodoToProject(todo, parentProjectName);

  const myTodos = Store.getProject("My Todos");
  UI.displayTodos(myTodos);

  clearAddTodoFormValues();
  addTodoDialog.close();
});
