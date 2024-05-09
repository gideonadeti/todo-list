import './index.css'

import { Store } from './modules/store.js'
import { UI } from './modules/ui.js'
import { Project } from './modules/project.js'
import { Todo } from './modules/todo.js'
import { DOMManipulation } from './modules/domm.js'

const newDOMManipulation = new DOMManipulation()

let myTodos = Store.getProject('My Todos')
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

  const { title, description, dueDate, priority, parentProjectName } =
    newDOMManipulation.getAddTodoFormValues()

  const todo = new Todo(
    title,
    description,
    dueDate,
    priority,
    parentProjectName
  )
  Store.addTodoToProject(todo, 'My Todos')
  Store.addTodoToProject(todo, parentProjectName)

  const myTodos = Store.getProject('My Todos')
  UI.displayTodos(myTodos)

  newDOMManipulation.clearAddTodoFormValues()
  newDOMManipulation.closeAddTodoDialog()
})
