let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskName = document.getElementById("taskName");
const category = document.getElementById("category");
const deadline = document.getElementById("deadline");
const status = document.getElementById("status");
const taskList = document.getElementById("taskList");

const filterStatus = document.getElementById("filterStatus");
const filterCategory = document.getElementById("filterCategory");

document.getElementById("addTask").addEventListener("click", () => {
  const newTask = {
    name: taskName.value,
    category: category.value,
    deadline: deadline.value,
    status: status.value,
    id: Date.now(),
  };
  tasks.push(newTask);
  updateCategoryOptions();
  saveAndRender();
  clearInputs();
});

filterStatus.addEventListener("change", renderTasks);
filterCategory.addEventListener("change", renderTasks);

function clearInputs() {
  taskName.value = "";
  category.value = "";
  deadline.value = "";
  status.value = "Pending";
}

function updateCategoryOptions() {
  const categories = [...new Set(tasks.map((t) => t.category))];
  filterCategory.innerHTML = `<option value="All">All</option>`;
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    filterCategory.appendChild(option);
  });
}

function updateStatus(id) {
  const task = tasks.find((t) => t.id === id);
  if (task.status === "Pending") {
    task.status = "Completed";
  } else {
    task.status = "Pending";
  }
  saveAndRender();
}

function isOverdue(task) {
  return task.status !== "Completed" && new Date(task.deadline) < new Date();
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  const selectedStatus = filterStatus.value;
  const selectedCategory = filterCategory.value;

  tasks.forEach((task) => {
    const overdue = isOverdue(task);
    let visible = true;

    if (selectedStatus !== "All") {
      if (selectedStatus === "Overdue" && !overdue) visible = false;
      else if (selectedStatus !== task.status && selectedStatus !== "Overdue")
        visible = false;
    }

    if (selectedCategory !== "All" && task.category !== selectedCategory) {
      visible = false;
    }

    if (visible) {
      const li = document.createElement("li");
      li.className =
        task.status === "Completed" ? "completed" : overdue ? "overdue" : "";
      li.innerHTML = `
        <strong>${task.name}</strong> <br>
        Category: ${task.category} <br>
        Deadline: ${task.deadline} <br>
        Status: ${overdue ? "Overdue" : task.status} <br>
        <button onclick="updateStatus(${task.id})">Toggle Status</button>
      `;
      taskList.appendChild(li);
    }
  });
}

updateCategoryOptions();
renderTasks();
