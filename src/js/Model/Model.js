/**
 * Base class for all models.
 */
export default class Model {
  constructor() { }

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
          return reject(new Error(`Oops, you are creating ${this.constructor.name}s too quickly!`));
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

  static getStorageData(storageName = 'Model') {
    let data = JSON.parse(localStorage.getItem(storageName));
    if (!data) {
      data = {};
    }
    return data;
  }

}