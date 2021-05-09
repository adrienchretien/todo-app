import Task from "../Model/Task";
import OneColumnLayout from "../View/OneColumnLayout";
import TaskForm from "../View/TaskForm";
import TaskList from "../View/TaskList";

export default class TaskController {
  index() {
    const form = new TaskForm();
    const list = new TaskList();
    const layout = new OneColumnLayout();

    list.setData('tasks', Task.getAll());

    layout.setData('title', 'Task list');
    layout.setData('content', form.render() + list.render());
    layout.appendTo('body');
  }

  add(title = '') {
    const task = new Task(title);
    task.save();
    window.location.reload();
  }
}