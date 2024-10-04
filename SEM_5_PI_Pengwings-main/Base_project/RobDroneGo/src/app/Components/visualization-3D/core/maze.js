import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import {OBB} from "three/addons/math/OBB.js";
import {merge} from "./merge.js";
import Ground from "./ground.js";
import Wall from "./wall.js";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as TWEEN from "@tweenjs/tween.js";

/*
 * parameters = {
 *  url: String,
 *  designCredits: String,
 *  texturesCredits: String,
 *  scale: Vector3,
 *  helpersColor: Color
 * }
 */

export default class Maze extends THREE.Group {
    constructor(parameters) {
        super();
        merge(this, parameters);
        this.loaded = false;


        // Prepares the door related arrays
        this.doors = [];
        this.doorsRaycastMeshes = [];
        this.openedDoors = [];
        this.doorTips = [];

        // Prepares the elevator related arrays
        this.elevators = [];
        this.elevatorsRaycastMeshes = [];
        this.elevatorTips = [];

        // Prepares the rooms and elevators' names
        this.roomNames = [];

        this.passageLocations = [];
        this.passageDestinations = [];



      const objLoader = new OBJLoader();
        const glbLoader = new GLTFLoader();
        const mtlLoader = new MTLLoader();

        this.onLoad = function (description) {
            const normalMapTypes = [THREE.TangentSpaceNormalMap, THREE.ObjectSpaceNormalMap];
            const wrappingModes = [THREE.ClampToEdgeWrapping, THREE.RepeatWrapping, THREE.MirroredRepeatWrapping];
            const magnificationFilters = [THREE.NearestFilter, THREE.LinearFilter];
            const minificationFilters = [THREE.NearestFilter, THREE.NearestMipmapNearestFilter, THREE.NearestMipmapLinearFilter, THREE.LinearFilter, THREE.LinearMipmapNearestFilter, THREE.LinearMipmapLinearFilter];

            // Store the maze's size, map, elevator and its passage's location and destination
            this.size = description.maze.size;
            this.halfSize = { width: this.size.width / 2.0, depth: this.size.depth / 2.0 };
            this.map = description.maze.map;
            console.log("Passage location: " + description.maze.passageLocation);

            if (description.maze.passageLocation != undefined || description.maze.passageLocation != null) {
              for (const passageLocation of description.maze.passageLocation) {
                this.passageLocations.push(this.cellToCartesian(passageLocation));
              }
            }

            console.log(this.passageLocations);

            console.log(description.maze.passageDestination);

            if (description.maze.passageDestination != undefined || description.maze.passageDestination != null) {
              for (const destination of description.maze.passageDestination) {
                this.passageDestinations.push(destination);
                console.log("Passage destination added: " + destination);
              }
            }

            // Store the maze's room names (so that shift() can be used without affecting the original array)
            if (description.maze.roomNames != undefined || description.maze.roomNames != null) {
              for (const roomName of description.maze.roomNames) {
                this.roomNames.push(roomName);
              }
            }

            console.log("Passage destination: " + this.passageDestinations);
            this.elevatorFloors = description.maze.elevatorFloors;

            // Instanciates elevator location (in case there is no elevator in the floor)
            this.elevatorLocation = null;

            // Create the helpers
            this.helper = new THREE.Group();

            // Create the ground
            const ground = new Ground({
                size: new THREE.Vector3(description.ground.size.width, description.ground.size.height, description.ground.size.depth),
                segments: new THREE.Vector3(description.ground.segments.width, description.ground.segments.height, description.ground.segments.depth),
                materialParameters: {
                    color: new THREE.Color(parseInt(description.ground.primaryColor, 16)),
                    mapUrl: description.ground.maps.color.url,
                    aoMapUrl: description.ground.maps.ao.url,
                    aoMapIntensity: description.ground.maps.ao.intensity,
                    displacementMapUrl: description.ground.maps.displacement.url,
                    displacementScale: description.ground.maps.displacement.scale,
                    displacementBias: description.ground.maps.displacement.bias,
                    normalMapUrl: description.ground.maps.normal.url,
                    normalMapType: normalMapTypes[description.ground.maps.normal.type],
                    normalScale: new THREE.Vector2(description.ground.maps.normal.scale.x, description.ground.maps.normal.scale.y),
                    bumpMapUrl: description.ground.maps.bump.url,
                    bumpScale: description.ground.maps.bump.scale,
                    roughnessMapUrl: description.ground.maps.roughness.url,
                    roughness: description.ground.maps.roughness.rough,
                    wrapS: wrappingModes[description.ground.wrapS],
                    wrapT: wrappingModes[description.ground.wrapT],
                    repeat: new THREE.Vector2(description.ground.repeat.u, description.ground.repeat.v),
                    magFilter: magnificationFilters[description.ground.magFilter],
                    minFilter: minificationFilters[description.ground.minFilter]
                },
                secondaryColor: new THREE.Color(parseInt(description.ground.secondaryColor, 16))
            });
            this.add(ground);

            // Create a wall
            const wall = new Wall({
                groundHeight: description.ground.size.height,
                segments: new THREE.Vector2(description.wall.segments.width, description.wall.segments.height),
                materialParameters: {
                    color: new THREE.Color(parseInt(description.wall.primaryColor, 16)),
                    mapUrl: description.wall.maps.color.url,
                    aoMapUrl: description.wall.maps.ao.url,
                    aoMapIntensity: description.wall.maps.ao.intensity,
                    displacementMapUrl: description.wall.maps.displacement.url,
                    displacementScale: description.wall.maps.displacement.scale,
                    displacementBias: description.wall.maps.displacement.bias,
                    normalMapUrl: description.wall.maps.normal.url,
                    normalMapType: normalMapTypes[description.wall.maps.normal.type],
                    normalScale: new THREE.Vector2(description.wall.maps.normal.scale.x, description.wall.maps.normal.scale.y),
                    bumpMapUrl: description.wall.maps.bump.url,
                    bumpScale: description.wall.maps.bump.scale,
                    roughnessMapUrl: description.wall.maps.roughness.url,
                    roughness: description.wall.maps.roughness.rough,
                    wrapS: wrappingModes[description.wall.wrapS],
                    wrapT: wrappingModes[description.wall.wrapT],
                    repeat: new THREE.Vector2(description.wall.repeat.u, description.wall.repeat.v),
                    magFilter: magnificationFilters[description.wall.magFilter],
                    minFilter: minificationFilters[description.wall.minFilter]
                },
                secondaryColor: new THREE.Color(parseInt(description.wall.secondaryColor, 16))
            });

            // Build the maze
            let geometry;
            let geometries = [];
            geometries[0] = [];
            geometries[1] = [];
            this.aabb = [];
            for (let i = 0; i <= this.size.depth; i++) { // In order to represent the southmost walls, the map depth is one row greater than the actual maze depth
                this.aabb[i] = [];
                for (let j = 0; j <= this.size.width; j++) { // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
                    this.aabb[i][j] = [];
                    /*
                     *  this.map[][] | North wall | West wall
                     * --------------+------------+-----------
                     *       0       |     No     |     No
                     *       1       |     No     |    Yes
                     *       2       |    Yes     |     No
                     *       3       |    Yes     |    Yes
                     */
                    /*
                      *
                      * this.map[][] | North/South door | West/East door
                      * -------------+------------------+-----------
                      *      4       |     No           |     Yes
                      *      5       |     Yes          |     No
                    */
                    /*
                        *
                        * this.map[][] | Orientation of Elevator
                        * -------------+---------------------------
                        *      6       |     East
                        *      7       |     North
                        *      8       |     West
                        *      9       |     South
                     */

                    if (this.map[i][j] == 2 || this.map[i][j] == 3) {
                        this.aabb[i][j][0] = new THREE.Box3();
                        for (let k = 0; k < 2; k++) {
                            geometry = wall.geometries[k].clone();
                            geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(j - this.halfSize.width + 0.5, 0.25, i - this.halfSize.depth));
                            geometry.computeBoundingBox();
                            geometry.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                            geometries[k].push(geometry);
                            this.aabb[i][j][0].union(geometry.boundingBox);
                        }
                        this.helper.add(new THREE.Box3Helper(this.aabb[i][j][0], this.helpersColor));
                    }
                    if (this.map[i][j] == 1 || this.map[i][j] == 3) {
                        this.aabb[i][j][1] = new THREE.Box3();
                        for (let k = 0; k < 2; k++) {
                            geometry = wall.geometries[k].clone();
                            geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2.0));
                            geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(j - this.halfSize.width, 0.25, i - this.halfSize.depth + 0.5));
                            geometry.computeBoundingBox();
                            geometry.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                            geometries[k].push(geometry);
                            this.aabb[i][j][1].union(geometry.boundingBox);
                        }
                        this.helper.add(new THREE.Box3Helper(this.aabb[i][j][1], this.helpersColor));
                    }

