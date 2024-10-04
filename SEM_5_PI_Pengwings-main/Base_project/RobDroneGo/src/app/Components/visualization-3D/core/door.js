import * as THREE from "three";
import { merge } from "./merge.js";
import { BoxHelper } from "./helpers.js";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";

/*
* parameters = {
*  url: <Door resource URL>,
* scale: <Door scale>
* row: <Row number>,
* column: <Column number>,
* }
 */

export default class Door extends THREE.Group {
  constructor(parameters) {
    super();
    merge(this, parameters);

    this.loaded = false;

    this.onLoad = function (description) {
      this.add(description.scene);

      // Get the object's axis-aligned bounding box (AABB) in 3D space
      const aabb = new THREE.Box3();
      aabb.setFromObject(this); // This function may result in a larger box than strictly necessary: https://threejs.org/docs/#api/en/math/Box3.setFromObject

      // Compute the object size
      this.size = new THREE.Vector3();
      aabb.getSize(this.size);

      this.size.multiply(this.scale);

      // Compute the object's half size (required by collision detection method OBB/AABB) and radius (required by collision detection method BC/AABB)
      this.halfSize = this.size.clone().divideScalar(2.0);
      this.radius = (this.halfSize.x + this.halfSize.z) / 2.0;

      // Update bounding box
      // Create the collision helpers, and set their positions and sizes
      this.boxHelper = new BoxHelper(new THREE.Color({color: 0xFFFFFF})); // Oriented bounding box
      this.boxHelper.position.set((0.0 - this.door.worldPosition.x) / this.door.worldScale.x, (this.halfSize.y - this.door.worldPosition.y) / this.door.worldScale.y, (0.0 - this.door.worldPosition.z) / this.door.worldScale.z);
      this.boxHelper.scale.set(this.halfSize.x / this.door.worldScale.x, this.halfSize.y / this.door.worldScale.y, this.halfSize.z / this.door.worldScale.z);

      let boundingBox = new THREE.Box3();
      boundingBox.setFromObject(this);
      console.log(boundingBox);

      // Turn on shadows for the door
      this.setShadow();

      this.loaded = true;
    };

    const onProgress = function (url, xhr) {
      console.log("Resource '" + url + "' " + (100.0 * xhr.loaded / xhr.total).toFixed(0) + "% loaded.");
    };

    const onError = function (url, error) {
      console.error("Error loading resource '" + url + "' (" + error + ").");
    };

  }

  setShadow() {
    this.traverseVisible(child => { // Modifying the scene graph inside the callback is discouraged: https://threejs.org/docs/index.html?q=object3d#api/en/core/Object3D.traverseVisible
      if (child instanceof THREE.Object3D) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  collision(box){
    return (this.boundingBox.intersectsBox(box));
  }


}
