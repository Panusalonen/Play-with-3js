var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    200
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

////// EARTH //////

var geometry = new THREE.SphereGeometry(10, 32, 32);
var material = new THREE.MeshPhongMaterial();
material.map = new THREE.TextureLoader().load("/assets/earthmap4k.jpg");
var earthMesh = new THREE.Mesh(geometry, material);

camera.position.z = 30;

scene.add(earthMesh);

////// MOON //////

var moonGeometry = new THREE.SphereGeometry(2, 32, 32);
var moonMaterial = new THREE.MeshPhongMaterial();
moonMaterial.map = new THREE.TextureLoader().load("/assets/moonmap4k.jpg");
var moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);

moonMesh.position.x = 15;

scene.add(moonMesh);

////// MARS //////

var marsGeometry = new THREE.SphereGeometry(4, 32, 32);
var marsMaterial = new THREE.MeshPhongMaterial();
marsMaterial.map = new THREE.TextureLoader().load("/assets/marsmap1k.jpg");
var marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);

marsMesh.position.y = 20;

scene.add(marsMesh);

var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.enableZoom = false;

var controls = new function() {
    this.textColor = 0xffff00;
    this.guiRotationX = 0.005;
    this.guiRotationY = 0.005;
}();

var gui = new dat.GUI();
gui.add(controls, "guiRotationX", 0, 0.2);
gui.add(controls, "guiRotationY", 0, 0.2);

gui.addColor(controls, "textColor").onChange(function(e) {
    textMesh.material.color = new THREE.Color(e);
});

var moonRadius = 20;
var moonTheta = 0;
var moonDTheta = (8 * Math.PI) / 2000;

var marsRadius = 20;
var marsTheta = 0;
var marsDTheta = (2 * Math.PI) / 2000;

var render = function() {
    requestAnimationFrame(render);
    earthMesh.rotation.x += controls.guiRotationX;
    earthMesh.rotation.y += controls.guiRotationY;

    moonMesh.rotation.x += controls.guiRotationX;
    moonMesh.rotation.y += controls.guiRotationY;

    marsMesh.rotation.x += controls.guiRotationX;
    marsMesh.rotation.y += controls.guiRotationY;

    moonTheta += moonDTheta;
    moonMesh.position.x = moonRadius * Math.cos(moonTheta);
    moonMesh.position.z = moonRadius * Math.sin(moonTheta);

    marsTheta += marsDTheta;
    marsMesh.position.x = marsRadius * Math.cos(marsTheta);
    marsMesh.position.z = marsRadius * Math.sin(marsTheta);

    renderer.render(scene, camera);
};
render();

var imagePrefix = "/assets/";
var urls = [
    "space.jpg",
    "space.jpg",
    "space.jpg",
    "space.jpg",
    "space.jpg",
    "space.jpg"
];
var skyBox = new THREE.CubeTextureLoader().setPath(imagePrefix).load(urls);
scene.background = skyBox;

////// 3D TEXT //////

var loader = new THREE.FontLoader();

loader.load("/assets/fonts/optimer_bold.typeface.json", function(font) {
    var geometry = new THREE.TextGeometry("Yo Moma!", {
        font: font,
        size: 2,
        height: 1,
        curveSegments: 4
        // bevelEnabled: true,
        // bevelThickness: 1,
        // bevelSize: 1,
        // bevelSegments: 1
    });
    var textMaterial = new THREE.MeshPhongMaterial({
        color: 0xffff00
    });
    textMesh = new THREE.Mesh(geometry, textMaterial);
    textMesh.position.y = 15;
    scene.add(textMesh);
});

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
