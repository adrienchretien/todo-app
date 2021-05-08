import Task from "./Model/Task";

document.addEventListener("DOMContentLoaded", () => {
  function submitHandler(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    
    if (data.has('new-task')) {
      const task = new Task(data.get('new-task'));
      task.save();
    }
  }

  function addListeners() {
    document.addEventListener('submit', submitHandler);
  }

  addListeners();
});