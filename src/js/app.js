import TaskController from "./Controller/TaskController";

document.addEventListener("DOMContentLoaded", () => {
  const taskController = new TaskController();
  taskController.index();
});