import { DOMManipulation } from './domm'
import { UI } from './ui'

const domManipulation = new DOMManipulation()

class Store {
  static getProjects () {
    return JSON.parse(localStorage.getItem('projects')) || []
  }

  static getProject (projectId) {
    return this.getProjects().find((proj) => proj.id === projectId)
  }

  static getProjectName (projectId) {
    return this.getProjects().find((proj) => proj.id === projectId).name
  }

  static getProjectId (projectName) {
    return this.getProjects().find((proj) => proj.name === projectName).id
  }

  static addProject (project) {
    const projects = this.getProjects()
    if (!projects.some((proj) => proj.id === project.id)) {
      projects.push(project)
      localStorage.setItem('projects', JSON.stringify(projects))
    }
  }

  static addTodoToProject (todo, projectId) {
    const projects = this.getProjects()

    // Add todo to parent project
    projects.find((proj) => proj.id === projectId).todos.push(todo)

    // Add todo to master project
    projects.find((proj) => proj.id === 0).todos.push(todo)

    localStorage.setItem('projects', JSON.stringify(projects))
  }

  static removeTodoFromProject (todoId, projectId) {
    const projects = this.getProjects()
    const project = projects.find((proj) => proj.id === projectId)
    const myTodos = projects.find((proj) => proj.id === 0)

    // Remove todo from parent project
    project.todos = project.todos.filter((todo) => todo.id !== todoId)

    // Remove todo from master project
    myTodos.todos = myTodos.todos.filter((todo) => todo.id !== todoId)

    localStorage.setItem('projects', JSON.stringify(projects))
  }

  static handleTodoStatusChange (todoId, projectId) {
    const projects = this.getProjects()

    const project = projects.find((proj) => proj.id === projectId)
    const myTodos = projects.find((proj) => proj.id === 0)

    const todo = project.todos.find((todo) => todo.id === todoId)
    const myTodo = myTodos.todos.find((todo) => todo.id === todoId)

    todo.completed = !todo.completed
    myTodo.completed = !myTodo.completed

    localStorage.setItem('projects', JSON.stringify(projects))
  }

  static handleTodoModification (todoId, projectId, currentProjectId) {
    const projects = this.getProjects()
    const project = projects.find((proj) => proj.id === projectId)
    const todo = project.todos.find((todo) => todo.id === todoId)

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
      todo.parentProjectName = this.getProjectName(parentProjectId)

      myTodo.title = title
      myTodo.description = description
      myTodo.dueDate = dueDate
      myTodo.priority = priority
      myTodo.parentProjectId = parentProjectId
      myTodo.parentProjectName = this.getProjectName(parentProjectId)

      if (parentProjectId !== projectId) {
        // Remove todo from the old parent project
        const oldParentProject = projects.find((proj) => proj.id === projectId)
        oldParentProject.todos = oldParentProject.todos.filter(
          (todo) => todo.id !== todoId
        )

        // Add todo to the new parent project
        const newParentProject = projects.find(
          (proj) => proj.id === parentProjectId
        )
        newParentProject.todos.push(todo)
      }

      localStorage.setItem('projects', JSON.stringify(projects))

      const updatedProject = Store.getProject(currentProjectId)
      UI.displayTodos(updatedProject)
      domManipulation.closeUpdateTodoDialog()
      domManipulation.updateTodoForm.removeEventListener(
        'submit',
        updateTodoHandler
      )
    }
    domManipulation.populateProjectsSelect2()
    domManipulation.populateUpdateTodoFormValues(todo)
    domManipulation.openUpdateTodoDialog()
    domManipulation.updateTodoForm.addEventListener(
      'submit',
      updateTodoHandler
    )
  }

  static handleProjectModification (projectId) {
    const projects = this.getProjects()
    const project = projects.find((proj) => proj.id === projectId)
    const myTodos = projects.find((proj) => proj.id === 0)

    const updateProjectHandler = (event) => {
      event.preventDefault()
      const updatedName = domManipulation.getUpdateProjectFormValues()
      project.name = updatedName

      // Update parentProjectNames of it's todos
      project.todos.forEach((todo) => {
        todo.parentProjectName = updatedName
      })

      myTodos.todos.forEach((todo) => {
        if (project.todos.some((projTodo) => projTodo.id === todo.id)) {
          todo.parentProjectName = updatedName
        }
      })

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

  static handleProjectDeletion (projectId) {
    const projects = this.getProjects()
    const filteredProjects = projects.filter((proj) => proj.id !== projectId)

    const removedProject = projects.find((proj) => proj.id === projectId)
    const myTodos = projects.find((project) => project.id === 0)

    removedProject.todos.forEach((todo) => {
      myTodos.todos = myTodos.todos.filter((myTodo) => myTodo.id !== todo.id)
    })

    localStorage.setItem('projects', JSON.stringify(filteredProjects))
  }
}

export { Store }
