import { M as _, aT as S, a, g as h, V as f, i as b, a1 as m, aU as u, aV as D, aW as B, aX as T, aY as C } from "./index.60bcd3b0.mjs";
import "react";
import "react-dom";
class W extends _ {
  constructor(e, r, i, t, {
    mixBlur: o = 0,
    mixStrength: c = 1,
    resolution: d = 256,
    blur: s = [0, 0],
    minDepthThreshold: p = 0.9,
    maxDepthThreshold: x = 1,
    depthScale: n = 0,
    depthToBlurRatioBias: v = 0.25,
    mirror: g = 0,
    distortion: P = 1,
    mixContrast: M = 1,
    distortionMap: l,
    reflectorOffset: w = 0,
    planeNormal: U = new a(0, 0, 1)
  } = {}) {
    super(), this.gl = e, this.camera = r, this.scene = i, this.parent = t, this.hasBlur = s[0] + s[1] > 0, this.reflectorPlane = new S(), this.normal = new a(), this.reflectorWorldPosition = new a(), this.cameraWorldPosition = new a(), this.rotationMatrix = new h(), this.lookAtPosition = new a(0, -1, 0), this.clipPlane = new f(), this.view = new a(), this.target = new a(), this.q = new f(), this.textureMatrix = new h(), this.virtualCamera = new b(), this.reflectorOffset = w, this.planeNormal = U, this.setupBuffers(d, s), this.reflectorProps = {
      mirror: g,
      textureMatrix: this.textureMatrix,
      mixBlur: o,
      tDiffuse: this.fbo1.texture,
      tDepth: this.fbo1.depthTexture,
      tDiffuseBlur: this.fbo2.texture,
      hasBlur: this.hasBlur,
      mixStrength: c,
      minDepthThreshold: p,
      maxDepthThreshold: x,
      depthScale: n,
      depthToBlurRatioBias: v,
      distortion: P,
      distortionMap: l,
      mixContrast: M,
      "defines-USE_BLUR": this.hasBlur ? "" : void 0,
      "defines-USE_DEPTH": n > 0 ? "" : void 0,
      "defines-USE_DISTORTION": l ? "" : void 0
    };
  }
  setupBuffers(e, r) {
    const i = {
      minFilter: m,
      magFilter: m,
      encoding: this.gl.outputEncoding
    }, t = new u(e, e, i);
    t.depthBuffer = !0, t.depthTexture = new D(e, e), t.depthTexture.format = B, t.depthTexture.type = T;
    const o = new u(e, e, i);
    this.fbo1 = t, this.fbo2 = o, this.kawaseBlurPass = new C(), this.kawaseBlurPass.setSize(r[0], r[1]);
  }
  beforeRender() {
    if (!this.parent || (this.reflectorWorldPosition.setFromMatrixPosition(
      this.parent.matrixWorld
    ), this.cameraWorldPosition.setFromMatrixPosition(this.camera.matrixWorld), this.rotationMatrix.extractRotation(this.parent.matrixWorld), this.normal.copy(this.planeNormal), this.normal.applyMatrix4(this.rotationMatrix), this.reflectorWorldPosition.addScaledVector(
      this.normal,
      this.reflectorOffset
    ), this.view.subVectors(
      this.reflectorWorldPosition,
      this.cameraWorldPosition
    ), this.view.dot(this.normal) > 0))
      return;
    this.view.reflect(this.normal).negate(), this.view.add(this.reflectorWorldPosition), this.rotationMatrix.extractRotation(this.camera.matrixWorld), this.lookAtPosition.set(0, 0, -1), this.lookAtPosition.applyMatrix4(this.rotationMatrix), this.lookAtPosition.add(this.cameraWorldPosition), this.target.subVectors(this.reflectorWorldPosition, this.lookAtPosition), this.target.reflect(this.normal).negate(), this.target.add(this.reflectorWorldPosition), this.virtualCamera.position.copy(this.view), this.virtualCamera.up.set(0, 1, 0), this.virtualCamera.up.applyMatrix4(this.rotationMatrix), this.virtualCamera.up.reflect(this.normal), this.virtualCamera.lookAt(this.target), this.virtualCamera.far = this.camera.far, this.virtualCamera.updateMatrixWorld(), this.virtualCamera.projectionMatrix.copy(this.camera.projectionMatrix), this.textureMatrix.set(
      0.5,
      0,
      0,
      0.5,
      0,
      0.5,
      0,
      0.5,
      0,
      0,
      0.5,
      0.5,
      0,
      0,
      0,
      1
    ), this.textureMatrix.multiply(this.virtualCamera.projectionMatrix), this.textureMatrix.multiply(this.virtualCamera.matrixWorldInverse), this.textureMatrix.multiply(this.parent.matrixWorld), this.reflectorPlane.setFromNormalAndCoplanarPoint(
      this.normal,
      this.reflectorWorldPosition
    ), this.reflectorPlane.applyMatrix4(this.virtualCamera.matrixWorldInverse), this.clipPlane.set(
      this.reflectorPlane.normal.x,
      this.reflectorPlane.normal.y,
      this.reflectorPlane.normal.z,
      this.reflectorPlane.constant
    );
    const e = this.virtualCamera.projectionMatrix;
    this.q.x = (Math.sign(this.clipPlane.x) + e.elements[8]) / e.elements[0], this.q.y = (Math.sign(this.clipPlane.y) + e.elements[9]) / e.elements[5], this.q.z = -1, this.q.w = (1 + e.elements[10]) / e.elements[14], this.clipPlane.multiplyScalar(2 / this.clipPlane.dot(this.q)), e.elements[2] = this.clipPlane.x, e.elements[6] = this.clipPlane.y, e.elements[10] = this.clipPlane.z + 1, e.elements[14] = this.clipPlane.w;
  }
  update() {
    if (this.parent.material !== this)
      return;
    this.parent.visible = !1;
    const e = this.gl.xr.enabled, r = this.gl.shadowMap.autoUpdate;
    this.beforeRender(), this.gl.xr.enabled = !1, this.gl.shadowMap.autoUpdate = !1, this.gl.setRenderTarget(this.fbo1), this.gl.state.buffers.depth.setMask(!0), this.gl.autoClear || this.gl.clear(), this.gl.render(this.scene, this.virtualCamera), this.hasBlur && this.kawaseBlurPass.render(this.gl, this.fbo1, this.fbo2), this.gl.xr.enabled = e, this.gl.shadowMap.autoUpdate = r, this.parent.visible = !0, this.gl.setRenderTarget(null);
  }
  onBeforeCompile(e, ...r) {
    super.onBeforeCompile(e, ...r), this.defines === void 0 && (this.defines = {}), this.defines.USE_UV || (this.defines.USE_UV = ""), this.reflectorProps["defines-USE_BLUR"] !== void 0 && (this.defines.USE_BLUR = ""), this.reflectorProps["defines-USE_DEPTH"] !== void 0 && (this.defines.USE_DEPTH = ""), this.reflectorProps["defines-USE_DISTORTION"] !== void 0 && (this.defines.USE_DISTORTION = "");
    let i = this.reflectorProps;
    for (let t in i)
      e.uniforms[t] = {
        get value() {
          return i[t];
        }
      };
    e.vertexShader = `
              uniform mat4 textureMatrix;
              varying vec4 my_vUv;     
            ${e.vertexShader}`, e.vertexShader = e.vertexShader.replace(
      "#include <project_vertex>",
      `
            #include <project_vertex>
            my_vUv = textureMatrix * vec4( position, 1.0 );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            `
    ), e.fragmentShader = `
              uniform sampler2D tDiffuse;
              uniform sampler2D tDiffuseBlur;
              uniform sampler2D tDepth;
              uniform sampler2D distortionMap;
              uniform float distortion;
              uniform float cameraNear;
              uniform float cameraFar;
              uniform bool hasBlur;
              uniform float mixBlur;
              uniform float mirror;
              uniform float mixStrength;
              uniform float minDepthThreshold;
              uniform float maxDepthThreshold;
              uniform float mixContrast;
              uniform float depthScale;
              uniform float depthToBlurRatioBias;
              varying vec4 my_vUv;        
              ${e.fragmentShader}`, e.fragmentShader = e.fragmentShader.replace(
      "#include <emissivemap_fragment>",
      `
            #include <emissivemap_fragment>
          
            float distortionFactor = 0.0;
            #ifdef USE_DISTORTION
              distortionFactor = texture2D(distortionMap, vUv).r * distortion;
            #endif
      
            vec4 new_vUv = my_vUv;
            new_vUv.x += distortionFactor;
            new_vUv.y += distortionFactor;
      
            vec4 base = texture2DProj(tDiffuse, new_vUv);
            vec4 blur = texture2DProj(tDiffuseBlur, new_vUv);
            
            vec4 merge = base;
            
            #ifdef USE_NORMALMAP
              vec2 normal_uv = vec2(0.0);
              vec4 normalColor = texture2D(normalMap, vUv);
              vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );
              vec3 coord = new_vUv.xyz / new_vUv.w;
              normal_uv = coord.xy + coord.z * my_normal.xz * 0.05 * normalScale;
              vec4 base_normal = texture2D(tDiffuse, normal_uv);
              vec4 blur_normal = texture2D(tDiffuseBlur, normal_uv);
              merge = base_normal;
              blur = blur_normal;
            #endif
      
            float depthFactor = 0.0001;
            float blurFactor = 0.0;
      
            #ifdef USE_DEPTH
              vec4 depth = texture2DProj(tDepth, new_vUv);
              depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
              depthFactor *= depthScale;
              depthFactor = max(0.0001, min(1.0, depthFactor));
      
              #ifdef USE_BLUR
                blur = blur * min(1.0, depthFactor + depthToBlurRatioBias);
                merge = merge * min(1.0, depthFactor + 0.5);
              #else
                merge = merge * depthFactor;
              #endif
        
            #endif
      
            float reflectorRoughnessFactor = roughness;
            #ifdef USE_ROUGHNESSMAP
              vec4 reflectorTexelRoughness = texture2D( roughnessMap, vUv );
              
              reflectorRoughnessFactor *= reflectorTexelRoughness.g;
            #endif
            
            #ifdef USE_BLUR
              blurFactor = min(1.0, mixBlur * reflectorRoughnessFactor);
              merge = mix(merge, blur, blurFactor);
            #endif
      
            vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);
            newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;
            newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;
            newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;
            
            diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * mixStrength);
            `
    );
  }
}
export {
  W as default
};
