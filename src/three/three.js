import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GUI } from 'dat.gui'

var scene = new THREE.Scene()

const canvas = document.querySelector('canvas.webgl')

var camera = new THREE.PerspectiveCamera(
  60,
  canvas.clientWidth / canvas.clientHeight,
  1,
  1000,
)
camera.position.set(2, 3, 5)
camera.lookAt(scene.position)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
})

const sizes = {
  width: canvas.clientWidth,
  height: canvas.clientHeight,
}

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(sizes.width / sizes.height)
renderer.setClearColor('#f3f4f6', 0.6)

document.body.appendChild(canvas)

const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0, 0)
controls.rotateSpeed = 5
controls.enableDamping = true
controls.enableZoom = true
controls.autoRotate = true
controls.update()

//const gui = new GUI()
//   var img = {
//     changeImage: function () {
//       console.log('clicked')
//       let click = document.querySelector('.click')
//       let input = document.createElement('button')
//       input.id = 'modal1-trigger'
//       click.appendChild(input)
//       console.log(input)
//       input.click()
//       //   input.onchange = () => {
//       //     // you can use this method to get file and perform respective operations
//       //     let url = input.value
//       //     console.log(url)
//       //     new THREE.TextureLoader().load(url, (texture) => {
//       //       //Update Texture
//       //       materials[0].map = texture
//       //       materials[0].needsUpdate = true
//       //     })
//       //   }
//     },
//   }

const wheelcolor = document.querySelector('#wheelcolor')
wheelcolor.addEventListener('input', () => {
  //console.log(wheelcolor.value)
  materials[6].color.set(wheelcolor.value)
})

const deckcolor = document.querySelector('#deckcolor')
deckcolor.addEventListener('input', () => {
  //console.log(wheelcolor.value)
  materials[0].color.set(deckcolor.value)
})

const urlInput = document.querySelector('#urlInput')
urlInput.addEventListener('change', () => {
  console.log(urlInput.value)
  let txtLoader = new THREE.TextureLoader().load(urlInput.value, (texture) => {
    //Update Texture
    texture.center.set(0.5, 0.5)
    materials[0].map = texture
    materials[0].needsUpdate = true
  })
})

//   const options = {
//     Deck: 0x00ff00,
//     Wheels: 0x00ff00,
//   }
//   gui.addColor(options, 'Wheels').onChange((e) => {
//     materials[6].color.set(e)
//   })

//   // gui.add(img, 'changeImage').name('change image')
//   const params = {
//     textField: 'image url',
//   }
//   let url = ''

//   gui
//     .add(params, 'textField')
//     .name('Deck art')
//     .onFinishChange(function (value) {
//       url = value
//       console.log(url)
//       new THREE.TextureLoader().load(url, (texture) => {
//         //Update Texture
//         materials[0].map = texture
//         materials[0].needsUpdate = true
//       })
//     })

//   gui.addColor(options, 'Deck').onChange((e) => {
//     materials[0].color.set(e)
//   })

