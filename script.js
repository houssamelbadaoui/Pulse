// select button
const button = document.querySelector(".submit");
// select tasks container
const container = document.querySelector(".task-container");
// completed tasks container 
const completedContainer = document.querySelector(".completed-container");

// array for tasks
let tasks = [];
// array for completed tasks
let completedTasks = [];

button.addEventListener("click", (e) => {
  e.preventDefault();
  // take values from input
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const priority = document.getElementById("priority").value;
  const duration = document.getElementById("duration").value;

  const task = new Task(title, category, priority, duration); // create a new task
  tasks.push(task);

  updateUI(tasks, container);

  document.getElementById("form").reset();
});


// function to sort the list of tasks
function sortTasks(tasks) {
  const priorityOrder = {
    high: 1,
    medium: 2,
    low: 3,
  };

  return tasks.sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}
// mark a task as completed
container.addEventListener("change", (e) => {
  const taskId = Number(e.target.closest(".task-card").dataset.id); // get task id

  const task = tasks.find((t) => t.id == taskId); // task

  task.completed = true;

  tasks =  tasks.filter(task => task.id !== taskId); // remove the completed task
  
  updateUI(tasks, container); // print tasks

  completedTasks.push(task) // add to the container of completed tasks 


 insertToContainer(completedTasks, completedContainer);
 
});

// uncheck a completed task 
completedContainer.addEventListener("change", (e) => {
  const taskId = Number(e.target.closest(".task-card").dataset.id);

  const task = completedTasks.find(t => t.id === taskId);

  task.completed = false;

  completedTasks = completedTasks.filter(task => task.id !== taskId);
  updateUI(completedTasks, completedContainer);

  tasks.push(task);
  updateUI(tasks, container);

})

// function that update the UI
function updateUI(tasks, container) {
  sortTasks(tasks);
  insertToContainer(tasks, container);
  
}
/**
 * function that take a list of tasks and a container 
 * and insert each task to the container
 */
function insertToContainer(tasks, container){
container.innerHTML = "";
  let card;
  tasks.forEach((task) => {
    // create a div
    card = document.createElement("div");

    card.classList.add("task-card"); // give it a class
    card.dataset.id = task.id;

    card.innerHTML = `
    <h3 class="task-header">${task.title}</h3>
    <p class="category">${task.category}</p>
    <p class="priority">${task.priority}</p>
    <p class="duration">${task.duration}</p>
    <div class="check-group">
    <input type="checkbox" id="completed-${task.id}" name="completed" value="completed" ${task.completed ? "checked" : ""}>
    <label for="completed-${task.id}" > Completed </label>
    </div>
    `;
    container.appendChild(card);
  });
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
}
