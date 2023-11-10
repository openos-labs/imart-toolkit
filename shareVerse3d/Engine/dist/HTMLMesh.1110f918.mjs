import { m as D, aN as P, aO as k, a6 as H, aP as U, aQ as X, aR as y, aS as A, a1 as _, e as z } from "./index.60bcd3b0.mjs";
import "react";
import "react-dom";
class j extends D {
  constructor(p) {
    const a = new B(p), l = new P(
      a.image.width * k,
      a.image.height * k
    ), h = new H({
      map: a,
      toneMapped: !1,
      transparent: !0
    });
    super(l, h);
    function d(w) {
      h.map.dispatchDOMEvent(w);
    }
    this.addEventListener("mousedown", d), this.addEventListener("mousemove", d), this.addEventListener("mouseup", d), this.addEventListener("click", d), this.dispose = function() {
      l.dispose(), h.dispose(), h.map.dispose(), this.removeEventListener("mousedown", d), this.removeEventListener("mousemove", d), this.removeEventListener("mouseup", d), this.removeEventListener("click", d);
    }, this.update = () => a.update();
  }
}
class J extends U {
  constructor(p) {
    const a = new B(p), l = new X({
      map: a,
      toneMapped: !1,
      transparent: !0
    });
    super(l), this.scale.set(
      a.image.width * k,
      a.image.height * k,
      0
    );
    function h(d) {
      l.map.dispatchDOMEvent(d);
    }
    this.addEventListener("mousedown", h), this.addEventListener("mousemove", h), this.addEventListener("mouseup", h), this.addEventListener("click", h), this.dispose = function() {
      l.dispose(), l.map.dispose(), this.removeEventListener("mousedown", h), this.removeEventListener("mousemove", h), this.removeEventListener("mouseup", h), this.removeEventListener("click", h);
    }, this.update = () => a.update();
  }
}
class B extends y {
  constructor(p) {
    super(R(p)), this.dom = p, this.anisotropy = 16, this.minFilter = A, this.magFilter = _;
    const a = new MutationObserver(() => {
      this.scheduleUpdate || (this.scheduleUpdate = setTimeout(() => this.update(), 16));
    }), l = {
      attributes: !0,
      childList: !0,
      subtree: !0,
      characterData: !0
    };
    a.observe(p, l), this.observer = a;
  }
  dispatchDOMEvent(p) {
    p.data && Y(this.dom, p.type, p.data.x, p.data.y);
  }
  update() {
    this.image = R(this.dom), this.needsUpdate = !0, this.scheduleUpdate = null;
  }
  dispose() {
    this.observer && this.observer.disconnect(), this.scheduleUpdate = clearTimeout(this.scheduleUpdate), super.dispose();
  }
}
const F = /* @__PURE__ */ new WeakMap();
function R(u) {
  const p = document.createRange(), a = new z();
  function l(e) {
    const o = [];
    let i = !1;
    function n() {
      if (i && (i = !1, e.restore()), o.length === 0)
        return;
      let r = -1 / 0, s = -1 / 0, T = 1 / 0, c = 1 / 0;
      for (let b = 0; b < o.length; b++) {
        const E = o[b];
        r = Math.max(r, E.x), s = Math.max(s, E.y), T = Math.min(T, E.x + E.width), c = Math.min(c, E.y + E.height);
      }
      e.save(), e.beginPath(), e.rect(r, s, T - r, c - s), e.clip(), i = !0;
    }
    return {
      add: function(r) {
        o.push(r), n();
      },
      remove: function() {
        o.pop(), n();
      }
    };
  }
  function h(e, o, i, n) {
    n !== "" && (e.textTransform === "uppercase" && (n = n.toUpperCase()), t.font = e.fontWeight + " " + e.fontSize + " " + e.fontFamily, t.textBaseline = "top", t.fillStyle = e.color, t.fillText(n, o, i + parseFloat(e.fontSize) * 0.1));
  }
  function d(e, o, i, n, r) {
    i < 2 * r && (r = i / 2), n < 2 * r && (r = n / 2), t.beginPath(), t.moveTo(e + r, o), t.arcTo(e + i, o, e + i, o + n, r), t.arcTo(e + i, o + n, e, o + n, r), t.arcTo(e, o + n, e, o, r), t.arcTo(e, o, e + i, o, r), t.closePath();
  }
  function w(e, o, i, n, r, s) {
    const T = e[o + "Width"], c = e[o + "Style"], b = e[o + "Color"];
    T !== "0px" && c !== "none" && b !== "transparent" && b !== "rgba(0, 0, 0, 0)" && (t.strokeStyle = b, t.lineWidth = parseFloat(T), t.beginPath(), t.moveTo(i, n), t.lineTo(i + r, n + s), t.stroke());
  }
  function v(e, o) {
    let i = 0, n = 0, r = 0, s = 0;
    if (e.nodeType === Node.TEXT_NODE) {
      p.selectNode(e);
      const c = p.getBoundingClientRect();
      i = c.left - m.left - 0.5, n = c.top - m.top - 0.5, r = c.width, s = c.height, h(o, i, n, e.nodeValue.trim());
    } else {
      if (e.nodeType === Node.COMMENT_NODE)
        return;
      if (e instanceof HTMLCanvasElement) {
        if (e.style.display === "none")
          return;
        t.save();
        const c = window.devicePixelRatio;
        t.scale(1 / c, 1 / c), t.drawImage(e, 0, 0), t.restore();
      } else {
        if (e.style.display === "none")
          return;
        const c = e.getBoundingClientRect();
        i = c.left - m.left - 0.5, n = c.top - m.top - 0.5, r = c.width, s = c.height, o = window.getComputedStyle(e), d(i, n, r, s, parseFloat(o.borderRadius));
        const b = o.backgroundColor;
        b !== "transparent" && b !== "rgba(0, 0, 0, 0)" && (t.fillStyle = b, t.fill());
        const E = [
          "borderTop",
          "borderLeft",
          "borderBottom",
          "borderRight"
        ];
        let x = !0, L = null;
        for (const f of E) {
          if (L !== null && (x = o[f + "Width"] === o[L + "Width"] && o[f + "Color"] === o[L + "Color"] && o[f + "Style"] === o[L + "Style"]), x === !1)
            break;
          L = f;
        }
        if (x === !0) {
          const f = parseFloat(o.borderTopWidth);
          o.borderTopWidth !== "0px" && o.borderTopStyle !== "none" && o.borderTopColor !== "transparent" && o.borderTopColor !== "rgba(0, 0, 0, 0)" && (t.strokeStyle = o.borderTopColor, t.lineWidth = f, t.stroke());
        } else
          w(o, "borderTop", i, n, r, 0), w(o, "borderLeft", i, n, 0, s), w(o, "borderBottom", i, n + s, r, 0), w(o, "borderRight", i + r, n, 0, s);
        if (e instanceof HTMLInputElement) {
          let f = o.accentColor;
          (f === void 0 || f === "auto") && (f = o.color), a.set(f);
          const C = Math.sqrt(
            0.299 * a.r ** 2 + 0.587 * a.g ** 2 + 0.114 * a.b ** 2
          ) < 0.5 ? "white" : "#111111";
          if (e.type === "radio" && (d(i, n, r, s, s), t.fillStyle = "white", t.strokeStyle = f, t.lineWidth = 1, t.fill(), t.stroke(), e.checked && (d(
            i + 2,
            n + 2,
            r - 4,
            s - 4,
            s
          ), t.fillStyle = f, t.strokeStyle = C, t.lineWidth = 2, t.fill(), t.stroke())), e.type === "checkbox" && (d(i, n, r, s, 2), t.fillStyle = e.checked ? f : "white", t.strokeStyle = e.checked ? C : f, t.lineWidth = 1, t.stroke(), t.fill(), e.checked)) {
            const S = t.textAlign;
            t.textAlign = "center";
            const N = {
              color: C,
              fontFamily: o.fontFamily,
              fontSize: s + "px",
              fontWeight: "bold"
            };
            h(N, i + r / 2, n, "\u2714"), t.textAlign = S;
          }
          if (e.type === "range") {
            const [S, N, I] = ["min", "max", "value"].map(
              (O) => parseFloat(e[O])
            ), W = (I - S) / (N - S) * (r - s);
            d(
              i,
              n + s / 4,
              r,
              s / 2,
              s / 4
            ), t.fillStyle = C, t.strokeStyle = f, t.lineWidth = 1, t.fill(), t.stroke(), d(
              i,
              n + s / 4,
              W + s / 2,
              s / 2,
              s / 4
            ), t.fillStyle = f, t.fill(), d(i + W, n, s, s, s / 2), t.fillStyle = f, t.fill();
          }
          (e.type === "color" || e.type === "text" || e.type === "number") && (M.add({ x: i, y: n, width: r, height: s }), h(
            o,
            i + parseInt(o.paddingLeft),
            n + parseInt(o.paddingTop),
            e.value
          ), M.remove());
        }
      }
    }
    const T = o.overflow === "auto" || o.overflow === "hidden";
    T && M.add({ x: i, y: n, width: r, height: s });
    for (let c = 0; c < e.childNodes.length; c++)
      v(e.childNodes[c], o);
    T && M.remove();
  }
  const m = u.getBoundingClientRect();
  let g = F.get(u);
  g === void 0 && (g = document.createElement("canvas"), g.width = m.width, g.height = m.height, F.set(u, g));
  const t = g.getContext("2d"), M = new l(t);
  return v(u), g;
}
function Y(u, p, a, l) {
  const h = {
    clientX: a * u.offsetWidth + u.offsetLeft,
    clientY: l * u.offsetHeight + u.offsetTop,
    view: u.ownerDocument.defaultView
  };
  window.dispatchEvent(new MouseEvent(p, h));
  const d = u.getBoundingClientRect();
  a = a * d.width + d.left, l = l * d.height + d.top;
  function w(v) {
    if (v.nodeType !== Node.TEXT_NODE && v.nodeType !== Node.COMMENT_NODE) {
      const m = v.getBoundingClientRect();
      if (a > m.left && a < m.right && l > m.top && l < m.bottom && (v.dispatchEvent(new MouseEvent(p, h)), v instanceof HTMLInputElement && v.type === "range" && (p === "mousedown" || p === "click"))) {
        const [g, t] = ["min", "max"].map(
          (i) => parseFloat(v[i])
        ), M = m.width, o = (a - m.x) / M;
        v.value = g + (t - g) * o, v.dispatchEvent(
          new InputEvent("input", { bubbles: !0 })
        );
      }
      for (let g = 0; g < v.childNodes.length; g++)
        w(v.childNodes[g]);
    }
  }
  w(u);
}
export {
  j as HTMLMesh,
  J as HTMLSprite
};