const dracolader = new DRACOLoader()
dracolader.setDecoderPath('../draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracolader)

const materials = []

gltfLoader.load('/model/skateboard/scene.gltf', (gltf) => {
  const scenexx = gltf.scene

  scenexx.traverse(function (object) {
    if (object.material) materials.push(object.material)
    //console.log(materials)
  })
  gltf.scene.scale.set(0.75, 0.75, 0.75)
  scene.add(gltf.scene)
})

const ambientLight = new THREE.AmbientLight(0xf0f2d4, 1)
scene.add(ambientLight)

//controls.update() must be called after any manual changes to the camera's transform

const save = document.querySelector('#save')
save.addEventListener('click', () => {
  //console.log('save')
  saveLocalStorage()
  clickEvent()
})

const clickEvent = () => {
  let custom = document.querySelector('#custompresets')
  custom.addEventListener('change', () => {
    let localPreset = localStorage.getItem(custom.value)
    localPreset = JSON.parse(localPreset)
    //console.log(localPreset)
    preset(
      localPreset.UrlImg,
      '0x' + localPreset.WheelC.toLowerCase(),
      '0x' + localPreset.DeckC.toLowerCase(),
    )
  })
}

const presets = document.querySelector('#custompresets')
const presetTitle = document.querySelector('#custompresettitle')
presetTitle.classList.add('hidden')

if (window.localStorage.length > 1) {
  presets.classList.remove('hidden')
  presetTitle.classList.remove('hidden')
  Object.keys(window.localStorage).forEach(function (key, index) {
    //console.log(key)
    if (key[0] + key[1] === 'id') {
      const newPreset = document.createElement('option')
      // newPreset.classList.add('button')
      newPreset.classList.add('preset')
      //newPreset.setAttribute('id', key)
      newPreset.value = key
      let data = window.localStorage.getItem(key)
      data = JSON.parse(data)
      console.log(data.PresetName)
      newPreset.innerHTML = data.PresetName
      presets.appendChild(newPreset)
    }
  })
  clickEvent()
  //console.log(window.localStorage)
  //console.log('woppa')
}

const saveLocalStorage = () => {
  //console.log(url)
  //console.log(decimalToHexString(materials[6].color.getHex()))
  //console.log(decimalToHexString(materials[0].color.getHex()))
  let presetName = document.querySelector('#presetname')
  //console.log(presetName.value)
  let uniq = 'id' + new Date().getTime()
  let dict = {
    Id: uniq,
    UrlImg: urlInput.value,
    WheelC: decimalToHexString(materials[6].color.getHex()),
    DeckC: decimalToHexString(materials[0].color.getHex()),
    PresetName: presetName.value,
  }
  localStorage.setItem(uniq, JSON.stringify(dict))
  const newPreset = document.createElement('option')
  //newPreset.classList.add('button')
  newPreset.classList.add('preset')
  newPreset.value = uniq
  newPreset.innerHTML = presetName.value
  presets.appendChild(newPreset)
  presets.classList.remove('hidden')
  presetTitle.classList.remove('hidden')

  // localStorage.setItem('url', url)
  // localStorage.setItem(
  //   'wheelcolor',
  //   decimalToHexString(materials[6].color.getHex()),
  // )
  // localStorage.setItem(
  //   'deckcolor',
  //   decimalToHexString(materials[0].color.getHex()),
  // )
}

const decimalToHexString = (hex) => {
  if (hex < 0) {
    hex = 0xffffffff + hex + 1
  }

  return hex.toString(16).toUpperCase()
}

const preset = (url, wheelcolor, deckcolor) => {
  new THREE.TextureLoader().load(url, (texture) => {
    //Update Texture
    materials[0].map = texture
    materials[0].needsUpdate = true
  })
  materials[6].color.set(parseInt(wheelcolor))
  materials[0].color.set(parseInt(deckcolor))
}

const template1 = () => {
  new THREE.TextureLoader().load(
    'https://static.vecteezy.com/ti/vecteur-libre/p1/4684690-paix-dans-graffiti-art-gratuit-vectoriel.jpg',
    (texture) => {
      //Update Texture
      materials[0].map = texture
      materials[0].needsUpdate = true
    },
  )
  materials[6].color.set(0x52a0f0)
  materials[0].color.set(0xffffff)
}
const template2 = () => {
  new THREE.TextureLoader().load(
    'https://static.standaard.be/Assets/Images_Upload/2017/07/13/c5d28dac-67b9-11e7-8c3c-11de46a62a49.jpg?width=1152&format=jpg',
    (texture) => {
      //Update Texture
      materials[0].map = texture
      materials[0].needsUpdate = true
    },
  )
  materials[6].color.set(0xdcf2d6)
  materials[0].color.set(0xffffff)
}
const template3 = () => {
  new THREE.TextureLoader().load(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxdNIqmDF7sBA0V7GmkbElkuXFbRO-KRGUimhIWlaH7X3zZOvAjv7b3sTCZ6G0GPJsp_A&usqp=CAU',
    (texture) => {
      //Update Texture
      materials[0].map = texture
      materials[0].needsUpdate = true
    },
  )
  materials[6].color.set(0xff9500)
  materials[0].color.set(0xffffff)
}

const btn1 = document.querySelector('#template1')
//console.log(btn1)
btn1.addEventListener('click', () => {
  console.log('template1')
  template1()
})

const btn2 = document.querySelector('#template2')
//console.log(btn2)
btn2.addEventListener('click', () => {
  console.log('template2')
  template2()
})

const btn3 = document.querySelector('#template3')
//console.log(btn3)
btn3.addEventListener('click', () => {
  console.log('template3')
  template3()
})

const tick = () => {
  renderer.render(scene, camera)
  controls.update()

  window.requestAnimationFrame(tick)
}
tick()
