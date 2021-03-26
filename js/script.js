// Three JS Template
//----------------------------------------------------------------- BASIC parameters
var akarsh = document.querySelector('#background')
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );

if (window.innerWidth > 800) {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.needsUpdate = true;
  //renderer.toneMapping = THREE.ReinhardToneMapping;
  //console.log(window.innerWidth);
};
//---

akarsh.appendChild( renderer.domElement );

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
};

var camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 500 );

camera.position.set(0, 2, 14);

var scene = new THREE.Scene();
var city = new THREE.Object3D();
var smoke = new THREE.Object3D();
var town = new THREE.Object3D();

var createCarPos = true;
var uSpeed = 0.001;

//----------------------------------------------------------------- FOG background




var gradients = {
  0 : ['#f70707', '#ff0062'],
  1 : ['#FDFC47', '#24FE41'],
  2 : ['#FF416C','#FF4B2B'],
  3 : ['#C02425','#F0CB35'],
  4 : ['#ED213A', '#93291E'],
  5 : ['#bc4e9c', '#f80759'],
  6 : ['#bc4e9c','#f80759'],
  7 : ['#7F00FF','#E100FF'],
  8 : ['#004e92','#3a7bd5'],
  9 : ['#00bf8f','#0b8793'],
}


var picker =  Math.floor(Math.random() * 10); 
var gradientKey = Object.keys(gradients) 

var randomColor = gradients[gradientKey[picker]][0];
console.log(randomColor);

//Math.floor(Math.random()*16777215).toString(16);
var complement = gradients[gradientKey[picker]][1];

var abtbtn = document.querySelector('.btn');
abtbtn.style.borderColor = randomColor;


//background: linear-gradient(-45deg,#f70707 ,#ff0062);

var css = `

.btn:hover{ background: linear-gradient(-45deg,  `+ randomColor +` , ` + complement +`);}

.contactForm .row100 .inputBx100 label::after{
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  border-bottom: 3px solid ` + randomColor +`;
  left: 0px;
  bottom: -1px;
  text-align: left;
  transform: translateX(-100%);  
  transition: transform 0.5s ease;
}

.contactForm .row100 .inputBx50 input:focus + .label-name .content-name,
.contactForm .row100 .inputBx50 input:valid + .label-name .content-name
{
    transform: translateY(-120%);
    color: `+ randomColor +`;
    font-size: 14px;
}

.contactForm .row100 .inputBx50 label::after{
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  border-bottom: 3px solid `+ randomColor +`;
  left: 0px;
  bottom: -1px;
  text-align: left;
  transform: translateX(-100%);  
  transition: transform 0.3s ease;
}

.contactForm .row100 button[type="submit"]
{
    background: none;
    position: relative;
    color: #fff;
    width: 120px;
    height: 40px;
    border: 1px solid `+ randomColor +`;
    font-size: 17px;
    border-radius: 4px;
    transition: 0.9s;
    overflow: hidden;
    
}


.contactForm .row100 button[type="submit"]:hover
{
  background: linear-gradient(-45deg,  `+ randomColor +` , ` + complement +`);
   
}

::-webkit-scrollbar-thumb{
  background: linear-gradient(transparent,`+ randomColor +`);
  border-radius: 6px;

}

  .workBx .projectDemo{
      position: relative;
      background: linear-gradient(-45deg,  `+ randomColor +` , ` + complement +`);
      border-radius: 8px;
      min-height: 250px;
      width: 200px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      margin: 0 auto;
      display: flex;
      justify-content: center;
      transition: all 1s cubic-bezier(.25,.8,.25,1);
     
  }

.contactForm .row100 .inputBx100 textarea:focus + .label-name .content-name,
.contactForm .row100 .inputBx100 textarea:valid + .label-name .content-name
{
  transform: translateY(-350%);
  color:  `+ randomColor +`;
  font-size: 14px;
}
`;

var style = document.createElement('style');

if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

document.getElementsByTagName('head')[0].appendChild(style);








//var setcolor = 0xF02050;
var setcolor = randomColor;
//var setcolor = 0xFF6347;

scene.background = new THREE.Color(setcolor);
scene.fog = new THREE.Fog(setcolor, 10, 16);
//scene.fog = new THREE.FogExp2(setcolor, 0.05);
//----------------------------------------------------------------- RANDOM Function
function mathRandom(num = 8) {
  var numValue = - Math.random() * num + Math.random() * num;
  return numValue;
};
//----------------------------------------------------------------- CHANGE bluilding colors
var setTintNum = true;
function setTintColor() {
  if (setTintNum) {
    setTintNum = false;
    var setColor = 0x000000;
  } else {
    setTintNum = true;
    var setColor = 0x000000;
  };
  //setColor = 0x222222;
  return setColor;
};

