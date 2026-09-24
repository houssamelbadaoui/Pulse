// select button
const button = document.querySelector(".submit");
// select tasks container
const container = document.querySelector(".container");

// array for tasks
const tasks = [];


// function that update the UI
function updateUI(){
  tasks.forEach(task => {
    // create a div 
    const card = document.createElement("div");

    card.innerHTML = `
    <h3 class="task-header">${task.title}</h3>
    <p class="category">${task.category}</p>
    <p class="priority">${task.priority}</p>
    <p class="duration">${task.duration}</p>
    <div class="check-group">
    <input type="checkbox" id="${task.id}" name="completed" value="comleted">
    <label for="${task.id} > Completed </label>
    </div>
    `

    container.appendChild(card);
  })
}
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
