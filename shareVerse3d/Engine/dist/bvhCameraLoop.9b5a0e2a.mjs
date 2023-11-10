import { b0 as x, b1 as l, b2 as p, b3 as y, b4 as t, b5 as m, b6 as B, b7 as R } from "./index.60bcd3b0.mjs";
import { g as u } from "./useBVHMap.06123688.mjs";
import "react";
import "react-dom";
const v = /* @__PURE__ */ new Set();
x(() => {
  const r = u();
  if (!r.length) {
    const e = l(p);
    return () => {
      e.cancel();
    };
  }
  const f = l(() => {
    p();
    for (const e of v) {
      e.updateMatrixWorld();
      const i = y(e), { start: a, end: d } = m;
      d.copy(a.copy(e.position)), t.makeEmpty(), t.expandByPoint(a), t.min.addScalar(-0.5), t.max.addScalar(0.5);
      const b = B, h = R;
      let o = 0, s = 0;
      for (const g of r)
        g.shapecast({
          intersectsBounds: (n) => n.intersectsBox(t),
          intersectsTriangle: (n) => {
            o = n.closestPointToSegment(
              m,
              b,
              h
            ), o < 0.5 && (s = 0.5 - o, a.addScaledVector(i, s), d.addScaledVector(i, s));
          }
        });
      const c = a.sub(e.position), S = Math.max(0, c.length() - 1e-5);
      c.normalize().multiplyScalar(S), e.position.add(c);
    }
  });
  return () => {
    f.cancel();
  };
}, [u]);
