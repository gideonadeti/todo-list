class Todo {
  constructor(
    title,
    description,
    dueDate,
    priority,
    parentProjectName,
    completed = false
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.parentProjectName = parentProjectName;
    this.completed = completed;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}

export { Todo };
