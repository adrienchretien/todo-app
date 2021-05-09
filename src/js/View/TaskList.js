import TaskController from "../Controller/TaskController";
import View from "./View";

export default class TaskList extends View {
  templateSelector = '#task-list';

  addListeners() {
    document.addEventListener('click', this.clickHandler);
  }

  clickHandler(event) {
    if (event.target.dataset.deleteTask) {
      const taskController = new TaskController();
      taskController.remove(parseInt(event.target.dataset.deleteTask));
    }
  }
}