import TaskController from "../Controller/TaskController";
import View from "./View";

export default class TaskForm extends View {
  templateSelector = '#task-form';

  addListeners() {
    document.addEventListener('submit', this.submitHandler);
  }

  submitHandler(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    
    if (data.has('new-task')) {
      const taskController = new TaskController();
      taskController.add(data.get('new-task'));
    }
  }
}