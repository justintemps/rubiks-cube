/**
 * Takes a THREE object and returns a closure
 * that takes a canvas elements and applies
 * listeners that will rotate the object on click
 * @param - three.js object
 *
 * Code inspired from this blast from the past
 * https://stackoverflow.com/questions/19588602/three-js-rotate-object-on-mouse-down-and-move
 *
 * @TODO: this needs to be improved as the movement of the cube is quite erratic
 */
export default function(scene) {
  let mouseDown = false,
    mouseX = 0,
    mouseY = 0;

  function onMouseMove(evt) {
    if (!mouseDown) {
      return;
    }
    evt.preventDefault();
    let deltaX = evt.clientX - mouseX,
      deltaY = evt.clientY - mouseY;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
    rotateScene(deltaX, deltaY);
  }

  function onMouseDown(evt) {
    evt.preventDefault();
    mouseDown = true;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
  }

  function onMouseUp(evt) {
    evt.preventDefault();
    mouseDown = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('mousedown', onMouseDown);
  }

  function rotateScene(deltaX, deltaY) {
    scene.rotation.y += deltaX / 100;
    scene.rotation.x += deltaY / 100;
  }

  /**
   * Closure applies listeners to canvas element
   * @param canvas element
   */

  return () => {
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mouseup', onMouseUp, false);
  };
}