                    // Create the west/east door
                  if (this.map[i][j] == 4) {

                    mtlLoader.setPath('./assets/models/obj/');
                    mtlLoader.load('Door.mtl', (materials) => {
                      materials.preload();
                      objLoader.load(
                        './assets/models/obj/Door.obj',
                        (doorModel) => {
                          doorModel.position.set(j - this.halfSize.width - 0.56, 0, i - this.halfSize.depth + 1);
                          doorModel.rotation.set(0, 0, 0);
                          const scaleX = this.scale.x * 2.55;
                          const scaleY = this.scale.y / 2.7;
                          const scaleZ = this.scale.z / 2;
                          doorModel.scale.set(scaleX / 1.25, scaleY / 1.55, scaleZ * 2);

                          // Changes the door's material color (in case the mtlLoader.preload() does not work properly)
                          doorModel.children[0].material.color.setHex(0x6E260E);

                          // Add the door model to the scene
                          this.add(doorModel);

                          // Add a mesh to the door model for raycasting
                          const raycastMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 5, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
                          raycastMesh.visible = false;
                          doorModel.add(raycastMesh);
                          this.doorsRaycastMeshes.push(raycastMesh);

                          // Store the door model in the Maze instance
                          this.createDoorModel(i, j, doorModel);

                          // Makes a floating tip over the door and stores it in the Maze instance
                          this.doorTips.push(this.makeFloatingTip( 150, 32, this.roomNames.shift(), doorModel));       // removes and returns the first element of the array roomNames
                        },
                      );
                    });
                  }

