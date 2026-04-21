import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function VortexSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 1, 100);
    camera.position.z = 5;
    camera.position.y = -4;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

    const ctrls = new OrbitControls(camera, renderer.domElement);
    ctrls.enableDamping = false;
    ctrls.enableZoom = false;
    ctrls.enablePan = false;
    ctrls.enableRotate = false;

    function createTextTexture() {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
      canvas.width = 1024;
      canvas.height = 1024;
      context.imageSmoothingEnabled = true;

      context.fillStyle = "black";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "white";
      context.font = "bold 45px Arial, sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";

      const text = "OSWAP";
      const textMetrics = context.measureText(text);
      const textWidth = textMetrics.width;
      const textHeight = 89;

      const horizontalSpacing = textWidth * 0.4;
      const verticalSpacing = textHeight * 2.3;

      for (let x = horizontalSpacing / 2; x < canvas.width; x += horizontalSpacing) {
        for (let y = verticalSpacing / 2; y < canvas.height; y += verticalSpacing) {
          context.save();
          context.translate(x, y);
          context.rotate(Math.PI / 2);
          context.fillText(text, 0, 0);
          context.restore();
        }
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(3, 3);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;
      return texture;
    }

    const torusGeo = new THREE.TorusGeometry(5, 3.8, 60, 100);
    const textTexture = createTextTexture();
    const torusMat = new THREE.MeshStandardMaterial({ map: textTexture });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI * 0.01;
    torus.position.set(0, 0, 0);
    scene.add(torus);

    const spotLight = new THREE.SpotLight("#ffffff", 100);
    spotLight.angle = Math.PI / 4.3;
    spotLight.penumbra = 0.25;
    spotLight.position.set(0, -0.2, 9);
    scene.add(spotLight);

    let frameId: number;
    function animate(t = 0) {
      frameId = requestAnimationFrame(animate);
      torus.rotation.z = t * 0.0002;
      const speed = 0.00004;
      textTexture.offset.y = -(t * speed) % 1;
      renderer.render(scene, camera);
      ctrls.update();
    }
    animate();

    const handleResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      ctrls.dispose();
      renderer.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      textTexture.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="w-full h-[600px] bg-black overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />
    </section>
  );
}
