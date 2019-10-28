import * as THREE from 'three';
import Stats from 'stats-js';
import TrackballControls from 'three-trackballcontrols';

/**
 * Utility functions for three.js kindly borrowed from
 * https://github.com/josdirksen/learning-threejs-third
 */

/**
 * Initialize the statistics domelement
 *
 * @param {Number} type 0: fps, 1: ms, 2: mb, 3+: custom
 * @returns stats javascript object
 */
export function initStats(type) {
  const panelType =
    // eslint-disable-next-line radix
    typeof type !== 'undefined' && type && !isNaN(type) ? parseInt(type) : 0;
  const stats = new Stats();

  stats.showPanel(panelType); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);

  return stats;
}

/**
 * Initialize a simple default renderer and binds it to the "webgl-output" dom
 * element.
 *
 * @param additionalProperties Additional properties to pass into the renderer
 */
export function initRenderer(additionalProperties) {
  const props =
    typeof additionalProperties !== 'undefined' && additionalProperties
      ? additionalProperties
      : {};
  const renderer = new THREE.WebGLRenderer(props);
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.getElementById('webgl-output').appendChild(renderer.domElement);

  return renderer;
}

/**
 * Initialize a simple camera and point it at the center of a scene
 *
 * @param {THREE.Vector3} [initialPosition]
 */
export function initCamera(initialPosition) {
  const position =
    initialPosition !== undefined
      ? initialPosition
      : new THREE.Vector3(-30, 40, 30);

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.copy(position);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  return camera;
}
