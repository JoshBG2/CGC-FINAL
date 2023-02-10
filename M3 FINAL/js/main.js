import * as THREE from './three.module.js'
import {OrbitControls} from './OrbitControls.js'
import {GLTFLoader} from './GLTFLoader.js'

//Setting up Scene
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( 1920, 1080 );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, 1920 / 1080, 1, 10000 );
const controls = new OrbitControls( camera, renderer.domElement );
scene.background = new THREE.Color(0x000000);

camera.position.set( 8.5, 8.5, 8.5 );
controls.update();


//Setting Textures
const roadTexture = new THREE.TextureLoader().load( 'assets/textures/road.jpg');
const road2Texture = new THREE.TextureLoader().load( 'assets/textures/road2.jpg');
const riverTexture = new THREE.TextureLoader().load( 'assets/textures/river.jpg');
const grassTexture = new THREE.TextureLoader().load( 'assets/textures/grass.jpg');


//Setting Particles
let smoke1, smoke2, smoke3, smoke4, smoke5, smoke6, smoke7, smokeGeo;

function particles() {
	const points = [];

	//setting coordinates
	for (let i = 0; i < 5; i++) {
		let smoke = new THREE.Vector3(
			1,
			(Math.random() * 1) + 0.1,
			1
		  );
		  points.push(smoke);
	}

	smokeGeo = new THREE.BufferGeometry().setFromPoints(points);
	let sprite = new THREE.TextureLoader().load("assets/images/smoke.png");
	let smokeMaterial = new THREE.PointsMaterial({color: 0xC1BFBF, size: 0.2, map: sprite,});

	smoke1 = new THREE.Points(smokeGeo, smokeMaterial);
	smoke2 = new THREE.Points(smokeGeo, smokeMaterial);
	smoke3 = new THREE.Points(smokeGeo, smokeMaterial);
	smoke4 = new THREE.Points(smokeGeo, smokeMaterial);
	smoke5 = new THREE.Points(smokeGeo, smokeMaterial);
	smoke6 = new THREE.Points(smokeGeo, smokeMaterial);
	smoke7 = new THREE.Points(smokeGeo, smokeMaterial);

	smoke1.position.set( -2.85,2.2,2.4 );
	smoke2.position.set( -4.75,2.2,2.4 );
	smoke3.position.set( -2.85,2.2,-1.4 )
	smoke4.position.set( -4.75,2.2,-4.75 );
	smoke5.position.set( 2.4,2.2,-4.75 );
	smoke6.position.set( 2.4,2.2,-2.85 );
	smoke7.position.set( -1.4,2.2,-2.85 );

	scene.add(smoke1,smoke2,smoke3,smoke4,smoke5,smoke6,smoke7);

}  

function animateParticles() {

	smokeGeo.verticesNeedUpdate = true;

	smoke1.position.y += 0.005;
	smoke2.position.y += 0.005;
	smoke3.position.y += 0.005;
	smoke4.position.y += 0.005;
	smoke5.position.y += 0.005;
	smoke6.position.y += 0.005;
	smoke7.position.y += 0.005;

	if(smoke1.position.y >= 3.5 && smoke2.position.y >= 3.5 && smoke3.position.y >= 3.5
	&& smoke4.position.y >= 3.5 && smoke5.position.y >= 3.5 && smoke6.position.y >= 3.5 && smoke7.position.y >= 3.5) {
		smoke1.position.y = 2.2;
		smoke2.position.y = 2.2;
		smoke3.position.y = 2.2;
		smoke4.position.y = 2.2;
		smoke5.position.y = 2.2;
		smoke6.position.y = 2.2;
		smoke7.position.y = 2.2;	
	}

	smoke1.position.y += 0.005;
	smoke2.position.y += 0.005;
	smoke3.position.y += 0.005;
	smoke4.position.y += 0.005;
	smoke5.position.y += 0.005;
	smoke6.position.y += 0.005;
	smoke7.position.y += 0.005;


}

 
//Setting Lighting

