const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const toggleThemeBtn = document.getElementById("toggleTheme");
const body = document.body;

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let theme = localStorage.getItem("theme") || "dark";

// Load theme
document.body.classList.remove("dark-theme", "light-theme");
document.body.classList.add(`${theme}-theme`);
toggleThemeBtn.textContent = theme === "dark" ? "🌙" : "☀️";

// Render tasks from localStorage
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <div class="actions">
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Add task
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    updateTasks();
    taskInput.value = "";
  }
});

// Enter key support
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTaskBtn.click();
});

// Toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  updateTasks();
}

// Save and re-render
function updateTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Theme toggle
toggleThemeBtn.addEventListener("click", () => {
  const isDark = body.classList.contains("dark-theme");
  body.classList.toggle("dark-theme", !isDark);
  body.classList.toggle("light-theme", isDark);
  toggleThemeBtn.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "light" : "dark");
});

renderTasks();
 
