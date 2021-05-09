import Model from "./Model";

export default class Task extends Model {

  constructor(title = '') {
    super();

    this.title = title;
    this.isComplete = false;
  }

  getNextId() {
    return super.getNextId(`${this.constructor.name}`);
  }

  serialize() {
    const data = super.serialize();
    const { title, isComplete } = this;

    Object.assign(data, { title, isComplete });

    return data;
  }

  validate() {
    if (!this.title) {
      return new Error(`Unable to save ${this.constructor.name} without title`);
    }

    if (typeof (this.isComplete) !== 'boolean') {
      return new Error(`Unable to save ${this.constructor.name} without isComplete switch`);
    }
  }

  static get(id = null) {
    return super.get(id, 'Task');
  }

  static getAll(id = null) {
    return super.getAll('Task');
  }

}

// This is part of a fastfix for Model.deserialize()
window.Task = Task;