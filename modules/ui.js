import { format, parseISO } from 'date-fns'
import { Store } from './store.js'

class UI {
  static displayTodos (project) {
    const containerDiv = document.querySelector('.container')
    const headingDiv = document.querySelector('.heading')
    const contentDiv = document.querySelector('.content')

    headingDiv.innerHTML = ''
    contentDiv.innerHTML = ''

    const heading = document.createElement('h1')
    heading.classList.add('project-name')
    heading.textContent = project.name
    headingDiv.appendChild(heading)

    project.todos.forEach((todo) => {
      const todoDiv = document.createElement('div')
      todoDiv.classList.add('todo')

      const todoTitle = document.createElement('h2')
      todoTitle.classList.add('title')
      todoTitle.textContent =
        todo.title.length > 10 ? todo.title.slice(0, 10) + '...' : todo.title

      const todoDescription = document.createElement('p')
      todoDescription.textContent =
        todo.description.length > 30
          ? todo.description.slice(0, 30) + '...'
          : todo.description

      const todoDueDate = document.createElement('p')
      const dueDate = parseISO(todo.dueDate)
      const formattedDueDate = format(dueDate, "do MMMM',' yyyy")
      todoDueDate.textContent = formattedDueDate

      const priorityAndParentProjectNameDiv = document.createElement('div')
      priorityAndParentProjectNameDiv.classList.add(
        'priority-and-parent-project-name'
      )

      const todoPriority = document.createElement('p')
      todoPriority.classList.add('priority', todo.priority)
      todoPriority.textContent = todo.priority.toUpperCase()
      priorityAndParentProjectNameDiv.appendChild(todoPriority)

      const todoParentProjectName = document.createElement('p')
      todoParentProjectName.classList.add('parent-project-name')
      todoParentProjectName.textContent = todo.parentProjectName
      priorityAndParentProjectNameDiv.appendChild(todoParentProjectName)

      const controlsDiv = document.createElement('div')
      controlsDiv.classList.add('controls')

      const todoStatus = document.createElement('input')
      todoStatus.type = 'checkbox'
      todoStatus.checked = todo.completed
      if (todoStatus.checked) {
        todoDiv.classList.add('completed')
      }
      controlsDiv.appendChild(todoStatus)

      todoStatus.addEventListener('change', () => {
        Store.modifyTodoStatus(todo.id, todo.parentProjectId)

        const updatedProject = Store.getProject(project.id)
        this.displayTodos(updatedProject)
      })

      const editOrViewTodoIconAndDeleteTodoIconDiv =
        document.createElement('div')

      const editOrViewTodoIcon = document.createElement('span')
      editOrViewTodoIcon.classList.add('mdi', 'mdi-pencil-outline')
      editOrViewTodoIconAndDeleteTodoIconDiv.appendChild(editOrViewTodoIcon)

      editOrViewTodoIcon.addEventListener('click', () => {
        Store.modifyTodo(todo.id, todo.parentProjectId, project.id)
      })

      const deleteTodoIcon = document.createElement('span')
      deleteTodoIcon.classList.add('mdi', 'mdi-delete-outline')
      editOrViewTodoIconAndDeleteTodoIconDiv.appendChild(deleteTodoIcon)

      deleteTodoIcon.addEventListener('click', () => {
        Store.removeTodoFromProject(todo.id, todo.parentProjectId)

        const updatedProject = Store.getProject(project.id)
        this.displayTodos(updatedProject)
      })

      controlsDiv.appendChild(editOrViewTodoIconAndDeleteTodoIconDiv)

      todoDiv.appendChild(todoTitle)
      todoDiv.appendChild(todoDescription)
      todoDiv.appendChild(todoDueDate)
      todoDiv.appendChild(priorityAndParentProjectNameDiv)
      todoDiv.appendChild(controlsDiv)

      contentDiv.appendChild(todoDiv)
    })
    containerDiv.appendChild(headingDiv)
    containerDiv.appendChild(contentDiv)
  }

  static displayProjects () {
    const containerDiv = document.querySelector('.container')
    const headingDiv = document.querySelector('.heading')
    const contentDiv = document.querySelector('.content')

    headingDiv.innerHTML = ''
    contentDiv.innerHTML = ''

    const heading = document.createElement('h1')
    heading.textContent = 'My Projects'
    headingDiv.appendChild(heading)

    const projects = Store.getProjects().filter((project) => project.id !== 0)

    projects.forEach((project) => {
      const numOfTodos = project.todos.length
      const numOfCompletedTodos = project.todos.filter(
        (todo) => todo.completed
      ).length
      const numOfIncompleteTodos = numOfTodos - numOfCompletedTodos

      const projectDiv = document.createElement('div')
      projectDiv.classList.add('project')

      const projectName = document.createElement('h2')
      projectName.classList.add('name')
      projectName.textContent =
        project.name.length > 10
          ? project.name.slice(0, 10) + '...'
          : project.name

      const numOfTodosP = document.createElement('p')
      numOfTodosP.classList.add('todos')
      numOfTodosP.textContent =
        numOfTodos > 1 ? `${numOfTodos} todos` : `${numOfTodos} todo`

      const numOfIncompleteTodosP = document.createElement('p')
      numOfIncompleteTodosP.classList.add('incomplete-todos')
      numOfIncompleteTodosP.textContent = `${numOfIncompleteTodos} incomplete`

      const numOfCompletedTodosP = document.createElement('p')
      numOfCompletedTodosP.classList.add('completed-todos')
      numOfCompletedTodosP.textContent = `${numOfCompletedTodos} completed`

      const controlsDiv = document.createElement('div')
      controlsDiv.classList.add('controls')

      const viewDiv = document.createElement('div')
      viewDiv.classList.add('mdi', 'mdi-eye-outline')
      controlsDiv.appendChild(viewDiv)

      viewDiv.addEventListener('click', () => {
        this.displayTodos(project)
      })

      const editAndDeleteProjectIconsDiv = document.createElement('div')

      const editProjectIcon = document.createElement('span')
      editProjectIcon.classList.add('mdi', 'mdi-pencil-outline')
      editAndDeleteProjectIconsDiv.appendChild(editProjectIcon)

      editProjectIcon.addEventListener('click', () => {
        if (project.id !== 1) {
          Store.modifyProject(project.id)
        }
      })

      const deleteProjectIcon = document.createElement('span')
      deleteProjectIcon.classList.add('mdi', 'mdi-delete-outline')
      editAndDeleteProjectIconsDiv.appendChild(deleteProjectIcon)

      deleteProjectIcon.addEventListener('click', () => {
        if (project.id !== 1) {
          Store.removeProject(project.id)
          this.displayProjects()
        }
      })

      controlsDiv.appendChild(editAndDeleteProjectIconsDiv)

      projectDiv.appendChild(projectName)
      projectDiv.appendChild(numOfTodosP)
      projectDiv.appendChild(numOfIncompleteTodosP)
      projectDiv.appendChild(numOfCompletedTodosP)
      projectDiv.appendChild(controlsDiv)

      contentDiv.appendChild(projectDiv)
    })

    containerDiv.appendChild(headingDiv)
    containerDiv.appendChild(contentDiv)
  }
}

export { UI }