function lighting() {

const torchlight1 = new THREE.PointLight( 0xFFE4C4, 1, 15 );
torchlight1.position.set( -1.75,3,3.4 );

const torchlight2 = new THREE.PointLight( 0xFFE4C4, 1, 15 );
torchlight2.position.set( -4.4,3,3.4 );

const torchlight3 = new THREE.PointLight( 0xFFE4C4, 1, 15 );
torchlight3.position.set( -1.75,3,-0.4 );

const torchlight4 = new THREE.PointLight( 0xFFE4C4, 1, 15 );
torchlight4.position.set( -4,3,-4.3 );

const torchlight5 = new THREE.PointLight( 0xFFE4C4, 1, 15 );
torchlight5.position.set( 3.4,3,-4.3 );

const torchlight6 = new THREE.PointLight( 0xFFE4C4, 1, 15 );
torchlight6.position.set( 3.4,3,-1.2 );

const torchlight7 = new THREE.PointLight( 0xFFE4C4, 1, 15 );
torchlight7.position.set( 0.2,3,-1.2  );


scene.add( torchlight1,torchlight2,torchlight3,torchlight4,torchlight5,torchlight6,torchlight7 ); 

}


//Base
function base() {

const base_geometry = new THREE.BoxGeometry( 7, 0.1, 7 );
const base_material = new THREE.MeshLambertMaterial( {color: 0x002e51, map: riverTexture} );
const base = new THREE.Mesh( base_geometry, base_material );

const ground_geometry = new THREE.BoxGeometry( 7, 0.7, 7 );
const ground_material = new THREE.MeshLambertMaterial( {color: 0x3984a, map: grassTexture} );
const ground = new THREE.Mesh( ground_geometry, ground_material );
ground.position.y = 0.4; 

const river_geometry = new THREE.BoxGeometry( 2.1, 0.8, 7.6 );
const river_material = new THREE.MeshLambertMaterial( {color: 0x002e51, map: riverTexture} );
const river = new THREE.Mesh( river_geometry, river_material );
river.position.set(0,0.351,0);
river.rotation.y=3.94;

scene.add( base,ground,river );

}


//Lane
function lane() {

const lane1_geometry = new THREE.BoxGeometry( 1.5, 1.5, 7.1 );
const lane1_material = new THREE.MeshLambertMaterial( {color: 0xBBB9B9, map: road2Texture} );
const lane1 = new THREE.Mesh( lane1_geometry, lane1_material );
lane1.position.set(-2.75,0.7999,0);

const lane2_geometry = new THREE.BoxGeometry( 7.1, 1.5, 1.5 );
const lane2_material = new THREE.MeshLambertMaterial( {color: 0xBBB9B9, map: roadTexture} );
const lane2 = new THREE.Mesh( lane2_geometry, lane2_material );
lane2.position.set(0,0.8,-2.75);

const lane3_geometry = new THREE.BoxGeometry( 3, 1.5, 1.5 );
const lane3_material = new THREE.MeshLambertMaterial( {color: 0xBBB9B9, map: roadTexture} );
const lane3 = new THREE.Mesh( lane3_geometry, lane3_material );
lane3.position.set(-1.8,0.7998,-1.8);
lane3.rotation.y = 3.9;

const slope_geometry = new THREE.CylinderGeometry( 1, 1, 2.9, 3 );
const slope_material = new THREE.MeshLambertMaterial( {color: 0xBBB9B9, map: roadTexture} );
const slope = new THREE.Mesh( slope_geometry, slope_material );
slope.position.set(-1.27,0.54,-1.27);
slope.rotation.set(1.57,3.14,2.33);

const cover_geometry = new THREE.BoxGeometry( 0.7, 0.2, 0.3 );
const cover_material = new THREE.MeshLambertMaterial( {color: 0x616161, map: roadTexture} );
const cover = new THREE.Mesh( cover_geometry, cover_material );
cover.position.set(-2.8,1.65,-2.8);
cover.rotation.y = 3.9;

scene.add( lane1,lane2,lane3,slope,cover );

}


