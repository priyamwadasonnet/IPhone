import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import Stats from 'three/addons/libs/stats.module.js';
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { DragControls } from 'three/addons/controls/DragControls.js';

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000);


const light = new THREE.PointLight(0xffffff, Math.PI)
light.position.set(-0.15, -0.15, -0.1)

scene.add(light)

const lighttwo = new THREE.PointLight(0xffffff, Math.PI)
lighttwo.position.set(0.15, 0.15, 0.1)

scene.add(lighttwo)


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 0.25

const renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})


const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;

 new GLTFLoader().load('models/Phone.glb', (gltf) => {
  console.log(gltf)

  const phone = gltf.scene.getObjectByName('watch') as THREE.Mesh
  phone.castShadow = true
  phone.position.set(0, 0.06, 0)
  scene.add(gltf.scene)
})
const models: THREE.Mesh[] = [];
 /* 
new GLTFLoader().load('models/threecamera.glb', (gltf) => {
 console.log(gltf)
  
 const threecamera = gltf.scene.getObjectByName('three') as THREE.Mesh
 threecamera.castShadow = true
 threecamera.position.set(0, 0, 0.02)
 threecamera.rotateZ(Math.PI/0.2)
 models.push(threecamera)
 scene.add(gltf.scene)
 
  })

  
new GLTFLoader().load('models/frontcamera.glb', (gltf) => {
 console.log(gltf)
  
 const frontcamera = gltf.scene.getObjectByName('frontcamera') as THREE.Mesh
 frontcamera.castShadow = true
 
 scene.add(gltf.scene)
  })
  
  new GLTFLoader().load('models/power.glb', (gltf) => {
 console.log(gltf)
  
 const power = gltf.scene.getObjectByName('power') as THREE.Mesh
 power.castShadow = true
 
 scene.add(gltf.scene)
  })
  
  new GLTFLoader().load('models/volume.glb', (gltf) => {
 console.log(gltf)
  
 const volume = gltf.scene.getObjectByName('volume') as THREE.Mesh
 volume.castShadow = true
 scene.add(gltf.scene)
  })
*/
const dragcntrols = new DragControls( models, camera, renderer.domElement );
dragcntrols.addEventListener( 'dragged', function ( event ) {
});
const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
  requestAnimationFrame(animate)

  controls.update()

  renderer.render(scene, camera)

  stats.update()
}

animate()