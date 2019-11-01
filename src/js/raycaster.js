import * as THREE from 'three';

const raycaster = new THREE.Raycaster();

export default (scene, camera) => e => {
  // Sets the mouse position where they center of the screen is the origin
  const mouse = {};
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  // Set the picking ray from the camera position and mouse coordinates
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);
  return intersects;
};