//Lane Rails
function laneRails() {

const rail_out1_geometry = new THREE.BoxGeometry( 0.5, 1.9, 7.6 );
const rail_out1_material = new THREE.MeshLambertMaterial( {color: 0x616161, map: roadTexture} );
const rail_out1 = new THREE.Mesh( rail_out1_geometry, rail_out1_material );
rail_out1.position.set(-3.75,0.8999,-0.2);

const rail_out2_geometry = new THREE.BoxGeometry( 7.6, 1.9, 0.5  );
const rail_out2_material = new THREE.MeshLambertMaterial( {color: 0x616161, map: roadTexture} );
const rail_out2 = new THREE.Mesh( rail_out2_geometry, rail_out2_material );
rail_out2.position.set(-0.2,0.9,-3.75);

const rail_in1_geometry = new THREE.BoxGeometry( 0.3, 1.9, 4.2 );
const rail_in1_material = new THREE.MeshLambertMaterial( {color: 0x616161, map: roadTexture} );
const rail_in1 = new THREE.Mesh( rail_in1_geometry, rail_in1_material );
rail_in1.position.set(-1.85,0.9,1.5);

const rail_in2_geometry = new THREE.BoxGeometry( 4.2, 1.9, 0.3 );
const rail_in2_material = new THREE.MeshLambertMaterial( {color: 0x616161, map: roadTexture} );
const rail_in2 = new THREE.Mesh( rail_in2_geometry, rail_in2_material );
rail_in2.position.set(1.5,0.9,-1.85);

scene.add( rail_out1,rail_out2,rail_in1,rail_in2 );

}

// Importing 3d Objects


//Trees
function trees() {
//Side 1
const tree1 = new GLTFLoader();
tree1.load('./assets/imports/tree/tree.gltf', function(tree) {
	tree.scene.scale.set(0.6, 0.6, 0.6);
	tree.scene.position.set(-1.1,0.7,0.7);
	scene.add(tree.scene);
});
const tree2 = new GLTFLoader();
tree2.load('./assets/imports/tree/tree.gltf', function(tree) {
	tree.scene.scale.set(0.6, 0.6, 0.6);
	tree.scene.position.set(-1.4,0.7,1.5);
	scene.add(tree.scene);
});
const tree3 = new GLTFLoader();
tree3.load('./assets/imports/tree/tree.gltf', function(tree) {
	tree.scene.scale.set(0.6, 0.6, 0.6);
	tree.scene.position.set(-0.5,0.7,1.6);
	scene.add(tree.scene);
});
const tree4 = new GLTFLoader();
tree4.load('./assets/imports/tree/tree.gltf', function(tree) {
	tree.scene.scale.set(0.6, 0.6, 0.6);
	tree.scene.position.set(-1,0.7,2.3);
	scene.add(tree.scene);
});
const tree5 = new GLTFLoader();
tree5.load('./assets/imports/tree/tree.gltf', function(tree) {
	tree.scene.scale.set(0.6, 0.6, 0.6);
	tree.scene.position.set(0.1,0.7,2.3);
	scene.add(tree.scene);
});
const tree6 = new GLTFLoader();
tree6.load('./assets/imports/tree/tree.gltf', function(tree) {
	tree.scene.scale.set(0.6, 0.6, 0.6);
	tree.scene.position.set(-1.4,0.7,3);
	scene.add(tree.scene);
});
const tree7 = new GLTFLoader();
tree7.load('./assets/imports/tree/tree.gltf', function(tree) {
	tree.scene.scale.set(0.6, 0.6, 0.6);
	tree.scene.position.set(-0.4,0.7,3.1);
	scene.add(tree.scene);
});
const tree8 = new GLTFLoader();
tree8.load('./assets/imports/tree/tree.gltf', function(tree) {
	tree.scene.scale.set(0.6, 0.6, 0.6);
	tree.scene.position.set(0.9,0.7,3);
	scene.add(tree.scene);
});

//Side 2
const tree9 = new GLTFLoader();
tree9.load('./assets/imports/tree/tree.gltf', function(tree) {
	tree.scene.scale.set(0.6, 0.6, 0.6);
	tree.scene.position.set(0.7,0.7,-1.3);
	scene.add(tree.scene);
});
const tree10 = new GLTFLoader();
tree10.load('./assets/imports/tree/tree.gltf', function(tree) {
	tree.scene.scale.set(0.6, 0.6, 0.6);
	tree.scene.position.set(1.9,0.7,-1.2);
	scene.add(tree.scene);
});
const tree11 = new GLTFLoader();
tree11.load('./assets/imports/tree/tree.gltf', function(tree) {
	tree.scene.scale.set(0.6, 0.6, 0.6);
	tree.scene.position.set(3,0.7,0.7);
	scene.add(tree.scene);
});
const tree12 = new GLTFLoader();
tree12.load('./assets/imports/tree/tree.gltf', function(tree) {
	tree.scene.scale.set(0.6, 0.6, 0.6);
	tree.scene.position.set(2.2,0.7,-0.1);
	scene.add(tree.scene);
});
const tree13 = new GLTFLoader();
tree13.load('./assets/imports/tree/tree.gltf', function(tree) {
	tree.scene.scale.set(0.6, 0.6, 0.6);
	tree.scene.position.set(2.9,0.7,-0.8);
	scene.add(tree.scene);
});
const tree14 = new GLTFLoader();
tree14.load('./assets/imports/tree/tree.gltf', function(tree) {
	tree.scene.scale.set(0.6, 0.6, 0.6);
	tree.scene.position.set(1.3,0.7,-0.6);
	scene.add(tree.scene);
});

}


