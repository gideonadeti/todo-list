let initialId = 0

class Project {
  constructor (name) {
    this.name = name
    this.todos = []
    this.id = this.getId()
  }

  getId () {
    return initialId++
  }
}

export { Project }
