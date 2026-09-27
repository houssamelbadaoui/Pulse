// select form
const form = document.querySelector("#form");
// select tasks container
const container = document.querySelector(".task-container");
// completed tasks container
const completedContainer = document.querySelector(".completed-container");

const taskSection = document.querySelector("#task-section");

// array for tasks
let tasks = [];

// load tasks
tasks = loadTasks("tasks");

// array for ongoing tasks
let onGoingTasks = tasks.filter((task) => task.completed === false);
updateUI(onGoingTasks, container);

// array for completed tasks
let completedTasks = tasks.filter((task) => task.completed === true);

updateUI(completedTasks, completedContainer);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // take values from input
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const priority = document.getElementById("priority").value;
  const duration = document.getElementById("duration").value;

  const task = new Task(title, category, priority, duration); // create a new task
  tasks.push(task);
  onGoingTasks.push(task);
  saveTasks("tasks", tasks);

  updateUI(onGoingTasks, container);

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

  const task = onGoingTasks.find((t) => t.id == taskId); // task

  task.completed = true;

  onGoingTasks = onGoingTasks.filter((task) => task.id !== taskId); // remove the completed task

  updateUI(onGoingTasks, container); // print tasks

  completedTasks.push(task); // add to the container of completed tasks

  insertToContainer(completedTasks, completedContainer);
});

// uncheck a completed task
completedContainer.addEventListener("change", (e) => {
  const taskId = Number(e.target.closest(".task-card").dataset.id);

  const task = completedTasks.find((t) => t.id === taskId);

  task.completed = false;

  completedTasks = completedTasks.filter((task) => task.id !== taskId);
  updateUI(completedTasks, completedContainer);

  onGoingTasks.push(task);

  updateUI(onGoingTasks, container);
});

// function that update the UI
function updateUI(tasks, container) {
  sortTasks(tasks);
  insertToContainer(tasks, container);
}
/**
 * function that take a list of tasks and a container
 * and insert each task to the container
 */
function insertToContainer(tasks, container) {
  container.innerHTML = "";
  let card;
  tasks.forEach((task) => {
    // create a div
    card = document.createElement("div");

    card.classList.add("task-card"); // give it a class
    card.dataset.id = task.id;

    card.innerHTML = `
    <h3 class="task-header">${task.title}</h3>
    <button class="delete-task" id="delete">X</button>
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

// delete a task
taskSection.addEventListener("click", (e) => {
  const taskId = Number(e.target.closest(".task-card").dataset.id);

  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasks("tasks", tasks);

  // update both completed and ongoing tasks
  onGoingTasks = tasks.filter((task) => task.completed === false);
  updateUI(onGoingTasks, container);

  completedTasks = tasks.filter((task) => task.completed === true);
  updateUI(completedTasks, completedContainer);
});
// create a class for task
class Task {
  constructor(title, category, priority, duration) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.category = category;
    this.priority = priority;
    this.duration = duration;
    this.completed = false;
  }
}

// using localStorage to store tasks
function saveTasks(name, content) {
  localStorage.setItem(name, JSON.stringify(content));
}

function loadTasks(name) {
  try {
    return JSON.parse(localStorage.getItem(name)) || [];
  } catch {
    return [];
  }
}

// onClick button to scrool to tasks section
function scrollToSection() {
  const section = document.getElementById("task-section");

  section.scrollIntoView({ behavior: "smooth" });
}
