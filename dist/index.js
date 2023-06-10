"use strict";
const button = document.getElementById("btn");
const input = document.getElementById("todo-input");
const form = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
// get todos from the local storage
function readTodos() {
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON === null)
        return [];
    return JSON.parse(todosJSON);
}
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
const todos = readTodos();
// render the todo that we get from the local storage
todos.forEach(createTodo);
function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
        text: input.value,
        completed: false,
    };
    createTodo(newTodo);
    todos.push(newTodo);
    saveTodos();
    input.value = "";
}
function createTodo(todo) {
    const newLI = document.createElement("li");
    // create checkbox for list
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    console.log(todo.completed);
    checkbox.addEventListener("change", function () {
        todo.completed = checkbox.checked;
        saveTodos();
    });
    newLI.append(checkbox);
    newLI.append(todo.text);
    todoList.append(newLI);
}
form.addEventListener("submit", handleSubmit);
