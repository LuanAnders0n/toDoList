document.getElementById('add-button').addEventListener('click', function () {
  addTodo();
});

document
  .getElementById('todo-input')
  .addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTodo();
    }
  });

function addTodo() {
  const todoInput = document.getElementById('todo-input');
  const todoText = todoInput.value.trim();

  if (todoText !== '') {
    addTodoItem(todoText);
    saveTodos();
    todoInput.value = '';
  }
}

function addTodoItem(text, completed = false) {
  const todoList = document.getElementById('todo-list');
  const listItem = document.createElement('li');

  const itemText = document.createElement('span');
  itemText.textContent = text;
  if (completed) {
    itemText.classList.add('completed');
  }

  itemText.addEventListener('click', function () {
    itemText.classList.toggle('completed');
    saveTodos();
  });

  const editButton = document.createElement('button');
  editButton.textContent = 'Editar';
  editButton.addEventListener('click', function (event) {
    event.stopPropagation();
    const newText = prompt('Edite o item:', itemText.textContent);
    if (newText !== null && newText.trim() !== '') {
      itemText.textContent = newText.trim();
      saveTodos();
    }
  });

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remover';
  removeButton.addEventListener('click', function (event) {
    event.stopPropagation();
    todoList.removeChild(listItem);
    saveTodos();
  });

  listItem.appendChild(itemText);
  listItem.appendChild(editButton);
  listItem.appendChild(removeButton);
  todoList.appendChild(listItem);
}

function saveTodos() {
  const todos = [];
  document.querySelectorAll('#todo-list li').forEach(item => {
    const text = item.querySelector('span').textContent;
    const completed = item
      .querySelector('span')
      .classList.contains('completed');
    todos.push({ text, completed });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(todo => addTodoItem(todo.text, todo.completed));
}

// Carregar os todos ao carregar a página
loadTodos();
