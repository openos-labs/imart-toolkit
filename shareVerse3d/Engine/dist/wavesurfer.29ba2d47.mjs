import { bd as ie } from "./index.60bcd3b0.mjs";
function ae(Q, J) {
  for (var G = 0; G < J.length; G++) {
    const z = J[G];
    if (typeof z != "string" && !Array.isArray(z)) {
      for (const H in z)
        if (H !== "default" && !(H in Q)) {
          const X = Object.getOwnPropertyDescriptor(z, H);
          X && Object.defineProperty(Q, H, X.get ? X : {
            enumerable: !0,
            get: () => z[H]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(Q, Symbol.toStringTag, { value: "Module" }));
}
var Z = { exports: {} };
/*!
 * wavesurfer.js 6.4.0 (2022-11-05)
 * https://wavesurfer-js.org
 * @license BSD-3-Clause
 */
(function(Q, J) {
  (function(z, H) {
    Q.exports = H();
  })(self, () => (() => {
    var G = {
      "./src/drawer.canvasentry.js": (V, c, k) => {
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = void 0;
        var w = C(k("./src/util/style.js")), _ = C(k("./src/util/get-id.js"));
        function C(p) {
          return p && p.__esModule ? p : { default: p };
        }
        function R(p, v) {
          if (!(p instanceof v))
            throw new TypeError("Cannot call a class as a function");
        }
        function O(p, v) {
          for (var f = 0; f < v.length; f++) {
            var d = v[f];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(p, d.key, d);
          }
        }
        function S(p, v, f) {
          return v && O(p.prototype, v), f && O(p, f), Object.defineProperty(p, "prototype", { writable: !1 }), p;
        }
        var A = /* @__PURE__ */ function() {
          function p() {
            R(this, p), this.wave = null, this.waveCtx = null, this.progress = null, this.progressCtx = null, this.start = 0, this.end = 1, this.id = (0, _.default)(typeof this.constructor.name < "u" ? this.constructor.name.toLowerCase() + "_" : "canvasentry_"), this.canvasContextAttributes = {};
          }
          return S(p, [{
            key: "initWave",
            value: function(f) {
              this.wave = f, this.waveCtx = this.wave.getContext("2d", this.canvasContextAttributes);
            }
          }, {
            key: "initProgress",
            value: function(f) {
              this.progress = f, this.progressCtx = this.progress.getContext("2d", this.canvasContextAttributes);
            }
          }, {
            key: "updateDimensions",
            value: function(f, d, P, M) {
              this.start = this.wave.offsetLeft / d || 0, this.end = this.start + f / d, this.wave.width = P, this.wave.height = M;
              var g = {
                width: f + "px"
              };
              (0, w.default)(this.wave, g), this.hasProgressCanvas && (this.progress.width = P, this.progress.height = M, (0, w.default)(this.progress, g));
            }
          }, {
            key: "clearWave",
            value: function() {
              this.waveCtx.clearRect(0, 0, this.waveCtx.canvas.width, this.waveCtx.canvas.height), this.hasProgressCanvas && this.progressCtx.clearRect(0, 0, this.progressCtx.canvas.width, this.progressCtx.canvas.height);
            }
          }, {
            key: "setFillStyles",
            value: function(f, d) {
              this.waveCtx.fillStyle = this.getFillStyle(this.waveCtx, f), this.hasProgressCanvas && (this.progressCtx.fillStyle = this.getFillStyle(this.progressCtx, d));
            }
          }, {
            key: "getFillStyle",
            value: function(f, d) {
              if (typeof d == "string" || d instanceof CanvasGradient)
                return d;
              var P = f.createLinearGradient(0, 0, 0, f.canvas.height);
              return d.forEach(function(M, g) {
                return P.addColorStop(g / d.length, M);
              }), P;
            }
          }, {
            key: "applyCanvasTransforms",
            value: function(f) {
              f && (this.waveCtx.setTransform(0, 1, 1, 0, 0, 0), this.hasProgressCanvas && this.progressCtx.setTransform(0, 1, 1, 0, 0, 0));
            }
          }, {
            key: "fillRects",
            value: function(f, d, P, M, g) {
              this.fillRectToContext(this.waveCtx, f, d, P, M, g), this.hasProgressCanvas && this.fillRectToContext(this.progressCtx, f, d, P, M, g);
            }
          }, {
            key: "fillRectToContext",
            value: function(f, d, P, M, g, E) {
              !f || (E ? this.drawRoundedRect(f, d, P, M, g, E) : f.fillRect(d, P, M, g));
            }
          }, {
            key: "drawRoundedRect",
            value: function(f, d, P, M, g, E) {
              g !== 0 && (g < 0 && (g *= -1, P -= g), f.beginPath(), f.moveTo(d + E, P), f.lineTo(d + M - E, P), f.quadraticCurveTo(d + M, P, d + M, P + E), f.lineTo(d + M, P + g - E), f.quadraticCurveTo(d + M, P + g, d + M - E, P + g), f.lineTo(d + E, P + g), f.quadraticCurveTo(d, P + g, d, P + g - E), f.lineTo(d, P + E), f.quadraticCurveTo(d, P, d + E, P), f.closePath(), f.fill());
            }
          }, {
            key: "drawLines",
            value: function(f, d, P, M, g, E) {
              this.drawLineToContext(this.waveCtx, f, d, P, M, g, E), this.hasProgressCanvas && this.drawLineToContext(this.progressCtx, f, d, P, M, g, E);
            }
          }, {
            key: "drawLineToContext",
            value: function(f, d, P, M, g, E, m) {
              if (!!f) {
                var h = d.length / 2, y = Math.round(h * this.start), l = Math.round(h * this.end) + 1, n = y, a = l, o = this.wave.width / (a - n - 1), r = M + g, t = P / M;
                f.beginPath(), f.moveTo((n - y) * o, r), f.lineTo((n - y) * o, r - Math.round((d[2 * n] || 0) / t));
                var s, i, e;
                for (s = n; s < a; s++)
                  i = d[2 * s] || 0, e = Math.round(i / t), f.lineTo((s - y) * o + this.halfPixel, r - e);
                var u = a - 1;
                for (u; u >= n; u--)
                  i = d[2 * u + 1] || 0, e = Math.round(i / t), f.lineTo((u - y) * o + this.halfPixel, r - e);
                f.lineTo((n - y) * o, r - Math.round((d[2 * n + 1] || 0) / t)), f.closePath(), f.fill();
              }
            }
          }, {
            key: "destroy",
            value: function() {
              this.waveCtx = null, this.wave = null, this.progressCtx = null, this.progress = null;
            }
          }, {
            key: "getImage",
            value: function(f, d, P) {
              var M = this;
              if (P === "blob")
                return new Promise(function(g) {
                  M.wave.toBlob(g, f, d);
                });
              if (P === "dataURL")
                return this.wave.toDataURL(f, d);
            }
          }]), p;
        }();
        c.default = A, V.exports = c.default;
      },
      "./src/drawer.js": (V, c, k) => {
        function w(m) {
          return w = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(h) {
            return typeof h;
          } : function(h) {
            return h && typeof Symbol == "function" && h.constructor === Symbol && h !== Symbol.prototype ? "symbol" : typeof h;
          }, w(m);
        }
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = void 0;
        var _ = R(k("./src/util/index.js"));
        function C(m) {
          if (typeof WeakMap != "function")
            return null;
          var h = /* @__PURE__ */ new WeakMap(), y = /* @__PURE__ */ new WeakMap();
          return (C = function(n) {
            return n ? y : h;
          })(m);
        }
        function R(m, h) {
          if (!h && m && m.__esModule)
            return m;
          if (m === null || w(m) !== "object" && typeof m != "function")
            return { default: m };
          var y = C(h);
          if (y && y.has(m))
            return y.get(m);
          var l = {}, n = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var a in m)
            if (a !== "default" && Object.prototype.hasOwnProperty.call(m, a)) {
              var o = n ? Object.getOwnPropertyDescriptor(m, a) : null;
              o && (o.get || o.set) ? Object.defineProperty(l, a, o) : l[a] = m[a];
            }
          return l.default = m, y && y.set(m, l), l;
        }
        function O(m, h) {
          if (!(m instanceof h))
            throw new TypeError("Cannot call a class as a function");
        }
        function S(m, h) {
          for (var y = 0; y < h.length; y++) {
            var l = h[y];
            l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(m, l.key, l);
          }
        }
        function A(m, h, y) {
          return h && S(m.prototype, h), y && S(m, y), Object.defineProperty(m, "prototype", { writable: !1 }), m;
        }
        function p(m, h) {
          if (typeof h != "function" && h !== null)
            throw new TypeError("Super expression must either be null or a function");
          m.prototype = Object.create(h && h.prototype, { constructor: { value: m, writable: !0, configurable: !0 } }), Object.defineProperty(m, "prototype", { writable: !1 }), h && v(m, h);
        }
        function v(m, h) {
          return v = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(l, n) {
            return l.__proto__ = n, l;
          }, v(m, h);
        }
        function f(m) {
          var h = M();
          return function() {
            var l = g(m), n;
            if (h) {
              var a = g(this).constructor;
              n = Reflect.construct(l, arguments, a);
            } else
              n = l.apply(this, arguments);
            return d(this, n);
          };
        }
        function d(m, h) {
          if (h && (w(h) === "object" || typeof h == "function"))
            return h;
          if (h !== void 0)
            throw new TypeError("Derived constructors may only return object or undefined");
          return P(m);
        }
        function P(m) {
          if (m === void 0)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return m;
        }
        function M() {
          if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
            return !1;
          if (typeof Proxy == "function")
            return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), !0;
          } catch {
            return !1;
          }
        }
        function g(m) {
          return g = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(y) {
            return y.__proto__ || Object.getPrototypeOf(y);
          }, g(m);
        }
        var E = /* @__PURE__ */ function(m) {
          p(y, m);
          var h = f(y);
          function y(l, n) {
            var a;
            return O(this, y), a = h.call(this), a.container = _.withOrientation(l, n.vertical), a.params = n, a.width = 0, a.height = n.height * a.params.pixelRatio, a.lastPos = 0, a.wrapper = null, a;
          }
          return A(y, [{
            key: "style",
            value: function(n, a) {
              return _.style(n, a);
            }
          }, {
            key: "createWrapper",
            value: function() {
              this.wrapper = _.withOrientation(this.container.appendChild(document.createElement("wave")), this.params.vertical), this.style(this.wrapper, {
                display: "block",
                position: "relative",
                userSelect: "none",
                webkitUserSelect: "none",
                height: this.params.height + "px"
              }), (this.params.fillParent || this.params.scrollParent) && this.style(this.wrapper, {
                width: "100%",
                cursor: this.params.hideCursor ? "none" : "auto",
                overflowX: this.params.hideScrollbar ? "hidden" : "auto",
                overflowY: "hidden"
              }), this.setupWrapperEvents();
            }
          }, {
            key: "handleEvent",
            value: function(n, a) {
              !a && n.preventDefault();
              var o = _.withOrientation(n.targetTouches ? n.targetTouches[0] : n, this.params.vertical).clientX, r = this.wrapper.getBoundingClientRect(), t = this.width, s = this.getWidth(), i = this.getProgressPixels(r, o), e;
              return !this.params.fillParent && t < s ? e = i * (this.params.pixelRatio / t) || 0 : e = (i + this.wrapper.scrollLeft) / this.wrapper.scrollWidth || 0, _.clamp(e, 0, 1);
            }
          }, {
            key: "getProgressPixels",
            value: function(n, a) {
              return this.params.rtl ? n.right - a : a - n.left;
            }
          }, {
            key: "setupWrapperEvents",
            value: function() {
              var n = this;
              this.wrapper.addEventListener("click", function(a) {
                var o = _.withOrientation(a, n.params.vertical), r = n.wrapper.offsetHeight - n.wrapper.clientHeight;
                if (r !== 0) {
                  var t = n.wrapper.getBoundingClientRect();
                  if (o.clientY >= t.bottom - r)
                    return;
                }
                n.params.interact && n.fireEvent("click", a, n.handleEvent(a));
              }), this.wrapper.addEventListener("dblclick", function(a) {
                n.params.interact && n.fireEvent("dblclick", a, n.handleEvent(a));
              }), this.wrapper.addEventListener("scroll", function(a) {
                return n.fireEvent("scroll", a);
              });
            }
          }, {
            key: "drawPeaks",
            value: function(n, a, o, r) {
              this.setWidth(a) || this.clearWave(), this.params.barWidth ? this.drawBars(n, 0, o, r) : this.drawWave(n, 0, o, r);
            }
          }, {
            key: "resetScroll",
            value: function() {
              this.wrapper !== null && (this.wrapper.scrollLeft = 0);
            }
          }, {
            key: "recenter",
            value: function(n) {
              var a = this.wrapper.scrollWidth * n;
              this.recenterOnPosition(a, !0);
            }
          }, {
            key: "recenterOnPosition",
            value: function(n, a) {
              var o = this.wrapper.scrollLeft, r = ~~(this.wrapper.clientWidth / 2), t = this.wrapper.scrollWidth - this.wrapper.clientWidth, s = n - r, i = s - o;
              if (t != 0) {
                if (!a && -r <= i && i < r) {
                  var e = this.params.autoCenterRate;
                  e /= r, e *= t, i = Math.max(-e, Math.min(e, i)), s = o + i;
                }
                s = Math.max(0, Math.min(t, s)), s != o && (this.wrapper.scrollLeft = s);
              }
            }
          }, {
            key: "getScrollX",
            value: function() {
              var n = 0;
              if (this.wrapper) {
                var a = this.params.pixelRatio;
                if (n = Math.round(this.wrapper.scrollLeft * a), this.params.scrollParent) {
                  var o = ~~(this.wrapper.scrollWidth * a - this.getWidth());
                  n = Math.min(o, Math.max(0, n));
                }
              }
              return n;
            }
          }, {
            key: "getWidth",
            value: function() {
              return Math.round(this.container.clientWidth * this.params.pixelRatio);
            }
          }, {
            key: "setWidth",
            value: function(n) {
              if (this.width == n)
                return !1;
              if (this.width = n, this.params.fillParent || this.params.scrollParent)
                this.style(this.wrapper, {
                  width: ""
                });
              else {
                var a = ~~(this.width / this.params.pixelRatio) + "px";
                this.style(this.wrapper, {
                  width: a
                });
              }
              return this.updateSize(), !0;
            }
          }, {
            key: "setHeight",
            value: function(n) {
              return n == this.height ? !1 : (this.height = n, this.style(this.wrapper, {
                height: ~~(this.height / this.params.pixelRatio) + "px"
              }), this.updateSize(), !0);
            }
          }, {
            key: "progress",
            value: function(n) {
              var a = 1 / this.params.pixelRatio, o = Math.round(n * this.width) * a;
              if (o < this.lastPos || o - this.lastPos >= a) {
                if (this.lastPos = o, this.params.scrollParent && this.params.autoCenter) {
                  var r = ~~(this.wrapper.scrollWidth * n);
                  this.recenterOnPosition(r, this.params.autoCenterImmediately);
                }
                this.updateProgress(o);
              }
            }
          }, {
            key: "destroy",
            value: function() {
              this.unAll(), this.wrapper && (this.wrapper.parentNode == this.container.domElement && this.container.removeChild(this.wrapper.domElement), this.wrapper = null);
            }
          }, {
            key: "updateCursor",
            value: function() {
            }
          }, {
            key: "updateSize",
            value: function() {
            }
          }, {
            key: "drawBars",
            value: function(n, a, o, r) {
            }
          }, {
            key: "drawWave",
            value: function(n, a, o, r) {
            }
          }, {
            key: "clearWave",
            value: function() {
            }
          }, {
            key: "updateProgress",
            value: function(n) {
            }
          }]), y;
        }(_.Observer);
        c.default = E, V.exports = c.default;
      },
      "./src/drawer.multicanvas.js": (V, c, k) => {
        function w(l) {
          return w = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
            return typeof n;
          } : function(n) {
            return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
          }, w(l);
        }
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = void 0;
        var _ = A(k("./src/drawer.js")), C = S(k("./src/util/index.js")), R = A(k("./src/drawer.canvasentry.js"));
        function O(l) {
          if (typeof WeakMap != "function")
            return null;
          var n = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap();
          return (O = function(r) {
            return r ? a : n;
          })(l);
        }
        function S(l, n) {
          if (!n && l && l.__esModule)
            return l;
          if (l === null || w(l) !== "object" && typeof l != "function")
            return { default: l };
          var a = O(n);
          if (a && a.has(l))
            return a.get(l);
          var o = {}, r = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var t in l)
            if (t !== "default" && Object.prototype.hasOwnProperty.call(l, t)) {
              var s = r ? Object.getOwnPropertyDescriptor(l, t) : null;
              s && (s.get || s.set) ? Object.defineProperty(o, t, s) : o[t] = l[t];
            }
          return o.default = l, a && a.set(l, o), o;
        }
        function A(l) {
          return l && l.__esModule ? l : { default: l };
        }
        function p(l, n) {
          if (!(l instanceof n))
            throw new TypeError("Cannot call a class as a function");
        }
        function v(l, n) {
          for (var a = 0; a < n.length; a++) {
            var o = n[a];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(l, o.key, o);
          }
        }
        function f(l, n, a) {
          return n && v(l.prototype, n), a && v(l, a), Object.defineProperty(l, "prototype", { writable: !1 }), l;
        }
        function d(l, n) {
          if (typeof n != "function" && n !== null)
            throw new TypeError("Super expression must either be null or a function");
          l.prototype = Object.create(n && n.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), Object.defineProperty(l, "prototype", { writable: !1 }), n && P(l, n);
        }
        function P(l, n) {
          return P = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, r) {
            return o.__proto__ = r, o;
          }, P(l, n);
        }
        function M(l) {
          var n = m();
          return function() {
            var o = h(l), r;
            if (n) {
              var t = h(this).constructor;
              r = Reflect.construct(o, arguments, t);
            } else
              r = o.apply(this, arguments);
            return g(this, r);
          };
        }
        function g(l, n) {
          if (n && (w(n) === "object" || typeof n == "function"))
            return n;
          if (n !== void 0)
            throw new TypeError("Derived constructors may only return object or undefined");
          return E(l);
        }
        function E(l) {
          if (l === void 0)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return l;
        }
        function m() {
          if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
            return !1;
          if (typeof Proxy == "function")
            return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), !0;
          } catch {
            return !1;
          }
        }
        function h(l) {
          return h = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(a) {
            return a.__proto__ || Object.getPrototypeOf(a);
          }, h(l);
        }
        var y = /* @__PURE__ */ function(l) {
          d(a, l);
          var n = M(a);
          function a(o, r) {
            var t;
            return p(this, a), t = n.call(this, o, r), t.maxCanvasWidth = r.maxCanvasWidth, t.maxCanvasElementWidth = Math.round(r.maxCanvasWidth / r.pixelRatio), t.hasProgressCanvas = r.waveColor != r.progressColor, t.halfPixel = 0.5 / r.pixelRatio, t.canvases = [], t.progressWave = null, t.EntryClass = R.default, t.canvasContextAttributes = r.drawingContextAttributes, t.overlap = 2 * Math.ceil(r.pixelRatio / 2), t.barRadius = r.barRadius || 0, t.vertical = r.vertical, t;
          }
          return f(a, [{
            key: "init",
            value: function() {
              this.createWrapper(), this.createElements();
            }
          }, {
            key: "createElements",
            value: function() {
              this.progressWave = C.withOrientation(this.wrapper.appendChild(document.createElement("wave")), this.params.vertical), this.style(this.progressWave, {
                position: "absolute",
                zIndex: 3,
                left: 0,
                top: 0,
                bottom: 0,
                overflow: "hidden",
                width: "0",
                display: "none",
                boxSizing: "border-box",
                borderRightStyle: "solid",
                pointerEvents: "none"
              }), this.addCanvas(), this.updateCursor();
            }
          }, {
            key: "updateCursor",
            value: function() {
              this.style(this.progressWave, {
                borderRightWidth: this.params.cursorWidth + "px",
                borderRightColor: this.params.cursorColor
              });
            }
          }, {
            key: "updateSize",
            value: function() {
              for (var r = this, t = Math.round(this.width / this.params.pixelRatio), s = Math.ceil(t / (this.maxCanvasElementWidth + this.overlap)); this.canvases.length < s; )
                this.addCanvas();
              for (; this.canvases.length > s; )
                this.removeCanvas();
              var i = this.maxCanvasWidth + this.overlap, e = this.canvases.length - 1;
              this.canvases.forEach(function(u, b) {
                b == e && (i = r.width - r.maxCanvasWidth * e), r.updateDimensions(u, i, r.height), u.clearWave();
              });
            }
          }, {
            key: "addCanvas",
            value: function() {
              var r = new this.EntryClass();
              r.canvasContextAttributes = this.canvasContextAttributes, r.hasProgressCanvas = this.hasProgressCanvas, r.halfPixel = this.halfPixel;
              var t = this.maxCanvasElementWidth * this.canvases.length, s = C.withOrientation(this.wrapper.appendChild(document.createElement("canvas")), this.params.vertical);
              if (this.style(s, {
                position: "absolute",
                zIndex: 2,
                left: t + "px",
                top: 0,
                bottom: 0,
                height: "100%",
                pointerEvents: "none"
              }), r.initWave(s), this.hasProgressCanvas) {
                var i = C.withOrientation(this.progressWave.appendChild(document.createElement("canvas")), this.params.vertical);
                this.style(i, {
                  position: "absolute",
                  left: t + "px",
                  top: 0,
                  bottom: 0,
                  height: "100%"
                }), r.initProgress(i);
              }
              this.canvases.push(r);
            }
          }, {
            key: "removeCanvas",
            value: function() {
              var r = this.canvases[this.canvases.length - 1];
              r.wave.parentElement.removeChild(r.wave.domElement), this.hasProgressCanvas && r.progress.parentElement.removeChild(r.progress.domElement), r && (r.destroy(), r = null), this.canvases.pop();
            }
          }, {
            key: "updateDimensions",
            value: function(r, t, s) {
              var i = Math.round(t / this.params.pixelRatio), e = Math.round(this.width / this.params.pixelRatio);
              r.updateDimensions(i, e, t, s), this.style(this.progressWave, {
                display: "block"
              });
            }
          }, {
            key: "clearWave",
            value: function() {
              var r = this;
              C.frame(function() {
                r.canvases.forEach(function(t) {
                  return t.clearWave();
                });
              })();
            }
          }, {
            key: "drawBars",
            value: function(r, t, s, i) {
              var e = this;
              return this.prepareDraw(r, t, s, i, function(u) {
                var b = u.absmax, x = u.hasMinVals;
                u.height;
                var T = u.offsetY, D = u.halfH, j = u.peaks, W = u.channelIndex;
                if (s !== void 0) {
                  var L = x ? 2 : 1, N = j.length / L, B = e.params.barWidth * e.params.pixelRatio, q = e.params.barGap === null ? Math.max(e.params.pixelRatio, ~~(B / 2)) : Math.max(e.params.pixelRatio, e.params.barGap * e.params.pixelRatio), I = B + q, F = N / e.width, te = s, re = i, U = te;
                  for (U; U < re; U += I) {
                    var $ = 0, K = Math.floor(U * F) * L, ne = Math.floor((U + I) * F) * L;
                    do {
                      var ee = Math.abs(j[K]);
                      ee > $ && ($ = ee), K += L;
                    } while (K < ne);
                    var Y = Math.round($ / b * D);
                    e.params.barMinHeight && (Y = Math.max(Y, e.params.barMinHeight)), e.fillRect(U + e.halfPixel, D - Y + T, B + e.halfPixel, Y * 2, e.barRadius, W);
                  }
                }
              });
            }
          }, {
            key: "drawWave",
            value: function(r, t, s, i) {
              var e = this;
              return this.prepareDraw(r, t, s, i, function(u) {
                var b = u.absmax, x = u.hasMinVals;
                u.height;
                var T = u.offsetY, D = u.halfH, j = u.peaks, W = u.channelIndex;
                if (!x) {
                  var L = [], N = j.length, B = 0;
                  for (B; B < N; B++)
                    L[2 * B] = j[B], L[2 * B + 1] = -j[B];
                  j = L;
                }
                s !== void 0 && e.drawLine(j, b, D, T, s, i, W), e.fillRect(0, D + T - e.halfPixel, e.width, e.halfPixel, e.barRadius, W);
              });
            }
          }, {
            key: "drawLine",
            value: function(r, t, s, i, e, u, b) {
              var x = this, T = this.params.splitChannelsOptions.channelColors[b] || {}, D = T.waveColor, j = T.progressColor;
              this.canvases.forEach(function(W, L) {
                x.setFillStyles(W, D, j), x.applyCanvasTransforms(W, x.params.vertical), W.drawLines(r, t, s, i, e, u);
              });
            }
          }, {
            key: "fillRect",
            value: function(r, t, s, i, e, u) {
              var b = Math.floor(r / this.maxCanvasWidth), x = Math.min(Math.ceil((r + s) / this.maxCanvasWidth) + 1, this.canvases.length), T = b;
              for (T; T < x; T++) {
                var D = this.canvases[T], j = T * this.maxCanvasWidth, W = {
                  x1: Math.max(r, T * this.maxCanvasWidth),
                  y1: t,
                  x2: Math.min(r + s, T * this.maxCanvasWidth + D.wave.width),
                  y2: t + i
                };
                if (W.x1 < W.x2) {
                  var L = this.params.splitChannelsOptions.channelColors[u] || {}, N = L.waveColor, B = L.progressColor;
                  this.setFillStyles(D, N, B), this.applyCanvasTransforms(D, this.params.vertical), D.fillRects(W.x1 - j, W.y1, W.x2 - W.x1, W.y2 - W.y1, e);
                }
              }
            }
          }, {
            key: "hideChannel",
            value: function(r) {
              return this.params.splitChannels && this.params.splitChannelsOptions.filterChannels.includes(r);
            }
          }, {
            key: "prepareDraw",
            value: function(r, t, s, i, e, u, b) {
              var x = this;
              return C.frame(function() {
                if (r[0] instanceof Array) {
                  var T = r;
                  if (x.params.splitChannels) {
                    var D = T.filter(function(I, F) {
                      return !x.hideChannel(F);
                    });
                    x.params.splitChannelsOptions.overlay || x.setHeight(Math.max(D.length, 1) * x.params.height * x.params.pixelRatio);
                    var j;
                    return x.params.splitChannelsOptions && x.params.splitChannelsOptions.relativeNormalization && (j = C.max(T.map(function(I) {
                      return C.absMax(I);
                    }))), T.forEach(function(I, F) {
                      return x.prepareDraw(I, F, s, i, e, D.indexOf(I), j);
                    });
                  }
                  r = T[0];
                }
                if (!x.hideChannel(t)) {
                  var W = 1 / x.params.barHeight;
                  x.params.normalize && (W = b === void 0 ? C.absMax(r) : b);
                  var L = [].some.call(r, function(I) {
                    return I < 0;
                  }), N = x.params.height * x.params.pixelRatio, B = N / 2, q = N * u || 0;
                  return x.params.splitChannelsOptions && x.params.splitChannelsOptions.overlay && (q = 0), e({
                    absmax: W,
                    hasMinVals: L,
                    height: N,
                    offsetY: q,
                    halfH: B,
                    peaks: r,
                    channelIndex: t
                  });
                }
              })();
            }
          }, {
            key: "setFillStyles",
            value: function(r) {
              var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.params.waveColor, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.params.progressColor;
              r.setFillStyles(t, s);
            }
          }, {
            key: "applyCanvasTransforms",
            value: function(r) {
              var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
              r.applyCanvasTransforms(t);
            }
          }, {
            key: "getImage",
            value: function(r, t, s) {
              if (s === "blob")
                return Promise.all(this.canvases.map(function(e) {
                  return e.getImage(r, t, s);
                }));
              if (s === "dataURL") {
                var i = this.canvases.map(function(e) {
                  return e.getImage(r, t, s);
                });
                return i.length > 1 ? i : i[0];
              }
            }
          }, {
            key: "updateProgress",
            value: function(r) {
              this.style(this.progressWave, {
                width: r + "px"
              });
            }
          }]), a;
        }(_.default);
        c.default = y, V.exports = c.default;
      },
      "./src/mediaelement-webaudio.js": (V, c, k) => {
        function w(h) {
          return w = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(y) {
            return typeof y;
          } : function(y) {
            return y && typeof Symbol == "function" && y.constructor === Symbol && y !== Symbol.prototype ? "symbol" : typeof y;
          }, w(h);
        }
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = void 0;
        var _ = C(k("./src/mediaelement.js"));
        function C(h) {
          return h && h.__esModule ? h : { default: h };
        }
        function R(h, y) {
          if (!(h instanceof y))
            throw new TypeError("Cannot call a class as a function");
        }
        function O(h, y) {
          for (var l = 0; l < y.length; l++) {
            var n = y[l];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(h, n.key, n);
          }
        }
        function S(h, y, l) {
          return y && O(h.prototype, y), l && O(h, l), Object.defineProperty(h, "prototype", { writable: !1 }), h;
        }
        function A() {
          return typeof Reflect < "u" && Reflect.get ? A = Reflect.get.bind() : A = function(y, l, n) {
            var a = p(y, l);
            if (!!a) {
              var o = Object.getOwnPropertyDescriptor(a, l);
              return o.get ? o.get.call(arguments.length < 3 ? y : n) : o.value;
            }
          }, A.apply(this, arguments);
        }
        function p(h, y) {
          for (; !Object.prototype.hasOwnProperty.call(h, y) && (h = E(h), h !== null); )
            ;
          return h;
        }
        function v(h, y) {
          if (typeof y != "function" && y !== null)
            throw new TypeError("Super expression must either be null or a function");
          h.prototype = Object.create(y && y.prototype, { constructor: { value: h, writable: !0, configurable: !0 } }), Object.defineProperty(h, "prototype", { writable: !1 }), y && f(h, y);
        }
        function f(h, y) {
          return f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
            return n.__proto__ = a, n;
          }, f(h, y);
        }
        function d(h) {
          var y = g();
          return function() {
            var n = E(h), a;
            if (y) {
              var o = E(this).constructor;
              a = Reflect.construct(n, arguments, o);
            } else
              a = n.apply(this, arguments);
            return P(this, a);
          };
        }
        function P(h, y) {
          if (y && (w(y) === "object" || typeof y == "function"))
            return y;
          if (y !== void 0)
            throw new TypeError("Derived constructors may only return object or undefined");
          return M(h);
        }
        function M(h) {
          if (h === void 0)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return h;
        }
        function g() {
          if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
            return !1;
          if (typeof Proxy == "function")
            return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), !0;
          } catch {
            return !1;
          }
        }
        function E(h) {
          return E = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(l) {
            return l.__proto__ || Object.getPrototypeOf(l);
          }, E(h);
        }
        var m = /* @__PURE__ */ function(h) {
          v(l, h);
          var y = d(l);
          function l(n) {
            var a;
            return R(this, l), a = y.call(this, n), a.params = n, a.sourceMediaElement = null, a;
          }
          return S(l, [{
            key: "init",
            value: function() {
              this.setPlaybackRate(this.params.audioRate), this.createTimer(), this.createVolumeNode(), this.createScriptNode(), this.createAnalyserNode();
            }
          }, {
            key: "_load",
            value: function(a, o, r) {
              A(E(l.prototype), "_load", this).call(this, a, o, r), this.createMediaElementSource(a);
            }
          }, {
            key: "createMediaElementSource",
            value: function(a) {
              this.sourceMediaElement = this.ac.createMediaElementSource(a), this.sourceMediaElement.connect(this.analyser);
            }
          }, {
            key: "play",
            value: function(a, o) {
              return this.resumeAudioContext(), A(E(l.prototype), "play", this).call(this, a, o);
            }
          }, {
            key: "destroy",
            value: function() {
              A(E(l.prototype), "destroy", this).call(this), this.destroyWebAudio();
            }
          }]), l;
        }(_.default);
        c.default = m, V.exports = c.default;
      },
      "./src/mediaelement.js": (V, c, k) => {
        function w(n) {
          return w = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(a) {
            return typeof a;
          } : function(a) {
            return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
          }, w(n);
        }
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = void 0;
        var _ = S(k("./src/webaudio.js")), C = O(k("./src/util/index.js"));
        function R(n) {
          if (typeof WeakMap != "function")
            return null;
          var a = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap();
          return (R = function(t) {
            return t ? o : a;
          })(n);
        }
        function O(n, a) {
          if (!a && n && n.__esModule)
            return n;
          if (n === null || w(n) !== "object" && typeof n != "function")
            return { default: n };
          var o = R(a);
          if (o && o.has(n))
            return o.get(n);
          var r = {}, t = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var s in n)
            if (s !== "default" && Object.prototype.hasOwnProperty.call(n, s)) {
              var i = t ? Object.getOwnPropertyDescriptor(n, s) : null;
              i && (i.get || i.set) ? Object.defineProperty(r, s, i) : r[s] = n[s];
            }
          return r.default = n, o && o.set(n, r), r;
        }
        function S(n) {
          return n && n.__esModule ? n : { default: n };
        }
        function A(n, a) {
          if (!(n instanceof a))
            throw new TypeError("Cannot call a class as a function");
        }
        function p(n, a) {
          for (var o = 0; o < a.length; o++) {
            var r = a[o];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(n, r.key, r);
          }
        }
        function v(n, a, o) {
          return a && p(n.prototype, a), o && p(n, o), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        }
        function f() {
          return typeof Reflect < "u" && Reflect.get ? f = Reflect.get.bind() : f = function(a, o, r) {
            var t = d(a, o);
            if (!!t) {
              var s = Object.getOwnPropertyDescriptor(t, o);
              return s.get ? s.get.call(arguments.length < 3 ? a : r) : s.value;
            }
          }, f.apply(this, arguments);
        }
        function d(n, a) {
          for (; !Object.prototype.hasOwnProperty.call(n, a) && (n = y(n), n !== null); )
            ;
          return n;
        }
        function P(n, a) {
          if (typeof a != "function" && a !== null)
            throw new TypeError("Super expression must either be null or a function");
          n.prototype = Object.create(a && a.prototype, { constructor: { value: n, writable: !0, configurable: !0 } }), Object.defineProperty(n, "prototype", { writable: !1 }), a && M(n, a);
        }
        function M(n, a) {
          return M = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, t) {
            return r.__proto__ = t, r;
          }, M(n, a);
        }
        function g(n) {
          var a = h();
          return function() {
            var r = y(n), t;
            if (a) {
              var s = y(this).constructor;
              t = Reflect.construct(r, arguments, s);
            } else
              t = r.apply(this, arguments);
            return E(this, t);
          };
        }
        function E(n, a) {
          if (a && (w(a) === "object" || typeof a == "function"))
            return a;
          if (a !== void 0)
            throw new TypeError("Derived constructors may only return object or undefined");
          return m(n);
        }
        function m(n) {
          if (n === void 0)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return n;
        }
        function h() {
          if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
            return !1;
          if (typeof Proxy == "function")
            return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), !0;
          } catch {
            return !1;
          }
        }
        function y(n) {
          return y = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          }, y(n);
        }
        var l = /* @__PURE__ */ function(n) {
          P(o, n);
          var a = g(o);
          function o(r) {
            var t;
            return A(this, o), t = a.call(this, r), t.params = r, t.media = {
              currentTime: 0,
              duration: 0,
              paused: !0,
              playbackRate: 1,
              play: function() {
              },
              pause: function() {
              },
              volume: 0
            }, t.mediaType = r.mediaType.toLowerCase(), t.elementPosition = r.elementPosition, t.peaks = null, t.playbackRate = 1, t.volume = 1, t.isMuted = !1, t.buffer = null, t.onPlayEnd = null, t.mediaListeners = {}, t;
          }
          return v(o, [{
            key: "init",
            value: function() {
              this.setPlaybackRate(this.params.audioRate), this.createTimer();
            }
          }, {
            key: "_setupMediaListeners",
            value: function() {
              var t = this;
              this.mediaListeners.error = function() {
                t.fireEvent("error", "Error loading media element");
              }, this.mediaListeners.canplay = function() {
                t.fireEvent("canplay");
              }, this.mediaListeners.ended = function() {
                t.fireEvent("finish");
              }, this.mediaListeners.play = function() {
                t.fireEvent("play");
              }, this.mediaListeners.pause = function() {
                t.fireEvent("pause");
              }, this.mediaListeners.seeked = function(s) {
                t.fireEvent("seek");
              }, this.mediaListeners.volumechange = function(s) {
                t.isMuted = t.media.muted, t.isMuted ? t.volume = 0 : t.volume = t.media.volume, t.fireEvent("volume");
              }, Object.keys(this.mediaListeners).forEach(function(s) {
                t.media.removeEventListener(s, t.mediaListeners[s]), t.media.addEventListener(s, t.mediaListeners[s]);
              });
            }
          }, {
            key: "createTimer",
            value: function() {
              var t = this, s = function i() {
                t.isPaused() || (t.fireEvent("audioprocess", t.getCurrentTime()), C.frame(i)());
              };
              this.on("play", s), this.on("pause", function() {
                t.fireEvent("audioprocess", t.getCurrentTime());
              });
            }
          }, {
            key: "load",
            value: function(t, s, i, e) {
              var u = document.createElement(this.mediaType);
              u.controls = this.params.mediaControls, u.autoplay = this.params.autoplay || !1, u.preload = e == null ? "auto" : e, u.src = t, u.style.width = "100%";
              var b = s.querySelector(this.mediaType);
              b && s.removeChild(b), s.appendChild(u), this._load(u, i, e);
            }
          }, {
            key: "loadElt",
            value: function(t, s) {
              t.controls = this.params.mediaControls, t.autoplay = this.params.autoplay || !1, this._load(t, s, t.preload);
            }
          }, {
            key: "_load",
            value: function(t, s, i) {
              if (!(t instanceof HTMLMediaElement) || typeof t.addEventListener > "u")
                throw new Error("media parameter is not a valid media element");
              typeof t.load == "function" && !(s && i == "none") && t.load(), this.media = t, this._setupMediaListeners(), this.peaks = s, this.onPlayEnd = null, this.buffer = null, this.isMuted = t.muted, this.setPlaybackRate(this.playbackRate), this.setVolume(this.volume);
            }
          }, {
            key: "isPaused",
            value: function() {
              return !this.media || this.media.paused;
            }
          }, {
            key: "getDuration",
            value: function() {
              if (this.explicitDuration)
                return this.explicitDuration;
              var t = (this.buffer || this.media).duration;
              return t >= 1 / 0 && (t = this.media.seekable.end(0)), t;
            }
          }, {
            key: "getCurrentTime",
            value: function() {
              return this.media && this.media.currentTime;
            }
          }, {
            key: "getPlayedPercents",
            value: function() {
              return this.getCurrentTime() / this.getDuration() || 0;
            }
          }, {
            key: "getPlaybackRate",
            value: function() {
              return this.playbackRate || this.media.playbackRate;
            }
          }, {
            key: "setPlaybackRate",
            value: function(t) {
              this.playbackRate = t || 1, this.media.playbackRate = this.playbackRate;
            }
          }, {
            key: "seekTo",
            value: function(t) {
              t != null && !isNaN(t) && (this.media.currentTime = t), this.clearPlayEnd();
            }
          }, {
            key: "play",
            value: function(t, s) {
              this.seekTo(t);
              var i = this.media.play();
              return s && this.setPlayEnd(s), i;
            }
          }, {
            key: "pause",
            value: function() {
              var t;
              return this.media && (t = this.media.pause()), this.clearPlayEnd(), t;
            }
          }, {
            key: "setPlayEnd",
            value: function(t) {
              var s = this;
              this.clearPlayEnd(), this._onPlayEnd = function(i) {
                i >= t && (s.pause(), s.seekTo(t));
              }, this.on("audioprocess", this._onPlayEnd);
            }
          }, {
            key: "clearPlayEnd",
            value: function() {
              this._onPlayEnd && (this.un("audioprocess", this._onPlayEnd), this._onPlayEnd = null);
            }
          }, {
            key: "getPeaks",
            value: function(t, s, i) {
              return this.buffer ? f(y(o.prototype), "getPeaks", this).call(this, t, s, i) : this.peaks || [];
            }
          }, {
            key: "setSinkId",
            value: function(t) {
              return t ? this.media.setSinkId ? this.media.setSinkId(t) : Promise.reject(new Error("setSinkId is not supported in your browser")) : Promise.reject(new Error("Invalid deviceId: " + t));
            }
          }, {
            key: "getVolume",
            value: function() {
              return this.volume;
            }
          }, {
            key: "setVolume",
            value: function(t) {
              this.volume = t, this.media.volume !== this.volume && (this.media.volume = this.volume);
            }
          }, {
            key: "setMute",
            value: function(t) {
              this.isMuted = this.media.muted = t;
            }
          }, {
            key: "destroy",
            value: function() {
              var t = this;
              this.pause(), this.unAll(), this.destroyed = !0, Object.keys(this.mediaListeners).forEach(function(s) {
                t.media && t.media.removeEventListener(s, t.mediaListeners[s]);
              }), this.params.removeMediaElementOnDestroy && this.media && this.media.parentNode && this.media.parentNode.removeChild(this.media), this.media = null;
            }
          }]), o;
        }(_.default);
        c.default = l, V.exports = c.default;
      },
      "./src/peakcache.js": (V, c) => {
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = void 0;
        function k(R, O) {
          if (!(R instanceof O))
            throw new TypeError("Cannot call a class as a function");
        }
        function w(R, O) {
          for (var S = 0; S < O.length; S++) {
            var A = O[S];
            A.enumerable = A.enumerable || !1, A.configurable = !0, "value" in A && (A.writable = !0), Object.defineProperty(R, A.key, A);
          }
        }
        function _(R, O, S) {
          return O && w(R.prototype, O), S && w(R, S), Object.defineProperty(R, "prototype", { writable: !1 }), R;
        }
        var C = /* @__PURE__ */ function() {
          function R() {
            k(this, R), this.clearPeakCache();
          }
          return _(R, [{
            key: "clearPeakCache",
            value: function() {
              this.peakCacheRanges = [], this.peakCacheLength = -1;
            }
          }, {
            key: "addRangeToPeakCache",
            value: function(S, A, p) {
              S != this.peakCacheLength && (this.clearPeakCache(), this.peakCacheLength = S);
              for (var v = [], f = 0; f < this.peakCacheRanges.length && this.peakCacheRanges[f] < A; )
                f++;
              for (f % 2 == 0 && v.push(A); f < this.peakCacheRanges.length && this.peakCacheRanges[f] <= p; )
                v.push(this.peakCacheRanges[f]), f++;
              f % 2 == 0 && v.push(p), v = v.filter(function(P, M, g) {
                return M == 0 ? P != g[M + 1] : M == g.length - 1 ? P != g[M - 1] : P != g[M - 1] && P != g[M + 1];
              }), this.peakCacheRanges = this.peakCacheRanges.concat(v), this.peakCacheRanges = this.peakCacheRanges.sort(function(P, M) {
                return P - M;
              }).filter(function(P, M, g) {
                return M == 0 ? P != g[M + 1] : M == g.length - 1 ? P != g[M - 1] : P != g[M - 1] && P != g[M + 1];
              });
              var d = [];
              for (f = 0; f < v.length; f += 2)
                d.push([v[f], v[f + 1]]);
              return d;
            }
          }, {
            key: "getCacheRanges",
            value: function() {
              var S = [], A;
              for (A = 0; A < this.peakCacheRanges.length; A += 2)
                S.push([this.peakCacheRanges[A], this.peakCacheRanges[A + 1]]);
              return S;
            }
          }]), R;
        }();
        c.default = C, V.exports = c.default;
      },
      "./src/util/absMax.js": (V, c, k) => {
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = R;
        var w = C(k("./src/util/max.js")), _ = C(k("./src/util/min.js"));
        function C(O) {
          return O && O.__esModule ? O : { default: O };
        }
        function R(O) {
          var S = (0, w.default)(O), A = (0, _.default)(O);
          return -A > S ? -A : S;
        }
        V.exports = c.default;
      },
      "./src/util/clamp.js": (V, c) => {
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = k;
        function k(w, _, C) {
          return Math.min(Math.max(_, w), C);
        }
        V.exports = c.default;
      },
      "./src/util/fetch.js": (V, c, k) => {
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = A;
        var w = _(k("./src/util/observer.js"));
        function _(p) {
          return p && p.__esModule ? p : { default: p };
        }
        function C(p, v) {
          if (!(p instanceof v))
            throw new TypeError("Cannot call a class as a function");
        }
        function R(p, v) {
          for (var f = 0; f < v.length; f++) {
            var d = v[f];
            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(p, d.key, d);
          }
        }
        function O(p, v, f) {
          return v && R(p.prototype, v), f && R(p, f), Object.defineProperty(p, "prototype", { writable: !1 }), p;
        }
        var S = /* @__PURE__ */ function() {
          function p(v, f, d) {
            C(this, p), this.instance = v, this.instance._reader = d.body.getReader(), this.total = parseInt(f, 10), this.loaded = 0;
          }
          return O(p, [{
            key: "start",
            value: function(f) {
              var d = this, P = function M() {
                d.instance._reader.read().then(function(g) {
                  var E = g.done, m = g.value;
                  if (E) {
                    d.total === 0 && d.instance.onProgress.call(d.instance, {
                      loaded: d.loaded,
                      total: d.total,
                      lengthComputable: !1
                    }), f.close();
                    return;
                  }
                  d.loaded += m.byteLength, d.instance.onProgress.call(d.instance, {
                    loaded: d.loaded,
                    total: d.total,
                    lengthComputable: d.total !== 0
                  }), f.enqueue(m), M();
                }).catch(function(g) {
                  f.error(g);
                });
              };
              P();
            }
          }]), p;
        }();
        function A(p) {
          if (p) {
            if (!p.url)
              throw new Error("fetch url missing");
          } else
            throw new Error("fetch options missing");
          var v = new w.default(), f = new Headers(), d = new Request(p.url);
          v.controller = new AbortController(), p && p.requestHeaders && p.requestHeaders.forEach(function(g) {
            f.append(g.key, g.value);
          });
          var P = p.responseType || "json", M = {
            method: p.method || "GET",
            headers: f,
            mode: p.mode || "cors",
            credentials: p.credentials || "same-origin",
            cache: p.cache || "default",
            redirect: p.redirect || "follow",
            referrer: p.referrer || "client",
            signal: v.controller.signal
          };
          return fetch(d, M).then(function(g) {
            v.response = g;
            var E = !0;
            g.body || (E = !1);
            var m = g.headers.get("content-length");
            return m === null && (E = !1), E ? (v.onProgress = function(h) {
              v.fireEvent("progress", h);
            }, new Response(new ReadableStream(new S(v, m, g)), M)) : g;
          }).then(function(g) {
            var E;
            if (g.ok)
              switch (P) {
                case "arraybuffer":
                  return g.arrayBuffer();
                case "json":
                  return g.json();
                case "blob":
                  return g.blob();
                case "text":
                  return g.text();
                default:
                  E = "Unknown responseType: " + P;
                  break;
              }
            throw E || (E = "HTTP error status: " + g.status), new Error(E);
          }).then(function(g) {
            v.fireEvent("success", g);
          }).catch(function(g) {
            v.fireEvent("error", g);
          }), v.fetchRequest = d, v;
        }
        V.exports = c.default;
      },
      "./src/util/frame.js": (V, c, k) => {
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = C;
        var w = _(k("./src/util/request-animation-frame.js"));
        function _(R) {
          return R && R.__esModule ? R : { default: R };
        }
        function C(R) {
          return function() {
            for (var O = arguments.length, S = new Array(O), A = 0; A < O; A++)
              S[A] = arguments[A];
            return (0, w.default)(function() {
              return R.apply(void 0, S);
            });
          };
        }
        V.exports = c.default;
      },
      "./src/util/get-id.js": (V, c) => {
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = k;
        function k(w) {
          return w === void 0 && (w = "wavesurfer_"), w + Math.random().toString(32).substring(2);
        }
        V.exports = c.default;
      },
      "./src/util/index.js": (V, c, k) => {
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), Object.defineProperty(c, "Observer", {
          enumerable: !0,
          get: function() {
            return O.default;
          }
        }), Object.defineProperty(c, "absMax", {
          enumerable: !0,
          get: function() {
            return R.default;
          }
        }), Object.defineProperty(c, "clamp", {
          enumerable: !0,
          get: function() {
            return P.default;
          }
        }), Object.defineProperty(c, "debounce", {
          enumerable: !0,
          get: function() {
            return v.default;
          }
        }), Object.defineProperty(c, "fetchFile", {
          enumerable: !0,
          get: function() {
            return d.default;
          }
        }), Object.defineProperty(c, "frame", {
          enumerable: !0,
          get: function() {
            return p.default;
          }
        }), Object.defineProperty(c, "getId", {
          enumerable: !0,
          get: function() {
            return w.default;
          }
        }), Object.defineProperty(c, "ignoreSilenceMode", {
          enumerable: !0,
          get: function() {
            return g.default;
          }
        }), Object.defineProperty(c, "max", {
          enumerable: !0,
          get: function() {
            return _.default;
          }
        }), Object.defineProperty(c, "min", {
          enumerable: !0,
          get: function() {
            return C.default;
          }
        }), Object.defineProperty(c, "preventClick", {
          enumerable: !0,
          get: function() {
            return f.default;
          }
        }), Object.defineProperty(c, "requestAnimationFrame", {
          enumerable: !0,
          get: function() {
            return A.default;
          }
        }), Object.defineProperty(c, "style", {
          enumerable: !0,
          get: function() {
            return S.default;
          }
        }), Object.defineProperty(c, "withOrientation", {
          enumerable: !0,
          get: function() {
            return M.default;
          }
        });
        var w = E(k("./src/util/get-id.js")), _ = E(k("./src/util/max.js")), C = E(k("./src/util/min.js")), R = E(k("./src/util/absMax.js")), O = E(k("./src/util/observer.js")), S = E(k("./src/util/style.js")), A = E(k("./src/util/request-animation-frame.js")), p = E(k("./src/util/frame.js")), v = E(k("./node_modules/debounce/index.js")), f = E(k("./src/util/prevent-click.js")), d = E(k("./src/util/fetch.js")), P = E(k("./src/util/clamp.js")), M = E(k("./src/util/orientation.js")), g = E(k("./src/util/silence-mode.js"));
        function E(m) {
          return m && m.__esModule ? m : { default: m };
        }
      },
      "./src/util/max.js": (V, c) => {
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = k;
        function k(w) {
          var _ = -1 / 0;
          return Object.keys(w).forEach(function(C) {
            w[C] > _ && (_ = w[C]);
          }), _;
        }
        V.exports = c.default;
      },
      "./src/util/min.js": (V, c) => {
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = k;
        function k(w) {
          var _ = Number(1 / 0);
          return Object.keys(w).forEach(function(C) {
            w[C] < _ && (_ = w[C]);
          }), _;
        }
        V.exports = c.default;
      },
      "./src/util/observer.js": (V, c) => {
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = void 0;
        function k(R, O) {
          if (!(R instanceof O))
            throw new TypeError("Cannot call a class as a function");
        }
        function w(R, O) {
          for (var S = 0; S < O.length; S++) {
            var A = O[S];
            A.enumerable = A.enumerable || !1, A.configurable = !0, "value" in A && (A.writable = !0), Object.defineProperty(R, A.key, A);
          }
        }
        function _(R, O, S) {
          return O && w(R.prototype, O), S && w(R, S), Object.defineProperty(R, "prototype", { writable: !1 }), R;
        }
        var C = /* @__PURE__ */ function() {
          function R() {
            k(this, R), this._disabledEventEmissions = [], this.handlers = null;
          }
          return _(R, [{
            key: "on",
            value: function(S, A) {
              var p = this;
              this.handlers || (this.handlers = {});
              var v = this.handlers[S];
              return v || (v = this.handlers[S] = []), v.push(A), {
                name: S,
                callback: A,
                un: function(d, P) {
                  return p.un(d, P);
                }
              };
            }
          }, {
            key: "un",
            value: function(S, A) {
              if (!!this.handlers) {
                var p = this.handlers[S], v;
                if (p)
                  if (A)
                    for (v = p.length - 1; v >= 0; v--)
                      p[v] == A && p.splice(v, 1);
                  else
                    p.length = 0;
              }
            }
          }, {
            key: "unAll",
            value: function() {
              this.handlers = null;
            }
          }, {
            key: "once",
            value: function(S, A) {
              var p = this, v = function f() {
                for (var d = arguments.length, P = new Array(d), M = 0; M < d; M++)
                  P[M] = arguments[M];
                A.apply(p, P), setTimeout(function() {
                  p.un(S, f);
                }, 0);
              };
              return this.on(S, v);
            }
          }, {
            key: "setDisabledEventEmissions",
            value: function(S) {
              this._disabledEventEmissions = S;
            }
          }, {
            key: "_isDisabledEventEmission",
            value: function(S) {
              return this._disabledEventEmissions && this._disabledEventEmissions.includes(S);
            }
          }, {
            key: "fireEvent",
            value: function(S) {
              for (var A = arguments.length, p = new Array(A > 1 ? A - 1 : 0), v = 1; v < A; v++)
                p[v - 1] = arguments[v];
              if (!(!this.handlers || this._isDisabledEventEmission(S))) {
                var f = this.handlers[S];
                f && f.forEach(function(d) {
                  d.apply(void 0, p);
                });
              }
            }
          }]), R;
        }();
        c.default = C, V.exports = c.default;
      },
      "./src/util/orientation.js": (V, c) => {
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = C;
        var k = {
          width: "height",
          height: "width",
          overflowX: "overflowY",
          overflowY: "overflowX",
          clientWidth: "clientHeight",
          clientHeight: "clientWidth",
          clientX: "clientY",
          clientY: "clientX",
          scrollWidth: "scrollHeight",
          scrollLeft: "scrollTop",
          offsetLeft: "offsetTop",
          offsetTop: "offsetLeft",
          offsetHeight: "offsetWidth",
          offsetWidth: "offsetHeight",
          left: "top",
          right: "bottom",
          top: "left",
          bottom: "right",
          borderRightStyle: "borderBottomStyle",
          borderRightWidth: "borderBottomWidth",
          borderRightColor: "borderBottomColor"
        };
        function w(R, O) {
          return Object.prototype.hasOwnProperty.call(k, R) && O ? k[R] : R;
        }
        var _ = Symbol("isProxy");
        function C(R, O) {
          return R[_] ? R : new Proxy(R, {
            get: function(A, p, v) {
              if (p === _)
                return !0;
              if (p === "domElement")
                return A;
              if (p === "style")
                return C(A.style, O);
              if (p === "canvas")
                return C(A.canvas, O);
              if (p === "getBoundingClientRect")
                return function() {
                  return C(A.getBoundingClientRect.apply(A, arguments), O);
                };
              if (p === "getContext")
                return function() {
                  return C(A.getContext.apply(A, arguments), O);
                };
              var f = A[w(p, O)];
              return typeof f == "function" ? f.bind(A) : f;
            },
            set: function(A, p, v) {
              return A[w(p, O)] = v, !0;
            }
          });
        }
        V.exports = c.default;
      },
      "./src/util/prevent-click.js": (V, c) => {
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = w;
        function k(_) {
          _.stopPropagation(), document.body.removeEventListener("click", k, !0);
        }
        function w(_) {
          document.body.addEventListener("click", k, !0);
        }
        V.exports = c.default;
      },
      "./src/util/request-animation-frame.js": (V, c) => {
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = void 0;
        var k = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(w, _) {
          return setTimeout(w, 1e3 / 60);
        }).bind(window);
        c.default = k, V.exports = c.default;
      },
      "./src/util/silence-mode.js": (V, c) => {
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = k;
        function k() {
          var w = "data:audio/mpeg;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA//////////////////////////////////////////////////////////////////8AAABhTEFNRTMuMTAwA8MAAAAAAAAAABQgJAUHQQAB9AAAAnGMHkkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADgnABGiAAQBCqgCRMAAgEAH///////////////7+n/9FTuQsQH//////2NG0jWUGlio5gLQTOtIoeR2WX////X4s9Atb/JRVCbBUpeRUq//////////////////9RUi0f2jn/+xDECgPCjAEQAABN4AAANIAAAAQVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==", _ = document.createElement("div");
          _.innerHTML = '<audio x-webkit-airplay="deny"></audio>';
          var C = _.children.item(0);
          C.src = w, C.preload = "auto", C.type = "audio/mpeg", C.disableRemotePlayback = !0, C.play(), C.remove(), _.remove();
        }
        V.exports = c.default;
      },
      "./src/util/style.js": (V, c) => {
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = k;
        function k(w, _) {
          return Object.keys(_).forEach(function(C) {
            w.style[C] !== _[C] && (w.style[C] = _[C]);
          }), w;
        }
        V.exports = c.default;
      },
      "./src/wavesurfer.js": (V, c, k) => {
        function w(r) {
          return w = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
            return typeof t;
          } : function(t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
          }, w(r);
        }
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = void 0;
        var _ = f(k("./src/util/index.js")), C = p(k("./src/drawer.multicanvas.js")), R = p(k("./src/webaudio.js")), O = p(k("./src/mediaelement.js")), S = p(k("./src/peakcache.js")), A = p(k("./src/mediaelement-webaudio.js"));
        function p(r) {
          return r && r.__esModule ? r : { default: r };
        }
        function v(r) {
          if (typeof WeakMap != "function")
            return null;
          var t = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new WeakMap();
          return (v = function(e) {
            return e ? s : t;
          })(r);
        }
        function f(r, t) {
          if (!t && r && r.__esModule)
            return r;
          if (r === null || w(r) !== "object" && typeof r != "function")
            return { default: r };
          var s = v(t);
          if (s && s.has(r))
            return s.get(r);
          var i = {}, e = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var u in r)
            if (u !== "default" && Object.prototype.hasOwnProperty.call(r, u)) {
              var b = e ? Object.getOwnPropertyDescriptor(r, u) : null;
              b && (b.get || b.set) ? Object.defineProperty(i, u, b) : i[u] = r[u];
            }
          return i.default = r, s && s.set(r, i), i;
        }
        function d(r, t) {
          if (typeof t != "function" && t !== null)
            throw new TypeError("Super expression must either be null or a function");
          r.prototype = Object.create(t && t.prototype, { constructor: { value: r, writable: !0, configurable: !0 } }), Object.defineProperty(r, "prototype", { writable: !1 }), t && P(r, t);
        }
        function P(r, t) {
          return P = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(i, e) {
            return i.__proto__ = e, i;
          }, P(r, t);
        }
        function M(r) {
          var t = m();
          return function() {
            var i = h(r), e;
            if (t) {
              var u = h(this).constructor;
              e = Reflect.construct(i, arguments, u);
            } else
              e = i.apply(this, arguments);
            return g(this, e);
          };
        }
        function g(r, t) {
          if (t && (w(t) === "object" || typeof t == "function"))
            return t;
          if (t !== void 0)
            throw new TypeError("Derived constructors may only return object or undefined");
          return E(r);
        }
        function E(r) {
          if (r === void 0)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return r;
        }
        function m() {
          if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
            return !1;
          if (typeof Proxy == "function")
            return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), !0;
          } catch {
            return !1;
          }
        }
        function h(r) {
          return h = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(s) {
            return s.__proto__ || Object.getPrototypeOf(s);
          }, h(r);
        }
        function y(r, t, s) {
          return t in r ? Object.defineProperty(r, t, { value: s, enumerable: !0, configurable: !0, writable: !0 }) : r[t] = s, r;
        }
        function l(r, t) {
          if (!(r instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function n(r, t) {
          for (var s = 0; s < t.length; s++) {
            var i = t[s];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(r, i.key, i);
          }
        }
        function a(r, t, s) {
          return t && n(r.prototype, t), s && n(r, s), Object.defineProperty(r, "prototype", { writable: !1 }), r;
        }
        var o = /* @__PURE__ */ function(r) {
          d(s, r);
          var t = M(s);
          function s(i) {
            var e;
            if (l(this, s), e = t.call(this), y(E(e), "defaultParams", {
              audioContext: null,
              audioScriptProcessor: null,
              audioRate: 1,
              autoCenter: !0,
              autoCenterRate: 5,
              autoCenterImmediately: !1,
              backend: "WebAudio",
              backgroundColor: null,
              barHeight: 1,
              barRadius: 0,
              barGap: null,
              barMinHeight: null,
              container: null,
              cursorColor: "#333",
              cursorWidth: 1,
              dragSelection: !0,
              drawingContextAttributes: {
                desynchronized: !1
              },
              duration: null,
              fillParent: !0,
              forceDecode: !1,
              height: 128,
              hideScrollbar: !1,
              hideCursor: !1,
              ignoreSilenceMode: !1,
              interact: !0,
              loopSelection: !0,
              maxCanvasWidth: 4e3,
              mediaContainer: null,
              mediaControls: !1,
              mediaType: "audio",
              minPxPerSec: 20,
              normalize: !1,
              partialRender: !1,
              pixelRatio: window.devicePixelRatio || screen.deviceXDPI / screen.logicalXDPI,
              plugins: [],
              progressColor: "#555",
              removeMediaElementOnDestroy: !0,
              renderer: C.default,
              responsive: !1,
              rtl: !1,
              scrollParent: !1,
              skipLength: 2,
              splitChannels: !1,
              splitChannelsOptions: {
                overlay: !1,
                channelColors: {},
                filterChannels: [],
                relativeNormalization: !1,
                splitDragSelection: !1
              },
              vertical: !1,
              waveColor: "#999",
              xhr: {}
            }), y(E(e), "backends", {
              MediaElement: O.default,
              WebAudio: R.default,
              MediaElementWebAudio: A.default
            }), y(E(e), "util", _), e.params = Object.assign({}, e.defaultParams, i), e.params.splitChannelsOptions = Object.assign({}, e.defaultParams.splitChannelsOptions, i.splitChannelsOptions), e.container = typeof i.container == "string" ? document.querySelector(e.params.container) : e.params.container, !e.container)
              throw new Error("Container element not found");
            if (e.params.mediaContainer == null ? e.mediaContainer = e.container : typeof e.params.mediaContainer == "string" ? e.mediaContainer = document.querySelector(e.params.mediaContainer) : e.mediaContainer = e.params.mediaContainer, !e.mediaContainer)
              throw new Error("Media Container element not found");
            if (e.params.maxCanvasWidth <= 1)
              throw new Error("maxCanvasWidth must be greater than 1");
            if (e.params.maxCanvasWidth % 2 == 1)
              throw new Error("maxCanvasWidth must be an even number");
            if (e.params.rtl === !0 && (e.params.vertical === !0 ? _.style(e.container, {
              transform: "rotateX(180deg)"
            }) : _.style(e.container, {
              transform: "rotateY(180deg)"
            })), e.params.backgroundColor && e.setBackgroundColor(e.params.backgroundColor), e.savedVolume = 0, e.isMuted = !1, e.tmpEvents = [], e.currentRequest = null, e.arraybuffer = null, e.drawer = null, e.backend = null, e.peakCache = null, typeof e.params.renderer != "function")
              throw new Error("Renderer parameter is invalid");
            e.Drawer = e.params.renderer, e.params.backend == "AudioElement" && (e.params.backend = "MediaElement"), (e.params.backend == "WebAudio" || e.params.backend === "MediaElementWebAudio") && !R.default.prototype.supportsWebAudio.call(null) && (e.params.backend = "MediaElement"), e.Backend = e.backends[e.params.backend], e.initialisedPluginList = {}, e.isDestroyed = !1, e.isReady = !1;
            var u = 0;
            return e._onResize = _.debounce(function() {
              e.drawer.wrapper && u != e.drawer.wrapper.clientWidth && !e.params.scrollParent && (u = e.drawer.wrapper.clientWidth, u && e.drawer.fireEvent("redraw"));
            }, typeof e.params.responsive == "number" ? e.params.responsive : 100), g(e, E(e));
          }
          return a(s, [{
            key: "init",
            value: function() {
              return this.registerPlugins(this.params.plugins), this.createDrawer(), this.createBackend(), this.createPeakCache(), this;
            }
          }, {
            key: "registerPlugins",
            value: function(e) {
              var u = this;
              return e.forEach(function(b) {
                return u.addPlugin(b);
              }), e.forEach(function(b) {
                b.deferInit || u.initPlugin(b.name);
              }), this.fireEvent("plugins-registered", e), this;
            }
          }, {
            key: "getActivePlugins",
            value: function() {
              return this.initialisedPluginList;
            }
          }, {
            key: "addPlugin",
            value: function(e) {
              var u = this;
              if (!e.name)
                throw new Error("Plugin does not have a name!");
              if (!e.instance)
                throw new Error("Plugin ".concat(e.name, " does not have an instance property!"));
              e.staticProps && Object.keys(e.staticProps).forEach(function(T) {
                u[T] = e.staticProps[T];
              });
              var b = e.instance, x = Object.getOwnPropertyNames(_.Observer.prototype);
              return x.forEach(function(T) {
                b.prototype[T] = _.Observer.prototype[T];
              }), this[e.name] = new b(e.params || {}, this), this.fireEvent("plugin-added", e.name), this;
            }
          }, {
            key: "initPlugin",
            value: function(e) {
              if (!this[e])
                throw new Error("Plugin ".concat(e, " has not been added yet!"));
              return this.initialisedPluginList[e] && this.destroyPlugin(e), this[e].init(), this.initialisedPluginList[e] = !0, this.fireEvent("plugin-initialised", e), this;
            }
          }, {
            key: "destroyPlugin",
            value: function(e) {
              if (!this[e])
                throw new Error("Plugin ".concat(e, " has not been added yet and cannot be destroyed!"));
              if (!this.initialisedPluginList[e])
                throw new Error("Plugin ".concat(e, " is not active and cannot be destroyed!"));
              if (typeof this[e].destroy != "function")
                throw new Error("Plugin ".concat(e, " does not have a destroy function!"));
              return this[e].destroy(), delete this.initialisedPluginList[e], this.fireEvent("plugin-destroyed", e), this;
            }
          }, {
            key: "destroyAllPlugins",
            value: function() {
              var e = this;
              Object.keys(this.initialisedPluginList).forEach(function(u) {
                return e.destroyPlugin(u);
              });
            }
          }, {
            key: "createDrawer",
            value: function() {
              var e = this;
              this.drawer = new this.Drawer(this.container, this.params), this.drawer.init(), this.fireEvent("drawer-created", this.drawer), this.params.responsive !== !1 && (window.addEventListener("resize", this._onResize, !0), window.addEventListener("orientationchange", this._onResize, !0)), this.drawer.on("redraw", function() {
                e.drawBuffer(), e.drawer.progress(e.backend.getPlayedPercents());
              }), this.drawer.on("click", function(u, b) {
                setTimeout(function() {
                  return e.seekTo(b);
                }, 0);
              }), this.drawer.on("scroll", function(u) {
                e.params.partialRender && e.drawBuffer(), e.fireEvent("scroll", u);
              });
            }
          }, {
            key: "createBackend",
            value: function() {
              var e = this;
              this.backend && this.backend.destroy(), this.backend = new this.Backend(this.params), this.backend.init(), this.fireEvent("backend-created", this.backend), this.backend.on("finish", function() {
                e.drawer.progress(e.backend.getPlayedPercents()), e.fireEvent("finish");
              }), this.backend.on("play", function() {
                return e.fireEvent("play");
              }), this.backend.on("pause", function() {
                return e.fireEvent("pause");
              }), this.backend.on("audioprocess", function(u) {
                e.drawer.progress(e.backend.getPlayedPercents()), e.fireEvent("audioprocess", u);
              }), (this.params.backend === "MediaElement" || this.params.backend === "MediaElementWebAudio") && (this.backend.on("seek", function() {
                e.drawer.progress(e.backend.getPlayedPercents());
              }), this.backend.on("volume", function() {
                var u = e.getVolume();
                e.fireEvent("volume", u), e.backend.isMuted !== e.isMuted && (e.isMuted = e.backend.isMuted, e.fireEvent("mute", e.isMuted));
              }));
            }
          }, {
            key: "createPeakCache",
            value: function() {
              this.params.partialRender && (this.peakCache = new S.default());
            }
          }, {
            key: "getDuration",
            value: function() {
              return this.backend.getDuration();
            }
          }, {
            key: "getCurrentTime",
            value: function() {
              return this.backend.getCurrentTime();
            }
          }, {
            key: "setCurrentTime",
            value: function(e) {
              e >= this.getDuration() ? this.seekTo(1) : this.seekTo(e / this.getDuration());
            }
          }, {
            key: "play",
            value: function(e, u) {
              var b = this;
              return this.params.ignoreSilenceMode && _.ignoreSilenceMode(), this.fireEvent("interaction", function() {
                return b.play(e, u);
              }), this.backend.play(e, u);
            }
          }, {
            key: "setPlayEnd",
            value: function(e) {
              this.backend.setPlayEnd(e);
            }
          }, {
            key: "pause",
            value: function() {
              if (!this.backend.isPaused())
                return this.backend.pause();
            }
          }, {
            key: "playPause",
            value: function() {
              return this.backend.isPaused() ? this.play() : this.pause();
            }
          }, {
            key: "isPlaying",
            value: function() {
              return !this.backend.isPaused();
            }
          }, {
            key: "skipBackward",
            value: function(e) {
              this.skip(-e || -this.params.skipLength);
            }
          }, {
            key: "skipForward",
            value: function(e) {
              this.skip(e || this.params.skipLength);
            }
          }, {
            key: "skip",
            value: function(e) {
              var u = this.getDuration() || 1, b = this.getCurrentTime() || 0;
              b = Math.max(0, Math.min(u, b + (e || 0))), this.seekAndCenter(b / u);
            }
          }, {
            key: "seekAndCenter",
            value: function(e) {
              this.seekTo(e), this.drawer.recenter(e);
            }
          }, {
            key: "seekTo",
            value: function(e) {
              var u = this;
              if (typeof e != "number" || !isFinite(e) || e < 0 || e > 1)
                throw new Error("Error calling wavesurfer.seekTo, parameter must be a number between 0 and 1!");
              this.fireEvent("interaction", function() {
                return u.seekTo(e);
              });
              var b = this.params.backend === "WebAudio", x = this.backend.isPaused();
              b && !x && this.backend.pause();
              var T = this.params.scrollParent;
              this.params.scrollParent = !1, this.backend.seekTo(e * this.getDuration()), this.drawer.progress(e), b && !x && this.backend.play(), this.params.scrollParent = T, this.fireEvent("seek", e);
            }
          }, {
            key: "stop",
            value: function() {
              this.pause(), this.seekTo(0), this.drawer.progress(0);
            }
          }, {
            key: "setSinkId",
            value: function(e) {
              return this.backend.setSinkId(e);
            }
          }, {
            key: "setVolume",
            value: function(e) {
              this.backend.setVolume(e), this.fireEvent("volume", e);
            }
          }, {
            key: "getVolume",
            value: function() {
              return this.backend.getVolume();
            }
          }, {
            key: "setPlaybackRate",
            value: function(e) {
              this.backend.setPlaybackRate(e);
            }
          }, {
            key: "getPlaybackRate",
            value: function() {
              return this.backend.getPlaybackRate();
            }
          }, {
            key: "toggleMute",
            value: function() {
              this.setMute(!this.isMuted);
            }
          }, {
            key: "setMute",
            value: function(e) {
              if (e === this.isMuted) {
                this.fireEvent("mute", this.isMuted);
                return;
              }
              this.backend.setMute ? (this.backend.setMute(e), this.isMuted = e) : e ? (this.savedVolume = this.backend.getVolume(), this.backend.setVolume(0), this.isMuted = !0, this.fireEvent("volume", 0)) : (this.backend.setVolume(this.savedVolume), this.isMuted = !1, this.fireEvent("volume", this.savedVolume)), this.fireEvent("mute", this.isMuted);
            }
          }, {
            key: "getMute",
            value: function() {
              return this.isMuted;
            }
          }, {
            key: "getFilters",
            value: function() {
              return this.backend.filters || [];
            }
          }, {
            key: "toggleScroll",
            value: function() {
              this.params.scrollParent = !this.params.scrollParent, this.drawBuffer();
            }
          }, {
            key: "toggleInteraction",
            value: function() {
              this.params.interact = !this.params.interact;
            }
          }, {
            key: "getWaveColor",
            value: function() {
              var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
              return this.params.splitChannelsOptions.channelColors[e] ? this.params.splitChannelsOptions.channelColors[e].waveColor : this.params.waveColor;
            }
          }, {
            key: "setWaveColor",
            value: function(e) {
              var u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
              this.params.splitChannelsOptions.channelColors[u] ? this.params.splitChannelsOptions.channelColors[u].waveColor = e : this.params.waveColor = e, this.drawBuffer();
            }
          }, {
            key: "getProgressColor",
            value: function() {
              var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
              return this.params.splitChannelsOptions.channelColors[e] ? this.params.splitChannelsOptions.channelColors[e].progressColor : this.params.progressColor;
            }
          }, {
            key: "setProgressColor",
            value: function(e, u) {
              this.params.splitChannelsOptions.channelColors[u] ? this.params.splitChannelsOptions.channelColors[u].progressColor = e : this.params.progressColor = e, this.drawBuffer();
            }
          }, {
            key: "getBackgroundColor",
            value: function() {
              return this.params.backgroundColor;
            }
          }, {
            key: "setBackgroundColor",
            value: function(e) {
              this.params.backgroundColor = e, _.style(this.container, {
                background: this.params.backgroundColor
              });
            }
          }, {
            key: "getCursorColor",
            value: function() {
              return this.params.cursorColor;
            }
          }, {
            key: "setCursorColor",
            value: function(e) {
              this.params.cursorColor = e, this.drawer.updateCursor();
            }
          }, {
            key: "getHeight",
            value: function() {
              return this.params.height;
            }
          }, {
            key: "setHeight",
            value: function(e) {
              this.params.height = e, this.drawer.setHeight(e * this.params.pixelRatio), this.drawBuffer();
            }
          }, {
            key: "setFilteredChannels",
            value: function(e) {
              this.params.splitChannelsOptions.filterChannels = e, this.drawBuffer();
            }
          }, {
            key: "drawBuffer",
            value: function() {
              var e = Math.round(this.getDuration() * this.params.minPxPerSec * this.params.pixelRatio), u = this.drawer.getWidth(), b = e, x = 0, T = Math.max(x + u, b);
              this.params.fillParent && (!this.params.scrollParent || e < u) && (b = u, x = 0, T = b);
              var D;
              if (this.params.partialRender) {
                var j = this.peakCache.addRangeToPeakCache(b, x, T), W;
                for (W = 0; W < j.length; W++)
                  D = this.backend.getPeaks(b, j[W][0], j[W][1]), this.drawer.drawPeaks(D, b, j[W][0], j[W][1]);
              } else
                D = this.backend.getPeaks(b, x, T), this.drawer.drawPeaks(D, b, x, T);
              this.fireEvent("redraw", D, b);
            }
          }, {
            key: "zoom",
            value: function(e) {
              e ? (this.params.minPxPerSec = e, this.params.scrollParent = !0) : (this.params.minPxPerSec = this.defaultParams.minPxPerSec, this.params.scrollParent = !1), this.drawBuffer(), this.drawer.progress(this.backend.getPlayedPercents()), this.drawer.recenter(this.getCurrentTime() / this.getDuration()), this.fireEvent("zoom", e);
            }
          }, {
            key: "loadArrayBuffer",
            value: function(e) {
              var u = this;
              this.decodeArrayBuffer(e, function(b) {
                u.isDestroyed || u.loadDecodedBuffer(b);
              });
            }
          }, {
            key: "loadDecodedBuffer",
            value: function(e) {
              this.backend.load(e), this.drawBuffer(), this.isReady = !0, this.fireEvent("ready");
            }
          }, {
            key: "loadBlob",
            value: function(e) {
              var u = this, b = new FileReader();
              b.addEventListener("progress", function(x) {
                return u.onProgress(x);
              }), b.addEventListener("load", function(x) {
                return u.loadArrayBuffer(x.target.result);
              }), b.addEventListener("error", function() {
                return u.fireEvent("error", "Error reading file");
              }), b.readAsArrayBuffer(e), this.empty();
            }
          }, {
            key: "load",
            value: function(e, u, b, x) {
              if (!e)
                throw new Error("url parameter cannot be empty");
              if (this.empty(), b) {
                var T = {
                  "Preload is not 'auto', 'none' or 'metadata'": ["auto", "metadata", "none"].indexOf(b) === -1,
                  "Peaks are not provided": !u,
                  "Backend is not of type 'MediaElement' or 'MediaElementWebAudio'": ["MediaElement", "MediaElementWebAudio"].indexOf(this.params.backend) === -1,
                  "Url is not of type string": typeof e != "string"
                }, D = Object.keys(T).filter(function(j) {
                  return T[j];
                });
                D.length && (console.warn(`Preload parameter of wavesurfer.load will be ignored because:
	- ` + D.join(`
	- `)), b = null);
              }
              switch (this.params.backend === "WebAudio" && e instanceof HTMLMediaElement && (e = e.src), this.params.backend) {
                case "WebAudio":
                  return this.loadBuffer(e, u, x);
                case "MediaElement":
                case "MediaElementWebAudio":
                  return this.loadMediaElement(e, u, b, x);
              }
            }
          }, {
            key: "loadBuffer",
            value: function(e, u, b) {
              var x = this, T = function(j) {
                return j && x.tmpEvents.push(x.once("ready", j)), x.getArrayBuffer(e, function(W) {
                  return x.loadArrayBuffer(W);
                });
              };
              if (u)
                this.backend.setPeaks(u, b), this.drawBuffer(), this.fireEvent("waveform-ready"), this.tmpEvents.push(this.once("interaction", T));
              else
                return T();
            }
          }, {
            key: "loadMediaElement",
            value: function(e, u, b, x) {
              var T = this, D = e;
              if (typeof e == "string")
                this.backend.load(D, this.mediaContainer, u, b);
              else {
                var j = e;
                this.backend.loadElt(j, u), D = j.src;
              }
              this.tmpEvents.push(this.backend.once("canplay", function() {
                T.backend.destroyed || (T.drawBuffer(), T.isReady = !0, T.fireEvent("ready"));
              }), this.backend.once("error", function(W) {
                return T.fireEvent("error", W);
              })), u && (this.backend.setPeaks(u, x), this.drawBuffer(), this.fireEvent("waveform-ready")), (!u || this.params.forceDecode) && this.backend.supportsWebAudio() && this.getArrayBuffer(D, function(W) {
                T.decodeArrayBuffer(W, function(L) {
                  T.backend.buffer = L, T.backend.setPeaks(null), T.drawBuffer(), T.fireEvent("waveform-ready");
                });
              });
            }
          }, {
            key: "decodeArrayBuffer",
            value: function(e, u) {
              var b = this;
              this.isDestroyed || (this.arraybuffer = e, this.backend.decodeArrayBuffer(e, function(x) {
                !b.isDestroyed && b.arraybuffer == e && (u(x), b.arraybuffer = null);
              }, function() {
                return b.fireEvent("error", "Error decoding audiobuffer");
              }));
            }
          }, {
            key: "getArrayBuffer",
            value: function(e, u) {
              var b = this, x = Object.assign({
                url: e,
                responseType: "arraybuffer"
              }, this.params.xhr), T = _.fetchFile(x);
              return this.currentRequest = T, this.tmpEvents.push(T.on("progress", function(D) {
                b.onProgress(D);
              }), T.on("success", function(D) {
                u(D), b.currentRequest = null;
              }), T.on("error", function(D) {
                b.fireEvent("error", D), b.currentRequest = null;
              })), T;
            }
          }, {
            key: "onProgress",
            value: function(e) {
              var u;
              e.lengthComputable ? u = e.loaded / e.total : u = e.loaded / (e.loaded + 1e6), this.fireEvent("loading", Math.round(u * 100), e.target);
            }
          }, {
            key: "exportPCM",
            value: function(e, u, b, x, T) {
              e = e || 1024, x = x || 0, u = u || 1e4, b = b || !1;
              var D = this.backend.getPeaks(e, x, T), j = [].map.call(D, function(W) {
                return Math.round(W * u) / u;
              });
              return new Promise(function(W, L) {
                if (!b) {
                  var N = new Blob([JSON.stringify(j)], {
                    type: "application/json;charset=utf-8"
                  }), B = URL.createObjectURL(N);
                  window.open(B), URL.revokeObjectURL(B);
                }
                W(j);
              });
            }
          }, {
            key: "exportImage",
            value: function(e, u, b) {
              return e || (e = "image/png"), u || (u = 1), b || (b = "dataURL"), this.drawer.getImage(e, u, b);
            }
          }, {
            key: "cancelAjax",
            value: function() {
              this.currentRequest && this.currentRequest.controller && (this.currentRequest._reader && this.currentRequest._reader.cancel().catch(function(e) {
              }), this.currentRequest.controller.abort(), this.currentRequest = null);
            }
          }, {
            key: "clearTmpEvents",
            value: function() {
              this.tmpEvents.forEach(function(e) {
                return e.un();
              });
            }
          }, {
            key: "empty",
            value: function() {
              this.backend.isPaused() || (this.stop(), this.backend.disconnectSource()), this.isReady = !1, this.cancelAjax(), this.clearTmpEvents(), this.drawer.progress(0), this.drawer.setWidth(0), this.drawer.drawPeaks({
                length: this.drawer.getWidth()
              }, 0);
            }
          }, {
            key: "destroy",
            value: function() {
              this.destroyAllPlugins(), this.fireEvent("destroy"), this.cancelAjax(), this.clearTmpEvents(), this.unAll(), this.params.responsive !== !1 && (window.removeEventListener("resize", this._onResize, !0), window.removeEventListener("orientationchange", this._onResize, !0)), this.backend && (this.backend.destroy(), this.backend = null), this.drawer && this.drawer.destroy(), this.isDestroyed = !0, this.isReady = !1, this.arraybuffer = null;
            }
          }], [{
            key: "create",
            value: function(e) {
              var u = new s(e);
              return u.init();
            }
          }]), s;
        }(_.Observer);
        c.default = o, y(o, "VERSION", "6.4.0"), y(o, "util", _), V.exports = c.default;
      },
      "./src/webaudio.js": (V, c, k) => {
        function w(n) {
          return w = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(a) {
            return typeof a;
          } : function(a) {
            return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
          }, w(n);
        }
        Object.defineProperty(c, "__esModule", {
          value: !0
        }), c.default = void 0;
        var _ = R(k("./src/util/index.js"));
        function C(n) {
          if (typeof WeakMap != "function")
            return null;
          var a = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap();
          return (C = function(t) {
            return t ? o : a;
          })(n);
        }
        function R(n, a) {
          if (!a && n && n.__esModule)
            return n;
          if (n === null || w(n) !== "object" && typeof n != "function")
            return { default: n };
          var o = C(a);
          if (o && o.has(n))
            return o.get(n);
          var r = {}, t = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var s in n)
            if (s !== "default" && Object.prototype.hasOwnProperty.call(n, s)) {
              var i = t ? Object.getOwnPropertyDescriptor(n, s) : null;
              i && (i.get || i.set) ? Object.defineProperty(r, s, i) : r[s] = n[s];
            }
          return r.default = n, o && o.set(n, r), r;
        }
        function O(n, a) {
          if (!(n instanceof a))
            throw new TypeError("Cannot call a class as a function");
        }
        function S(n, a) {
          for (var o = 0; o < a.length; o++) {
            var r = a[o];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(n, r.key, r);
          }
        }
        function A(n, a, o) {
          return a && S(n.prototype, a), o && S(n, o), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        }
        function p(n, a) {
          if (typeof a != "function" && a !== null)
            throw new TypeError("Super expression must either be null or a function");
          n.prototype = Object.create(a && a.prototype, { constructor: { value: n, writable: !0, configurable: !0 } }), Object.defineProperty(n, "prototype", { writable: !1 }), a && v(n, a);
        }
        function v(n, a) {
          return v = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, t) {
            return r.__proto__ = t, r;
          }, v(n, a);
        }
        function f(n) {
          var a = M();
          return function() {
            var r = g(n), t;
            if (a) {
              var s = g(this).constructor;
              t = Reflect.construct(r, arguments, s);
            } else
              t = r.apply(this, arguments);
            return d(this, t);
          };
        }
        function d(n, a) {
          if (a && (w(a) === "object" || typeof a == "function"))
            return a;
          if (a !== void 0)
            throw new TypeError("Derived constructors may only return object or undefined");
          return P(n);
        }
        function P(n) {
          if (n === void 0)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return n;
        }
        function M() {
          if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
            return !1;
          if (typeof Proxy == "function")
            return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), !0;
          } catch {
            return !1;
          }
        }
        function g(n) {
          return g = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          }, g(n);
        }
        function E(n, a, o) {
          return a in n ? Object.defineProperty(n, a, { value: o, enumerable: !0, configurable: !0, writable: !0 }) : n[a] = o, n;
        }
        var m = "playing", h = "paused", y = "finished", l = /* @__PURE__ */ function(n) {
          p(o, n);
          var a = f(o);
          function o(r) {
            var t, s, i;
            return O(this, o), i = a.call(this), E(P(i), "audioContext", null), E(P(i), "offlineAudioContext", null), E(P(i), "stateBehaviors", (t = {}, E(t, m, {
              init: function() {
                this.addOnAudioProcess();
              },
              getPlayedPercents: function() {
                var u = this.getDuration();
                return this.getCurrentTime() / u || 0;
              },
              getCurrentTime: function() {
                return this.startPosition + this.getPlayedTime();
              }
            }), E(t, h, {
              init: function() {
                this.removeOnAudioProcess();
              },
              getPlayedPercents: function() {
                var u = this.getDuration();
                return this.getCurrentTime() / u || 0;
              },
              getCurrentTime: function() {
                return this.startPosition;
              }
            }), E(t, y, {
              init: function() {
                this.removeOnAudioProcess(), this.fireEvent("finish");
              },
              getPlayedPercents: function() {
                return 1;
              },
              getCurrentTime: function() {
                return this.getDuration();
              }
            }), t)), i.params = r, i.ac = r.audioContext || (i.supportsWebAudio() ? i.getAudioContext() : {}), i.lastPlay = i.ac.currentTime, i.startPosition = 0, i.scheduledPause = null, i.states = (s = {}, E(s, m, Object.create(i.stateBehaviors[m])), E(s, h, Object.create(i.stateBehaviors[h])), E(s, y, Object.create(i.stateBehaviors[y])), s), i.buffer = null, i.filters = [], i.gainNode = null, i.mergedPeaks = null, i.offlineAc = null, i.peaks = null, i.playbackRate = 1, i.analyser = null, i.scriptNode = null, i.source = null, i.splitPeaks = [], i.state = null, i.explicitDuration = r.duration, i.sinkStreamDestination = null, i.sinkAudioElement = null, i.destroyed = !1, i;
          }
          return A(o, [{
            key: "supportsWebAudio",
            value: function() {
              return !!(window.AudioContext || window.webkitAudioContext);
            }
          }, {
            key: "getAudioContext",
            value: function() {
              return window.WaveSurferAudioContext || (window.WaveSurferAudioContext = new (window.AudioContext || window.webkitAudioContext)()), window.WaveSurferAudioContext;
            }
          }, {
            key: "getOfflineAudioContext",
            value: function(t) {
              return window.WaveSurferOfflineAudioContext || (window.WaveSurferOfflineAudioContext = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 2, t)), window.WaveSurferOfflineAudioContext;
            }
          }, {
            key: "init",
            value: function() {
              this.createVolumeNode(), this.createScriptNode(), this.createAnalyserNode(), this.setState(h), this.setPlaybackRate(this.params.audioRate), this.setLength(0);
            }
          }, {
            key: "disconnectFilters",
            value: function() {
              this.filters && (this.filters.forEach(function(t) {
                t && t.disconnect();
              }), this.filters = null, this.analyser.connect(this.gainNode));
            }
          }, {
            key: "setState",
            value: function(t) {
              this.state !== this.states[t] && (this.state = this.states[t], this.state.init.call(this));
            }
          }, {
            key: "setFilter",
            value: function() {
              for (var t = arguments.length, s = new Array(t), i = 0; i < t; i++)
                s[i] = arguments[i];
              this.setFilters(s);
            }
          }, {
            key: "setFilters",
            value: function(t) {
              this.disconnectFilters(), t && t.length && (this.filters = t, this.analyser.disconnect(), t.reduce(function(s, i) {
                return s.connect(i), i;
              }, this.analyser).connect(this.gainNode));
            }
          }, {
            key: "createScriptNode",
            value: function() {
              this.params.audioScriptProcessor ? this.scriptNode = this.params.audioScriptProcessor : this.ac.createScriptProcessor ? this.scriptNode = this.ac.createScriptProcessor(o.scriptBufferSize) : this.scriptNode = this.ac.createJavaScriptNode(o.scriptBufferSize), this.scriptNode.connect(this.ac.destination);
            }
          }, {
            key: "addOnAudioProcess",
            value: function() {
              var t = this;
              this.scriptNode.onaudioprocess = function() {
                var s = t.getCurrentTime();
                s >= t.getDuration() ? (t.setState(y), t.fireEvent("pause")) : s >= t.scheduledPause ? t.pause() : t.state === t.states[m] && t.fireEvent("audioprocess", s);
              };
            }
          }, {
            key: "removeOnAudioProcess",
            value: function() {
              this.scriptNode.onaudioprocess = null;
            }
          }, {
            key: "createAnalyserNode",
            value: function() {
              this.analyser = this.ac.createAnalyser(), this.analyser.connect(this.gainNode);
            }
          }, {
            key: "createVolumeNode",
            value: function() {
              this.ac.createGain ? this.gainNode = this.ac.createGain() : this.gainNode = this.ac.createGainNode(), this.gainNode.connect(this.ac.destination);
            }
          }, {
            key: "setSinkId",
            value: function(t) {
              return t ? (this.sinkAudioElement || (this.sinkAudioElement = new window.Audio(), this.sinkAudioElement.autoplay = !0), this.sinkAudioElement.setSinkId ? (this.sinkStreamDestination || (this.sinkStreamDestination = this.ac.createMediaStreamDestination()), this.gainNode.disconnect(), this.gainNode.connect(this.sinkStreamDestination), this.sinkAudioElement.srcObject = this.sinkStreamDestination.stream, this.sinkAudioElement.setSinkId(t)) : Promise.reject(new Error("setSinkId is not supported in your browser"))) : Promise.reject(new Error("Invalid deviceId: " + t));
            }
          }, {
            key: "setVolume",
            value: function(t) {
              this.gainNode.gain.setValueAtTime(t, this.ac.currentTime);
            }
          }, {
            key: "getVolume",
            value: function() {
              return this.gainNode.gain.value;
            }
          }, {
            key: "decodeArrayBuffer",
            value: function(t, s, i) {
              this.offlineAc || (this.offlineAc = this.getOfflineAudioContext(this.ac && this.ac.sampleRate ? this.ac.sampleRate : 44100)), "webkitAudioContext" in window ? this.offlineAc.decodeAudioData(t, function(e) {
                return s(e);
              }, i) : this.offlineAc.decodeAudioData(t).then(function(e) {
                return s(e);
              }).catch(function(e) {
                return i(e);
              });
            }
          }, {
            key: "setPeaks",
            value: function(t, s) {
              s != null && (this.explicitDuration = s), this.peaks = t;
            }
          }, {
            key: "setLength",
            value: function(t) {
              if (!(this.mergedPeaks && t == 2 * this.mergedPeaks.length - 1 + 2)) {
                this.splitPeaks = [], this.mergedPeaks = [];
                var s = this.buffer ? this.buffer.numberOfChannels : 1, i;
                for (i = 0; i < s; i++)
                  this.splitPeaks[i] = [], this.splitPeaks[i][2 * (t - 1)] = 0, this.splitPeaks[i][2 * (t - 1) + 1] = 0;
                this.mergedPeaks[2 * (t - 1)] = 0, this.mergedPeaks[2 * (t - 1) + 1] = 0;
              }
            }
          }, {
            key: "getPeaks",
            value: function(t, s, i) {
              if (this.peaks)
                return this.peaks;
              if (!this.buffer)
                return [];
              if (s = s || 0, i = i || t - 1, this.setLength(t), !this.buffer)
                return this.params.splitChannels ? this.splitPeaks : this.mergedPeaks;
              if (!this.buffer.length) {
                var e = this.createBuffer(1, 4096, this.sampleRate);
                this.buffer = e.buffer;
              }
              var u = this.buffer.length / t, b = ~~(u / 10) || 1, x = this.buffer.numberOfChannels, T;
              for (T = 0; T < x; T++) {
                var D = this.splitPeaks[T], j = this.buffer.getChannelData(T), W = void 0;
                for (W = s; W <= i; W++) {
                  var L = ~~(W * u), N = ~~(L + u), B = j[L], q = B, I = void 0;
                  for (I = L; I < N; I += b) {
                    var F = j[I];
                    F > q && (q = F), F < B && (B = F);
                  }
                  D[2 * W] = q, D[2 * W + 1] = B, (T == 0 || q > this.mergedPeaks[2 * W]) && (this.mergedPeaks[2 * W] = q), (T == 0 || B < this.mergedPeaks[2 * W + 1]) && (this.mergedPeaks[2 * W + 1] = B);
                }
              }
              return this.params.splitChannels ? this.splitPeaks : this.mergedPeaks;
            }
          }, {
            key: "getPlayedPercents",
            value: function() {
              return this.state.getPlayedPercents.call(this);
            }
          }, {
            key: "disconnectSource",
            value: function() {
              this.source && this.source.disconnect();
            }
          }, {
            key: "destroyWebAudio",
            value: function() {
              this.disconnectFilters(), this.disconnectSource(), this.gainNode.disconnect(), this.scriptNode.disconnect(), this.analyser.disconnect(), this.params.closeAudioContext && (typeof this.ac.close == "function" && this.ac.state != "closed" && this.ac.close(), this.ac = null, this.params.audioContext ? this.params.audioContext = null : window.WaveSurferAudioContext = null, window.WaveSurferOfflineAudioContext = null), this.sinkStreamDestination && (this.sinkAudioElement.pause(), this.sinkAudioElement.srcObject = null, this.sinkStreamDestination.disconnect(), this.sinkStreamDestination = null);
            }
          }, {
            key: "destroy",
            value: function() {
              this.isPaused() || this.pause(), this.unAll(), this.buffer = null, this.destroyed = !0, this.destroyWebAudio();
            }
          }, {
            key: "load",
            value: function(t) {
              this.startPosition = 0, this.lastPlay = this.ac.currentTime, this.buffer = t, this.createSource();
            }
          }, {
            key: "createSource",
            value: function() {
              this.disconnectSource(), this.source = this.ac.createBufferSource(), this.source.start = this.source.start || this.source.noteGrainOn, this.source.stop = this.source.stop || this.source.noteOff, this.setPlaybackRate(this.playbackRate), this.source.buffer = this.buffer, this.source.connect(this.analyser);
            }
          }, {
            key: "resumeAudioContext",
            value: function() {
              this.ac.state == "suspended" && this.ac.resume && this.ac.resume();
            }
          }, {
            key: "isPaused",
            value: function() {
              return this.state !== this.states[m];
            }
          }, {
            key: "getDuration",
            value: function() {
              return this.explicitDuration ? this.explicitDuration : this.buffer ? this.buffer.duration : 0;
            }
          }, {
            key: "seekTo",
            value: function(t, s) {
              if (!!this.buffer)
                return this.scheduledPause = null, t == null && (t = this.getCurrentTime(), t >= this.getDuration() && (t = 0)), s == null && (s = this.getDuration()), this.startPosition = t, this.lastPlay = this.ac.currentTime, this.state === this.states[y] && this.setState(h), {
                  start: t,
                  end: s
                };
            }
          }, {
            key: "getPlayedTime",
            value: function() {
              return (this.ac.currentTime - this.lastPlay) * this.playbackRate;
            }
          }, {
            key: "play",
            value: function(t, s) {
              if (!!this.buffer) {
                this.createSource();
                var i = this.seekTo(t, s);
                t = i.start, s = i.end, this.scheduledPause = s, this.source.start(0, t), this.resumeAudioContext(), this.setState(m), this.fireEvent("play");
              }
            }
          }, {
            key: "pause",
            value: function() {
              this.scheduledPause = null, this.startPosition += this.getPlayedTime();
              try {
                this.source && this.source.stop(0);
              } catch {
              }
              this.setState(h), this.fireEvent("pause");
            }
          }, {
            key: "getCurrentTime",
            value: function() {
              return this.state.getCurrentTime.call(this);
            }
          }, {
            key: "getPlaybackRate",
            value: function() {
              return this.playbackRate;
            }
          }, {
            key: "setPlaybackRate",
            value: function(t) {
              this.playbackRate = t || 1, this.source && this.source.playbackRate.setValueAtTime(this.playbackRate, this.ac.currentTime);
            }
          }, {
            key: "setPlayEnd",
            value: function(t) {
              this.scheduledPause = t;
            }
          }]), o;
        }(_.Observer);
        c.default = l, E(l, "scriptBufferSize", 256), V.exports = c.default;
      },
      "./node_modules/debounce/index.js": (V) => {
        function c(k, w, _) {
          var C, R, O, S, A;
          w == null && (w = 100);
          function p() {
            var f = Date.now() - S;
            f < w && f >= 0 ? C = setTimeout(p, w - f) : (C = null, _ || (A = k.apply(O, R), O = R = null));
          }
          var v = function() {
            O = this, R = arguments, S = Date.now();
            var f = _ && !C;
            return C || (C = setTimeout(p, w)), f && (A = k.apply(O, R), O = R = null), A;
          };
          return v.clear = function() {
            C && (clearTimeout(C), C = null);
          }, v.flush = function() {
            C && (A = k.apply(O, R), O = R = null, clearTimeout(C), C = null);
          }, v;
        }
        c.debounce = c, V.exports = c;
      }
    }, z = {};
    function H(V) {
      var c = z[V];
      if (c !== void 0)
        return c.exports;
      var k = z[V] = {
        exports: {}
      };
      return G[V](k, k.exports, H), k.exports;
    }
    var X = H("./src/wavesurfer.js");
    return X;
  })());
})(Z);
const se = /* @__PURE__ */ ie(Z.exports), ue = /* @__PURE__ */ ae({
  __proto__: null,
  default: se
}, [Z.exports]);
export {
  ue as w
};
