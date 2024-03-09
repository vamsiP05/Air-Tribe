const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;

  if (!value) return;

  const newTask = document.createElement("p");
  newTask.classList.add("task");
  newTask.setAttribute("draggable", "true");
  newTask.innerText = value;

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
  });

  todoLane.appendChild(newTask);

  input.value = "";
});


/*
function updateTaskCounts() {
  const tasks = document.querySelectorAll('.task');
  const taskCountElements = document.querySelectorAll('.task-count');

  const taskCounts = Array.from(tasks).reduce((counts, task) => {
    const status = task.parentElement.id.replace('-lane', ''); // Extract status from parent ID
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {});

  taskCountElements.forEach(element => {
    const status = element.parentElement.parentElement.id.replace('-lane', ''); // Extract status from grandparent ID
    element.textContent = taskCounts[status] || 0;
  });
}

function renderTask(task, laneId) {
  const lane = document.getElementById(laneId);
  lane.innerHTML += `<p class="task" draggable="true">${task}</p>`;
  updateTaskCounts();
}
*/


function updateTaskCounts() {
  const tasks = document.querySelectorAll('.task');
  const taskCountElements = document.querySelectorAll('.task-count');

  const taskCounts = {};

  tasks.forEach(task => {
    const status = task.parentElement.id.replace('-lane', ''); // Extract status from parent ID
    taskCounts[status] = (taskCounts[status] || 0) + 1;
  });

  taskCountElements.forEach(element => {
    const status = element.parentElement.parentElement.id.replace('-lane', ''); // Extract status from grandparent ID
    element.textContent = taskCounts[status] || 0;
  });
}


document.getElementById('todo-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const taskInput = document.getElementById('todo-input');
  const task = taskInput.value.trim();
  if (task !== '') {
    renderTask(task, 'todo-lane');
    taskInput.value = '';
  }
});

// Call updateTaskCounts initially to set counts
updateTaskCounts();

