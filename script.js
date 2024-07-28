

const inputBox = document.getElementById("input-box");
const dateBox = document.getElementById("date-box");
const timeBox = document.getElementById("time-box");
const descBox = document.getElementById("desc-box");
const listContainer = document.getElementById("list-container");

// Get tasks from localStorage
function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Save tasks to localStorage
function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a new task
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        const task = {
            id: Date.now(),
            text: inputBox.value,
            date: dateBox.value,
            time: timeBox.value,
            description: descBox.value,
            status: 'added'
        };
        const tasks = getTasksFromStorage();
        tasks.push(task);
        saveTasksToStorage(tasks);
        renderTasks();
        inputBox.value = '';
        dateBox.value = '';
        timeBox.value = '';
        descBox.value = '';
    }
}

// Render the tasks
function renderTasks() {
    listContainer.innerHTML = '';
    const tasks = getTasksFromStorage();
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${task.text} | ${task.date} | ${task.time} | ${task.description}
            <i class="fa-regular fa-circle-check icons" onclick="lineThrough(${task.id})"></i>
            <i class="fa-solid fa-xmark icons" onclick="deleteTask(${task.id})"></i>
            <i class="fa-solid fa-pencil icons" onclick="editTask(${task.id})"></i>
        `;
        if (task.status === 'completed') {
            li.classList.add('linethrough');
        }
        listContainer.appendChild(li);
    });
}

// Mark task as completed
function lineThrough(id) {
    const tasks = getTasksFromStorage();
    const task = tasks.find(task => task.id === id);
    task.status = task.status === 'completed' ? 'added' : 'completed';
    saveTasksToStorage(tasks);
    renderTasks();
}

// Delete a task
function deleteTask(id) {
    const tasks = getTasksFromStorage();
    const updatedTasks = tasks.filter(task => task.id !== id);
    saveTasksToStorage(updatedTasks);
    renderTasks();
}

// Edit a task
function editTask(id) {
    const tasks = getTasksFromStorage();
    const task = tasks.find(task => task.id === id);
    inputBox.value = task.text;
    dateBox.value = task.date;
    timeBox.value = task.time;
    descBox.value = task.description;
    deleteTask(id);
}

// Render tasks on page load
renderTasks();

// Delete all tasks functionality
const deleteAllButton = document.getElementById('delete-all-btn');

deleteAllButton.addEventListener('click', () => {
    listContainer.innerHTML = '';
    localStorage.removeItem('tasks');
    
    renderTasks();
});

function deleteAllTasks() {
    localStorage.removeItem('tasks');
    renderTasks([]);
}
