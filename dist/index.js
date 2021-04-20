'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (_i = _i.call(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var _require = require('form-data-json-convert'),
    FormDataJson = _require.FormDataJson;

var HttpRequestForm = /*#__PURE__*/function () {
  function HttpRequestForm() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$url = _ref.url,
        url = _ref$url === void 0 ? '' : _ref$url,
        _ref$method = _ref.method,
        method = _ref$method === void 0 ? 'GET' : _ref$method,
        _ref$query = _ref.query,
        query = _ref$query === void 0 ? {} : _ref$query,
        _ref$body = _ref.body,
        body = _ref$body === void 0 ? {} : _ref$body,
        form = _ref.form;

    _classCallCheck(this, HttpRequestForm);

    this.url = url;
    this.method = method;
    this.query = query;
    this.body = body;
    this.form = form || document.createElement('form');
    this.form.method = this.method;
    this.populateForm();
  }

  _createClass(HttpRequestForm, [{
    key: "populateForm",
    value: function populateForm() {
      var _this = this;

      var urlObj = new URL(this.url);
      var searchParamsObj = new URLSearchParams(urlObj.search);
      var queryFlattened = FormDataJson.flattenJsonFormValues(this.query);
      Object.entries(queryFlattened).forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            name = _ref3[0],
            value = _ref3[1];

        searchParamsObj.set(name, value);
      }); // GET requests keep all search params in URL
      // while GET requests suppose to have no search params and keep the query params in form data

      if (this.method === 'POST') {
        urlObj.search = searchParamsObj.toString();
        var bodyFlattened = FormDataJson.flattenJsonFormValues(this.body);
        Object.entries(bodyFlattened).forEach(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              name = _ref5[0],
              value = _ref5[1];

          _this.setFormField(name, value);
        });
      } else {
        urlObj.search = '';
        searchParamsObj.forEach(function (value, name) {
          _this.setFormField(name, value);
        });
      }

      this.form.action = urlObj.toString();
    }
  }, {
    key: "setFormField",
    value: function setFormField(name, value) {
      var field;

      try {
        field = this.form.querySelector("input[name=".concat(name, "]"));
      } catch (e) {
        field = null;
      }

      if (!field) {
        field = document.createElement('input');
        field.type = 'hidden';
        field.name = name;
        this.form.appendChild(field);
      }

      field.value = value;
    }
  }, {
    key: "submit",
    value: function submit() {
      if (!document.body.contains(this.form)) {
        document.body.appendChild(this.form);
      }

      this.form.submit();
    }
  }]);

  return HttpRequestForm;
}();

exports.HttpRequestForm = HttpRequestForm;
