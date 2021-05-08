import Model from "./Model";

export default class Task extends Model {

  constructor(title = '', description = '') {
    super();

    this.title = title;
    this.description = description;
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

}