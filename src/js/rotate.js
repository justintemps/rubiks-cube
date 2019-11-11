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

/**
 * Initialize Rubiks cube rotation
 *
 * @param {THREE.WebGLRenderer}
 * @param {THREE.Raycaster}
 */
export default function initRotate(renderer, scene, camera) {
  const rayCaster = RayCaster(scene, camera);
  const handleRotate = e => {
    const intersects = rayCaster(e);
    if (intersects.length > 0) {
      rotate(intersects[0].object.parent, e);
    }
  };
  return renderer.domElement.addEventListener('mousedown', handleRotate, false);
}
