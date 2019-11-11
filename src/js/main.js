import * as THREE from 'three';
import dat from 'dat.gui';
import cubeFace from '/src/assets/images/rubiks-face.png';
import initRotate from '/src/js/rotate';
import Turn from '/src/js/turn';
// import RayCaster from '/src/js/raycaster';

import { initStats, initRenderer, initCamera } from './utils';

export default function() {
  const stats = initStats();

  // Set up renderer
  const renderer = initRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);

  // Set up camera
  const camera = initCamera();
  camera.position.set(0, 0, 53);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // Set up scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);

  // Set up Axes Helper
  // const axesHelper = new THREE.AxesHelper(100);
  // scene.add(axesHelper);

  // Set up lights
  const ambientLight = new THREE.AmbientLight(0x62eb1, 2.6);
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.copy(camera.position);
  directionalLight.intensity = 3.5;
  scene.add(ambientLight);
  scene.add(directionalLight);

  // Load the texture, when it's done:
  // 1. Build our rubiks cube
  // 2. Add it to the scene
  // 3. Create our turn function
  let materials, rubiks, turn;
  const loader = new THREE.TextureLoader();
  loader.setCrossOrigin('');

  loader.load(cubeFace, textureCube => {
    const colors = [0x009b48, 0xffffff, 0xb71234, 0xffd500, 0x0046ad, 0xff5800];

    materials = colors.map(
      color =>
        new THREE.MeshLambertMaterial({
          color,
          side: THREE.FrontSide,
          map: textureCube
        })
    );

    rubiks = new THREE.Group();

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          // const cube = {};
          const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
          const cube = new THREE.Mesh(cubeGeometry, materials);
          cube.position.set(x * 3 - 3, y * 3 - 3, z * 3 - 3);
          rubiks.add(cube);
        }
      }
    }

    rubiks.scale.copy(new THREE.Vector3(2, 2, 2));
    rubiks.rotation.set(0.75, 0.75, 0);
    rubiks.position.set(0, 3, 0);
    scene.add(rubiks);

    turn = Turn(rubiks);
    initRotate(renderer, scene, camera);
  });

  const controls = {
    turnX0: () => turn('x', 0),
    turnX1: () => turn('x', 1),
    turnX2: () => turn('x', 2),
    turnY0: () => turn('y', 0),
    turnY1: () => turn('y', 1),
    turnY2: () => turn('y', 2),
    turnZ0: () => turn('z', 0),
    turnZ1: () => turn('z', 1),
    turnZ2: () => turn('z', 2)
  };

  const gui = new dat.GUI();
  const guiFolder1 = gui.addFolder('Rubiks Controls');

  guiFolder1.add(controls, 'turnX0');
  guiFolder1.add(controls, 'turnX1');
  guiFolder1.add(controls, 'turnX2');
  guiFolder1.add(controls, 'turnY0');
  guiFolder1.add(controls, 'turnY1');
  guiFolder1.add(controls, 'turnY2');
  guiFolder1.add(controls, 'turnZ0');
  guiFolder1.add(controls, 'turnZ1');
  guiFolder1.add(controls, 'turnZ2');

  function render() {
    stats.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  render();
}
