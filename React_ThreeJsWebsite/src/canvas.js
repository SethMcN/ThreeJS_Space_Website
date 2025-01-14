import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module';
import gsap from 'gsap';

// Stats
const stats = Stats();
document.body.appendChild(stats.dom);

// Create a scene
const scene = new THREE.Scene();

// Create a camera (field of view, aspect ratio, near, far)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 30);

// cameraToProjects function
export function cameraToProjects() {
    console.log("cameraToProjects called");
    gsap.to(camera.position, {x: 50, y: 10, z: 30, duration: 2});
    gsap.to(camera.rotation, {x: -.25, y: 0, z: 0, duration: 2});
      
    console.log(`Camera position: x=${camera.position.x}, y=${camera.position.y}, z=${camera.position.z}`);
  }

export function cameraToAbout() {
    console.log("cameraToAbout called");
    gsap.to(camera.position, {x: -50, y: 10, z: 30, duration: 2});
    gsap.to(camera.rotation, {x: -.25, y: 0, z: 0, duration: 2});
      
    console.log(`Camera position: x=${camera.position.x}, y=${camera.position.y}, z=${camera.position.z}`);
}

export function cameraToContact() {
    console.log("cameraToContact called");
    gsap.to(camera.position, {x: 0, y: 50, z: 30, duration: 2});
    gsap.to(camera.rotation, {x: 0, y: 0, z: 0, duration: 2});
      
    console.log(`Camera position: x=${camera.position.x}, y=${camera.position.y}, z=${camera.position.z}`);
}


// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Handle window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Create a geometry
// floor geometry

// parameters: width, height, width segments, height segments

// Load textures
const floorDiffuseTexture = new THREE.TextureLoader().load('/rock_face_03_diff_2k.jpg');
const floorNormalTexture = new THREE.TextureLoader().load('/rock_face_03_nor_gl_2k.jpg');
const floorRoughnessTexture = new THREE.TextureLoader().load('/rock_face_03_rough_2k.jpg');

// Set texture repeat properties
floorDiffuseTexture.wrapS = THREE.RepeatWrapping;
floorDiffuseTexture.wrapT = THREE.RepeatWrapping;
floorDiffuseTexture.repeat.set(16, 16); 

floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.repeat.set(16, 16); 

// Create floor geometry and material
const floorGeometry = new THREE.PlaneGeometry(2000, 2000, 50, 50);
const floorMaterial = new THREE.MeshStandardMaterial({ 
  map: floorDiffuseTexture, 
  normalMap: floorNormalTexture,
  roughnessMap: floorRoughnessTexture,
  roughness: .8,
  metalness: .2
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
scene.add(floor);
floor.rotation.x = -Math.PI / 2;


// place holder cubes
const greenCubeGeometry = new THREE.BoxGeometry(5, 5, 5);
const greenCubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const greenCube = new THREE.Mesh(greenCubeGeometry, greenCubeMaterial);
scene.add(greenCube);
greenCube.position.x = 50;
greenCube.position.y = 5;

const redCubeGeometry = new THREE.BoxGeometry(5,5,5);
const redCubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
const redCube = new THREE.Mesh(redCubeGeometry, redCubeMaterial);
scene.add(redCube);
redCube.position.x = -50;
redCube.position.y = 5;

const blueCubeGeometry = new THREE.BoxGeometry(5, 5, 5);
const blueCubeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
const blueCube = new THREE.Mesh(blueCubeGeometry, blueCubeMaterial);
scene.add(blueCube);
blueCube.position.y = 50;



// star particles

const starGeometry = new THREE.BufferGeometry();
const starVertices = [];
const starColors = [];
const starMaterial = new THREE.PointsMaterial({ vertexColors: true });

// Generate star vertices and colors
for (let i = 0; i < 20000; i++) {
  // Generate random x, y, z coordinates for star vertices
  const x = (Math.random() - 0.5) * 2000; // x coordinate between -1000 and 1000
  const y = (Math.random() - 0.5) * 2000; // y coordinate between -1000 and 1000
  const z = -Math.random() * 2000; // z coordinate between 0 and -2000
  starVertices.push(x, y, z);

  // Generate random color for each star
  const color = new THREE.Color(Math.random(), Math.random(), Math.random());
  starColors.push(color.r, color.g, color.b);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);


// Create a light
const light = new THREE.DirectionalLight(0xffffff, .5);
light.position.set(0, 10, 10);
light.rotation.set(.25, 0, 0);
scene.add(light);

const lightHelper = new THREE.DirectionalLightHelper(light);
scene.add(lightHelper);




// Create helpers
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Set the camera position
camera.position.z = 30;
camera.lookAt(0, 0, 0);
// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// animate function
let lastTime = 0;
const fps = 165;
const interval = 1000 / fps;

function animate(time) {

  const delta = time - lastTime;
  if (delta > interval) {
    lastTime = time - (delta % interval);

    stats.update();

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
}

animate();
