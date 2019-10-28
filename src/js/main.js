import * as THREE from 'three';
import dat from 'dat.gui';
import cubeFace from '/src/assets/images/rubiks-face.png';
import rotate from '/src/js/rotate';

import {
  initStats,
  initRenderer,
  initCamera,
  initTrackballControls
} from './utils';

export default function() {
  const stats = initStats();

  const renderer = initRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);

  const camera = initCamera();
  camera.position.set(-30, 35, 30);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);

  const controls = {
    rotationSpeed: 3,
    turnX0: () => turn('x', 0),
    turnX1: () => turn('x', 1),
    turnX2: () => turn('x', 2),
    turnY0: () => turn('y', 0),
    turnY1: () => turn('y', 1),
    turnY2: () => turn('y', 2),
    turnZ0: () => turn('z', 0),
    turnZ1: () => turn('z', 1),
    turnZ2: () => turn('z', 2),
    directionLightIntensity: 3.5,
    directionLightColor: 0xffffff,
    ambientLightIntensity: 2.6,
    ambientLightColor: 0x62eb1
  };

  const ambientLight = new THREE.AmbientLight(
    controls.ambientLightColor,
    controls.ambientLightIntensity
  );
  const directionalLight = new THREE.DirectionalLight(
    controls.directionLightColor
  );
  directionalLight.position.set(-30, 30, 30);
  directionalLight.intensity = controls.directionLightIntensity;

  scene.add(ambientLight);
  scene.add(directionalLight);

  const loader = new THREE.TextureLoader();
  loader.setCrossOrigin('');

  let materials, cubes, rubiks;

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
    scene.add(rubiks);
  });

  /**
   * Turns a given layer 90 degrees along an axis in a given direction
   * @param {string} - x, y, or z
   * @param {number} - 0, 1 or 2
   * @param {number} - 1 or -1, default is 1
   */
  function turn(axis = 'x', layer = 0, direction = 1) {
    // Put all of the cubes in the layer we want to turn
    // into a group so that we can turn them together
    const layers = [-3, 0, 3];
    const group = new THREE.Group();
    const selection = rubiks.children.filter(
      cube => layers[layer] === Math.round(cube.position[axis])
    );
    selection.forEach(cube => group.add(cube));
    rubiks.add(group);

    let step = 0;

    // Execute the turn in the given direcftion
    function executeTurn() {
      if (step < THREE.Math.degToRad(90)) {
        step += THREE.Math.degToRad(controls.rotationSpeed);
        group.rotation[axis] = step * direction;
        requestAnimationFrame(executeTurn);
        // When the turn is complete, reparent the cubes back to the main
        // rubiks cube
      } else {
        selection.forEach(cube => rubiks.attach(cube));
        rubiks.remove(group);
      }
    }

    executeTurn();
  }

  const gui = new dat.GUI();
  const guiFolder1 = gui.addFolder('Rubiks Controls');
  const guiFolder2 = gui.addFolder('Direction Light');
  const guiFolder3 = gui.addFolder('Ambient Light');

  guiFolder1.add(controls, 'rotationSpeed', 0, 3);
  guiFolder1.add(controls, 'turnX0');
  guiFolder1.add(controls, 'turnX1');
  guiFolder1.add(controls, 'turnX2');
  guiFolder1.add(controls, 'turnY0');
  guiFolder1.add(controls, 'turnY1');
  guiFolder1.add(controls, 'turnY2');
  guiFolder1.add(controls, 'turnZ0');
  guiFolder1.add(controls, 'turnZ1');
  guiFolder1.add(controls, 'turnZ2');

  guiFolder2.add(controls, 'directionLightIntensity', 0, 5).onChange(e => {
    directionalLight.intensity = e;
  });
  guiFolder2.addColor(controls, 'directionLightColor').onChange(e => {
    directionalLight.color = new THREE.Color(e);
  });

  guiFolder3.add(controls, 'ambientLightIntensity', 0, 5).onChange(e => {
    ambientLight.intensity = e;
  });
  guiFolder3
    .addColor(controls, 'ambientLightColor')
    .listen()
    .onChange(e => {
      ambientLight.color = new THREE.Color(e);
    });

  const trackballControls = initTrackballControls(camera, renderer);
  const clock = new THREE.Clock();

  function render() {
    stats.update();
    trackballControls.update(clock.getDelta());
    directionalLight.position.copy(camera.position);

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  rotate();
  render();
}
