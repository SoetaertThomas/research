import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1000,
)
camera.position.set(2, 3, 5)
camera.lookAt(scene.position)
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
const controls = new OrbitControls(camera, renderer.domElement)

camera.position.set(0, 2, 5)
//controls.update() must be called after any manual changes to the camera's transform
controls.update()
var plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 10, 5, 10),
  new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    wireframe: true,
  }),
)
plane.receiveShadow = true
plane.rotation.x = -Math.PI * 0.5
scene.add(plane)

var ball = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 8),
  new THREE.MeshBasicMaterial({
    color: 0xff00ff,
    wireframe: true,
  }),
)
ball.castShadow = true //default is false
ball.receiveShadow = false //default
scene.add(ball)

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 1, 0) //default; light shining from top
light.castShadow = true // default false
scene.add(light)

const helper = new THREE.CameraHelper(light.shadow.camera)
scene.add(helper)

light.shadow.mapSize.width = 512 // default
light.shadow.mapSize.height = 512 // default
light.shadow.camera.near = 0.5 // default
light.shadow.camera.far = 500 // default

var clock = new THREE.Clock()
var time = 0
var delta = 0

render()

function render() {
  requestAnimationFrame(render)
  delta = clock.getDelta()
  time += delta
  ball.rotation.x = time * 4
  ball.position.y = 0.5 + Math.abs(Math.sin(time * 3)) * 2
  ball.position.z = Math.cos(time) * 4
  renderer.render(scene, camera)
}
