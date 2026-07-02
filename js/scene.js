/* Saturday Services — 3D hero centerpiece.
   Pipeline documented in docs/3d-pipeline.md: SVG → SVGLoader → ExtrudeGeometry → metal + accent lights. */
import * as THREE from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';

const ACCENT = 0x00f0ff;

export async function initScene(container) {
  if (!window.WebGLRenderingContext) throw new Error('no webgl');

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    38, container.clientWidth / container.clientHeight, 1, 4000
  );
  camera.position.set(0, 0, 560);

  /* ---- lights: key + cool rim (accent) + warm fill, per saturday-core material physics ---- */
  scene.add(new THREE.AmbientLight(0xffffff, 0.28));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(220, 260, 420);
  scene.add(key);
  const rim = new THREE.PointLight(ACCENT, 60000, 0, 2);
  rim.position.set(-300, 140, 220);
  scene.add(rim);
  const warm = new THREE.PointLight(0xb87333, 22000, 0, 2);
  warm.position.set(260, -200, 160);
  scene.add(warm);

  /* ---- glow backdrop sprite ---- */
  scene.add(makeGlowSprite());

  /* ---- particle field ---- */
  const particles = makeParticles();
  scene.add(particles);

  /* ---- the mark: SVG → extruded metal ---- */
  const group = await loadMark('assets/logos/services-mono.svg');
  scene.add(group);

  /* ---- animation: slow idle spin + cursor parallax ---- */
  let targetRX = 0, targetRY = 0, spin = 0;
  window.addEventListener('pointermove', (e) => {
    targetRY = (e.clientX / window.innerWidth - 0.5) * 0.5;
    targetRX = (e.clientY / window.innerHeight - 0.5) * 0.35;
  });

  const clock = new THREE.Clock();
  let running = true;
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) { clock.getDelta(); tick(); }
  });

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  function tick() {
    if (!running) return;
    requestAnimationFrame(tick);
    const dt = clock.getDelta();
    spin += dt * 0.22;
    group.rotation.y += ((spin * 0.6 + targetRY) - group.rotation.y) * 0.06;
    group.rotation.x += (targetRX - group.rotation.x) * 0.06;
    particles.rotation.y -= dt * 0.02;
    renderer.render(scene, camera);
  }
  tick();

  container.classList.add('scene-ready');
}

async function loadMark(url) {
  const svg = await new SVGLoader().loadAsync(url);
  const material = new THREE.MeshStandardMaterial({
    color: 0xd8dee2, metalness: 0.88, roughness: 0.3,
  });
  const edgeMaterial = new THREE.MeshStandardMaterial({
    color: 0xaeb6bb, metalness: 0.92, roughness: 0.24,
  });

  const group = new THREE.Group();
  for (const path of svg.paths) {
    for (const shape of SVGLoader.createShapes(path)) {
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: 44, bevelEnabled: true,
        bevelThickness: 6, bevelSize: 4, bevelSegments: 3, curveSegments: 24,
      });
      group.add(new THREE.Mesh(geo, [material, edgeMaterial]));
    }
  }

  /* SVG space is y-down: flip, then center on origin and scale to stage */
  group.scale.set(1, -1, 1);
  const box = new THREE.Box3().setFromObject(group);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const wrapper = new THREE.Group();
  wrapper.add(group);
  group.position.sub(center);
  const s = 300 / Math.max(size.x, size.y);
  wrapper.scale.setScalar(s);
  return wrapper;
}

function makeParticles() {
  const N = 260;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const r = 260 + Math.random() * 320;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
    pos[i * 3 + 2] = r * Math.cos(phi) * 0.5 - 100;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    color: 0x9fdfe8, size: 2.4, transparent: true, opacity: 0.5,
    depthWrite: false, blending: THREE.AdditiveBlending,
  });
  return new THREE.Points(geo, mat);
}

function makeGlowSprite() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, 'rgba(0,240,255,0.30)');
  g.addColorStop(0.5, 'rgba(0,240,255,0.08)');
  g.addColorStop(1, 'rgba(0,240,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(c),
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  sprite.scale.set(760, 760, 1);
  sprite.position.z = -140;
  return sprite;
}
