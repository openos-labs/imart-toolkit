var ue = Object.defineProperty;
var de = (I, A, e) => A in I ? ue(I, A, { enumerable: !0, configurable: !0, writable: !0, value: e }) : I[A] = e;
var MA = (I, A, e) => (de(I, typeof A != "symbol" ? A + "" : A, e), e);
import { Q as jA, L as SA, b as O, F as x, e as Y, S as fe, j as pe, D as De, M as IA, K as P, W as zA, X as v, g as wA, a as V, Y as we, O as ZA, T as me, Z as ye, _ as eA, $ as Re, a0 as Fe, a1 as gA, a2 as LA, R as mA, a3 as Se, a4 as CA, n as Le, a5 as Ge, a6 as sA, P as Te, q as $A, l as Ne, m as Ue, a7 as ke, o as Me, a8 as _e, a9 as xe, G as EA, i as be, k as qe, h as He, p as Je, aa as Ae, t as Ke, B as ee, ab as te, x as se, z as ne, ac as Oe, ad as Ye, ae as Pe, af as Ve, c as Xe, ag as We, ah as ve, ai as je, d as _A, aj as ze, u as Ze, v as xA, N as $e, ak as At, al as et, am as tt, an as st, ao as K, y as X, ap as AA, aq as nt, ar as it, as as ot, at as rt, au as at, av as gt, aw as It, ax as Bt, ay as Ct, az as nA, aA as iA, aB as rA, aC as aA, aD as Et, aE as Qt, aF as ct, I as ht, aG as lt, aH as ut, H as dt, J as ft } from "./index.60bcd3b0.mjs";
import "react";
import "react-dom";
let bA = !1;
const pt = () => {
  bA || (bA = !0, se());
};
let qA = !1;
const Dt = () => {
  qA || (qA = !0, ne());
};
class wt extends SA {
  constructor(A) {
    super(A), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(e) {
      return new St(e);
    }), this.register(function(e) {
      return new Mt(e);
    }), this.register(function(e) {
      return new _t(e);
    }), this.register(function(e) {
      return new Gt(e);
    }), this.register(function(e) {
      return new Tt(e);
    }), this.register(function(e) {
      return new Nt(e);
    }), this.register(function(e) {
      return new Ut(e);
    }), this.register(function(e) {
      return new Ft(e);
    }), this.register(function(e) {
      return new kt(e);
    }), this.register(function(e) {
      return new Lt(e);
    }), this.register(function(e) {
      return new yt(e);
    }), this.register(function(e) {
      return new xt(e);
    }), this.register(function(e) {
      return new bt(e);
    });
  }
  load(A, e, i, t) {
    const s = this;
    let n;
    this.resourcePath !== "" ? n = this.resourcePath : this.path !== "" ? n = this.path : n = O.extractUrlBase(A), this.manager.itemStart(A);
    const r = function(a) {
      t ? t(a) : console.error(a), s.manager.itemError(A), s.manager.itemEnd(A);
    }, o = new x(this.manager);
    o.setPath(this.path), o.setResponseType("arraybuffer"), o.setRequestHeader(this.requestHeader), o.setWithCredentials(this.withCredentials), o.load(
      A,
      function(a) {
        try {
          s.parse(
            a,
            n,
            function(g) {
              e(g), s.manager.itemEnd(A);
            },
            r
          );
        } catch (g) {
          r(g);
        }
      },
      i,
      r
    );
  }
  setDRACOLoader(A) {
    return this.dracoLoader = A, this;
  }
  setDDSLoader() {
    throw new Error(
      'GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".'
    );
  }
  setKTX2Loader(A) {
    return this.ktx2Loader = A, this;
  }
  setMeshoptDecoder(A) {
    return this.meshoptDecoder = A, this;
  }
  register(A) {
    return this.pluginCallbacks.indexOf(A) === -1 && this.pluginCallbacks.push(A), this;
  }
  unregister(A) {
    return this.pluginCallbacks.indexOf(A) !== -1 && this.pluginCallbacks.splice(
      this.pluginCallbacks.indexOf(A),
      1
    ), this;
  }
  parse(A, e, i, t) {
    let s;
    const n = {}, r = {};
    if (typeof A == "string")
      s = JSON.parse(A);
    else if (A instanceof ArrayBuffer)
      if (O.decodeText(new Uint8Array(A, 0, 4)) === ie) {
        try {
          n[p.KHR_BINARY_GLTF] = new qt(A);
        } catch (g) {
          t && t(g);
          return;
        }
        s = JSON.parse(
          n[p.KHR_BINARY_GLTF].content
        );
      } else
        s = JSON.parse(O.decodeText(new Uint8Array(A)));
    else
      s = A;
    if (s.asset === void 0 || s.asset.version[0] < 2) {
      t && t(
        new Error(
          "GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."
        )
      );
      return;
    }
    const o = new zt(s, {
      path: e || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    o.fileLoader.setRequestHeader(this.requestHeader);
    for (let a = 0; a < this.pluginCallbacks.length; a++) {
      const g = this.pluginCallbacks[a](o);
      r[g.name] = g, n[g.name] = !0;
    }
    if (s.extensionsUsed)
      for (let a = 0; a < s.extensionsUsed.length; ++a) {
        const g = s.extensionsUsed[a], C = s.extensionsRequired || [];
        switch (g) {
          case p.KHR_MATERIALS_UNLIT:
            n[g] = new Rt();
            break;
          case p.KHR_DRACO_MESH_COMPRESSION:
            n[g] = new Ht(
              s,
              this.dracoLoader
            );
            break;
          case p.KHR_TEXTURE_TRANSFORM:
            n[g] = new Jt();
            break;
          case p.KHR_MESH_QUANTIZATION:
            n[g] = new Kt();
            break;
          default:
            C.indexOf(g) >= 0 && r[g] === void 0 && console.warn(
              'GLTFLoader: Unknown extension "' + g + '".'
            );
        }
      }
    o.setExtensions(n), o.setPlugins(r), o.parse(i, t);
  }
  parseAsync(A, e) {
    const i = this;
    return new Promise(function(t, s) {
      i.parse(A, e, t, s);
    });
  }
}
function mt() {
  let I = {};
  return {
    get: function(A) {
      return I[A];
    },
    add: function(A, e) {
      I[A] = e;
    },
    remove: function(A) {
      delete I[A];
    },
    removeAll: function() {
      I = {};
    }
  };
}
const p = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class yt {
  constructor(A) {
    this.parser = A, this.name = p.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const A = this.parser, e = this.parser.json.nodes || [];
    for (let i = 0, t = e.length; i < t; i++) {
      const s = e[i];
      s.extensions && s.extensions[this.name] && s.extensions[this.name].light !== void 0 && A._addNodeRef(
        this.cache,
        s.extensions[this.name].light
      );
    }
  }
  _loadLight(A) {
    const e = this.parser, i = "light:" + A;
    let t = e.cache.get(i);
    if (t)
      return t;
    const s = e.json, o = ((s.extensions && s.extensions[this.name] || {}).lights || [])[A];
    let a;
    const g = new Y(16777215);
    o.color !== void 0 && g.fromArray(o.color);
    const C = o.range !== void 0 ? o.range : 0;
    switch (o.type) {
      case "directional":
        a = new De(g), a.target.position.set(0, 0, -1), a.add(a.target);
        break;
      case "point":
        a = new pe(g), a.distance = C;
        break;
      case "spot":
        a = new fe(g), a.distance = C, o.spot = o.spot || {}, o.spot.innerConeAngle = o.spot.innerConeAngle !== void 0 ? o.spot.innerConeAngle : 0, o.spot.outerConeAngle = o.spot.outerConeAngle !== void 0 ? o.spot.outerConeAngle : Math.PI / 4, a.angle = o.spot.outerConeAngle, a.penumbra = 1 - o.spot.innerConeAngle / o.spot.outerConeAngle, a.target.position.set(0, 0, -1), a.add(a.target);
        break;
      default:
        throw new Error(
          "GLTFLoader: Unexpected light type: " + o.type
        );
    }
    return a.position.set(0, 0, 0), a.decay = 2, J(a, o), o.intensity !== void 0 && (a.intensity = o.intensity), a.name = e.createUniqueName(
      o.name || "light_" + A
    ), t = Promise.resolve(a), e.cache.add(i, t), t;
  }
  getDependency(A, e) {
    if (A === "light")
      return this._loadLight(e);
  }
  createNodeAttachment(A) {
    const e = this, i = this.parser, s = i.json.nodes[A], r = (s.extensions && s.extensions[this.name] || {}).light;
    return r === void 0 ? null : this._loadLight(r).then(function(o) {
      return i._getNodeRef(e.cache, r, o);
    });
  }
}
class Rt {
  constructor() {
    this.name = p.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return IA;
  }
  extendParams(A, e, i) {
    const t = [];
    A.color = new Y(1, 1, 1), A.opacity = 1;
    const s = e.pbrMetallicRoughness;
    if (s) {
      if (Array.isArray(s.baseColorFactor)) {
        const n = s.baseColorFactor;
        A.color.fromArray(n), A.opacity = n[3];
      }
      s.baseColorTexture !== void 0 && t.push(
        i.assignTexture(
          A,
          "map",
          s.baseColorTexture,
          P
        )
      );
    }
    return Promise.all(t);
  }
}
class Ft {
  constructor(A) {
    this.parser = A, this.name = p.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(A, e) {
    const t = this.parser.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = t.extensions[this.name].emissiveStrength;
    return s !== void 0 && (e.emissiveIntensity = s), Promise.resolve();
  }
}
class St {
  constructor(A) {
    this.parser = A, this.name = p.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(A) {
    const i = this.parser.json.materials[A];
    return !i.extensions || !i.extensions[this.name] ? null : IA;
  }
  extendMaterialParams(A, e) {
    const i = this.parser, t = i.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [], n = t.extensions[this.name];
    if (n.clearcoatFactor !== void 0 && (e.clearcoat = n.clearcoatFactor), n.clearcoatTexture !== void 0 && s.push(
      i.assignTexture(
        e,
        "clearcoatMap",
        n.clearcoatTexture
      )
    ), n.clearcoatRoughnessFactor !== void 0 && (e.clearcoatRoughness = n.clearcoatRoughnessFactor), n.clearcoatRoughnessTexture !== void 0 && s.push(
      i.assignTexture(
        e,
        "clearcoatRoughnessMap",
        n.clearcoatRoughnessTexture
      )
    ), n.clearcoatNormalTexture !== void 0 && (s.push(
      i.assignTexture(
        e,
        "clearcoatNormalMap",
        n.clearcoatNormalTexture
      )
    ), n.clearcoatNormalTexture.scale !== void 0)) {
      const r = n.clearcoatNormalTexture.scale;
      e.clearcoatNormalScale = new zA(r, r);
    }
    return Promise.all(s);
  }
}
class Lt {
  constructor(A) {
    this.parser = A, this.name = p.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(A) {
    const i = this.parser.json.materials[A];
    return !i.extensions || !i.extensions[this.name] ? null : v;
  }
  extendMaterialParams(A, e) {
    const i = this.parser, t = i.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [], n = t.extensions[this.name];
    return n.iridescenceFactor !== void 0 && (e.iridescence = n.iridescenceFactor), n.iridescenceTexture !== void 0 && s.push(
      i.assignTexture(
        e,
        "iridescenceMap",
        n.iridescenceTexture
      )
    ), n.iridescenceIor !== void 0 && (e.iridescenceIOR = n.iridescenceIor), e.iridescenceThicknessRange === void 0 && (e.iridescenceThicknessRange = [100, 400]), n.iridescenceThicknessMinimum !== void 0 && (e.iridescenceThicknessRange[0] = n.iridescenceThicknessMinimum), n.iridescenceThicknessMaximum !== void 0 && (e.iridescenceThicknessRange[1] = n.iridescenceThicknessMaximum), n.iridescenceThicknessTexture !== void 0 && s.push(
      i.assignTexture(
        e,
        "iridescenceThicknessMap",
        n.iridescenceThicknessTexture
      )
    ), Promise.all(s);
  }
}
class Gt {
  constructor(A) {
    this.parser = A, this.name = p.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(A) {
    const i = this.parser.json.materials[A];
    return !i.extensions || !i.extensions[this.name] ? null : v;
  }
  extendMaterialParams(A, e) {
    const i = this.parser, t = i.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [];
    e.sheenColor = new Y(0, 0, 0), e.sheenRoughness = 0, e.sheen = 1;
    const n = t.extensions[this.name];
    return n.sheenColorFactor !== void 0 && e.sheenColor.fromArray(n.sheenColorFactor), n.sheenRoughnessFactor !== void 0 && (e.sheenRoughness = n.sheenRoughnessFactor), n.sheenColorTexture !== void 0 && s.push(
      i.assignTexture(
        e,
        "sheenColorMap",
        n.sheenColorTexture,
        P
      )
    ), n.sheenRoughnessTexture !== void 0 && s.push(
      i.assignTexture(
        e,
        "sheenRoughnessMap",
        n.sheenRoughnessTexture
      )
    ), Promise.all(s);
  }
}
class Tt {
  constructor(A) {
    this.parser = A, this.name = p.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(A) {
    const i = this.parser.json.materials[A];
    return !i.extensions || !i.extensions[this.name] ? null : v;
  }
  extendMaterialParams(A, e) {
    const i = this.parser, t = i.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [], n = t.extensions[this.name];
    return n.transmissionFactor !== void 0 && (e.transmission = n.transmissionFactor), n.transmissionTexture !== void 0 && s.push(
      i.assignTexture(
        e,
        "transmissionMap",
        n.transmissionTexture
      )
    ), Promise.all(s);
  }
}
class Nt {
  constructor(A) {
    this.parser = A, this.name = p.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(A) {
    const i = this.parser.json.materials[A];
    return !i.extensions || !i.extensions[this.name] ? null : v;
  }
  extendMaterialParams(A, e) {
    const i = this.parser, t = i.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [], n = t.extensions[this.name];
    e.thickness = n.thicknessFactor !== void 0 ? n.thicknessFactor : 0, n.thicknessTexture !== void 0 && s.push(
      i.assignTexture(
        e,
        "thicknessMap",
        n.thicknessTexture
      )
    ), e.attenuationDistance = n.attenuationDistance || 1 / 0;
    const r = n.attenuationColor || [1, 1, 1];
    return e.attenuationColor = new Y(
      r[0],
      r[1],
      r[2]
    ), Promise.all(s);
  }
}
class Ut {
  constructor(A) {
    this.parser = A, this.name = p.KHR_MATERIALS_IOR;
  }
  getMaterialType(A) {
    const i = this.parser.json.materials[A];
    return !i.extensions || !i.extensions[this.name] ? null : v;
  }
  extendMaterialParams(A, e) {
    const t = this.parser.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = t.extensions[this.name];
    return e.ior = s.ior !== void 0 ? s.ior : 1.5, Promise.resolve();
  }
}
class kt {
  constructor(A) {
    this.parser = A, this.name = p.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(A) {
    const i = this.parser.json.materials[A];
    return !i.extensions || !i.extensions[this.name] ? null : v;
  }
  extendMaterialParams(A, e) {
    const i = this.parser, t = i.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [], n = t.extensions[this.name];
    e.specularIntensity = n.specularFactor !== void 0 ? n.specularFactor : 1, n.specularTexture !== void 0 && s.push(
      i.assignTexture(
        e,
        "specularIntensityMap",
        n.specularTexture
      )
    );
    const r = n.specularColorFactor || [1, 1, 1];
    return e.specularColor = new Y(
      r[0],
      r[1],
      r[2]
    ), n.specularColorTexture !== void 0 && s.push(
      i.assignTexture(
        e,
        "specularColorMap",
        n.specularColorTexture,
        P
      )
    ), Promise.all(s);
  }
}
class Mt {
  constructor(A) {
    this.parser = A, this.name = p.KHR_TEXTURE_BASISU;
  }
  loadTexture(A) {
    const e = this.parser, i = e.json, t = i.textures[A];
    if (!t.extensions || !t.extensions[this.name])
      return null;
    const s = t.extensions[this.name], n = e.options.ktx2Loader;
    if (!n) {
      if (i.extensionsRequired && i.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error(
          "GLTFLoader: setKTX2Loader must be called before loading KTX2 textures"
        );
      return null;
    }
    return e.loadTextureImage(A, s.source, n);
  }
}
class _t {
  constructor(A) {
    this.parser = A, this.name = p.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(A) {
    const e = this.name, i = this.parser, t = i.json, s = t.textures[A];
    if (!s.extensions || !s.extensions[e])
      return null;
    const n = s.extensions[e], r = t.images[n.source];
    let o = i.textureLoader;
    if (r.uri) {
      const a = i.options.manager.getHandler(r.uri);
      a !== null && (o = a);
    }
    return this.detectSupport().then(function(a) {
      if (a)
        return i.loadTextureImage(
          A,
          n.source,
          o
        );
      if (t.extensionsRequired && t.extensionsRequired.indexOf(e) >= 0)
        throw new Error(
          "GLTFLoader: WebP required by asset but unsupported."
        );
      return i.loadTexture(A);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(A) {
      const e = new Image();
      e.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", e.onload = e.onerror = function() {
        A(e.height === 1);
      };
    })), this.isSupported;
  }
}
class xt {
  constructor(A) {
    this.name = p.EXT_MESHOPT_COMPRESSION, this.parser = A;
  }
  loadBufferView(A) {
    const e = this.parser.json, i = e.bufferViews[A];
    if (i.extensions && i.extensions[this.name]) {
      const t = i.extensions[this.name], s = this.parser.getDependency(
        "buffer",
        t.buffer
      ), n = this.parser.options.meshoptDecoder;
      if (!n || !n.supported) {
        if (e.extensionsRequired && e.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error(
            "GLTFLoader: setMeshoptDecoder must be called before loading compressed files"
          );
        return null;
      }
      return s.then(function(r) {
        const o = t.byteOffset || 0, a = t.byteLength || 0, g = t.count, C = t.byteStride, E = new Uint8Array(r, o, a);
        return n.decodeGltfBufferAsync ? n.decodeGltfBufferAsync(
          g,
          C,
          E,
          t.mode,
          t.filter
        ).then(function(B) {
          return B.buffer;
        }) : n.ready.then(function() {
          const B = new ArrayBuffer(g * C);
          return n.decodeGltfBuffer(
            new Uint8Array(B),
            g,
            C,
            E,
            t.mode,
            t.filter
          ), B;
        });
      });
    } else
      return null;
  }
}
class bt {
  constructor(A) {
    this.name = p.EXT_MESH_GPU_INSTANCING, this.parser = A;
  }
  createNodeMesh(A) {
    const e = this.parser.json, i = e.nodes[A];
    if (!i.extensions || !i.extensions[this.name] || i.mesh === void 0)
      return null;
    const t = e.meshes[i.mesh];
    for (const a of t.primitives)
      if (a.mode !== G.TRIANGLES && a.mode !== G.TRIANGLE_STRIP && a.mode !== G.TRIANGLE_FAN && a.mode !== void 0)
        return null;
    const n = i.extensions[this.name].attributes, r = [], o = {};
    for (const a in n)
      r.push(
        this.parser.getDependency("accessor", n[a]).then((g) => (o[a] = g, o[a]))
      );
    return r.length < 1 ? null : (r.push(this.parser.createNodeMesh(A)), Promise.all(r).then((a) => {
      const g = a.pop(), C = g.isGroup ? g.children : [g], E = a[0].count, B = [];
      for (const Q of C) {
        const l = new wA(), h = new V(), c = new jA(), u = new V(1, 1, 1), d = new we(
          Q.geometry,
          Q.material,
          E
        );
        for (let f = 0; f < E; f++)
          o.TRANSLATION && h.fromBufferAttribute(o.TRANSLATION, f), o.ROTATION && c.fromBufferAttribute(o.ROTATION, f), o.SCALE && u.fromBufferAttribute(o.SCALE, f), d.setMatrixAt(f, l.compose(h, c, u));
        for (const f in o)
          f !== "TRANSLATION" && f !== "ROTATION" && f !== "SCALE" && Q.geometry.setAttribute(
            f,
            o[f]
          );
        ZA.prototype.copy.call(d, Q), d.frustumCulled = !1, this.parser.assignFinalMaterial(d), B.push(d);
      }
      return g.isGroup ? (g.clear(), g.add(...B), g) : B[0];
    }));
  }
}
const ie = "glTF", j = 12, HA = { JSON: 1313821514, BIN: 5130562 };
class qt {
  constructor(A) {
    this.name = p.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const e = new DataView(A, 0, j);
    if (this.header = {
      magic: O.decodeText(new Uint8Array(A.slice(0, 4))),
      version: e.getUint32(4, !0),
      length: e.getUint32(8, !0)
    }, this.header.magic !== ie)
      throw new Error("GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("GLTFLoader: Legacy binary file detected.");
    const i = this.header.length - j, t = new DataView(A, j);
    let s = 0;
    for (; s < i; ) {
      const n = t.getUint32(s, !0);
      s += 4;
      const r = t.getUint32(s, !0);
      if (s += 4, r === HA.JSON) {
        const o = new Uint8Array(
          A,
          j + s,
          n
        );
        this.content = O.decodeText(o);
      } else if (r === HA.BIN) {
        const o = j + s;
        this.body = A.slice(o, o + n);
      }
      s += n;
    }
    if (this.content === null)
      throw new Error("GLTFLoader: JSON content not found.");
  }
}
class Ht {
  constructor(A, e) {
    if (!e)
      throw new Error("GLTFLoader: No DRACOLoader instance provided.");
    this.name = p.KHR_DRACO_MESH_COMPRESSION, this.json = A, this.dracoLoader = e, this.dracoLoader.preload(), pt();
  }
  decodePrimitive(A, e) {
    const i = this.json, t = this.dracoLoader, s = A.extensions[this.name].bufferView, n = A.extensions[this.name].attributes, r = {}, o = {}, a = {};
    for (const g in n) {
      const C = yA[g] || g.toLowerCase();
      r[C] = n[g];
    }
    for (const g in A.attributes) {
      const C = yA[g] || g.toLowerCase();
      if (n[g] !== void 0) {
        const E = i.accessors[A.attributes[g]], B = W[E.componentType];
        a[C] = B.name, o[C] = E.normalized === !0;
      }
    }
    return e.getDependency("bufferView", s).then(function(g) {
      return new Promise(function(C) {
        t.decodeDracoFile(
          g,
          function(E) {
            for (const B in E.attributes) {
              const Q = E.attributes[B], l = o[B];
              l !== void 0 && (Q.normalized = l);
            }
            Dt(), C(E);
          },
          r,
          a
        );
      });
    });
  }
}
class Jt {
  constructor() {
    this.name = p.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(A, e) {
    return e.texCoord !== void 0 && console.warn(
      'GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.'
    ), e.offset === void 0 && e.rotation === void 0 && e.scale === void 0 || (A = A.clone(), e.offset !== void 0 && A.offset.fromArray(e.offset), e.rotation !== void 0 && (A.rotation = e.rotation), e.scale !== void 0 && A.repeat.fromArray(e.scale), A.needsUpdate = !0), A;
  }
}
class Kt {
  constructor() {
    this.name = p.KHR_MESH_QUANTIZATION;
  }
}
class oe extends tt {
  constructor(A, e, i, t) {
    super(A, e, i, t);
  }
  copySampleValue_(A) {
    const e = this.resultBuffer, i = this.sampleValues, t = this.valueSize, s = A * t * 3 + t;
    for (let n = 0; n !== t; n++)
      e[n] = i[s + n];
    return e;
  }
  interpolate_(A, e, i, t) {
    const s = this.resultBuffer, n = this.sampleValues, r = this.valueSize, o = r * 2, a = r * 3, g = t - e, C = (i - e) / g, E = C * C, B = E * C, Q = A * a, l = Q - a, h = -2 * B + 3 * E, c = B - E, u = 1 - h, d = c - E + C;
    for (let f = 0; f !== r; f++) {
      const w = n[l + f + r], m = n[l + f + o] * g, D = n[Q + f + r], S = n[Q + f] * g;
      s[f] = u * w + d * m + h * D + c * S;
    }
    return s;
  }
}
const Ot = new jA();
class Yt extends oe {
  interpolate_(A, e, i, t) {
    const s = super.interpolate_(A, e, i, t);
    return Ot.fromArray(s).normalize().toArray(s), s;
  }
}
const G = {
  FLOAT: 5126,
  FLOAT_MAT3: 35675,
  FLOAT_MAT4: 35676,
  FLOAT_VEC2: 35664,
  FLOAT_VEC3: 35665,
  FLOAT_VEC4: 35666,
  LINEAR: 9729,
  REPEAT: 10497,
  SAMPLER_2D: 35678,
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
  UNSIGNED_BYTE: 5121,
  UNSIGNED_SHORT: 5123
}, W = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, JA = {
  9728: Oe,
  9729: gA,
  9984: Ye,
  9985: Pe,
  9986: Ve,
  9987: LA
}, KA = {
  33071: Xe,
  33648: We,
  10497: mA
}, QA = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, yA = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv2",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
}, H = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, Pt = {
  CUBICSPLINE: void 0,
  LINEAR: Ae,
  STEP: ve
}, cA = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function Vt(I) {
  return I.DefaultMaterial === void 0 && (I.DefaultMaterial = new IA({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: je
  })), I.DefaultMaterial;
}
function z(I, A, e) {
  for (const i in e.extensions)
    I[i] === void 0 && (A.userData.gltfExtensions = A.userData.gltfExtensions || {}, A.userData.gltfExtensions[i] = e.extensions[i]);
}
function J(I, A) {
  A.extras !== void 0 && (typeof A.extras == "object" ? Object.assign(I.userData, A.extras) : console.warn(
    "GLTFLoader: Ignoring primitive type .extras, " + A.extras
  ));
}
function Xt(I, A, e) {
  let i = !1, t = !1, s = !1;
  for (let a = 0, g = A.length; a < g; a++) {
    const C = A[a];
    if (C.POSITION !== void 0 && (i = !0), C.NORMAL !== void 0 && (t = !0), C.COLOR_0 !== void 0 && (s = !0), i && t && s)
      break;
  }
  if (!i && !t && !s)
    return Promise.resolve(I);
  const n = [], r = [], o = [];
  for (let a = 0, g = A.length; a < g; a++) {
    const C = A[a];
    if (i) {
      const E = C.POSITION !== void 0 ? e.getDependency("accessor", C.POSITION) : I.attributes.position;
      n.push(E);
    }
    if (t) {
      const E = C.NORMAL !== void 0 ? e.getDependency("accessor", C.NORMAL) : I.attributes.normal;
      r.push(E);
    }
    if (s) {
      const E = C.COLOR_0 !== void 0 ? e.getDependency("accessor", C.COLOR_0) : I.attributes.color;
      o.push(E);
    }
  }
  return Promise.all([
    Promise.all(n),
    Promise.all(r),
    Promise.all(o)
  ]).then(function(a) {
    const g = a[0], C = a[1], E = a[2];
    return i && (I.morphAttributes.position = g), t && (I.morphAttributes.normal = C), s && (I.morphAttributes.color = E), I.morphTargetsRelative = !0, I;
  });
}
function Wt(I, A) {
  if (I.updateMorphTargets(), A.weights !== void 0)
    for (let e = 0, i = A.weights.length; e < i; e++)
      I.morphTargetInfluences[e] = A.weights[e];
  if (A.extras && Array.isArray(A.extras.targetNames)) {
    const e = A.extras.targetNames;
    if (I.morphTargetInfluences.length === e.length) {
      I.morphTargetDictionary = {};
      for (let i = 0, t = e.length; i < t; i++)
        I.morphTargetDictionary[e[i]] = i;
    } else
      console.warn(
        "GLTFLoader: Invalid extras.targetNames length. Ignoring names."
      );
  }
}
function vt(I) {
  const A = I.extensions && I.extensions[p.KHR_DRACO_MESH_COMPRESSION];
  let e;
  return A ? e = "draco:" + A.bufferView + ":" + A.indices + ":" + OA(A.attributes) : e = I.indices + ":" + OA(I.attributes) + ":" + I.mode, e;
}
function OA(I) {
  let A = "";
  const e = Object.keys(I).sort();
  for (let i = 0, t = e.length; i < t; i++)
    A += e[i] + ":" + I[e[i]] + ";";
  return A;
}
function RA(I) {
  switch (I) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error(
        "GLTFLoader: Unsupported normalized accessor component type."
      );
  }
}
function jt(I) {
  return I.search(/\.jpe?g($|\?)/i) > 0 || I.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : I.search(/\.webp($|\?)/i) > 0 || I.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
class zt {
  constructor(A = {}, e = {}) {
    this.json = A, this.extensions = {}, this.plugins = {}, this.options = e, this.cache = new mt(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let i = !1, t = !1, s = -1;
    typeof navigator < "u" && (i = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === !0, t = navigator.userAgent.indexOf("Firefox") > -1, s = t ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1), typeof createImageBitmap > "u" || i || t && s < 98 ? this.textureLoader = new me(this.options.manager) : this.textureLoader = new ye(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new x(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(A) {
    this.extensions = A;
  }
  setPlugins(A) {
    this.plugins = A;
  }
  parse(A, e) {
    const i = this, t = this.json, s = this.extensions;
    this.cache.removeAll(), this._invokeAll(function(n) {
      return n._markDefs && n._markDefs();
    }), Promise.all(
      this._invokeAll(function(n) {
        return n.beforeRoot && n.beforeRoot();
      })
    ).then(function() {
      return Promise.all([
        i.getDependencies("scene"),
        i.getDependencies("animation"),
        i.getDependencies("camera")
      ]);
    }).then(function(n) {
      const r = {
        scene: n[0][t.scene || 0],
        scenes: n[0],
        animations: n[1],
        cameras: n[2],
        asset: t.asset,
        parser: i,
        userData: {}
      };
      z(s, r, t), J(r, t), Promise.all(
        i._invokeAll(function(o) {
          return o.afterRoot && o.afterRoot(r);
        })
      ).then(function() {
        A(r);
      });
    }).catch(e);
  }
  _markDefs() {
    const A = this.json.nodes || [], e = this.json.skins || [], i = this.json.meshes || [];
    for (let t = 0, s = e.length; t < s; t++) {
      const n = e[t].joints;
      for (let r = 0, o = n.length; r < o; r++)
        A[n[r]].isBone = !0;
    }
    for (let t = 0, s = A.length; t < s; t++) {
      const n = A[t];
      n.mesh !== void 0 && (this._addNodeRef(this.meshCache, n.mesh), n.skin !== void 0 && (i[n.mesh].isSkinnedMesh = !0)), n.camera !== void 0 && this._addNodeRef(this.cameraCache, n.camera);
    }
  }
  _addNodeRef(A, e) {
    e !== void 0 && (A.refs[e] === void 0 && (A.refs[e] = A.uses[e] = 0), A.refs[e]++);
  }
  _getNodeRef(A, e, i) {
    if (A.refs[e] <= 1)
      return i;
    const t = i.clone(), s = (n, r) => {
      const o = this.associations.get(n);
      o != null && this.associations.set(r, o);
      for (const [a, g] of n.children.entries())
        s(g, r.children[a]);
    };
    return s(i, t), t.name += "_instance_" + A.uses[e]++, t;
  }
  _invokeOne(A) {
    const e = Object.values(this.plugins);
    e.push(this);
    for (let i = 0; i < e.length; i++) {
      const t = A(e[i]);
      if (t)
        return t;
    }
    return null;
  }
  _invokeAll(A) {
    const e = Object.values(this.plugins);
    e.unshift(this);
    const i = [];
    for (let t = 0; t < e.length; t++) {
      const s = A(e[t]);
      s && i.push(s);
    }
    return i;
  }
  getDependency(A, e) {
    const i = A + ":" + e;
    let t = this.cache.get(i);
    if (!t) {
      switch (A) {
        case "scene":
          t = this.loadScene(e);
          break;
        case "node":
          t = this.loadNode(e);
          break;
        case "mesh":
          t = this._invokeOne(function(s) {
            return s.loadMesh && s.loadMesh(e);
          });
          break;
        case "accessor":
          t = this.loadAccessor(e);
          break;
        case "bufferView":
          t = this._invokeOne(function(s) {
            return s.loadBufferView && s.loadBufferView(e);
          });
          break;
        case "buffer":
          t = this.loadBuffer(e);
          break;
        case "material":
          t = this._invokeOne(function(s) {
            return s.loadMaterial && s.loadMaterial(e);
          });
          break;
        case "texture":
          t = this._invokeOne(function(s) {
            return s.loadTexture && s.loadTexture(e);
          });
          break;
        case "skin":
          t = this.loadSkin(e);
          break;
        case "animation":
          t = this._invokeOne(function(s) {
            return s.loadAnimation && s.loadAnimation(e);
          });
          break;
        case "camera":
          t = this.loadCamera(e);
          break;
        default:
          if (t = this._invokeOne(function(s) {
            return s != this && s.getDependency && s.getDependency(A, e);
          }), !t)
            throw new Error("Unknown type: " + A);
          break;
      }
      this.cache.add(i, t);
    }
    return t;
  }
  getDependencies(A) {
    let e = this.cache.get(A);
    if (!e) {
      const i = this, t = this.json[A + (A === "mesh" ? "es" : "s")] || [];
      e = Promise.all(
        t.map(function(s, n) {
          return i.getDependency(A, n);
        })
      ), this.cache.add(A, e);
    }
    return e;
  }
  loadBuffer(A) {
    const e = this.json.buffers[A], i = this.fileLoader;
    if (e.type && e.type !== "arraybuffer")
      throw new Error(
        "GLTFLoader: " + e.type + " buffer type is not supported."
      );
    if (e.uri === void 0 && A === 0)
      return Promise.resolve(
        this.extensions[p.KHR_BINARY_GLTF].body
      );
    const t = this.options;
    return new Promise(function(s, n) {
      i.load(
        O.resolveURL(e.uri, t.path),
        s,
        void 0,
        function() {
          n(
            new Error(
              'GLTFLoader: Failed to load buffer "' + e.uri + '".'
            )
          );
        }
      );
    });
  }
  loadBufferView(A) {
    const e = this.json.bufferViews[A];
    return this.getDependency("buffer", e.buffer).then(
      function(i) {
        const t = e.byteLength || 0, s = e.byteOffset || 0;
        return i.slice(s, s + t);
      }
    );
  }
  loadAccessor(A) {
    const e = this, i = this.json, t = this.json.accessors[A];
    if (t.bufferView === void 0 && t.sparse === void 0) {
      const n = QA[t.type], r = W[t.componentType], o = t.normalized === !0, a = new r(t.count * n);
      return Promise.resolve(
        new eA(a, n, o)
      );
    }
    const s = [];
    return t.bufferView !== void 0 ? s.push(
      this.getDependency("bufferView", t.bufferView)
    ) : s.push(null), t.sparse !== void 0 && (s.push(
      this.getDependency(
        "bufferView",
        t.sparse.indices.bufferView
      )
    ), s.push(
      this.getDependency(
        "bufferView",
        t.sparse.values.bufferView
      )
    )), Promise.all(s).then(function(n) {
      const r = n[0], o = QA[t.type], a = W[t.componentType], g = a.BYTES_PER_ELEMENT, C = g * o, E = t.byteOffset || 0, B = t.bufferView !== void 0 ? i.bufferViews[t.bufferView].byteStride : void 0, Q = t.normalized === !0;
      let l, h;
      if (B && B !== C) {
        const c = Math.floor(E / B), u = "InterleavedBuffer:" + t.bufferView + ":" + t.componentType + ":" + c + ":" + t.count;
        let d = e.cache.get(u);
        d || (l = new a(
          r,
          c * B,
          t.count * B / g
        ), d = new Re(l, B / g), e.cache.add(u, d)), h = new Fe(
          d,
          o,
          E % B / g,
          Q
        );
      } else
        r === null ? l = new a(t.count * o) : l = new a(
          r,
          E,
          t.count * o
        ), h = new eA(
          l,
          o,
          Q
        );
      if (t.sparse !== void 0) {
        const c = QA.SCALAR, u = W[t.sparse.indices.componentType], d = t.sparse.indices.byteOffset || 0, f = t.sparse.values.byteOffset || 0, w = new u(
          n[1],
          d,
          t.sparse.count * c
        ), m = new a(
          n[2],
          f,
          t.sparse.count * o
        );
        r !== null && (h = new eA(
          h.array.slice(),
          h.itemSize,
          h.normalized
        ));
        for (let D = 0, S = w.length; D < S; D++) {
          const L = w[D];
          if (h.setX(L, m[D * o]), o >= 2 && h.setY(
            L,
            m[D * o + 1]
          ), o >= 3 && h.setZ(
            L,
            m[D * o + 2]
          ), o >= 4 && h.setW(
            L,
            m[D * o + 3]
          ), o >= 5)
            throw new Error(
              "GLTFLoader: Unsupported itemSize in sparse BufferAttribute."
            );
        }
      }
      return h;
    });
  }
  loadTexture(A) {
    const e = this.json, i = this.options, s = e.textures[A].source, n = e.images[s];
    let r = this.textureLoader;
    if (n.uri) {
      const o = i.manager.getHandler(n.uri);
      o !== null && (r = o);
    }
    return this.loadTextureImage(A, s, r);
  }
  loadTextureImage(A, e, i) {
    const t = this, s = this.json, n = s.textures[A], r = s.images[e], o = (r.uri || r.bufferView) + ":" + n.sampler;
    if (this.textureCache[o])
      return this.textureCache[o];
    const a = this.loadImageSource(e, i).then(function(g) {
      g.flipY = !1, g.name = n.name || r.name || "";
      const E = (s.samplers || {})[n.sampler] || {};
      return g.magFilter = JA[E.magFilter] || gA, g.minFilter = JA[E.minFilter] || LA, g.wrapS = KA[E.wrapS] || mA, g.wrapT = KA[E.wrapT] || mA, t.associations.set(g, { textures: A }), g;
    }).catch(function() {
      return null;
    });
    return this.textureCache[o] = a, a;
  }
  loadImageSource(A, e) {
    const i = this, t = this.json, s = this.options;
    if (this.sourceCache[A] !== void 0)
      return this.sourceCache[A].then(
        (C) => C.clone()
      );
    const n = t.images[A], r = self.URL || self.webkitURL;
    let o = n.uri || "", a = !1;
    if (n.bufferView !== void 0)
      o = i.getDependency("bufferView", n.bufferView).then(function(C) {
        a = !0;
        const E = new Blob([C], {
          type: n.mimeType
        });
        return o = r.createObjectURL(E), o;
      });
    else if (n.uri === void 0)
      throw new Error(
        "GLTFLoader: Image " + A + " is missing URI and bufferView"
      );
    const g = Promise.resolve(o).then(function(C) {
      return new Promise(function(E, B) {
        let Q = E;
        e.isImageBitmapLoader === !0 && (Q = function(l) {
          const h = new _A(l);
          h.needsUpdate = !0, E(h);
        }), e.load(
          O.resolveURL(C, s.path),
          Q,
          void 0,
          B
        );
      });
    }).then(function(C) {
      return a === !0 && r.revokeObjectURL(o), C.userData.mimeType = n.mimeType || jt(n.uri), C;
    }).catch(function(C) {
      throw console.error("GLTFLoader: Couldn't load texture", o), C;
    });
    return this.sourceCache[A] = g, g;
  }
  assignTexture(A, e, i, t) {
    const s = this;
    return this.getDependency("texture", i.index).then(function(n) {
      if (!n)
        return null;
      if (i.texCoord !== void 0 && i.texCoord != 0 && !(e === "aoMap" && i.texCoord == 1) && console.warn(
        "GLTFLoader: Custom UV set " + i.texCoord + " for texture " + e + " not yet supported."
      ), s.extensions[p.KHR_TEXTURE_TRANSFORM]) {
        const r = i.extensions !== void 0 ? i.extensions[p.KHR_TEXTURE_TRANSFORM] : void 0;
        if (r) {
          const o = s.associations.get(n);
          n = s.extensions[p.KHR_TEXTURE_TRANSFORM].extendTexture(n, r), s.associations.set(n, o);
        }
      }
      return t !== void 0 && (n.encoding = t), A[e] = n, n;
    });
  }
  assignFinalMaterial(A) {
    const e = A.geometry;
    let i = A.material;
    const t = e.attributes.tangent === void 0, s = e.attributes.color !== void 0, n = e.attributes.normal === void 0;
    if (A.isPoints) {
      const r = "PointsMaterial:" + i.uuid;
      let o = this.cache.get(r);
      o || (o = new Se(), CA.prototype.copy.call(o, i), o.color.copy(i.color), o.map = i.map, o.sizeAttenuation = !1, this.cache.add(r, o)), i = o;
    } else if (A.isLine) {
      const r = "LineBasicMaterial:" + i.uuid;
      let o = this.cache.get(r);
      o || (o = new Le(), CA.prototype.copy.call(o, i), o.color.copy(i.color), this.cache.add(r, o)), i = o;
    }
    if (t || s || n) {
      let r = "ClonedMaterial:" + i.uuid + ":";
      t && (r += "derivative-tangents:"), s && (r += "vertex-colors:"), n && (r += "flat-shading:");
      let o = this.cache.get(r);
      o || (o = i.clone(), s && (o.vertexColors = !0), n && (o.flatShading = !0), t && (o.normalScale && (o.normalScale.y *= -1), o.clearcoatNormalScale && (o.clearcoatNormalScale.y *= -1)), this.cache.add(r, o), this.associations.set(
        o,
        this.associations.get(i)
      )), i = o;
    }
    i.aoMap && e.attributes.uv2 === void 0 && e.attributes.uv !== void 0 && e.setAttribute("uv2", e.attributes.uv), A.material = i;
  }
  getMaterialType() {
    return IA;
  }
  loadMaterial(A) {
    const e = this, i = this.json, t = this.extensions, s = i.materials[A];
    let n;
    const r = {}, o = s.extensions || {}, a = [];
    if (o[p.KHR_MATERIALS_UNLIT]) {
      const C = t[p.KHR_MATERIALS_UNLIT];
      n = C.getMaterialType(), a.push(
        C.extendParams(r, s, e)
      );
    } else {
      const C = s.pbrMetallicRoughness || {};
      if (r.color = new Y(1, 1, 1), r.opacity = 1, Array.isArray(C.baseColorFactor)) {
        const E = C.baseColorFactor;
        r.color.fromArray(E), r.opacity = E[3];
      }
      C.baseColorTexture !== void 0 && a.push(
        e.assignTexture(
          r,
          "map",
          C.baseColorTexture,
          P
        )
      ), r.metalness = C.metallicFactor !== void 0 ? C.metallicFactor : 1, r.roughness = C.roughnessFactor !== void 0 ? C.roughnessFactor : 1, C.metallicRoughnessTexture !== void 0 && (a.push(
        e.assignTexture(
          r,
          "metalnessMap",
          C.metallicRoughnessTexture
        )
      ), a.push(
        e.assignTexture(
          r,
          "roughnessMap",
          C.metallicRoughnessTexture
        )
      )), n = this._invokeOne(function(E) {
        return E.getMaterialType && E.getMaterialType(A);
      }), a.push(
        Promise.all(
          this._invokeAll(function(E) {
            return E.extendMaterialParams && E.extendMaterialParams(
              A,
              r
            );
          })
        )
      );
    }
    s.doubleSided === !0 && (r.side = Ge);
    const g = s.alphaMode || cA.OPAQUE;
    if (g === cA.BLEND ? (r.transparent = !0, r.depthWrite = !1) : (r.transparent = !1, g === cA.MASK && (r.alphaTest = s.alphaCutoff !== void 0 ? s.alphaCutoff : 0.5)), s.normalTexture !== void 0 && n !== sA && (a.push(
      e.assignTexture(
        r,
        "normalMap",
        s.normalTexture
      )
    ), r.normalScale = new zA(1, 1), s.normalTexture.scale !== void 0)) {
      const C = s.normalTexture.scale;
      r.normalScale.set(C, C);
    }
    return s.occlusionTexture !== void 0 && n !== sA && (a.push(
      e.assignTexture(
        r,
        "aoMap",
        s.occlusionTexture
      )
    ), s.occlusionTexture.strength !== void 0 && (r.aoMapIntensity = s.occlusionTexture.strength)), s.emissiveFactor !== void 0 && n !== sA && (r.emissive = new Y().fromArray(
      s.emissiveFactor
    )), s.emissiveTexture !== void 0 && n !== sA && a.push(
      e.assignTexture(
        r,
        "emissiveMap",
        s.emissiveTexture,
        P
      )
    ), Promise.all(a).then(function() {
      const C = new n(r);
      return s.name && (C.name = s.name), J(C, s), e.associations.set(C, { materials: A }), s.extensions && z(
        t,
        C,
        s
      ), C;
    });
  }
  createUniqueName(A) {
    const e = Te.sanitizeNodeName(
      A || ""
    );
    let i = e;
    for (let t = 1; this.nodeNamesUsed[i]; ++t)
      i = e + "_" + t;
    return this.nodeNamesUsed[i] = !0, i;
  }
  loadGeometries(A) {
    const e = this, i = this.extensions, t = this.primitiveCache;
    function s(r) {
      return i[p.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(r, e).then(function(o) {
        return YA(o, r, e);
      });
    }
    const n = [];
    for (let r = 0, o = A.length; r < o; r++) {
      const a = A[r], g = vt(a), C = t[g];
      if (C)
        n.push(C.promise);
      else {
        let E;
        a.extensions && a.extensions[p.KHR_DRACO_MESH_COMPRESSION] ? E = s(a) : E = YA(
          new $A(),
          a,
          e
        ), t[g] = {
          primitive: a,
          promise: E
        }, n.push(E);
      }
    }
    return Promise.all(n);
  }
  loadMesh(A) {
    const e = this, i = this.json, t = this.extensions, s = i.meshes[A], n = s.primitives, r = [];
    for (let o = 0, a = n.length; o < a; o++) {
      const g = n[o].material === void 0 ? Vt(this.cache) : this.getDependency("material", n[o].material);
      r.push(g);
    }
    return r.push(e.loadGeometries(n)), Promise.all(r).then(function(o) {
      const a = o.slice(0, o.length - 1), g = o[o.length - 1], C = [];
      for (let B = 0, Q = g.length; B < Q; B++) {
        const l = g[B], h = n[B];
        let c;
        const u = a[B];
        if (h.mode === G.TRIANGLES || h.mode === G.TRIANGLE_STRIP || h.mode === G.TRIANGLE_FAN || h.mode === void 0)
          c = s.isSkinnedMesh === !0 ? new Ne(l, u) : new Ue(l, u), c.isSkinnedMesh === !0 && !c.geometry.attributes.skinWeight.normalized && c.normalizeSkinWeights(), h.mode === G.TRIANGLE_STRIP ? c.geometry = PA(
            c.geometry,
            ze
          ) : h.mode === G.TRIANGLE_FAN && (c.geometry = PA(
            c.geometry,
            te
          ));
        else if (h.mode === G.LINES)
          c = new ke(l, u);
        else if (h.mode === G.LINE_STRIP)
          c = new Me(l, u);
        else if (h.mode === G.LINE_LOOP)
          c = new _e(l, u);
        else if (h.mode === G.POINTS)
          c = new xe(l, u);
        else
          throw new Error(
            "GLTFLoader: Primitive mode unsupported: " + h.mode
          );
        Object.keys(c.geometry.morphAttributes).length > 0 && Wt(c, s), c.name = e.createUniqueName(
          s.name || "mesh_" + A
        ), J(c, s), h.extensions && z(t, c, h), e.assignFinalMaterial(c), C.push(c);
      }
      for (let B = 0, Q = C.length; B < Q; B++)
        e.associations.set(C[B], {
          meshes: A,
          primitives: B
        });
      if (C.length === 1)
        return C[0];
      const E = new EA();
      e.associations.set(E, { meshes: A });
      for (let B = 0, Q = C.length; B < Q; B++)
        E.add(C[B]);
      return E;
    });
  }
  loadCamera(A) {
    let e;
    const i = this.json.cameras[A], t = i[i.type];
    if (!t) {
      console.warn("GLTFLoader: Missing camera parameters.");
      return;
    }
    return i.type === "perspective" ? e = new be(
      qe.radToDeg(t.yfov),
      t.aspectRatio || 1,
      t.znear || 1,
      t.zfar || 2e6
    ) : i.type === "orthographic" && (e = new He(
      -t.xmag,
      t.xmag,
      t.ymag,
      -t.ymag,
      t.znear,
      t.zfar
    )), i.name && (e.name = this.createUniqueName(i.name)), J(e, i), Promise.resolve(e);
  }
  loadSkin(A) {
    const e = this.json.skins[A], i = [];
    for (let t = 0, s = e.joints.length; t < s; t++)
      i.push(this.getDependency("node", e.joints[t]));
    return e.inverseBindMatrices !== void 0 ? i.push(
      this.getDependency("accessor", e.inverseBindMatrices)
    ) : i.push(null), Promise.all(i).then(function(t) {
      const s = t.pop(), n = t, r = [], o = [];
      for (let a = 0, g = n.length; a < g; a++) {
        const C = n[a];
        if (C) {
          r.push(C);
          const E = new wA();
          s !== null && E.fromArray(s.array, a * 16), o.push(E);
        } else
          console.warn(
            'GLTFLoader: Joint "%s" could not be found.',
            e.joints[a]
          );
      }
      return new Je(r, o);
    });
  }
  loadAnimation(A) {
    const i = this.json.animations[A], t = [], s = [], n = [], r = [], o = [];
    for (let a = 0, g = i.channels.length; a < g; a++) {
      const C = i.channels[a], E = i.samplers[C.sampler], B = C.target, Q = B.node, l = i.parameters !== void 0 ? i.parameters[E.input] : E.input, h = i.parameters !== void 0 ? i.parameters[E.output] : E.output;
      t.push(this.getDependency("node", Q)), s.push(this.getDependency("accessor", l)), n.push(this.getDependency("accessor", h)), r.push(E), o.push(B);
    }
    return Promise.all([
      Promise.all(t),
      Promise.all(s),
      Promise.all(n),
      Promise.all(r),
      Promise.all(o)
    ]).then(function(a) {
      const g = a[0], C = a[1], E = a[2], B = a[3], Q = a[4], l = [];
      for (let c = 0, u = g.length; c < u; c++) {
        const d = g[c], f = C[c], w = E[c], m = B[c], D = Q[c];
        if (d === void 0)
          continue;
        d.updateMatrix();
        let S;
        switch (H[D.path]) {
          case H.weights:
            S = $e;
            break;
          case H.rotation:
            S = xA;
            break;
          case H.position:
          case H.scale:
          default:
            S = Ze;
            break;
        }
        const L = d.name ? d.name : d.uuid, U = m.interpolation !== void 0 ? Pt[m.interpolation] : Ae, k = [];
        H[D.path] === H.weights ? d.traverse(function(R) {
          R.morphTargetInfluences && k.push(
            R.name ? R.name : R.uuid
          );
        }) : k.push(L);
        let M = w.array;
        if (w.normalized) {
          const R = RA(
            M.constructor
          ), b = new Float32Array(M.length);
          for (let T = 0, tA = M.length; T < tA; T++)
            b[T] = M[T] * R;
          M = b;
        }
        for (let R = 0, b = k.length; R < b; R++) {
          const T = new S(
            k[R] + "." + H[D.path],
            f.array,
            M,
            U
          );
          m.interpolation === "CUBICSPLINE" && (T.createInterpolant = function(F) {
            const N = this instanceof xA ? Yt : oe;
            return new N(
              this.times,
              this.values,
              this.getValueSize() / 3,
              F
            );
          }, T.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0), l.push(T);
        }
      }
      const h = i.name ? i.name : "animation_" + A;
      return new Ke(h, void 0, l);
    });
  }
  createNodeMesh(A) {
    const e = this.json, i = this, t = e.nodes[A];
    return t.mesh === void 0 ? null : i.getDependency("mesh", t.mesh).then(function(s) {
      const n = i._getNodeRef(
        i.meshCache,
        t.mesh,
        s
      );
      return t.weights !== void 0 && n.traverse(function(r) {
        if (!!r.isMesh)
          for (let o = 0, a = t.weights.length; o < a; o++)
            r.morphTargetInfluences[o] = t.weights[o];
      }), n;
    });
  }
  loadNode(A) {
    const e = this.json, i = this.extensions, t = this, s = e.nodes[A], n = s.name ? t.createUniqueName(s.name) : "";
    return function() {
      const r = [], o = t._invokeOne(function(a) {
        return a.createNodeMesh && a.createNodeMesh(A);
      });
      return o && r.push(o), s.camera !== void 0 && r.push(
        t.getDependency("camera", s.camera).then(function(a) {
          return t._getNodeRef(
            t.cameraCache,
            s.camera,
            a
          );
        })
      ), t._invokeAll(function(a) {
        return a.createNodeAttachment && a.createNodeAttachment(A);
      }).forEach(function(a) {
        r.push(a);
      }), Promise.all(r);
    }().then(function(r) {
      let o;
      if (s.isBone === !0 ? o = new ee() : r.length > 1 ? o = new EA() : r.length === 1 ? o = r[0] : o = new ZA(), o !== r[0])
        for (let a = 0, g = r.length; a < g; a++)
          o.add(r[a]);
      if (s.name && (o.userData.name = s.name, o.name = n), J(o, s), s.extensions && z(i, o, s), s.matrix !== void 0) {
        const a = new wA();
        a.fromArray(s.matrix), o.applyMatrix4(a);
      } else
        s.translation !== void 0 && o.position.fromArray(s.translation), s.rotation !== void 0 && o.quaternion.fromArray(s.rotation), s.scale !== void 0 && o.scale.fromArray(s.scale);
      return t.associations.has(o) || t.associations.set(o, {}), t.associations.get(o).nodes = A, o;
    });
  }
  loadScene(A) {
    const e = this.json, i = this.extensions, t = this.json.scenes[A], s = this, n = new EA();
    t.name && (n.name = s.createUniqueName(t.name)), J(n, t), t.extensions && z(i, n, t);
    const r = t.nodes || [], o = [];
    for (let a = 0, g = r.length; a < g; a++)
      o.push(re(r[a], n, e, s));
    return Promise.all(o).then(function() {
      const a = (g) => {
        const C = /* @__PURE__ */ new Map();
        for (const [E, B] of s.associations)
          (E instanceof CA || E instanceof _A) && C.set(E, B);
        return g.traverse((E) => {
          const B = s.associations.get(E);
          B != null && C.set(E, B);
        }), C;
      };
      return s.associations = a(n), n;
    });
  }
}
function re(I, A, e, i) {
  const t = e.nodes[I];
  return i.getDependency("node", I).then(function(s) {
    return t.skin === void 0 ? s : i.getDependency("skin", t.skin).then(function(n) {
      return s.traverse(function(r) {
        !r.isSkinnedMesh || r.bind(n, r.matrixWorld);
      }), s;
    });
  }).then(function(s) {
    A.add(s);
    const n = [];
    if (t.children) {
      const r = t.children;
      for (let o = 0, a = r.length; o < a; o++) {
        const g = r[o];
        n.push(re(g, s, e, i));
      }
    }
    return Promise.all(n);
  });
}
function Zt(I, A, e) {
  const i = A.attributes, t = new At();
  if (i.POSITION !== void 0) {
    const r = e.json.accessors[i.POSITION], o = r.min, a = r.max;
    if (o !== void 0 && a !== void 0) {
      if (t.set(
        new V(o[0], o[1], o[2]),
        new V(a[0], a[1], a[2])
      ), r.normalized) {
        const g = RA(
          W[r.componentType]
        );
        t.min.multiplyScalar(g), t.max.multiplyScalar(g);
      }
    } else {
      console.warn(
        "GLTFLoader: Missing min/max properties for accessor POSITION."
      );
      return;
    }
  } else
    return;
  const s = A.targets;
  if (s !== void 0) {
    const r = new V(), o = new V();
    for (let a = 0, g = s.length; a < g; a++) {
      const C = s[a];
      if (C.POSITION !== void 0) {
        const E = e.json.accessors[C.POSITION], B = E.min, Q = E.max;
        if (B !== void 0 && Q !== void 0) {
          if (o.setX(Math.max(Math.abs(B[0]), Math.abs(Q[0]))), o.setY(Math.max(Math.abs(B[1]), Math.abs(Q[1]))), o.setZ(Math.max(Math.abs(B[2]), Math.abs(Q[2]))), E.normalized) {
            const l = RA(
              W[E.componentType]
            );
            o.multiplyScalar(l);
          }
          r.max(o);
        } else
          console.warn(
            "GLTFLoader: Missing min/max properties for accessor POSITION."
          );
      }
    }
    t.expandByVector(r);
  }
  I.boundingBox = t;
  const n = new et();
  t.getCenter(n.center), n.radius = t.min.distanceTo(t.max) / 2, I.boundingSphere = n;
}
function YA(I, A, e) {
  const i = A.attributes, t = [];
  function s(n, r) {
    return e.getDependency("accessor", n).then(function(o) {
      I.setAttribute(r, o);
    });
  }
  for (const n in i) {
    const r = yA[n] || n.toLowerCase();
    r in I.attributes || t.push(
      s(
        i[n],
        r
      )
    );
  }
  if (A.indices !== void 0 && !I.index) {
    const n = e.getDependency("accessor", A.indices).then(function(r) {
      I.setIndex(r);
    });
    t.push(n);
  }
  return J(I, A), Zt(I, A, e), Promise.all(t).then(function() {
    return A.targets !== void 0 ? Xt(I, A.targets, e) : I;
  });
}
function PA(I, A) {
  let e = I.getIndex();
  if (e === null) {
    const n = [], r = I.getAttribute("position");
    if (r !== void 0) {
      for (let o = 0; o < r.count; o++)
        n.push(o);
      I.setIndex(n), e = I.getIndex();
    } else
      return console.error(
        "GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."
      ), I;
  }
  const i = e.count - 2, t = [];
  if (A === te)
    for (let n = 1; n <= i; n++)
      t.push(e.getX(0)), t.push(e.getX(n)), t.push(e.getX(n + 1));
  else
    for (let n = 0; n < i; n++)
      n % 2 === 0 ? (t.push(e.getX(n)), t.push(e.getX(n + 1)), t.push(e.getX(n + 2))) : (t.push(e.getX(n + 2)), t.push(e.getX(n + 1)), t.push(e.getX(n)));
  t.length / 3 !== i && console.error(
    "GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles."
  );
  const s = I.clone();
  return s.setIndex(t), s;
}
const hA = /* @__PURE__ */ new WeakMap();
class $t extends SA {
  constructor(A) {
    super(A), this.decoderPath = "", this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = "", this.defaultAttributeIDs = {
      position: "POSITION",
      normal: "NORMAL",
      color: "COLOR",
      uv: "TEX_COORD"
    }, this.defaultAttributeTypes = {
      position: "Float32Array",
      normal: "Float32Array",
      color: "Float32Array",
      uv: "Float32Array"
    };
  }
  setDecoderPath(A) {
    return this.decoderPath = A, this;
  }
  setDecoderConfig(A) {
    return this.decoderConfig = A, this;
  }
  setWorkerLimit(A) {
    return this.workerLimit = A, this;
  }
  load(A, e, i, t) {
    const s = new x(this.manager);
    s.setPath(this.path), s.setResponseType("arraybuffer"), s.setRequestHeader(this.requestHeader), s.setWithCredentials(this.withCredentials), s.load(A, (n) => {
      this.decodeDracoFile(n, e).catch(t);
    }, i, t);
  }
  decodeDracoFile(A, e, i, t) {
    const s = {
      attributeIDs: i || this.defaultAttributeIDs,
      attributeTypes: t || this.defaultAttributeTypes,
      useUniqueIDs: !!i
    };
    return this.decodeGeometry(A, s).then(e);
  }
  decodeGeometry(A, e) {
    const i = JSON.stringify(e);
    if (hA.has(A)) {
      const o = hA.get(A);
      if (o.key === i)
        return o.promise;
      if (A.byteLength === 0)
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
        );
    }
    let t;
    const s = this.workerNextTaskID++, n = A.byteLength, r = this._getWorker(s, n).then((o) => (t = o, new Promise((a, g) => {
      t._callbacks[s] = { resolve: a, reject: g }, t.postMessage({ type: "decode", id: s, taskConfig: e, buffer: A }, [A]);
    }))).then((o) => this._createGeometry(o.geometry));
    return r.catch(() => !0).then(() => {
      t && s && this._releaseTask(t, s);
    }), hA.set(A, {
      key: i,
      promise: r
    }), r;
  }
  _createGeometry(A) {
    const e = new $A();
    A.index && e.setIndex(new eA(A.index.array, 1));
    for (let i = 0; i < A.attributes.length; i++) {
      const t = A.attributes[i], s = t.name, n = t.array, r = t.itemSize;
      e.setAttribute(s, new eA(n, r));
    }
    return e;
  }
  _loadLibrary(A, e) {
    const i = new x(this.manager);
    return i.setPath(this.decoderPath), i.setResponseType(e), i.setWithCredentials(this.withCredentials), new Promise((t, s) => {
      i.load(A, t, void 0, s);
    });
  }
  preload() {
    return this._initDecoder(), this;
  }
  _initDecoder() {
    if (this.decoderPending)
      return this.decoderPending;
    const A = typeof WebAssembly != "object" || this.decoderConfig.type === "js", e = [];
    return A ? e.push(this._loadLibrary("draco_decoder.js", "text")) : (e.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), e.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(e).then((i) => {
      const t = i[0];
      A || (this.decoderConfig.wasmBinary = i[1]);
      const s = As.toString(), n = [
        "/* draco decoder */",
        t,
        "",
        "/* worker */",
        s.substring(s.indexOf("{") + 1, s.lastIndexOf("}"))
      ].join(`
`);
      this.workerSourceURL = URL.createObjectURL(new Blob([n]));
    }), this.decoderPending;
  }
  _getWorker(A, e) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const t = new Worker(this.workerSourceURL);
        t._callbacks = {}, t._taskCosts = {}, t._taskLoad = 0, t.postMessage({ type: "init", decoderConfig: this.decoderConfig }), t.onmessage = function(s) {
          const n = s.data;
          switch (n.type) {
            case "decode":
              t._callbacks[n.id].resolve(n);
              break;
            case "error":
              t._callbacks[n.id].reject(n);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + n.type + '"');
          }
        }, this.workerPool.push(t);
      } else
        this.workerPool.sort(function(t, s) {
          return t._taskLoad > s._taskLoad ? -1 : 1;
        });
      const i = this.workerPool[this.workerPool.length - 1];
      return i._taskCosts[A] = e, i._taskLoad += e, i;
    });
  }
  _releaseTask(A, e) {
    A._taskLoad -= A._taskCosts[e], delete A._callbacks[e], delete A._taskCosts[e];
  }
  debug() {
    console.log("Task load: ", this.workerPool.map((A) => A._taskLoad));
  }
  dispose() {
    for (let A = 0; A < this.workerPool.length; ++A)
      this.workerPool[A].terminate();
    return this.workerPool.length = 0, this;
  }
}
function As() {
  let I, A;
  onmessage = function(n) {
    const r = n.data;
    switch (r.type) {
      case "init":
        I = r.decoderConfig, A = new Promise(function(g) {
          I.onModuleLoaded = function(C) {
            g({ draco: C });
          }, DracoDecoderModule(I);
        });
        break;
      case "decode":
        const o = r.buffer, a = r.taskConfig;
        A.then((g) => {
          const C = g.draco, E = new C.Decoder(), B = new C.DecoderBuffer();
          B.Init(new Int8Array(o), o.byteLength);
          try {
            const Q = e(C, E, B, a), l = Q.attributes.map((h) => h.array.buffer);
            Q.index && l.push(Q.index.array.buffer), self.postMessage({ type: "decode", id: r.id, geometry: Q }, l);
          } catch (Q) {
            console.error(Q), self.postMessage({ type: "error", id: r.id, error: Q.message });
          } finally {
            C.destroy(B), C.destroy(E);
          }
        });
        break;
    }
  };
  function e(n, r, o, a) {
    const g = a.attributeIDs, C = a.attributeTypes;
    let E, B;
    const Q = r.GetEncodedGeometryType(o);
    if (Q === n.TRIANGULAR_MESH)
      E = new n.Mesh(), B = r.DecodeBufferToMesh(o, E);
    else if (Q === n.POINT_CLOUD)
      E = new n.PointCloud(), B = r.DecodeBufferToPointCloud(o, E);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!B.ok() || E.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + B.error_msg());
    const l = { index: null, attributes: [] };
    for (const h in g) {
      const c = self[C[h]];
      let u, d;
      if (a.useUniqueIDs)
        d = g[h], u = r.GetAttributeByUniqueId(E, d);
      else {
        if (d = r.GetAttributeId(E, n[g[h]]), d === -1)
          continue;
        u = r.GetAttribute(E, d);
      }
      l.attributes.push(t(n, r, E, h, c, u));
    }
    return Q === n.TRIANGULAR_MESH && (l.index = i(n, r, E)), n.destroy(E), l;
  }
  function i(n, r, o) {
    const g = o.num_faces() * 3, C = g * 4, E = n._malloc(C);
    r.GetTrianglesUInt32Array(o, C, E);
    const B = new Uint32Array(n.HEAPF32.buffer, E, g).slice();
    return n._free(E), { array: B, itemSize: 1 };
  }
  function t(n, r, o, a, g, C) {
    const E = C.num_components(), Q = o.num_points() * E, l = Q * g.BYTES_PER_ELEMENT, h = s(n, g), c = n._malloc(l);
    r.GetAttributeDataArrayForAllPoints(o, C, h, l, c);
    const u = new g(n.HEAPF32.buffer, c, Q).slice();
    return n._free(c), {
      name: a,
      array: u,
      itemSize: E
    };
  }
  function s(n, r) {
    switch (r) {
      case Float32Array:
        return n.DT_FLOAT32;
      case Int8Array:
        return n.DT_INT8;
      case Int16Array:
        return n.DT_INT16;
      case Int32Array:
        return n.DT_INT32;
      case Uint8Array:
        return n.DT_UINT8;
      case Uint16Array:
        return n.DT_UINT16;
      case Uint32Array:
        return n.DT_UINT32;
    }
  }
}
class es {
  constructor(A = 4) {
    this.pool = A, this.queue = [], this.workers = [], this.workersResolve = [], this.workerStatus = 0;
  }
  _initWorker(A) {
    if (!this.workers[A]) {
      const e = this.workerCreator();
      e.addEventListener("message", this._onMessage.bind(this, A)), this.workers[A] = e;
    }
  }
  _getIdleWorker() {
    for (let A = 0; A < this.pool; A++)
      if (!(this.workerStatus & 1 << A))
        return A;
    return -1;
  }
  _onMessage(A, e) {
    const i = this.workersResolve[A];
    if (i && i(e), this.queue.length) {
      const { resolve: t, msg: s, transfer: n } = this.queue.shift();
      this.workersResolve[A] = t, this.workers[A].postMessage(s, n);
    } else
      this.workerStatus ^= 1 << A;
  }
  setWorkerCreator(A) {
    this.workerCreator = A;
  }
  setWorkerLimit(A) {
    this.pool = A;
  }
  postMessage(A, e) {
    return new Promise((i) => {
      const t = this._getIdleWorker();
      t !== -1 ? (this._initWorker(t), this.workerStatus |= 1 << t, this.workersResolve[t] = i, this.workers[t].postMessage(A, e)) : this.queue.push({ resolve: i, msg: A, transfer: e });
    });
  }
  dispose() {
    this.workers.forEach((A) => A.terminate()), this.workersResolve.length = 0, this.workers.length = 0, this.queue.length = 0, this.workerStatus = 0;
  }
}
const ts = 0, ss = 2, ns = 1, is = 2, os = 0, ae = 9, GA = 15, ge = 16, TA = 22, Ie = 37, NA = 43, Be = 76, Ce = 83, Ee = 97, Qe = 100, ce = 103, he = 109;
class rs {
  constructor() {
    this.vkFormat = 0, this.typeSize = 1, this.pixelWidth = 0, this.pixelHeight = 0, this.pixelDepth = 0, this.layerCount = 0, this.faceCount = 1, this.supercompressionScheme = 0, this.levels = [], this.dataFormatDescriptor = [{ vendorId: 0, descriptorType: 0, descriptorBlockSize: 0, versionNumber: 2, colorModel: 0, colorPrimaries: 1, transferFunction: 2, flags: 0, texelBlockDimension: [0, 0, 0, 0], bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0], samples: [] }], this.keyValue = {}, this.globalData = null;
  }
}
class Z {
  constructor(A, e, i, t) {
    this._dataView = new DataView(A.buffer, A.byteOffset + e, i), this._littleEndian = t, this._offset = 0;
  }
  _nextUint8() {
    const A = this._dataView.getUint8(this._offset);
    return this._offset += 1, A;
  }
  _nextUint16() {
    const A = this._dataView.getUint16(this._offset, this._littleEndian);
    return this._offset += 2, A;
  }
  _nextUint32() {
    const A = this._dataView.getUint32(this._offset, this._littleEndian);
    return this._offset += 4, A;
  }
  _nextUint64() {
    const A = this._dataView.getUint32(this._offset, this._littleEndian) + 4294967296 * this._dataView.getUint32(this._offset + 4, this._littleEndian);
    return this._offset += 8, A;
  }
  _nextInt32() {
    const A = this._dataView.getInt32(this._offset, this._littleEndian);
    return this._offset += 4, A;
  }
  _skip(A) {
    return this._offset += A, this;
  }
  _scan(A, e = 0) {
    const i = this._offset;
    let t = 0;
    for (; this._dataView.getUint8(this._offset) !== e && t < A; )
      t++, this._offset++;
    return t < A && this._offset++, new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + i, t);
  }
}
const y = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
function VA(I) {
  return typeof TextDecoder < "u" ? new TextDecoder().decode(I) : Buffer.from(I).toString("utf8");
}
function as(I) {
  const A = new Uint8Array(I.buffer, I.byteOffset, y.length);
  if (A[0] !== y[0] || A[1] !== y[1] || A[2] !== y[2] || A[3] !== y[3] || A[4] !== y[4] || A[5] !== y[5] || A[6] !== y[6] || A[7] !== y[7] || A[8] !== y[8] || A[9] !== y[9] || A[10] !== y[10] || A[11] !== y[11])
    throw new Error("Missing KTX 2.0 identifier.");
  const e = new rs(), i = 17 * Uint32Array.BYTES_PER_ELEMENT, t = new Z(I, y.length, i, !0);
  e.vkFormat = t._nextUint32(), e.typeSize = t._nextUint32(), e.pixelWidth = t._nextUint32(), e.pixelHeight = t._nextUint32(), e.pixelDepth = t._nextUint32(), e.layerCount = t._nextUint32(), e.faceCount = t._nextUint32();
  const s = t._nextUint32();
  e.supercompressionScheme = t._nextUint32();
  const n = t._nextUint32(), r = t._nextUint32(), o = t._nextUint32(), a = t._nextUint32(), g = t._nextUint64(), C = t._nextUint64(), E = new Z(I, y.length + i, 3 * s * 8, !0);
  for (let F = 0; F < s; F++)
    e.levels.push({ levelData: new Uint8Array(I.buffer, I.byteOffset + E._nextUint64(), E._nextUint64()), uncompressedByteLength: E._nextUint64() });
  const B = new Z(I, n, r, !0), Q = { vendorId: B._skip(4)._nextUint16(), descriptorType: B._nextUint16(), versionNumber: B._nextUint16(), descriptorBlockSize: B._nextUint16(), colorModel: B._nextUint8(), colorPrimaries: B._nextUint8(), transferFunction: B._nextUint8(), flags: B._nextUint8(), texelBlockDimension: [B._nextUint8(), B._nextUint8(), B._nextUint8(), B._nextUint8()], bytesPlane: [B._nextUint8(), B._nextUint8(), B._nextUint8(), B._nextUint8(), B._nextUint8(), B._nextUint8(), B._nextUint8(), B._nextUint8()], samples: [] }, l = (Q.descriptorBlockSize / 4 - 6) / 4;
  for (let F = 0; F < l; F++) {
    const N = { bitOffset: B._nextUint16(), bitLength: B._nextUint8(), channelType: B._nextUint8(), samplePosition: [B._nextUint8(), B._nextUint8(), B._nextUint8(), B._nextUint8()], sampleLower: -1 / 0, sampleUpper: 1 / 0 };
    64 & N.channelType ? (N.sampleLower = B._nextInt32(), N.sampleUpper = B._nextInt32()) : (N.sampleLower = B._nextUint32(), N.sampleUpper = B._nextUint32()), Q.samples[F] = N;
  }
  e.dataFormatDescriptor.length = 0, e.dataFormatDescriptor.push(Q);
  const h = new Z(I, o, a, !0);
  for (; h._offset < a; ) {
    const F = h._nextUint32(), N = h._scan(F), UA = VA(N), kA = h._scan(F - N.byteLength);
    e.keyValue[UA] = UA.match(/^ktx/i) ? VA(kA) : kA, h._offset % 4 && h._skip(4 - h._offset % 4);
  }
  if (C <= 0)
    return e;
  const c = new Z(I, g, C, !0), u = c._nextUint16(), d = c._nextUint16(), f = c._nextUint32(), w = c._nextUint32(), m = c._nextUint32(), D = c._nextUint32(), S = [];
  for (let F = 0; F < s; F++)
    S.push({ imageFlags: c._nextUint32(), rgbSliceByteOffset: c._nextUint32(), rgbSliceByteLength: c._nextUint32(), alphaSliceByteOffset: c._nextUint32(), alphaSliceByteLength: c._nextUint32() });
  const L = g + c._offset, U = L + f, k = U + w, M = k + m, R = new Uint8Array(I.buffer, I.byteOffset + L, f), b = new Uint8Array(I.buffer, I.byteOffset + U, w), T = new Uint8Array(I.buffer, I.byteOffset + k, m), tA = new Uint8Array(I.buffer, I.byteOffset + M, D);
  return e.globalData = { endpointCount: u, selectorCount: d, imageDescs: S, endpointsData: R, selectorsData: b, tablesData: T, extendedData: tA }, e;
}
let lA, q, FA;
const uA = { env: { emscripten_notify_memory_growth: function(I) {
  FA = new Uint8Array(q.exports.memory.buffer);
} } };
class gs {
  init() {
    return lA || (lA = typeof fetch < "u" ? fetch("data:application/wasm;base64," + XA).then((A) => A.arrayBuffer()).then((A) => WebAssembly.instantiate(A, uA)).then(this._init) : WebAssembly.instantiate(Buffer.from(XA, "base64"), uA).then(this._init), lA);
  }
  _init(A) {
    q = A.instance, uA.env.emscripten_notify_memory_growth(0);
  }
  decode(A, e = 0) {
    if (!q)
      throw new Error("ZSTDDecoder: Await .init() before decoding.");
    const i = A.byteLength, t = q.exports.malloc(i);
    FA.set(A, t), e = e || Number(q.exports.ZSTD_findDecompressedSize(t, i));
    const s = q.exports.malloc(e), n = q.exports.ZSTD_decompress(s, e, t, i), r = FA.slice(s, s + n);
    return q.exports.free(t), q.exports.free(s), r;
  }
}
const XA = "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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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", dA = /* @__PURE__ */ new WeakMap();
let fA = 0, pA;
class _ extends SA {
  constructor(A) {
    super(A), this.transcoderPath = "", this.transcoderBinary = null, this.transcoderPending = null, this.workerPool = new es(), this.workerSourceURL = "", this.workerConfig = null, typeof MSC_TRANSCODER < "u" && console.warn(
      'THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.'
    );
  }
  setTranscoderPath(A) {
    return this.transcoderPath = A, this;
  }
  setWorkerLimit(A) {
    return this.workerPool.setWorkerLimit(A), this;
  }
  detectSupport(A) {
    return this.workerConfig = {
      astcSupported: A.extensions.has("WEBGL_compressed_texture_astc"),
      etc1Supported: A.extensions.has("WEBGL_compressed_texture_etc1"),
      etc2Supported: A.extensions.has("WEBGL_compressed_texture_etc"),
      dxtSupported: A.extensions.has("WEBGL_compressed_texture_s3tc"),
      bptcSupported: A.extensions.has("EXT_texture_compression_bptc"),
      pvrtcSupported: A.extensions.has("WEBGL_compressed_texture_pvrtc") || A.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")
    }, A.capabilities.isWebGL2 && (this.workerConfig.etc1Supported = !1), this;
  }
  init() {
    if (!this.transcoderPending) {
      const A = new x(this.manager);
      A.setPath(this.transcoderPath), A.setWithCredentials(this.withCredentials);
      const e = A.loadAsync("basis_transcoder.js"), i = new x(this.manager);
      i.setPath(this.transcoderPath), i.setResponseType("arraybuffer"), i.setWithCredentials(this.withCredentials);
      const t = i.loadAsync("basis_transcoder.wasm");
      this.transcoderPending = Promise.all([e, t]).then(([s, n]) => {
        const r = _.BasisWorker.toString(), o = [
          "/* constants */",
          "let _EngineFormat = " + JSON.stringify(_.EngineFormat),
          "let _TranscoderFormat = " + JSON.stringify(_.TranscoderFormat),
          "let _BasisFormat = " + JSON.stringify(_.BasisFormat),
          "/* basis_transcoder.js */",
          s,
          "/* worker */",
          r.substring(r.indexOf("{") + 1, r.lastIndexOf("}"))
        ].join(`
`);
        this.workerSourceURL = URL.createObjectURL(new Blob([o])), this.transcoderBinary = n, this.workerPool.setWorkerCreator(() => {
          const a = new Worker(this.workerSourceURL), g = this.transcoderBinary.slice(0);
          return a.postMessage({ type: "init", config: this.workerConfig, transcoderBinary: g }, [g]), a;
        });
      }), fA > 0 && console.warn(
        "THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."
      ), fA++;
    }
    return this.transcoderPending;
  }
  load(A, e, i, t) {
    if (this.workerConfig === null)
      throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");
    const s = new x(this.manager);
    s.setResponseType("arraybuffer"), s.setWithCredentials(this.withCredentials), s.load(A, (n) => {
      if (dA.has(n))
        return dA.get(n).promise.then(e).catch(t);
      this._createTexture(n).then((r) => e ? e(r) : null).catch(t);
    }, i, t);
  }
  _createTextureFrom(A) {
    const { mipmaps: e, width: i, height: t, format: s, type: n, error: r, dfdTransferFn: o, dfdFlags: a } = A;
    if (n === "error")
      return Promise.reject(r);
    const g = new st(e, i, t, s, K);
    return g.minFilter = e.length === 1 ? gA : LA, g.magFilter = gA, g.generateMipmaps = !1, g.needsUpdate = !0, g.encoding = o === is ? X : P, g.premultiplyAlpha = !!(a & ns), g;
  }
  _createTexture(A, e = {}) {
    const i = as(new Uint8Array(A));
    if (i.vkFormat !== os)
      return Bs(i);
    const t = e, s = this.init().then(() => this.workerPool.postMessage({ type: "transcode", buffer: A, taskConfig: t }, [A])).then((n) => this._createTextureFrom(n.data));
    return dA.set(A, { promise: s }), s;
  }
  dispose() {
    return this.workerPool.dispose(), this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL), fA--, this;
  }
}
_.BasisFormat = {
  ETC1S: 0,
  UASTC_4x4: 1
};
_.TranscoderFormat = {
  ETC1: 0,
  ETC2: 1,
  BC1: 2,
  BC3: 3,
  BC4: 4,
  BC5: 5,
  BC7_M6_OPAQUE_ONLY: 6,
  BC7_M5: 7,
  PVRTC1_4_RGB: 8,
  PVRTC1_4_RGBA: 9,
  ASTC_4x4: 10,
  ATC_RGB: 11,
  ATC_RGBA_INTERPOLATED_ALPHA: 12,
  RGBA32: 13,
  RGB565: 14,
  BGR565: 15,
  RGBA4444: 16
};
_.EngineFormat = {
  RGBAFormat: AA,
  RGBA_ASTC_4x4_Format: nt,
  RGBA_BPTC_Format: it,
  RGBA_ETC2_EAC_Format: ot,
  RGBA_PVRTC_4BPPV1_Format: rt,
  RGBA_S3TC_DXT5_Format: at,
  RGB_ETC1_Format: gt,
  RGB_ETC2_Format: It,
  RGB_PVRTC_4BPPV1_Format: Bt,
  RGB_S3TC_DXT1_Format: Ct
};
_.BasisWorker = function() {
  let I, A, e;
  const i = _EngineFormat, t = _TranscoderFormat, s = _BasisFormat;
  self.addEventListener("message", function(B) {
    const Q = B.data;
    switch (Q.type) {
      case "init":
        I = Q.config, n(Q.transcoderBinary);
        break;
      case "transcode":
        A.then(() => {
          try {
            const { width: l, height: h, hasAlpha: c, mipmaps: u, format: d, dfdTransferFn: f, dfdFlags: w } = r(Q.buffer), m = [];
            for (let D = 0; D < u.length; ++D)
              m.push(u[D].data.buffer);
            self.postMessage({ type: "transcode", id: Q.id, width: l, height: h, hasAlpha: c, mipmaps: u, format: d, dfdTransferFn: f, dfdFlags: w }, m);
          } catch (l) {
            console.error(l), self.postMessage({ type: "error", id: Q.id, error: l.message });
          }
        });
        break;
    }
  });
  function n(B) {
    A = new Promise((Q) => {
      e = { wasmBinary: B, onRuntimeInitialized: Q }, BASIS(e);
    }).then(() => {
      e.initializeBasis(), e.KTX2File === void 0 && console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.");
    });
  }
  function r(B) {
    const Q = new e.KTX2File(new Uint8Array(B));
    function l() {
      Q.close(), Q.delete();
    }
    if (!Q.isValid())
      throw l(), new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");
    const h = Q.isUASTC() ? s.UASTC_4x4 : s.ETC1S, c = Q.getWidth(), u = Q.getHeight(), d = Q.getLevels(), f = Q.getHasAlpha(), w = Q.getDFDTransferFunc(), m = Q.getDFDFlags(), { transcoderFormat: D, engineFormat: S } = C(h, c, u, f);
    if (!c || !u || !d)
      throw l(), new Error("THREE.KTX2Loader:	Invalid texture");
    if (!Q.startTranscoding())
      throw l(), new Error("THREE.KTX2Loader: .startTranscoding failed");
    const L = [];
    for (let U = 0; U < d; U++) {
      const k = Q.getImageLevelInfo(U, 0, 0), M = k.origWidth, R = k.origHeight, b = new Uint8Array(Q.getImageTranscodedSizeInBytes(U, 0, 0, D));
      if (!Q.transcodeImage(
        b,
        U,
        0,
        0,
        D,
        0,
        -1,
        -1
      ))
        throw l(), new Error("THREE.KTX2Loader: .transcodeImage failed.");
      L.push({ data: b, width: M, height: R });
    }
    return l(), { width: c, height: u, hasAlpha: f, mipmaps: L, format: S, dfdTransferFn: w, dfdFlags: m };
  }
  const o = [
    {
      if: "astcSupported",
      basisFormat: [s.UASTC_4x4],
      transcoderFormat: [t.ASTC_4x4, t.ASTC_4x4],
      engineFormat: [i.RGBA_ASTC_4x4_Format, i.RGBA_ASTC_4x4_Format],
      priorityETC1S: 1 / 0,
      priorityUASTC: 1,
      needsPowerOfTwo: !1
    },
    {
      if: "bptcSupported",
      basisFormat: [s.ETC1S, s.UASTC_4x4],
      transcoderFormat: [t.BC7_M5, t.BC7_M5],
      engineFormat: [i.RGBA_BPTC_Format, i.RGBA_BPTC_Format],
      priorityETC1S: 3,
      priorityUASTC: 2,
      needsPowerOfTwo: !1
    },
    {
      if: "dxtSupported",
      basisFormat: [s.ETC1S, s.UASTC_4x4],
      transcoderFormat: [t.BC1, t.BC3],
      engineFormat: [i.RGB_S3TC_DXT1_Format, i.RGBA_S3TC_DXT5_Format],
      priorityETC1S: 4,
      priorityUASTC: 5,
      needsPowerOfTwo: !1
    },
    {
      if: "etc2Supported",
      basisFormat: [s.ETC1S, s.UASTC_4x4],
      transcoderFormat: [t.ETC1, t.ETC2],
      engineFormat: [i.RGB_ETC2_Format, i.RGBA_ETC2_EAC_Format],
      priorityETC1S: 1,
      priorityUASTC: 3,
      needsPowerOfTwo: !1
    },
    {
      if: "etc1Supported",
      basisFormat: [s.ETC1S, s.UASTC_4x4],
      transcoderFormat: [t.ETC1],
      engineFormat: [i.RGB_ETC1_Format],
      priorityETC1S: 2,
      priorityUASTC: 4,
      needsPowerOfTwo: !1
    },
    {
      if: "pvrtcSupported",
      basisFormat: [s.ETC1S, s.UASTC_4x4],
      transcoderFormat: [t.PVRTC1_4_RGB, t.PVRTC1_4_RGBA],
      engineFormat: [i.RGB_PVRTC_4BPPV1_Format, i.RGBA_PVRTC_4BPPV1_Format],
      priorityETC1S: 5,
      priorityUASTC: 6,
      needsPowerOfTwo: !0
    }
  ], a = o.sort(function(B, Q) {
    return B.priorityETC1S - Q.priorityETC1S;
  }), g = o.sort(function(B, Q) {
    return B.priorityUASTC - Q.priorityUASTC;
  });
  function C(B, Q, l, h) {
    let c, u;
    const d = B === s.ETC1S ? a : g;
    for (let f = 0; f < d.length; f++) {
      const w = d[f];
      if (!!I[w.if] && !!w.basisFormat.includes(B) && !(h && w.transcoderFormat.length < 2) && !(w.needsPowerOfTwo && !(E(Q) && E(l))))
        return c = w.transcoderFormat[h ? 1 : 0], u = w.engineFormat[h ? 1 : 0], { transcoderFormat: c, engineFormat: u };
    }
    return console.warn("THREE.KTX2Loader: No suitable compressed texture format found. Decoding to RGBA32."), c = t.RGBA32, u = i.RGBAFormat, { transcoderFormat: c, engineFormat: u };
  }
  function E(B) {
    return B <= 2 ? !0 : (B & B - 1) === 0 && B !== 0;
  }
};
const WA = {
  [he]: AA,
  [Ee]: AA,
  [Ie]: AA,
  [NA]: AA,
  [ce]: nA,
  [Ce]: nA,
  [ge]: nA,
  [TA]: nA,
  [Qe]: iA,
  [Be]: iA,
  [GA]: iA,
  [ae]: iA
}, DA = {
  [he]: rA,
  [Ee]: aA,
  [Ie]: K,
  [NA]: K,
  [ce]: rA,
  [Ce]: aA,
  [ge]: K,
  [TA]: K,
  [Qe]: rA,
  [Be]: aA,
  [GA]: K,
  [ae]: K
}, Is = {
  [NA]: X,
  [TA]: X,
  [GA]: X
};
async function Bs(I) {
  const { vkFormat: A, pixelWidth: e, pixelHeight: i, pixelDepth: t } = I;
  if (WA[A] === void 0)
    throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");
  const s = I.levels[0];
  let n, r;
  if (I.supercompressionScheme === ts)
    n = s.levelData;
  else if (I.supercompressionScheme === ss)
    pA || (pA = new Promise(async (a) => {
      const g = new gs();
      await g.init(), a(g);
    })), n = (await pA).decode(s.levelData, s.uncompressedByteLength);
  else
    throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");
  DA[A] === rA ? r = new Float32Array(
    n.buffer,
    n.byteOffset,
    n.byteLength / Float32Array.BYTES_PER_ELEMENT
  ) : DA[A] === aA ? r = new Uint16Array(
    n.buffer,
    n.byteOffset,
    n.byteLength / Uint16Array.BYTES_PER_ELEMENT
  ) : r = n;
  const o = t === 0 ? new Et(r, e, i) : new Qt(r, e, i, t);
  return o.type = DA[A], o.format = WA[A], o.encoding = Is[A] || P, o.needsUpdate = !0, Promise.resolve(o);
}
const Cs = (I, A, e) => {
  if (!I.has(A)) {
    const i = e();
    return I.set(A, i), i;
  }
  return I.get(A);
}, Es = "mixverse", Qs = 1, $ = "model-file";
class cs {
  constructor() {
    MA(this, "db");
  }
  async get(A, e, i) {
    this.db = await this.initDataBase();
    let t = this.db.transaction([$], "readwrite").objectStore($).get(A);
    return new Promise((s, n) => {
      t.onsuccess = (r) => {
        let o = r.target.result;
        o ? s(o) : (s({ blob: e, version: i }), this.put(A, e, i).catch(() => {
          n();
        }));
      }, t.onerror = function(r) {
        console.log("error", r), n();
      };
    });
  }
  async put(A, e, i, t) {
    if (!e)
      return Promise.reject(!1);
    let s = {
      ssn: A,
      version: i,
      blob: ""
    };
    s.blob = e;
    const n = t ? "put" : "add";
    let r = this.db.transaction([$], "readwrite").objectStore($)[n](s);
    return new Promise((o, a) => {
      r.onsuccess = function() {
        console.log("glb\u6570\u636E\u6DFB\u52A0\u6210\u529F"), o(s.blob);
      }, r.onerror = function(g) {
        console.log("glb\u6570\u636E\u6DFB\u52A0\u5931\u8D25", g), a();
      };
    });
  }
  initDataBase() {
    if (!window.indexedDB)
      return;
    let A = indexedDB.open(Es, Qs);
    return new Promise((e, i) => {
      A.onerror = function() {
        i();
      }, A.onupgradeneeded = function(t) {
        t.currentTarget.result.createObjectStore(
          $,
          { keyPath: "ssn" }
        );
      }, A.onsuccess = function(t) {
        console.log("onsuccess: create db success "), e(t.target.result);
      };
    });
  }
}
const vA = new cs(), oA = new ct();
class hs {
  constructor() {
  }
  static async checkUrl(A) {
    if (A && A.includes("json")) {
      const e = await this.loaderChunkFile(A);
      if (!e.includes("blob"))
        throw new Error("Unsupported file extension ");
      return e;
    }
    return A;
  }
  static async loaderChunkFile(A) {
    return new Promise(async (e, i) => {
      const { blob: t, version: s } = await vA.get(A);
      if (t) {
        const n = window.URL.createObjectURL(t);
        e(n);
      }
      await this.loaderMergeFile(A, s, t, e);
    });
  }
  static async loaderMergeFile(A, e, i, t) {
    const n = "https://d1ktb2pux2fae3.cloudfront.net" + "/template/";
    return new Promise((r, o) => {
      const a = new x();
      a.setResponseType("json"), a.load(A + "?=" + new Date().getTime(), async ({ name: g, total: C, version: E }) => {
        if (E === e && i)
          return;
        const B = [];
        for (let d = 0; d < C; d++) {
          const f = n + g + d;
          B.push(this.loaderChunkBold(f + "?=" + new Date().getTime()));
        }
        const Q = await Promise.all(B), l = new Blob(Q, { type: "application/octet-stream;charset=utf-8" }), h = window.URL.createObjectURL(l), c = !l || E !== e;
        t(h);
        const u = A.split("?")[0];
        await vA.put(u, l, E, c), r(h);
      });
    });
  }
  static loaderChunkBold(A) {
    return new Promise((e, i) => {
      const t = new x();
      t.setResponseType("arraybuffer"), t.load(A, (s) => {
        let n = new window.File([s], "zipFile", { type: "zip" });
        oA.loadAsync(n).then(function(r) {
          let o = r.files;
          for (let a in o)
            a && oA.file(a).async("arraybuffer").then((g) => {
              let C = new Blob([g]);
              e(C);
            });
        }).catch((r) => {
          i(r);
        });
      });
    });
  }
  static loaderBold(A) {
    return new Promise((e, i) => {
      const t = new x();
      t.setResponseType("arraybuffer"), t.load(A, (s) => {
        console.log(s.data, "resp");
        let n = new window.File([s], "zipFile", { type: "zip" });
        oA.loadAsync(n).then(function(r) {
          let o = r.files;
          console.log(o, "fileList");
          for (let a in o)
            console.log(a, "key"), a && oA.file(a).async("arraybuffer").then((g) => {
              let C = new Blob([g]), E = window.URL.createObjectURL(C);
              e(E);
            });
        }).catch((r) => {
          i(r);
        });
      });
    });
  }
}
const ls = lt(), us = new _().setTranscoderPath("/basis/").detectSupport(ls), ds = /* @__PURE__ */ new Map(), BA = new wt(), le = new $t();
ut((I) => le.setDecoderPath(I));
BA.setDRACOLoader(le);
BA.setKTX2Loader(us);
const ms = BA, ys = async (I, A) => {
  let e = "";
  if (I && I.includes("json") && (e = await hs.loaderChunkFile(I), !e.includes("blob")))
    throw new Error("Unsupported file extension ");
  const [i, t] = await Cs(
    ds,
    I,
    () => new Promise((s, n) => {
      const r = I.startsWith("https://unpkg.com/");
      r && se(), BA.load(
        e || I,
        (o) => {
          var C;
          const a = [];
          let g = !0;
          for (const E of o.scenes) {
            E.position.set(0, 0, 0), E.translateY(0), E.traverse((B) => {
              B instanceof ft ? a.push(B) : g && B instanceof ee && (g = !1), B.isMesh && (B.material.map && (B.material.map.encoding = X, B.material.map.anisotropy = 16), B.material.emissiveMap && (B.material.emissiveMap.encoding = X, B.material.emissiveMap = B.material.map), (B.material.map || B.material.emissiveMap) && (B.material.needsUpdate = !0), B.material.envMapIntensity = 1), B.castShadow = !0, B.receiveShadow = !0;
            });
            for (const B of a)
              (C = B.parent) == null || C.remove(B);
            r && ne(), s([o, g]);
          }
        },
        dt(I),
        n
      );
    })
  );
  return A ? ht(i.scene, t, i.animations) : i.scene;
};
export {
  ys as default,
  ms as gltfLoader
};
