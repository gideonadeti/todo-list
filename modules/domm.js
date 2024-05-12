class DOMManipulation {
  constructor () {
    this.navDivs = document.querySelectorAll('nav div')
    this.addIcon = document.querySelector('.add-icon')
    this.addTodoDialog = document.querySelector('.add-todo-dialog')
    this.addTodoForm = this.addTodoDialog.querySelector('.add-todo-form')
    this.closeAddTodoDialogButton = this.addTodoForm.querySelector(
      "button[type='button']"
    )
    this.updateTodoDialog = document.querySelector('.update-todo-dialog')
    this.updateTodoForm =
      this.updateTodoDialog.querySelector('.update-todo-form')
    this.closeUpdateTodoDialogButton = this.updateTodoForm.querySelector(
      "button[type='button']"
    )

    this.setupEventListeners()
  }

  setupEventListeners () {
    this.navDivs.forEach((div) => {
      div.addEventListener('click', () => {
        this.handleNavClick(div)
      })
    })

    this.addIcon.addEventListener('click', () => {
      this.openAddTodoDialog()
    })

    this.closeAddTodoDialogButton.addEventListener('click', () => {
      this.closeAddTodoDialog()
    })

    this.closeUpdateTodoDialogButton.addEventListener('click', () => {
      this.closeUpdateTodoDialog()
    })
  }

  handleNavClick (div) {
    this.navDivs.forEach((navDiv) => {
      navDiv.classList.remove('focus')
    })
    div.classList.add('focus')
  }

  openAddTodoDialog () {
    this.addTodoDialog.showModal()
  }

  openUpdateTodoDialog () {
    this.updateTodoDialog.showModal()
  }

  closeAddTodoDialog () {
    this.addTodoDialog.close()
  }

  closeUpdateTodoDialog () {
    this.updateTodoDialog.close()
  }

  clearAddTodoFormValues () {
    this.addTodoForm.querySelector('#title').value = ''
    this.addTodoForm.querySelector('#description').value = ''
    this.addTodoForm.querySelector('#due-date').value = ''
    this.addTodoForm.querySelector('#priority').value = 'medium'
    this.addTodoForm.querySelector('#parent-project-name').value = '1'
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

  populateUpdateTodoFormValues (todo) {
    this.updateTodoForm.querySelector('#title').value = todo.title
    this.updateTodoForm.querySelector('#description').value = todo.description
    this.updateTodoForm.querySelector('#due-date').value = todo.dueDate
    this.updateTodoForm.querySelector('#priority').value = todo.priority
    this.updateTodoForm.querySelector('#parent-project-name').value =
      todo.parentProjectId.toString()
  }
}

export { DOMManipulation }
