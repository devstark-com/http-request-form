(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.HttpRequestFormLib = {}));
}(this, (function (exports) { 'use strict';

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

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  var formDataJson_min = createCommonjsModule(function (module) {

    function _typeof(a) {
      "@babel/helpers - typeof";

      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (a) {
        return typeof a;
      } : function (a) {
        return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
      }, _typeof(a);
    }

    function _classCallCheck(a, b) {
      if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
    }

    function _defineProperties(a, b) {
      for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
    }

    function _createClass(a, b, c) {
      return b && _defineProperties(a.prototype, b), c && _defineProperties(a, c), a;
    }

    function _defineProperty(a, b, c) {
      return b in a ? Object.defineProperty(a, b, {
        value: c,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : a[b] = c, a;
    }

    var FormDataJson = function () {
      function a() {
        _classCallCheck(this, a);
      }

      return _createClass(a, null, [{
        key: "getInputValue",
        value: function getInputValue(b) {
          if (b instanceof HTMLSelectElement) {
            for (var c, d = [], e = 0; e < b.options.length; e++) c = b.options[e], c.selected && d.push(("undefined" == typeof c.value ? c.text : c.value).toString());

            return b.multiple ? d : d.length ? d[0] : null;
          }

          return b instanceof HTMLInputElement && -1 < a.checkedInputTypes.indexOf(b.type.toLowerCase()) ? b.checked ? b.value : null : b.value;
        }
      }, {
        key: "setInputValue",
        value: function setInputValue(b, c) {
          var d = (b.type || "text").toLowerCase();
          if (b instanceof HTMLInputElement && -1 < a.checkedInputTypes.indexOf(d)) b.checked = c === b.value;else if (b instanceof HTMLSelectElement) {
            a.isArray(c) || (c = [c]);

            for (var g = 0; g < b.options.length; g++) {
              var e = b.options[g],
                  f = "undefined" == typeof e.value ? e.text : e.value;
              e.selected = -1 < c.indexOf(f);
            }
          } else if (b instanceof HTMLInputElement && "file" === d) ;else b.value = c;
        }
      }, {
        key: "flattenJsonFormValues",
        value: function flattenJsonFormValues(b, c, d) {
          for (var e in d = d || {}, b) {
            var f = c ? c + "[" + e + "]" : e;
            "object" === _typeof(b[e]) && null !== b[e] ? d = a.flattenJsonFormValues(b[e], f, d) : d[f] = b[e];
          }

          return d;
        }
      }, {
        key: "formToJson",
        value: function formToJson(b, c, d) {
          if (c && !(c instanceof FormDataJsonOptions)) return void console.error("Options are not an instance of FormDataJsonOptions");
          c = c || new FormDataJsonOptions();

          for (var e, f = {}, g = b.querySelectorAll("select, textarea, input, button"), h = {}, k = [], l = 0; l < g.length; l++) if (e = g[l], a.isElementAllowed(e, c)) {
            var m = (e.type || "text").toLowerCase();

            if (e.name && 0 !== e.name.length && (c.includeDisabled || !e.disabled)) {
              var n = a.getInputValue(e);
              if (!c.includeButtonValues && (e instanceof HTMLButtonElement || -1 < a.buttonInputTypes.indexOf(m))) continue;

              for (var p, q = e instanceof HTMLSelectElement && e.multiple, r = f, s = e.name.split("["), t = s.length, u = 0; u < t; u++) if (p = s[u], 0 < u && (p = p.substr(0, p.length - 1)), 0 === p.length && ("undefined" == typeof h[e.name] && (h[e.name] = 0), p = h[e.name].toString(), h[e.name]++), q && u === s.length - 2) {
                r[p] = n;
                break;
              } else if (u === s.length - 1) {
                if ("radio" === m && "undefined" != typeof r[p]) break;
                r[p] = n, !c.includeUncheckedAsNull && -1 < a.checkedInputTypes.indexOf(m) && null === n && delete r[p], "file" === m && (delete r[p], d && k.push({
                  object: r,
                  name: p,
                  input: e
                }));
              } else "object" !== _typeof(r[p]) && (r[p] = {}), r = r[p];
            }
          }

          return k.length ? function () {
            for (var a = 0, b = 0, c = function (c) {
              var e = k[c],
                  g = e.object;
              b += e.input.files.length;

              for (var h = function (c) {
                var h = e.input.files[c],
                    i = new FileReader();
                i.onload = function () {
                  "undefined" == typeof g[e.name] && (g[e.name] = e.input.multiple ? [] : null), e.input.multiple ? g[e.name].push(i.result) : g[e.name] = i.result, a++, a === b && d(f);
                }, i.readAsDataURL(h);
              }, i = 0; i < e.input.files.length; i++) h(i);
            }, e = 0; e < k.length; e++) c(e);
          }() : d && d(f), f;
        }
      }, {
        key: "fillFormFromJsonValues",
        value: function fillFormFromJsonValues(b, c, d, e) {
          if (d && !(d instanceof FormDataJsonOptions)) return void console.error("Options are not an instance of FormDataJsonOptions");

          if (c) {
            d = d || new FormDataJsonOptions(), d.unsetAllInputsOnFill && a.unsetFormInputs(b);

            for (var f, g = {}, h = {}, k = b.querySelectorAll("select, textarea, input, button"), l = 0; l < k.length; l++) if (f = k[l], a.isElementAllowed(f, d)) {
              var m = f.name,
                  n = f instanceof HTMLSelectElement && f.multiple;

              if (m && 0 !== m.length && (h[m] = f, m.match(/\[\]/))) {
                var s = m.split("[]");
                n && (s = m.substr(0, m.length - 2).split("[]"));

                for (var o = "", p = 0; p < s.length; p++) s[p].length && (o += s[p] + "[]", "undefined" == typeof g[o] && (g[o] = -1), g[o]++, o = o.replace(/\[\]/, "[" + g[o] + "]"));

                n && (o += "[]"), h[o] = f;
              }
            }

            for (var t in c) {
              var q = c[t],
                  r = e ? e + "[" + t + "]" : t;
              a.isArray(q) && (r += "[]");
              var u = h[r] || null;
              "object" !== _typeof(q) || a.isArray(q) ? u && a.setInputValue(u, q) : a.fillFormFromJsonValues(b, q, d, r);
            }
          }
        }
      }, {
        key: "unsetFormInputs",
        value: function unsetFormInputs(b, c) {
          for (var d, e = b.querySelectorAll("select, textarea, input"), f = 0; f < e.length; f++) if (d = e[f], a.isElementAllowed(d, c)) {
            var g = (d.type || "text").toLowerCase();
            if (-1 < a.buttonInputTypes.indexOf(g)) continue;
            a.setInputValue(d, null);
          }
        }
      }, {
        key: "isArray",
        value: function isArray(a) {
          return "object" === _typeof(a) && "[object Array]" === Object.prototype.toString.call(a);
        }
      }, {
        key: "isElementAllowed",
        value: function isElementAllowed(a, b) {
          return !(a && b && b.inputFilter && "function" == typeof b.inputFilter) || !0 === b.inputFilter(a);
        }
      }]), a;
    }();

    _defineProperty(FormDataJson, "buttonInputTypes", ["button", "submit", "reset", "image"]), _defineProperty(FormDataJson, "checkedInputTypes", ["checkbox", "radio"]);

    var FormDataJsonOptions = function () {
      function a(b) {
        _classCallCheck(this, a), _defineProperty(this, "includeDisabled", void 0), _defineProperty(this, "includeUncheckedAsNull", void 0), _defineProperty(this, "includeButtonValues", void 0), _defineProperty(this, "unsetAllInputsOnFill", void 0), _defineProperty(this, "inputFilter", void 0), this.merge(a.defaults), this.merge(b);
      }

      return _createClass(a, [{
        key: "merge",
        value: function merge(a) {
          if ("object" === _typeof(a)) for (var b in a) this[b] = a[b];
        }
      }]), a;
    }();

    _defineProperty(FormDataJsonOptions, "defaults", {
      includeDisabled: !1,
      includeUncheckedAsNull: !1,
      includeButtonValues: !1,
      unsetAllInputsOnFill: !1,
      inputFilter: null
    }), module.exports && (module.exports = {
      FormDataJson: FormDataJson,
      FormDataJsonOptions: FormDataJsonOptions
    });
  });

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
        var queryFlattened = formDataJson_min.FormDataJson.flattenJsonFormValues(this.query);
        Object.entries(queryFlattened).forEach(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              name = _ref3[0],
              value = _ref3[1];

          searchParamsObj.set(name, value);
        }); // GET requests keep all search params in URL
        // while GET requests suppose to have no search params and keep the query params in form data

        if (this.method === 'POST') {
          urlObj.search = searchParamsObj.toString();
          var bodyFlattened = formDataJson_min.FormDataJson.flattenJsonFormValues(this.body);
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

  Object.defineProperty(exports, '__esModule', { value: true });

})));