//----------------------------------------------------------------- CREATE City

function init() {
  var segments = 2;
  for (var i = 1; i<100; i++) {
    var geometry = new THREE.CubeGeometry(1,0,0,segments,segments,segments);
    var material = new THREE.MeshStandardMaterial({
      color:setTintColor(),
      wireframe:false,
      //opacity:0.9,
      //transparent:true,
      //roughness: 0.3,
      metalness: 1,
      shading: THREE.SmoothShading,
      //shading:THREE.FlatShading,
      side:THREE.DoubleSide});
    var wmaterial = new THREE.MeshLambertMaterial({
      color:0xFFFFFF,
      wireframe:true,
      transparent:true,
      opacity: 0.03,
      side:THREE.DoubleSide/*,
      shading:THREE.FlatShading*/});

    var cube = new THREE.Mesh(geometry, material);
    var wire = new THREE.Mesh(geometry, wmaterial);
    var floor = new THREE.Mesh(geometry, material);
    var wfloor = new THREE.Mesh(geometry, wmaterial);
    
    cube.add(wfloor);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.rotationValue = 0.1+Math.abs(mathRandom(8));
    
    //floor.scale.x = floor.scale.z = 1+mathRandom(0.33);
    floor.scale.y = 0.05;//+mathRandom(0.5);
    cube.scale.y = 0.1+Math.abs(mathRandom(8));
    //TweenMax.to(cube.scale, 1, {y:cube.rotationValue, repeat:-1, yoyo:true, delay:i*0.005, ease:Power1.easeInOut});
    /*cube.setScale = 0.1+Math.abs(mathRandom());
    
    TweenMax.to(cube.scale, 4, {y:cube.setScale, ease:Elastic.easeInOut, delay:0.2*i, yoyo:true, repeat:-1});
    TweenMax.to(cube.position, 4, {y:cube.setScale / 2, ease:Elastic.easeInOut, delay:0.2*i, yoyo:true, repeat:-1});*/
    
    var cubeWidth = 0.9;
    cube.scale.x = cube.scale.z = cubeWidth+mathRandom(1-cubeWidth);
    //cube.position.y = cube.scale.y / 2;
    cube.position.x = Math.round(mathRandom());
    cube.position.z = Math.round(mathRandom());
    
    floor.position.set(cube.position.x, 0/*floor.scale.y / 2*/, cube.position.z)
    
    town.add(floor);
    town.add(cube);
  };
  //----------------------------------------------------------------- Particular
  
  var gmaterial = new THREE.MeshToonMaterial({color:0xFFFF00, side:THREE.DoubleSide});
  var gparticular = new THREE.CircleGeometry(0.01, 3);
  var aparticular = 5;
  
  for (var h = 1; h<300; h++) {
    var particular = new THREE.Mesh(gparticular, gmaterial);
    particular.position.set(mathRandom(aparticular), mathRandom(aparticular),mathRandom(aparticular));
    particular.rotation.set(mathRandom(),mathRandom(),mathRandom());
    smoke.add(particular);
  };
  
  var pmaterial = new THREE.MeshPhongMaterial({
    color:0x000000,
    side:THREE.DoubleSide,
    roughness: 10,
    metalness: 0.6,
    opacity:0.9,
    transparent:true});
  var pgeometry = new THREE.PlaneGeometry(60,60);
  var pelement = new THREE.Mesh(pgeometry, pmaterial);
  pelement.rotation.x = -90 * Math.PI / 180;
  pelement.position.y = -0.001;
  pelement.receiveShadow = true;
  //pelement.material.emissive.setHex(0xFFFFFF + Math.random() * 100000);

  city.add(pelement);
};

//----------------------------------------------------------------- MOUSE function
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(), INTERSECTED;
var intersected;

function onMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
};
function onDocumentTouchStart( event ) {
  if ( event.touches.length == 1 ) {
    event.preventDefault();
    mouse.x = event.touches[ 0 ].pageX -  window.innerWidth / 2;
    mouse.y = event.touches[ 0 ].pageY - window.innerHeight / 2;
  };
};
function onDocumentTouchMove( event ) {
  if ( event.touches.length == 1 ) {
    event.preventDefault();
    mouse.x = event.touches[ 0 ].pageX -  window.innerWidth / 2;
    mouse.y = event.touches[ 0 ].pageY - window.innerHeight / 2;
  }
}
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('touchstart', onDocumentTouchStart, false );
window.addEventListener('touchmove', onDocumentTouchMove, false );

