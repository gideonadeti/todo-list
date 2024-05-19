import { Store } from './store'
import { UI } from './ui'

class DOMManipulation {
  constructor () {
    this.navDivs = document.querySelectorAll('nav div')
    this.addIcon = document.querySelector('.add-icon')
    this.addTodoDialog = document.querySelector('.add-todo-dialog')
    this.addProjectDialog = document.querySelector('.add-project-dialog')
    this.addTodoForm = this.addTodoDialog.querySelector('.add-todo-form')
    this.addProjectForm = this.addProjectDialog.querySelector('.add-project-form')
    this.cancelAddTodoDialogButton = this.addTodoForm.querySelector(
      "button[type='button']"
    )
    this.cancelAddProjectDialogButton = this.addProjectForm.querySelector('button[type="button"]')

    this.updateTodoDialog = document.querySelector('.update-todo-dialog')
    this.updateProjectDialog = document.querySelector('.update-project-dialog')
    this.updateTodoForm =
      this.updateTodoDialog.querySelector('.update-todo-form')
    this.updateProjectForm = this.updateProjectDialog.querySelector('.update-project-form')
    this.cancelUpdateTodoDialogButton = this.updateTodoForm.querySelector(
      "button[type='button']"
    )
    this.cancelUpdateProjectDialogButton = this.updateProjectForm.querySelector('button[type="button"]')

    this.myTodosDiv = document.querySelector('.my-todos')
    this.myProjectsDiv = document.querySelector('.my-projects')

    this.projectsSelect1 = this.addTodoForm.querySelector('#parent-project-name')
    this.projectsSelect2 = this.updateTodoForm.querySelector('#parent-project-name')

    this.setupEventListeners()
  }

  setupEventListeners () {
    this.navDivs.forEach((div) => {
      div.addEventListener('click', () => {
        this.handleNavClick(div)
      })
    })

    this.addIcon.addEventListener('click', this.handleAddIconClick)

    this.cancelAddTodoDialogButton.addEventListener('click', () => {
      this.closeAddTodoDialog()
    })

    this.cancelAddProjectDialogButton.addEventListener('click', () => {
      this.closeAddProjectDialog()
    })

    this.cancelUpdateTodoDialogButton.addEventListener('click', () => {
      this.closeUpdateTodoDialog()
    })

    this.myTodosDiv.addEventListener('click', this.handleMyTodosDivClick)

    this.myProjectsDiv.addEventListener('click', this.handleMyProjectsDivClick)
  }

  handleNavClick (div) {
    this.navDivs.forEach((navDiv) => {
      navDiv.classList.remove('focus')
    })
    div.classList.add('focus')
  }

  handleMyTodosDivClick () {
    const myTodos = Store.getProject(0)
    UI.displayTodos(myTodos)
  }

  handleMyProjectsDivClick () {
    UI.displayProjects()
  }

  handleAddIconClick () {
    if (!document.querySelector('.project-name')) {
      document.querySelector('.add-project-dialog').showModal()
    } else {
      domManipulation.populateProjectsSelect1()
      document.querySelector('.add-todo-dialog').showModal()
    }
  }

  openUpdateTodoDialog () {
    this.updateTodoDialog.showModal()
  }

  openUpdateProjectDialog () {
    this.updateProjectDialog.showModal()
  }

  closeAddTodoDialog () {
    this.addTodoDialog.close()
  }

  closeAddProjectDialog () {
    this.addProjectDialog.close()
  }

  closeUpdateTodoDialog () {
    this.updateTodoDialog.close()
  }

  closeUpdateProjectDialog () {
    this.updateProjectDialog.close()
  }

  clearAddTodoFormValues () {
    this.addTodoForm.querySelector('#title').value = ''
    this.addTodoForm.querySelector('#description').value = ''
    this.addTodoForm.querySelector('#due-date').value = ''
    this.addTodoForm.querySelector('#priority').value = 'medium'
    this.addTodoForm.querySelector('#parent-project-name').value = '1'
  }

  clearAddProjectFormValues () {
    this.addProjectForm.querySelector('#project-name').value = ''
  }

  clearUpdateTodoFormValues () {
    this.updateTodoForm.querySelector('#title').value = ''
    this.updateTodoForm.querySelector('#description').value = ''
    this.updateTodoForm.querySelector('#due-date').value = ''
    this.updateTodoForm.querySelector('#priority').value = 'medium'
    this.updateTodoForm.querySelector('#parent-project-name').value = 'Inbox'
  }

  getAddTodoFormValues () {
    return {
      title: this.addTodoForm.querySelector('#title').value,
      description: this.addTodoForm.querySelector('#description').value,
      dueDate: this.addTodoForm.querySelector('#due-date').value,
      priority: this.addTodoForm.querySelector('#priority').value,
      parentProjectId: +this.addTodoForm.querySelector('#parent-project-name')
        .value
    }
  }

  getAddProjectFormValues () {
    return this.addProjectForm.querySelector('#project-name').value
  }

  getUpdateTodoFormValues () {
    return {
      title: this.updateTodoForm.querySelector('#title').value,
      description: this.updateTodoForm.querySelector('#description').value,
      dueDate: this.updateTodoForm.querySelector('#due-date').value,
      priority: this.updateTodoForm.querySelector('#priority').value,
      parentProjectId: +this.updateTodoForm.querySelector(
        '#parent-project-name'
      ).value
    }
  }

  getUpdateProjectFormValues () {
    return this.updateProjectForm.querySelector('#project-name').value
  }

  populateUpdateTodoFormValues (todo) {
    this.updateTodoForm.querySelector('#title').value = todo.title
    this.updateTodoForm.querySelector('#description').value = todo.description
    this.updateTodoForm.querySelector('#due-date').value = todo.dueDate
    this.updateTodoForm.querySelector('#priority').value = todo.priority
    this.updateTodoForm.querySelector('#parent-project-name').value =
      todo.parentProjectId.toString()
  }

  populateUpdateProjectFormValues (project) {
    this.updateProjectForm.querySelector('#project-name').value = project.name
  }

  populateProjectsSelect1 () {
    const projects = Store.getProjects()
    const filteredProjects = projects.filter((project) => project.id !== 0)

    this.projectsSelect1.innerHTML = ''

    filteredProjects.forEach((project) => {
      const option = document.createElement('option')
      option.value = project.id.toString()
      option.textContent =
        project.name.length > 15
          ? project.name.slice(0, 15) + '...'
          : project.name
      if (project.id === 1) {
        option.selected = true
      }
      this.projectsSelect1.appendChild(option)
    })
  }

  populateProjectsSelect2 () {
    const projects = Store.getProjects()
    const filteredProjects = projects.filter((project) => project.id !== 0)

    this.projectsSelect2.innerHTML = ''

    filteredProjects.forEach((project) => {
      const option = document.createElement('option')
      option.value = project.id.toString()
      option.textContent =
        project.name.length > 15
          ? project.name.slice(0, 15) + '...'
          : project.name
      if (project.id === 1) {
        option.selected = true
      }
      this.projectsSelect2.appendChild(option)
    })
  }
}

const domManipulation = new DOMManipulation()

export { DOMManipulation }
