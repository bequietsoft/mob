import * as THREE from "./three.module.js"
import App from "./app.js";
import {helper} from "./primitives.js";
import {box} from "./primitives.js";
import {sphere} from "./primitives.js";
import {mat} from "./material.js";
import {V} from "./vectors.js";
import {V0} from "./vectors.js";

class World {
	
	static init() {

		App.scene = new THREE.Scene();
		App.scene.background = new THREE.Color(App.ambient_color);
		App.scene.fog = new THREE.Fog(App.fog_color, App.far * App.fog, App.far);
		
		App.light00 = new THREE.AmbientLight(App.ambient_color, 0.25);

		App.light01 = new THREE.DirectionalLight(0xffffff, 1);
		App.light01.position.set(20, 20, 20);
		App.light01.castShadow = true;
		App.light01.shadow.mapSize.width = App.shadow_map_size;
		App.light01.shadow.mapSize.height = App.shadow_map_size;
		// App.light01.shadow.camera.left = -App.shadow_camera_size / 2;
		// App.light01.shadow.camera.bottom = -App.shadow_camera_size / 2;
		// App.light01.shadow.camera.right = App.shadow_camera_size / 2;
		// App.light01.shadow.camera.top = App.shadow_camera_size / 2;
		// App.light01.shadow.camera.near = App.near;    
		// App.light01.shadow.camera.far = App.far;

		App.world = new THREE.Object3D();
			var geometry = new THREE.PlaneBufferGeometry(1, 1);
			var planeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
			var ground = new THREE.Mesh(geometry, planeMaterial);
				ground.name = 'ground';
				ground.position.set(0, 0, 0);
				ground.rotation.x = - Math.PI/2;
				ground.scale.set(App.far/2, App.far/2, 1);
				ground.castShadow = false;
				ground.receiveShadow = true;
		App.world.add(ground);
		
		App.camera = new THREE.PerspectiveCamera();
			App.camera.root = new THREE.Object3D();
			App.camera.target = new THREE.Object3D();
			App.camera.root.add(App.camera.target);
			App.camera.target.add(App.camera);
			App.camera.position.x -= 10;
			App.camera.target.rotateZ(-Math.PI/10); 
			App.camera.lookAt(App.camera.root.position);

		App.scene.add(App.camera.root);
		App.scene.add(App.light00);
		App.scene.add(App.light01);
		App.scene.add(App.world);	
		
		//World.helpers();
		var m = mat("phong", "white");
		App.scene.add(box(1, 1, 1, V(1, 0.5, 0), V0, m, true));
		App.scene.add(sphere(0.5, V(0, 0.5, 0), V0, m, true, 32));
	}

	static helpers() {
		App.world.add(helper({color:0x00ff00}));
		App.camera.root.add(helper(1.5, 1.5, 1.5, "green"));
		App.camera.target.add(helper(1.5, 1.5, 1.5, "red"));
	}

}

export default World;