//----------------------------------------------------------------- Lights
var ambientLight = new THREE.AmbientLight(0xFFFFFF, 4);
var lightFront = new THREE.SpotLight(0xFFFFFF, 20, 10);
var lightBack = new THREE.PointLight(0xFFFFFF, 0.5);

var spotLightHelper = new THREE.SpotLightHelper( lightFront );
//scene.add( spotLightHelper );

lightFront.rotation.x = 45 * Math.PI / 180;
lightFront.rotation.z = -45 * Math.PI / 180;
lightFront.position.set(5, 5, 5);
lightFront.castShadow = true;
lightFront.shadow.mapSize.width = 6000;
lightFront.shadow.mapSize.height = lightFront.shadow.mapSize.width;
lightFront.penumbra = 0.1;
lightBack.position.set(0,6,0);

smoke.position.y = 2;

scene.add(ambientLight);
city.add(lightFront);
scene.add(lightBack);
scene.add(city);
city.add(smoke);
city.add(town);

//----------------------------------------------------------------- GRID Helper
var gridHelper = new THREE.GridHelper( 60, 120, 0xFF0000, 0x000000);
city.add( gridHelper );

//----------------------------------------------------------------- CAR world
var generateCar = function() {
  
}
//----------------------------------------------------------------- LINES world

var createCars = function(cScale = 2, cPos = 20, cColor = 0xFFFF00) {
  var cMat = new THREE.MeshToonMaterial({color:cColor, side:THREE.DoubleSide});
  var cGeo = new THREE.CubeGeometry(1, cScale/40, cScale/40);
  var cElem = new THREE.Mesh(cGeo, cMat);
  var cAmp = 3;
  
  if (createCarPos) {
    createCarPos = false;
    cElem.position.x = -cPos;
    cElem.position.z = (mathRandom(cAmp));

    TweenMax.to(cElem.position, 3, {x:cPos, repeat:-1, yoyo:true, delay:mathRandom(3)});
  } else {
    createCarPos = true;
    cElem.position.x = (mathRandom(cAmp));
    cElem.position.z = -cPos;
    cElem.rotation.y = 90 * Math.PI / 180;
  
    TweenMax.to(cElem.position, 5, {z:cPos, repeat:-1, yoyo:true, delay:mathRandom(3), ease:Power1.easeInOut});
  };
  cElem.receiveShadow = true;
  cElem.castShadow = true;
  cElem.position.y = Math.abs(mathRandom(5));
  city.add(cElem);
};

var generateLines = function() {
  for (var i = 0; i<60; i++) {
    createCars(0.1, 20);
  };
};

//----------------------------------------------------------------- CAMERA position

var cameraSet = function() {
  createCars(0.1, 20, 0xFFFFFF);
  //TweenMax.to(camera.position, 1, {y:1+Math.random()*4, ease:Expo.easeInOut})
};

//----------------------------------------------------------------- ANIMATE

var animate = function() {
  var time = Date.now() * 0.00005;
  requestAnimationFrame(animate);
  
  city.rotation.y -= ((mouse.x * 8) - camera.rotation.y) * uSpeed;
  city.rotation.x -= (-(mouse.y * 2) - camera.rotation.x) * uSpeed;
  if (city.rotation.x < -0.05) city.rotation.x = -0.05;
  else if (city.rotation.x>1) city.rotation.x = 1;
  var cityRotation = Math.sin(Date.now() / 5000) * 13;
  //city.rotation.x = cityRotation * Math.PI / 180;
  
  //console.log(city.rotation.x);
  //camera.position.y -= (-(mouse.y * 20) - camera.rotation.y) * uSpeed;;
  
  for ( let i = 0, l = town.children.length; i < l; i ++ ) {
    var object = town.children[ i ];
    //object.scale.y = Math.sin(time*50) * object.rotationValue;
    //object.rotation.y = (Math.sin((time/object.rotationValue) * Math.PI / 180) * 180);
    //object.rotation.z = (Math.cos((time/object.rotationValue) * Math.PI / 180) * 180);
  }
  
  smoke.rotation.y += 0.01;
  smoke.rotation.x += 0.01;
  
  camera.lookAt(city.position);
  renderer.render( scene, camera );  
}

//----------------------------------------------------------------- START functions
generateLines();
init();
animate();