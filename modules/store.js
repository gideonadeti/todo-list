class Store {
  static getProjects() {
    return localStorage.getItem("projects")
      ? JSON.parse(localStorage.getItem("projects"))
      : [];
  }

  static getProject(projectName) {
    const projects = this.getProjects();
    return projects.find((proj) => proj.name === projectName);
  }

  static addProject(project) {
    const projects = this.getProjects();
    if (projects.some((proj) => proj.name === project.name)) {
      return;
    }
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  static addTodoToProject(todo, projectName, index = undefined) {
    const projects = Store.getProjects();
    const project = projects.find((proj) => proj.name === projectName);
    if (index) {
      project.todos.splice(index, 0, todo);
    } else {
      project.todos.push(todo);
    }
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  static removeTodoFromProject(index, projectName) {
    const projects = Store.getProjects();
    const project = projects.find((proj) => proj.name === projectName);
    project.todos.splice(index, 1);
    localStorage.setItem("projects", JSON.stringify(projects));
  }
}

export { Store };
