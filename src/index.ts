interface Todo {
  text: string;
  completed: boolean;
}

const button = document.getElementById("btn")!;
const input = <HTMLInputElement>document.getElementById("todo-input")!;
const form = document.getElementById("todo-form")!;
const todoList = document.getElementById("todo-list")!;

// get todos from the local storage
function readTodos(): Todo[] {
  const todosJSON = localStorage.getItem("todos");
  if (todosJSON === null) return [];
  return JSON.parse(todosJSON);
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

const todos: Todo[] = readTodos();

// render the todo that we get from the local storage
todos.forEach(createTodo);

function handleSubmit(e: SubmitEvent) {
  e.preventDefault();
  const newTodo: Todo = {
    text: input.value,
    completed: false,
  };
  createTodo(newTodo);
  todos.push(newTodo);
  saveTodos();
  input.value = "";
}

function createTodo(todo: Todo) {
  const newLI: HTMLLIElement = document.createElement("li");
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
