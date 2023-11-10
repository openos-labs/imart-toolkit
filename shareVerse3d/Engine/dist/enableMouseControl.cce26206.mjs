import { bf as l, bg as E, bh as n, bi as L, bj as k, bk as v } from "./index.60bcd3b0.mjs";
import "react";
import "react-dom";
const C = (() => {
  const o = navigator.userAgent;
  return /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(o) ? !0 : !!/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(o);
})();
function P() {
  this.done || (this.createEffect(() => {
    if (l() !== this.camera || !this.mouseControlState.get())
      return;
    if (E() === this.camera) {
      const t = (c) => this.gyrate(c.movementX, c.movementY);
      return document.addEventListener("mousemove", t), () => {
        document.removeEventListener("mousemove", t);
      };
    }
    let o = !1, e, i, r;
    const a = () => {
      o = !0, [i, r] = [void 0, void 0];
    }, f = () => o = !1, u = (t) => {
      i === void 0 && (i = t.clientX), r === void 0 && (r = t.clientY);
      const [c, d] = [t.clientX - i, t.clientY - r];
      [i, r] = [t.clientX, t.clientY], o && this.gyrate(
        c / window.innerWidth * 3e3,
        d / window.innerHeight * 3e3
      );
    };
    if (C) {
      const t = (s) => {
        e === void 0 && (e = s.changedTouches[s.changedTouches.length - 1].identifier, a());
      };
      n.addEventListener("touchstart", t);
      const c = (s) => {
        e !== void 0 && s.changedTouches[s.changedTouches.length - 1].identifier === e && (e = void 0, f());
      };
      n.addEventListener("touchend", c);
      const d = (s) => {
        if (e === void 0)
          return;
        let h;
        for (let m = 0; m < s.changedTouches.length; ++m) {
          const g = s.changedTouches[m];
          if (g.identifier === e) {
            h = g;
            break;
          }
        }
        h && u(h);
      };
      return n.addEventListener("touchmove", d), () => {
        n.removeEventListener("touchstart", t), n.removeEventListener("touchend", c), n.removeEventListener("touchmove", d), e = void 0, o = !1;
      };
    }
    const b = L.on("down", a), p = L.on("up", f);
    return n.addEventListener("mousemove", u), () => {
      b.cancel(), p.cancel(), n.removeEventListener("mousemove", u), e = void 0, o = !1;
    };
  }, [this.mouseControlState.get, l, E]), this.createEffect(() => {
    const o = l();
    if (this.mouseControlState.get() !== !0 || o !== this.camera || !k())
      return;
    const e = () => {
      var r, a;
      return (a = (r = n).requestPointerLock) == null ? void 0 : a.call(r);
    }, i = () => {
      document.pointerLockElement === n ? v(o) : v(void 0);
    };
    return n.addEventListener("click", e), document.addEventListener("pointerlockchange", i), () => {
      n.removeEventListener("click", e), document.removeEventListener(
        "pointerlockchange",
        i
      ), document.exitPointerLock(), v(void 0);
    };
  }, [this.mouseControlState.get, l, k]));
}
export {
  P as default
};
