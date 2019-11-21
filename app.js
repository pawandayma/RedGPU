import RedGPU from "./src/RedGPU.js";
import RedMesh from "./src/object/RedMesh.js";
import RedStandardMaterial from "./src/material/RedStandardMaterial.js";
import RedRender from "./src/renderer/RedRender.js";
import RedBitmapMaterial from "./src/material/RedBitmapMaterial.js";
import RedCamera from "./src/controller/RedCamera.js";
import RedSphere from "./src/primitives/RedSphere.js";
import RedBitmapTexture from "./src/resources/RedBitmapTexture.js";
import RedBox from "./src/primitives/RedBox.js";
import RedCylinder from "./src/primitives/RedCylinder.js";
import RedPlane from "./src/primitives/RedPlane.js";
import RedScene from "./src/RedScene.js";
import RedView from "./src/RedView.js";


(async function () {
	const cvs = document.createElement('canvas');
	const glslangModule = await import(/* webpackIgnore: true */ 'https://unpkg.com/@webgpu/glslang@0.0.9/dist/web-devel/glslang.js');
	document.body.appendChild(cvs);

	const glslang = await glslangModule.default();
	console.log(glslang);
	let redGPU = new RedGPU(cvs, glslang);

	requestAnimationFrame(function () {
		let MAX = 1000;
		let i = MAX;
		let tView;
		let tScene = new RedScene();
		tView = new RedView(tScene, new RedCamera())

		redGPU.view = tView
		let testTextureList = [
			new RedBitmapTexture(redGPU, 'assets/UV_Grid_Sm.jpg'),
			new RedBitmapTexture(redGPU, 'assets/Brick03_col.jpg'),
			new RedBitmapTexture(redGPU, 'assets/Brick03_nrm.jpg'),
			new RedBitmapTexture(redGPU, 'assets/crate.png')
		];

		let tMat1 = new RedBitmapMaterial(redGPU, testTextureList[0]);
		let tMat2 = new RedStandardMaterial(redGPU, testTextureList[1]);
		let tMat3 = new RedStandardMaterial(redGPU, testTextureList[1], testTextureList[2]);
		let tMat4 = new RedStandardMaterial(redGPU, testTextureList[0], testTextureList[2]);

		if (i > 2000) i = 2000;

		let randomGeometry = function () {
			return Math.random() > 0.5
				? new RedSphere(redGPU, 1, 16, 16, 16) :
				Math.random() > 0.5
					? new RedCylinder(redGPU, 0, 1, 2, 16, 16) :
					Math.random() > 0.5 ? new RedBox(redGPU) : new RedPlane(redGPU)
		}
		while (i--) {
			let testMesh = new RedMesh(
				redGPU,
				randomGeometry(),
				i > MAX / 2 ? tMat1 : Math.random() > 0.5 ? tMat2 : Math.random() > 0.5 ? tMat3 : tMat4
			);
			testMesh.x = Math.random() * 30 - 15;
			testMesh.y = Math.random() * 30 - 15;
			testMesh.z = Math.random() * 30 - 15;
			testMesh.rotationX = testMesh.rotationY = testMesh.rotationZ = Math.random() * 360;
			// testMesh.scaleX = testMesh.scaleY = testMesh.scaleZ = Math.random();
			tScene.addChild(testMesh)

		}

		let renderer = new RedRender();
		let render = function (time) {

				tView.camera.x = Math.sin(time / 3000) * 20;
				tView.camera.y = Math.cos(time / 4000) * 20;
				tView.camera.z = Math.cos(time / 3000) * 20;
				tView.camera.lookAt(0, 0, 0);
				renderer.render(time, redGPU, tView);
				let i = tView.scene.children.length;
				let tChildren = tView.scene.children
				while (i--) {
					tChildren[i].rotationX += 1;
					tChildren[i].rotationY += 1;
					tChildren[i].rotationZ += 1;
				}


			requestAnimationFrame(render);
		};
		requestAnimationFrame(render);
		setTestUI(redGPU, tScene)
	}, 1000);
})();
let setTestUI = function (redGPU, tScene) {
	let testUI = new dat.GUI({});
	let testData = {
		useDepthTest: true,
		depthTestFunc: "less-equal",
		cullMode: "back",
		primitiveTopology: "triangle-list"
	};
	testUI.add(testData, 'useDepthTest').onChange(v => tScene.children.forEach(tMesh => tMesh.useDepthTest = v));

	testUI.add(testData, 'depthTestFunc', [
		"never",
		"less",
		"equal",
		"less-equal",
		"greater",
		"not-equal",
		"greater-equal",
		"always"
	]).onChange(v => tScene.children.forEach(tMesh => tMesh.depthTestFunc = v));
	testUI.add(testData, 'cullMode', [
		"none",
		"front",
		"back"
	]).onChange(v => tScene.children.forEach(tMesh => tMesh.cullMode = v));

	testUI.add(testData, 'primitiveTopology', [
		"point-list",
		"line-list",
		"line-strip",
		"triangle-list",
		"triangle-strip"
	]).onChange(v => tScene.children.forEach(tMesh => tMesh.primitiveTopology = v));

	let testSceneUI = new dat.GUI({});
	testSceneUI.width = 350
	testSceneUI.addColor(tScene, 'backgroundColor')
	testSceneUI.add(tScene, 'backgroundColorAlpha', 0, 1, 0.01)
}
