/* == The Light & Dark Mode Toggle == */
const darkModeToggle = document.querySelector('dark-mode-toggle');
  // Set the mode to dark
darkModeToggle.mode = 'dark';
  // Set the mode to light
darkModeToggle.mode = 'light';

document.addEventListener('colorschemechange', (e) => {
  console.log(`Color scheme changed to ${e.detail.colorScheme}.`);
});

/* == Creating new tasks == */
const todolist = document.querySelector('.todolist')
const taskList = todolist.querySelector('.todolist__tasks')
const taskItems = todolist.querySelectorAll('.tasks')


function generateUniqueString(length) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length)
}

function makeTaskElement(taskname) {
  // Creating a task
  const uniqueID = generateUniqueString(10)
  const taskElement = document.createElement('li')
  taskElement.classList.add('task')
  taskElement.innerHTML = DOMPurify.sanitize(`
          <input type="checkbox" id="${uniqueID}" />
          <label for="${uniqueID}">
            <svg class="task-label" xmlns="http://www.w3.org/2000/svg" width="11" height="9">
              <path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6" />
            </svg>
          </label>
          <span class="task__name">${taskname}</span>
          <button type="button" class="task__delete-button">
            <img src="images/icon-cross.svg" alt="image of an icon cross representing the delete button" >
          </button>
  `)

  return taskElement
}

// Function to count tasks
function countTasks() {
  const taskCount = taskList.querySelectorAll('.task').length
  return taskCount
}

// Function to update task count
function updateTaskCount() {
  const taskCountElement = document.querySelector('.task__count span')
  const taskCount = countTasks()
  taskCountElement.textContent = `${taskCount} item${taskCount !== 1 ? 's' : ''} left`
}

todolist.addEventListener('submit', event => {
  event.preventDefault(0)
  // Get the value of task
  const newTaskField = todolist.querySelector('input')
  const inputValue = newTaskField.value.trim()
  console.log(inputValue)
  // Clear the new task field
  newTaskField.value = ''
  // Bring focus to input field
  newTaskField.focus()
  // Preventing adding of empty task
  if (!inputValue) return

  const taskElement = makeTaskElement(inputValue)
  
  // Add task element to the DOM
  taskList.appendChild(taskElement)

  //Update task count
  updateTaskCount()
})

// Initialize task count
updateTaskCount()
