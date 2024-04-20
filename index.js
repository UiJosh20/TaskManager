var tasks = [];

function addTask() {
  var task = $("#taskName").val();
  var date = $("#date").val();
  var time = $("#time").val();
  var priority = $("#priority").val();
  var taskDescription = $("#desp").val();

  if (isEmpty(task, date, time, priority, taskDescription)) {
    $("#alertDanger").html(`
        <p class="alertDanger">
        Please add a task
        </p>
    `).fadeIn("slow");

    setTimeout(() => {
      $("#alertDanger").fadeOut("slow");
    }, 2000);
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

    $("#taskName, #date, #time, #priority, #desp").val("");

    $("#alertSuccess").html(`
        <p class="alertSuccess">
        Task added to list successfully
        </p>
    `).fadeIn("slow");

    setTimeout(() => {
      $("#alertSuccess").fadeOut("slow", function() {
        window.location.href = "task.html";
      });
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
  var taskTable = $("#taskTable");

  if (tasks && tasks.length > 0) {
   
    taskTable.html("");
    tasks.forEach((task, index) => {
      taskTable.append(`
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
        `);
    });
  } else {
    taskTable.html(`<tr><td colspan="7"><h3>No task added</h3></td></tr>`);
  }
}

displayTasks();

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  $("#taskTable").html("");
  displayTasks();
}

function editTask(index) {
  var task = prompt("Enter the new task name:");
  var date = prompt("Enter the new date:");
  var time = prompt("Enter the new time:");
  var priority = prompt("Enter the new priority:");
  var taskDescription = prompt("Enter the new task description:");

  if (isEmpty(task, date, time, priority, taskDescription)) {
    $("#alertDanger").html(`
            <p class="alertDanger">
            Please add a task
            </p>
        `).fadeIn("slow");

    setTimeout(() => {
      $("#alertDanger").fadeOut("slow");
    }, 2000);
  } else {
    tasks[index].task = task;
    tasks[index].date = date;
    tasks[index].time = time;
    tasks[index].priority = priority;
    tasks[index].taskDescription = taskDescription;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    $("#taskTable").html("");
    displayTasks();
  }
}

$(document).ready(function() {
  $.ajax({
    url: 'https://ipinfo.io/json',
    method: 'GET',
    success: function(response) {
      var country = response.country;
      $('#userCountry').html('<p>User is from: ' + country + '</p>');
    },
    error: function(xhr, status, error) {
      console.error('Error fetching user country:', error);
      $('#userCountry').html('<p>Error fetching user country</p>');
    }
  });
});



$(document).ready(function() {
  $.ajax({
    url: 'https://ipinfo.io/json',
    method: 'GET',
    success: function(response) {
      var city = response.city;
      $('#userCity').html('<p>User is from: ' + city + '</p>');
    },
    error: function(xhr, status, error) {
      console.error('Error fetching user country:', error);
      $('#userCity').html('<p>Error fetching user city</p>');
    }
})
})