"use client";

import { useEffect, useRef } from "react";

/* Three.js floating photo scene for the hero section.
   Three spa-themed photo planes float with gentle bob + tilt,
   using a rounded-corner shader for a premium glassmorphism look. */

const PHOTO_SLOTS: { src: string; x: number; y: number; w: number; h: number }[] = [
  { src: "/images/detail-botanical.jpg", x: -2.6, y: 0.3, w: 1.6, h: 2.1 },
  { src: "/images/leaves-texture.jpg", x: 2.5, y: -0.2, w: 1.5, h: 2.0 },
  { src: "/images/detail-calm.jpg", x: -1.8, y: -1.4, w: 1.3, h: 1.7 },
];

const vertexShader = `
  out vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTex;
  uniform float uOpacity;
  uniform vec2 uResolution;
  in vec2 vUv;
  out vec4 fragColor;

  float roundedBoxSDF(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + vec2(r);
    return length(max(q, 0.0)) - r;
  }

  void main() {
    vec4 texColor = texture(uTex, vUv);

    vec2 p = (vUv - 0.5) * uResolution;
    float dist = roundedBoxSDF(p, uResolution * 0.5, 18.0);
    float alpha = 1.0 - smoothstep(-1.0, 1.0, dist);

    vec3 color = texColor.rgb;
    color = mix(color, color * 1.06, smoothstep(0.0, 0.5, vUv.y));

    fragColor = vec4(color, alpha * uOpacity);
  }
`;

function loadTexture(
  THREE: typeof import("three"),
  src: string
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export default function HeroFloatingScene({ active }: { active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const container = containerRef.current;
      if (!container) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.set(0, 0, 6);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const meshes: any[] = [];
      const textures = await Promise.all(
        PHOTO_SLOTS.map((s) => loadTexture(THREE, s.src))
      );
      if (disposed) return;

      PHOTO_SLOTS.forEach((slot, i) => {
        const tex = new THREE.Texture(textures[i]);
        tex.needsUpdate = true;

        const aspect = slot.w / slot.h;
        const material = new THREE.ShaderMaterial({
          glslVersion: THREE.GLSL3,
          vertexShader,
          fragmentShader,
          uniforms: {
            uTex: { value: tex },
            uOpacity: { value: 0 },
            uResolution: { value: new THREE.Vector2(slot.w * 100, slot.h * 100) },
          },
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
        });

        const geo = new THREE.PlaneGeometry(slot.w, slot.h);
        const mesh = new THREE.Mesh(geo, material);
        mesh.position.set(slot.x, slot.y, -i * 0.3);
        mesh.userData = { baseY: slot.y, baseRotZ: 0, idx: i };
        group.add(mesh);
        meshes.push(mesh);
      });

      const resize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();

        const isMobile = w < 768;
        group.scale.setScalar(isMobile ? 0.55 : 1);
        meshes.forEach((m) => {
          m.visible = !isMobile;
        });
      };
      resize();
      window.addEventListener("resize", resize);

      let rafId = 0;
      const clock = new THREE.Clock();

      const animate = () => {
        if (disposed) return;
        const t = clock.getElapsedTime();

        meshes.forEach((mesh) => {
          const { baseY, idx } = mesh.userData;
          const phase = idx * 2.1;
          mesh.position.y = baseY + Math.sin(t * 0.5 + phase) * 0.12;
          mesh.rotation.z = Math.sin(t * 0.35 + phase) * 0.025;
          mesh.rotation.y = Math.sin(t * 0.25 + phase * 0.7) * 0.04;

          const target = active ? 0.7 : 0;
          const u = mesh.material.uniforms.uOpacity;
          u.value += (target - u.value) * 0.03;
        });

        group.rotation.y = Math.sin(t * 0.12) * 0.03;

        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      };
      animate();

      cleanup = () => {
        disposed = true;
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", resize);
        meshes.forEach((m) => {
          m.geometry.dispose();
          (m.material as unknown as { dispose: () => void }).dispose();
        });
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[5] pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
}
