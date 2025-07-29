const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const toggleThemeBtn = document.getElementById("toggleTheme");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = 'all';
let theme = localStorage.getItem("theme") || "dark";

// Theme load
document.body.classList.remove("dark-theme", "light-theme");
document.body.classList.add(`${theme}-theme`);
toggleThemeBtn.textContent = theme === "dark" ? "🌙" : "☀️";

// Render
function renderTasks() {
  taskList.innerHTML = "";
  let visibleTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  visibleTasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span ondblclick="editTask(${index})" onclick="toggleTask(${index})">${task.text}</span>
      <div class="actions">
        <i class="fas fa-trash-alt" onclick="deleteTask(${index})"></i>
      </div>
    `;
    taskList.appendChild(li);
  });

  updateProgress();
}

// Add
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text && !tasks.find(t => t.text === text)) {
    tasks.push({ text, completed: false });
    updateTasks();
    taskInput.value = "";
  }
});

taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTaskBtn.click();
});

// Toggle completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTasks();
}

// Delete
function deleteTask(index) {
  tasks.splice(index, 1);
  updateTasks();
}

// Edit task
function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    updateTasks();
  }
}

// Filters
function filterTasks(selected) {
  filter = selected;
  renderTasks();
}

// Save + render
function updateTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Progress
function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  progressText.textContent = `${completed} of ${total} tasks completed`;
  progressBar.max = total;
  progressBar.value = completed;
}

// Theme toggle
toggleThemeBtn.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark-theme");
  document.body.classList.toggle("dark-theme", !isDark);
  document.body.classList.toggle("light-theme", isDark);
  toggleThemeBtn.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "light" : "dark");
});

// Autofocus
window.onload = () => {
  taskInput.focus();
  renderTasks();
};
