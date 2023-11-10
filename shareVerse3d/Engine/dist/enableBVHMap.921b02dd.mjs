import { p as ie, a as oe } from "./useBVHMap.06123688.mjs";
import { _ as gt, a as C, W as ft, aT as Qt, bl as H, bm as Ct, al as re, ak as Y, g as Pt, bn as ce, a5 as ae, ai as Rt, O as le, q as fe, G as ue, n as pe, a6 as de, m as Ut, bo as he, bp as ye, bq as me, br as xe, bs as qt } from "./index.60bcd3b0.mjs";
import { i as we, b as be, d as Ae } from "./bvhManagerMap.18713559.mjs";
import "react";
import "react-dom";
const te = 0, ge = 1, Pe = 2, Nt = 2, Mt = 1.25, Ht = 1, bt = 6 * 4 + 4 + 4, zt = 65535, Te = Math.pow(2, -24);
class ut {
  constructor() {
  }
}
function U(i, t, e) {
  return e.min.x = t[i], e.min.y = t[i + 1], e.min.z = t[i + 2], e.max.x = t[i + 3], e.max.y = t[i + 4], e.max.z = t[i + 5], e;
}
function Ot(i) {
  let t = -1, e = -1 / 0;
  for (let n = 0; n < 3; n++) {
    const s = i[n + 3] - i[n];
    s > e && (e = s, t = n);
  }
  return t;
}
function kt(i, t) {
  t.set(i);
}
function Xt(i, t, e) {
  let n, s;
  for (let r = 0; r < 3; r++) {
    const o = r + 3;
    n = i[r], s = t[r], e[r] = n < s ? n : s, n = i[o], s = t[o], e[o] = n > s ? n : s;
  }
}
function pt(i, t, e) {
  for (let n = 0; n < 3; n++) {
    const s = t[i + 2 * n], r = t[i + 2 * n + 1], o = s - r, l = s + r;
    o < e[n] && (e[n] = o), l > e[n + 3] && (e[n + 3] = l);
  }
}
function nt(i) {
  const t = i[3] - i[0], e = i[4] - i[1], n = i[5] - i[2];
  return 2 * (t * e + e * n + n * t);
}
function Be(i, t) {
  if (!i.index) {
    const e = i.attributes.position.count, n = t.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer;
    let s;
    e > 65535 ? s = new Uint32Array(new n(4 * e)) : s = new Uint16Array(new n(2 * e)), i.setIndex(new gt(s, 1));
    for (let r = 0; r < e; r++)
      s[r] = r;
  }
}
function Me(i) {
  if (!i.groups || !i.groups.length)
    return [{ offset: 0, count: i.index.count / 3 }];
  const t = [], e = /* @__PURE__ */ new Set();
  for (const s of i.groups)
    e.add(s.start), e.add(s.start + s.count);
  const n = Array.from(e.values()).sort((s, r) => s - r);
  for (let s = 0; s < n.length - 1; s++) {
    const r = n[s], o = n[s + 1];
    t.push({ offset: r / 3, count: (o - r) / 3 });
  }
  return t;
}
function St(i, t, e, n, s = null) {
  let r = 1 / 0, o = 1 / 0, l = 1 / 0, c = -1 / 0, f = -1 / 0, a = -1 / 0, p = 1 / 0, u = 1 / 0, h = 1 / 0, w = -1 / 0, P = -1 / 0, A = -1 / 0;
  const d = s !== null;
  for (let m = t * 6, y = (t + e) * 6; m < y; m += 6) {
    const b = i[m + 0], x = i[m + 1], g = b - x, T = b + x;
    g < r && (r = g), T > c && (c = T), d && b < p && (p = b), d && b > w && (w = b);
    const B = i[m + 2], M = i[m + 3], S = B - M, v = B + M;
    S < o && (o = S), v > f && (f = v), d && B < u && (u = B), d && B > P && (P = B);
    const F = i[m + 4], I = i[m + 5], z = F - I, V = F + I;
    z < l && (l = z), V > a && (a = V), d && F < h && (h = F), d && F > A && (A = F);
  }
  n[0] = r, n[1] = o, n[2] = l, n[3] = c, n[4] = f, n[5] = a, d && (s[0] = p, s[1] = u, s[2] = h, s[3] = w, s[4] = P, s[5] = A);
}
function Se(i, t, e, n) {
  let s = 1 / 0, r = 1 / 0, o = 1 / 0, l = -1 / 0, c = -1 / 0, f = -1 / 0;
  for (let a = t * 6, p = (t + e) * 6; a < p; a += 6) {
    const u = i[a + 0];
    u < s && (s = u), u > l && (l = u);
    const h = i[a + 2];
    h < r && (r = h), h > c && (c = h);
    const w = i[a + 4];
    w < o && (o = w), w > f && (f = w);
  }
  n[0] = s, n[1] = r, n[2] = o, n[3] = l, n[4] = c, n[5] = f;
}
function ve(i, t, e, n, s) {
  let r = e, o = e + n - 1;
  const l = s.pos, c = s.axis * 2;
  for (; ; ) {
    for (; r <= o && t[r * 6 + c] < l; )
      r++;
    for (; r <= o && t[o * 6 + c] >= l; )
      o--;
    if (r < o) {
      for (let f = 0; f < 3; f++) {
        let a = i[r * 3 + f];
        i[r * 3 + f] = i[o * 3 + f], i[o * 3 + f] = a;
        let p = t[r * 6 + f * 2 + 0];
        t[r * 6 + f * 2 + 0] = t[o * 6 + f * 2 + 0], t[o * 6 + f * 2 + 0] = p;
        let u = t[r * 6 + f * 2 + 1];
        t[r * 6 + f * 2 + 1] = t[o * 6 + f * 2 + 1], t[o * 6 + f * 2 + 1] = u;
      }
      r++, o--;
    } else
      return r;
  }
}
const N = 32, Ie = (i, t) => i.candidate - t.candidate, k = new Array(N).fill().map(() => ({
  count: 0,
  bounds: new Float32Array(6),
  rightCacheBounds: new Float32Array(6),
  leftCacheBounds: new Float32Array(6),
  candidate: 0
})), dt = new Float32Array(6);
function Fe(i, t, e, n, s, r) {
  let o = -1, l = 0;
  if (r === te)
    o = Ot(t), o !== -1 && (l = (t[o] + t[o + 3]) / 2);
  else if (r === ge)
    o = Ot(i), o !== -1 && (l = Ce(e, n, s, o));
  else if (r === Pe) {
    const c = nt(i);
    let f = Mt * s;
    const a = n * 6, p = (n + s) * 6;
    for (let u = 0; u < 3; u++) {
      const h = t[u], A = (t[u + 3] - h) / N;
      if (s < N / 4) {
        const d = [...k];
        d.length = s;
        let m = 0;
        for (let b = a; b < p; b += 6, m++) {
          const x = d[m];
          x.candidate = e[b + 2 * u], x.count = 0;
          const {
            bounds: g,
            leftCacheBounds: T,
            rightCacheBounds: B
          } = x;
          for (let M = 0; M < 3; M++)
            B[M] = 1 / 0, B[M + 3] = -1 / 0, T[M] = 1 / 0, T[M + 3] = -1 / 0, g[M] = 1 / 0, g[M + 3] = -1 / 0;
          pt(b, e, g);
        }
        d.sort(Ie);
        let y = s;
        for (let b = 0; b < y; b++) {
          const x = d[b];
          for (; b + 1 < y && d[b + 1].candidate === x.candidate; )
            d.splice(b + 1, 1), y--;
        }
        for (let b = a; b < p; b += 6) {
          const x = e[b + 2 * u];
          for (let g = 0; g < y; g++) {
            const T = d[g];
            x >= T.candidate ? pt(b, e, T.rightCacheBounds) : (pt(b, e, T.leftCacheBounds), T.count++);
          }
        }
        for (let b = 0; b < y; b++) {
          const x = d[b], g = x.count, T = s - x.count, B = x.leftCacheBounds, M = x.rightCacheBounds;
          let S = 0;
          g !== 0 && (S = nt(B) / c);
          let v = 0;
          T !== 0 && (v = nt(M) / c);
          const F = Ht + Mt * (S * g + v * T);
          F < f && (o = u, f = F, l = x.candidate);
        }
      } else {
        for (let y = 0; y < N; y++) {
          const b = k[y];
          b.count = 0, b.candidate = h + A + y * A;
          const x = b.bounds;
          for (let g = 0; g < 3; g++)
            x[g] = 1 / 0, x[g + 3] = -1 / 0;
        }
        for (let y = a; y < p; y += 6) {
          let g = ~~((e[y + 2 * u] - h) / A);
          g >= N && (g = N - 1);
          const T = k[g];
          T.count++, pt(y, e, T.bounds);
        }
        const d = k[N - 1];
        kt(d.bounds, d.rightCacheBounds);
        for (let y = N - 2; y >= 0; y--) {
          const b = k[y], x = k[y + 1];
          Xt(b.bounds, x.rightCacheBounds, b.rightCacheBounds);
        }
        let m = 0;
        for (let y = 0; y < N - 1; y++) {
          const b = k[y], x = b.count, g = b.bounds, B = k[y + 1].rightCacheBounds;
          x !== 0 && (m === 0 ? kt(g, dt) : Xt(g, dt, dt)), m += x;
          let M = 0, S = 0;
          m !== 0 && (M = nt(dt) / c);
          const v = s - m;
          v !== 0 && (S = nt(B) / c);
          const F = Ht + Mt * (M * m + S * v);
          F < f && (o = u, f = F, l = b.candidate);
        }
      }
    }
  } else
    console.warn(`MeshBVH: Invalid build strategy value ${r} used.`);
  return { axis: o, pos: l };
}
function Ce(i, t, e, n) {
  let s = 0;
  for (let r = t, o = t + e; r < o; r++)
    s += i[r * 6 + n * 2];
  return s / e;
}
function ze(i, t) {
  const e = i.attributes.position, n = i.index.array, s = n.length / 3, r = new Float32Array(s * 6), o = e.normalized, l = e.array, c = e.offset || 0;
  let f = 3;
  e.isInterleavedBufferAttribute && (f = e.data.stride);
  const a = ["getX", "getY", "getZ"];
  for (let p = 0; p < s; p++) {
    const u = p * 3, h = p * 6;
    let w, P, A;
    o ? (w = n[u + 0], P = n[u + 1], A = n[u + 2]) : (w = n[u + 0] * f + c, P = n[u + 1] * f + c, A = n[u + 2] * f + c);
    for (let d = 0; d < 3; d++) {
      let m, y, b;
      o ? (m = e[a[d]](w), y = e[a[d]](P), b = e[a[d]](A)) : (m = l[w + d], y = l[P + d], b = l[A + d]);
      let x = m;
      y < x && (x = y), b < x && (x = b);
      let g = m;
      y > g && (g = y), b > g && (g = b);
      const T = (g - x) / 2, B = d * 2;
      r[h + B + 0] = x + T, r[h + B + 1] = T + (Math.abs(x) + T) * Te, x < t[d] && (t[d] = x), g > t[d + 3] && (t[d + 3] = g);
    }
  }
  return r;
}
function Ve(i, t) {
  function e(d) {
    u && u(d / h);
  }
  function n(d, m, y, b = null, x = 0) {
    if (!w && x >= c && (w = !0, f && (console.warn(`MeshBVH: Max depth of ${c} reached when generating BVH. Consider increasing maxDepth.`), console.warn(i))), y <= a || x >= c)
      return e(m + y), d.offset = m, d.count = y, d;
    const g = Fe(d.boundingData, b, o, m, y, p);
    if (g.axis === -1)
      return e(m + y), d.offset = m, d.count = y, d;
    const T = ve(l, o, m, y, g);
    if (T === m || T === m + y)
      e(m + y), d.offset = m, d.count = y;
    else {
      d.splitAxis = g.axis;
      const B = new ut(), M = m, S = T - m;
      d.left = B, B.boundingData = new Float32Array(6), St(o, M, S, B.boundingData, r), n(B, M, S, r, x + 1);
      const v = new ut(), F = T, I = y - S;
      d.right = v, v.boundingData = new Float32Array(6), St(o, F, I, v.boundingData, r), n(v, F, I, r, x + 1);
    }
    return d;
  }
  Be(i, t);
  const s = new Float32Array(6), r = new Float32Array(6), o = ze(i, s), l = i.index.array, c = t.maxDepth, f = t.verbose, a = t.maxLeafTris, p = t.strategy, u = t.onProgress, h = i.index.count / 3;
  let w = !1;
  const P = [], A = Me(i);
  if (A.length === 1) {
    const d = A[0], m = new ut();
    m.boundingData = s, Se(o, d.offset, d.count, r), n(m, d.offset, d.count, r), P.push(m);
  } else
    for (let d of A) {
      const m = new ut();
      m.boundingData = new Float32Array(6), St(o, d.offset, d.count, m.boundingData, r), n(m, d.offset, d.count, r), P.push(m);
    }
  return P;
}
function Ee(i, t) {
  const e = Ve(i, t);
  let n, s, r;
  const o = [], l = t.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer;
  for (let a = 0; a < e.length; a++) {
    const p = e[a];
    let u = c(p);
    const h = new l(bt * u);
    n = new Float32Array(h), s = new Uint32Array(h), r = new Uint16Array(h), f(0, p), o.push(h);
  }
  return o;
  function c(a) {
    return a.count ? 1 : 1 + c(a.left) + c(a.right);
  }
  function f(a, p) {
    const u = a / 4, h = a / 2, w = !!p.count, P = p.boundingData;
    for (let A = 0; A < 6; A++)
      n[u + A] = P[A];
    if (w) {
      const A = p.offset, d = p.count;
      return s[u + 6] = A, r[h + 14] = d, r[h + 15] = zt, a + bt;
    } else {
      const A = p.left, d = p.right, m = p.splitAxis;
      let y;
      if (y = f(a + bt, A), y / 4 > Math.pow(2, 32))
        throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");
      return s[u + 6] = y / 4, y = f(y, d), s[u + 7] = m, y;
    }
  }
}
class R {
  constructor() {
    this.min = 1 / 0, this.max = -1 / 0;
  }
  setFromPointsField(t, e) {
    let n = 1 / 0, s = -1 / 0;
    for (let r = 0, o = t.length; r < o; r++) {
      const c = t[r][e];
      n = c < n ? c : n, s = c > s ? c : s;
    }
    this.min = n, this.max = s;
  }
  setFromPoints(t, e) {
    let n = 1 / 0, s = -1 / 0;
    for (let r = 0, o = e.length; r < o; r++) {
      const l = e[r], c = t.dot(l);
      n = c < n ? c : n, s = c > s ? c : s;
    }
    this.min = n, this.max = s;
  }
  isSeparated(t) {
    return this.min > t.max || t.min > this.max;
  }
}
R.prototype.setFromBox = function() {
  const i = new C();
  return function(e, n) {
    const s = n.min, r = n.max;
    let o = 1 / 0, l = -1 / 0;
    for (let c = 0; c <= 1; c++)
      for (let f = 0; f <= 1; f++)
        for (let a = 0; a <= 1; a++) {
          i.x = s.x * c + r.x * (1 - c), i.y = s.y * f + r.y * (1 - f), i.z = s.z * a + r.z * (1 - a);
          const p = e.dot(i);
          o = Math.min(p, o), l = Math.max(p, l);
        }
    this.min = o, this.max = l;
  };
}();
(function() {
  const i = new R();
  return function(e, n) {
    const s = e.points, r = e.satAxes, o = e.satBounds, l = n.points, c = n.satAxes, f = n.satBounds;
    for (let a = 0; a < 3; a++) {
      const p = o[a], u = r[a];
      if (i.setFromPoints(u, l), p.isSeparated(i))
        return !1;
    }
    for (let a = 0; a < 3; a++) {
      const p = f[a], u = c[a];
      if (i.setFromPoints(u, s), p.isSeparated(i))
        return !1;
    }
  };
})();
const Le = function() {
  const i = new C(), t = new C(), e = new C();
  return function(s, r, o) {
    const l = s.start, c = i, f = r.start, a = t;
    e.subVectors(l, f), i.subVectors(s.end, s.start), t.subVectors(r.end, r.start);
    const p = e.dot(a), u = a.dot(c), h = a.dot(a), w = e.dot(c), A = c.dot(c) * h - u * u;
    let d, m;
    A !== 0 ? d = (p * u - w * h) / A : d = 0, m = (p + d * u) / h, o.x = d, o.y = m;
  };
}(), _t = function() {
  const i = new ft(), t = new C(), e = new C();
  return function(s, r, o, l) {
    Le(s, r, i);
    let c = i.x, f = i.y;
    if (c >= 0 && c <= 1 && f >= 0 && f <= 1) {
      s.at(c, o), r.at(f, l);
      return;
    } else if (c >= 0 && c <= 1) {
      f < 0 ? r.at(0, l) : r.at(1, l), s.closestPointToPoint(l, !0, o);
      return;
    } else if (f >= 0 && f <= 1) {
      c < 0 ? s.at(0, o) : s.at(1, o), r.closestPointToPoint(o, !0, l);
      return;
    } else {
      let a;
      c < 0 ? a = s.start : a = s.end;
      let p;
      f < 0 ? p = r.start : p = r.end;
      const u = t, h = e;
      if (s.closestPointToPoint(p, !0, t), r.closestPointToPoint(a, !0, e), u.distanceToSquared(p) <= h.distanceToSquared(a)) {
        o.copy(u), l.copy(p);
        return;
      } else {
        o.copy(a), l.copy(h);
        return;
      }
    }
  };
}(), Ue = function() {
  const i = new C(), t = new C(), e = new Qt(), n = new H();
  return function(r, o) {
    const { radius: l, center: c } = r, { a: f, b: a, c: p } = o;
    if (n.start = f, n.end = a, n.closestPointToPoint(c, !0, i).distanceTo(c) <= l || (n.start = f, n.end = p, n.closestPointToPoint(c, !0, i).distanceTo(c) <= l) || (n.start = a, n.end = p, n.closestPointToPoint(c, !0, i).distanceTo(c) <= l))
      return !0;
    const P = o.getPlane(e);
    if (Math.abs(P.distanceToPoint(c)) <= l) {
      const d = P.projectPoint(c, t);
      if (o.containsPoint(d))
        return !0;
    }
    return !1;
  };
}(), _e = 1e-15;
function K(i) {
  return Math.abs(i) < _e;
}
class O extends Ct {
  constructor(...t) {
    super(...t), this.isExtendedTriangle = !0, this.satAxes = new Array(4).fill().map(() => new C()), this.satBounds = new Array(4).fill().map(() => new R()), this.points = [this.a, this.b, this.c], this.sphere = new re(), this.plane = new Qt(), this.needsUpdate = !0;
  }
  intersectsSphere(t) {
    return Ue(t, this);
  }
  update() {
    const t = this.a, e = this.b, n = this.c, s = this.points, r = this.satAxes, o = this.satBounds, l = r[0], c = o[0];
    this.getNormal(l), c.setFromPoints(l, s);
    const f = r[1], a = o[1];
    f.subVectors(t, e), a.setFromPoints(f, s);
    const p = r[2], u = o[2];
    p.subVectors(e, n), u.setFromPoints(p, s);
    const h = r[3], w = o[3];
    h.subVectors(n, t), w.setFromPoints(h, s), this.sphere.setFromPoints(this.points), this.plane.setFromNormalAndCoplanarPoint(l, t), this.needsUpdate = !1;
  }
}
O.prototype.closestPointToSegment = function() {
  const i = new C(), t = new C(), e = new H();
  return function(s, r = null, o = null) {
    const { start: l, end: c } = s, f = this.points;
    let a, p = 1 / 0;
    for (let u = 0; u < 3; u++) {
      const h = (u + 1) % 3;
      e.start.copy(f[u]), e.end.copy(f[h]), _t(e, s, i, t), a = i.distanceToSquared(t), a < p && (p = a, r && r.copy(i), o && o.copy(t));
    }
    return this.closestPointToPoint(l, i), a = l.distanceToSquared(i), a < p && (p = a, r && r.copy(i), o && o.copy(l)), this.closestPointToPoint(c, i), a = c.distanceToSquared(i), a < p && (p = a, r && r.copy(i), o && o.copy(c)), Math.sqrt(p);
  };
}();
O.prototype.intersectsTriangle = function() {
  const i = new O(), t = new Array(3), e = new Array(3), n = new R(), s = new R(), r = new C(), o = new C(), l = new C(), c = new C(), f = new H(), a = new H(), p = new H();
  return function(h, w = null) {
    this.needsUpdate && this.update(), h.isExtendedTriangle ? h.needsUpdate && h.update() : (i.copy(h), i.update(), h = i);
    const P = this.plane, A = h.plane;
    if (Math.abs(P.normal.dot(A.normal)) > 1 - 1e-10) {
      const d = this.satBounds, m = this.satAxes;
      e[0] = h.a, e[1] = h.b, e[2] = h.c;
      for (let x = 0; x < 4; x++) {
        const g = d[x], T = m[x];
        if (n.setFromPoints(T, e), g.isSeparated(n))
          return !1;
      }
      const y = h.satBounds, b = h.satAxes;
      t[0] = this.a, t[1] = this.b, t[2] = this.c;
      for (let x = 0; x < 4; x++) {
        const g = y[x], T = b[x];
        if (n.setFromPoints(T, t), g.isSeparated(n))
          return !1;
      }
      for (let x = 0; x < 4; x++) {
        const g = m[x];
        for (let T = 0; T < 4; T++) {
          const B = b[T];
          if (r.crossVectors(g, B), n.setFromPoints(r, t), s.setFromPoints(r, e), n.isSeparated(s))
            return !1;
        }
      }
      return w && (console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."), w.start.set(0, 0, 0), w.end.set(0, 0, 0)), !0;
    } else {
      const d = this.points;
      let m = !1, y = 0;
      for (let I = 0; I < 3; I++) {
        const z = d[I], V = d[(I + 1) % 3];
        f.start.copy(z), f.end.copy(V), f.delta(o);
        const L = m ? a.start : a.end, E = K(A.distanceToPoint(z));
        if (K(A.normal.dot(o)) && E) {
          a.copy(f), y = 2;
          break;
        }
        if ((A.intersectLine(f, L) || E) && !K(L.distanceTo(V))) {
          if (y++, m)
            break;
          m = !0;
        }
      }
      if (y === 1 && this.containsPoint(a.end))
        return w && (w.start.copy(a.end), w.end.copy(a.end)), !0;
      if (y !== 2)
        return !1;
      const b = h.points;
      let x = !1, g = 0;
      for (let I = 0; I < 3; I++) {
        const z = b[I], V = b[(I + 1) % 3];
        f.start.copy(z), f.end.copy(V), f.delta(l);
        const L = x ? p.start : p.end, E = K(P.distanceToPoint(z));
        if (K(P.normal.dot(l)) && E) {
          p.copy(f), g = 2;
          break;
        }
        if ((P.intersectLine(f, L) || E) && !K(L.distanceTo(V))) {
          if (g++, x)
            break;
          x = !0;
        }
      }
      if (g === 1 && this.containsPoint(p.end))
        return w && (w.start.copy(p.end), w.end.copy(p.end)), !0;
      if (g !== 2)
        return !1;
      if (a.delta(o), p.delta(l), o.dot(l) < 0) {
        let I = p.start;
        p.start = p.end, p.end = I;
      }
      const T = a.start.dot(o), B = a.end.dot(o), M = p.start.dot(o), S = p.end.dot(o), v = B < M, F = T < S;
      return T !== S && M !== B && v === F ? !1 : (w && (c.subVectors(a.start, p.start), c.dot(o) > 0 ? w.start.copy(a.start) : w.start.copy(p.start), c.subVectors(a.end, p.end), c.dot(o) < 0 ? w.end.copy(a.end) : w.end.copy(p.end)), !0);
    }
  };
}();
O.prototype.distanceToPoint = function() {
  const i = new C();
  return function(e) {
    return this.closestPointToPoint(e, i), e.distanceTo(i);
  };
}();
O.prototype.distanceToTriangle = function() {
  const i = new C(), t = new C(), e = ["a", "b", "c"], n = new H(), s = new H();
  return function(o, l = null, c = null) {
    const f = l || c ? n : null;
    if (this.intersectsTriangle(o, f))
      return (l || c) && (l && f.getCenter(l), c && f.getCenter(c)), 0;
    let a = 1 / 0;
    for (let p = 0; p < 3; p++) {
      let u;
      const h = e[p], w = o[h];
      this.closestPointToPoint(w, i), u = w.distanceToSquared(i), u < a && (a = u, l && l.copy(i), c && c.copy(w));
      const P = this[h];
      o.closestPointToPoint(P, i), u = P.distanceToSquared(i), u < a && (a = u, l && l.copy(P), c && c.copy(i));
    }
    for (let p = 0; p < 3; p++) {
      const u = e[p], h = e[(p + 1) % 3];
      n.set(this[u], this[h]);
      for (let w = 0; w < 3; w++) {
        const P = e[w], A = e[(w + 1) % 3];
        s.set(o[P], o[A]), _t(n, s, i, t);
        const d = i.distanceToSquared(t);
        d < a && (a = d, l && l.copy(i), c && c.copy(t));
      }
    }
    return Math.sqrt(a);
  };
}();
class q extends Y {
  constructor(...t) {
    super(...t), this.isOrientedBox = !0, this.matrix = new Pt(), this.invMatrix = new Pt(), this.points = new Array(8).fill().map(() => new C()), this.satAxes = new Array(3).fill().map(() => new C()), this.satBounds = new Array(3).fill().map(() => new R()), this.alignedSatBounds = new Array(3).fill().map(() => new R()), this.needsUpdate = !1;
  }
  set(t, e, n) {
    super.set(t, e), this.matrix.copy(n), this.needsUpdate = !0;
  }
  copy(t) {
    super.copy(t), this.matrix.copy(t.matrix), this.needsUpdate = !0;
  }
}
q.prototype.update = function() {
  return function() {
    const t = this.matrix, e = this.min, n = this.max, s = this.points;
    for (let f = 0; f <= 1; f++)
      for (let a = 0; a <= 1; a++)
        for (let p = 0; p <= 1; p++) {
          const u = 1 * f | 2 * a | 4 * p, h = s[u];
          h.x = f ? n.x : e.x, h.y = a ? n.y : e.y, h.z = p ? n.z : e.z, h.applyMatrix4(t);
        }
    const r = this.satBounds, o = this.satAxes, l = s[0];
    for (let f = 0; f < 3; f++) {
      const a = o[f], p = r[f], u = 1 << f, h = s[u];
      a.subVectors(l, h), p.setFromPoints(a, s);
    }
    const c = this.alignedSatBounds;
    c[0].setFromPointsField(s, "x"), c[1].setFromPointsField(s, "y"), c[2].setFromPointsField(s, "z"), this.invMatrix.copy(this.matrix).invert(), this.needsUpdate = !1;
  };
}();
q.prototype.intersectsBox = function() {
  const i = new R();
  return function(e) {
    this.needsUpdate && this.update();
    const n = e.min, s = e.max, r = this.satBounds, o = this.satAxes, l = this.alignedSatBounds;
    if (i.min = n.x, i.max = s.x, l[0].isSeparated(i) || (i.min = n.y, i.max = s.y, l[1].isSeparated(i)) || (i.min = n.z, i.max = s.z, l[2].isSeparated(i)))
      return !1;
    for (let c = 0; c < 3; c++) {
      const f = o[c], a = r[c];
      if (i.setFromBox(f, e), a.isSeparated(i))
        return !1;
    }
    return !0;
  };
}();
q.prototype.intersectsTriangle = function() {
  const i = new O(), t = new Array(3), e = new R(), n = new R(), s = new C();
  return function(o) {
    this.needsUpdate && this.update(), o.isExtendedTriangle ? o.needsUpdate && o.update() : (i.copy(o), i.update(), o = i);
    const l = this.satBounds, c = this.satAxes;
    t[0] = o.a, t[1] = o.b, t[2] = o.c;
    for (let u = 0; u < 3; u++) {
      const h = l[u], w = c[u];
      if (e.setFromPoints(w, t), h.isSeparated(e))
        return !1;
    }
    const f = o.satBounds, a = o.satAxes, p = this.points;
    for (let u = 0; u < 3; u++) {
      const h = f[u], w = a[u];
      if (e.setFromPoints(w, p), h.isSeparated(e))
        return !1;
    }
    for (let u = 0; u < 3; u++) {
      const h = c[u];
      for (let w = 0; w < 4; w++) {
        const P = a[w];
        if (s.crossVectors(h, P), e.setFromPoints(s, t), n.setFromPoints(s, p), e.isSeparated(n))
          return !1;
      }
    }
    return !0;
  };
}();
q.prototype.closestPointToPoint = function() {
  return function(t, e) {
    return this.needsUpdate && this.update(), e.copy(t).applyMatrix4(this.invMatrix).clamp(this.min, this.max).applyMatrix4(this.matrix), e;
  };
}();
q.prototype.distanceToPoint = function() {
  const i = new C();
  return function(e) {
    return this.closestPointToPoint(e, i), e.distanceTo(i);
  };
}();
q.prototype.distanceToBox = function() {
  const i = ["x", "y", "z"], t = new Array(12).fill().map(() => new H()), e = new Array(12).fill().map(() => new H()), n = new C(), s = new C();
  return function(o, l = 0, c = null, f = null) {
    if (this.needsUpdate && this.update(), this.intersectsBox(o))
      return (c || f) && (o.getCenter(s), this.closestPointToPoint(s, n), o.closestPointToPoint(n, s), c && c.copy(n), f && f.copy(s)), 0;
    const a = l * l, p = o.min, u = o.max, h = this.points;
    let w = 1 / 0;
    for (let A = 0; A < 8; A++) {
      const d = h[A];
      s.copy(d).clamp(p, u);
      const m = d.distanceToSquared(s);
      if (m < w && (w = m, c && c.copy(d), f && f.copy(s), m < a))
        return Math.sqrt(m);
    }
    let P = 0;
    for (let A = 0; A < 3; A++)
      for (let d = 0; d <= 1; d++)
        for (let m = 0; m <= 1; m++) {
          const y = (A + 1) % 3, b = (A + 2) % 3, x = d << y | m << b, g = 1 << A | d << y | m << b, T = h[x], B = h[g];
          t[P].set(T, B);
          const S = i[A], v = i[y], F = i[b], I = e[P], z = I.start, V = I.end;
          z[S] = p[S], z[v] = d ? p[v] : u[v], z[F] = m ? p[F] : u[v], V[S] = u[S], V[v] = d ? p[v] : u[v], V[F] = m ? p[F] : u[v], P++;
        }
    for (let A = 0; A <= 1; A++)
      for (let d = 0; d <= 1; d++)
        for (let m = 0; m <= 1; m++) {
          s.x = A ? u.x : p.x, s.y = d ? u.y : p.y, s.z = m ? u.z : p.z, this.closestPointToPoint(s, n);
          const y = s.distanceToSquared(n);
          if (y < w && (w = y, c && c.copy(n), f && f.copy(s), y < a))
            return Math.sqrt(y);
        }
    for (let A = 0; A < 12; A++) {
      const d = t[A];
      for (let m = 0; m < 12; m++) {
        const y = e[m];
        _t(d, y, n, s);
        const b = n.distanceToSquared(s);
        if (b < w && (w = b, c && c.copy(n), f && f.copy(s), b < a))
          return Math.sqrt(b);
      }
    }
    return Math.sqrt(w);
  };
}();
const ht = /* @__PURE__ */ new C(), yt = /* @__PURE__ */ new C(), mt = /* @__PURE__ */ new C(), jt = /* @__PURE__ */ new ft(), Wt = /* @__PURE__ */ new ft(), Yt = /* @__PURE__ */ new ft(), Zt = /* @__PURE__ */ new C();
function De(i, t, e, n, s, r) {
  let o;
  return r === ce ? o = i.intersectTriangle(n, e, t, !0, s) : o = i.intersectTriangle(t, e, n, r !== ae, s), o === null ? null : {
    distance: i.origin.distanceTo(s),
    point: s.clone()
  };
}
function Re(i, t, e, n, s, r, o) {
  ht.fromBufferAttribute(t, n), yt.fromBufferAttribute(t, s), mt.fromBufferAttribute(t, r);
  const l = De(i, ht, yt, mt, Zt, o);
  if (l) {
    e && (jt.fromBufferAttribute(e, n), Wt.fromBufferAttribute(e, s), Yt.fromBufferAttribute(e, r), l.uv = Ct.getUV(Zt, ht, yt, mt, jt, Wt, Yt, new ft()));
    const c = {
      a: n,
      b: s,
      c: r,
      normal: new C(),
      materialIndex: 0
    };
    Ct.getNormal(ht, yt, mt, c.normal), l.face = c, l.faceIndex = n;
  }
  return l;
}
function ee(i, t, e, n, s) {
  const r = n * 3, o = i.index.getX(r), l = i.index.getX(r + 1), c = i.index.getX(r + 2), f = Re(e, i.attributes.position, i.attributes.uv, o, l, c, t);
  return f ? (f.faceIndex = n, s && s.push(f), f) : null;
}
function qe(i, t, e, n, s, r) {
  for (let o = n, l = n + s; o < l; o++)
    ee(i, t, e, o, r);
}
function Ne(i, t, e, n, s) {
  let r = 1 / 0, o = null;
  for (let l = n, c = n + s; l < c; l++) {
    const f = ee(i, t, e, l);
    f && f.distance < r && (o = f, r = f.distance);
  }
  return o;
}
function D(i, t, e, n) {
  const s = i.a, r = i.b, o = i.c;
  let l = t, c = t + 1, f = t + 2;
  e && (l = e.getX(t), c = e.getX(t + 1), f = e.getX(t + 2)), s.x = n.getX(l), s.y = n.getY(l), s.z = n.getZ(l), r.x = n.getX(c), r.y = n.getY(c), r.z = n.getZ(c), o.x = n.getX(f), o.y = n.getY(f), o.z = n.getZ(f);
}
function Gt(i, t, e, n, s, r, o) {
  const l = e.index, c = e.attributes.position;
  for (let f = i, a = t + i; f < a; f++)
    if (D(o, f * 3, l, c), o.needsUpdate = !0, n(o, f, s, r))
      return !0;
  return !1;
}
class ne {
  constructor(t) {
    this._getNewPrimitive = t, this._primitives = [];
  }
  getPrimitive() {
    const t = this._primitives;
    return t.length === 0 ? this._getNewPrimitive() : t.pop();
  }
  releasePrimitive(t) {
    this._primitives.push(t);
  }
}
function X(i, t) {
  return t[i + 15] === 65535;
}
function tt(i, t) {
  return t[i + 6];
}
function ct(i, t) {
  return t[i + 14];
}
function at(i) {
  return i + 8;
}
function lt(i, t) {
  return t[i + 6];
}
function He(i, t) {
  return t[i + 7];
}
const Q = new Y(), Tt = new C(), Oe = ["x", "y", "z"];
function Vt(i, t, e, n, s) {
  let r = i * 2, o = et, l = j, c = W;
  if (X(r, l)) {
    const a = tt(i, c), p = ct(r, l);
    qe(t, e, n, a, p, s);
  } else {
    const a = at(i);
    Bt(a, o, n, Tt) && Vt(a, t, e, n, s);
    const p = lt(i, c);
    Bt(p, o, n, Tt) && Vt(p, t, e, n, s);
  }
}
function Et(i, t, e, n) {
  let s = i * 2, r = et, o = j, l = W;
  if (X(s, o)) {
    const f = tt(i, l), a = ct(s, o);
    return Ne(t, e, n, f, a);
  } else {
    const f = He(i, l), a = Oe[f], u = n.direction[a] >= 0;
    let h, w;
    u ? (h = at(i), w = lt(i, l)) : (h = lt(i, l), w = at(i));
    const A = Bt(h, r, n, Tt) ? Et(h, t, e, n) : null;
    if (A) {
      const y = A.point[a];
      if (u ? y <= r[w + f] : y >= r[w + f + 3])
        return A;
    }
    const m = Bt(w, r, n, Tt) ? Et(w, t, e, n) : null;
    return A && m ? A.distance <= m.distance ? A : m : A || m || null;
  }
}
const ke = function() {
  let i, t;
  const e = [], n = new ne(() => new Y());
  return function(...o) {
    i = n.getPrimitive(), t = n.getPrimitive(), e.push(i, t);
    const l = s(...o);
    n.releasePrimitive(i), n.releasePrimitive(t), e.pop(), e.pop();
    const c = e.length;
    return c > 0 && (t = e[c - 1], i = e[c - 2]), l;
  };
  function s(r, o, l, c, f = null, a = 0, p = 0) {
    function u(y) {
      let b = y * 2, x = j, g = W;
      for (; !X(b, x); )
        y = at(y), b = y * 2;
      return tt(y, g);
    }
    function h(y) {
      let b = y * 2, x = j, g = W;
      for (; !X(b, x); )
        y = lt(y, g), b = y * 2;
      return tt(y, g) + ct(b, x);
    }
    let w = r * 2, P = et, A = j, d = W;
    if (X(w, A)) {
      const y = tt(r, d), b = ct(w, A);
      return U(r, P, i), c(y, b, !1, p, a + r, i);
    } else {
      const y = at(r), b = lt(r, d);
      let x = y, g = b, T, B, M, S;
      if (f && (M = i, S = t, U(x, P, M), U(g, P, S), T = f(M), B = f(S), B < T)) {
        x = b, g = y;
        const E = T;
        T = B, B = E, M = S;
      }
      M || (M = i, U(x, P, M));
      const v = X(x * 2, A), F = l(M, v, T, p + 1, a + x);
      let I;
      if (F === Nt) {
        const E = u(x), $ = h(x) - E;
        I = c(E, $, !0, p + 1, a + x, M);
      } else
        I = F && s(
          x,
          o,
          l,
          c,
          f,
          a,
          p + 1
        );
      if (I)
        return !0;
      S = t, U(g, P, S);
      const z = X(g * 2, A), V = l(S, z, B, p + 1, a + g);
      let L;
      if (V === Nt) {
        const E = u(g), $ = h(g) - E;
        L = c(E, $, !0, p + 1, a + g, S);
      } else
        L = V && s(
          g,
          o,
          l,
          c,
          f,
          a,
          p + 1
        );
      return !!L;
    }
  }
}(), Xe = function() {
  const i = new O(), t = new O(), e = new Pt(), n = new q(), s = new q();
  return function r(o, l, c, f, a = null) {
    let p = o * 2, u = et, h = j, w = W;
    if (a === null && (c.boundingBox || c.computeBoundingBox(), n.set(c.boundingBox.min, c.boundingBox.max, f), a = n), X(p, h)) {
      const A = l, d = A.index, m = A.attributes.position, y = c.index, b = c.attributes.position, x = tt(o, w), g = ct(p, h);
      if (e.copy(f).invert(), c.boundsTree)
        return U(o, u, s), s.matrix.copy(e), s.needsUpdate = !0, c.boundsTree.shapecast({
          intersectsBounds: (B) => s.intersectsBox(B),
          intersectsTriangle: (B) => {
            B.a.applyMatrix4(f), B.b.applyMatrix4(f), B.c.applyMatrix4(f), B.needsUpdate = !0;
            for (let M = x * 3, S = (g + x) * 3; M < S; M += 3)
              if (D(t, M, d, m), t.needsUpdate = !0, B.intersectsTriangle(t))
                return !0;
            return !1;
          }
        });
      for (let T = x * 3, B = g + x * 3; T < B; T += 3) {
        D(i, T, d, m), i.a.applyMatrix4(e), i.b.applyMatrix4(e), i.c.applyMatrix4(e), i.needsUpdate = !0;
        for (let M = 0, S = y.count; M < S; M += 3)
          if (D(t, M, y, b), t.needsUpdate = !0, i.intersectsTriangle(t))
            return !0;
      }
    } else {
      const A = o + 8, d = w[o + 6];
      return U(A, u, Q), !!(a.intersectsBox(Q) && r(A, l, c, f, a) || (U(d, u, Q), a.intersectsBox(Q) && r(d, l, c, f, a)));
    }
  };
}();
function Bt(i, t, e, n) {
  return U(i, t, Q), e.intersectBox(Q, n);
}
const Lt = [];
let At, et, j, W;
function ot(i) {
  At && Lt.push(At), At = i, et = new Float32Array(i), j = new Uint16Array(i), W = new Uint32Array(i);
}
function xt() {
  At = null, et = null, j = null, W = null, Lt.length && ot(Lt.pop());
}
const vt = Symbol("skip tree generation"), It = /* @__PURE__ */ new Y(), Ft = /* @__PURE__ */ new Y(), J = /* @__PURE__ */ new Pt(), Z = /* @__PURE__ */ new q(), st = /* @__PURE__ */ new q(), it = /* @__PURE__ */ new C(), wt = /* @__PURE__ */ new C(), je = /* @__PURE__ */ new C(), We = /* @__PURE__ */ new C(), Ye = /* @__PURE__ */ new C(), $t = /* @__PURE__ */ new Y(), _ = /* @__PURE__ */ new ne(() => new O());
class rt {
  static serialize(t, e = {}) {
    if (e.isBufferGeometry)
      return console.warn("MeshBVH.serialize: The arguments for the function have changed. See documentation for new signature."), rt.serialize(
        arguments[0],
        {
          cloneBuffers: arguments[2] === void 0 ? !0 : arguments[2]
        }
      );
    e = {
      cloneBuffers: !0,
      ...e
    };
    const n = t.geometry, s = t._roots, r = n.getIndex();
    let o;
    return e.cloneBuffers ? o = {
      roots: s.map((l) => l.slice()),
      index: r.array.slice()
    } : o = {
      roots: s,
      index: r.array
    }, o;
  }
  static deserialize(t, e, n = {}) {
    if (typeof n == "boolean")
      return console.warn("MeshBVH.deserialize: The arguments for the function have changed. See documentation for new signature."), rt.deserialize(
        arguments[0],
        arguments[1],
        {
          setIndex: arguments[2] === void 0 ? !0 : arguments[2]
        }
      );
    n = {
      setIndex: !0,
      ...n
    };
    const { index: s, roots: r } = t, o = new rt(e, { ...n, [vt]: !0 });
    if (o._roots = r, n.setIndex) {
      const l = e.getIndex();
      if (l === null) {
        const c = new gt(t.index, 1, !1);
        e.setIndex(c);
      } else
        l.array !== s && (l.array.set(s), l.needsUpdate = !0);
    }
    return o;
  }
  constructor(t, e = {}) {
    if (t.isBufferGeometry) {
      if (t.index && t.index.isInterleavedBufferAttribute)
        throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.");
    } else
      throw new Error("MeshBVH: Only BufferGeometries are supported.");
    if (e = Object.assign({
      strategy: te,
      maxDepth: 40,
      maxLeafTris: 10,
      verbose: !0,
      useSharedArrayBuffer: !1,
      setBoundingBox: !0,
      onProgress: null,
      [vt]: !1
    }, e), e.useSharedArrayBuffer && typeof SharedArrayBuffer > "u")
      throw new Error("MeshBVH: SharedArrayBuffer is not available.");
    this._roots = null, e[vt] || (this._roots = Ee(t, e), !t.boundingBox && e.setBoundingBox && (t.boundingBox = this.getBoundingBox(new Y()))), this.geometry = t;
  }
  refit(t = null) {
    t && Array.isArray(t) && (t = new Set(t));
    const e = this.geometry, n = e.index.array, s = e.attributes.position;
    let r, o, l, c, f = 0;
    const a = this._roots;
    for (let u = 0, h = a.length; u < h; u++)
      r = a[u], o = new Uint32Array(r), l = new Uint16Array(r), c = new Float32Array(r), p(0, f), f += r.byteLength;
    function p(u, h, w = !1) {
      const P = u * 2;
      if (l[P + 15] === zt) {
        const d = o[u + 6], m = l[P + 14];
        let y = 1 / 0, b = 1 / 0, x = 1 / 0, g = -1 / 0, T = -1 / 0, B = -1 / 0;
        for (let M = 3 * d, S = 3 * (d + m); M < S; M++) {
          const v = n[M], F = s.getX(v), I = s.getY(v), z = s.getZ(v);
          F < y && (y = F), F > g && (g = F), I < b && (b = I), I > T && (T = I), z < x && (x = z), z > B && (B = z);
        }
        return c[u + 0] !== y || c[u + 1] !== b || c[u + 2] !== x || c[u + 3] !== g || c[u + 4] !== T || c[u + 5] !== B ? (c[u + 0] = y, c[u + 1] = b, c[u + 2] = x, c[u + 3] = g, c[u + 4] = T, c[u + 5] = B, !0) : !1;
      } else {
        const d = u + 8, m = o[u + 6], y = d + h, b = m + h;
        let x = w, g = !1, T = !1;
        t ? x || (g = t.has(y), T = t.has(b), x = !g && !T) : (g = !0, T = !0);
        const B = x || g, M = x || T;
        let S = !1;
        B && (S = p(d, h, x));
        let v = !1;
        M && (v = p(m, h, x));
        const F = S || v;
        if (F)
          for (let I = 0; I < 3; I++) {
            const z = d + I, V = m + I, L = c[z], E = c[z + 3], G = c[V], $ = c[V + 3];
            c[u + I] = L < G ? L : G, c[u + I + 3] = E > $ ? E : $;
          }
        return F;
      }
    }
  }
  traverse(t, e = 0) {
    const n = this._roots[e], s = new Uint32Array(n), r = new Uint16Array(n);
    o(0);
    function o(l, c = 0) {
      const f = l * 2, a = r[f + 15] === zt;
      if (a) {
        const p = s[l + 6], u = r[f + 14];
        t(c, a, new Float32Array(n, l * 4, 6), p, u);
      } else {
        const p = l + bt / 4, u = s[l + 6], h = s[l + 7];
        t(c, a, new Float32Array(n, l * 4, 6), h) || (o(p, c + 1), o(u, c + 1));
      }
    }
  }
  raycast(t, e = Rt) {
    const n = this._roots, s = this.geometry, r = [], o = e.isMaterial, l = Array.isArray(e), c = s.groups, f = o ? e.side : e;
    for (let a = 0, p = n.length; a < p; a++) {
      const u = l ? e[c[a].materialIndex].side : f, h = r.length;
      if (ot(n[a]), Vt(0, s, u, t, r), xt(), l) {
        const w = c[a].materialIndex;
        for (let P = h, A = r.length; P < A; P++)
          r[P].face.materialIndex = w;
      }
    }
    return r;
  }
  raycastFirst(t, e = Rt) {
    const n = this._roots, s = this.geometry, r = e.isMaterial, o = Array.isArray(e);
    let l = null;
    const c = s.groups, f = r ? e.side : e;
    for (let a = 0, p = n.length; a < p; a++) {
      const u = o ? e[c[a].materialIndex].side : f;
      ot(n[a]);
      const h = Et(0, s, u, t);
      xt(), h != null && (l == null || h.distance < l.distance) && (l = h, o && (h.face.materialIndex = c[a].materialIndex));
    }
    return l;
  }
  intersectsGeometry(t, e) {
    const n = this.geometry;
    let s = !1;
    for (const r of this._roots)
      if (ot(r), s = Xe(0, n, t, e), xt(), s)
        break;
    return s;
  }
  shapecast(t, e, n) {
    const s = this.geometry;
    if (t instanceof Function) {
      if (e) {
        const u = e;
        e = (h, w, P, A) => {
          const d = w * 3;
          return u(h, d, d + 1, d + 2, P, A);
        };
      }
      t = {
        boundsTraverseOrder: n,
        intersectsBounds: t,
        intersectsTriangle: e,
        intersectsRange: null
      }, console.warn("MeshBVH: Shapecast function signature has changed and now takes an object of callbacks as a second argument. See docs for new signature.");
    }
    const r = _.getPrimitive();
    let {
      boundsTraverseOrder: o,
      intersectsBounds: l,
      intersectsRange: c,
      intersectsTriangle: f
    } = t;
    if (c && f) {
      const u = c;
      c = (h, w, P, A, d) => u(h, w, P, A, d) ? !0 : Gt(h, w, s, f, P, A, r);
    } else
      c || (f ? c = (u, h, w, P) => Gt(u, h, s, f, w, P, r) : c = (u, h, w) => w);
    let a = !1, p = 0;
    for (const u of this._roots) {
      if (ot(u), a = ke(0, s, l, c, o, p), xt(), a)
        break;
      p += u.byteLength;
    }
    return _.releasePrimitive(r), a;
  }
  bvhcast(t, e, n) {
    let {
      intersectsRanges: s,
      intersectsTriangles: r
    } = n;
    const o = this.geometry.index, l = this.geometry.attributes.position, c = t.geometry.index, f = t.geometry.attributes.position;
    J.copy(e).invert();
    const a = _.getPrimitive(), p = _.getPrimitive();
    if (r) {
      let h = function(w, P, A, d, m, y, b, x) {
        for (let g = A, T = A + d; g < T; g++) {
          D(p, g * 3, c, f), p.a.applyMatrix4(e), p.b.applyMatrix4(e), p.c.applyMatrix4(e), p.needsUpdate = !0;
          for (let B = w, M = w + P; B < M; B++)
            if (D(a, B * 3, o, l), a.needsUpdate = !0, r(a, p, B, g, m, y, b, x))
              return !0;
        }
        return !1;
      };
      if (s) {
        const w = s;
        s = function(P, A, d, m, y, b, x, g) {
          return w(P, A, d, m, y, b, x, g) ? !0 : h(P, A, d, m, y, b, x, g);
        };
      } else
        s = h;
    }
    t.getBoundingBox(Ft), Ft.applyMatrix4(e);
    const u = this.shapecast({
      intersectsBounds: (h) => Ft.intersectsBox(h),
      intersectsRange: (h, w, P, A, d, m) => (It.copy(m), It.applyMatrix4(J), t.shapecast({
        intersectsBounds: (y) => It.intersectsBox(y),
        intersectsRange: (y, b, x, g, T) => s(h, w, y, b, A, d, g, T)
      }))
    });
    return _.releasePrimitive(a), _.releasePrimitive(p), u;
  }
  intersectsBox(t, e) {
    return Z.set(t.min, t.max, e), Z.needsUpdate = !0, this.shapecast(
      {
        intersectsBounds: (n) => Z.intersectsBox(n),
        intersectsTriangle: (n) => Z.intersectsTriangle(n)
      }
    );
  }
  intersectsSphere(t) {
    return this.shapecast(
      {
        intersectsBounds: (e) => t.intersectsBox(e),
        intersectsTriangle: (e) => e.intersectsSphere(t)
      }
    );
  }
  closestPointToGeometry(t, e, n = {}, s = {}, r = 0, o = 1 / 0) {
    t.boundingBox || t.computeBoundingBox(), Z.set(t.boundingBox.min, t.boundingBox.max, e), Z.needsUpdate = !0;
    const l = this.geometry, c = l.attributes.position, f = l.index, a = t.attributes.position, p = t.index, u = _.getPrimitive(), h = _.getPrimitive();
    let w = wt, P = je, A = null, d = null;
    s && (A = We, d = Ye);
    let m = 1 / 0, y = null, b = null;
    return J.copy(e).invert(), st.matrix.copy(J), this.shapecast(
      {
        boundsTraverseOrder: (x) => Z.distanceToBox(x),
        intersectsBounds: (x, g, T) => T < m && T < o ? (g && (st.min.copy(x.min), st.max.copy(x.max), st.needsUpdate = !0), !0) : !1,
        intersectsRange: (x, g) => {
          if (t.boundsTree)
            return t.boundsTree.shapecast({
              boundsTraverseOrder: (T) => st.distanceToBox(T),
              intersectsBounds: (T, B, M) => M < m && M < o,
              intersectsRange: (T, B) => {
                for (let M = T * 3, S = (T + B) * 3; M < S; M += 3) {
                  D(h, M, p, a), h.a.applyMatrix4(e), h.b.applyMatrix4(e), h.c.applyMatrix4(e), h.needsUpdate = !0;
                  for (let v = x * 3, F = (x + g) * 3; v < F; v += 3) {
                    D(u, v, f, c), u.needsUpdate = !0;
                    const I = u.distanceToTriangle(h, w, A);
                    if (I < m && (P.copy(w), d && d.copy(A), m = I, y = v / 3, b = M / 3), I < r)
                      return !0;
                  }
                }
              }
            });
          {
            const T = p ? p.count : a.count;
            for (let B = 0, M = T; B < M; B += 3) {
              D(h, B, p, a), h.a.applyMatrix4(e), h.b.applyMatrix4(e), h.c.applyMatrix4(e), h.needsUpdate = !0;
              for (let S = x * 3, v = (x + g) * 3; S < v; S += 3) {
                D(u, S, f, c), u.needsUpdate = !0;
                const F = u.distanceToTriangle(h, w, A);
                if (F < m && (P.copy(w), d && d.copy(A), m = F, y = S / 3, b = B / 3), F < r)
                  return !0;
              }
            }
          }
        }
      }
    ), _.releasePrimitive(u), _.releasePrimitive(h), m === 1 / 0 ? null : (n.point ? n.point.copy(P) : n.point = P.clone(), n.distance = m, n.faceIndex = y, s && (s.point ? s.point.copy(d) : s.point = d.clone(), s.point.applyMatrix4(J), P.applyMatrix4(J), s.distance = P.sub(s.point).length(), s.faceIndex = b), n);
  }
  closestPointToPoint(t, e = {}, n = 0, s = 1 / 0) {
    const r = n * n, o = s * s;
    let l = 1 / 0, c = null;
    if (this.shapecast(
      {
        boundsTraverseOrder: (a) => (it.copy(t).clamp(a.min, a.max), it.distanceToSquared(t)),
        intersectsBounds: (a, p, u) => u < l && u < o,
        intersectsTriangle: (a, p) => {
          a.closestPointToPoint(t, it);
          const u = t.distanceToSquared(it);
          return u < l && (wt.copy(it), l = u, c = p), u < r;
        }
      }
    ), l === 1 / 0)
      return null;
    const f = Math.sqrt(l);
    return e.point ? e.point.copy(wt) : e.point = wt.clone(), e.distance = f, e.faceIndex = c, e;
  }
  getBoundingBox(t) {
    return t.makeEmpty(), this._roots.forEach((n) => {
      U(0, new Float32Array(n), $t), t.union($t);
    }), t;
  }
}
const Kt = /* @__PURE__ */ new Y();
class Ze extends le {
  get isMesh() {
    return !this.displayEdges;
  }
  get isLineSegments() {
    return this.displayEdges;
  }
  get isLine() {
    return this.displayEdges;
  }
  constructor(t, e, n = 10, s = 0) {
    super(), this.material = e, this.geometry = new fe(), this.name = "MeshBVHRootVisualizer", this.depth = n, this.displayParents = !1, this.mesh = t, this.displayEdges = !0, this._group = s;
  }
  raycast() {
  }
  update() {
    const t = this.geometry, e = this.mesh.geometry.boundsTree, n = this._group;
    if (t.dispose(), this.visible = !1, e) {
      const s = this.depth - 1, r = this.displayParents;
      let o = 0;
      e.traverse((u, h) => {
        if (u === s || h)
          return o++, !0;
        r && o++;
      }, n);
      let l = 0;
      const c = new Float32Array(8 * 3 * o);
      e.traverse((u, h, w) => {
        const P = u === s || h;
        if (P || r) {
          U(0, w, Kt);
          const { min: A, max: d } = Kt;
          for (let m = -1; m <= 1; m += 2) {
            const y = m < 0 ? A.x : d.x;
            for (let b = -1; b <= 1; b += 2) {
              const x = b < 0 ? A.y : d.y;
              for (let g = -1; g <= 1; g += 2) {
                const T = g < 0 ? A.z : d.z;
                c[l + 0] = y, c[l + 1] = x, c[l + 2] = T, l += 3;
              }
            }
          }
          return P;
        }
      }, n);
      let f, a;
      this.displayEdges ? a = new Uint8Array([
        0,
        4,
        1,
        5,
        2,
        6,
        3,
        7,
        0,
        2,
        1,
        3,
        4,
        6,
        5,
        7,
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ]) : a = new Uint8Array([
        0,
        1,
        2,
        2,
        1,
        3,
        4,
        6,
        5,
        6,
        7,
        5,
        1,
        4,
        5,
        0,
        4,
        1,
        2,
        3,
        6,
        3,
        7,
        6,
        0,
        2,
        4,
        2,
        6,
        4,
        1,
        5,
        3,
        3,
        5,
        7
      ]), c.length > 65535 ? f = new Uint32Array(a.length * o) : f = new Uint16Array(a.length * o);
      const p = a.length;
      for (let u = 0; u < o; u++) {
        const h = u * 8, w = u * p;
        for (let P = 0; P < p; P++)
          f[w + P] = h + a[P];
      }
      t.setIndex(
        new gt(f, 1, !1)
      ), t.setAttribute(
        "position",
        new gt(c, 3, !1)
      ), this.visible = !0;
    }
  }
}
class Dt extends ue {
  get color() {
    return this.edgeMaterial.color;
  }
  get opacity() {
    return this.edgeMaterial.opacity;
  }
  set opacity(t) {
    this.edgeMaterial.opacity = t, this.meshMaterial.opacity = t;
  }
  constructor(t, e = 10) {
    super(), this.name = "MeshBVHVisualizer", this.depth = e, this.mesh = t, this.displayParents = !1, this.displayEdges = !0, this._roots = [];
    const n = new pe({
      color: 65416,
      transparent: !0,
      opacity: 0.3,
      depthWrite: !1
    }), s = new de({
      color: 65416,
      transparent: !0,
      opacity: 0.3,
      depthWrite: !1
    });
    s.color = n.color, this.edgeMaterial = n, this.meshMaterial = s, this.update();
  }
  update() {
    const t = this.mesh.geometry.boundsTree, e = t ? t._roots.length : 0;
    for (; this._roots.length > e; ) {
      const n = this._roots.pop();
      n.geometry.dispose(), this.remove(n);
    }
    for (let n = 0; n < e; n++) {
      if (n >= this._roots.length) {
        const r = new Ze(this.mesh, this.edgeMaterial, this.depth, n);
        this.add(r), this._roots.push(r);
      }
      const s = this._roots[n];
      s.depth = this.depth, s.mesh = this.mesh, s.displayParents = this.displayParents, s.displayEdges = this.displayEdges, s.material = this.displayEdges ? this.edgeMaterial : this.meshMaterial, s.update();
    }
  }
  updateMatrixWorld(...t) {
    this.position.copy(this.mesh.position), this.rotation.copy(this.mesh.rotation), this.scale.copy(this.mesh.scale), super.updateMatrixWorld(...t);
  }
  copy(t) {
    this.depth = t.depth, this.mesh = t.mesh;
  }
  clone() {
    return new Dt(this.mesh, this.depth);
  }
  dispose() {
    this.edgeMaterial.dispose(), this.meshMaterial.dispose();
    const t = this.children;
    for (let e = 0, n = t.length; e < n; e++)
      t[e].geometry.dispose();
  }
}
const Ge = Ut.prototype.raycast;
function Jt(i, t, e) {
  return i === null || (i.distance = i.point.distanceTo(e.ray.origin), i.object = t, i.distance < e.near || i.distance > e.far) ? null : i;
}
function $e(i, t) {
  if (this.geometry.boundsTree) {
    if (this.material === void 0)
      return;
    const e = this.geometry.boundsTree;
    if (i.firstHitOnly === !0) {
      const n = Jt(
        e.raycastFirst(i.ray, this.material),
        this,
        i
      );
      n && t.push(n);
    } else {
      const n = e.raycast(i.ray, this.material);
      for (let s = 0, r = n.length; s < r; s++) {
        const o = Jt(n[s], this, i);
        o && t.push(o);
      }
    }
  } else
    Ge.call(this, i, t);
}
const se = /* @__PURE__ */ new WeakMap();
Ut.prototype.raycast = $e;
const Ke = {
  generate: async (i) => {
    const t = i.clone();
    return t.applyMatrix4(se.get(i).matrixWorld), new rt(t);
  }
}, Je = async (i) => {
  const t = [];
  for (const e of i)
    t.push(e.boundsTree = await Ke.generate(e));
  return t;
}, Qe = async (i) => {
  we(), i.outerObject3d.updateMatrixWorld(!0);
  const t = [];
  i.outerObject3d.traverse((n) => {
    const s = he(n, "geometry");
    !s || n === i.nativeObject3d && !(i instanceof ye) && !(i instanceof me) || (t.push(s), se.set(s, n));
  });
  const e = await Je(t);
  for (const n of e)
    be.set(n, i);
  return Ae(), [e, t];
};
async function rn(i, t) {
  if (i.done)
    return;
  const [e, n] = await Qe(this);
  for (const s of e)
    ie(s);
  if (i.then(() => {
    for (const s of e)
      oe(s);
  }), t)
    for (const s of n) {
      const r = new Dt(
        new Ut(s, xe),
        20
      );
      qt.add(r), i.then(() => qt.remove(r));
    }
}
export {
  rn as default
};
