/**
 * Base class for all models.
 */
export default class Model {
  constructor() { }

  delete() {
    return new Promise((resolve, reject) => {
      if (!this.id) {
          return reject(new Error(`Unable to destroy a ${this.constructor.name} without an ID!`));
      }

      const data = Model.getStorageData(this.constructor.name);
      const instance = data[this.id];
      
      if (instance) {
          delete data[this.id];
      }
      
      localStorage.setItem(this.constructor.name, JSON.stringify(data));
      resolve(instance);
    });
  }

  getNextId(storageName = 'Model') {
    const data = Model.getStorageData(storageName);

    return parseInt(Object.keys(data).sort().pop() || 0) + 1;
  }

  save() {
    return new Promise((resolve, reject) => {
      const data = Model.getStorageData(this.constructor.name);

      if (!this.id) {
        this.setImmutableProperties();

        if (data[this.id]) {
          return reject(new Error(`A ${this.constructor.name} instance with this id is currently being saved.`));
        }
      }

      const error = this.validate();
      if (error) {
        return reject(error);
      }

      data[this.id] = this.serialize();

      localStorage.setItem(this.constructor.name, JSON.stringify(data));
      resolve(this);
    });
  }

  serialize() {
    return { id: this.id };
  }

  setImmutableProperties(id) {
    id = (id || this.getNextId());

    Object.defineProperty(this, 'id', {
      enumerable: true,
      configurable: false,
      writable: false,
      value: id
    });
  }

  static deserialize(data = null, storageName = 'Model') {
    if (!data) {
        return null;
    }

    // Fastfix: to allow child class instanciation I need
    // to register the child class under the window namespace.
    // It must be avoided, but for now I haven't a better
    // solution.
    const instance = new window[storageName]();

    Object.assign(instance, data);

    instance.setImmutableProperties(data.id);
    return instance;
  }

  static get(id = null, storageName = 'Model') {
    return new Promise((resolve, reject) => {
      const data = Model.getStorageData(storageName);
      if (id) {
        return resolve(Model.deserialize(data[id], storageName));
      }
    });
  }

  static getAll(storageName = 'Model') {
    const data = Model.getStorageData(storageName);
    return Object.keys(data).map(id => Model.deserialize(data[id], storageName));
  }

  static getStorageData(storageName = 'Model') {
    return JSON.parse(localStorage.getItem(storageName)) || {};
  }

}