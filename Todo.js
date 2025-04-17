document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function getRandomColor() {
    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeead", "#d4a5a5"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.classList.add("task-note");
      if (task.completed) li.classList.add("completed");

      const taskSpan = document.createElement("span");
      taskSpan.textContent = task.text;

      const completeButton = document.createElement("button");
      completeButton.textContent = "✓";
      completeButton.classList.add("complete-btn");
      completeButton.addEventListener("click", () => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
        if (tasks[index].completed) {
          const newLi = taskList.children[index];
          newLi.classList.add("just-completed");
          newLi.addEventListener("animationend", () => {
            newLi.classList.remove("just-completed");
          }, { once: true });
        }
      });

      const magnet = document.createElement("div");
      magnet.classList.add("magnet");
      magnet.style.backgroundColor = task.magnetColor;
      magnet.addEventListener("click", () => {
        li.classList.add("falling");
        li.addEventListener("animationend", () => {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
        }, { once: true });
      });

      li.append(magnet, taskSpan, completeButton);
      taskList.appendChild(li);
    });
  }

  addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
      alert("Task cannot be empty!");
      return;
    }

    tasks.push({ 
      text: taskText, 
      completed: false, 
      magnetColor: getRandomColor()
    });
    saveTasks();
    renderTasks();
    taskInput.value = "";
  });

  renderTasks();
});