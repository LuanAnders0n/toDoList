document.getElementById('add-button').addEventListener('click', function () {
  const todoInput = document.getElementById('todo-input');
  const todoText = todoInput.value.trim();

  if (todoText !== '') {
    addTodoItem(todoText);
    todoInput.value = '';
  }
});

function addTodoItem(text) {
  const todoList = document.getElementById('todo-list');
  const listItem = document.createElement('li');

  const itemText = document.createElement('span');
  itemText.textContent = text;

  const editButton = document.createElement('button');
  editButton.textContent = 'Editar';
  editButton.addEventListener('click', function () {
    const newText = prompt('Edite o item:', itemText.textContent);
    if (newText !== null && newText.trim() !== '') {
      itemText.textContent = newText.trim();
    }
  });

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remover';
  removeButton.addEventListener('click', function () {
    todoList.removeChild(listItem);
  });

  listItem.appendChild(itemText);
  listItem.appendChild(editButton);
  listItem.appendChild(removeButton);
  todoList.appendChild(listItem);
}
