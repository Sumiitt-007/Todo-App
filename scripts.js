document.addEventListener('DOMContentLoaded',() => {
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');

  const addTask = (event) => {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if(!taskText){
      return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;
    taskList.appendChild(li);
    taskInput.value = '';
  };

  addTaskBtn.addEventListener('click',addTask);
  taskInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
      addTask(e);
    }
  })

})