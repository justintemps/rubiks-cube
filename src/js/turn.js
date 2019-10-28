import * as THREE from 'three';

const ROTATION_SPEED = 3;

/**
 * Takes a THREE.group() object and returns a function that will
 * execute turns on a layer of cubes a time.
 */
export default function(rubiks) {
  /**
   * Turns a given layer 90 degrees along an axis in a given direction
   *
   * @param {string} - x, y, or z
   * @param {number} - 0, 1 or 2
   * @param {number} - 1 or -1, default is 1
   */
  return (axis = 'x', layer = 0, direction = 1) => {
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
        step += THREE.Math.degToRad(ROTATION_SPEED);
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
  };
}
