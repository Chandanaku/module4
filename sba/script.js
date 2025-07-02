
let addbtn = document.getElementById("add");
function savetask() {
  localStorage.setItem(
    "taskslisting",
    JSON.stringify(document.getElementById("tbody").innerHTML)
  );
}
window.addEventListener("DOMContentLoaded", () => {
  const li = JSON.parse(localStorage.getItem("taskslisting"));
  if (li) {
    document.getElementById("tbody").innerHTML = li;
  }
});

const tsk = new Object();
let crr = null;

addbtn.addEventListener("click", () => {
  tsk["Task Name"] = document.getElementById("taskName").value;
  tsk["Task Category"] = document.getElementById("category").value;
  tsk["Task Description"] = document.getElementById("description").value;
  tsk["Task Status"] = document.getElementById("status").value;
  tsk["Due Date"] = document.getElementById("duedt").value;
  const dueDate = new Date(tsk["Due Date"]);
  const now = new Date();

  if (dueDate < now) {
    document.getElementById("status").value = "Over Due";
    tsk["Task Status"] = "Over Due";
  }

  add(
    tsk["Task Name"],
    tsk["Task Category"],
    tsk["Task Description"],
    tsk["Task Status"],
    tsk["Due Date"]
  );
});

function add(name, category, description, status, duedate) {
  if (!name && !category && !description && !status && !duedate) {
    return;
  }
  if (crr) {
    crr.cells[0].innerText = name;
    crr.cells[1].innerText = category;
    crr.cells[2].innerText = description;
    crr.cells[4].innerText = duedate;
    crr.cells[3].innerText = status;

    crr = null;
  } else {
    const tb = document.getElementById("tbody");
    const tr = document.createElement("tr");
    tr.id = "task";
    tr.innerHTML = `<td>${name}</td>
  <td>${category}</td>
  <td>${description}</td>
  <td >${status}</td>
  <td>${duedate}</td>
  <td><button onclick="update(this)">Update</button>
  <button onclick="del(this)">Delete</button>
  </td>
  `;
    tb.appendChild(tr);
  }

  document.getElementById("taskName").value = "";
  document.getElementById("category").value = "";
  document.getElementById("description").value = "";
  document.getElementById("status").value = "";
  document.getElementById("duedt").value = "";
  savetask();
}

const delbtn = document.createElement("button");
delbtn.textContent = "Delete";
function del(b) {
  if (confirm("Are you sure you want to delete this task?")) {
    b.parentElement.parentElement.remove();
    savetask();
  }
}
function update(button) {
  crr = button.parentElement.parentElement;

  document.getElementById("taskName").value = crr.cells[0].innerText;
  document.getElementById("category").value = crr.cells[1].innerText;
  document.getElementById("description").value = crr.cells[2].innerText;
  document.getElementById("status").value = crr.cells[3].innerText;
  document.getElementById("duedt").value = crr.cells[4].innerText;

  savetask();
}

function filter(e) {
  const r = document.querySelectorAll("#tbody tr");
  r.forEach((l) => {
    const t = l.cells[3].innerText.trim();
    if (e.value === t || e.value === "") {
      l.style.display = "";
    } else {
      l.style.display = "none";
    }
  });
  savetask();
}
const flt = document.getElementById("filter");
let k = false;
flt.addEventListener("click", () => {
  if (!k) {
    const s = document.getElementById("a4");
    const fl = document.getElementById("status");
    const flc = fl.cloneNode(true);
    s.appendChild(flc);
    flc.addEventListener("change", () => {
      filter(flc);
    });
    k = true;
  }
});
