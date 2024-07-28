// Define task progress states
const progressStates = ['', '', ''];

// Load tasks from localStorage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks on the task board
function renderTasks() {
  const taskBoard = document.getElementById('task-board');
  taskBoard.innerHTML = '';

  progressStates.forEach((state, index) => {
    const column = document.createElement('div');
    column.classList.add('column');
    column.setAttribute('id', `column-${index}`);
    column.textContent = state;

    column.ondrop = (event) => drop(event, index);
    column.ondragover = (event) => allowDrop(event);

    tasks.filter(task => task.progress === index).forEach(task => {
      const taskElement = document.createElement('div');
      taskElement.classList.add('task');
      taskElement.setAttribute('id', `task-${task.id}`);
      taskElement.setAttribute('draggable', true);
      taskElement.setAttribute('ondragstart', `drag(event, ${task.id})`);
      taskElement.innerHTML = `
        <div class="task-content" style:>
          <h3 class="task-title" style="text-align: center;">${task.title}</h3>
          <hr>
          <p class="task-description" style="text-align: center;">${task.description}</p>
          <p class="task-deadline" style="text-align: center;">${task.deadline}</p>
        </div>
        <div style="text-align: center;">
            <button class="delete-task" style="color: white; background-color: red;">Delete</button>
        </div>
      `;
      taskElement.style.backgroundColor = calculateTaskColor(task.deadline, task.progress);
      column.appendChild(taskElement);

      // Add event listener to delete button
      taskElement.querySelector('.delete-task').addEventListener('click', () => {
        deleteTask(task.id);
      });
    });

    taskBoard.appendChild(column);
  });
}

// Function to delete a task
function deleteTask(taskId) {
  // Find index of task with given id
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    // Remove task from tasks array
    tasks.splice(taskIndex, 1);
    // Save updated tasks to localStorage
    saveTasks();
    // Re-render task board
    renderTasks();
  }
}

// Function to calculate task color based on deadline
function calculateTaskColor(deadline, progress) {
  const now = dayjs();
  const dueDate = dayjs(deadline);
  
  // Check if task progress is in the "done" column
  if (progress === 2) {
    if (now.isBefore(dueDate)) {
      return 'inherit';
    } else {
      return 'inherit'; 
    }
  } else if (now.isAfter(dueDate)) {
    return 'red'; 
  } else if (dueDate.diff(now, 'day') <= 2) {
    return 'yellow'; 
  } else {
    return 'inherit';
  }
}

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for adding a new task
document.getElementById('add-task').addEventListener('click', () => {
  document.getElementById('task-modal').style.display = 'block';
});

// Event listener for closing the modal
document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('task-modal').style.display = 'none';
});

// Event listener for saving a task
document.getElementById('save-task').addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const deadline = document.getElementById('deadline').value;

  const taskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
  tasks.push({ id: taskId, title, description, deadline, progress: 0 });
  saveTasks();
  renderTasks();
  document.getElementById('task-modal').style.display = 'none';
});

// Function to allow dropping tasks
function allowDrop(event) {
  event.preventDefault();
}

// Function to handle drag start event
function drag(event, taskId) {
  event.dataTransfer.setData('text/plain', taskId);
}

// Function to handle drop event
function drop(event, targetProgress) {
  event.preventDefault(); 
  const taskId = event.dataTransfer.getData('text/plain');
  const taskElement = document.getElementById(`task-${taskId}`);
  const currentProgress = parseInt(taskElement.parentElement.id.split('-')[1]);
  if (currentProgress !== targetProgress) {
    // Update task progress only if dropped in a different column
    const taskIndex = tasks.findIndex(task => task.id == taskId);
    tasks[taskIndex].progress = targetProgress;
    saveTasks();
    renderTasks();
  }
}

// Initial rendering of tasks
renderTasks();






