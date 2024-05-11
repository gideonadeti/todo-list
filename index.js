import './index.css'

import { Store } from './modules/store.js'
import { UI } from './modules/ui.js'
import { Project } from './modules/project.js'
import { Todo } from './modules/todo.js'
import { DOMManipulation } from './modules/domm.js'

const newDOMManipulation = new DOMManipulation()

let myTodos = Store.getProject(0)
if (myTodos) {
  UI.displayTodos(myTodos)
} else {
  myTodos = new Project('My Todos')
  Store.addProject(myTodos)
  UI.displayTodos(myTodos)
}

let inbox = Store.getProject('Inbox')
if (!inbox) {
  inbox = new Project('Inbox')
  Store.addProject(inbox)
}

newDOMManipulation.addTodoForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const { title, description, dueDate, priority, parentProjectId } =
    newDOMManipulation.getAddTodoFormValues()

  const todo = new Todo(
    title,
    description,
    dueDate,
    priority,
    parentProjectId
  )

  Store.addTodoToProject(todo, parentProjectId)

  // TODO: Implement a functionality for getting the current project-name so that that is updated

  const myTodos = Store.getProject(0)
  UI.displayTodos(myTodos)

  newDOMManipulation.clearAddTodoFormValues()
  newDOMManipulation.closeAddTodoDialog()
})
