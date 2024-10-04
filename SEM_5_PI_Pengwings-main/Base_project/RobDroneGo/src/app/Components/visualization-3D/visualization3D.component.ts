import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import * as THREE from "three";
import Orientation from './core/orientation.js';
import ThumbRaiser from "./core/thumb_raiser.js";
import * as TWEEN from "@tweenjs/tween.js";

@Component({
  selector: 'app-visualization-3D',
  templateUrl: './visualization3D.component.html',
  styleUrls: ['./visualization3D.component.css']
})

export class Visualization3DComponent implements AfterViewInit, OnDestroy {


  @ViewChild('myCanvas') private canvasRef!: ElementRef;


  //* Stage Properties
  @Input() public cameraZ: number = 10;
  @Input() public fieldOfView: number = 30;
  @Input('nearClipping') public nearClippingPane: number = 1;
  @Input('farClipping') public farClippingPane: number = 1000;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
/*
  private renderer!: THREE.WebGLRenderer;
  private scene: THREE.Scene = new THREE.Scene();
  private camera!: THREE.PerspectiveCamera;

 */

  private thumbRaiser!: ThumbRaiser;


  // Temporary variables to simulate a task
  // path: an array of floors, each floor is an array of coordinates, each coordinate is a two number array
    private task1 = {
      name: 'Task in the same floor',
      path: [
        [[2, 21], [3, 20], [4, 19], [4, 18], [4, 17], [4, 16], [4, 15], [4, 14], [4, 13], [4, 12], [4, 11], [4, 10]]
      ],
      floors: ["./assets/floors/floor1_buildingA.json"],
    };

  private task2 = {
    name: 'Task in another floor',
    path: [
      [[2, 21], [1, 21]],
      [[2, 21], [3, 20], [3, 19], [3, 18], [3, 17], [2,17]]
    ],
    floors: ["./assets/floors/floor1_buildingA.json", "./assets/floors/floor2_buildingA.json"],
  };

  private task3 = {
    name: 'Task in another building',
    path: [
      [[2, 21], [1, 21]],
      [[2, 21], [3, 21], [4, 21], [5, 21], [5, 22]],
      [[6,1], [7,2], [8,2], [9,2], [10,3], [10,4], [10,5], [10,6], [10,7], [9,8], [8,8], [7,8], [7,7]]
    ],
    floors: ["./assets/floors/floor1_buildingA.json", "./assets/floors/floor2_buildingA.json", "./assets/floors/floor2_buildingB.json"],
  };

  private tasks = [this.task1, this.task2, this.task3];

