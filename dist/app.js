(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Base class for all models.
 */
var Model = /*#__PURE__*/function () {
  function Model() {
    _classCallCheck(this, Model);
  }

  _createClass(Model, [{
    key: "getNextId",
    value: function getNextId() {
      var storageName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Model';
      var data = Model.getStorageData(storageName);
      return parseInt(Object.keys(data).sort().pop() || 0) + 1;
    }
  }, {
    key: "save",
    value: function save() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var data = Model.getStorageData(_this.constructor.name);

        if (!_this.id) {
          _this.setImmutableProps();

          if (data[_this.id]) {
            return reject(new Error("Oops, you are creating ".concat(_this.constructor.name, "s too quickly!")));
          }
        }

        var error = _this.validate();

        if (error) {
          return reject(error);
        }

        data[_this.id] = _this.serialize();
        localStorage.setItem(_this.constructor.name, JSON.stringify(data));
        resolve(_this);
      });
    }
  }, {
    key: "serialize",
    value: function serialize() {
      return {
        id: this.id
      };
    }
  }, {
    key: "setImmutableProps",
    value: function setImmutableProps(id) {
      id = id || this.getNextId();
      Object.defineProperty(this, 'id', {
        enumerable: true,
        configurable: false,
        writable: false,
        value: id
      });
    }
  }], [{
    key: "getStorageData",
    value: function getStorageData() {
      var storageName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Model';
      var data = JSON.parse(localStorage.getItem(storageName));

      if (!data) {
        data = {};
      }

      return data;
    }
  }]);

  return Model;
}();

exports["default"] = Model;

},{}],2:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Model2 = _interopRequireDefault(require("./Model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Task = /*#__PURE__*/function (_Model) {
  _inherits(Task, _Model);

  var _super = _createSuper(Task);

  function Task() {
    var _this;

    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var description = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    _classCallCheck(this, Task);

    _this = _super.call(this);
    _this.title = title;
    _this.description = description;
    _this.isComplete = false;
    return _this;
  }

  _createClass(Task, [{
    key: "getNextId",
    value: function getNextId() {
      return _get(_getPrototypeOf(Task.prototype), "getNextId", this).call(this, "".concat(this.constructor.name));
    }
  }, {
    key: "serialize",
    value: function serialize() {
      var data = _get(_getPrototypeOf(Task.prototype), "serialize", this).call(this);

      var title = this.title,
          isComplete = this.isComplete;
      Object.assign(data, {
        title: title,
        isComplete: isComplete
      });
      return data;
    }
  }, {
    key: "validate",
    value: function validate() {
      if (!this.title) {
        return new Error("Unable to save ".concat(this.constructor.name, " without title"));
      }

      if (typeof this.isComplete !== 'boolean') {
        return new Error("Unable to save ".concat(this.constructor.name, " without isComplete switch"));
      }
    }
  }], [{
    key: "get",
    value: function get() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return _get(_getPrototypeOf(Task), "get", this).call(this, id, 'Task');
    }
  }]);

  return Task;
}(_Model2["default"]);

exports["default"] = Task;

},{"./Model":1}],3:[function(require,module,exports){
"use strict";

var _Task = _interopRequireDefault(require("./Model/Task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

document.addEventListener("DOMContentLoaded", function () {
  function submitHandler(event) {
    event.preventDefault();
    var data = new FormData(event.target);

    if (data.has('new-task')) {
      var task = new _Task["default"](data.get('new-task'));
      task.save();
    }
  }

  function addListeners() {
    document.addEventListener('submit', submitHandler);
  }

  addListeners();
});

},{"./Model/Task":2}]},{},[3])

//# sourceMappingURL=app.js.map
