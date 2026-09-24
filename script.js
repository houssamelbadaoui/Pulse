// select button
const button = document.querySelector(".submit");
// select tasks container
const container = document.querySelector(".container");

// array for tasks
const tasks = [];


button.addEventListener("click", (e) => {
  e.preventDefault()
  // take values from input
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const priority = document.getElementById("priority").value;
  const duration = document.getElementById("duration").value;

  const task = new Task(title, category, priority, duration); // create a new task
  tasks.push(task);
  console.log(tasks)
  updateUI();

  
  document.getElementById("form").reset();
  
})
// function that update the UI
function updateUI(){
  let card;
  tasks.forEach(task => {
    // create a div 
     card = document.createElement("div");

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

    

  })
  container.appendChild(card);
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