  private getAspectRatio(): number {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
   * Create the scene
   *
   * @private
   * @memberof Visualization3DComponent
   */

  /*
  private createScene(): void {
//* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0000ff);
//*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(this.fieldOfView, aspectRatio,
      this.nearClippingPane, this.farClippingPane);
    this.camera.position.z = this.cameraZ;
//* Renderer
// Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

   */

  /**
   * Render the scene
   *
   * @private
   * @memberof Visualization3DComponent
   */
  private render() {
    requestAnimationFrame(() => this.render());
    // Update the game
    this.thumbRaiser.update();
    TWEEN.update();
  }

    initialize() {
        // Create the game
        this.thumbRaiser = new ThumbRaiser(
            {}, // General Parameters
            {
                enabled: true,
                introductionClips: [
                    {
                        url: "./assets/clips/el-gringo-12613.mp3",
                        position: "initial", // Global (non-positional) audio object: ""; positional audio object: "scene x y z" (scene specific position in cartesian coordinates), "maze line column" (maze specific position in cell coordinates), "exit" (maze exit location), "initial" (player initial position), "player" (player current position), "spotlight" (spotlight current position)
                        referenceDistance: 1.0,
                        loop: true,
                        volume: 0.5
                    }
                ],
                idleClips: [
                    {
                        url: "./assets/clips/Clearing-Throat-Moderate-Speed-www.fesliyanstudios.com.mp3",
                        position: "player",
                        referenceDistance: 1.0,
                        loop: false,
                        volume: 0.75
                    },
                    {
                        url: "./assets/clips/Small-Double-Cough-1-www.fesliyanstudios.com.mp3",
                        position: "player",
                        referenceDistance: 1.0,
                        loop: false,
                        volume: 0.75
                    },
                    {
                        url: "./assets/clips/Yawn-A2-www.fesliyanstudios.com.mp3",
                        position: "player",
                        referenceDistance: 1.0,
                        loop: false,
                        volume: 0.75
                    }
                ],
                jumpClips: [
                    {
                        url: "./assets/clips/Cheering-A6-www.fesliyanstudios.com.mp3",
                        position: "player",
                        referenceDistance: 1.0,
                        loop: false,
                        volume: 0.75
                    },
                    {
                        url: "./assets/clips/Cheering-A7-www.fesliyanstudios.com.mp3",
                        position: "player",
                        referenceDistance: 1.0,
                        loop: false,
                        volume: 0.75
                    }
                ],
                deathClips: [
                    {
                        url: "./assets/clips/176653326.mp3",
                        position: "player",
                        referenceDistance: 1.0,
                        loop: false,
                        volume: 0.75
                    },
                    {
                        url: "./assets/clips/Horn+Squeeze+Clown.mp3",
                        position: "player",
                        referenceDistance: 1.0,
                        loop: false,
                        volume: 0.75
                    }
                ],
                danceClips: [
                    {
                        url: "./assets/clips/best-buddies-12609.mp3",
                        position: "exit",
                        referenceDistance: 1.0,
                        loop: true,
                        volume: 0.5
                    }
                ],
                endClips: [
                    {
                        url: "./assets/clips/Ba-Bum-Tss-Joke-Drum-A1-www.fesliyanstudios.com.mp3",
                        position: "exit",
                        referenceDistance: 1.0,
                        loop: false,
                        volume: 2.0
                    },
                    {
                        url: "./assets/clips/yay-6326.mp3",
                        position: "exit",
                        referenceDistance: 1.0,
                        loop: false,
                        volume: 0.75
                    },
                    {
                        url: "./assets/clips/crowd-cheer-ii-6263.mp3",
                        position: "exit",
                        referenceDistance: 1.0,
                        loop: false,
                        volume: 0.75
                    }
                ],
                credits: "Sound clips downloaded from <a href='https://www.dreamstime.com/' target='_blank' rel='noopener'>Dreamstime</a>, <a href='https://www.fesliyanstudios.com/' target='_blank' rel='noopener'>Fesliyan Studios</a> and <a href='https://pixabay.com/' target='_blank' rel='noopener'>Pixabay</a>."
            }, // Audio parameters
            {
                skyboxes: [
                    { // Stormy days
                        name: "Stormy days",
                        texturePath: "./assets/cube_textures/envmap_stormydays/",
                        texturePositiveXUrl: "stormydays_ft.jpg",
                        textureNegativeXUrl: "stormydays_bk.jpg",
                        texturePositiveYUrl: "stormydays_up.jpg",
                        textureNegativeYUrl: "stormydays_dn.jpg",
                        texturePositiveZUrl: "stormydays_rt.jpg",
                        textureNegativeZUrl: "stormydays_lf.jpg",
                        credits: "Skybox created by <a href='https://opengameart.org/content/stormy-days-skybox' target='_blank' rel='noopener'>Jockum Skoglund (hipshot)</a>."
                    },
                ],
                selected: 1
            }, // Cube texture parameters
            {
                url: "./assets/floors/floor1_buildingA.json",
                helpersColor: new THREE.Color(0xff0077)
            }, // Maze parameters
            { helpersColor: new THREE.Color(0x0055ff) }, // Player parameters
            {
                intensity: 0.1
            }, // Ambient light parameters
            {
                intensity: 0.5,
                distance: 20.0,
                orientation: new Orientation(-38.7, 53.1),
                castShadow: true,
                shadow: {
                    mapSize: new THREE.Vector2(2048, 2048),
                    camera: {
                        left: -20.0,
                        right: 20.0,
                        top: 20.0,
                        bottom: -20.0,
                        near: 0.0,
                        far: 40.0
                    }
                }
            }, // Directional light parameters
            {
                visible: false,
                intensity: 90.0,
                distance: 40.0,
                angle: 4.0,
                position: new THREE.Vector3(0.0, 10.0, 0.0),
                castShadow: true,
                shadow: {
                    camera: {
                        near: 5.0,
                        far: 30.0
                    }
                }
            }, // Spotlight parameters
            {
                color: new THREE.Color(0xffffa0),
                visible: false,
                intensity: 2.0,
                distance: 5.0,
                angle: 20.0,
                orientation: new Orientation(0.0, -20.0),
                castShadow: true,
                shadow: {
                    camera: {
                        near: 0.01,
                        far: 10.0
                    }
                }
            }, // Flashlight parameters
            { type: THREE.PCFSoftShadowMap }, // Shadows parameters
            {}, // Fog parameters
            {}, // Collision detection parameters
            { view: "fixed", initialViewport: new THREE.Vector4(0.0, 1.0, 0.45, 0.5), initialFogDensity: 0.1 }, // Fixed view camera parameters
            { view: "first-person", initialViewport: new THREE.Vector4(1.0, 1.0, 0.55, 0.5), initialOrientation: new Orientation(0.0, -10.0), orientationMax: new Orientation(180.0, 90.0), initialFogDensity: 0.7 }, // First-person view camera parameters
            { view: "third-person", initialViewport: new THREE.Vector4(0.0, 0.0, 0.55, 0.5), initialOrientation: new Orientation(0.0, -20.0), initialDistance: 2.0, distanceMin: 1.0, distanceMax: 4.0, initialFogDensity: 0.3 }, // Third-person view camera parameters
            { view: "top", initialViewport: new THREE.Vector4(1.0, 0.0, 0.45, 0.5), initialOrientation: new Orientation(0.0, -90.0), initialDistance: 4.0, distanceMin: 1.0, distanceMax: 16.0, initialFogDensity: 0.2 }, // Top view camera parameters
            { view: "mini-map", initialViewport: new THREE.Vector4(0.5, 0.5, 0.3, 0.3), initialOrientation: new Orientation(180.0, -90.0), initialZoom: 0.64, zoomMin: 0.64, zoomMax: 10.12 }, // Mini-map view camera parameters
            {name: "buildingA"}, // building parameter
            this.tasks // tasks parameter
        );
    }

  constructor() { }

  ngAfterViewInit(): void {
    //this.createScene();
    this.initialize();
    this.render();
  }

  ngOnDestroy() {
    this.thumbRaiser.destroy();
  }

}
