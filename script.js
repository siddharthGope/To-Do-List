const taskInput = document.querySelector(".task-input");
const taskBox = document.querySelector(".task-box");
const filtersTabs = document.querySelector(".tab");
// getting toto from local storage
let todos = JSON.parse(localStorage.getItem("todo-list"));

let editId;
isEditedTask = false;

function showTodo() {
  let li = "";
  if (todos) {
    todos.forEach((todo, id) => {
      // if todo status is completed , set the isCompleted value to checked
      let isCompleted = todo.staus == "completed" ? "checked" : "";
      li += `<li class="task">
                <label for="${id}">
                    <input onClick="statusUpdate(this)" type="checkbox" id="${id}" ${isCompleted}>
                    <p class="${isCompleted}">${todo.name}</p>
                </label>
                <div onclick="showMenu(this)" class="settings">Settings
                    <ul class="task-menu">
                        <li onclick="editTask(${id},'${todo.name}')">Edit</li>
                        <li onclick="deleteTask(${id})">Delete</li>
                    </ul>
                </div>
            </li>`;
    });
  }
  taskBox.innerHTML = li;
}
showTodo();

filtersTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    console.log(tab);
  });
});

function editTask(taskId, taskName) {
  editId = taskId;
  isEditedTask = true;
  taskInput.value = taskName;
}

function showMenu(selectedtask) {
  let taskMenu = selectedtask.lastElementChild;
  taskMenu.classList.toggle("show-task");

  // off the taskmenu click anywhere outside
  // document.addEventListener("click", (e) => {
  //   if (e.target.tagName != "I" || e.target != selectedtask) {
  //     taskMenu.classList.remove("show-task");
  //   }
  // });
}

function deleteTask(id) {
  todos.splice(id, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
}

function statusUpdate(selectedtask) {
  let taskName = selectedtask.parentElement.lastElementChild;
  if (selectedtask.checked) {
    taskName.classList.add("checked");
    // updating the selected task status completed
    todos[selectedtask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedtask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();
  if (e.key == "Enter" && userTask) {
    if (!isEditedTask) {
      //if editedtask is false
      if (!todos) {
        //if todo is not exist pass empty array
        todos = [];
      }
      let taskInfo = { name: userTask, status: "pending" };
      todos.push(taskInfo); //adding new task to list
    } else {
      isEditedTask = false;
      todos[editId].name = userTask;
    }

    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
  }
});
