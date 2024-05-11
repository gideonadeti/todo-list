import { Store } from './store'

let initalId = 0

class Todo {
  constructor (
    title,
    description,
    dueDate,
    priority,
    parentProjectId
  ) {
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
    return initalId++
  }

  getParentProjectName (parentProjectId) {
    return Store.getProjectName(parentProjectId)
  }
}

export { Todo }
