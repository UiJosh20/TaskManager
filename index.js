var tasks = [];

function addTask() {
  var task = document.getElementById("taskName").value;
  var date = document.getElementById("date").value;
  var time = document.getElementById("time").value;
  var priority = document.getElementById("priority").value;
  var taskDescription = document.getElementById("desp").value;

  if (isEmpty(task, date, time, priority, taskDescription)) {
    document.getElementById("alertDanger").innerHTML = `
            <p class="alertDanger">
            Please add a task
            </p>
        `;
  } else {
    var taskObject = {
      task: task,
      date: date,
      time: time,
      priority: priority,
      taskDescription: taskDescription,
    };

    tasks.push(taskObject);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("taskName").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    document.getElementById("priority").value = "";
    document.getElementById("desp").value = "";

    document.getElementById("alertSuccess").innerHTML = `
            <p class="alertSuccess">
            Task added to list successfully
            </p>
        `;

    setTimeout(() => {
      window.location.href = "task.html";
    }, 2000);

    console.log(tasks);
  }
}

function isEmpty(...values) {
  return values.some(value => value.trim() === '');
}

// Display tasks

var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
  var taskTable = document.getElementById("taskTable");

  taskTable.innerHTML = "";

  if (tasks) {
    tasks.forEach((task, index) => {
      taskTable.innerHTML += `
            <tr>
            <td>${task.task}</td>
            <td>${task.date}</td>
            <td>${task.time}</td>
            <td>${task.priority}</td>
            <td>${task.taskDescription}</td> 
            <td>
            <button class="delete"  onclick="deleteTask(${index})">Delete</button>
            </td>                 
            <td>
            <button class="edit" onclick="editTask(${index})">Edit</button>
            </td>                 
            </tr>
        `;
    });
  }
}
displayTasks();

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskTable.innerHTML = "";
  displayTasks();
}

function editTask(index) {
  var taskTable = document.getElementById("taskTable");
  const task = prompt("Enter the new task name:");
  const date = prompt("Enter the new date:");
  const time = prompt("Enter the new time:");
  const priority = prompt("Enter the new priority:");
  const taskDescription = prompt("Enter the new task description:");

  if (isEmpty(task, date, time, priority, taskDescription)) {
    document.getElementById("alertDanger").innerHTML = `
            <p class="alertDanger">
            Please add a task
            </p>
        `;
  } else {
    tasks[index].task = task;
    tasks[index].date = date;
    tasks[index].time = time;
    tasks[index].priority = priority;
    tasks[index].taskDescription = taskDescription;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskTable.innerHTML = "";
    displayTasks();
  }
}
