import { log } from "./tools.js";
import * as THREE from "./three.module.js"
import Renderer from "./renderer.js";
import World from "./world.js";

class App {
	
	static init() {
		
		{
			App.log = log;
			App.THREE = THREE;

			App.debug = undefined;
			App.shadows = true;
			App.smooth = 0;
			App.ambient_color = new THREE.Color("rgb(240, 240, 220)");
			App.fog_color = new THREE.Color("rgb(240, 240, 220)");
			App.shadow_map_size = 1024;
			App.shadow_camera_size = 20;
			App.near = 0.1;
			App.fov = 50;
			App.far = 50;
			App.fog = 0.2;
		}

		Renderer.init();
		World.init();
		
		
	}

	static onresize() {
		// App.camera.aspect = window.innerWidth / window.innerHeight;
		// App.camera.updateProjectionMatrix();
	}

	static onload() {
		log(document.URL);
		if(navigator.userAgent
			.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
			log("Mobile platform");
			document.addEventListener("deviceready", App.ondeviceready, false);
		} else {
			log("Browser platform");
			App.ondeviceready();
		}
	}

	static ondeviceready() {
		log("Device ready");
		App.init();
	}
}

export default App;

window.addEventListener ( "resize", App.onresize );
window.addEventListener ( "load", App.onload );