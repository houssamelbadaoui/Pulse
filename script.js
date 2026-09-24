// select button
const button = document.querySelector(".submit");

// array for tasks
const tasks = [];

// create a class for task
class Task {
  constructor(title, category, priority, duration) {
    this.id = Date.now();
    this.title = title;
    this.category = category;
    this.priority = priority;
    this.duration = duration;
    this.completed = false;
  }

  // complete a task
  complete() {
    this.completed = true;
  }
}
