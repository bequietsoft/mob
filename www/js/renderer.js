import * as THREE from "./three.module.js"
import App from "./app.js";

export default class Renderer  {

	static init() {

		Renderer.instance = new THREE.WebGLRenderer({ antialias: true });
		Renderer.instance.depth = App.far;
		Renderer.instance.setClearColor(App.ambient_color, 1);
		Renderer.instance.shadowMap.enabled = true;
		Renderer.instance.shadowMap.type = THREE.PCFShadowMap;
		Renderer.instance.shadowMapBias = 0.00001;
		Renderer.instance.shadowMapDarkness = 0.5;
		Renderer.instance.shadowMapWidth = 128;
		Renderer.instance.shadowMapHeight = 128;
		Renderer.instance.domElement.id = "canvas";
		Renderer.instance.setClearColor(App.ambient_color, 1);
		document.body.appendChild(Renderer.instance.domElement);
	}

	static resize() {
		if(Renderer.width != window.innerWidth || Renderer.height != window.innerHeight) {
			Renderer.width = window.innerWidth;
			Renderer.height = window.innerHeight;
			Renderer.instance.setSize(Renderer.width, Renderer.height);
		}
	}

	static update() {
		Renderer.resize();
		Renderer.instance.clear();
		Renderer.instance.render(App.scene, App.camera);
	}
}


