import * as THREE from 'three';
import { enableRotation } from '/src/js/controls';
import RayCaster from '/src/js/raycaster';

/**
 * Takes an Object3D and an event from a handler
 * and applies a rotation to the Object on mouse move
 *
 * @param {Object3D} - the object to rotate
 * @param {MouseEvent} - passed from the event handler
 */
function rotate(obj, evt) {
  let mouseX = evt.clientX;
  let mouseY = evt.clientY;

  function onMouseMove(e) {
    evt.preventDefault();
    // the object should rotate around the y axis when
    // the mouse moves across the x axis and around the y
    // axis when the mouse moves across the y axis
    let deltaY = e.clientX - mouseX;
    let deltaX = e.clientY - mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    rotateObj(deltaX, deltaY);
  }

  function onMouseUp(e) {
    e.preventDefault();
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  function rotateObj(deltaX, deltaY) {
    obj.rotation.x += deltaX / 100;
    obj.rotation.y += deltaY / 100;
  }

  window.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('mouseup', onMouseUp, false);
}

function turn(selectedCube, rubiks, evt) {
  let mouseX = evt.clientX;
  let mouseY = evt.clientY;
  let turnAxis = null;
  let group;
  let selection;

  function detectTurnAxis(deltaX, deltaY) {
    if (turnAxis === null) {
      turnAxis = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y';
      const selectedCubeLayer = Math.round(selectedCube.position[turnAxis]);
      group = new THREE.Group();
      selection = rubiks.children.filter(
        cube => selectedCubeLayer === Math.round(cube.position[turnAxis])
      );
      selection.forEach(cube => group.add(cube));
      rubiks.add(group);
    }
  }

  function onMouseMove(e) {
    evt.preventDefault();
    let deltaY = e.clientX - mouseX;
    let deltaX = e.clientY - mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    detectTurnAxis(deltaX, deltaY);
    executeTurn(deltaX);
  }

  function onMouseUp(e) {
    e.preventDefault();
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    selection.forEach(cube => rubiks.attach(cube));
    rubiks.remove(group);
  }

  function executeTurn(delta) {
    const step = group.rotation[turnAxis];
    const limit = THREE.Math.degToRad(90);
    if (Math.abs(step) < limit) {
      return (group.rotation[turnAxis] += THREE.Math.degToRad(delta));
    }
    return (group.rotation[turnAxis] = Math.sign(step) * THREE.Math.degToRad(90));
  }

  window.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('mouseup', onMouseUp, false);
}

/**
 * Initialize Rubiks cube rotation
 *
 * @param {THREE.WebGLRenderer}
 * @param {THREE.Raycaster}
 */
export default function initRotate(renderer, scene, camera) {
  const state = { isEnabled: false };
  enableRotation(state);
  const rayCaster = RayCaster(scene, camera);

  const handleRotate = e => {
    const intersects = rayCaster(e);
    if (intersects.length > 0) {
      const selectedCube = intersects[0].object;
      const rubiks = intersects[0].object.parent;

      if (state.isEnabled) {
        return rotate(rubiks, e);
      }

      // const selectedLayer = 'x';

      // const selectedCubeLayer = Math.round(
      //   selectedCube.position[selectedLayer]
      // );
      // const group = new THREE.Group();
      // const selection = rubiks.children.filter(
      //   cube => selectedCubeLayer === Math.round(cube.position[selectedLayer])
      // );
      // selection.forEach(cube => group.add(cube));
      // rubiks.add(group);

      // turn(group, e, selectedLayer, () => {
      //   selection.forEach(cube => rubiks.attach(cube));
      //   rubiks.remove(group);
      // });

      turn(selectedCube, rubiks, e);
    }
  };

  renderer.domElement.addEventListener('mousedown', handleRotate, false);
}
