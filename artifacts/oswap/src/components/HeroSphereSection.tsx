import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uCircleSpacing;
  uniform float uLineWidth;
  uniform float uSpeed;
  uniform float uFadeEdge;
  uniform vec3 uCameraPosition;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec2 center = vec2(0.5, 0.5);
    vec2 uv = vUv;
    float dist = distance(uv, center);

    float animatedDist = dist - uTime * uSpeed;
    float circle = mod(animatedDist, uCircleSpacing);
    float distFromEdge = min(circle, uCircleSpacing - circle);

    float aaWidth = length(vec2(dFdx(animatedDist), dFdy(animatedDist))) * 2.0;
    float lineAlpha = 1.0 - smoothstep(uLineWidth - aaWidth, uLineWidth + aaWidth, distFromEdge);

    vec3 baseColor = mix(vec3(1.0), vec3(0.0), lineAlpha);

    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(uCameraPosition - vPosition);

    vec3 lightDir = normalize(vec3(5.0, 10.0, 5.0));
    float NdotL = max(dot(normal, lightDir), 0.0);

    vec3 diffuse = baseColor * (0.5 + 0.5 * NdotL);

    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 64.0);
    vec3 specular = vec3(1.0) * spec * 0.8;

    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.0);
    vec3 fresnelColor = vec3(1.0) * fresnel * 0.3;

    vec3 finalColor = diffuse + specular + fresnelColor;

    float edgeFade = smoothstep(0.5 - uFadeEdge, 0.5, dist);
    float alpha = 1.0 - edgeFade;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export function HeroSphereSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.set(-7, -5, 11);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xffffff, 1);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = Math.PI / 2.2;

    const floorGeometry = new THREE.CircleGeometry(20, 200);
    const floorMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0.0 },
        uCircleSpacing: { value: 0.06 },
        uLineWidth: { value: 0.02 },
        uSpeed: { value: 0.01 },
        uFadeEdge: { value: 0.2 },
        uCameraPosition: { value: new THREE.Vector3() },
      },
      side: THREE.DoubleSide,
      transparent: true,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1;
    floor.receiveShadow = true;
    scene.add(floor);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const loader = new OBJLoader();
    let loadedObject: THREE.Object3D | null = null;
    loader.load(
      "https://cdn.jsdelivr.net/gh/danielyl123/person/person.obj",
      (object) => {
        object.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.material = new THREE.MeshStandardMaterial({
              color: 0x888888,
              roughness: 0.7,
              metalness: 0.3,
            });
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        const box = new THREE.Box3().setFromObject(object);
        const center = new THREE.Vector3();
        box.getCenter(center);
        const size = new THREE.Vector3();
        box.getSize(size);

        object.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh && mesh.geometry) {
            mesh.geometry.translate(-center.x, -center.y, -center.z);
          }
        });

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4 / maxDim;
        object.scale.set(scale, scale, scale);

        object.position.set(0, 1, 0);
        object.rotation.y = Math.PI / 3;
        object.updateMatrixWorld(true);

        loadedObject = object;
        scene.add(object);

        controls.target.set(0, 0, 0);
        controls.update();
      }
    );

    let time = 0;
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.016;
      floorMaterial.uniforms.uTime.value = time;
      const cameraWorldPos = new THREE.Vector3();
      camera.getWorldPosition(cameraWorldPos);
      floorMaterial.uniforms.uCameraPosition.value.copy(cameraWorldPos);
      renderer.render(scene, camera);
      controls.update();
    };
    animate();

    const handleResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      renderer.setSize(nw, nh);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      floorGeometry.dispose();
      floorMaterial.dispose();
      if (loadedObject) {
        loadedObject.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.geometry?.dispose();
            const mat = mesh.material as THREE.Material | THREE.Material[];
            if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
            else mat?.dispose();
          }
        });
      }
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="relative w-full h-[700px] overflow-hidden bg-white">
      <div ref={containerRef} className="absolute inset-0" />
      <div className="absolute top-0 left-0 right-0 z-10 text-center pt-12 px-6 text-black">
        <h1 className="font-['Montserrat'] text-[64px] md:text-[100px] font-black uppercase tracking-wider flex justify-center mb-2 leading-none">
          <span className="font-black">O</span>
          <span className="font-semibold">SW</span>
          <span className="font-light">AP</span>
        </h1>
        <ul className="list-none flex justify-center gap-5 font-['Roboto'] text-base font-normal uppercase tracking-wider">
          <li><a href="#" className="text-black no-underline hover:opacity-60 transition-opacity">Trading</a></li>
          <li><a href="#" className="text-black no-underline hover:opacity-60 transition-opacity">Wallet</a></li>
          <li><a href="#" className="text-black no-underline hover:opacity-60 transition-opacity">Card</a></li>
          <li><a href="#" className="text-black no-underline hover:opacity-60 transition-opacity">News</a></li>
        </ul>
      </div>
    </section>
  );
}
