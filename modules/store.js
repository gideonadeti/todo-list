import { DOMManipulation } from './domm'
import { UI } from './ui'

const domManipulation = new DOMManipulation()

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

  static getProjectId (projectName) {
    return this.getProjects().find((project) => project.name === projectName)
      .id
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

    const parentProject = projects.find(
      (project) => project.id === parentProjectId
    )
    parentProject.todos.push(todo)

    const myTodos = projects.find((project) => project.id === 0)
    myTodos.todos.push(todo)

    localStorage.setItem('projects', JSON.stringify(projects))
  }

  static removeTodoFromProject (todoId, parentProjectId) {
    const projects = Store.getProjects()
    const parentProject = projects.find(
      (project) => project.id === parentProjectId
    )
    parentProject.todos = parentProject.todos.filter(
      (todo) => todo.id !== todoId
    )

    const myTodos = projects.find((project) => project.id === 0)
    myTodos.todos = myTodos.todos.filter((todo) => todo.id !== todoId)

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
    myTodo.completed = !myTodo.completed

    localStorage.setItem('projects', JSON.stringify(projects))
  }

  static modifyTodo (todoId, parentProjectId, currentProjectId) {
    const projects = Store.getProjects()
    const parentProject = projects.find(
      (project) => project.id === parentProjectId
    )
    const todo = parentProject.todos.find((todo) => todo.id === todoId)

    const myTodos = projects.find((project) => project.id === 0)
    const myTodo = myTodos.todos.find((todo) => todo.id === todoId)

    const updateTodoHandler = (event) => {
      event.preventDefault()
      const { title, description, dueDate, priority, parentProjectId } =
        domManipulation.getUpdateTodoFormValues()
      todo.title = title
      todo.description = description
      todo.dueDate = dueDate
      todo.priority = priority
      todo.parentProjectId = parentProjectId

      myTodo.title = title
      myTodo.description = description
      myTodo.dueDate = dueDate
      myTodo.priority = priority
      myTodo.parentProjectId = parentProjectId

      localStorage.setItem('projects', JSON.stringify(projects))

      const updatedProject = Store.getProject(currentProjectId)
      UI.displayTodos(updatedProject)
      domManipulation.closeUpdateTodoDialog()
    }

    domManipulation.populateUpdateTodoFormValues(todo)
    domManipulation.openUpdateTodoDialog()
    domManipulation.updateTodoForm.addEventListener(
      'submit',
      updateTodoHandler
    )
  }

  static modifyProject (projectId) {
    const projects = this.getProjects()

    const project = projects.find((project) => project.id === projectId)

    const updateProjectHandler = (event) => {
      event.preventDefault()

      const updatedName = domManipulation.getUpdateProjectFormValues()

      project.name = updatedName

      localStorage.setItem('projects', JSON.stringify(projects))
      UI.displayProjects()
      domManipulation.closeUpdateProjectDialog()
    }

    domManipulation.populateUpdateProjectFormValues(project)
    domManipulation.openUpdateProjectDialog()
    domManipulation.updateProjectForm.addEventListener(
      'submit',
      updateProjectHandler
    )
  }
}

export { Store }
