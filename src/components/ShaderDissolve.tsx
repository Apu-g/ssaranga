"use client";

import { useEffect, useRef } from "react";
import { DISSOLVE_MS } from "@/lib/intro";

/* WebGL noise-dissolve overlay adapted from Loader-main:
   a pixelated Perlin-noise plane eats itself radially from the center with a
   glowing gold edge, revealing the page beneath. Re-tinted to the SsaRanga
   palette (deep-forest base, gold glow). */

const vertexShader = [
  "varying vec2 vUv;",
  "void main() {",
  "  vUv = uv;",
  "  gl_Position = vec4(position, 1.0);",
  "}",
].join("\n");

const fragmentShader = [
  "precision highp float;",
  "",
  "uniform float uTransition;",
  "uniform vec2 uResolution;",
  "uniform float uTime;",
  "uniform vec3 uBase;",
  "uniform vec3 uBorderColor;",
  "varying vec2 vUv;",
  "",
  "vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}",
  "vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}",
  "vec3 perlinFade(vec3 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}",
  "",
  "float cnoise(vec3 P){",
  "  vec3 Pi0 = floor(P);",
  "  vec3 Pi1 = Pi0 + vec3(1.0);",
  "  Pi0 = mod(Pi0, 289.0);",
  "  Pi1 = mod(Pi1, 289.0);",
  "  vec3 Pf0 = fract(P);",
  "  vec3 Pf1 = Pf0 - vec3(1.0);",
  "  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);",
  "  vec4 iy = vec4(Pi0.yy, Pi1.yy);",
  "  vec4 iz0 = Pi0.zzzz;",
  "  vec4 iz1 = Pi0.zzzz + 1.0;",
  "",
  "  vec4 ixy = permute(permute(ix) + iy);",
  "  vec4 ixy0 = permute(ixy + iz0);",
  "  vec4 ixy1 = permute(ixy + iz1);",
  "",
  "  vec4 gx0 = ixy0 / 7.0;",
  "  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;",
  "  gx0 = fract(gx0);",
  "  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);",
  "  vec4 sz0 = step(gz0, vec4(0.0));",
  "  gx0 -= sz0 * (step(0.0, gx0) - 0.5);",
  "  gy0 -= sz0 * (step(0.0, gy0) - 0.5);",
  "",
  "  vec4 gx1 = ixy1 / 7.0;",
  "  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;",
  "  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);",
  "  vec4 sz1 = step(gz1, vec4(0.0));",
  "  gx1 -= sz1 * (step(0.0, gx1) - 0.5);",
  "  gy1 -= sz1 * (step(0.0, gy1) - 0.5);",
  "",
  "  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);",
  "  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);",
  "  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);",
  "  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);",
  "  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);",
  "  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);",
  "  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);",
  "  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);",
  "",
  "  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000), dot(g100,g100), dot(g010,g010), dot(g110,g110)));",
  "  g000 *= norm0.x; g100 *= norm0.y; g010 *= norm0.z; g110 *= norm0.w;",
  "  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001), dot(g101,g101), dot(g011,g011), dot(g111,g111)));",
  "  g001 *= norm1.x; g101 *= norm1.y; g011 *= norm1.z; g111 *= norm1.w;",
  "",
  "  float n000 = dot(g000, Pf0);",
  "  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));",
  "  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));",
  "  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));",
  "  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));",
  "  float n101 = dot(g101, vec3(Pf1.x, Pf0.yz));",
  "  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));",
  "  float n111 = dot(g111, Pf1);",
  "",
  "  vec3 fade_xyz = perlinFade(Pf0);",
  "  float n_z = mix(mix(n000, n100, fade_xyz.x), mix(n010, n110, fade_xyz.x), fade_xyz.y);",
  "  float n_dz = mix(mix(n001, n101, fade_xyz.x), mix(n011, n111, fade_xyz.x), fade_xyz.y);",
  "  return 2.2 * mix(n_z, n_dz, fade_xyz.z);",
  "}",
  "",
  "void main(){",
  "  float pixelSize = 10.0;",
  "  vec2 grid = uResolution / pixelSize;",
  "  vec2 pixelatedUv = floor(vUv * grid) / grid;",
  "",
  "  float aspect = uResolution.x / uResolution.y;",
  "  vec2 correctedUv = (pixelatedUv - 0.5) * vec2(aspect, 1.0) + 0.5;",
  "  float maxDistance = length(vec2(aspect, 1.0)) * 0.5;",
  "",
  "  vec2 displacedUv = correctedUv + cnoise(vec3(correctedUv * 5.0, uTime * 0.1)) * 0.35;",
  "  float strength = cnoise(vec3(displacedUv * 5.0, uTime * 0.2));",
  "",
  "  float d = length(correctedUv - 0.5);",
  "  float normalizedDistance = d / maxDistance;",
  "",
  "  float radialGradient = normalizedDistance * 12.5 + (1.0 - uTransition) * 2.0 - 15.0 * uTransition;",
  "",
  "  float rawStrength = strength * 0.6 + radialGradient;",
  "  strength = clamp(rawStrength, 0.0, 1.0);",
  "",
  "  float edge = smoothstep(0.0, 0.7, rawStrength) * smoothstep(2.5, 0.7, rawStrength);",
  "  edge *= min(uTransition * 5.0, 1.0);",
  "",
  "  vec3 deepTone = uBase * 0.55;",
  "  vec3 richGlowingColor = uBorderColor * 1.5;",
  "  vec3 edgeColor = mix(deepTone, richGlowingColor, sin(uTime * 1.5) * 0.5 + 0.5);",
  "",
  "  vec3 planeColor = mix(uBase, edgeColor * 6.5, edge);",
  "  float finalAlpha = max(strength, edge);",
  "",
  "  gl_FragColor = vec4(planeColor, finalAlpha);",
  "}",
].join("\n");

interface Props {
  active: boolean;
}

export default function ShaderDissolve({ active }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startRequestedRef = useRef(false);

  useEffect(() => {
    if (active) startRequestedRef.current = true;
  }, [active]);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [THREE, { gsap }] = await Promise.all([
        import("three"),
        import("gsap"),
      ]);
      const canvas = canvasRef.current;
      if (disposed || !canvas) return;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      // Deep-forest base (#0B2B26) and gold glow (#D9A94C)
      const uniforms = {
        uTransition: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uTime: { value: 0 },
        uBase: { value: new THREE.Color("#0B2B26") },
        uBorderColor: { value: new THREE.Color("#D9A94C") },
      };

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthWrite: false,
        depthTest: false,
      });

      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(mesh);

      const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);

      const clock = new THREE.Clock();
      let rafId = 0;
      let dissolveStarted = false;

      const tick = () => {
        if (disposed) return;
        uniforms.uTime.value = clock.getElapsedTime();

        if (
          startRequestedRef.current &&
          !dissolveStarted
        ) {
          dissolveStarted = true;
          gsap.to(uniforms.uTransition, {
            value: 1,
            duration: DISSOLVE_MS / 1000,
            ease: "power2.inOut",
          });
        }

        try {
          renderer.render(scene, camera);
        } catch {
          return;
        }
        rafId = requestAnimationFrame(tick);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", handleResize);
        mesh.geometry.dispose();
        material.dispose();
        renderer.dispose();
      };

      // If `active` was set while modules were still loading, the tick loop
      // picks it up on its next frame via startRequestedRef.
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
