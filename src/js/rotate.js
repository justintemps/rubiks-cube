/**
 * Takes an Object3D and an event from a handler
 * and applies a rotation to the Object on mouse move
 *
 * @param {Object3D} - the object to rotate
 * @param {MouseEvent} - passed from the event handler
 */
export default function(obj, evt) {
  let mouseX = evt.clientX;
  let mouseY = evt.clientY;

  function onMouseMove(e) {
    evt.preventDefault();
    let deltaX = e.clientX - mouseX;
    let deltaY = e.clientY - mouseY;
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
    obj.rotation.y += deltaX / 100;
    obj.rotation.x += deltaY / 100;
  }

  window.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('mouseup', onMouseUp, false);
}
