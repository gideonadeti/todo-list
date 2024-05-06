class Store {
  static getProjects() {
    return localStorage.getItem("projects") === null
      ? []
      : JSON.parse(localStorage.getItem("projects"));
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
}

export { Store };