                  // Create the north/south door
                  if (this.map[i][j] == 5) {
                    mtlLoader.setPath('./assets/models/obj/');
                    mtlLoader.load('Door.mtl', (materials) => {
                      materials.preload();
                      objLoader.setMaterials(materials);
                      objLoader.load(
                        './assets/models/obj/Door.obj',
                        (doorModel) => {
                          doorModel.position.set(j - this.halfSize.width + 1, 0, i - this.halfSize.depth + 0.43);
                          doorModel.rotation.set(0, Math.PI / 2, 0);
                          const scaleX = this.scale.x * 1.98;
                          const scaleY = this.scale.y / 2.7;
                          const scaleZ = this.scale.z / 2;
                          doorModel.scale.set(scaleX / 1.25, scaleY / 1.55, scaleZ * 2);

                          // Changes the door's material color (in case the mtlLoader.preload() does not work properly)
                          doorModel.children[0].material.color.setHex(0x6E260E);

                          // Add the door model to the scene
                          this.add(doorModel);

                          // Add a mesh to the door model for raycasting
                          const raycastMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 5, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
                          raycastMesh.visible = false;
                          doorModel.add(raycastMesh);
                          this.doorsRaycastMeshes.push(raycastMesh);


                          // Store the door model in the Maze instance
                          this.createDoorModel(i, j, doorModel);

                          // Makes a floating tip over the door and stores it in the Maze instance
                          this.doorTips.push(this.makeFloatingTip( 150, 32, this.roomNames.shift(), doorModel));        // removes and returns the first element of the array roomNames
                        },
                      );
                    });
                  }

