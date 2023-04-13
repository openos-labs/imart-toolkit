import store, { createEffect } from "@lincode/reactivity";
import { PCFSoftShadowMap, WebGLRenderer } from "three";
import isChromium from "../api/utils/isChromium";
import isMobile from "../api/utils/isMobile";
import { getBackgroundColor } from "./useBackgroundColor";
import { getLogarithmicDepth } from "./useLogarithmicDepth";
import * as THREE from "three";

const [setRenderer, getRenderer] = store<WebGLRenderer | undefined>(undefined);
export { getRenderer };

createEffect(() => {
    const renderer = new WebGLRenderer({
        powerPreference: "high-performance",
        alpha: true,
        logarithmicDepthBuffer:
            isChromium && !isMobile ? getLogarithmicDepth() : false,
        antialias:true,
        precision:'highp'
    });
    // renderer.outputEncoding = THREE.sRGBEncoding;
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.physicallyCorrectLights = true;
        renderer.setPixelRatio( window.devicePixelRatio * 2);
        renderer.setSize(window.innerWidth,window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.8;
        renderer.outputEncoding = THREE.sRGBEncoding;
    setRenderer(renderer);

    return () => {
        renderer.dispose();
    };
}, [getBackgroundColor, getLogarithmicDepth]);
