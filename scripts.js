document.addEventListener('DOMContentLoaded',() => {
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  const todosContainer = document.querySelector('.todos-container');
  const progressBar = document.getElementById('progress');
  const progressNumber = document.getElementById('numbers');

  const updateProgress = (checkCompletion = true) => {
      const totalTasks = taskList.children.length;
      const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;

      progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%';

      progressNumber.textContent = `${completedTasks} / ${totalTasks}`;

      if(checkCompletion && totalTasks > 0 && completedTasks === totalTasks){
        Confetti();
      }
    };

      const saveToLocalStorage = () => {
        const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
          text : li.querySelector('span').textContent,
          completed: li.querySelector('.checkbox').checked
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
      };

      const loadTasksFromLocalStorage = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(({text, completed}) => addTask(text,completed,false));
        updateProgress();

      }
  
  const addTask = (text, completed = false,shouldSave = true) => {
    
    const taskText = text || taskInput.value.trim();
    if(!taskText){
      return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
    <input type = "checkbox" class = "checkbox" ${completed ? 'checked' : ''} />
    <span>${taskText}</span>
    <div class="task-buttons">
        <button class ="edit-btn"><i class="fa-solid fa-pen"></i></button>
        <button class ="delete-btn"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    const checkBox = li.querySelector('.checkbox');
    const editBtn = li.querySelector('.edit-btn');

    if(completed){
      li.classList.add('completed');
      editBtn.disabled = true;
      editBtn.style.opacity = '0.5';
      editBtn.style.pointerEvents = 'none';
    }

    checkBox.addEventListener('change', () => {
      const isChecked = checkBox.checked;
      li.classList.toggle('completed', isChecked);
      editBtn.disabled = isChecked;
      editBtn.style.opacity = isChecked ? '0.5' : '1';
      editBtn.style.pointerEvents = isChecked ? 'none' : 'auto'; 
      updateProgress();
      saveToLocalStorage();
    })
    editBtn.addEventListener('click', () => {
      if(!checkBox.checked){
        taskInput.value = li.querySelector('span').textContent;
        li.remove();
        updateProgress(false);
        saveToLocalStorage();
      }
    })

    li.querySelector('.delete-btn').addEventListener('click', ()=> {
      li.remove();  
      updateProgress();
      saveToLocalStorage();
    })

    taskList.appendChild(li);
    taskInput.value = '';
    updateProgress();
    todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';

    if(shouldSave){
      saveToLocalStorage();
    }

  };

  addTaskBtn.addEventListener('click',(e) => {
    e.preventDefault();
    addTask();
  });
  taskInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      addTask();
    }
  });
  loadTasksFromLocalStorage();
});

const Confetti = () => {
  const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}