                  // Create the elevator
                    if (this.map[i][j] >= 6 && this.map[i][j] < 10) {
                      // Store the elevator location
                      this.elevatorLocation = this.cellToCartesian([i, j]);

                      // Specify the path to the GLB file
                      glbLoader.setPath('./assets/models/glb/Elevator/');

                      // Load the GLB file
                      glbLoader.load(
                        'basic_elevator.glb',
                        (elevatorModel) => {
                          // Position the elevator model
                          let elevatorModelDoor = elevatorModel.scene.children[2];
                          if (this.map[i][j] === 6) {
                            elevatorModel.scene.position.set(j - this.halfSize.width + 0.3, 0, i - this.halfSize.depth + 0.7);
                          } else if (this.map[i][j] === 7) {
                            elevatorModel.scene.position.set(j - this.halfSize.width + 0.58, 0, i - this.halfSize.depth - 0.1);
                          } else if (this.map[i][j] === 8) {
                            elevatorModel.scene.position.set(j - this.halfSize.width - 0.15, 0, i - this.halfSize.depth - 0.5);
                          } else if (this.map[i][j] === 9) {
                            elevatorModel.scene.position.set(j - this.halfSize.width - 0.58, 0, i - this.halfSize.depth + 1);
                          }
                          // Set the elevator's orientation based on the map value
                          elevatorModel.scene.rotation.set(0, (Math.PI / 2) * (this.map[i][j] - 6), 0);

                          // Scale the elevator model
                          const scaleX = this.scale.x * 0.8;
                          const scaleY = this.scale.y / 2.75;
                          const scaleZ = this.scale.z / 2.5;

                          elevatorModel.scene.scale.set(scaleX / 1.25, scaleY / 1.55, scaleZ * 2);

                          // Add the elevator model to the scene
                          this.add(elevatorModel.scene);

                          // Store the elevator model in the Maze instance
                          this.createElevatorModel(i, j, elevatorModel.scene, elevatorModelDoor);

                          // Makes a floating tip over the elevator and stores it in the Maze instance
                          this.elevatorTips.push(this.makeFloatingTip(150, 32, "Building " + parameters.url.charAt(31) + " Elevator", elevatorModel.scene));
                        });

                      // Add a mesh to the elevator model for raycasting
                      const raycastMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1), new THREE.MeshBasicMaterial({color: 0xff0000}));
                      const elevatorModelPosition = this.cellToCartesian([i, j]);
                      raycastMesh.position.set(elevatorModelPosition.x, elevatorModelPosition.y, elevatorModelPosition.z);
                      raycastMesh.visible = false;
                      this.add(raycastMesh);
                      this.elevatorsRaycastMeshes.push(raycastMesh);

                    }
                }
            }

            let mergedGeometry, mesh;
            for (let i = 0; i < 2; i++) {
                mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries[i], false);
                mesh = new THREE.Mesh(mergedGeometry, wall.materials[i]);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                this.add(mesh);
            }

            // Store the player's initial position and direction
            this.initialPosition = this.cellToCartesian(description.player.initialPosition);
            this.initialDirection = description.player.initialDirection;

            this.loaded = true;
        }

        const onProgress = function (url, xhr) {
            console.log("Resource '" + url + "' " + (100.0 * xhr.loaded / xhr.total).toFixed(0) + "% loaded.");
        }

        const onError = function (url, error) {
            console.error("Error loading resource '" + url + "' (" + error + ").");
        }

        // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
        THREE.Cache.enabled = true;

        // Create a resource file loader
        const loader = new THREE.FileLoader();

        // Set the response type: the resource file will be parsed with JSON.parse()
        loader.setResponseType("json");

        // Load a maze description resource file
        loader.load(
            //Resource URL
            this.url,

            // onLoad callback
            description => this.onLoad(description),

            // onProgress callback
            xhr => onProgress(this.url, xhr),

            // onError callback
            error => onError(this.url, error)
        );
    }

    // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
    cellToCartesian(position) {
        return new THREE.Vector3((position[1] - this.halfSize.width + 0.5) * this.scale.x, 0.0, (position[0] - this.halfSize.depth + 0.5) * this.scale.z)
    }

    // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
    cartesianToCell(position) {
        return [Math.floor(position.z / this.scale.z + this.halfSize.depth), Math.floor(position.x / this.scale.x + this.halfSize.width)];
    }

    // Detect collision with corners (method: BC/AABB)
    cornerCollision(indices, offsets, orientation, position, delta, radius, name) {
        const row = indices[0] + offsets[0];
        const column = indices[1] + offsets[1];
        if (this.map[row][column] == 2 - orientation || this.map[row][column] == 3) {
            const x = position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x);
            const z = position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z);
            if (x * x + z * z < radius * radius) {
                console.log("Collision with " + name + ".");
                return true;
            }
        }
        return false;
    }

    // Detect collision with walls (method: BC/AABB)
    wallCollision(indices, offsets, orientation, position, delta, radius, name) {
        const row = indices[0] + offsets[0];
        const column = indices[1] + offsets[1];
        if (this.map[row][column] == 2 - orientation || this.map[row][column] == 3) {
            if (orientation != 0) {
                if (Math.abs(position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x)) < radius) {
                    console.log("Collision with " + name + ".");
                    return true;
                }
            }
            else {
                if (Math.abs(position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z)) < radius) {
                    console.log("Collision with " + name + ".");
                    return true;
                }
            }
        }
        return false;
    }

    // Detect collision with walls and corners (method: OBB/AABB)
    wallAndCornerCollision(indices, offsets, orientation, obb, name) {
        const row = indices[0] + offsets[0];
        const column = indices[1] + offsets[1];
        if (this.map[row][column] == 2 - orientation || this.map[row][column] == 3) {
            if (obb.intersectsBox3(this.aabb[row][column][orientation])) {
                console.log("Collision with " + name + ".");
                return true;
            }
        }
        return false;
    }

    //Detect collision with doors
    doorCollision(indices, offsets, orientation, position, delta, radius, name) {
      const row = indices[0] + offsets[0];
      const column = indices[1] + offsets[1];
      if (this.map[row][column] == 4 || this.map[row][column] == 5) {
        const x = position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x);
        const z = position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z);

        if (x * x + z * z < radius * radius && (this.isDoorOpen(row,column) === false)) {
            const door = this.getDoorByCell(row, column);
                console.log("Opening door " + door.position.x + ", " + door.position.y + ", " + door.position.z);
                console.log("Collision with " + name + ".");
/*
// This code is for opening the door without tweening (no animation)

                if (name == "east door" || name == "west door") {
                    door.position.x = door.position.x + 0.5;
                    door.position.z = door.position.z + 0.5;
                    door.rotation.y = door.rotation.y + Math.PI / 2;
                } else {
                    door.position.x = door.position.x - 0.5;
                    door.position.z = door.position.z - 0.5;
                    door.rotation.y = door.rotation.y - Math.PI / 2;
                }

 */

          if (name == "east door" || name == "west door") {
            const doorTween = new TWEEN.Tween({
              rotationY: door.rotation.y,
              positionX: door.position.x,
              positionZ: door.position.z,
            })
              .to(
                {
                  rotationY: door.rotation.y + Math.PI / 2,
                  positionX: door.position.x + 0.55,
                  positionZ: door.position.z + 0.5,
                },
                500,
              ) // rotate and slide in 1500 milliseconds
              .easing(TWEEN.Easing.Quadratic.InOut) // use an easing function
              .onUpdate(object => {
                // Update rotation and position during the tween
                door.rotation.y = object.rotationY;
                door.position.x = object.positionX;
                door.position.z = object.positionZ;
              })
              .start();
          } else {
            const doorTween = new TWEEN.Tween({
              rotationY: door.rotation.y,
              positionX: door.position.x,
              positionZ: door.position.z,
            })
              .to(
                {
                  rotationY: door.rotation.y - Math.PI / 2,
                  positionX: door.position.x - 0.45,
                  positionZ: door.position.z - 0.4,
                },
                500,
              ) // rotate and slide in 1500 milliseconds
              .easing(TWEEN.Easing.Quadratic.InOut) // use an easing function
              .onUpdate(object => {
                // Update rotation and position during the tween
                door.rotation.y = object.rotationY;
                door.position.x = object.positionX;
                door.position.z = object.positionZ;
              })
              .start();
          }
            door.updateMatrixWorld();
              this.openedDoors.push({ row, column, door });
              return true;
        }
      }
      return false;
    }

    // Detect collisions
    collision(method, position, halfSize, direction) {
        const indices = this.cartesianToCell(position);
        if (method != "obb-aabb") {
            if (
                this.wallCollision(indices, [0, 0], 0, position, { x: 0.0, z: -0.475 }, halfSize, "north wall") || // Collision with north wall
                this.wallCollision(indices, [0, 0], 1, position, { x: -0.475, z: 0.0 }, halfSize, "west wall") || // Collision with west wall
                this.wallCollision(indices, [1, 0], 0, position, { x: 0.0, z: -0.525 }, halfSize, "south wall") || // Collision with south wall
                this.wallCollision(indices, [0, 1], 1, position, { x: -0.525, z: 0.0 }, halfSize, "east wall") || // Collision with east wall
                this.cornerCollision(indices, [1, 0], 1, position, { x: -0.475, z: -0.5 }, halfSize, "southwest corner (NS-oriented wall)") || // Collision with southwest corner (NS-oriented wall)
                this.cornerCollision(indices, [1, 1], 0, position, { x: -0.5, z: -0.525 }, halfSize, "southeast corner (WE-oriented wall)") || // Collision with southeast corner (WE-oriented wall)
                this.cornerCollision(indices, [1, 1], 1, position, { x: -0.525, z: -0.5 }, halfSize, "southeast corner (NS-oriented wall)") || // Collision with southeast corner (NS-oriented wall)
                this.cornerCollision(indices, [0, 1], 0, position, { x: -0.5, z: -0.475 }, halfSize, "northeast corner (WE-oriented wall)") || // Collision with northeast corner (WE-oriented wall)
                this.doorCollision(indices, [0, 0], 0, position, { x: 0.0, z: -0.475 }, halfSize, "north door") || // Collision with north door
                this.doorCollision(indices, [0, 0], 1, position, { x: -0.475, z: 0.0 }, halfSize, "west door") || // Collision with west door
                this.doorCollision(indices, [1, 0], 0, position, { x: 0.0, z: -0.525 }, halfSize, "south door") || // Collision with south door
                this.doorCollision(indices, [0, 1], 1, position, { x: -0.525, z: 0.0 }, halfSize, "east door") || // Collision with east door
                indices[0] > 0 && (
                    this.cornerCollision(indices, [-1, 1], 1, position, { x: -0.525, z: 0.5 }, halfSize, "northeast corner (NS-oriented wall)") || // Collision with northeast corner (NS-oriented wall)
                    this.cornerCollision(indices, [-1, 0], 1, position, { x: -0.475, z: 0.5 }, halfSize, "northwest corner (NS-oriented wall)") // Collision with northwest corner (NS-oriented wall)
                ) ||
                indices[1] > 0 && (
                    this.cornerCollision(indices, [0, -1], 0, position, { x: 0.5, z: -0.475 }, halfSize, "northwest corner (WE-oriented wall)") || // Collision with northwest corner (WE-oriented wall)
                    this.cornerCollision(indices, [1, -1], 0, position, { x: 0.5, z: -0.525 }, halfSize, "southwest corner (WE-oriented wall)") // Collision with southwest corner (WE-oriented wall)
                )
            ) {
                return true;
            }
            // No collision
            return false;
        }
        else {
            // Create the object's oriented bounding box (OBB) in 3D space and set its orientation
            const obb = new OBB(position, halfSize);
            obb.applyMatrix4(new THREE.Matrix4().makeRotationY(direction));
            if (
                this.wallAndCornerCollision(indices, [0, 0], 0, obb, "north wall") || // Collision with north wall
                this.wallAndCornerCollision(indices, [0, 0], 1, obb, "west wall") || // Collision with west wall
                this.wallAndCornerCollision(indices, [1, 0], 0, obb, "south wall") || // Collision with south wall
                this.wallAndCornerCollision(indices, [0, 1], 1, obb, "east wall") || // Collision with east wall

                this.wallAndCornerCollision(indices, [1, 0], 1, obb, "southwest corner (NS-oriented wall)") || // Collision with southwest corner (NS-oriented wall)
                this.wallAndCornerCollision(indices, [1, 1], 0, obb, "southeast corner (WE-oriented wall)") || // Collision with southeast corner (WE-oriented wall)
                this.wallAndCornerCollision(indices, [1, 1], 1, obb, "southeast corner (NS-oriented wall)") || // Collision with southeast corner (NS-oriented wall)
                this.wallAndCornerCollision(indices, [0, 1], 0, obb, "northeast corner (WE-oriented wall)") || // Collision with northeast corner (WE-oriented wall)

                this.doorCollision(indices, [0, 0], 0, obb, { x: 0.0, z: -0.475 }, halfSize, "north door") || // Collision with north door
                this.doorCollision(indices, [0, 0], 1, obb, { x: -0.475, z: 0.0 }, halfSize, "west door") || // Collision with west door
                indices[0] > 0 && (
                    this.wallAndCornerCollision(indices, [-1, 1], 1, obb, "northeast corner (NS-oriented wall)") || // Collision with northeast corner (NS-oriented wall)
                    this.wallAndCornerCollision(indices, [-1, 0], 1, obb, "northwest corner (NS-oriented wall)") // Collision with northwest corner (NS-oriented wall)
                ) ||
                indices[1] > 0 && (
                    this.wallAndCornerCollision(indices, [0, -1], 0, obb, "northwest corner (WE-oriented wall)") || // Collision with northwest corner (WE-oriented wall)
                    this.wallAndCornerCollision(indices, [1, -1], 0, obb, "southwest corner (WE-oriented wall)") // Collision with southwest corner (WE-oriented wall)
                )
            ) {
                return true;
            }
            // No collision
            return false;
        }
    }

    setPositionToPassageExit(oldFloor) {
      console.log("Passage destinations: " + this.passageDestinations);
      for (let i = 0; i < this.passageDestinations.length; i++) {
        if (this.passageDestinations[i] === oldFloor) {
          const result = new THREE.Vector3(this.passageLocations[i].x, 0, this.passageLocations[i].z);

          // Offsets to adjust the position to avoid collision with passages and make sure the robot is inside the floor
          if (result.x > this.halfSize.width) {
            result.setX(result.x - 0.8);
          } else if (result.x < this.halfSize.width) {
            result.setX(result.x + 0.8);
          }

          if (result.z > this.halfSize.depth) {
            result.setZ(result.z - 0.8);
          } else if (result.z < this.halfSize.depth) {
            result.setZ(result.z + 0.8);
          }

          //console.log("Result: " + result.x + ", " + result.z);
          this.initialPosition.set(result.x, 0, result.z);
          return;
        }
      }
    }

    foundPassage(position) {
      for (let i = 0; i < this.passageLocations.length; i++) {
        let offsetX = 0;

        if (this.passageLocations[i].x < this.halfSize.width) {
          offsetX = 0.4;
        }

        if (Math.abs(position.x - this.passageLocations[i].x + offsetX) < 0.5 * this.scale.x - offsetX && Math.abs(position.z - this.passageLocations[i].z) < 0.5 * this.scale.z){
          console.log("Found passage: " + this.passageLocations[i].x + ", " + this.passageLocations[i].z);
          return i;
        }
      }
      return undefined;
    }

    foundElevator(position) {

      // Checks if the robot is close enough to the elevator

      // Offset to adjust collision with elevators marked in the map with 6
      let offsetX = 0;
      let offsetZ = 0

      const elevatorCoordinates = this.cartesianToCell(this.elevatorLocation);
      if (this.map[elevatorCoordinates[0]][elevatorCoordinates[1]] === 6){
        offsetX = 0.65;
        offsetZ = 0.3;
      }
      return Math.abs(position.x - this.elevatorLocation.x) < (0.7 - offsetX) * this.scale.x && Math.abs(position.z - this.elevatorLocation.z) < (0.7 - offsetZ) * this.scale.z;
    }

    openElevatorDoors() {
      for (const elevator of this.elevators) {
        const elevatorDoor = elevator.door;
        const elevatorTween = new TWEEN.Tween({
          opacity: elevatorDoor.material.opacity,
          positionX: elevatorDoor.position.x,
          positionZ: elevatorDoor.position.z,
        })
          .to(
            {
              opacity: 0,
              positionX: elevatorDoor.position.x - 0.1,
              positionZ: elevatorDoor.position.z + 1,
            },
            1000,
          ) // slide in 1500 milliseconds
          .easing(TWEEN.Easing.Quadratic.InOut) // use an easing function
          .onUpdate(object => {
            // Update position during the tween
            elevatorDoor.material.opacity = object.opacity;
            elevatorDoor.position.x = object.positionX;
            elevatorDoor.position.z = object.positionZ;
          })
          .start();
      }
    }
    createDoorModel(row, column, model) {
      // Store the door model in the array
      this.doors.push({ row, column, model });
    }

    getDoorByCell(row, column) {
        // Check if the doors array is defined
        if (this.doors) {
            // Iterate over the doors array to find the door at the specified cell
            for (const door of this.doors) {
                if (door.row === row && door.column === column) {
                    return door.model;
                }
            }
        }

        // Return null if no door is found
        return null;
    }

    isDoorOpen(row, column) {
        // Check if the doors array is defined
        if (this.openedDoors) {
            // Iterate over the doors array to find the door at the specified cell
            for (const door of this.openedDoors) {
                if (door.row === row && door.column === column) {
                    return true;
                }
            }
        }

        // Return null if no door is found
        return false;
    }

    createElevatorModel(row, column, model, door) {
        // Store the elevator model in the array
        this.elevators.push({ row, column, model, door });
    }

  makeFloatingTip(labelWidth, size, name, model) {

    const canvas = this.makeLabelCanvas(labelWidth,size,name);
    const texture = new THREE.CanvasTexture(canvas);
    // because our canvas is likely not a power of 2
    // in both dimensions set the filtering appropriately.
    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    const labelMaterial = new THREE.SpriteMaterial( {
      map: texture,
      transparent: true,
    } );

    const root = new THREE.Object3D(model.position.x, model.position.y + 2, model.position.z);

    // if units are meters then 0.01 here makes size
    // of the label into centimeters.
    const labelBaseScale = 0.01;
    const label = new THREE.Sprite(labelMaterial);
    root.add(label);

    label.position.x = model.position.x;
    label.position.y = model.position.y + size * labelBaseScale + 0.59;
    label.position.z = model.position.z;

    label.scale.x = canvas.width * labelBaseScale;
    label.scale.y = canvas.height * labelBaseScale;

    this.add(root);
    root.visible = false;

    return root;
  }

    makeLabelCanvas( baseWidth, size, name ) {

      const borderSize = 2;
      const ctx = document.createElement( 'canvas' ).getContext( '2d' );
      const font = `${size}px bold sans-serif`;
      ctx.font = font;
      // measure how long the name will be
      const textWidth = ctx.measureText( name ).width;

      const doubleBorderSize = borderSize * 2;
      const width = baseWidth + doubleBorderSize;
      const height = size + doubleBorderSize;
      ctx.canvas.width = width;
      ctx.canvas.height = height;

      // need to set font again after resizing canvas
      ctx.font = font;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      ctx.fillStyle = 'blue';
      ctx.fillRect( 0, 0, width, height );

      // scale to fit but don't stretch
      const scaleFactor = Math.min( 1, baseWidth / textWidth );
      ctx.translate( width / 2, height / 2 );
      ctx.scale( scaleFactor, 1 );
      ctx.fillStyle = 'white';
      ctx.fillText( name, 0, 0 );

      return ctx.canvas;

    }

    hoverDoor(raycaster, mouse, camera){

      raycaster.setFromCamera(new THREE.Vector3(mouse.x, mouse.y, 0), camera.perspective);

      // Check for intersections between the raycast ray and the floor's doors
      const intersects = raycaster.intersectObjects(this.children,true);

      let doorHovered = false;

      if (intersects.length > 1) {        // The ground counts as one intersection, so we need to check if there is more than one
        this.revealSprite(intersects[0].object);
        //console.log("Door hovered");
        doorHovered = true;
      }

      if (doorHovered === false) {
        this.hideDoorSprite();
      }
    }

    hoverElevator(raycaster, mousePosition, camera){

      raycaster.setFromCamera(new THREE.Vector3(mousePosition.x, mousePosition.y, 0), camera.perspective);

      const intersects = raycaster.intersectObjects(this.children, true);


      // If an intersection is found, indicate that the object is being hovered over
      if (intersects.length > 1) {        // The ground counts as one intersection, so we need to check if there is more than one
        this.revealSprite(intersects[0].object);
      } else {
        this.hideElevatorSprite();
      }
    }

    revealSprite(object){
      for (let i = 0; i < this.doorsRaycastMeshes.length; i++) {
        if (this.doorsRaycastMeshes[i] == object) {
          this.doorTips[i].visible = true;
          return;
        }
      }
      for (let i = 0; i < this.elevatorsRaycastMeshes.length; i++) {
        if (this.elevatorsRaycastMeshes[i] == object) {
          this.elevatorTips[i].visible = true;
          return;
        }
      }

    }

    hideDoorSprite(){
      for (const doorTip of this.doorTips) {
        doorTip.visible = false;
      }
    }

    hideElevatorSprite(){
      for (const elevatorTip of this.elevatorTips) {
        elevatorTip.visible = false;
      }
    }


}