//Torches
function torches() {

const torch = new GLTFLoader();
torch.load('./assets/imports/torch/torch.gltf', function(torch) {
	torch.scene.scale.set(8,8,8)
	torch.scene.position.set(-1.85,1.4,3.4);
	scene.add(torch.scene);
});
const torch2 = new GLTFLoader();
torch2.load('./assets/imports/torch/torch.gltf', function(torch) {
	torch.scene.scale.set(8,8,8)
	torch.scene.position.set(-3.75,1.4,3.4);
	scene.add(torch.scene);
});
const torch3 = new GLTFLoader();
torch3.load('./assets/imports/torch/torch.gltf', function(torch) {
	torch.scene.scale.set(8,8,8)
	torch.scene.position.set(-1.85,1.4,-0.4);
	scene.add(torch.scene);
});
const torch4 = new GLTFLoader();
torch4.load('./assets/imports/torch/torch.gltf', function(torch) {
	torch.scene.scale.set(8,8,8)
	torch.scene.position.set(-3.75,1.4,-3.75);
	scene.add(torch.scene);
});
const torch5 = new GLTFLoader();
torch5.load('./assets/imports/torch/torch.gltf', function(torch) {
	torch.scene.scale.set(8,8,8)
	torch.scene.position.set(3.4,1.4,-3.75);
	scene.add(torch.scene);
});
const torch6 = new GLTFLoader();
torch6.load('./assets/imports/torch/torch.gltf', function(torch) {
	torch.scene.scale.set(8,8,8)
	torch.scene.position.set(3.4,1.4,-1.85);
	scene.add(torch.scene);
});
const torch7 = new GLTFLoader();
torch7.load('./assets/imports/torch/torch.gltf', function(torch) {
	torch.scene.scale.set(8,8,8)
	torch.scene.position.set(-0.4,1.4,-1.85);
	scene.add(torch.scene);
});

}

//Towers
function towers() {

const tower1 = new GLTFLoader();
tower1.load('./assets/imports/tower/tower.gltf', function(tower) {
	tower.scene.scale.set(0.12,0.12,0.12)
	tower.scene.position.set(-3.1,1.4,0.9);
	tower.scene.rotation.y=4.6;
	scene.add(tower.scene);
}); 
const tower2 = new GLTFLoader();
tower2.load('./assets/imports/tower/tower.gltf', function(tower) {
	tower.scene.scale.set(0.12,0.12,0.12)
	tower.scene.position.set(0.8,1.4,-3.1);
	scene.add(tower.scene);
}); 

}

//Bushes
function bushes() {

const bush1 = new GLTFLoader();
bush1.load('./assets/imports/bush/bush.gltf', function(bush) {
	bush.scene.scale.set(0.6,0.4,0.4)
	bush.scene.position.set(-2.6,1.55,-2.6);
	bush.scene.rotation.y = 3.9;
	scene.add(bush.scene);
}); 
const bush2 = new GLTFLoader();
bush2.load('./assets/imports/bush/bush.gltf', function(bush) {
	bush.scene.scale.set(0.8,0.4,0.4)
	bush.scene.position.set(-3.3,1.55,-1.5);
	bush.scene.rotation.y = -1.7;
	scene.add(bush.scene);
}); 
const bush3 = new GLTFLoader();
bush3.load('./assets/imports/bush/bush.gltf', function(bush) {
	bush.scene.scale.set(0.8,0.4,0.4)
	bush.scene.position.set(-1.45,1.55,-3.3);
	bush.scene.rotation.y = 0;
	scene.add(bush.scene);
}); 

}

particles();
lighting();
base();
lane();
laneRails();
trees();
torches();
towers();
bushes();

function animate() {

	requestAnimationFrame( animate );

	animateParticles();

	controls.update();

	renderer.render( scene, camera );

}
animate();
