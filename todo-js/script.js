// Todo items data
let todos = [
    {
        id: 1,
        text: 'todo 1',
        description: '',
        checked: false,
        expanded: false
    },
    {
        id: 2,
        text: 'todo 2',
        description: '',
        checked: false,
        expanded: false
    }
];

let nextId = 3;

// DOM Elements
const newTodoInput = document.getElementById('newTodoInput');
const descriptionInput = document.getElementById('descriptionInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// Initialize app
function init() {
    renderTodos();
    
    // Event listeners
    addBtn.addEventListener('click', addTodo);
    newTodoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
}

// Render all todos
function renderTodos() {
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const todoItem = createTodoElement(todo);
        todoList.appendChild(todoItem);
    });
}

// Create a single todo element
function createTodoElement(todo) {
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';
    todoItem.dataset.id = todo.id;
    
    // Todo header (checkbox, text, delete button)
    const todoHeader = document.createElement('div');
    todoHeader.className = 'todo-item-header';
    
    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.checked;
    checkbox.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent toggle description
        toggleCheckbox(todo.id);
    });
    
    // Todo text
    const todoText = document.createElement('span');
    todoText.className = 'todo-text';
    todoText.textContent = todo.text;
    
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'delete';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent toggle description
        deleteTodo(todo.id);
    });
    
    todoHeader.appendChild(checkbox);
    todoHeader.appendChild(todoText);
    todoHeader.appendChild(deleteBtn);
    
    // Click on header to toggle description
    todoHeader.addEventListener('click', () => {
        toggleDescription(todo.id);
    });
    
    // Description section
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'todo-description';
    if (todo.expanded) {
        descriptionDiv.classList.add('expanded');
    }
    
    const descriptionContent = document.createElement('div');
    descriptionContent.className = 'description-content';
    descriptionContent.textContent = todo.description || 'No description';
    
    descriptionDiv.appendChild(descriptionContent);
    
    todoItem.appendChild(todoHeader);
    todoItem.appendChild(descriptionDiv);
    
    return todoItem;
}

// Add new todo
function addTodo() {
    const text = newTodoInput.value.trim();
    
    if (!text) {
        alert('Please enter a todo name');
        return;
    }
    
    const newTodo = {
        id: nextId++,
        text: text,
        description: descriptionInput.value.trim(),
        checked: false,
        expanded: false
    };
    
    todos.push(newTodo);
    
    // Clear inputs
    newTodoInput.value = '';
    descriptionInput.value = '';
    
    // Re-render
    renderTodos();
    
    // Scroll to bottom to show new todo
    todoList.scrollTop = todoList.scrollHeight;
}

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

// Toggle checkbox
function toggleCheckbox(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.checked = !todo.checked;
        // Note: Checkbox state is visual only, no additional functionality
    }
}

// Toggle description expansion
function toggleDescription(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.expanded = !todo.expanded;
        renderTodos();
    }
}

// Start the app
init();
