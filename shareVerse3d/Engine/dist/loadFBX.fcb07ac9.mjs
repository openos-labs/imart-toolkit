import { V as it, a as he, C as Un, E as fe, L as Vn, b as dt, F as Gn, T as Xn, R as Et, c as Rt, d as Ut, M as Vt, e as ye, f as jn, g as U, G as Gt, B as ft, P as Ne, O as st, h as bn, i as Zn, j as Xt, k as ie, S as Kn, D as Wn, l as Yn, m as qn, n as Hn, o as $n, p as Nn, A as Qn, q as Ze, r as de, U as Jn, s as _n, t as er, Q as Ke, u as tr, v as nr, N as rr, w as ir, x as ar, y as jt, z as sr, H as or, I as lr, J as cr } from "./index.60bcd3b0.mjs";
import "react";
import "react-dom";
/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.6.9
*/
var bt = {}, ut = function(r) {
  return URL.createObjectURL(new Blob([r], { type: "text/javascript" }));
}, Qt = function(r) {
  return new Worker(r);
};
try {
  URL.revokeObjectURL(ut(""));
} catch {
  ut = function(e) {
    return "data:application/javascript;charset=UTF-8," + encodeURI(e);
  }, Qt = function(e) {
    return new Worker(e, { type: "module" });
  };
}
var fr = function(r, e, t, n, i) {
  var a = Qt(bt[e] || (bt[e] = ut(r)));
  return a.onerror = function(s) {
    return i(s.error, null);
  }, a.onmessage = function(s) {
    return i(null, s.data);
  }, a.postMessage(t, n), a;
}, C = Uint8Array, X = Uint16Array, oe = Uint32Array, Pe = new C([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]), De = new C([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]), ze = new C([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Jt = function(r, e) {
  for (var t = new X(31), n = 0; n < 31; ++n)
    t[n] = e += 1 << r[n - 1];
  for (var i = new oe(t[30]), n = 1; n < 30; ++n)
    for (var a = t[n]; a < t[n + 1]; ++a)
      i[a] = a - t[n] << 5 | n;
  return [t, i];
}, _t = Jt(Pe, 2), wt = _t[0], Qe = _t[1];
wt[28] = 258, Qe[258] = 28;
var en = Jt(De, 0), tn = en[0], ht = en[1], Ee = new X(32768);
for (var O = 0; O < 32768; ++O) {
  var ce = (O & 43690) >>> 1 | (O & 21845) << 1;
  ce = (ce & 52428) >>> 2 | (ce & 13107) << 2, ce = (ce & 61680) >>> 4 | (ce & 3855) << 4, Ee[O] = ((ce & 65280) >>> 8 | (ce & 255) << 8) >>> 1;
}
var J = function(r, e, t) {
  for (var n = r.length, i = 0, a = new X(e); i < n; ++i)
    ++a[r[i] - 1];
  var s = new X(e);
  for (i = 0; i < e; ++i)
    s[i] = s[i - 1] + a[i - 1] << 1;
  var o;
  if (t) {
    o = new X(1 << e);
    var l = 15 - e;
    for (i = 0; i < n; ++i)
      if (r[i])
        for (var f = i << 4 | r[i], u = e - r[i], c = s[r[i] - 1]++ << u, h = c | (1 << u) - 1; c <= h; ++c)
          o[Ee[c] >>> l] = f;
  } else
    for (o = new X(n), i = 0; i < n; ++i)
      r[i] && (o[i] = Ee[s[r[i] - 1]++] >>> 15 - r[i]);
  return o;
}, le = new C(288);
for (var O = 0; O < 144; ++O)
  le[O] = 8;
for (var O = 144; O < 256; ++O)
  le[O] = 9;
for (var O = 256; O < 280; ++O)
  le[O] = 7;
for (var O = 280; O < 288; ++O)
  le[O] = 8;
var Te = new C(32);
for (var O = 0; O < 32; ++O)
  Te[O] = 5;
var nn = /* @__PURE__ */ J(le, 9, 0), rn = /* @__PURE__ */ J(le, 9, 1), an = /* @__PURE__ */ J(Te, 5, 0), sn = /* @__PURE__ */ J(Te, 5, 1), qe = function(r) {
  for (var e = r[0], t = 1; t < r.length; ++t)
    r[t] > e && (e = r[t]);
  return e;
}, Q = function(r, e, t) {
  var n = e / 8 | 0;
  return (r[n] | r[n + 1] << 8) >> (e & 7) & t;
}, He = function(r, e) {
  var t = e / 8 | 0;
  return (r[t] | r[t + 1] << 8 | r[t + 2] << 16) >> (e & 7);
}, Ve = function(r) {
  return (r / 8 | 0) + (r & 7 && 1);
}, _ = function(r, e, t) {
  (e == null || e < 0) && (e = 0), (t == null || t > r.length) && (t = r.length);
  var n = new (r instanceof X ? X : r instanceof oe ? oe : C)(t - e);
  return n.set(r.subarray(e, t)), n;
}, Ge = function(r, e, t) {
  var n = r.length;
  if (!n || t && !t.l && n < 5)
    return e || new C(0);
  var i = !e || t, a = !t || t.i;
  t || (t = {}), e || (e = new C(n * 3));
  var s = function(be) {
    var Be = e.length;
    if (be > Be) {
      var me = new C(Math.max(Be * 2, be));
      me.set(e), e = me;
    }
  }, o = t.f || 0, l = t.p || 0, f = t.b || 0, u = t.l, c = t.d, h = t.m, p = t.n, v = n * 8;
  do {
    if (!u) {
      t.f = o = Q(r, l, 1);
      var g = Q(r, l + 1, 3);
      if (l += 3, g)
        if (g == 1)
          u = rn, c = sn, h = 9, p = 5;
        else if (g == 2) {
          var m = Q(r, l, 31) + 257, I = Q(r, l + 10, 15) + 4, D = m + Q(r, l + 5, 31) + 1;
          l += 14;
          for (var A = new C(D), T = new C(19), d = 0; d < I; ++d)
            T[ze[d]] = Q(r, l + d * 3, 7);
          l += I * 3;
          for (var z = qe(T), P = (1 << z) - 1, j = J(T, z, 1), d = 0; d < D; ) {
            var F = j[Q(r, l, P)];
            l += F & 15;
            var y = F >>> 4;
            if (y < 16)
              A[d++] = y;
            else {
              var S = 0, k = 0;
              for (y == 16 ? (k = 3 + Q(r, l, 3), l += 2, S = A[d - 1]) : y == 17 ? (k = 3 + Q(r, l, 7), l += 3) : y == 18 && (k = 11 + Q(r, l, 127), l += 7); k--; )
                A[d++] = S;
            }
          }
          var R = A.subarray(0, m), B = A.subarray(m);
          h = qe(R), p = qe(B), u = J(R, h, 1), c = J(B, p, 1);
        } else
          throw "invalid block type";
      else {
        var y = Ve(l) + 4, x = r[y - 4] | r[y - 3] << 8, w = y + x;
        if (w > n) {
          if (a)
            throw "unexpected EOF";
          break;
        }
        i && s(f + x), e.set(r.subarray(y, w), f), t.b = f += x, t.p = l = w * 8;
        continue;
      }
      if (l > v) {
        if (a)
          throw "unexpected EOF";
        break;
      }
    }
    i && s(f + 131072);
    for (var E = (1 << h) - 1, Z = (1 << p) - 1, Y = l; ; Y = l) {
      var S = u[He(r, l) & E], N = S >>> 4;
      if (l += S & 15, l > v) {
        if (a)
          throw "unexpected EOF";
        break;
      }
      if (!S)
        throw "invalid length/literal";
      if (N < 256)
        e[f++] = N;
      else if (N == 256) {
        Y = l, u = null;
        break;
      } else {
        var K = N - 254;
        if (N > 264) {
          var d = N - 257, te = Pe[d];
          K = Q(r, l, (1 << te) - 1) + wt[d], l += te;
        }
        var ne = c[He(r, l) & Z], q = ne >>> 4;
        if (!ne)
          throw "invalid distance";
        l += ne & 15;
        var B = tn[q];
        if (q > 3) {
          var te = De[q];
          B += He(r, l) & (1 << te) - 1, l += te;
        }
        if (l > v) {
          if (a)
            throw "unexpected EOF";
          break;
        }
        i && s(f + 131072);
        for (var b = f + K; f < b; f += 4)
          e[f] = e[f - B], e[f + 1] = e[f + 1 - B], e[f + 2] = e[f + 2 - B], e[f + 3] = e[f + 3 - B];
        f = b;
      }
    }
    t.l = u, t.p = Y, t.b = f, u && (o = 1, t.m = h, t.d = c, t.n = p);
  } while (!o);
  return f == e.length ? e : _(e, 0, f);
}, re = function(r, e, t) {
  t <<= e & 7;
  var n = e / 8 | 0;
  r[n] |= t, r[n + 1] |= t >>> 8;
}, xe = function(r, e, t) {
  t <<= e & 7;
  var n = e / 8 | 0;
  r[n] |= t, r[n + 1] |= t >>> 8, r[n + 2] |= t >>> 16;
}, $e = function(r, e) {
  for (var t = [], n = 0; n < r.length; ++n)
    r[n] && t.push({ s: n, f: r[n] });
  var i = t.length, a = t.slice();
  if (!i)
    return [se, 0];
  if (i == 1) {
    var s = new C(t[0].s + 1);
    return s[t[0].s] = 1, [s, 1];
  }
  t.sort(function(D, A) {
    return D.f - A.f;
  }), t.push({ s: -1, f: 25001 });
  var o = t[0], l = t[1], f = 0, u = 1, c = 2;
  for (t[0] = { s: -1, f: o.f + l.f, l: o, r: l }; u != i - 1; )
    o = t[t[f].f < t[c].f ? f++ : c++], l = t[f != u && t[f].f < t[c].f ? f++ : c++], t[u++] = { s: -1, f: o.f + l.f, l: o, r: l };
  for (var h = a[0].s, n = 1; n < i; ++n)
    a[n].s > h && (h = a[n].s);
  var p = new X(h + 1), v = Je(t[u - 1], p, 0);
  if (v > e) {
    var n = 0, g = 0, y = v - e, x = 1 << y;
    for (a.sort(function(A, T) {
      return p[T.s] - p[A.s] || A.f - T.f;
    }); n < i; ++n) {
      var w = a[n].s;
      if (p[w] > e)
        g += x - (1 << v - p[w]), p[w] = e;
      else
        break;
    }
    for (g >>>= y; g > 0; ) {
      var m = a[n].s;
      p[m] < e ? g -= 1 << e - p[m]++ - 1 : ++n;
    }
    for (; n >= 0 && g; --n) {
      var I = a[n].s;
      p[I] == e && (--p[I], ++g);
    }
    v = e;
  }
  return [new C(p), v];
}, Je = function(r, e, t) {
  return r.s == -1 ? Math.max(Je(r.l, e, t + 1), Je(r.r, e, t + 1)) : e[r.s] = t;
}, pt = function(r) {
  for (var e = r.length; e && !r[--e]; )
    ;
  for (var t = new X(++e), n = 0, i = r[0], a = 1, s = function(l) {
    t[n++] = l;
  }, o = 1; o <= e; ++o)
    if (r[o] == i && o != e)
      ++a;
    else {
      if (!i && a > 2) {
        for (; a > 138; a -= 138)
          s(32754);
        a > 2 && (s(a > 10 ? a - 11 << 5 | 28690 : a - 3 << 5 | 12305), a = 0);
      } else if (a > 3) {
        for (s(i), --a; a > 6; a -= 6)
          s(8304);
        a > 2 && (s(a - 3 << 5 | 8208), a = 0);
      }
      for (; a--; )
        s(i);
      a = 1, i = r[o];
    }
  return [t.subarray(0, n), e];
}, Ie = function(r, e) {
  for (var t = 0, n = 0; n < e.length; ++n)
    t += r[n] * e[n];
  return t;
}, Oe = function(r, e, t) {
  var n = t.length, i = Ve(e + 2);
  r[i] = n & 255, r[i + 1] = n >>> 8, r[i + 2] = r[i] ^ 255, r[i + 3] = r[i + 1] ^ 255;
  for (var a = 0; a < n; ++a)
    r[i + a + 4] = t[a];
  return (i + 4 + n) * 8;
}, vt = function(r, e, t, n, i, a, s, o, l, f, u) {
  re(e, u++, t), ++i[256];
  for (var c = $e(i, 15), h = c[0], p = c[1], v = $e(a, 15), g = v[0], y = v[1], x = pt(h), w = x[0], m = x[1], I = pt(g), D = I[0], A = I[1], T = new X(19), d = 0; d < w.length; ++d)
    T[w[d] & 31]++;
  for (var d = 0; d < D.length; ++d)
    T[D[d] & 31]++;
  for (var z = $e(T, 7), P = z[0], j = z[1], F = 19; F > 4 && !P[ze[F - 1]]; --F)
    ;
  var S = f + 5 << 3, k = Ie(i, le) + Ie(a, Te) + s, R = Ie(i, h) + Ie(a, g) + s + 14 + 3 * F + Ie(T, P) + (2 * T[16] + 3 * T[17] + 7 * T[18]);
  if (S <= k && S <= R)
    return Oe(e, u, r.subarray(l, l + f));
  var B, E, Z, Y;
  if (re(e, u, 1 + (R < k)), u += 2, R < k) {
    B = J(h, p, 0), E = h, Z = J(g, y, 0), Y = g;
    var N = J(P, j, 0);
    re(e, u, m - 257), re(e, u + 5, A - 1), re(e, u + 10, F - 4), u += 14;
    for (var d = 0; d < F; ++d)
      re(e, u + 3 * d, P[ze[d]]);
    u += 3 * F;
    for (var K = [w, D], te = 0; te < 2; ++te)
      for (var ne = K[te], d = 0; d < ne.length; ++d) {
        var q = ne[d] & 31;
        re(e, u, N[q]), u += P[q], q > 15 && (re(e, u, ne[d] >>> 5 & 127), u += ne[d] >>> 12);
      }
  } else
    B = nn, E = le, Z = an, Y = Te;
  for (var d = 0; d < o; ++d)
    if (n[d] > 255) {
      var q = n[d] >>> 18 & 31;
      xe(e, u, B[q + 257]), u += E[q + 257], q > 7 && (re(e, u, n[d] >>> 23 & 31), u += Pe[q]);
      var b = n[d] & 31;
      xe(e, u, Z[b]), u += Y[b], b > 3 && (xe(e, u, n[d] >>> 5 & 8191), u += De[b]);
    } else
      xe(e, u, B[n[d]]), u += E[n[d]];
  return xe(e, u, B[256]), u + E[256];
}, on = /* @__PURE__ */ new oe([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), se = /* @__PURE__ */ new C(0), ln = function(r, e, t, n, i, a) {
  var s = r.length, o = new C(n + s + 5 * (1 + Math.ceil(s / 7e3)) + i), l = o.subarray(n, o.length - i), f = 0;
  if (!e || s < 8)
    for (var u = 0; u <= s; u += 65535) {
      var c = u + 65535;
      c < s ? f = Oe(l, f, r.subarray(u, c)) : (l[u] = a, f = Oe(l, f, r.subarray(u, s)));
    }
  else {
    for (var h = on[e - 1], p = h >>> 13, v = h & 8191, g = (1 << t) - 1, y = new X(32768), x = new X(g + 1), w = Math.ceil(t / 3), m = 2 * w, I = function(at) {
      return (r[at] ^ r[at + 1] << w ^ r[at + 2] << m) & g;
    }, D = new oe(25e3), A = new X(288), T = new X(32), d = 0, z = 0, u = 0, P = 0, j = 0, F = 0; u < s; ++u) {
      var S = I(u), k = u & 32767, R = x[S];
      if (y[k] = R, x[S] = k, j <= u) {
        var B = s - u;
        if ((d > 7e3 || P > 24576) && B > 423) {
          f = vt(r, l, 0, D, A, T, z, P, F, u - F, f), P = d = z = 0, F = u;
          for (var E = 0; E < 286; ++E)
            A[E] = 0;
          for (var E = 0; E < 30; ++E)
            T[E] = 0;
        }
        var Z = 2, Y = 0, N = v, K = k - R & 32767;
        if (B > 2 && S == I(u - K))
          for (var te = Math.min(p, B) - 1, ne = Math.min(32767, u), q = Math.min(258, B); K <= ne && --N && k != R; ) {
            if (r[u + Z] == r[u + Z - K]) {
              for (var b = 0; b < q && r[u + b] == r[u + b - K]; ++b)
                ;
              if (b > Z) {
                if (Z = b, Y = K, b > te)
                  break;
                for (var be = Math.min(K, b - 2), Be = 0, E = 0; E < be; ++E) {
                  var me = u - K + E + 32768 & 32767, Rn = y[me], Bt = me - Rn + 32768 & 32767;
                  Bt > Be && (Be = Bt, R = me);
                }
              }
            }
            k = R, R = y[k], K += k - R + 32768 & 32767;
          }
        if (Y) {
          D[P++] = 268435456 | Qe[Z] << 18 | ht[Y];
          var Ot = Qe[Z] & 31, zt = ht[Y] & 31;
          z += Pe[Ot] + De[zt], ++A[257 + Ot], ++T[zt], j = u + Z, ++d;
        } else
          D[P++] = r[u], ++A[r[u]];
      }
    }
    f = vt(r, l, a, D, A, T, z, P, F, u - F, f), !a && f & 7 && (f = Oe(l, f + 1, se));
  }
  return _(o, 0, n + Ve(f) + i);
}, cn = /* @__PURE__ */ function() {
  for (var r = new oe(256), e = 0; e < 256; ++e) {
    for (var t = e, n = 9; --n; )
      t = (t & 1 && 3988292384) ^ t >>> 1;
    r[e] = t;
  }
  return r;
}(), Me = function() {
  var r = -1;
  return {
    p: function(e) {
      for (var t = r, n = 0; n < e.length; ++n)
        t = cn[t & 255 ^ e[n]] ^ t >>> 8;
      r = t;
    },
    d: function() {
      return ~r;
    }
  };
}, xt = function() {
  var r = 1, e = 0;
  return {
    p: function(t) {
      for (var n = r, i = e, a = t.length, s = 0; s != a; ) {
        for (var o = Math.min(s + 2655, a); s < o; ++s)
          i += n += t[s];
        n = (n & 65535) + 15 * (n >> 16), i = (i & 65535) + 15 * (i >> 16);
      }
      r = n, e = i;
    },
    d: function() {
      return r %= 65521, e %= 65521, (r & 255) << 24 | r >>> 8 << 16 | (e & 255) << 8 | e >>> 8;
    }
  };
}, ge = function(r, e, t, n, i) {
  return ln(r, e.level == null ? 6 : e.level, e.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(r.length))) * 1.5) : 12 + e.mem, t, n, !i);
}, Xe = function(r, e) {
  var t = {};
  for (var n in r)
    t[n] = r[n];
  for (var n in e)
    t[n] = e[n];
  return t;
}, Zt = function(r, e, t) {
  for (var n = r(), i = r.toString(), a = i.slice(i.indexOf("[") + 1, i.lastIndexOf("]")).replace(/ /g, "").split(","), s = 0; s < n.length; ++s) {
    var o = n[s], l = a[s];
    if (typeof o == "function") {
      e += ";" + l + "=";
      var f = o.toString();
      if (o.prototype)
        if (f.indexOf("[native code]") != -1) {
          var u = f.indexOf(" ", 8) + 1;
          e += f.slice(u, f.indexOf("(", u));
        } else {
          e += f;
          for (var c in o.prototype)
            e += ";" + l + ".prototype." + c + "=" + o.prototype[c].toString();
        }
      else
        e += f;
    } else
      t[l] = o;
  }
  return [e, t];
}, We = [], ur = function(r) {
  var e = [];
  for (var t in r)
    (r[t] instanceof C || r[t] instanceof X || r[t] instanceof oe) && e.push((r[t] = new r[t].constructor(r[t])).buffer);
  return e;
}, fn = function(r, e, t, n) {
  var i;
  if (!We[t]) {
    for (var a = "", s = {}, o = r.length - 1, l = 0; l < o; ++l)
      i = Zt(r[l], a, s), a = i[0], s = i[1];
    We[t] = Zt(r[o], a, s);
  }
  var f = Xe({}, We[t][1]);
  return fr(We[t][0] + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + e.toString() + "}", t, f, ur(f), n);
}, Ce = function() {
  return [C, X, oe, Pe, De, ze, wt, tn, rn, sn, Ee, J, qe, Q, He, Ve, _, Ge, Fe, ve, It];
}, Le = function() {
  return [C, X, oe, Pe, De, ze, Qe, ht, nn, le, an, Te, Ee, on, se, J, re, xe, $e, Je, pt, Ie, Oe, vt, Ve, _, ln, ge, je, ve];
}, un = function() {
  return [Tt, Pt, L, Me, cn];
}, hn = function() {
  return [At, gn];
}, pn = function() {
  return [Dt, L, xt];
}, vn = function() {
  return [mn];
}, ve = function(r) {
  return postMessage(r, [r.buffer]);
}, It = function(r) {
  return r && r.size && new C(r.size);
}, Se = function(r, e, t, n, i, a) {
  var s = fn(t, n, i, function(o, l) {
    s.terminate(), a(o, l);
  });
  return s.postMessage([r, e], e.consume ? [r.buffer] : []), function() {
    s.terminate();
  };
}, ee = function(r) {
  return r.ondata = function(e, t) {
    return postMessage([e, t], [e.buffer]);
  }, function(e) {
    return r.push(e.data[0], e.data[1]);
  };
}, ke = function(r, e, t, n, i) {
  var a, s = fn(r, n, i, function(o, l) {
    o ? (s.terminate(), e.ondata.call(e, o)) : (l[1] && s.terminate(), e.ondata.call(e, o, l[0], l[1]));
  });
  s.postMessage(t), e.push = function(o, l) {
    if (a)
      throw "stream finished";
    if (!e.ondata)
      throw "no stream handler";
    s.postMessage([o, a = l], [o.buffer]);
  }, e.terminate = function() {
    s.terminate();
  };
}, W = function(r, e) {
  return r[e] | r[e + 1] << 8;
}, G = function(r, e) {
  return (r[e] | r[e + 1] << 8 | r[e + 2] << 16 | r[e + 3] << 24) >>> 0;
}, ot = function(r, e) {
  return G(r, e) + G(r, e + 4) * 4294967296;
}, L = function(r, e, t) {
  for (; t; ++e)
    r[e] = t, t >>>= 8;
}, Tt = function(r, e) {
  var t = e.filename;
  if (r[0] = 31, r[1] = 139, r[2] = 8, r[8] = e.level < 2 ? 4 : e.level == 9 ? 2 : 0, r[9] = 3, e.mtime != 0 && L(r, 4, Math.floor(new Date(e.mtime || Date.now()) / 1e3)), t) {
    r[3] = 8;
    for (var n = 0; n <= t.length; ++n)
      r[n + 10] = t.charCodeAt(n);
  }
}, At = function(r) {
  if (r[0] != 31 || r[1] != 139 || r[2] != 8)
    throw "invalid gzip data";
  var e = r[3], t = 10;
  e & 4 && (t += r[10] | (r[11] << 8) + 2);
  for (var n = (e >> 3 & 1) + (e >> 4 & 1); n > 0; n -= !r[t++])
    ;
  return t + (e & 2);
}, gn = function(r) {
  var e = r.length;
  return (r[e - 4] | r[e - 3] << 8 | r[e - 2] << 16 | r[e - 1] << 24) >>> 0;
}, Pt = function(r) {
  return 10 + (r.filename && r.filename.length + 1 || 0);
}, Dt = function(r, e) {
  var t = e.level, n = t == 0 ? 0 : t < 6 ? 1 : t == 9 ? 3 : 2;
  r[0] = 120, r[1] = n << 6 | (n ? 32 - 2 * n : 1);
}, mn = function(r) {
  if ((r[0] & 15) != 8 || r[0] >>> 4 > 7 || (r[0] << 8 | r[1]) % 31)
    throw "invalid zlib data";
  if (r[1] & 32)
    throw "invalid zlib data: preset dictionaries not supported";
};
function Mt(r, e) {
  return !e && typeof r == "function" && (e = r, r = {}), this.ondata = e, r;
}
var ae = /* @__PURE__ */ function() {
  function r(e, t) {
    !t && typeof e == "function" && (t = e, e = {}), this.ondata = t, this.o = e || {};
  }
  return r.prototype.p = function(e, t) {
    this.ondata(ge(e, this.o, 0, 0, !t), t);
  }, r.prototype.push = function(e, t) {
    if (this.d)
      throw "stream finished";
    if (!this.ondata)
      throw "no stream handler";
    this.d = t, this.p(e, t || !1);
  }, r;
}(), yn = /* @__PURE__ */ function() {
  function r(e, t) {
    ke([
      Le,
      function() {
        return [ee, ae];
      }
    ], this, Mt.call(this, e, t), function(n) {
      var i = new ae(n.data);
      onmessage = ee(i);
    }, 6);
  }
  return r;
}();
function dn(r, e, t) {
  if (t || (t = e, e = {}), typeof t != "function")
    throw "no callback";
  return Se(r, e, [
    Le
  ], function(n) {
    return ve(je(n.data[0], n.data[1]));
  }, 0, t);
}
function je(r, e) {
  return ge(r, e || {}, 0, 0);
}
var $ = /* @__PURE__ */ function() {
  function r(e) {
    this.s = {}, this.p = new C(0), this.ondata = e;
  }
  return r.prototype.e = function(e) {
    if (this.d)
      throw "stream finished";
    if (!this.ondata)
      throw "no stream handler";
    var t = this.p.length, n = new C(t + e.length);
    n.set(this.p), n.set(e, t), this.p = n;
  }, r.prototype.c = function(e) {
    this.d = this.s.i = e || !1;
    var t = this.s.b, n = Ge(this.p, this.o, this.s);
    this.ondata(_(n, t, this.s.b), this.d), this.o = _(n, this.s.b - 32768), this.s.b = this.o.length, this.p = _(this.p, this.s.p / 8 | 0), this.s.p &= 7;
  }, r.prototype.push = function(e, t) {
    this.e(e), this.c(t);
  }, r;
}(), Ct = /* @__PURE__ */ function() {
  function r(e) {
    this.ondata = e, ke([
      Ce,
      function() {
        return [ee, $];
      }
    ], this, 0, function() {
      var t = new $();
      onmessage = ee(t);
    }, 7);
  }
  return r;
}();
function Lt(r, e, t) {
  if (t || (t = e, e = {}), typeof t != "function")
    throw "no callback";
  return Se(r, e, [
    Ce
  ], function(n) {
    return ve(Fe(n.data[0], It(n.data[1])));
  }, 1, t);
}
function Fe(r, e) {
  return Ge(r, e);
}
var _e = /* @__PURE__ */ function() {
  function r(e, t) {
    this.c = Me(), this.l = 0, this.v = 1, ae.call(this, e, t);
  }
  return r.prototype.push = function(e, t) {
    ae.prototype.push.call(this, e, t);
  }, r.prototype.p = function(e, t) {
    this.c.p(e), this.l += e.length;
    var n = ge(e, this.o, this.v && Pt(this.o), t && 8, !t);
    this.v && (Tt(n, this.o), this.v = 0), t && (L(n, n.length - 8, this.c.d()), L(n, n.length - 4, this.l)), this.ondata(n, t);
  }, r;
}(), Kt = /* @__PURE__ */ function() {
  function r(e, t) {
    ke([
      Le,
      un,
      function() {
        return [ee, ae, _e];
      }
    ], this, Mt.call(this, e, t), function(n) {
      var i = new _e(n.data);
      onmessage = ee(i);
    }, 8);
  }
  return r;
}();
function Wt(r, e, t) {
  if (t || (t = e, e = {}), typeof t != "function")
    throw "no callback";
  return Se(r, e, [
    Le,
    un,
    function() {
      return [et];
    }
  ], function(n) {
    return ve(et(n.data[0], n.data[1]));
  }, 2, t);
}
function et(r, e) {
  e || (e = {});
  var t = Me(), n = r.length;
  t.p(r);
  var i = ge(r, e, Pt(e), 8), a = i.length;
  return Tt(i, e), L(i, a - 8, t.d()), L(i, a - 4, n), i;
}
var tt = /* @__PURE__ */ function() {
  function r(e) {
    this.v = 1, $.call(this, e);
  }
  return r.prototype.push = function(e, t) {
    if ($.prototype.e.call(this, e), this.v) {
      var n = this.p.length > 3 ? At(this.p) : 4;
      if (n >= this.p.length && !t)
        return;
      this.p = this.p.subarray(n), this.v = 0;
    }
    if (t) {
      if (this.p.length < 8)
        throw "invalid gzip stream";
      this.p = this.p.subarray(0, -8);
    }
    $.prototype.c.call(this, t);
  }, r;
}(), wn = /* @__PURE__ */ function() {
  function r(e) {
    this.ondata = e, ke([
      Ce,
      hn,
      function() {
        return [ee, $, tt];
      }
    ], this, 0, function() {
      var t = new tt();
      onmessage = ee(t);
    }, 9);
  }
  return r;
}();
function xn(r, e, t) {
  if (t || (t = e, e = {}), typeof t != "function")
    throw "no callback";
  return Se(r, e, [
    Ce,
    hn,
    function() {
      return [nt];
    }
  ], function(n) {
    return ve(nt(n.data[0]));
  }, 3, t);
}
function nt(r, e) {
  return Ge(r.subarray(At(r), -8), e || new C(gn(r)));
}
var gt = /* @__PURE__ */ function() {
  function r(e, t) {
    this.c = xt(), this.v = 1, ae.call(this, e, t);
  }
  return r.prototype.push = function(e, t) {
    ae.prototype.push.call(this, e, t);
  }, r.prototype.p = function(e, t) {
    this.c.p(e);
    var n = ge(e, this.o, this.v && 2, t && 4, !t);
    this.v && (Dt(n, this.o), this.v = 0), t && L(n, n.length - 4, this.c.d()), this.ondata(n, t);
  }, r;
}(), hr = /* @__PURE__ */ function() {
  function r(e, t) {
    ke([
      Le,
      pn,
      function() {
        return [ee, ae, gt];
      }
    ], this, Mt.call(this, e, t), function(n) {
      var i = new gt(n.data);
      onmessage = ee(i);
    }, 10);
  }
  return r;
}();
function pr(r, e, t) {
  if (t || (t = e, e = {}), typeof t != "function")
    throw "no callback";
  return Se(r, e, [
    Le,
    pn,
    function() {
      return [mt];
    }
  ], function(n) {
    return ve(mt(n.data[0], n.data[1]));
  }, 4, t);
}
function mt(r, e) {
  e || (e = {});
  var t = xt();
  t.p(r);
  var n = ge(r, e, 2, 4);
  return Dt(n, e), L(n, n.length - 4, t.d()), n;
}
var rt = /* @__PURE__ */ function() {
  function r(e) {
    this.v = 1, $.call(this, e);
  }
  return r.prototype.push = function(e, t) {
    if ($.prototype.e.call(this, e), this.v) {
      if (this.p.length < 2 && !t)
        return;
      this.p = this.p.subarray(2), this.v = 0;
    }
    if (t) {
      if (this.p.length < 4)
        throw "invalid zlib stream";
      this.p = this.p.subarray(0, -4);
    }
    $.prototype.c.call(this, t);
  }, r;
}(), In = /* @__PURE__ */ function() {
  function r(e) {
    this.ondata = e, ke([
      Ce,
      vn,
      function() {
        return [ee, $, rt];
      }
    ], this, 0, function() {
      var t = new rt();
      onmessage = ee(t);
    }, 11);
  }
  return r;
}();
function Tn(r, e, t) {
  if (t || (t = e, e = {}), typeof t != "function")
    throw "no callback";
  return Se(r, e, [
    Ce,
    vn,
    function() {
      return [Re];
    }
  ], function(n) {
    return ve(Re(n.data[0], It(n.data[1])));
  }, 5, t);
}
function Re(r, e) {
  return Ge((mn(r), r.subarray(2, -4)), e);
}
var An = /* @__PURE__ */ function() {
  function r(e) {
    this.G = tt, this.I = $, this.Z = rt, this.ondata = e;
  }
  return r.prototype.push = function(e, t) {
    if (!this.ondata)
      throw "no stream handler";
    if (this.s)
      this.s.push(e, t);
    else {
      if (this.p && this.p.length) {
        var n = new C(this.p.length + e.length);
        n.set(this.p), n.set(e, this.p.length);
      } else
        this.p = e;
      if (this.p.length > 2) {
        var i = this, a = function() {
          i.ondata.apply(i, arguments);
        };
        this.s = this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8 ? new this.G(a) : (this.p[0] & 15) != 8 || this.p[0] >> 4 > 7 || (this.p[0] << 8 | this.p[1]) % 31 ? new this.I(a) : new this.Z(a), this.s.push(this.p, t), this.p = null;
      }
    }
  }, r;
}(), vr = /* @__PURE__ */ function() {
  function r(e) {
    this.G = wn, this.I = Ct, this.Z = In, this.ondata = e;
  }
  return r.prototype.push = function(e, t) {
    An.prototype.push.call(this, e, t);
  }, r;
}();
function gr(r, e, t) {
  if (t || (t = e, e = {}), typeof t != "function")
    throw "no callback";
  return r[0] == 31 && r[1] == 139 && r[2] == 8 ? xn(r, e, t) : (r[0] & 15) != 8 || r[0] >> 4 > 7 || (r[0] << 8 | r[1]) % 31 ? Lt(r, e, t) : Tn(r, e, t);
}
function mr(r, e) {
  return r[0] == 31 && r[1] == 139 && r[2] == 8 ? nt(r, e) : (r[0] & 15) != 8 || r[0] >> 4 > 7 || (r[0] << 8 | r[1]) % 31 ? Fe(r, e) : Re(r, e);
}
var St = function(r, e, t, n) {
  for (var i in r) {
    var a = r[i], s = e + i;
    a instanceof C ? t[s] = [a, n] : Array.isArray(a) ? t[s] = [a[0], Xe(n, a[1])] : St(a, s + "/", t, n);
  }
}, Yt = typeof TextEncoder < "u" && /* @__PURE__ */ new TextEncoder(), yt = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), Pn = 0;
try {
  yt.decode(se, { stream: !0 }), Pn = 1;
} catch {
}
var Dn = function(r) {
  for (var e = "", t = 0; ; ) {
    var n = r[t++], i = (n > 127) + (n > 223) + (n > 239);
    if (t + i > r.length)
      return [e, _(r, t - 1)];
    i ? i == 3 ? (n = ((n & 15) << 18 | (r[t++] & 63) << 12 | (r[t++] & 63) << 6 | r[t++] & 63) - 65536, e += String.fromCharCode(55296 | n >> 10, 56320 | n & 1023)) : i & 1 ? e += String.fromCharCode((n & 31) << 6 | r[t++] & 63) : e += String.fromCharCode((n & 15) << 12 | (r[t++] & 63) << 6 | r[t++] & 63) : e += String.fromCharCode(n);
  }
}, yr = /* @__PURE__ */ function() {
  function r(e) {
    this.ondata = e, Pn ? this.t = new TextDecoder() : this.p = se;
  }
  return r.prototype.push = function(e, t) {
    if (!this.ondata)
      throw "no callback";
    if (t = !!t, this.t) {
      if (this.ondata(this.t.decode(e, { stream: !0 }), t), t) {
        if (this.t.decode().length)
          throw "invalid utf-8 data";
        this.t = null;
      }
      return;
    }
    if (!this.p)
      throw "stream finished";
    var n = new C(this.p.length + e.length);
    n.set(this.p), n.set(e, this.p.length);
    var i = Dn(n), a = i[0], s = i[1];
    if (t) {
      if (s.length)
        throw "invalid utf-8 data";
      this.p = null;
    } else
      this.p = s;
    this.ondata(a, t);
  }, r;
}(), dr = /* @__PURE__ */ function() {
  function r(e) {
    this.ondata = e;
  }
  return r.prototype.push = function(e, t) {
    if (!this.ondata)
      throw "no callback";
    if (this.d)
      throw "stream finished";
    this.ondata(pe(e), this.d = t || !1);
  }, r;
}();
function pe(r, e) {
  if (e) {
    for (var t = new C(r.length), n = 0; n < r.length; ++n)
      t[n] = r.charCodeAt(n);
    return t;
  }
  if (Yt)
    return Yt.encode(r);
  for (var i = r.length, a = new C(r.length + (r.length >> 1)), s = 0, o = function(u) {
    a[s++] = u;
  }, n = 0; n < i; ++n) {
    if (s + 5 > a.length) {
      var l = new C(s + 8 + (i - n << 1));
      l.set(a), a = l;
    }
    var f = r.charCodeAt(n);
    f < 128 || e ? o(f) : f < 2048 ? (o(192 | f >> 6), o(128 | f & 63)) : f > 55295 && f < 57344 ? (f = 65536 + (f & 1023 << 10) | r.charCodeAt(++n) & 1023, o(240 | f >> 18), o(128 | f >> 12 & 63), o(128 | f >> 6 & 63), o(128 | f & 63)) : (o(224 | f >> 12), o(128 | f >> 6 & 63), o(128 | f & 63));
  }
  return _(a, 0, s);
}
function kt(r, e) {
  if (e) {
    for (var t = "", n = 0; n < r.length; n += 16384)
      t += String.fromCharCode.apply(null, r.subarray(n, n + 16384));
    return t;
  } else {
    if (yt)
      return yt.decode(r);
    var i = Dn(r), a = i[0], s = i[1];
    if (s.length)
      throw "invalid utf-8 data";
    return a;
  }
}
var Mn = function(r) {
  return r == 1 ? 3 : r < 6 ? 2 : r == 9 ? 1 : 0;
}, Cn = function(r, e) {
  return e + 30 + W(r, e + 26) + W(r, e + 28);
}, Ln = function(r, e, t) {
  var n = W(r, e + 28), i = kt(r.subarray(e + 46, e + 46 + n), !(W(r, e + 8) & 2048)), a = e + 46 + n, s = G(r, e + 20), o = t && s == 4294967295 ? Sn(r, a) : [s, G(r, e + 24), G(r, e + 42)], l = o[0], f = o[1], u = o[2];
  return [W(r, e + 10), l, f, i, a + W(r, e + 30) + W(r, e + 32), u];
}, Sn = function(r, e) {
  for (; W(r, e) != 1; e += 4 + W(r, e + 2))
    ;
  return [ot(r, e + 12), ot(r, e + 4), ot(r, e + 20)];
}, ue = function(r) {
  var e = 0;
  if (r)
    for (var t in r) {
      var n = r[t].length;
      if (n > 65535)
        throw "extra field too long";
      e += n + 4;
    }
  return e;
}, Ae = function(r, e, t, n, i, a, s, o) {
  var l = n.length, f = t.extra, u = o && o.length, c = ue(f);
  L(r, e, s != null ? 33639248 : 67324752), e += 4, s != null && (r[e++] = 20, r[e++] = t.os), r[e] = 20, e += 2, r[e++] = t.flag << 1 | (a == null && 8), r[e++] = i && 8, r[e++] = t.compression & 255, r[e++] = t.compression >> 8;
  var h = new Date(t.mtime == null ? Date.now() : t.mtime), p = h.getFullYear() - 1980;
  if (p < 0 || p > 119)
    throw "date not in range 1980-2099";
  if (L(r, e, p << 25 | h.getMonth() + 1 << 21 | h.getDate() << 16 | h.getHours() << 11 | h.getMinutes() << 5 | h.getSeconds() >>> 1), e += 4, a != null && (L(r, e, t.crc), L(r, e + 4, a), L(r, e + 8, t.size)), L(r, e + 12, l), L(r, e + 14, c), e += 16, s != null && (L(r, e, u), L(r, e + 6, t.attrs), L(r, e + 10, s), e += 14), r.set(n, e), e += l, c)
    for (var v in f) {
      var g = f[v], y = g.length;
      L(r, e, +v), L(r, e + 2, y), r.set(g, e + 4), e += 4 + y;
    }
  return u && (r.set(o, e), e += u), e;
}, Ft = function(r, e, t, n, i) {
  L(r, e, 101010256), L(r, e + 8, t), L(r, e + 10, t), L(r, e + 12, n), L(r, e + 16, i);
}, Ue = /* @__PURE__ */ function() {
  function r(e) {
    this.filename = e, this.c = Me(), this.size = 0, this.compression = 0;
  }
  return r.prototype.process = function(e, t) {
    this.ondata(null, e, t);
  }, r.prototype.push = function(e, t) {
    if (!this.ondata)
      throw "no callback - add to ZIP archive before pushing";
    this.c.p(e), this.size += e.length, t && (this.crc = this.c.d()), this.process(e, t || !1);
  }, r;
}(), wr = /* @__PURE__ */ function() {
  function r(e, t) {
    var n = this;
    t || (t = {}), Ue.call(this, e), this.d = new ae(t, function(i, a) {
      n.ondata(null, i, a);
    }), this.compression = 8, this.flag = Mn(t.level);
  }
  return r.prototype.process = function(e, t) {
    try {
      this.d.push(e, t);
    } catch (n) {
      this.ondata(n, null, t);
    }
  }, r.prototype.push = function(e, t) {
    Ue.prototype.push.call(this, e, t);
  }, r;
}(), xr = /* @__PURE__ */ function() {
  function r(e, t) {
    var n = this;
    t || (t = {}), Ue.call(this, e), this.d = new yn(t, function(i, a, s) {
      n.ondata(i, a, s);
    }), this.compression = 8, this.flag = Mn(t.level), this.terminate = this.d.terminate;
  }
  return r.prototype.process = function(e, t) {
    this.d.push(e, t);
  }, r.prototype.push = function(e, t) {
    Ue.prototype.push.call(this, e, t);
  }, r;
}(), Ir = /* @__PURE__ */ function() {
  function r(e) {
    this.ondata = e, this.u = [], this.d = 1;
  }
  return r.prototype.add = function(e) {
    var t = this;
    if (this.d & 2)
      throw "stream finished";
    var n = pe(e.filename), i = n.length, a = e.comment, s = a && pe(a), o = i != e.filename.length || s && a.length != s.length, l = i + ue(e.extra) + 30;
    if (i > 65535)
      throw "filename too long";
    var f = new C(l);
    Ae(f, 0, e, n, o);
    var u = [f], c = function() {
      for (var y = 0, x = u; y < x.length; y++) {
        var w = x[y];
        t.ondata(null, w, !1);
      }
      u = [];
    }, h = this.d;
    this.d = 0;
    var p = this.u.length, v = Xe(e, {
      f: n,
      u: o,
      o: s,
      t: function() {
        e.terminate && e.terminate();
      },
      r: function() {
        if (c(), h) {
          var y = t.u[p + 1];
          y ? y.r() : t.d = 1;
        }
        h = 1;
      }
    }), g = 0;
    e.ondata = function(y, x, w) {
      if (y)
        t.ondata(y, x, w), t.terminate();
      else if (g += x.length, u.push(x), w) {
        var m = new C(16);
        L(m, 0, 134695760), L(m, 4, e.crc), L(m, 8, g), L(m, 12, e.size), u.push(m), v.c = g, v.b = l + g + 16, v.crc = e.crc, v.size = e.size, h && v.r(), h = 1;
      } else
        h && c();
    }, this.u.push(v);
  }, r.prototype.end = function() {
    var e = this;
    if (this.d & 2)
      throw this.d & 1 ? "stream finishing" : "stream finished";
    this.d ? this.e() : this.u.push({
      r: function() {
        !(e.d & 1) || (e.u.splice(-1, 1), e.e());
      },
      t: function() {
      }
    }), this.d = 3;
  }, r.prototype.e = function() {
    for (var e = 0, t = 0, n = 0, i = 0, a = this.u; i < a.length; i++) {
      var s = a[i];
      n += 46 + s.f.length + ue(s.extra) + (s.o ? s.o.length : 0);
    }
    for (var o = new C(n + 22), l = 0, f = this.u; l < f.length; l++) {
      var s = f[l];
      Ae(o, e, s, s.f, s.u, s.c, t, s.o), e += 46 + s.f.length + ue(s.extra) + (s.o ? s.o.length : 0), t += s.b;
    }
    Ft(o, e, this.u.length, n, t), this.ondata(null, o, !0), this.d = 2;
  }, r.prototype.terminate = function() {
    for (var e = 0, t = this.u; e < t.length; e++) {
      var n = t[e];
      n.t();
    }
    this.d = 2;
  }, r;
}();
function Tr(r, e, t) {
  if (t || (t = e, e = {}), typeof t != "function")
    throw "no callback";
  var n = {};
  St(r, "", n, e);
  var i = Object.keys(n), a = i.length, s = 0, o = 0, l = a, f = new Array(a), u = [], c = function() {
    for (var g = 0; g < u.length; ++g)
      u[g]();
  }, h = function() {
    var g = new C(o + 22), y = s, x = o - s;
    o = 0;
    for (var w = 0; w < l; ++w) {
      var m = f[w];
      try {
        var I = m.c.length;
        Ae(g, o, m, m.f, m.u, I);
        var D = 30 + m.f.length + ue(m.extra), A = o + D;
        g.set(m.c, A), Ae(g, s, m, m.f, m.u, I, o, m.m), s += 16 + D + (m.m ? m.m.length : 0), o = A + I;
      } catch (T) {
        return t(T, null);
      }
    }
    Ft(g, s, f.length, x, y), t(null, g);
  };
  a || h();
  for (var p = function(g) {
    var y = i[g], x = n[y], w = x[0], m = x[1], I = Me(), D = w.length;
    I.p(w);
    var A = pe(y), T = A.length, d = m.comment, z = d && pe(d), P = z && z.length, j = ue(m.extra), F = m.level == 0 ? 0 : 8, S = function(k, R) {
      if (k)
        c(), t(k, null);
      else {
        var B = R.length;
        f[g] = Xe(m, {
          size: D,
          crc: I.d(),
          c: R,
          f: A,
          m: z,
          u: T != y.length || z && d.length != P,
          compression: F
        }), s += 30 + T + j + B, o += 76 + 2 * (T + j) + (P || 0) + B, --a || h();
      }
    };
    if (T > 65535 && S("filename too long", null), !F)
      S(null, w);
    else if (D < 16e4)
      try {
        S(null, je(w, m));
      } catch (k) {
        S(k, null);
      }
    else
      u.push(dn(w, m, S));
  }, v = 0; v < l; ++v)
    p(v);
  return c;
}
function Ar(r, e) {
  e || (e = {});
  var t = {}, n = [];
  St(r, "", t, e);
  var i = 0, a = 0;
  for (var s in t) {
    var o = t[s], l = o[0], f = o[1], u = f.level == 0 ? 0 : 8, c = pe(s), h = c.length, p = f.comment, v = p && pe(p), g = v && v.length, y = ue(f.extra);
    if (h > 65535)
      throw "filename too long";
    var x = u ? je(l, f) : l, w = x.length, m = Me();
    m.p(l), n.push(Xe(f, {
      size: l.length,
      crc: m.d(),
      c: x,
      f: c,
      m: v,
      u: h != s.length || v && p.length != g,
      o: i,
      compression: u
    })), i += 30 + h + y + w, a += 76 + 2 * (h + y) + (g || 0) + w;
  }
  for (var I = new C(a + 22), D = i, A = a - i, T = 0; T < n.length; ++T) {
    var c = n[T];
    Ae(I, c.o, c, c.f, c.u, c.c.length);
    var d = 30 + c.f.length + ue(c.extra);
    I.set(c.c, c.o + d), Ae(I, i, c, c.f, c.u, c.c.length, c.o, c.m), i += 16 + d + (c.m ? c.m.length : 0);
  }
  return Ft(I, i, n.length, A, D), I;
}
var kn = /* @__PURE__ */ function() {
  function r() {
  }
  return r.prototype.push = function(e, t) {
    this.ondata(null, e, t);
  }, r.compression = 0, r;
}(), Pr = /* @__PURE__ */ function() {
  function r() {
    var e = this;
    this.i = new $(function(t, n) {
      e.ondata(null, t, n);
    });
  }
  return r.prototype.push = function(e, t) {
    try {
      this.i.push(e, t);
    } catch (n) {
      this.ondata(n, e, t);
    }
  }, r.compression = 8, r;
}(), Dr = /* @__PURE__ */ function() {
  function r(e, t) {
    var n = this;
    t < 32e4 ? this.i = new $(function(i, a) {
      n.ondata(null, i, a);
    }) : (this.i = new Ct(function(i, a, s) {
      n.ondata(i, a, s);
    }), this.terminate = this.i.terminate);
  }
  return r.prototype.push = function(e, t) {
    this.i.terminate && (e = _(e, 0)), this.i.push(e, t);
  }, r.compression = 8, r;
}(), Mr = /* @__PURE__ */ function() {
  function r(e) {
    this.onfile = e, this.k = [], this.o = {
      0: kn
    }, this.p = se;
  }
  return r.prototype.push = function(e, t) {
    var n = this;
    if (!this.onfile)
      throw "no callback";
    if (!this.p)
      throw "stream finished";
    if (this.c > 0) {
      var i = Math.min(this.c, e.length), a = e.subarray(0, i);
      if (this.c -= i, this.d ? this.d.push(a, !this.c) : this.k[0].push(a), e = e.subarray(i), e.length)
        return this.push(e, t);
    } else {
      var s = 0, o = 0, l = void 0, f = void 0;
      this.p.length ? e.length ? (f = new C(this.p.length + e.length), f.set(this.p), f.set(e, this.p.length)) : f = this.p : f = e;
      for (var u = f.length, c = this.c, h = c && this.d, p = function() {
        var x, w = G(f, o);
        if (w == 67324752) {
          s = 1, l = o, v.d = null, v.c = 0;
          var m = W(f, o + 6), I = W(f, o + 8), D = m & 2048, A = m & 8, T = W(f, o + 26), d = W(f, o + 28);
          if (u > o + 30 + T + d) {
            var z = [];
            v.k.unshift(z), s = 2;
            var P = G(f, o + 18), j = G(f, o + 22), F = kt(f.subarray(o + 30, o += 30 + T), !D);
            P == 4294967295 ? (x = A ? [-2] : Sn(f, o), P = x[0], j = x[1]) : A && (P = -1), o += d, v.c = P;
            var S, k = {
              name: F,
              compression: I,
              start: function() {
                if (!k.ondata)
                  throw "no callback";
                if (!P)
                  k.ondata(null, se, !0);
                else {
                  var R = n.o[I];
                  if (!R)
                    throw "unknown compression type " + I;
                  S = P < 0 ? new R(F) : new R(F, P, j), S.ondata = function(Y, N, K) {
                    k.ondata(Y, N, K);
                  };
                  for (var B = 0, E = z; B < E.length; B++) {
                    var Z = E[B];
                    S.push(Z, !1);
                  }
                  n.k[0] == z && n.c ? n.d = S : S.push(se, !0);
                }
              },
              terminate: function() {
                S && S.terminate && S.terminate();
              }
            };
            P >= 0 && (k.size = P, k.originalSize = j), v.onfile(k);
          }
          return "break";
        } else if (c) {
          if (w == 134695760)
            return l = o += 12 + (c == -2 && 8), s = 3, v.c = 0, "break";
          if (w == 33639248)
            return l = o -= 4, s = 3, v.c = 0, "break";
        }
      }, v = this; o < u - 4; ++o) {
        var g = p();
        if (g === "break")
          break;
      }
      if (this.p = se, c < 0) {
        var y = s ? f.subarray(0, l - 12 - (c == -2 && 8) - (G(f, l - 16) == 134695760 && 4)) : f.subarray(0, o);
        h ? h.push(y, !!s) : this.k[+(s == 2)].push(y);
      }
      if (s & 2)
        return this.push(f.subarray(o), t);
      this.p = f.subarray(o);
    }
    if (t) {
      if (this.c)
        throw "invalid zip file";
      this.p = null;
    }
  }, r.prototype.register = function(e) {
    this.o[e.compression] = e;
  }, r;
}();
function Cr(r, e) {
  if (typeof e != "function")
    throw "no callback";
  for (var t = [], n = function() {
    for (var h = 0; h < t.length; ++h)
      t[h]();
  }, i = {}, a = r.length - 22; G(r, a) != 101010256; --a)
    if (!a || r.length - a > 65558) {
      e("invalid zip file", null);
      return;
    }
  var s = W(r, a + 8);
  s || e(null, {});
  var o = s, l = G(r, a + 16), f = l == 4294967295;
  if (f) {
    if (a = G(r, a - 12), G(r, a) != 101075792) {
      e("invalid zip file", null);
      return;
    }
    o = s = G(r, a + 32), l = G(r, a + 48);
  }
  for (var u = function(h) {
    var p = Ln(r, l, f), v = p[0], g = p[1], y = p[2], x = p[3], w = p[4], m = p[5], I = Cn(r, m);
    l = w;
    var D = function(T, d) {
      T ? (n(), e(T, null)) : (i[x] = d, --s || e(null, i));
    };
    if (!v)
      D(null, _(r, I, I + g));
    else if (v == 8) {
      var A = r.subarray(I, I + g);
      if (g < 32e4)
        try {
          D(null, Fe(A, new C(y)));
        } catch (T) {
          D(T, null);
        }
      else
        t.push(Lt(A, { size: y }, D));
    } else
      D("unknown compression type " + v, null);
  }, c = 0; c < o; ++c)
    u();
  return n;
}
function Lr(r) {
  for (var e = {}, t = r.length - 22; G(r, t) != 101010256; --t)
    if (!t || r.length - t > 65558)
      throw "invalid zip file";
  var n = W(r, t + 8);
  if (!n)
    return {};
  var i = G(r, t + 16), a = i == 4294967295;
  if (a) {
    if (t = G(r, t - 12), G(r, t) != 101075792)
      throw "invalid zip file";
    n = G(r, t + 32), i = G(r, t + 48);
  }
  for (var s = 0; s < n; ++s) {
    var o = Ln(r, i, a), l = o[0], f = o[1], u = o[2], c = o[3], h = o[4], p = o[5], v = Cn(r, p);
    if (i = h, !l)
      e[c] = _(r, v, v + f);
    else if (l == 8)
      e[c] = Fe(r.subarray(v, v + f), new C(u));
    else
      throw "unknown compression type " + l;
  }
  return e;
}
const Sr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Deflate: ae,
  AsyncDeflate: yn,
  deflate: dn,
  deflateSync: je,
  Inflate: $,
  AsyncInflate: Ct,
  inflate: Lt,
  inflateSync: Fe,
  Gzip: _e,
  AsyncGzip: Kt,
  gzip: Wt,
  gzipSync: et,
  Gunzip: tt,
  AsyncGunzip: wn,
  gunzip: xn,
  gunzipSync: nt,
  Zlib: gt,
  AsyncZlib: hr,
  zlib: pr,
  zlibSync: mt,
  Unzlib: rt,
  AsyncUnzlib: In,
  unzlib: Tn,
  unzlibSync: Re,
  compress: Wt,
  AsyncCompress: Kt,
  compressSync: et,
  Compress: _e,
  Decompress: An,
  AsyncDecompress: vr,
  decompress: gr,
  decompressSync: mr,
  DecodeUTF8: yr,
  EncodeUTF8: dr,
  strToU8: pe,
  strFromU8: kt,
  ZipPassThrough: Ue,
  ZipDeflate: wr,
  AsyncZipDeflate: xr,
  Zip: Ir,
  zip: Tr,
  zipSync: Ar,
  UnzipPassThrough: kn,
  UnzipInflate: Pr,
  AsyncUnzipInflate: Dr,
  Unzip: Mr,
  unzip: Cr,
  unzipSync: Lr
}, Symbol.toStringTag, { value: "Module" }));
function Fn(r, e, t) {
  const n = t.length - r - 1;
  if (e >= t[n])
    return n - 1;
  if (e <= t[r])
    return r;
  let i = r, a = n, s = Math.floor((i + a) / 2);
  for (; e < t[s] || e >= t[s + 1]; )
    e < t[s] ? a = s : i = s, s = Math.floor((i + a) / 2);
  return s;
}
function kr(r, e, t, n) {
  const i = [], a = [], s = [];
  i[0] = 1;
  for (let o = 1; o <= t; ++o) {
    a[o] = e - n[r + 1 - o], s[o] = n[r + o] - e;
    let l = 0;
    for (let f = 0; f < o; ++f) {
      const u = s[f + 1], c = a[o - f], h = i[f] / (u + c);
      i[f] = l + u * h, l = c * h;
    }
    i[o] = l;
  }
  return i;
}
function Fr(r, e, t, n) {
  const i = Fn(r, n, e), a = kr(i, n, r, e), s = new it(0, 0, 0, 0);
  for (let o = 0; o <= r; ++o) {
    const l = t[i - r + o], f = a[o], u = l.w * f;
    s.x += l.x * u, s.y += l.y * u, s.z += l.z * u, s.w += l.w * f;
  }
  return s;
}
function Br(r, e, t, n, i) {
  const a = [];
  for (let c = 0; c <= t; ++c)
    a[c] = 0;
  const s = [];
  for (let c = 0; c <= n; ++c)
    s[c] = a.slice(0);
  const o = [];
  for (let c = 0; c <= t; ++c)
    o[c] = a.slice(0);
  o[0][0] = 1;
  const l = a.slice(0), f = a.slice(0);
  for (let c = 1; c <= t; ++c) {
    l[c] = e - i[r + 1 - c], f[c] = i[r + c] - e;
    let h = 0;
    for (let p = 0; p < c; ++p) {
      const v = f[p + 1], g = l[c - p];
      o[c][p] = v + g;
      const y = o[p][c - 1] / o[c][p];
      o[p][c] = h + v * y, h = g * y;
    }
    o[c][c] = h;
  }
  for (let c = 0; c <= t; ++c)
    s[0][c] = o[c][t];
  for (let c = 0; c <= t; ++c) {
    let h = 0, p = 1;
    const v = [];
    for (let g = 0; g <= t; ++g)
      v[g] = a.slice(0);
    v[0][0] = 1;
    for (let g = 1; g <= n; ++g) {
      let y = 0;
      const x = c - g, w = t - g;
      c >= g && (v[p][0] = v[h][0] / o[w + 1][x], y = v[p][0] * o[x][w]);
      const m = x >= -1 ? 1 : -x, I = c - 1 <= w ? g - 1 : t - c;
      for (let A = m; A <= I; ++A)
        v[p][A] = (v[h][A] - v[h][A - 1]) / o[w + 1][x + A], y += v[p][A] * o[x + A][w];
      c <= w && (v[p][g] = -v[h][g - 1] / o[w + 1][c], y += v[p][g] * o[c][w]), s[g][c] = y;
      const D = h;
      h = p, p = D;
    }
  }
  let u = t;
  for (let c = 1; c <= n; ++c) {
    for (let h = 0; h <= t; ++h)
      s[c][h] *= u;
    u *= t - c;
  }
  return s;
}
function Or(r, e, t, n, i) {
  const a = i < r ? i : r, s = [], o = Fn(r, n, e), l = Br(o, n, r, a, e), f = [];
  for (let u = 0; u < t.length; ++u) {
    const c = t[u].clone(), h = c.w;
    c.x *= h, c.y *= h, c.z *= h, f[u] = c;
  }
  for (let u = 0; u <= a; ++u) {
    const c = f[o - r].clone().multiplyScalar(l[u][0]);
    for (let h = 1; h <= r; ++h)
      c.add(f[o - r + h].clone().multiplyScalar(l[u][h]));
    s[u] = c;
  }
  for (let u = a + 1; u <= i + 1; ++u)
    s[u] = new it(0, 0, 0);
  return s;
}
function zr(r, e) {
  let t = 1;
  for (let i = 2; i <= r; ++i)
    t *= i;
  let n = 1;
  for (let i = 2; i <= e; ++i)
    n *= i;
  for (let i = 2; i <= r - e; ++i)
    n *= i;
  return t / n;
}
function Er(r) {
  const e = r.length, t = [], n = [];
  for (let a = 0; a < e; ++a) {
    const s = r[a];
    t[a] = new he(s.x, s.y, s.z), n[a] = s.w;
  }
  const i = [];
  for (let a = 0; a < e; ++a) {
    const s = t[a].clone();
    for (let o = 1; o <= a; ++o)
      s.sub(i[a - o].clone().multiplyScalar(zr(a, o) * n[o]));
    i[a] = s.divideScalar(n[0]);
  }
  return i;
}
function Rr(r, e, t, n, i) {
  const a = Or(r, e, t, n, i);
  return Er(a);
}
class qt extends Un {
  constructor(e, t, n, i, a) {
    super(), this.degree = e, this.knots = t, this.controlPoints = [], this.startKnot = i || 0, this.endKnot = a || this.knots.length - 1;
    for (let s = 0; s < n.length; ++s) {
      const o = n[s];
      this.controlPoints[s] = new it(o.x, o.y, o.z, o.w);
    }
  }
  getPoint(e, t = new he()) {
    const n = t, i = this.knots[this.startKnot] + e * (this.knots[this.endKnot] - this.knots[this.startKnot]), a = Fr(this.degree, this.knots, this.controlPoints, i);
    return a.w !== 1 && a.divideScalar(a.w), n.set(a.x, a.y, a.z);
  }
  getTangent(e, t = new he()) {
    const n = t, i = this.knots[0] + e * (this.knots[this.knots.length - 1] - this.knots[0]), a = Rr(this.degree, this.knots, this.controlPoints, i, 1);
    return n.copy(a[1]).normalize(), n;
  }
}
let M, V, H;
class Ur extends Vn {
  constructor(e) {
    super(e);
  }
  load(e, t, n, i) {
    const a = this, s = a.path === "" ? dt.extractUrlBase(e) : a.path, o = new Gn(this.manager);
    o.setPath(a.path), o.setResponseType("arraybuffer"), o.setRequestHeader(a.requestHeader), o.setWithCredentials(a.withCredentials), o.load(
      e,
      function(l) {
        try {
          t(a.parse(l, s));
        } catch (f) {
          i ? i(f) : console.error(f), a.manager.itemError(e);
        }
      },
      n,
      i
    );
  }
  parse(e, t) {
    if (Zr(e))
      M = new br().parse(e);
    else {
      const i = En(e);
      if (!Kr(i))
        throw new Error("FBXLoader: Unknown format.");
      if ($t(i) < 7e3)
        throw new Error("FBXLoader: FBX version not supported, FileVersion: " + $t(i));
      M = new jr().parse(i);
    }
    const n = new Xn(this.manager).setPath(this.resourcePath || t).setCrossOrigin(this.crossOrigin);
    return new Vr(n, this.manager).parse(M);
  }
}
class Vr {
  constructor(e, t) {
    this.textureLoader = e, this.manager = t;
  }
  parse() {
    V = this.parseConnections();
    const e = this.parseImages(), t = this.parseTextures(e), n = this.parseMaterials(t), i = this.parseDeformers(), a = new Gr().parse(i);
    return this.parseScene(i, a, n), H;
  }
  parseConnections() {
    const e = /* @__PURE__ */ new Map();
    return "Connections" in M && M.Connections.connections.forEach(function(n) {
      const i = n[0], a = n[1], s = n[2];
      e.has(i) || e.set(i, {
        parents: [],
        children: []
      });
      const o = {
        ID: a,
        relationship: s
      };
      e.get(i).parents.push(o), e.has(a) || e.set(a, {
        parents: [],
        children: []
      });
      const l = {
        ID: i,
        relationship: s
      };
      e.get(a).children.push(l);
    }), e;
  }
  parseImages() {
    const e = {}, t = {};
    if ("Video" in M.Objects) {
      const n = M.Objects.Video;
      for (const i in n) {
        const a = n[i], s = parseInt(i);
        if (e[s] = a.RelativeFilename || a.Filename, "Content" in a) {
          const o = a.Content instanceof ArrayBuffer && a.Content.byteLength > 0, l = typeof a.Content == "string" && a.Content !== "";
          if (o || l) {
            const f = this.parseImage(n[i]);
            t[a.RelativeFilename || a.Filename] = f;
          }
        }
      }
    }
    for (const n in e) {
      const i = e[n];
      t[i] !== void 0 ? e[n] = t[i] : e[n] = e[n].split("\\").pop();
    }
    return e;
  }
  parseImage(e) {
    const t = e.Content, n = e.RelativeFilename || e.Filename, i = n.slice(n.lastIndexOf(".") + 1).toLowerCase();
    let a;
    switch (i) {
      case "bmp":
        a = "image/bmp";
        break;
      case "jpg":
      case "jpeg":
        a = "image/jpeg";
        break;
      case "png":
        a = "image/png";
        break;
      case "tif":
        a = "image/tiff";
        break;
      case "tga":
        this.manager.getHandler(".tga") === null && console.warn("FBXLoader: TGA loader not found, skipping ", n), a = "image/tga";
        break;
      default:
        console.warn('FBXLoader: Image type "' + i + '" is not supported.');
        return;
    }
    if (typeof t == "string")
      return "data:" + a + ";base64," + t;
    {
      const s = new Uint8Array(t);
      return window.URL.createObjectURL(new Blob([s], { type: a }));
    }
  }
  parseTextures(e) {
    const t = /* @__PURE__ */ new Map();
    if ("Texture" in M.Objects) {
      const n = M.Objects.Texture;
      for (const i in n) {
        const a = this.parseTexture(n[i], e);
        t.set(parseInt(i), a);
      }
    }
    return t;
  }
  parseTexture(e, t) {
    const n = this.loadTexture(e, t);
    n.ID = e.id, n.name = e.attrName;
    const i = e.WrapModeU, a = e.WrapModeV, s = i !== void 0 ? i.value : 0, o = a !== void 0 ? a.value : 0;
    if (n.wrapS = s === 0 ? Et : Rt, n.wrapT = o === 0 ? Et : Rt, "Scaling" in e) {
      const l = e.Scaling.value;
      n.repeat.x = l[0], n.repeat.y = l[1];
    }
    if ("Translation" in e) {
      const l = e.Translation.value;
      n.offset.x = l[0], n.offset.y = l[1];
    }
    return n;
  }
  loadTexture(e, t) {
    let n;
    const i = this.textureLoader.path, a = V.get(e.id).children;
    a !== void 0 && a.length > 0 && t[a[0].ID] !== void 0 && (n = t[a[0].ID], (n.indexOf("blob:") === 0 || n.indexOf("data:") === 0) && this.textureLoader.setPath(void 0));
    let s;
    const o = e.FileName.slice(-3).toLowerCase();
    if (o === "tga") {
      const l = this.manager.getHandler(".tga");
      l === null ? (console.warn("FBXLoader: TGA loader not found, creating placeholder texture for", e.RelativeFilename), s = new Ut()) : (l.setPath(this.textureLoader.path), s = l.load(n));
    } else
      o === "psd" ? (console.warn(
        "FBXLoader: PSD textures are not supported, creating placeholder texture for",
        e.RelativeFilename
      ), s = new Ut()) : s = this.textureLoader.load(n);
    return this.textureLoader.setPath(i), s;
  }
  parseMaterials(e) {
    const t = /* @__PURE__ */ new Map();
    if ("Material" in M.Objects) {
      const n = M.Objects.Material;
      for (const i in n) {
        const a = this.parseMaterial(n[i], e);
        a !== null && t.set(parseInt(i), a);
      }
    }
    return t;
  }
  parseMaterial(e, t) {
    const n = e.id, i = e.attrName;
    let a = e.ShadingModel;
    if (typeof a == "object" && (a = a.value), !V.has(n))
      return null;
    const s = this.parseParameters(e, t, n), o = new Vt();
    return o.setValues(s), o.name = i, o;
  }
  parseParameters(e, t, n) {
    const i = {};
    e.BumpFactor && (i.bumpScale = e.BumpFactor.value), e.Diffuse ? i.color = new ye().fromArray(e.Diffuse.value) : e.DiffuseColor && (e.DiffuseColor.type === "Color" || e.DiffuseColor.type === "ColorRGB") && (i.color = new ye().fromArray(e.DiffuseColor.value)), e.DisplacementFactor && (i.displacementScale = e.DisplacementFactor.value), e.Emissive ? i.emissive = new ye().fromArray(e.Emissive.value) : e.EmissiveColor && (e.EmissiveColor.type === "Color" || e.EmissiveColor.type === "ColorRGB") && (i.emissive = new ye().fromArray(e.EmissiveColor.value)), e.EmissiveFactor && (i.emissiveIntensity = parseFloat(e.EmissiveFactor.value)), e.Opacity && (i.opacity = parseFloat(e.Opacity.value)), i.opacity < 1 && (i.transparent = !0);
    const a = this;
    return V.get(n).children.forEach(function(s) {
      const o = s.relationship;
      switch (o) {
        case "Bump":
          i.bumpMap = a.getTexture(t, s.ID);
          break;
        case "Maya|TEX_ao_map":
          i.aoMap = a.getTexture(t, s.ID);
          break;
        case "DiffuseColor":
        case "Maya|TEX_color_map":
          i.map = a.getTexture(t, s.ID);
          break;
        case "DisplacementColor":
          i.displacementMap = a.getTexture(t, s.ID);
          break;
        case "EmissiveColor":
          i.emissiveMap = a.getTexture(t, s.ID);
          break;
        case "NormalMap":
        case "Maya|TEX_normal_map":
          i.normalMap = a.getTexture(t, s.ID);
          break;
        case "ReflectionColor":
          i.envMap = a.getTexture(t, s.ID), i.envMap !== void 0 && (i.envMap.mapping = jn);
          break;
        case "TransparentColor":
        case "TransparencyFactor":
          i.alphaMap = a.getTexture(t, s.ID), i.transparent = !0;
          break;
        case "AmbientColor":
        case "VectorDisplacementColor":
        default:
          console.warn("FBXLoader: %s map is not supported, skipping texture.", o);
          break;
      }
    }), i;
  }
  getTexture(e, t) {
    return "LayeredTexture" in M.Objects && t in M.Objects.LayeredTexture && (console.warn("FBXLoader: layered textures are not supported. Discarding all but first layer."), t = V.get(t).children[0].ID), e.get(t);
  }
  parseDeformers() {
    const e = {}, t = {};
    if ("Deformer" in M.Objects) {
      const n = M.Objects.Deformer;
      for (const i in n) {
        const a = n[i], s = V.get(parseInt(i));
        if (a.attrType === "Skin") {
          const o = this.parseSkeleton(s, n);
          o.ID = i, s.parents.length > 1 && console.warn("FBXLoader: skeleton attached to more than one geometry is not supported."), o.geometryID = s.parents[0].ID, e[i] = o;
        } else if (a.attrType === "BlendShape") {
          const o = {
            id: i
          };
          o.rawTargets = this.parseMorphTargets(s, n), o.id = i, s.parents.length > 1 && console.warn("FBXLoader: morph target attached to more than one geometry is not supported."), t[i] = o;
        }
      }
    }
    return {
      skeletons: e,
      morphTargets: t
    };
  }
  parseSkeleton(e, t) {
    const n = [];
    return e.children.forEach(function(i) {
      const a = t[i.ID];
      if (a.attrType !== "Cluster")
        return;
      const s = {
        ID: i.ID,
        indices: [],
        weights: [],
        transformLink: new U().fromArray(a.TransformLink.a)
      };
      "Indexes" in a && (s.indices = a.Indexes.a, s.weights = a.Weights.a), n.push(s);
    }), {
      rawBones: n,
      bones: []
    };
  }
  parseMorphTargets(e, t) {
    const n = [];
    for (let i = 0; i < e.children.length; i++) {
      const a = e.children[i], s = t[a.ID], o = {
        name: s.attrName,
        initialWeight: s.DeformPercent,
        id: s.id,
        fullWeights: s.FullWeights.a
      };
      if (s.attrType !== "BlendShapeChannel")
        return;
      o.geoID = V.get(parseInt(a.ID)).children.filter(function(l) {
        return l.relationship === void 0;
      })[0].ID, n.push(o);
    }
    return n;
  }
  parseScene(e, t, n) {
    H = new Gt();
    const i = this.parseModels(e.skeletons, t, n), a = M.Objects.Model, s = this;
    i.forEach(function(l) {
      const f = a[l.ID];
      s.setLookAtProperties(l, f), V.get(l.ID).parents.forEach(function(c) {
        const h = i.get(c.ID);
        h !== void 0 && h.add(l);
      }), l.parent === null && H.add(l);
    }), this.bindSkeleton(e.skeletons, t, i), this.createAmbientLight(), H.traverse(function(l) {
      if (l.userData.transformData) {
        l.parent && (l.userData.transformData.parentMatrix = l.parent.matrix, l.userData.transformData.parentMatrixWorld = l.parent.matrixWorld);
        const f = On(l.userData.transformData);
        l.applyMatrix4(f), l.updateWorldMatrix();
      }
    });
    const o = new Xr().parse();
    H.children.length === 1 && H.children[0].isGroup && (H.children[0].animations = o, H = H.children[0]), H.animations = o;
  }
  parseModels(e, t, n) {
    const i = /* @__PURE__ */ new Map(), a = M.Objects.Model;
    for (const s in a) {
      const o = parseInt(s), l = a[s], f = V.get(o);
      let u = this.buildSkeleton(f, e, o, l.attrName);
      if (!u) {
        switch (l.attrType) {
          case "Camera":
            u = this.createCamera(f);
            break;
          case "Light":
            u = this.createLight(f);
            break;
          case "Mesh":
            u = this.createMesh(f, t, n);
            break;
          case "NurbsCurve":
            u = this.createCurve(f, t);
            break;
          case "LimbNode":
          case "Root":
            u = new ft();
            break;
          case "Null":
          default:
            u = new Gt();
            break;
        }
        u.name = l.attrName ? Ne.sanitizeNodeName(l.attrName) : "", u.ID = o;
      }
      this.getTransformData(u, l), i.set(o, u);
    }
    return i;
  }
  buildSkeleton(e, t, n, i) {
    let a = null;
    return e.parents.forEach(function(s) {
      for (const o in t) {
        const l = t[o];
        l.rawBones.forEach(function(f, u) {
          if (f.ID === s.ID) {
            const c = a;
            a = new ft(), a.matrixWorld.copy(f.transformLink), a.name = i ? Ne.sanitizeNodeName(i) : "", a.ID = n, l.bones[u] = a, c !== null && a.add(c);
          }
        });
      }
    }), a;
  }
  createCamera(e) {
    let t, n;
    if (e.children.forEach(function(i) {
      const a = M.Objects.NodeAttribute[i.ID];
      a !== void 0 && (n = a);
    }), n === void 0)
      t = new st();
    else {
      let i = 0;
      n.CameraProjectionType !== void 0 && n.CameraProjectionType.value === 1 && (i = 1);
      let a = 1;
      n.NearPlane !== void 0 && (a = n.NearPlane.value / 1e3);
      let s = 1e3;
      n.FarPlane !== void 0 && (s = n.FarPlane.value / 1e3);
      let o = window.innerWidth, l = window.innerHeight;
      n.AspectWidth !== void 0 && n.AspectHeight !== void 0 && (o = n.AspectWidth.value, l = n.AspectHeight.value);
      const f = o / l;
      let u = 45;
      n.FieldOfView !== void 0 && (u = n.FieldOfView.value);
      const c = n.FocalLength ? n.FocalLength.value : null;
      switch (i) {
        case 0:
          t = new Zn(u, f, a, s), c !== null && t.setFocalLength(c);
          break;
        case 1:
          t = new bn(
            -o / 2,
            o / 2,
            l / 2,
            -l / 2,
            a,
            s
          );
          break;
        default:
          console.warn("FBXLoader: Unknown camera type " + i + "."), t = new st();
          break;
      }
    }
    return t;
  }
  createLight(e) {
    let t, n;
    if (e.children.forEach(function(i) {
      const a = M.Objects.NodeAttribute[i.ID];
      a !== void 0 && (n = a);
    }), n === void 0)
      t = new st();
    else {
      let i;
      n.LightType === void 0 ? i = 0 : i = n.LightType.value;
      let a = 16777215;
      n.Color !== void 0 && (a = new ye().fromArray(n.Color.value));
      let s = n.Intensity === void 0 ? 1 : n.Intensity.value / 100;
      n.CastLightOnObject !== void 0 && n.CastLightOnObject.value === 0 && (s = 0);
      let o = 0;
      n.FarAttenuationEnd !== void 0 && (n.EnableFarAttenuation !== void 0 && n.EnableFarAttenuation.value === 0 ? o = 0 : o = n.FarAttenuationEnd.value);
      const l = 1;
      switch (i) {
        case 0:
          t = new Xt(a, s, o, l);
          break;
        case 1:
          t = new Wn(a, s);
          break;
        case 2:
          let f = Math.PI / 3;
          n.InnerAngle !== void 0 && (f = ie.degToRad(n.InnerAngle.value));
          let u = 0;
          n.OuterAngle !== void 0 && (u = ie.degToRad(n.OuterAngle.value), u = Math.max(u, 1)), t = new Kn(a, s, o, f, u, l);
          break;
        default:
          console.warn(
            "FBXLoader: Unknown light type " + n.LightType.value + ", defaulting to a PointLight."
          ), t = new Xt(a, s);
          break;
      }
      n.CastShadows !== void 0 && n.CastShadows.value === 1 && (t.castShadow = !0);
    }
    return t;
  }
  createMesh(e, t, n) {
    let i, a = null, s = null;
    const o = [];
    return e.children.forEach(function(l) {
      t.has(l.ID) && (a = t.get(l.ID)), n.has(l.ID) && o.push(n.get(l.ID));
    }), o.length > 1 ? s = o : o.length > 0 ? s = o[0] : (s = new Vt({ color: 13421772 }), o.push(s)), "color" in a.attributes && o.forEach(function(l) {
      l.vertexColors = !0;
    }), a.FBX_Deformer ? (i = new Yn(a, s), i.normalizeSkinWeights()) : i = new qn(a, s), i;
  }
  createCurve(e, t) {
    const n = e.children.reduce(function(a, s) {
      return t.has(s.ID) && (a = t.get(s.ID)), a;
    }, null), i = new Hn({
      color: 3342591,
      linewidth: 1
    });
    return new $n(n, i);
  }
  getTransformData(e, t) {
    const n = {};
    "InheritType" in t && (n.inheritType = parseInt(t.InheritType.value)), "RotationOrder" in t ? n.eulerOrder = zn(t.RotationOrder.value) : n.eulerOrder = "ZYX", "Lcl_Translation" in t && (n.translation = t.Lcl_Translation.value), "PreRotation" in t && (n.preRotation = t.PreRotation.value), "Lcl_Rotation" in t && (n.rotation = t.Lcl_Rotation.value), "PostRotation" in t && (n.postRotation = t.PostRotation.value), "Lcl_Scaling" in t && (n.scale = t.Lcl_Scaling.value), "ScalingOffset" in t && (n.scalingOffset = t.ScalingOffset.value), "ScalingPivot" in t && (n.scalingPivot = t.ScalingPivot.value), "RotationOffset" in t && (n.rotationOffset = t.RotationOffset.value), "RotationPivot" in t && (n.rotationPivot = t.RotationPivot.value), e.userData.transformData = n;
  }
  setLookAtProperties(e, t) {
    "LookAtProperty" in t && V.get(e.ID).children.forEach(function(i) {
      if (i.relationship === "LookAtProperty") {
        const a = M.Objects.Model[i.ID];
        if ("Lcl_Translation" in a) {
          const s = a.Lcl_Translation.value;
          e.target !== void 0 ? (e.target.position.fromArray(s), H.add(e.target)) : e.lookAt(new he().fromArray(s));
        }
      }
    });
  }
  bindSkeleton(e, t, n) {
    const i = this.parsePoseNodes();
    for (const a in e) {
      const s = e[a];
      V.get(parseInt(s.ID)).parents.forEach(function(l) {
        if (t.has(l.ID)) {
          const f = l.ID;
          V.get(f).parents.forEach(function(c) {
            n.has(c.ID) && n.get(c.ID).bind(new Nn(s.bones), i[c.ID]);
          });
        }
      });
    }
  }
  parsePoseNodes() {
    const e = {};
    if ("Pose" in M.Objects) {
      const t = M.Objects.Pose;
      for (const n in t)
        if (t[n].attrType === "BindPose" && t[n].NbPoseNodes > 0) {
          const i = t[n].PoseNode;
          Array.isArray(i) ? i.forEach(function(a) {
            e[a.Node] = new U().fromArray(a.Matrix.a);
          }) : e[i.Node] = new U().fromArray(i.Matrix.a);
        }
    }
    return e;
  }
  createAmbientLight() {
    if ("GlobalSettings" in M && "AmbientColor" in M.GlobalSettings) {
      const e = M.GlobalSettings.AmbientColor.value, t = e[0], n = e[1], i = e[2];
      if (t !== 0 || n !== 0 || i !== 0) {
        const a = new ye(t, n, i);
        H.add(new Qn(a, 1));
      }
    }
  }
}
class Gr {
  constructor() {
    this.negativeMaterialIndices = !1;
  }
  parse(e) {
    const t = /* @__PURE__ */ new Map();
    if ("Geometry" in M.Objects) {
      const n = M.Objects.Geometry;
      for (const i in n) {
        const a = V.get(parseInt(i)), s = this.parseGeometry(a, n[i], e);
        t.set(parseInt(i), s);
      }
    }
    return this.negativeMaterialIndices === !0 && console.warn(
      "FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected."
    ), t;
  }
  parseGeometry(e, t, n) {
    switch (t.attrType) {
      case "Mesh":
        return this.parseMeshGeometry(e, t, n);
      case "NurbsCurve":
        return this.parseNurbsGeometry(t);
    }
  }
  parseMeshGeometry(e, t, n) {
    const i = n.skeletons, a = [], s = e.parents.map(function(c) {
      return M.Objects.Model[c.ID];
    });
    if (s.length === 0)
      return;
    const o = e.children.reduce(function(c, h) {
      return i[h.ID] !== void 0 && (c = i[h.ID]), c;
    }, null);
    e.children.forEach(function(c) {
      n.morphTargets[c.ID] !== void 0 && a.push(n.morphTargets[c.ID]);
    });
    const l = s[0], f = {};
    "RotationOrder" in l && (f.eulerOrder = zn(l.RotationOrder.value)), "InheritType" in l && (f.inheritType = parseInt(l.InheritType.value)), "GeometricTranslation" in l && (f.translation = l.GeometricTranslation.value), "GeometricRotation" in l && (f.rotation = l.GeometricRotation.value), "GeometricScaling" in l && (f.scale = l.GeometricScaling.value);
    const u = On(f);
    return this.genGeometry(t, o, a, u);
  }
  genGeometry(e, t, n, i) {
    const a = new Ze();
    e.attrName && (a.name = e.attrName);
    const s = this.parseGeoNode(e, t), o = this.genBuffers(s), l = new de(o.vertex, 3);
    if (l.applyMatrix4(i), a.setAttribute("position", l), o.colors.length > 0 && a.setAttribute("color", new de(o.colors, 3)), t && (a.setAttribute("skinIndex", new Jn(o.weightsIndices, 4)), a.setAttribute("skinWeight", new de(o.vertexWeights, 4)), a.FBX_Deformer = t), o.normal.length > 0) {
      const f = new _n().getNormalMatrix(i), u = new de(o.normal, 3);
      u.applyNormalMatrix(f), a.setAttribute("normal", u);
    }
    if (o.uvs.forEach(function(f, u) {
      let c = "uv" + (u + 1).toString();
      u === 0 && (c = "uv"), a.setAttribute(c, new de(o.uvs[u], 2));
    }), s.material && s.material.mappingType !== "AllSame") {
      let f = o.materialIndex[0], u = 0;
      if (o.materialIndex.forEach(function(c, h) {
        c !== f && (a.addGroup(u, h - u, f), f = c, u = h);
      }), a.groups.length > 0) {
        const c = a.groups[a.groups.length - 1], h = c.start + c.count;
        h !== o.materialIndex.length && a.addGroup(h, o.materialIndex.length - h, f);
      }
      a.groups.length === 0 && a.addGroup(0, o.materialIndex.length, o.materialIndex[0]);
    }
    return this.addMorphTargets(a, e, n, i), a;
  }
  parseGeoNode(e, t) {
    const n = {};
    if (n.vertexPositions = e.Vertices !== void 0 ? e.Vertices.a : [], n.vertexIndices = e.PolygonVertexIndex !== void 0 ? e.PolygonVertexIndex.a : [], e.LayerElementColor && (n.color = this.parseVertexColors(e.LayerElementColor[0])), e.LayerElementMaterial && (n.material = this.parseMaterialIndices(e.LayerElementMaterial[0])), e.LayerElementNormal && (n.normal = this.parseNormals(e.LayerElementNormal[0])), e.LayerElementUV) {
      n.uv = [];
      let i = 0;
      for (; e.LayerElementUV[i]; )
        e.LayerElementUV[i].UV && n.uv.push(this.parseUVs(e.LayerElementUV[i])), i++;
    }
    return n.weightTable = {}, t !== null && (n.skeleton = t, t.rawBones.forEach(function(i, a) {
      i.indices.forEach(function(s, o) {
        n.weightTable[s] === void 0 && (n.weightTable[s] = []), n.weightTable[s].push({
          id: a,
          weight: i.weights[o]
        });
      });
    })), n;
  }
  genBuffers(e) {
    const t = {
      vertex: [],
      normal: [],
      colors: [],
      uvs: [],
      materialIndex: [],
      vertexWeights: [],
      weightsIndices: []
    };
    let n = 0, i = 0, a = !1, s = [], o = [], l = [], f = [], u = [], c = [];
    const h = this;
    return e.vertexIndices.forEach(function(p, v) {
      let g, y = !1;
      p < 0 && (p = p ^ -1, y = !0);
      let x = [], w = [];
      if (s.push(p * 3, p * 3 + 1, p * 3 + 2), e.color) {
        const m = Ye(v, n, p, e.color);
        l.push(m[0], m[1], m[2]);
      }
      if (e.skeleton) {
        if (e.weightTable[p] !== void 0 && e.weightTable[p].forEach(function(m) {
          w.push(m.weight), x.push(m.id);
        }), w.length > 4) {
          a || (console.warn(
            "FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."
          ), a = !0);
          const m = [0, 0, 0, 0], I = [0, 0, 0, 0];
          w.forEach(function(D, A) {
            let T = D, d = x[A];
            I.forEach(function(z, P, j) {
              if (T > z) {
                j[P] = T, T = z;
                const F = m[P];
                m[P] = d, d = F;
              }
            });
          }), x = m, w = I;
        }
        for (; w.length < 4; )
          w.push(0), x.push(0);
        for (let m = 0; m < 4; ++m)
          u.push(w[m]), c.push(x[m]);
      }
      if (e.normal) {
        const m = Ye(v, n, p, e.normal);
        o.push(m[0], m[1], m[2]);
      }
      e.material && e.material.mappingType !== "AllSame" && (g = Ye(v, n, p, e.material)[0], g < 0 && (h.negativeMaterialIndices = !0, g = 0)), e.uv && e.uv.forEach(function(m, I) {
        const D = Ye(v, n, p, m);
        f[I] === void 0 && (f[I] = []), f[I].push(D[0]), f[I].push(D[1]);
      }), i++, y && (h.genFace(
        t,
        e,
        s,
        g,
        o,
        l,
        f,
        u,
        c,
        i
      ), n++, i = 0, s = [], o = [], l = [], f = [], u = [], c = []);
    }), t;
  }
  genFace(e, t, n, i, a, s, o, l, f, u) {
    for (let c = 2; c < u; c++)
      e.vertex.push(t.vertexPositions[n[0]]), e.vertex.push(t.vertexPositions[n[1]]), e.vertex.push(t.vertexPositions[n[2]]), e.vertex.push(t.vertexPositions[n[(c - 1) * 3]]), e.vertex.push(t.vertexPositions[n[(c - 1) * 3 + 1]]), e.vertex.push(t.vertexPositions[n[(c - 1) * 3 + 2]]), e.vertex.push(t.vertexPositions[n[c * 3]]), e.vertex.push(t.vertexPositions[n[c * 3 + 1]]), e.vertex.push(t.vertexPositions[n[c * 3 + 2]]), t.skeleton && (e.vertexWeights.push(l[0]), e.vertexWeights.push(l[1]), e.vertexWeights.push(l[2]), e.vertexWeights.push(l[3]), e.vertexWeights.push(l[(c - 1) * 4]), e.vertexWeights.push(l[(c - 1) * 4 + 1]), e.vertexWeights.push(l[(c - 1) * 4 + 2]), e.vertexWeights.push(l[(c - 1) * 4 + 3]), e.vertexWeights.push(l[c * 4]), e.vertexWeights.push(l[c * 4 + 1]), e.vertexWeights.push(l[c * 4 + 2]), e.vertexWeights.push(l[c * 4 + 3]), e.weightsIndices.push(f[0]), e.weightsIndices.push(f[1]), e.weightsIndices.push(f[2]), e.weightsIndices.push(f[3]), e.weightsIndices.push(f[(c - 1) * 4]), e.weightsIndices.push(f[(c - 1) * 4 + 1]), e.weightsIndices.push(f[(c - 1) * 4 + 2]), e.weightsIndices.push(f[(c - 1) * 4 + 3]), e.weightsIndices.push(f[c * 4]), e.weightsIndices.push(f[c * 4 + 1]), e.weightsIndices.push(f[c * 4 + 2]), e.weightsIndices.push(f[c * 4 + 3])), t.color && (e.colors.push(s[0]), e.colors.push(s[1]), e.colors.push(s[2]), e.colors.push(s[(c - 1) * 3]), e.colors.push(s[(c - 1) * 3 + 1]), e.colors.push(s[(c - 1) * 3 + 2]), e.colors.push(s[c * 3]), e.colors.push(s[c * 3 + 1]), e.colors.push(s[c * 3 + 2])), t.material && t.material.mappingType !== "AllSame" && (e.materialIndex.push(i), e.materialIndex.push(i), e.materialIndex.push(i)), t.normal && (e.normal.push(a[0]), e.normal.push(a[1]), e.normal.push(a[2]), e.normal.push(a[(c - 1) * 3]), e.normal.push(a[(c - 1) * 3 + 1]), e.normal.push(a[(c - 1) * 3 + 2]), e.normal.push(a[c * 3]), e.normal.push(a[c * 3 + 1]), e.normal.push(a[c * 3 + 2])), t.uv && t.uv.forEach(function(h, p) {
        e.uvs[p] === void 0 && (e.uvs[p] = []), e.uvs[p].push(o[p][0]), e.uvs[p].push(o[p][1]), e.uvs[p].push(o[p][(c - 1) * 2]), e.uvs[p].push(o[p][(c - 1) * 2 + 1]), e.uvs[p].push(o[p][c * 2]), e.uvs[p].push(o[p][c * 2 + 1]);
      });
  }
  addMorphTargets(e, t, n, i) {
    if (n.length === 0)
      return;
    e.morphTargetsRelative = !0, e.morphAttributes.position = [];
    const a = this;
    n.forEach(function(s) {
      s.rawTargets.forEach(function(o) {
        const l = M.Objects.Geometry[o.geoID];
        l !== void 0 && a.genMorphGeometry(e, t, l, i, o.name);
      });
    });
  }
  genMorphGeometry(e, t, n, i, a) {
    const s = t.PolygonVertexIndex !== void 0 ? t.PolygonVertexIndex.a : [], o = n.Vertices !== void 0 ? n.Vertices.a : [], l = n.Indexes !== void 0 ? n.Indexes.a : [], f = e.attributes.position.count * 3, u = new Float32Array(f);
    for (let v = 0; v < l.length; v++) {
      const g = l[v] * 3;
      u[g] = o[v * 3], u[g + 1] = o[v * 3 + 1], u[g + 2] = o[v * 3 + 2];
    }
    const c = {
      vertexIndices: s,
      vertexPositions: u
    }, h = this.genBuffers(c), p = new de(h.vertex, 3);
    p.name = a || n.attrName, p.applyMatrix4(i), e.morphAttributes.position.push(p);
  }
  parseNormals(e) {
    const t = e.MappingInformationType, n = e.ReferenceInformationType, i = e.Normals.a;
    let a = [];
    return n === "IndexToDirect" && ("NormalIndex" in e ? a = e.NormalIndex.a : "NormalsIndex" in e && (a = e.NormalsIndex.a)), {
      dataSize: 3,
      buffer: i,
      indices: a,
      mappingType: t,
      referenceType: n
    };
  }
  parseUVs(e) {
    const t = e.MappingInformationType, n = e.ReferenceInformationType, i = e.UV.a;
    let a = [];
    return n === "IndexToDirect" && (a = e.UVIndex.a), {
      dataSize: 2,
      buffer: i,
      indices: a,
      mappingType: t,
      referenceType: n
    };
  }
  parseVertexColors(e) {
    const t = e.MappingInformationType, n = e.ReferenceInformationType, i = e.Colors.a;
    let a = [];
    return n === "IndexToDirect" && (a = e.ColorIndex.a), {
      dataSize: 4,
      buffer: i,
      indices: a,
      mappingType: t,
      referenceType: n
    };
  }
  parseMaterialIndices(e) {
    const t = e.MappingInformationType, n = e.ReferenceInformationType;
    if (t === "NoMappingInformation")
      return {
        dataSize: 1,
        buffer: [0],
        indices: [0],
        mappingType: "AllSame",
        referenceType: n
      };
    const i = e.Materials.a, a = [];
    for (let s = 0; s < i.length; ++s)
      a.push(s);
    return {
      dataSize: 1,
      buffer: i,
      indices: a,
      mappingType: t,
      referenceType: n
    };
  }
  parseNurbsGeometry(e) {
    if (qt === void 0)
      return console.error(
        "FBXLoader: The loader relies on NURBSCurve for any nurbs present in the model. Nurbs will show up as empty geometry."
      ), new Ze();
    const t = parseInt(e.Order);
    if (isNaN(t))
      return console.error("FBXLoader: Invalid Order %s given for geometry ID: %s", e.Order, e.id), new Ze();
    const n = t - 1, i = e.KnotVector.a, a = [], s = e.Points.a;
    for (let c = 0, h = s.length; c < h; c += 4)
      a.push(new it().fromArray(s, c));
    let o, l;
    if (e.Form === "Closed")
      a.push(a[0]);
    else if (e.Form === "Periodic") {
      o = n, l = i.length - 1 - o;
      for (let c = 0; c < n; ++c)
        a.push(a[c]);
    }
    const u = new qt(n, i, a, o, l).getPoints(a.length * 12);
    return new Ze().setFromPoints(u);
  }
}
class Xr {
  parse() {
    const e = [], t = this.parseClips();
    if (t !== void 0)
      for (const n in t) {
        const i = t[n], a = this.addClip(i);
        e.push(a);
      }
    return e;
  }
  parseClips() {
    if (M.Objects.AnimationCurve === void 0)
      return;
    const e = this.parseAnimationCurveNodes();
    this.parseAnimationCurves(e);
    const t = this.parseAnimationLayers(e);
    return this.parseAnimStacks(t);
  }
  parseAnimationCurveNodes() {
    const e = M.Objects.AnimationCurveNode, t = /* @__PURE__ */ new Map();
    for (const n in e) {
      const i = e[n];
      if (i.attrName.match(/S|R|T|DeformPercent/) !== null) {
        const a = {
          id: i.id,
          attr: i.attrName,
          curves: {}
        };
        t.set(a.id, a);
      }
    }
    return t;
  }
  parseAnimationCurves(e) {
    const t = M.Objects.AnimationCurve;
    for (const n in t) {
      const i = {
        id: t[n].id,
        times: t[n].KeyTime.a.map(Wr),
        values: t[n].KeyValueFloat.a
      }, a = V.get(i.id);
      if (a !== void 0) {
        const s = a.parents[0].ID, o = a.parents[0].relationship;
        o.match(/X/) ? e.get(s).curves.x = i : o.match(/Y/) ? e.get(s).curves.y = i : o.match(/Z/) ? e.get(s).curves.z = i : o.match(/d|DeformPercent/) && e.has(s) && (e.get(s).curves.morph = i);
      }
    }
  }
  parseAnimationLayers(e) {
    const t = M.Objects.AnimationLayer, n = /* @__PURE__ */ new Map();
    for (const i in t) {
      const a = [], s = V.get(parseInt(i));
      s !== void 0 && (s.children.forEach(function(l, f) {
        if (e.has(l.ID)) {
          const u = e.get(l.ID);
          if (u.curves.x !== void 0 || u.curves.y !== void 0 || u.curves.z !== void 0) {
            if (a[f] === void 0) {
              const c = V.get(l.ID).parents.filter(function(h) {
                return h.relationship !== void 0;
              })[0].ID;
              if (c !== void 0) {
                const h = M.Objects.Model[c.toString()];
                if (h === void 0) {
                  console.warn("FBXLoader: Encountered a unused curve.", l);
                  return;
                }
                const p = {
                  modelName: h.attrName ? Ne.sanitizeNodeName(h.attrName) : "",
                  ID: h.id,
                  initialPosition: [0, 0, 0],
                  initialRotation: [0, 0, 0],
                  initialScale: [1, 1, 1]
                };
                H.traverse(function(v) {
                  v.ID === h.id && (p.transform = v.matrix, v.userData.transformData && (p.eulerOrder = v.userData.transformData.eulerOrder));
                }), p.transform || (p.transform = new U()), "PreRotation" in h && (p.preRotation = h.PreRotation.value), "PostRotation" in h && (p.postRotation = h.PostRotation.value), a[f] = p;
              }
            }
            a[f] && (a[f][u.attr] = u);
          } else if (u.curves.morph !== void 0) {
            if (a[f] === void 0) {
              const c = V.get(l.ID).parents.filter(function(x) {
                return x.relationship !== void 0;
              })[0].ID, h = V.get(c).parents[0].ID, p = V.get(h).parents[0].ID, v = V.get(p).parents[0].ID, g = M.Objects.Model[v], y = {
                modelName: g.attrName ? Ne.sanitizeNodeName(g.attrName) : "",
                morphName: M.Objects.Deformer[c].attrName
              };
              a[f] = y;
            }
            a[f][u.attr] = u;
          }
        }
      }), n.set(parseInt(i), a));
    }
    return n;
  }
  parseAnimStacks(e) {
    const t = M.Objects.AnimationStack, n = {};
    for (const i in t) {
      const a = V.get(parseInt(i)).children;
      a.length > 1 && console.warn(
        "FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers."
      );
      const s = e.get(a[0].ID);
      n[i] = {
        name: t[i].attrName,
        layer: s
      };
    }
    return n;
  }
  addClip(e) {
    let t = [];
    const n = this;
    return e.layer.forEach(function(i) {
      t = t.concat(n.generateTracks(i));
    }), new er(e.name, -1, t);
  }
  generateTracks(e) {
    const t = [];
    let n = new he(), i = new Ke(), a = new he();
    if (e.transform && e.transform.decompose(n, i, a), n = n.toArray(), i = new fe().setFromQuaternion(i, e.eulerOrder).toArray(), a = a.toArray(), e.T !== void 0 && Object.keys(e.T.curves).length > 0) {
      const s = this.generateVectorTrack(
        e.modelName,
        e.T.curves,
        n,
        "position"
      );
      s !== void 0 && t.push(s);
    }
    if (e.R !== void 0 && Object.keys(e.R.curves).length > 0) {
      const s = this.generateRotationTrack(
        e.modelName,
        e.R.curves,
        i,
        e.preRotation,
        e.postRotation,
        e.eulerOrder
      );
      s !== void 0 && t.push(s);
    }
    if (e.S !== void 0 && Object.keys(e.S.curves).length > 0) {
      const s = this.generateVectorTrack(e.modelName, e.S.curves, a, "scale");
      s !== void 0 && t.push(s);
    }
    if (e.DeformPercent !== void 0) {
      const s = this.generateMorphTrack(e);
      s !== void 0 && t.push(s);
    }
    return t;
  }
  generateVectorTrack(e, t, n, i) {
    const a = this.getTimesForAllAxes(t), s = this.getKeyframeTrackValues(a, t, n);
    return new tr(e + "." + i, a, s);
  }
  generateRotationTrack(e, t, n, i, a, s) {
    t.x !== void 0 && (this.interpolateRotations(t.x), t.x.values = t.x.values.map(ie.degToRad)), t.y !== void 0 && (this.interpolateRotations(t.y), t.y.values = t.y.values.map(ie.degToRad)), t.z !== void 0 && (this.interpolateRotations(t.z), t.z.values = t.z.values.map(ie.degToRad));
    const o = this.getTimesForAllAxes(t), l = this.getKeyframeTrackValues(o, t, n);
    i !== void 0 && (i = i.map(ie.degToRad), i.push(s), i = new fe().fromArray(i), i = new Ke().setFromEuler(i)), a !== void 0 && (a = a.map(ie.degToRad), a.push(s), a = new fe().fromArray(a), a = new Ke().setFromEuler(a).invert());
    const f = new Ke(), u = new fe(), c = [];
    for (let h = 0; h < l.length; h += 3)
      u.set(l[h], l[h + 1], l[h + 2], s), f.setFromEuler(u), i !== void 0 && f.premultiply(i), a !== void 0 && f.multiply(a), f.toArray(c, h / 3 * 4);
    return new nr(e + ".quaternion", o, c);
  }
  generateMorphTrack(e) {
    const t = e.DeformPercent.curves.morph, n = t.values.map(function(a) {
      return a / 100;
    }), i = H.getObjectByName(e.modelName).morphTargetDictionary[e.morphName];
    return new rr(
      e.modelName + ".morphTargetInfluences[" + i + "]",
      t.times,
      n
    );
  }
  getTimesForAllAxes(e) {
    let t = [];
    if (e.x !== void 0 && (t = t.concat(e.x.times)), e.y !== void 0 && (t = t.concat(e.y.times)), e.z !== void 0 && (t = t.concat(e.z.times)), t = t.sort(function(n, i) {
      return n - i;
    }), t.length > 1) {
      let n = 1, i = t[0];
      for (let a = 1; a < t.length; a++) {
        const s = t[a];
        s !== i && (t[n] = s, i = s, n++);
      }
      t = t.slice(0, n);
    }
    return t;
  }
  getKeyframeTrackValues(e, t, n) {
    const i = n, a = [];
    let s = -1, o = -1, l = -1;
    return e.forEach(function(f) {
      if (t.x && (s = t.x.times.indexOf(f)), t.y && (o = t.y.times.indexOf(f)), t.z && (l = t.z.times.indexOf(f)), s !== -1) {
        const u = t.x.values[s];
        a.push(u), i[0] = u;
      } else
        a.push(i[0]);
      if (o !== -1) {
        const u = t.y.values[o];
        a.push(u), i[1] = u;
      } else
        a.push(i[1]);
      if (l !== -1) {
        const u = t.z.values[l];
        a.push(u), i[2] = u;
      } else
        a.push(i[2]);
    }), a;
  }
  interpolateRotations(e) {
    for (let t = 1; t < e.values.length; t++) {
      const n = e.values[t - 1], i = e.values[t] - n, a = Math.abs(i);
      if (a >= 180) {
        const s = a / 180, o = i / s;
        let l = n + o;
        const f = e.times[t - 1], c = (e.times[t] - f) / s;
        let h = f + c;
        const p = [], v = [];
        for (; h < e.times[t]; )
          p.push(h), h += c, v.push(l), l += o;
        e.times = Nt(e.times, t, p), e.values = Nt(e.values, t, v);
      }
    }
  }
}
class jr {
  getPrevNode() {
    return this.nodeStack[this.currentIndent - 2];
  }
  getCurrentNode() {
    return this.nodeStack[this.currentIndent - 1];
  }
  getCurrentProp() {
    return this.currentProp;
  }
  pushStack(e) {
    this.nodeStack.push(e), this.currentIndent += 1;
  }
  popStack() {
    this.nodeStack.pop(), this.currentIndent -= 1;
  }
  setCurrentProp(e, t) {
    this.currentProp = e, this.currentPropName = t;
  }
  parse(e) {
    this.currentIndent = 0, this.allNodes = new Bn(), this.nodeStack = [], this.currentProp = [], this.currentPropName = "";
    const t = this, n = e.split(/[\r\n]+/);
    return n.forEach(function(i, a) {
      const s = i.match(/^[\s\t]*;/), o = i.match(/^[\s\t]*$/);
      if (s || o)
        return;
      const l = i.match("^\\t{" + t.currentIndent + "}(\\w+):(.*){", ""), f = i.match("^\\t{" + t.currentIndent + "}(\\w+):[\\s\\t\\r\\n](.*)"), u = i.match("^\\t{" + (t.currentIndent - 1) + "}}");
      l ? t.parseNodeBegin(i, l) : f ? t.parseNodeProperty(i, f, n[++a]) : u ? t.popStack() : i.match(/^[^\s\t}]/) && t.parseNodePropertyContinued(i);
    }), this.allNodes;
  }
  parseNodeBegin(e, t) {
    const n = t[1].trim().replace(/^"/, "").replace(/"$/, ""), i = t[2].split(",").map(function(l) {
      return l.trim().replace(/^"/, "").replace(/"$/, "");
    }), a = { name: n }, s = this.parseNodeAttr(i), o = this.getCurrentNode();
    this.currentIndent === 0 ? this.allNodes.add(n, a) : n in o ? (n === "PoseNode" ? o.PoseNode.push(a) : o[n].id !== void 0 && (o[n] = {}, o[n][o[n].id] = o[n]), s.id !== "" && (o[n][s.id] = a)) : typeof s.id == "number" ? (o[n] = {}, o[n][s.id] = a) : n !== "Properties70" && (n === "PoseNode" ? o[n] = [a] : o[n] = a), typeof s.id == "number" && (a.id = s.id), s.name !== "" && (a.attrName = s.name), s.type !== "" && (a.attrType = s.type), this.pushStack(a);
  }
  parseNodeAttr(e) {
    let t = e[0];
    e[0] !== "" && (t = parseInt(e[0]), isNaN(t) && (t = e[0]));
    let n = "", i = "";
    return e.length > 1 && (n = e[1].replace(/^(\w+)::/, ""), i = e[2]), { id: t, name: n, type: i };
  }
  parseNodeProperty(e, t, n) {
    let i = t[1].replace(/^"/, "").replace(/"$/, "").trim(), a = t[2].replace(/^"/, "").replace(/"$/, "").trim();
    i === "Content" && a === "," && (a = n.replace(/"/g, "").replace(/,$/, "").trim());
    const s = this.getCurrentNode();
    if (s.name === "Properties70") {
      this.parseNodeSpecialProperty(e, i, a);
      return;
    }
    if (i === "C") {
      const l = a.split(",").slice(1), f = parseInt(l[0]), u = parseInt(l[1]);
      let c = a.split(",").slice(3);
      c = c.map(function(h) {
        return h.trim().replace(/^"/, "");
      }), i = "connections", a = [f, u], qr(a, c), s[i] === void 0 && (s[i] = []);
    }
    i === "Node" && (s.id = a), i in s && Array.isArray(s[i]) ? s[i].push(a) : i !== "a" ? s[i] = a : s.a = a, this.setCurrentProp(s, i), i === "a" && a.slice(-1) !== "," && (s.a = ct(a));
  }
  parseNodePropertyContinued(e) {
    const t = this.getCurrentNode();
    t.a += e, e.slice(-1) !== "," && (t.a = ct(t.a));
  }
  parseNodeSpecialProperty(e, t, n) {
    const i = n.split('",').map(function(u) {
      return u.trim().replace(/^\"/, "").replace(/\s/, "_");
    }), a = i[0], s = i[1], o = i[2], l = i[3];
    let f = i[4];
    switch (s) {
      case "int":
      case "enum":
      case "bool":
      case "ULongLong":
      case "double":
      case "Number":
      case "FieldOfView":
        f = parseFloat(f);
        break;
      case "Color":
      case "ColorRGB":
      case "Vector3D":
      case "Lcl_Translation":
      case "Lcl_Rotation":
      case "Lcl_Scaling":
        f = ct(f);
        break;
    }
    this.getPrevNode()[a] = {
      type: s,
      type2: o,
      flag: l,
      value: f
    }, this.setCurrentProp(this.getPrevNode(), a);
  }
}
class br {
  parse(e) {
    const t = new Ht(e);
    t.skip(23);
    const n = t.getUint32();
    if (n < 6400)
      throw new Error("FBXLoader: FBX version not supported, FileVersion: " + n);
    const i = new Bn();
    for (; !this.endOfContent(t); ) {
      const a = this.parseNode(t, n);
      a !== null && i.add(a.name, a);
    }
    return i;
  }
  endOfContent(e) {
    return e.size() % 16 === 0 ? (e.getOffset() + 160 + 16 & -16) >= e.size() : e.getOffset() + 160 + 16 >= e.size();
  }
  parseNode(e, t) {
    const n = {}, i = t >= 7500 ? e.getUint64() : e.getUint32(), a = t >= 7500 ? e.getUint64() : e.getUint32();
    t >= 7500 ? e.getUint64() : e.getUint32();
    const s = e.getUint8(), o = e.getString(s);
    if (i === 0)
      return null;
    const l = [];
    for (let h = 0; h < a; h++)
      l.push(this.parseProperty(e));
    const f = l.length > 0 ? l[0] : "", u = l.length > 1 ? l[1] : "", c = l.length > 2 ? l[2] : "";
    for (n.singleProperty = a === 1 && e.getOffset() === i; i > e.getOffset(); ) {
      const h = this.parseNode(e, t);
      h !== null && this.parseSubNode(o, n, h);
    }
    return n.propertyList = l, typeof f == "number" && (n.id = f), u !== "" && (n.attrName = u), c !== "" && (n.attrType = c), o !== "" && (n.name = o), n;
  }
  parseSubNode(e, t, n) {
    if (n.singleProperty === !0) {
      const i = n.propertyList[0];
      Array.isArray(i) ? (t[n.name] = n, n.a = i) : t[n.name] = i;
    } else if (e === "Connections" && n.name === "C") {
      const i = [];
      n.propertyList.forEach(function(a, s) {
        s !== 0 && i.push(a);
      }), t.connections === void 0 && (t.connections = []), t.connections.push(i);
    } else if (n.name === "Properties70")
      Object.keys(n).forEach(function(a) {
        t[a] = n[a];
      });
    else if (e === "Properties70" && n.name === "P") {
      let i = n.propertyList[0], a = n.propertyList[1];
      const s = n.propertyList[2], o = n.propertyList[3];
      let l;
      i.indexOf("Lcl ") === 0 && (i = i.replace("Lcl ", "Lcl_")), a.indexOf("Lcl ") === 0 && (a = a.replace("Lcl ", "Lcl_")), a === "Color" || a === "ColorRGB" || a === "Vector" || a === "Vector3D" || a.indexOf("Lcl_") === 0 ? l = [n.propertyList[4], n.propertyList[5], n.propertyList[6]] : l = n.propertyList[4], t[i] = {
        type: a,
        type2: s,
        flag: o,
        value: l
      };
    } else
      t[n.name] === void 0 ? typeof n.id == "number" ? (t[n.name] = {}, t[n.name][n.id] = n) : t[n.name] = n : n.name === "PoseNode" ? (Array.isArray(t[n.name]) || (t[n.name] = [t[n.name]]), t[n.name].push(n)) : t[n.name][n.id] === void 0 && (t[n.name][n.id] = n);
  }
  parseProperty(e) {
    const t = e.getString(1);
    let n;
    switch (t) {
      case "C":
        return e.getBoolean();
      case "D":
        return e.getFloat64();
      case "F":
        return e.getFloat32();
      case "I":
        return e.getInt32();
      case "L":
        return e.getInt64();
      case "R":
        return n = e.getUint32(), e.getArrayBuffer(n);
      case "S":
        return n = e.getUint32(), e.getString(n);
      case "Y":
        return e.getInt16();
      case "b":
      case "c":
      case "d":
      case "f":
      case "i":
      case "l":
        const i = e.getUint32(), a = e.getUint32(), s = e.getUint32();
        if (a === 0)
          switch (t) {
            case "b":
            case "c":
              return e.getBooleanArray(i);
            case "d":
              return e.getFloat64Array(i);
            case "f":
              return e.getFloat32Array(i);
            case "i":
              return e.getInt32Array(i);
            case "l":
              return e.getInt64Array(i);
          }
        typeof Sr > "u" && console.error("FBXLoader: External library fflate.min.js required.");
        const o = Re(new Uint8Array(e.getArrayBuffer(s))), l = new Ht(o.buffer);
        switch (t) {
          case "b":
          case "c":
            return l.getBooleanArray(i);
          case "d":
            return l.getFloat64Array(i);
          case "f":
            return l.getFloat32Array(i);
          case "i":
            return l.getInt32Array(i);
          case "l":
            return l.getInt64Array(i);
        }
        break;
      default:
        throw new Error("FBXLoader: Unknown property type " + t);
    }
  }
}
class Ht {
  constructor(e, t) {
    this.dv = new DataView(e), this.offset = 0, this.littleEndian = t !== void 0 ? t : !0;
  }
  getOffset() {
    return this.offset;
  }
  size() {
    return this.dv.buffer.byteLength;
  }
  skip(e) {
    this.offset += e;
  }
  getBoolean() {
    return (this.getUint8() & 1) === 1;
  }
  getBooleanArray(e) {
    const t = [];
    for (let n = 0; n < e; n++)
      t.push(this.getBoolean());
    return t;
  }
  getUint8() {
    const e = this.dv.getUint8(this.offset);
    return this.offset += 1, e;
  }
  getInt16() {
    const e = this.dv.getInt16(this.offset, this.littleEndian);
    return this.offset += 2, e;
  }
  getInt32() {
    const e = this.dv.getInt32(this.offset, this.littleEndian);
    return this.offset += 4, e;
  }
  getInt32Array(e) {
    const t = [];
    for (let n = 0; n < e; n++)
      t.push(this.getInt32());
    return t;
  }
  getUint32() {
    const e = this.dv.getUint32(this.offset, this.littleEndian);
    return this.offset += 4, e;
  }
  getInt64() {
    let e, t;
    return this.littleEndian ? (e = this.getUint32(), t = this.getUint32()) : (t = this.getUint32(), e = this.getUint32()), t & 2147483648 ? (t = ~t & 4294967295, e = ~e & 4294967295, e === 4294967295 && (t = t + 1 & 4294967295), e = e + 1 & 4294967295, -(t * 4294967296 + e)) : t * 4294967296 + e;
  }
  getInt64Array(e) {
    const t = [];
    for (let n = 0; n < e; n++)
      t.push(this.getInt64());
    return t;
  }
  getUint64() {
    let e, t;
    return this.littleEndian ? (e = this.getUint32(), t = this.getUint32()) : (t = this.getUint32(), e = this.getUint32()), t * 4294967296 + e;
  }
  getFloat32() {
    const e = this.dv.getFloat32(this.offset, this.littleEndian);
    return this.offset += 4, e;
  }
  getFloat32Array(e) {
    const t = [];
    for (let n = 0; n < e; n++)
      t.push(this.getFloat32());
    return t;
  }
  getFloat64() {
    const e = this.dv.getFloat64(this.offset, this.littleEndian);
    return this.offset += 8, e;
  }
  getFloat64Array(e) {
    const t = [];
    for (let n = 0; n < e; n++)
      t.push(this.getFloat64());
    return t;
  }
  getArrayBuffer(e) {
    const t = this.dv.buffer.slice(this.offset, this.offset + e);
    return this.offset += e, t;
  }
  getString(e) {
    let t = [];
    for (let i = 0; i < e; i++)
      t[i] = this.getUint8();
    const n = t.indexOf(0);
    return n >= 0 && (t = t.slice(0, n)), dt.decodeText(new Uint8Array(t));
  }
}
class Bn {
  add(e, t) {
    this[e] = t;
  }
}
function Zr(r) {
  const e = "Kaydara FBX Binary  \0";
  return r.byteLength >= e.length && e === En(r, 0, e.length);
}
function Kr(r) {
  const e = [
    "K",
    "a",
    "y",
    "d",
    "a",
    "r",
    "a",
    "\\",
    "F",
    "B",
    "X",
    "\\",
    "B",
    "i",
    "n",
    "a",
    "r",
    "y",
    "\\",
    "\\"
  ];
  let t = 0;
  function n(i) {
    const a = r[i - 1];
    return r = r.slice(t + i), t++, a;
  }
  for (let i = 0; i < e.length; ++i)
    if (n(1) === e[i])
      return !1;
  return !0;
}
function $t(r) {
  const e = /FBXVersion: (\d+)/, t = r.match(e);
  if (t)
    return parseInt(t[1]);
  throw new Error("FBXLoader: Cannot find the version number for the file given.");
}
function Wr(r) {
  return r / 46186158e3;
}
const Yr = [];
function Ye(r, e, t, n) {
  let i;
  switch (n.mappingType) {
    case "ByPolygonVertex":
      i = r;
      break;
    case "ByPolygon":
      i = e;
      break;
    case "ByVertice":
      i = t;
      break;
    case "AllSame":
      i = n.indices[0];
      break;
    default:
      console.warn("FBXLoader: unknown attribute mapping type " + n.mappingType);
  }
  n.referenceType === "IndexToDirect" && (i = n.indices[i]);
  const a = i * n.dataSize, s = a + n.dataSize;
  return Hr(Yr, n.buffer, a, s);
}
const lt = new fe(), we = new he();
function On(r) {
  const e = new U(), t = new U(), n = new U(), i = new U(), a = new U(), s = new U(), o = new U(), l = new U(), f = new U(), u = new U(), c = new U(), h = new U(), p = r.inheritType ? r.inheritType : 0;
  if (r.translation && e.setPosition(we.fromArray(r.translation)), r.preRotation) {
    const P = r.preRotation.map(ie.degToRad);
    P.push(r.eulerOrder || fe.DefaultOrder), t.makeRotationFromEuler(lt.fromArray(P));
  }
  if (r.rotation) {
    const P = r.rotation.map(ie.degToRad);
    P.push(r.eulerOrder || fe.DefaultOrder), n.makeRotationFromEuler(lt.fromArray(P));
  }
  if (r.postRotation) {
    const P = r.postRotation.map(ie.degToRad);
    P.push(r.eulerOrder || fe.DefaultOrder), i.makeRotationFromEuler(lt.fromArray(P)), i.invert();
  }
  r.scale && a.scale(we.fromArray(r.scale)), r.scalingOffset && o.setPosition(we.fromArray(r.scalingOffset)), r.scalingPivot && s.setPosition(we.fromArray(r.scalingPivot)), r.rotationOffset && l.setPosition(we.fromArray(r.rotationOffset)), r.rotationPivot && f.setPosition(we.fromArray(r.rotationPivot)), r.parentMatrixWorld && (c.copy(r.parentMatrix), u.copy(r.parentMatrixWorld));
  const v = t.clone().multiply(n).multiply(i), g = new U();
  g.extractRotation(u);
  const y = new U();
  y.copyPosition(u);
  const x = y.clone().invert().multiply(u), w = g.clone().invert().multiply(x), m = a, I = new U();
  if (p === 0)
    I.copy(g).multiply(v).multiply(w).multiply(m);
  else if (p === 1)
    I.copy(g).multiply(w).multiply(v).multiply(m);
  else {
    const j = new U().scale(new he().setFromMatrixScale(c)).clone().invert(), F = w.clone().multiply(j);
    I.copy(g).multiply(v).multiply(F).multiply(m);
  }
  const D = f.clone().invert(), A = s.clone().invert();
  let T = e.clone().multiply(l).multiply(f).multiply(t).multiply(n).multiply(i).multiply(D).multiply(o).multiply(s).multiply(a).multiply(A);
  const d = new U().copyPosition(T), z = u.clone().multiply(d);
  return h.copyPosition(z), T = h.clone().multiply(I), T.premultiply(u.invert()), T;
}
function zn(r) {
  r = r || 0;
  const e = [
    "ZYX",
    "YZX",
    "XZY",
    "ZXY",
    "YXZ",
    "XYZ"
  ];
  return r === 6 ? (console.warn("FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."), e[0]) : e[r];
}
function ct(r) {
  return r.split(",").map(function(t) {
    return parseFloat(t);
  });
}
function En(r, e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = r.byteLength), dt.decodeText(new Uint8Array(r, e, t));
}
function qr(r, e) {
  for (let t = 0, n = r.length, i = e.length; t < i; t++, n++)
    r[n] = e[t];
}
function Hr(r, e, t, n) {
  for (let i = t, a = 0; i < n; i++, a++)
    r[a] = e[i];
  return r;
}
function Nt(r, e, t) {
  return r.slice(0, e).concat(t).concat(r.slice(e));
}
const $r = /* @__PURE__ */ new Map(), Nr = new Ur(), ei = async (r, e) => {
  const [t, n] = await ir(
    $r,
    r,
    () => new Promise((i, a) => {
      const s = r.startsWith("https://unpkg.com/");
      s && ar(), Nr.load(
        r,
        (o) => {
          var u;
          const l = [];
          let f = !0;
          o.traverse((c) => {
            c instanceof cr ? l.push(c) : f && c instanceof ft && (f = !1), c.isMesh && (c.castShadow = !0, c.receiveShadow = !0, c.material.map && (c.material.map.encoding = jt, c.material.map.anisotropy = 1), c.material.emissiveMap && (c.material.emissiveMap.encoding = jt, c.material.emissiveMap = c.material.map), c.material.emissive && (c.material.emissive = c.material.color), (c.material.map || c.material.emissiveMap) && (c.material.needsUpdate = !0)), c.castShadow = !0, c.receiveShadow = !0;
          });
          for (const c of l)
            (u = c.parent) == null || u.remove(c);
          s && sr(), i([o, f]);
        },
        or(r),
        a
      );
    })
  );
  return e ? lr(t, n) : t;
};
export {
  ei as default
};
