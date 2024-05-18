import { Store } from './store'

class Todo {
  constructor (title, description, dueDate, priority, parentProjectId) {
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.parentProjectId = parentProjectId
    this.completed = false
    this.id = this.getId()
    this.parentProjectName = this.getParentProjectName(this.parentProjectId)
  }

  toggleCompleted () {
    this.completed = !this.completed
  }

  getId () {
    let lastTodoId = parseInt(localStorage.getItem('lastTodoId')) // Get the last stored ID
    if (isNaN(lastTodoId)) {
      // Check if lastTodoId is NaN
      lastTodoId = -1 // Default to -1
    }
    lastTodoId++
    localStorage.setItem('lastTodoId', lastTodoId) // Store the updated ID
    return lastTodoId
  }

  getParentProjectName (parentProjectId) {
    return Store.getProjectName(parentProjectId)
  }
}

export { Todo }
