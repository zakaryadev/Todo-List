// Selectors
const todoInput = document.querySelector(".todo-input"),
  todoBtn = document.querySelector(".todo-button"),
  todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoInput.addEventListener("input", alert);
filterOption.addEventListener("click", filterTodo);

// Functions

function addTodo(event) {
  // PreventDefault
  event.preventDefault();
  // Create div element
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Create li element
  const newTodo = document.createElement("li");
  newTodo.innerHTML = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // Save
  saveLocalTodos(todoInput.value);
  // Create Button
  const cmpltdBtn = document.createElement("button");
  cmpltdBtn.innerHTML = `<i class="fas fa-check"></i>`;
  cmpltdBtn.classList.add("cmpld-btn");
  todoDiv.appendChild(cmpltdBtn);
  // Create Button
  const trashdBtn = document.createElement("button");
  trashdBtn.innerHTML = `<i class="fas fa-trash"></i>`;
  trashdBtn.classList.add("trash-btn");
  todoDiv.appendChild(trashdBtn);

  if (todoInput.value != "") {
    todoList.append(todoDiv);
  }
  // Clear input
  todoInput.value = "";
}

// Delete and Check buttons function
function deleteCheck(event) {
  const item = event.target;
  const todo = item.parentElement;
  // For trash btn
  if (item.classList == "trash-btn") {
    const eskertiw = confirm("You want delete todo?");
    if (eskertiw == true) {
      removeLocalTodos(todo);
      todo.classList.toggle("fall");
      todo.classList.toggle("checked");
      todo.addEventListener("transitionend", function () {
        todo.remove();
      });
    }
  }

  // For complete btn
  if (item.classList == "cmpld-btn") {
    todo.classList.toggle("checked");
  }
}

//Function for alert an maximal length of characters
function alert() {
  if (todoInput.value.length >= 40) {
    confirm("Sorry, maximal length of characters is 40!");
  }
}
// Filter todos
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("checked")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
    }
  });
}

// Function for save in localStorage

function saveLocalTodos(todo) {
  if (todoInput.value != "") {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    if (todo != "") {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      // Create li element
      const newTodo = document.createElement("li");
      newTodo.innerHTML = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      // Create Button
      const cmpltdBtn = document.createElement("button");
      cmpltdBtn.innerHTML = `<i class="fas fa-check"></i>`;
      cmpltdBtn.classList.add("cmpld-btn");
      todoDiv.appendChild(cmpltdBtn);
      // Create Button
      const trashdBtn = document.createElement("button");
      trashdBtn.innerHTML = `<i class="fas fa-trash"></i>`;
      trashdBtn.classList.add("trash-btn");
      todoDiv.appendChild(trashdBtn);
      todoList.append(todoDiv);
    }
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
