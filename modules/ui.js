import { format, parseISO } from 'date-fns'
import { Store } from './store.js'

class UI {
  static displayTodos (project) {
    const containerDiv = document.querySelector('.container')
    const headingDiv = document.querySelector('.heading')
    const contentDiv = document.querySelector('.content')

    headingDiv.innerHTML = ''
    contentDiv.innerHTML = ''

    UI.createHeading(headingDiv, project.name)
    if (project.todos.length === 0) {
      contentDiv.classList.add('empty')
      const emptyMessage = UI.createElement(
        'h2',
        'empty-message',
        'No todos available.'
      )
      contentDiv.appendChild(emptyMessage)
    } else {
      contentDiv.classList.remove('empty')
      project.todos.forEach((todo) =>
        UI.createTodoElement(contentDiv, todo, project)
      )
    }

    containerDiv.appendChild(headingDiv)
    containerDiv.appendChild(contentDiv)
  }

  static displayProjects () {
    const containerDiv = document.querySelector('.container')
    const headingDiv = document.querySelector('.heading')
    const contentDiv = document.querySelector('.content')

    headingDiv.innerHTML = ''
    contentDiv.innerHTML = ''

    contentDiv.classList.remove('empty')

    UI.createHeading(headingDiv, 'My Projects')
    const projects = Store.getProjects().filter((project) => project.id !== 0)

    projects.forEach((project) => UI.createProjectElement(contentDiv, project))

    containerDiv.appendChild(headingDiv)
    containerDiv.appendChild(contentDiv)
  }

  static createHeading (container, text) {
    const heading = document.createElement('h1')
    if (text !== 'My Projects') {
      heading.classList.add('project-name')
    }
    heading.textContent = text
    container.appendChild(heading)
  }

  static createTodoElement (container, todo, project) {
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    todoDiv.appendChild(
      UI.createElement('h2', 'title', UI.truncateText(todo.title, 15))
    )
    todoDiv.appendChild(
      UI.createElement('p', '', UI.truncateText(todo.description, 30))
    )
    todoDiv.appendChild(UI.createElement('p', '', UI.formatDate(todo.dueDate)))

    const priorityAndParentProjectNameDiv = document.createElement('div')
    priorityAndParentProjectNameDiv.classList.add(
      'priority-and-parent-project-name'
    )
    priorityAndParentProjectNameDiv.appendChild(
      UI.createElement(
        'p',
        `priority ${todo.priority}`,
        todo.priority.toUpperCase()
      )
    )
    priorityAndParentProjectNameDiv.appendChild(
      UI.createElement('p', 'parent-project-name', todo.parentProjectName)
    )

    const controlsDiv = document.createElement('div')
    controlsDiv.classList.add('controls')
    const todoStatus = UI.createTodoStatusCheckbox(todo, project)
    controlsDiv.appendChild(todoStatus)

    const iconsDiv = UI.createTodoIcons(todo, project)
    controlsDiv.appendChild(iconsDiv)

    todoDiv.appendChild(priorityAndParentProjectNameDiv)
    todoDiv.appendChild(controlsDiv)

    if (todoStatus.checked) {
      todoDiv.classList.add('completed')
    }

    container.appendChild(todoDiv)
  }

  static createProjectElement (container, project) {
    const projectDiv = document.createElement('div')
    projectDiv.classList.add('project')

    projectDiv.appendChild(
      UI.createElement('h2', 'name', UI.truncateText(project.name, 15))
    )
    projectDiv.appendChild(
      UI.createElement(
        'p',
        'todos',
        `${project.todos.length} todo${project.todos.length > 1 ? 's' : ''}`
      )
    )
    projectDiv.appendChild(
      UI.createElement(
        'p',
        'incomplete-todos',
        `${project.todos.filter((todo) => !todo.completed).length} incomplete`
      )
    )
    projectDiv.appendChild(
      UI.createElement(
        'p',
        'completed-todos',
        `${project.todos.filter((todo) => todo.completed).length} completed`
      )
    )

    const controlsDiv = document.createElement('div')
    controlsDiv.classList.add('controls')

    const viewDiv = UI.createElement('div', 'mdi mdi-eye-outline', '')
    viewDiv.addEventListener('click', () => UI.displayTodos(project))
    controlsDiv.appendChild(viewDiv)

    const editAndDeleteIconsDiv = UI.createProjectIcons(project)
    controlsDiv.appendChild(editAndDeleteIconsDiv)

    projectDiv.appendChild(controlsDiv)
    container.appendChild(projectDiv)
  }

  static createElement (tag, className, textContent) {
    const element = document.createElement(tag)
    if (className) element.classList.add(...className.split(' '))
    element.textContent = textContent
    return element
  }

  static truncateText (text, length) {
    return text.length > length ? text.slice(0, length) + '...' : text
  }

  static formatDate (dateString) {
    const date = parseISO(dateString)
    return format(date, "do MMMM',' yyyy")
  }

  static createTodoStatusCheckbox (todo, project) {
    const todoStatus = document.createElement('input')
    todoStatus.type = 'checkbox'
    todoStatus.checked = todo.completed

    todoStatus.addEventListener('change', () => {
      Store.handleTodoStatusChange(todo.id, todo.parentProjectId)
      UI.displayTodos(Store.getProject(project.id))
    })
    return todoStatus
  }

  static createTodoIcons (todo, project) {
    const iconsDiv = document.createElement('div')

    const editIcon = UI.createElement('span', 'mdi mdi-pencil-outline', '')
    editIcon.addEventListener('click', () =>
      Store.handleTodoModification(todo.id, todo.parentProjectId, project.id)
    )
    iconsDiv.appendChild(editIcon)

    const deleteIcon = UI.createElement('span', 'mdi mdi-delete-outline', '')
    deleteIcon.addEventListener('click', () => {
      Store.removeTodoFromProject(todo.id, todo.parentProjectId)
      UI.displayTodos(Store.getProject(project.id))
    })
    iconsDiv.appendChild(deleteIcon)

    return iconsDiv
  }

  static createProjectIcons (project) {
    const iconsDiv = document.createElement('div')

    const editIcon = UI.createElement('span', 'mdi mdi-pencil-outline', '')
    editIcon.addEventListener('click', () => {
      if (project.id !== 1) {
        Store.handleProjectModification(project.id)
      }
    })
    iconsDiv.appendChild(editIcon)

    const deleteIcon = UI.createElement('span', 'mdi mdi-delete-outline', '')
    deleteIcon.addEventListener('click', () => {
      if (project.id !== 1) {
        Store.handleProjectDeletion(project.id)
        UI.displayProjects()
      }
    })
    iconsDiv.appendChild(deleteIcon)

    return iconsDiv
  }
}

export { UI }
