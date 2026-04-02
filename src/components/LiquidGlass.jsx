import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function LiquidGlass() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    let width = mount.clientWidth;
    let height = mount.clientHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // Shader material: Ultra premium watery glass
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(width, height) },
      },
      transparent: true,
      fragmentShader: `
        uniform float u_time;
        uniform vec2 u_resolution;

        // Simplex noise for subtle randomness
        float rand(vec2 co){
          return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;

          // Moving ripples X + Y
          float wave1 = sin(uv.y * 15.0 + u_time * 1.5) * 0.02;
          float wave2 = cos(uv.x * 20.0 + u_time * 1.2) * 0.015;

          // subtle noise for natural effect
          float n = rand(uv + u_time * 0.1) * 0.01;

          // combined ripple
          float alpha = 0.18 + wave1 + wave2 + n;
          alpha = clamp(alpha, 0.15, 0.3);

          // Glassy color with subtle blue tint
          vec3 color = vec3(1.0, 1.0, 1.05);

          gl_FragColor = vec4(color, alpha);
        }
      `,
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    let animationId;
    const animate = (time) => {
      material.uniforms.u_time.value = time * 0.001;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate(0);

    const handleResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      renderer.setSize(width, height);
      material.uniforms.u_resolution.value.set(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}