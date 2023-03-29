import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  canvas: document.getElementById('bg')
});

renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


// Crear una luz direccional
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 8);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;
// Agregar la luz a la escena
escena.add(directionalLight);


// Cargar el material (.mtl) asociado al modelo
const mtlLoader = new MTLLoader();
mtlLoader.load('12221_Cat_v1_l3.mtl', function (materials) {
  materials.preload();

  // Cargar el objeto (.obj) con el material cargado anteriormente
  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load('12221_Cat_v1_l3.obj', function (object) {
    // Agregar el modelo a la escena
    escena.add(object);

    // Ajustar la posición y escala del modelo
    object.position.set(0, 0, 0);
    object.scale.set(2, 2, 2);

    // Cargar la textura y asignarla al material
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('Cat_bump.jpg');
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material.map = texture;
      }
    });

    
    // Clonar el modelo y ajustar su posición
const clonedObject = object.clone();
clonedObject.position.x = 150;

// Agregar el modelo clonado a la escena
escena.add(clonedObject);

    // Clonar el modelo y ajustar su posición
    const clonedObject2 = object.clone();
    clonedObject2.position.x = -150;
    
    // Agregar el modelo clonado a la escena
    escena.add(clonedObject2);

    
    // Animar la escena
    function animate() {
      requestAnimationFrame(animate);
      object.rotation.z += 0.02;
      camara.position.set(0, -160, 150);
camara.lookAt(escena.position);


      renderer.render(escena, camara);
    }
    animate();
  });
});

camara.position.setZ(150);
