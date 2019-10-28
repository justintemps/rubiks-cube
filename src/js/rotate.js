/**
 * Takes a THREE object and returns a closure
 * that takes a canvas elements and applies
 * listeners that will rotate the object on click
 * @param - three.js object
 *
 * Code inspired from this blast from the past
 * https://stackoverflow.com/questions/19588602/three-js-rotate-object-on-mouse-down-and-move
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
  }

  function rotateScene(deltaX, deltaY) {
    scene.rotation.y += deltaX / 100;
    scene.rotation.x += deltaY / 100;
  }

  /**
   * Closure applies listeners to canvas element
   * @param canvas element
   */
  return canvas => {
    canvas.addEventListener('mousemove', e => onMouseMove(e), false);
    canvas.addEventListener('mousedown', e => onMouseDown(e), false);
    canvas.addEventListener('mouseup', e => onMouseUp(e), false);
  };
}
