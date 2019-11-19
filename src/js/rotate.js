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

function turn(obj, evt, axis = 'x', callback) {
  const direction = 1;
  let mouseX = evt.clientX;
  let mouseY = evt.clientY;
  let step = 0;

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
    callback();
  }

  function rotateObj(deltaX, deltaY) {
    if (obj.rotation[axis] < THREE.Math.degToRad(90)) {
      return (obj.rotation[axis] += THREE.Math.degToRad(deltaX));
    }
    return (obj.rotation[axis] = THREE.Math.degToRad(90));
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

      const selectedLayer = 'y';

      /* WORK IN PROGRESS YOU ARE HERE */
      // Put all of the cubes in the layer we want to turn
      // into a group so that we can turn them together
      const selectedCubeLayer = Math.round(
        selectedCube.position[selectedLayer]
      );
      const group = new THREE.Group();
      const selection = rubiks.children.filter(
        cube => selectedCubeLayer === Math.round(cube.position[selectedLayer])
      );
      selection.forEach(cube => group.add(cube));
      rubiks.add(group);

      // let step = 0;

      // const ROTATION_SPEED = 3;
      // const direction = 1;

      // Execute the turn in the given direcftion
      // function executeTurn() {
      //   if (step < THREE.Math.degToRad(90)) {
      //     step += THREE.Math.degToRad(ROTATION_SPEED);
      //     group.rotation["x"] = step * direction;
      //     requestAnimationFrame(executeTurn);
      //   } else {
      //     // When the turn is complete, reparent the cubes back to the main
      //     // rubiks cube
      //     selection.forEach(cube => rubiks.attach(cube));
      //     rubiks.remove(group);
      //   }
      // }
      // executeTurn();

      turn(group, e, selectedLayer, () => {
        selection.forEach(cube => rubiks.attach(cube));
        rubiks.remove(group);
      });
    }
  };

  renderer.domElement.addEventListener('mousedown', handleRotate, false);
}
