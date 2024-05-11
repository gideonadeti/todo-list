class Store {
  static getProjects () {
    return localStorage.getItem('projects')
      ? JSON.parse(localStorage.getItem('projects'))
      : []
  }

  static getProject (projectId) {
    const projects = this.getProjects()
    return projects.find((proj) => proj.id === projectId)
  }

  static getProjectName (projectId) {
    return this.getProjects().find((proj) => proj.id === projectId).name
  }

  static addProject (project) {
    const projects = this.getProjects()
    if (projects.some((proj) => proj.id === project.id)) {
      return
    }
    projects.push(project)
    localStorage.setItem('projects', JSON.stringify(projects))
  }

  static addTodoToProject (todo, parentProjectId) {
    const projects = Store.getProjects()

    const parentProject = projects.find((project) => project.id === parentProjectId)
    parentProject.todos.push(todo)

    const myTodos = projects.find((project) => project.id === 0)
    myTodos.todos.push(todo)

    localStorage.setItem('projects', JSON.stringify(projects))
  }

  static removeTodoFromProject (todoId, parentProjectId) {
    const projects = Store.getProjects()
    const parentProject = projects.find((project) => project.id === parentProjectId)
    parentProject.todos = parentProject.todos.filter((todo) => todo.id !== todoId)
    localStorage.setItem('projects', JSON.stringify(projects))
  }

  static modifyTodoStatus (todoId, parentProjectId) {
    const projects = Store.getProjects()
    const parentProject = projects.find(
      (project) => project.id === parentProjectId
    )
    const todo = parentProject.todos.find((todo) => todo.id === todoId)
    todo.completed = !todo.completed

    const myTodos = projects.find((project) => project.id === 0)
    const myTodo = myTodos.todos.find((todo) => todo.id === todoId)
    myTodo.completed = !todo.completed

    localStorage.setItem('projects', JSON.stringify(projects))
  }
}

export { Store }
