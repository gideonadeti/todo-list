import { Store } from './store'
import { UI } from './ui'

class DOMManipulation {
  constructor () {
    // Initialize DOM elements
    this.initializeDOMElements()

    // Setup event listeners
    this.setupEventListeners()
  }

  initializeDOMElements () {
    this.navDivs = document.querySelectorAll('nav div')
    this.addIcon = document.querySelector('.add-icon')
    this.addTodoDialog = document.querySelector('.add-todo-dialog')
    this.addProjectDialog = document.querySelector('.add-project-dialog')
    this.addTodoForm = this.addTodoDialog.querySelector('.add-todo-form')
    this.addProjectForm =
      this.addProjectDialog.querySelector('.add-project-form')
    this.updateTodoDialog = document.querySelector('.update-todo-dialog')
    this.updateProjectDialog = document.querySelector('.update-project-dialog')
    this.updateTodoForm =
      this.updateTodoDialog.querySelector('.update-todo-form')
    this.updateProjectForm = this.updateProjectDialog.querySelector(
      '.update-project-form'
    )
    this.myTodosDiv = document.querySelector('.my-todos')
    this.myProjectsDiv = document.querySelector('.my-projects')
    this.projectsSelect1 = this.addTodoForm.querySelector(
      '#parent-project-name'
    )
    this.projectsSelect2 = this.updateTodoForm.querySelector(
      '#parent-project-name'
    )
    this.dateInputs = document.querySelectorAll('#due-date')
  }

  setupEventListeners () {
    // Navigation clicks
    this.navDivs.forEach((div) => {
      div.addEventListener('click', () => {
        this.handleNavClick(div)
      })
    })

    // Add icon click
    this.addIcon.addEventListener('click', this.handleAddIconClick.bind(this))

    // Cancel buttons
    this.addTodoForm
      .querySelector("button[type='button']")
      .addEventListener('click', () => {
        this.handleDialogCancelButton(
          this.addTodoForm,
          this.clearAddTodoFormValues.bind(this)
        )
      })

    this.addProjectForm
      .querySelector('button[type="button"]')
      .addEventListener('click', () => {
        this.handleDialogCancelButton(
          this.addProjectForm,
          this.clearAddProjectFormValues.bind(this)
        )
      })

    this.updateTodoForm
      .querySelector("button[type='button']")
      .addEventListener('click', () => {
        this.handleDialogCancelButton(
          this.updateTodoForm,
          this.clearUpdateTodoFormValues.bind(this)
        )
      })

    this.updateProjectForm
      .querySelector('button[type="button"]')
      .addEventListener('click', () => {
        this.handleDialogCancelButton(
          this.updateProjectForm,
          this.clearUpdateProjectFormValues.bind(this)
        )
      })

    // My Todos and My Projects clicks
    this.myTodosDiv.addEventListener('click', () => {
      this.handleMyTodosDivClick()
    })

    this.myProjectsDiv.addEventListener('click', () => {
      this.handleMyProjectsDivClick()
    })

    // Date inputs validation
    this.dateInputs.forEach((dateInput) => {
      dateInput.addEventListener('input', () => {
        this.handleDateInputValidation(dateInput)
      })
    })
  }

  // Event handlers

  handleNavClick (div) {
    this.navDivs.forEach((navDiv) => {
      navDiv.classList.remove('focus')
    })
    div.classList.add('focus')
  }

  handleAddIconClick () {
    if (!document.querySelector('.project-name')) {
      this.openAddProjectDialog()
    } else {
      this.populateProjectsSelect1()
      this.openAddTodoDialog()
    }
  }

  handleDialogCancelButton (form, clearFunction) {
    clearFunction()
    form.closest('dialog').close()
  }

  handleMyTodosDivClick () {
    const myTodos = Store.getProject(0)
    UI.displayTodos(myTodos)
  }

  handleMyProjectsDivClick () {
    UI.displayProjects()
  }

  handleDateInputValidation (dateInput) {
    const minDate = new Date(dateInput.min)
    const maxDate = new Date(dateInput.max)
    const selectedDate = new Date(dateInput.value)

    if (selectedDate < minDate) {
      dateInput.setCustomValidity(
        'The date must be on or after January 1, 2024.'
      )
    } else if (selectedDate > maxDate) {
      dateInput.setCustomValidity(
        'The date must be on or before January 1, 3024.'
      )
    } else {
      dateInput.setCustomValidity('')
    }
  }

  // Form values

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
      newParentProjectId: +this.updateTodoForm.querySelector(
        '#parent-project-name'
      ).value
    }
  }

  getUpdateProjectFormValues () {
    return this.updateProjectForm.querySelector('#project-name').value
  }

  // Open dialogs

  openAddTodoDialog () {
    this.addTodoDialog.showModal()
  }

  openAddProjectDialog () {
    this.addProjectDialog.showModal()
  }

  openUpdateTodoDialog () {
    this.updateTodoDialog.showModal()
  }

  openUpdateProjectDialog () {
    this.updateProjectDialog.showModal()
  }

  // Close dialogs

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

  // Clear form values

  clearAddTodoFormValues () {
    this.clearFormFields(
      this.addTodoForm,
      ['#title', '#description', '#due-date'],
      'medium',
      '1'
    )
  }

  clearAddProjectFormValues () {
    this.clearFormFields(this.addProjectForm, ['#project-name'])
  }

  clearUpdateTodoFormValues () {
    this.clearFormFields(
      this.updateTodoForm,
      ['#title', '#description', '#due-date'],
      'medium',
      '1'
    )
  }

  clearUpdateProjectFormValues () {
    this.clearFormFields(this.updateProjectForm, ['#project-name'])
  }

  clearFormFields (form, fields, priority = '', projectId = '') {
    fields.forEach((field) => {
      form.querySelector(field).value = ''
    })
    if (priority) {
      form.querySelector('#priority').value = priority
    }
    if (projectId) {
      form.querySelector('#parent-project-name').value = projectId
    }
  }

  // Populate projects select

  populateProjectsSelect1 () {
    this.populateProjectsSelect(this.projectsSelect1)
  }

  populateProjectsSelect2 () {
    this.populateProjectsSelect(this.projectsSelect2)
  }

  populateProjectsSelect (selectElement) {
    const projects = Store.getProjects()
    const filteredProjects = projects.filter((project) => project.id !== 0)

    selectElement.innerHTML = ''

    filteredProjects.forEach((project) => {
      const option = document.createElement('option')
      option.value = project.id.toString()
      option.textContent =
        project.name.length > 30
          ? project.name.slice(0, 30) + '...'
          : project.name
      if (project.id === 1) {
        option.selected = true
      }
      selectElement.appendChild(option)
    })
  }

  // Populate form values
  populateUpdateTodoFormValues (todo) {
    this.populateFormFields(this.updateTodoForm, {
      '#title': todo.title,
      '#description': todo.description,
      '#due-date': todo.dueDate,
      '#priority': todo.priority,
      '#parent-project-name': todo.parentProjectId.toString()
    })
  }

  populateUpdateProjectFormValues (project) {
    this.populateFormFields(this.updateProjectForm, {
      '#project-name': project.name
    })
  }

  populateFormFields (form, fieldValues) {
    Object.entries(fieldValues).forEach(([selector, value]) => {
      form.querySelector(selector).value = value
    })
  }
}

export { DOMManipulation }
