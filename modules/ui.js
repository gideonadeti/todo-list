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
    heading.textContent = project.name
    headingDiv.appendChild(heading)

    project.todos.forEach((todo, index) => {
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
      todoStatus.classList.add('switch')
      todoStatus.checked = todo.completed
      if (todoStatus.checked) {
        todoDiv.classList.add('completed')
      }
      controlsDiv.appendChild(todoStatus)

      todoStatus.addEventListener('change', () => {
        Store.modifyTodoStatus(index, 'My Todos')
        Store.modifyTodoStatus(index, todo.parentProjectName)
        const updatedProject = Store.getProject(project.name)
        this.displayTodos(updatedProject)
      })

      const editOrViewTodoIconAndDeleteTodoIconDiv =
        document.createElement('div')

      const editOrViewTodoIcon = document.createElement('span')
      editOrViewTodoIcon.classList.add('mdi', 'mdi-pencil-outline')
      editOrViewTodoIconAndDeleteTodoIconDiv.appendChild(editOrViewTodoIcon)

      const deleteTodoIcon = document.createElement('span')
      deleteTodoIcon.classList.add('mdi', 'mdi-delete-outline')
      editOrViewTodoIconAndDeleteTodoIconDiv.appendChild(deleteTodoIcon)

      deleteTodoIcon.addEventListener('click', () => {
        Store.removeTodoFromProject(index, 'My Todos')
        Store.removeTodoFromProject(index, todo.parentProjectName)
        const updatedProject = Store.getProject(project.name)
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
}

export { UI }
