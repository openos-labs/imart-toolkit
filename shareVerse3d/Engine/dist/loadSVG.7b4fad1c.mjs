import { L as mt, F as bt, s as it, W as O, a as gt, aI as kt, aJ as Tt, aK as wt, aL as lt, q as At, r as ft, aM as rt, w as It, x as Pt, z as Mt, H as St } from "./index.60bcd3b0.mjs";
import "react";
import "react-dom";
class ut extends mt {
  constructor(E) {
    super(E), this.defaultDPI = 90, this.defaultUnit = "px";
  }
  load(E, z, C, M) {
    const I = this, J = new bt(I.manager);
    J.setPath(I.path), J.setRequestHeader(I.requestHeader), J.setWithCredentials(I.withCredentials), J.load(E, function(tt) {
      try {
        z(I.parse(tt));
      } catch (Z) {
        M ? M(Z) : console.error(Z), I.manager.itemError(E);
      }
    }, C, M);
  }
  parse(E) {
    const z = this;
    function C(i, o) {
      if (i.nodeType !== 1)
        return;
      const t = y(i);
      let r = !1, c = null;
      switch (i.nodeName) {
        case "svg":
          o = q(i, o);
          break;
        case "style":
          I(i);
          break;
        case "g":
          o = q(i, o);
          break;
        case "path":
          o = q(i, o), i.hasAttribute("d") && (c = M(i));
          break;
        case "rect":
          o = q(i, o), c = Z(i);
          break;
        case "polygon":
          o = q(i, o), c = Y(i);
          break;
        case "polyline":
          o = q(i, o), c = _(i);
          break;
        case "circle":
          o = q(i, o), c = G(i);
          break;
        case "ellipse":
          o = q(i, o), c = H(i);
          break;
        case "line":
          o = q(i, o), c = et(i);
          break;
        case "defs":
          r = !0;
          break;
        case "use":
          o = q(i, o);
          const w = (i.getAttributeNS("http://www.w3.org/1999/xlink", "href") || "").substring(1), x = i.viewportElement.getElementById(w);
          x ? C(x, o) : console.warn("SVGLoader: 'use node' references non-existent node id: " + w);
          break;
      }
      c && (o.fill !== void 0 && o.fill !== "none" && c.color.setStyle(o.fill), S(c, D), U.push(c), c.userData = { node: i, style: o });
      const s = i.childNodes;
      for (let a = 0; a < s.length; a++) {
        const w = s[a];
        r && w.nodeName !== "style" && w.nodeName !== "defs" || C(w, o);
      }
      t && (b.pop(), b.length > 0 ? D.copy(b[b.length - 1]) : D.identity());
    }
    function M(i) {
      const o = new rt(), t = new O(), r = new O(), c = new O();
      let s = !0, a = !1;
      const x = i.getAttribute("d").match(/[a-df-z][^a-df-z]*/ig);
      for (let k = 0, h = x.length; k < h; k++) {
        const V = x[k], u = V.charAt(0), p = V.slice(1).trim();
        s === !0 && (a = !0, s = !1);
        let n;
        switch (u) {
          case "M":
            n = f(p);
            for (let e = 0, m = n.length; e < m; e += 2)
              t.x = n[e + 0], t.y = n[e + 1], r.x = t.x, r.y = t.y, e === 0 ? o.moveTo(t.x, t.y) : o.lineTo(t.x, t.y), e === 0 && c.copy(t);
            break;
          case "H":
            n = f(p);
            for (let e = 0, m = n.length; e < m; e++)
              t.x = n[e], r.x = t.x, r.y = t.y, o.lineTo(t.x, t.y), e === 0 && a === !0 && c.copy(t);
            break;
          case "V":
            n = f(p);
            for (let e = 0, m = n.length; e < m; e++)
              t.y = n[e], r.x = t.x, r.y = t.y, o.lineTo(t.x, t.y), e === 0 && a === !0 && c.copy(t);
            break;
          case "L":
            n = f(p);
            for (let e = 0, m = n.length; e < m; e += 2)
              t.x = n[e + 0], t.y = n[e + 1], r.x = t.x, r.y = t.y, o.lineTo(t.x, t.y), e === 0 && a === !0 && c.copy(t);
            break;
          case "C":
            n = f(p);
            for (let e = 0, m = n.length; e < m; e += 6)
              o.bezierCurveTo(
                n[e + 0],
                n[e + 1],
                n[e + 2],
                n[e + 3],
                n[e + 4],
                n[e + 5]
              ), r.x = n[e + 2], r.y = n[e + 3], t.x = n[e + 4], t.y = n[e + 5], e === 0 && a === !0 && c.copy(t);
            break;
          case "S":
            n = f(p);
            for (let e = 0, m = n.length; e < m; e += 4)
              o.bezierCurveTo(
                Q(t.x, r.x),
                Q(t.y, r.y),
                n[e + 0],
                n[e + 1],
                n[e + 2],
                n[e + 3]
              ), r.x = n[e + 0], r.y = n[e + 1], t.x = n[e + 2], t.y = n[e + 3], e === 0 && a === !0 && c.copy(t);
            break;
          case "Q":
            n = f(p);
            for (let e = 0, m = n.length; e < m; e += 4)
              o.quadraticCurveTo(
                n[e + 0],
                n[e + 1],
                n[e + 2],
                n[e + 3]
              ), r.x = n[e + 0], r.y = n[e + 1], t.x = n[e + 2], t.y = n[e + 3], e === 0 && a === !0 && c.copy(t);
            break;
          case "T":
            n = f(p);
            for (let e = 0, m = n.length; e < m; e += 2) {
              const j = Q(t.x, r.x), v = Q(t.y, r.y);
              o.quadraticCurveTo(
                j,
                v,
                n[e + 0],
                n[e + 1]
              ), r.x = j, r.y = v, t.x = n[e + 0], t.y = n[e + 1], e === 0 && a === !0 && c.copy(t);
            }
            break;
          case "A":
            n = f(p, [3, 4], 7);
            for (let e = 0, m = n.length; e < m; e += 7) {
              if (n[e + 5] == t.x && n[e + 6] == t.y)
                continue;
              const j = t.clone();
              t.x = n[e + 5], t.y = n[e + 6], r.x = t.x, r.y = t.y, J(
                o,
                n[e],
                n[e + 1],
                n[e + 2],
                n[e + 3],
                n[e + 4],
                j,
                t
              ), e === 0 && a === !0 && c.copy(t);
            }
            break;
          case "m":
            n = f(p);
            for (let e = 0, m = n.length; e < m; e += 2)
              t.x += n[e + 0], t.y += n[e + 1], r.x = t.x, r.y = t.y, e === 0 ? o.moveTo(t.x, t.y) : o.lineTo(t.x, t.y), e === 0 && c.copy(t);
            break;
          case "h":
            n = f(p);
            for (let e = 0, m = n.length; e < m; e++)
              t.x += n[e], r.x = t.x, r.y = t.y, o.lineTo(t.x, t.y), e === 0 && a === !0 && c.copy(t);
            break;
          case "v":
            n = f(p);
            for (let e = 0, m = n.length; e < m; e++)
              t.y += n[e], r.x = t.x, r.y = t.y, o.lineTo(t.x, t.y), e === 0 && a === !0 && c.copy(t);
            break;
          case "l":
            n = f(p);
            for (let e = 0, m = n.length; e < m; e += 2)
              t.x += n[e + 0], t.y += n[e + 1], r.x = t.x, r.y = t.y, o.lineTo(t.x, t.y), e === 0 && a === !0 && c.copy(t);
            break;
          case "c":
            n = f(p);
            for (let e = 0, m = n.length; e < m; e += 6)
              o.bezierCurveTo(
                t.x + n[e + 0],
                t.y + n[e + 1],
                t.x + n[e + 2],
                t.y + n[e + 3],
                t.x + n[e + 4],
                t.y + n[e + 5]
              ), r.x = t.x + n[e + 2], r.y = t.y + n[e + 3], t.x += n[e + 4], t.y += n[e + 5], e === 0 && a === !0 && c.copy(t);
            break;
          case "s":
            n = f(p);
            for (let e = 0, m = n.length; e < m; e += 4)
              o.bezierCurveTo(
                Q(t.x, r.x),
                Q(t.y, r.y),
                t.x + n[e + 0],
                t.y + n[e + 1],
                t.x + n[e + 2],
                t.y + n[e + 3]
              ), r.x = t.x + n[e + 0], r.y = t.y + n[e + 1], t.x += n[e + 2], t.y += n[e + 3], e === 0 && a === !0 && c.copy(t);
            break;
          case "q":
            n = f(p);
            for (let e = 0, m = n.length; e < m; e += 4)
              o.quadraticCurveTo(
                t.x + n[e + 0],
                t.y + n[e + 1],
                t.x + n[e + 2],
                t.y + n[e + 3]
              ), r.x = t.x + n[e + 0], r.y = t.y + n[e + 1], t.x += n[e + 2], t.y += n[e + 3], e === 0 && a === !0 && c.copy(t);
            break;
          case "t":
            n = f(p);
            for (let e = 0, m = n.length; e < m; e += 2) {
              const j = Q(t.x, r.x), v = Q(t.y, r.y);
              o.quadraticCurveTo(
                j,
                v,
                t.x + n[e + 0],
                t.y + n[e + 1]
              ), r.x = j, r.y = v, t.x = t.x + n[e + 0], t.y = t.y + n[e + 1], e === 0 && a === !0 && c.copy(t);
            }
            break;
          case "a":
            n = f(p, [3, 4], 7);
            for (let e = 0, m = n.length; e < m; e += 7) {
              if (n[e + 5] == 0 && n[e + 6] == 0)
                continue;
              const j = t.clone();
              t.x += n[e + 5], t.y += n[e + 6], r.x = t.x, r.y = t.y, J(
                o,
                n[e],
                n[e + 1],
                n[e + 2],
                n[e + 3],
                n[e + 4],
                j,
                t
              ), e === 0 && a === !0 && c.copy(t);
            }
            break;
          case "Z":
          case "z":
            o.currentPath.autoClose = !0, o.currentPath.curves.length > 0 && (t.copy(c), o.currentPath.currentPoint.copy(t), s = !0);
            break;
          default:
            console.warn(V);
        }
        a = !1;
      }
      return o;
    }
    function I(i) {
      if (!(!i.sheet || !i.sheet.cssRules || !i.sheet.cssRules.length))
        for (let o = 0; o < i.sheet.cssRules.length; o++) {
          const t = i.sheet.cssRules[o];
          if (t.type !== 1)
            continue;
          const r = t.selectorText.split(/,/gm).filter(Boolean).map((c) => c.trim());
          for (let c = 0; c < r.length; c++) {
            const s = Object.fromEntries(
              Object.entries(t.style).filter(([, a]) => a !== "")
            );
            R[r[c]] = Object.assign(
              R[r[c]] || {},
              s
            );
          }
        }
    }
    function J(i, o, t, r, c, s, a, w) {
      if (o == 0 || t == 0) {
        i.lineTo(w.x, w.y);
        return;
      }
      r = r * Math.PI / 180, o = Math.abs(o), t = Math.abs(t);
      const x = (a.x - w.x) / 2, k = (a.y - w.y) / 2, h = Math.cos(r) * x + Math.sin(r) * k, V = -Math.sin(r) * x + Math.cos(r) * k;
      let u = o * o, p = t * t;
      const n = h * h, e = V * V, m = n / u + e / p;
      if (m > 1) {
        const ht = Math.sqrt(m);
        o = ht * o, t = ht * t, u = o * o, p = t * t;
      }
      const j = u * e + p * n, v = (u * p - j) / j;
      let $ = Math.sqrt(Math.max(0, v));
      c === s && ($ = -$);
      const st = $ * o * V / t, ct = -$ * t * h / o, pt = Math.cos(r) * st - Math.sin(r) * ct + (a.x + w.x) / 2, dt = Math.sin(r) * st + Math.cos(r) * ct + (a.y + w.y) / 2, yt = tt(1, 0, (h - st) / o, (V - ct) / t), xt = tt((h - st) / o, (V - ct) / t, (-h - st) / o, (-V - ct) / t) % (Math.PI * 2);
      i.currentPath.absellipse(pt, dt, o, t, yt, yt + xt, s === 0, r);
    }
    function tt(i, o, t, r) {
      const c = i * t + o * r, s = Math.sqrt(i * i + o * o) * Math.sqrt(t * t + r * r);
      let a = Math.acos(Math.max(-1, Math.min(1, c / s)));
      return i * r - o * t < 0 && (a = -a), a;
    }
    function Z(i) {
      const o = d(i.getAttribute("x") || 0), t = d(i.getAttribute("y") || 0), r = d(i.getAttribute("rx") || i.getAttribute("ry") || 0), c = d(i.getAttribute("ry") || i.getAttribute("rx") || 0), s = d(i.getAttribute("width")), a = d(i.getAttribute("height")), w = 1 - 0.551915024494, x = new rt();
      return x.moveTo(o + r, t), x.lineTo(o + s - r, t), (r !== 0 || c !== 0) && x.bezierCurveTo(
        o + s - r * w,
        t,
        o + s,
        t + c * w,
        o + s,
        t + c
      ), x.lineTo(o + s, t + a - c), (r !== 0 || c !== 0) && x.bezierCurveTo(
        o + s,
        t + a - c * w,
        o + s - r * w,
        t + a,
        o + s - r,
        t + a
      ), x.lineTo(o + r, t + a), (r !== 0 || c !== 0) && x.bezierCurveTo(
        o + r * w,
        t + a,
        o,
        t + a - c * w,
        o,
        t + a - c
      ), x.lineTo(o, t + c), (r !== 0 || c !== 0) && x.bezierCurveTo(o, t + c * w, o + r * w, t, o + r, t), x;
    }
    function Y(i) {
      function o(s, a, w) {
        const x = d(a), k = d(w);
        c === 0 ? r.moveTo(x, k) : r.lineTo(x, k), c++;
      }
      const t = /(-?[\d\.?]+)[,|\s](-?[\d\.?]+)/g, r = new rt();
      let c = 0;
      return i.getAttribute("points").replace(t, o), r.currentPath.autoClose = !0, r;
    }
    function _(i) {
      function o(s, a, w) {
        const x = d(a), k = d(w);
        c === 0 ? r.moveTo(x, k) : r.lineTo(x, k), c++;
      }
      const t = /(-?[\d\.?]+)[,|\s](-?[\d\.?]+)/g, r = new rt();
      let c = 0;
      return i.getAttribute("points").replace(t, o), r.currentPath.autoClose = !1, r;
    }
    function G(i) {
      const o = d(i.getAttribute("cx") || 0), t = d(i.getAttribute("cy") || 0), r = d(i.getAttribute("r") || 0), c = new lt();
      c.absarc(o, t, r, 0, Math.PI * 2);
      const s = new rt();
      return s.subPaths.push(c), s;
    }
    function H(i) {
      const o = d(i.getAttribute("cx") || 0), t = d(i.getAttribute("cy") || 0), r = d(i.getAttribute("rx") || 0), c = d(i.getAttribute("ry") || 0), s = new lt();
      s.absellipse(o, t, r, c, 0, Math.PI * 2);
      const a = new rt();
      return a.subPaths.push(s), a;
    }
    function et(i) {
      const o = d(i.getAttribute("x1") || 0), t = d(i.getAttribute("y1") || 0), r = d(i.getAttribute("x2") || 0), c = d(i.getAttribute("y2") || 0), s = new rt();
      return s.moveTo(o, t), s.lineTo(r, c), s.currentPath.autoClose = !1, s;
    }
    function q(i, o) {
      o = Object.assign({}, o);
      let t = {};
      if (i.hasAttribute("class")) {
        const a = i.getAttribute("class").split(/\s/).filter(Boolean).map((w) => w.trim());
        for (let w = 0; w < a.length; w++)
          t = Object.assign(t, R["." + a[w]]);
      }
      i.hasAttribute("id") && (t = Object.assign(t, R["#" + i.getAttribute("id")]));
      function r(a, w, x) {
        x === void 0 && (x = function(h) {
          return h.startsWith("url") && console.warn("SVGLoader: url access in attributes is not implemented."), h;
        }), i.hasAttribute(a) && (o[w] = x(i.getAttribute(a))), t[a] && (o[w] = x(t[a])), i.style && i.style[a] !== "" && (o[w] = x(i.style[a]));
      }
      function c(a) {
        return Math.max(0, Math.min(1, d(a)));
      }
      function s(a) {
        return Math.max(0, d(a));
      }
      return r("fill", "fill"), r("fill-opacity", "fillOpacity", c), r("fill-rule", "fillRule"), r("opacity", "opacity", c), r("stroke", "stroke"), r("stroke-opacity", "strokeOpacity", c), r("stroke-width", "strokeWidth", s), r("stroke-linejoin", "strokeLineJoin"), r("stroke-linecap", "strokeLineCap"), r("stroke-miterlimit", "strokeMiterLimit", s), r("visibility", "visibility"), o;
    }
    function Q(i, o) {
      return i - (o - i);
    }
    function f(i, o, t) {
      if (typeof i != "string")
        throw new TypeError("Invalid input: " + typeof i);
      const r = {
        SEPARATOR: /[ \t\r\n\,.\-+]/,
        WHITESPACE: /[ \t\r\n]/,
        DIGIT: /[\d]/,
        SIGN: /[-+]/,
        POINT: /\./,
        COMMA: /,/,
        EXP: /e/i,
        FLAGS: /[01]/
      }, c = 0, s = 1, a = 2, w = 3;
      let x = c, k = !0, h = "", V = "";
      const u = [];
      function p(j, v, $) {
        const st = new SyntaxError('Unexpected character "' + j + '" at index ' + v + ".");
        throw st.partial = $, st;
      }
      function n() {
        h !== "" && (V === "" ? u.push(Number(h)) : u.push(Number(h) * Math.pow(10, Number(V)))), h = "", V = "";
      }
      let e;
      const m = i.length;
      for (let j = 0; j < m; j++) {
        if (e = i[j], Array.isArray(o) && o.includes(u.length % t) && r.FLAGS.test(e)) {
          x = s, h = e, n();
          continue;
        }
        if (x === c) {
          if (r.WHITESPACE.test(e))
            continue;
          if (r.DIGIT.test(e) || r.SIGN.test(e)) {
            x = s, h = e;
            continue;
          }
          if (r.POINT.test(e)) {
            x = a, h = e;
            continue;
          }
          r.COMMA.test(e) && (k && p(e, j, u), k = !0);
        }
        if (x === s) {
          if (r.DIGIT.test(e)) {
            h += e;
            continue;
          }
          if (r.POINT.test(e)) {
            h += e, x = a;
            continue;
          }
          if (r.EXP.test(e)) {
            x = w;
            continue;
          }
          r.SIGN.test(e) && h.length === 1 && r.SIGN.test(h[0]) && p(e, j, u);
        }
        if (x === a) {
          if (r.DIGIT.test(e)) {
            h += e;
            continue;
          }
          if (r.EXP.test(e)) {
            x = w;
            continue;
          }
          r.POINT.test(e) && h[h.length - 1] === "." && p(e, j, u);
        }
        if (x === w) {
          if (r.DIGIT.test(e)) {
            V += e;
            continue;
          }
          if (r.SIGN.test(e)) {
            if (V === "") {
              V += e;
              continue;
            }
            V.length === 1 && r.SIGN.test(V) && p(e, j, u);
          }
        }
        r.WHITESPACE.test(e) ? (n(), x = c, k = !1) : r.COMMA.test(e) ? (n(), x = c, k = !0) : r.SIGN.test(e) ? (n(), x = s, h = e) : r.POINT.test(e) ? (n(), x = a, h = e) : p(e, j, u);
      }
      return n(), u;
    }
    const T = ["mm", "cm", "in", "pt", "pc", "px"], L = {
      mm: {
        mm: 1,
        cm: 0.1,
        in: 1 / 25.4,
        pt: 72 / 25.4,
        pc: 6 / 25.4,
        px: -1
      },
      cm: {
        mm: 10,
        cm: 1,
        in: 1 / 2.54,
        pt: 72 / 2.54,
        pc: 6 / 2.54,
        px: -1
      },
      in: {
        mm: 25.4,
        cm: 2.54,
        in: 1,
        pt: 72,
        pc: 6,
        px: -1
      },
      pt: {
        mm: 25.4 / 72,
        cm: 2.54 / 72,
        in: 1 / 72,
        pt: 1,
        pc: 6 / 72,
        px: -1
      },
      pc: {
        mm: 25.4 / 6,
        cm: 2.54 / 6,
        in: 1 / 6,
        pt: 72 / 6,
        pc: 1,
        px: -1
      },
      px: {
        px: 1
      }
    };
    function d(i) {
      let o = "px";
      if (typeof i == "string" || i instanceof String)
        for (let r = 0, c = T.length; r < c; r++) {
          const s = T[r];
          if (i.endsWith(s)) {
            o = s, i = i.substring(0, i.length - s.length);
            break;
          }
        }
      let t;
      return o === "px" && z.defaultUnit !== "px" ? t = L.in[z.defaultUnit] / z.defaultDPI : (t = L[o][z.defaultUnit], t < 0 && (t = L[o].in * z.defaultDPI)), t * parseFloat(i);
    }
    function y(i) {
      if (!(i.hasAttribute("transform") || i.nodeName === "use" && (i.hasAttribute("x") || i.hasAttribute("y"))))
        return null;
      const o = g(i);
      return b.length > 0 && o.premultiply(b[b.length - 1]), D.copy(o), b.push(o), o;
    }
    function g(i) {
      const o = new it(), t = F;
      if (i.nodeName === "use" && (i.hasAttribute("x") || i.hasAttribute("y"))) {
        const r = d(i.getAttribute("x")), c = d(i.getAttribute("y"));
        o.translate(r, c);
      }
      if (i.hasAttribute("transform")) {
        const r = i.getAttribute("transform").split(")");
        for (let c = r.length - 1; c >= 0; c--) {
          const s = r[c].trim();
          if (s === "")
            continue;
          const a = s.indexOf("("), w = s.length;
          if (a > 0 && a < w) {
            const x = s.slice(0, a), k = f(s.slice(a + 1));
            switch (t.identity(), x) {
              case "translate":
                if (k.length >= 1) {
                  const h = k[0];
                  let V = 0;
                  k.length >= 2 && (V = k[1]), t.translate(h, V);
                }
                break;
              case "rotate":
                if (k.length >= 1) {
                  let h = 0, V = 0, u = 0;
                  h = -k[0] * Math.PI / 180, k.length >= 3 && (V = k[1], u = k[2]), W.identity().translate(-V, -u), K.identity().rotate(h), nt.multiplyMatrices(K, W), W.identity().translate(V, u), t.multiplyMatrices(W, nt);
                }
                break;
              case "scale":
                if (k.length >= 1) {
                  const h = k[0];
                  let V = h;
                  k.length >= 2 && (V = k[1]), t.scale(h, V);
                }
                break;
              case "skewX":
                k.length === 1 && t.set(
                  1,
                  Math.tan(k[0] * Math.PI / 180),
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  1
                );
                break;
              case "skewY":
                k.length === 1 && t.set(
                  1,
                  0,
                  0,
                  Math.tan(k[0] * Math.PI / 180),
                  1,
                  0,
                  0,
                  0,
                  1
                );
                break;
              case "matrix":
                k.length === 6 && t.set(
                  k[0],
                  k[2],
                  k[4],
                  k[1],
                  k[3],
                  k[5],
                  0,
                  0,
                  1
                );
                break;
            }
          }
          o.premultiply(t);
        }
      }
      return o;
    }
    function S(i, o) {
      function t(s) {
        l.set(s.x, s.y, 1).applyMatrix3(o), s.set(l.x, l.y);
      }
      const r = N(o), c = i.subPaths;
      for (let s = 0, a = c.length; s < a; s++) {
        const x = c[s].curves;
        for (let k = 0; k < x.length; k++) {
          const h = x[k];
          h.isLineCurve ? (t(h.v1), t(h.v2)) : h.isCubicBezierCurve ? (t(h.v0), t(h.v1), t(h.v2), t(h.v3)) : h.isQuadraticBezierCurve ? (t(h.v0), t(h.v1), t(h.v2)) : h.isEllipseCurve && (r && console.warn("SVGLoader: Elliptic arc or ellipse rotation or skewing is not implemented."), A.set(h.aX, h.aY), t(A), h.aX = A.x, h.aY = A.y, h.xRadius *= P(o), h.yRadius *= B(o));
        }
      }
    }
    function N(i) {
      return i.elements[1] !== 0 || i.elements[3] !== 0;
    }
    function P(i) {
      const o = i.elements;
      return Math.sqrt(o[0] * o[0] + o[1] * o[1]);
    }
    function B(i) {
      const o = i.elements;
      return Math.sqrt(o[3] * o[3] + o[4] * o[4]);
    }
    const U = [], R = {}, b = [], F = new it(), W = new it(), K = new it(), nt = new it(), A = new O(), l = new gt(), D = new it(), X = new DOMParser().parseFromString(E, "image/svg+xml");
    return C(X.documentElement, {
      fill: "#000",
      fillOpacity: 1,
      strokeOpacity: 1,
      strokeWidth: 1,
      strokeLineJoin: "miter",
      strokeLineCap: "butt",
      strokeMiterLimit: 4
    }), { paths: U, xml: X.documentElement };
  }
  static createShapes(E) {
    const C = {
      ORIGIN: 0,
      DESTINATION: 1,
      BETWEEN: 2,
      LEFT: 3,
      RIGHT: 4,
      BEHIND: 5,
      BEYOND: 6
    }, M = {
      loc: C.ORIGIN,
      t: 0
    };
    function I(f, T, L, d) {
      const y = f.x, g = T.x, S = L.x, N = d.x, P = f.y, B = T.y, U = L.y, R = d.y, b = (N - S) * (P - U) - (R - U) * (y - S), F = (g - y) * (P - U) - (B - P) * (y - S), W = (R - U) * (g - y) - (N - S) * (B - P), K = b / W, nt = F / W;
      if (W === 0 && b !== 0 || K <= 0 || K >= 1 || nt < 0 || nt > 1)
        return null;
      if (b === 0 && W === 0) {
        for (let A = 0; A < 2; A++)
          if (J(A === 0 ? L : d, f, T), M.loc == C.ORIGIN) {
            const l = A === 0 ? L : d;
            return { x: l.x, y: l.y, t: M.t };
          } else if (M.loc == C.BETWEEN) {
            const l = +(y + M.t * (g - y)).toPrecision(10), D = +(P + M.t * (B - P)).toPrecision(10);
            return { x: l, y: D, t: M.t };
          }
        return null;
      } else {
        for (let D = 0; D < 2; D++)
          if (J(D === 0 ? L : d, f, T), M.loc == C.ORIGIN) {
            const X = D === 0 ? L : d;
            return { x: X.x, y: X.y, t: M.t };
          }
        const A = +(y + K * (g - y)).toPrecision(10), l = +(P + K * (B - P)).toPrecision(10);
        return { x: A, y: l, t: K };
      }
    }
    function J(f, T, L) {
      const d = L.x - T.x, y = L.y - T.y, g = f.x - T.x, S = f.y - T.y, N = d * S - g * y;
      if (f.x === T.x && f.y === T.y) {
        M.loc = C.ORIGIN, M.t = 0;
        return;
      }
      if (f.x === L.x && f.y === L.y) {
        M.loc = C.DESTINATION, M.t = 1;
        return;
      }
      if (N < -Number.EPSILON) {
        M.loc = C.LEFT;
        return;
      }
      if (N > Number.EPSILON) {
        M.loc = C.RIGHT;
        return;
      }
      if (d * g < 0 || y * S < 0) {
        M.loc = C.BEHIND;
        return;
      }
      if (Math.sqrt(d * d + y * y) < Math.sqrt(g * g + S * S)) {
        M.loc = C.BEYOND;
        return;
      }
      let P;
      d !== 0 ? P = g / d : P = S / y, M.loc = C.BETWEEN, M.t = P;
    }
    function tt(f, T) {
      const L = [], d = [];
      for (let y = 1; y < f.length; y++) {
        const g = f[y - 1], S = f[y];
        for (let N = 1; N < T.length; N++) {
          const P = T[N - 1], B = T[N], U = I(g, S, P, B);
          U !== null && L.find((R) => R.t <= U.t + Number.EPSILON && R.t >= U.t - Number.EPSILON) === void 0 && (L.push(U), d.push(new O(U.x, U.y)));
        }
      }
      return d;
    }
    function Z(f, T, L) {
      const d = new O();
      T.getCenter(d);
      const y = [];
      return L.forEach((g) => {
        g.boundingBox.containsPoint(d) && tt(f, g.points).forEach((N) => {
          y.push({ identifier: g.identifier, isCW: g.isCW, point: N });
        });
      }), y.sort((g, S) => g.point.x - S.point.x), y;
    }
    function Y(f, T, L, d, y) {
      (y == null || y === "") && (y = "nonzero");
      const g = new O();
      f.boundingBox.getCenter(g);
      const S = [new O(L, g.y), new O(d, g.y)], N = Z(S, f.boundingBox, T);
      N.sort((F, W) => F.point.x - W.point.x);
      const P = [], B = [];
      N.forEach((F) => {
        F.identifier === f.identifier ? P.push(F) : B.push(F);
      });
      const U = P[0].point.x, R = [];
      let b = 0;
      for (; b < B.length && B[b].point.x < U; )
        R.length > 0 && R[R.length - 1] === B[b].identifier ? R.pop() : R.push(B[b].identifier), b++;
      if (R.push(f.identifier), y === "evenodd") {
        const F = R.length % 2 === 0, W = R[R.length - 2];
        return { identifier: f.identifier, isHole: F, for: W };
      } else if (y === "nonzero") {
        let F = !0, W = null, K = null;
        for (let nt = 0; nt < R.length; nt++) {
          const A = R[nt];
          F ? (K = T[A].isCW, F = !1, W = A) : K !== T[A].isCW && (K = T[A].isCW, F = !0);
        }
        return { identifier: f.identifier, isHole: F, for: W };
      } else
        console.warn('fill-rule: "' + y + '" is currently not implemented.');
    }
    let _ = 0, G = 999999999, H = -999999999, et = E.subPaths.map((f) => {
      const T = f.getPoints();
      let L = -999999999, d = 999999999, y = -999999999, g = 999999999;
      for (let S = 0; S < T.length; S++) {
        const N = T[S];
        N.y > L && (L = N.y), N.y < d && (d = N.y), N.x > y && (y = N.x), N.x < g && (g = N.x);
      }
      return H <= y && (H = y + 1), G >= g && (G = g - 1), { curves: f.curves, points: T, isCW: kt.isClockWise(T), identifier: _++, boundingBox: new Tt(new O(g, d), new O(y, L)) };
    });
    et = et.filter((f) => f.points.length > 1);
    const q = et.map((f) => {
      var T;
      return Y(f, et, G, H, (T = E.userData) == null ? void 0 : T.style.fillRule);
    }), Q = [];
    return et.forEach((f) => {
      if (!q[f.identifier].isHole) {
        const L = new wt();
        L.curves = f.curves, q.filter((y) => y.isHole && y.for === f.identifier).forEach((y) => {
          const g = et[y.identifier], S = new lt();
          S.curves = g.curves, L.holes.push(S);
        }), Q.push(L);
      }
    }), Q;
  }
  static getStrokeStyle(E, z, C, M, I) {
    return E = E !== void 0 ? E : 1, z = z !== void 0 ? z : "#000", C = C !== void 0 ? C : "miter", M = M !== void 0 ? M : "butt", I = I !== void 0 ? I : 4, {
      strokeColor: z,
      strokeWidth: E,
      strokeLineJoin: C,
      strokeLineCap: M,
      strokeMiterLimit: I
    };
  }
  static pointsToStroke(E, z, C, M) {
    const I = [], J = [], tt = [];
    if (ut.pointsToStrokeWithBuffers(E, z, C, M, I, J, tt) === 0)
      return null;
    const Z = new At();
    return Z.setAttribute("position", new ft(I, 3)), Z.setAttribute("normal", new ft(J, 3)), Z.setAttribute("uv", new ft(tt, 2)), Z;
  }
  static pointsToStrokeWithBuffers(E, z, C, M, I, J, tt, Z) {
    const Y = new O(), _ = new O(), G = new O(), H = new O(), et = new O(), q = new O(), Q = new O(), f = new O(), T = new O(), L = new O(), d = new O(), y = new O(), g = new O(), S = new O(), N = new O(), P = new O(), B = new O();
    C = C !== void 0 ? C : 12, M = M !== void 0 ? M : 1e-3, Z = Z !== void 0 ? Z : 0, E = V(E);
    const U = E.length;
    if (U < 2)
      return 0;
    const R = E[0].equals(E[U - 1]);
    let b, F = E[0], W;
    const K = z.strokeWidth / 2, nt = 1 / (U - 1);
    let A = 0, l, D, X, ot, i = !1, o = 0, t = Z * 3, r = Z * 2;
    c(E[0], E[1], Y).multiplyScalar(K), f.copy(E[0]).sub(Y), T.copy(E[0]).add(Y), L.copy(f), d.copy(T);
    for (let u = 1; u < U; u++) {
      b = E[u], u === U - 1 ? R ? W = E[1] : W = void 0 : W = E[u + 1];
      const p = Y;
      if (c(F, b, p), G.copy(p).multiplyScalar(K), y.copy(b).sub(G), g.copy(b).add(G), l = A + nt, D = !1, W !== void 0) {
        c(b, W, _), G.copy(_).multiplyScalar(K), S.copy(b).sub(G), N.copy(b).add(G), X = !0, G.subVectors(W, F), p.dot(G) < 0 && (X = !1), u === 1 && (i = X), G.subVectors(W, b), G.normalize();
        const n = Math.abs(p.dot(G));
        if (n > Number.EPSILON) {
          const e = K / n;
          G.multiplyScalar(-e), H.subVectors(b, F), et.copy(H).setLength(e).add(G), P.copy(et).negate();
          const m = et.length(), j = H.length();
          H.divideScalar(j), q.subVectors(W, b);
          const v = q.length();
          switch (q.divideScalar(v), H.dot(P) < j && q.dot(P) < v && (D = !0), B.copy(et).add(b), P.add(b), ot = !1, D ? X ? (N.copy(P), g.copy(P)) : (S.copy(P), y.copy(P)) : w(), z.strokeLineJoin) {
            case "bevel":
              x(X, D, l);
              break;
            case "round":
              k(X, D), X ? a(b, y, S, l, 0) : a(b, N, g, l, 1);
              break;
            case "miter":
            case "miter-clip":
            default:
              const $ = K * z.strokeMiterLimit / m;
              if ($ < 1)
                if (z.strokeLineJoin !== "miter-clip") {
                  x(X, D, l);
                  break;
                } else
                  k(X, D), X ? (q.subVectors(B, y).multiplyScalar($).add(y), Q.subVectors(B, S).multiplyScalar($).add(S), s(y, l, 0), s(q, l, 0), s(b, l, 0.5), s(b, l, 0.5), s(q, l, 0), s(Q, l, 0), s(b, l, 0.5), s(Q, l, 0), s(S, l, 0)) : (q.subVectors(B, g).multiplyScalar($).add(g), Q.subVectors(B, N).multiplyScalar($).add(N), s(g, l, 1), s(q, l, 1), s(b, l, 0.5), s(b, l, 0.5), s(q, l, 1), s(Q, l, 1), s(b, l, 0.5), s(Q, l, 1), s(N, l, 1));
              else
                D ? (X ? (s(T, A, 1), s(f, A, 0), s(B, l, 0), s(T, A, 1), s(B, l, 0), s(P, l, 1)) : (s(T, A, 1), s(f, A, 0), s(B, l, 1), s(f, A, 0), s(P, l, 0), s(B, l, 1)), X ? S.copy(B) : N.copy(B)) : X ? (s(y, l, 0), s(B, l, 0), s(b, l, 0.5), s(b, l, 0.5), s(B, l, 0), s(S, l, 0)) : (s(g, l, 1), s(B, l, 1), s(b, l, 0.5), s(b, l, 0.5), s(B, l, 1), s(N, l, 1)), ot = !0;
              break;
          }
        } else
          w();
      } else
        w();
      !R && u === U - 1 && h(E[0], L, d, X, !0, A), A = l, F = b, f.copy(S), T.copy(N);
    }
    if (!R)
      h(b, y, g, X, !1, l);
    else if (D && I) {
      let u = B, p = P;
      i !== X && (u = P, p = B), X ? (ot || i) && (p.toArray(I, 0 * 3), p.toArray(I, 3 * 3), ot && u.toArray(I, 1 * 3)) : (ot || !i) && (p.toArray(I, 1 * 3), p.toArray(I, 3 * 3), ot && u.toArray(I, 0 * 3));
    }
    return o;
    function c(u, p, n) {
      return n.subVectors(p, u), n.set(-n.y, n.x).normalize();
    }
    function s(u, p, n) {
      I && (I[t] = u.x, I[t + 1] = u.y, I[t + 2] = 0, J && (J[t] = 0, J[t + 1] = 0, J[t + 2] = 1), t += 3, tt && (tt[r] = p, tt[r + 1] = n, r += 2)), o += 3;
    }
    function a(u, p, n, e, m) {
      Y.copy(p).sub(u).normalize(), _.copy(n).sub(u).normalize();
      let j = Math.PI;
      const v = Y.dot(_);
      Math.abs(v) < 1 && (j = Math.abs(Math.acos(v))), j /= C, G.copy(p);
      for (let $ = 0, st = C - 1; $ < st; $++)
        H.copy(G).rotateAround(u, j), s(G, e, m), s(H, e, m), s(u, e, 0.5), G.copy(H);
      s(H, e, m), s(n, e, m), s(u, e, 0.5);
    }
    function w() {
      s(T, A, 1), s(f, A, 0), s(y, l, 0), s(T, A, 1), s(y, l, 1), s(g, l, 0);
    }
    function x(u, p, n) {
      p ? u ? (s(T, A, 1), s(f, A, 0), s(y, l, 0), s(T, A, 1), s(y, l, 0), s(P, l, 1), s(y, n, 0), s(S, n, 0), s(P, n, 0.5)) : (s(T, A, 1), s(f, A, 0), s(g, l, 1), s(f, A, 0), s(P, l, 0), s(g, l, 1), s(g, n, 1), s(N, n, 0), s(P, n, 0.5)) : u ? (s(y, n, 0), s(S, n, 0), s(b, n, 0.5)) : (s(g, n, 1), s(N, n, 0), s(b, n, 0.5));
    }
    function k(u, p) {
      p && (u ? (s(T, A, 1), s(f, A, 0), s(y, l, 0), s(T, A, 1), s(y, l, 0), s(P, l, 1), s(y, A, 0), s(b, l, 0.5), s(P, l, 1), s(b, l, 0.5), s(S, A, 0), s(P, l, 1)) : (s(T, A, 1), s(f, A, 0), s(g, l, 1), s(f, A, 0), s(P, l, 0), s(g, l, 1), s(g, A, 1), s(P, l, 0), s(b, l, 0.5), s(b, l, 0.5), s(P, l, 0), s(N, A, 1)));
    }
    function h(u, p, n, e, m, j) {
      switch (z.strokeLineCap) {
        case "round":
          m ? a(u, n, p, j, 0.5) : a(u, p, n, j, 0.5);
          break;
        case "square":
          if (m)
            Y.subVectors(p, u), _.set(Y.y, -Y.x), G.addVectors(Y, _).add(u), H.subVectors(_, Y).add(u), e ? (G.toArray(I, 1 * 3), H.toArray(I, 0 * 3), H.toArray(I, 3 * 3)) : (G.toArray(I, 1 * 3), G.toArray(I, 3 * 3), H.toArray(I, 0 * 3));
          else {
            Y.subVectors(n, u), _.set(Y.y, -Y.x), G.addVectors(Y, _).add(u), H.subVectors(_, Y).add(u);
            const v = I.length;
            e ? (G.toArray(I, v - 1 * 3), H.toArray(I, v - 2 * 3), H.toArray(I, v - 4 * 3)) : (G.toArray(I, v - 2 * 3), H.toArray(I, v - 1 * 3), H.toArray(I, v - 4 * 3));
          }
          break;
      }
    }
    function V(u) {
      let p = !1;
      for (let e = 1, m = u.length - 1; e < m; e++)
        if (u[e].distanceTo(u[e + 1]) < M) {
          p = !0;
          break;
        }
      if (!p)
        return u;
      const n = [];
      n.push(u[0]);
      for (let e = 1, m = u.length - 1; e < m; e++)
        u[e].distanceTo(u[e + 1]) >= M && n.push(u[e]);
      return n.push(u[u.length - 1]), n;
    }
  }
}
const Nt = /* @__PURE__ */ new Map(), Et = new ut(), Bt = (at) => It(
  Nt,
  at,
  () => new Promise((E, z) => {
    const C = at.startsWith("https://unpkg.com/");
    C && Pt(), Et.load(
      at,
      (M) => {
        C && Mt(), E(M);
      },
      St(at),
      z
    );
  })
);
export {
  Bt as default,
  Et as loader
};
