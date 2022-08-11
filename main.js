window.addEventListener("beforeunload" , () => {
  localStorage.setItem("tasks", taskStore);
});

window.addEventListener('load' , () => {
  const form = document.querySelector("#task-form");
  const input = document.querySelector("#task");
  const taskContainer = document.querySelector("#task-container");

  if(localStorage.getItem("tasks") != '' && localStorage.getItem("tasks") != null) {
    const exValues = localStorage.getItem("tasks").split(',');
    for (let i=0; i<exValues.length; i++) {
      addTask(exValues[i], taskContainer);
    }
  }
  form.addEventListener('submit' , (e) => {
    e.preventDefault();
    const task = input.value;

    if(!task) {
      alert("לא ניתן להכניס משימה ריקה.");
      return;
    }
    else {
      addTask(task, taskContainer);
      input.value = '';
    }
  });
});

function addTask (task, taskContainer) {

  const newTask = document.createElement("div");
  newTask.classList.add("task");
  newTask.id = "task";

  const newTaskContent = document.createElement("div");      
  newTaskContent.classList.add("task-content");
  newTaskContent.id = "task-content";

  newTask.appendChild(newTaskContent);

  const newTaskInput = document.createElement("input");
  newTaskInput.classList.add("text-input");
  newTaskInput.id = "text-input";
  newTaskInput.type = "text";
  newTaskInput.value = task;
  newTaskInput.setAttribute("readonly", "readonly");

  newTaskContent.appendChild(newTaskInput);

  const taskBtns = document.createElement("div");
  taskBtns.classList.add("task-btns");

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.id = "edit-btn";
  editBtn.innerHTML = "ערוך";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.id = "delete-btn";
  deleteBtn.innerHTML = "מחק";

  taskBtns.appendChild(editBtn);
  taskBtns.appendChild(deleteBtn);
  newTask.appendChild(taskBtns);

  taskContainer.appendChild(newTask);

  let inputs = document.querySelectorAll(".text-input");
  updateStorage(inputs);

  editBtn.addEventListener ("click" , () => {
    if(editBtn.innerText == "ערוך") {
      newTaskInput.removeAttribute("readonly");
      newTaskInput.focus();
      editBtn.innerText = "שמור";
    }
    else {
      console.log("שמור");
      console.log(newTaskInput.value);
      newTaskInput.setAttribute("readonly","readonly");
      updateStorage(inputs);
      editBtn.innerText = "ערוך";
    }
  });

  deleteBtn.addEventListener ("click" , () => {
    taskContainer.removeChild(newTask);
    inputs = document.querySelectorAll(".text-input");
    updateStorage(inputs, "delete");
  });
}

function updateStorage(inputs, str) {
  let taskStore = localStorage.getItem("tasks");
  if (taskStore == null){
    taskStore = [];
    taskStore[0] = inputs[0].value;
  }
  else {
    if(inputs.length>0){
      taskStore = taskStore.split(',');
      for(let i=0; i<inputs.length; i++) {
        inputs[i].removeAttribute("readonly");
        taskStore[i] = inputs[i].value;
        inputs[i].setAttribute("readonly","readonly");
        if(str === 'delete'){
          if(taskStore.length > inputs.length) {
            taskStore.length = inputs.length;
          }
        }
      }
    }
    else {
      taskStore =[];
    }
  }
  localStorage.setItem("tasks", taskStore);
}