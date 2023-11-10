var J = Object.defineProperty;
var K = (o, t, s) => t in o ? J(o, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : o[t] = s;
var u = (o, t, s) => (K(o, typeof t != "symbol" ? t + "" : t, s), s);
import { bt as Q, b0 as $, bu as E, bv as L, bw as V, bj as X, bx as Z, b1 as tt, by as H, bz as it, bA as ot, bB as P, b4 as T, bC as et, b5 as Y, w as nt, b6 as st, b7 as at, bs as U, bD as rt, bE as dt, a as lt } from "./index.60bcd3b0.mjs";
import { g as j } from "./useBVHMap.06123688.mjs";
import { g as A, b as ct } from "./bvhManagerMap.18713559.mjs";
import "react";
import "react-dom";
const F = /* @__PURE__ */ new Set(), ut = (o, t) => {
  const { min: s, max: c } = t, f = (n) => {
    o.min[n] === void 0 ? (o.min[n] = s[n], o.max[n] = c[n]) : (o.min[n] > s[n] && (o.min[n] = s[n]), o.max[n] < c[n] && (o.max[n] = c[n]));
  };
  f("y"), f("z"), f("x");
};
class ht {
  constructor() {
    u(this, "_fallToGround", !0);
  }
  set hove_model_uuid(t) {
    window._hove_model_uuid = t;
  }
  get hove_model_uuid() {
    return window._hove_model_uuid;
  }
  set isEditorMode(t) {
    window._isEditorMode = t;
  }
  get isEditorMode() {
    return window._isEditorMode;
  }
  get bvhOnGround() {
    return window._bvhOnGround;
  }
  set bvhOnGround(t) {
    window._bvhOnGround = t;
  }
  set isClickModel(t) {
    window._clickMode = t;
  }
  get isClickModel() {
    return window._clickMode;
  }
  set isFirstLoad(t) {
    this._fallToGround = t;
  }
  get isFirstLoad() {
    return this._fallToGround;
  }
}
const p = new ht();
class N {
  constructor() {
    u(this, "initCallBacks", /* @__PURE__ */ new Set());
    u(this, "listener", (t) => (this.initCallBacks.add(t), new Q(() => this.initCallBacks.delete(t))));
    u(this, "emit", (t) => {
      for (const s of this.initCallBacks)
        s && s(t);
    });
  }
  removeAll() {
    this.initCallBacks.clear();
  }
}
const R = new N(), ft = new N(), pt = () => /* @__PURE__ */ new WeakSet();
p.isFirstLoad = !0;
window.addEventListener("popstate", function(o) {
  p.isFirstLoad = !0;
});
$(
  function() {
    if (!X() || !Z() || A())
      return;
    window.boxBounds = {
      min: {
        y: void 0,
        z: void 0,
        x: void 0
      },
      max: {
        y: void 0,
        z: void 0,
        x: void 0
      }
    };
    const o = j();
    if (!o.length)
      return;
    const t = E(), s = L(), c = 0.02, f = V();
    let n;
    const D = tt(() => {
      H.clear(), window.firstFallToGround = !1;
      for (const e of F) {
        const d = e.bvhVelocity, i = e.outerObject3d, I = e.bvhHalfHeight, b = 0.8;
        if (f)
          d.add(
            e.bvhOnGround || e._gravity === !1 ? it : ot(i).normalize().multiplyScalar(c * -t * P[0])
          );
        else {
          const g = e.positionUpdate;
          g.x && (d.x = 0), g.y && (d.y = 0), g.z && (d.z = 0), g.reset(), window.boxBounds.min.y && i.position.y >= window.boxBounds.min.y && (d.y += e.bvhOnGround || e._gravity === !1 ? 0 : c * -t * P[0]), i.position.addScaledVector(d, c), i.updateMatrixWorld();
          const { start: w, end: z } = Y;
          z.copy(w.copy(i.position));
          const S = Math.max(I - b, 0);
          z.y += S, w.y -= S;
          const k = w.clone();
          T.setFromCenterAndSize(
            i.position,
            et.set(b * 2, I * 2, b * 2)
          );
          const m = st, C = at;
          let M = 0, B, x = !1, G = !1, O;
          for (const r of o)
            O = ct.get(r), ut(window.boxBounds, r.geometry.boundingBox), r.shapecast({
              intersectsBounds: (a) => a.intersectsBox(T),
              intersectsTriangle: (a) => {
                M = a.closestPointToSegment(Y, m, C), M < b && (M < 0.7 && (G = !0), G || (n = i.position.clone()), Math.abs(m.y).toFixed(3) === Math.abs(a.a.y).toFixed(3) || Math.abs(m.y).toFixed(3) === Math.abs(a.b.y).toFixed(3) || Math.abs(m.y).toFixed(3) === Math.abs(a.c.y).toFixed(3) ? x = !0 : x = !1, B = C.sub(m).normalize().multiplyScalar(b - M), w.add(B), z.add(B));
              }
            });
          x && O && nt(H, e, pt).add(O);
          const l = w.sub(k);
          f ? e.bvhOnGround = x : (e.bvhOnGround = x || l.y > Math.abs(c * d.y * 0.25), s && e.bvhOnGround && Math.abs(l.y / (l.x + l.z + Number.EPSILON)) < s && (e.bvhOnGround = !1));
          const q = Math.max(0, l.length() - 1e-5);
          if (l.normalize().multiplyScalar(q), e.bvhOnGround && p.isFirstLoad) {
            p.isFirstLoad = !1;
            const { _firstInnerY: r, _firstInnerX: a, _firstInnerZ: h } = e;
            if (r || a || h) {
              const { x: v, y: _, z: y } = i.position;
              i.position.set(a || v, r || _, h || y);
            }
            R.emit(i.position), ft.listener(() => {
              const { _firstInnerY: v, _firstInnerX: _, _firstInnerZ: y } = e;
              i.position.set(_ || 0, v || 0, y || 0);
            }), i.position.y, i.visible = !0;
          }
          if (window.player_position = i.position, p.bvhOnGround = e.bvhOnGround, window.boxBounds.min.x && window.boxBounds.max.x) {
            if (boxBounds.min.x > i.position.x && i.position.setX(window.boxBounds.min.x), window.boxBounds.min.z > i.position.z && i.position.setZ(window.boxBounds.min.z), window.boxBounds.max.x < i.position.x && i.position.setX(window.boxBounds.max.x), window.boxBounds.max.z < i.position.z && i.position.setZ(window.boxBounds.max.z), window.boxBounds.min.y > i.position.y) {
              const { _firstInnerY: r, _firstInnerX: a, _firstInnerZ: h } = e;
              i.position.set(a || 0, r || 0, h || 0), e.bvhOnGround = !0;
            }
            G && (n || i.position);
          }
          if (p.isFirstLoad) {
            const { _firstInnerY: r, _firstInnerX: a, _firstInnerZ: h } = e;
            if (r || a || h) {
              const { x: v, y: _, z: y } = i.position;
              i.position.set(a || v, r || _, h || y), setTimeout(() => {
                R.emit(i.position);
              }, 0);
            }
          }
          i.position.add(l), e.bvhOnGround ? d.set(0, 0, 0) : (l.normalize(), d.addScaledVector(l, -l.dot(d)));
        }
      }
    });
    return () => {
      D.cancel();
    };
  },
  [j, E, L, V, X, Z, A]
);
class W {
  constructor() {
    u(this, "x", !1);
    u(this, "y", !1);
    u(this, "z", !1);
  }
  updateX() {
    this.x = !0;
  }
  updateY() {
    this.x = !0;
  }
  updateZ() {
    this.x = !0;
  }
  updateXYZ() {
    this.x = this.y = this.z = !0;
  }
  updateXZ() {
    this.x = this.z = !0;
  }
  reset() {
    this.x = this.y = this.z = !1;
  }
}
function yt(o) {
  if (o.done)
    return;
  this.outerObject3d.parent !== U && U.attach(this.outerObject3d), this instanceof rt && (this.width = this.depth = Math.min(this.width, this.depth)), this.rotationUpdate = new W(), this.positionUpdate = new W();
  const t = dt(this).multiplyScalar(0.5);
  this.bvhHalfHeight = Math.max(t.y, 0.5), this.bvhRadius = Math.max(t.x, 0.5), this.bvhVelocity = new lt(), F.add(this), o.then(() => {
    F.delete(this), this.rotationUpdate = void 0, this.positionUpdate = void 0;
  });
}
export {
  yt as default
};
