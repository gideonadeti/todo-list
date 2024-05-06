import { format, parseISO } from "date-fns";

class UI {
  static displayTodos(project) {
    const containerDiv = document.querySelector(".container");
    const headingDiv = document.querySelector(".heading");
    const contentDiv = document.querySelector(".content");

    headingDiv.innerHTML = "";
    contentDiv.innerHTML = "";

    const heading = document.createElement("h1");
    heading.textContent = project.name;
    headingDiv.appendChild(heading);

    project.todos.forEach((todo) => {
      const todoDiv = document.createElement("div");

      const todoTitle = document.createElement("h2");
      todoTitle.textContent =
        todo.title.length > 10 ? todo.title.slice(0, 10) + "..." : todo.title;

      const todoDescription = document.createElement("p");
      todoDescription.textContent =
        todo.description.length > 20
          ? todo.description.slice(0, 20) + "..."
          : todo.description;

      const todoDueDate = document.createElement("p");
      const dueDate = parseISO(todo.dueDate);
      const formattedDueDate = format(dueDate, "do MMMM',' yyyy");
      todoDueDate.textContent = formattedDueDate;

      const priorityAndParentProjectNameDiv = document.createElement("div");

      const todoPriority = document.createElement("p");
      todoPriority.textContent = todo.priority.toUpperCase();
      priorityAndParentProjectNameDiv.appendChild(todoPriority);

      const todoParentProjectName = document.createElement("p");
      todoParentProjectName.textContent = todo.parentProjectName;
      priorityAndParentProjectNameDiv.appendChild(todoParentProjectName);

      const controlsDiv = document.createElement("div");

      const todoStatus = document.createElement("input");
      todoStatus.type = "checkbox";
      todoStatus.checked = todo.completed;
      controlsDiv.appendChild(todoStatus);

      const editOrViewTodoIconAndDeleteTodoIconDiv =
        document.createElement("div");

      const editOrViewTodoIcon = document.createElement("span");
      editOrViewTodoIcon.classList.add("mdi", "mdi-pencil-outline");
      editOrViewTodoIconAndDeleteTodoIconDiv.appendChild(editOrViewTodoIcon);

      const deleteTodoIcon = document.createElement("span");
      deleteTodoIcon.classList.add("mdi", "mdi-delete-outline", "delete-icon");
      editOrViewTodoIconAndDeleteTodoIconDiv.appendChild(deleteTodoIcon);

      controlsDiv.appendChild(editOrViewTodoIconAndDeleteTodoIconDiv);

      todoDiv.appendChild(todoTitle);
      todoDiv.appendChild(todoDescription);
      todoDiv.appendChild(todoDueDate);
      todoDiv.appendChild(priorityAndParentProjectNameDiv);
      todoDiv.appendChild(controlsDiv);

      contentDiv.appendChild(todoDiv);
    });
    containerDiv.appendChild(headingDiv);
    containerDiv.appendChild(contentDiv);
  }
}

export { UI };
