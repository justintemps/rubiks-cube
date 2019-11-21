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
  let mouseX = evt.clientX;
  let mouseY = evt.clientY;

  // If it moves by
  function selectLayer() {
    console.log({
      mouseX,
      mouseY
    });
    // console.log(obj);
  }

  function onMouseMove(e) {
    evt.preventDefault();
    let deltaX = e.clientX - mouseX;
    // let deltaY = e.clientY - mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    turnObj(deltaX);
  }

  function onMouseUp(e) {
    e.preventDefault();
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    callback();
  }

  function turnObj(delta) {
    selectLayer();
    const step = obj.rotation[axis];
    const limit = THREE.Math.degToRad(90);
    if (Math.abs(step) < limit) {
      return (obj.rotation[axis] += THREE.Math.degToRad(delta));
    }
    return (obj.rotation[axis] = Math.sign(step) * THREE.Math.degToRad(90));
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

      const selectedLayer = 'x';

      const selectedCubeLayer = Math.round(
        selectedCube.position[selectedLayer]
      );
      const group = new THREE.Group();
      const selection = rubiks.children.filter(
        cube => selectedCubeLayer === Math.round(cube.position[selectedLayer])
      );
      selection.forEach(cube => group.add(cube));
      rubiks.add(group);

      turn(group, e, selectedLayer, () => {
        selection.forEach(cube => rubiks.attach(cube));
        rubiks.remove(group);
      });
    }
  };

  renderer.domElement.addEventListener('mousedown', handleRotate, false);
}
