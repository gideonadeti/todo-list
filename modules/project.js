class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
    this.id = this.getId();
  }

  getId() {
    let lastProjectId = parseInt(localStorage.getItem("lastProjectId"));
    if (isNaN(lastProjectId)) {
      lastProjectId = -1;
    }
    lastProjectId++;
    localStorage.setItem("lastProjectId", lastProjectId);
    return lastProjectId;
  }
}

export { Project };
