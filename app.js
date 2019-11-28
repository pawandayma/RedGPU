/*
 *   RedGPU - MIT License
 *   Copyright (c) 2019 ~ By RedCamel( webseon@gmail.com )
 *   issue : https://github.com/redcamel/RedGPU/issues
 *   Last modification time of this file - 2019.11.28 11:54:8
 *
 */

import RedGPU from "./src/RedGPU.js";
import RedMesh from "./src/object3D/RedMesh.js";
import RedStandardMaterial from "./src/material/RedStandardMaterial.js";
import RedRender from "./src/renderer/RedRender.js";
import RedBitmapMaterial from "./src/material/RedBitmapMaterial.js";
import RedSphere from "./src/primitives/RedSphere.js";
import RedBitmapTexture from "./src/resources/RedBitmapTexture.js";
import RedBox from "./src/primitives/RedBox.js";
import RedCylinder from "./src/primitives/RedCylinder.js";
import RedPlane from "./src/primitives/RedPlane.js";
import RedScene from "./src/RedScene.js";
import RedView from "./src/RedView.js";
import RedColorMaterial from "./src/material/RedColorMaterial.js";
import RedColorPhongMaterial from "./src/material/RedColorPhongMaterial.js";
import RedGrid from "./src/object3D/RedGrid.js";
import RedObitController from "./src/controller/RedObitController.js";
import RedDirectionalLight from "./src/light/RedDirectionalLight.js";
import RedPointLight from "./src/light/RedPointLight.js";


(async function () {
	const cvs = document.createElement('canvas');
	const glslangModule = await import(/* webpackIgnore: true */ 'https://unpkg.com/@webgpu/glslang@0.0.9/dist/web-devel/glslang.js');
	document.body.appendChild(cvs);

	const glslang = await glslangModule.default();
	console.log(glslang);
	let redGPU = new RedGPU(cvs, glslang,
		function () {

			let MAX = 3000;
			let i = MAX;
			let tView;
			let tScene = new RedScene();
			let tGrid = new RedGrid(this)
			let tCamera = new RedObitController(this)
			tGrid.centerColor = '#ff0000'

			tView = new RedView(this, tScene, tCamera)
			tCamera.targetView = tView // optional
			tCamera.distance = 80

			tScene.grid = tGrid
			let tLight

			tLight = new RedDirectionalLight('#ff0000', 1, 0.5)
			tLight.x = 10
			tLight.y = 0
			tLight.z = 0
			tScene.addLight(tLight)

			tLight = new RedDirectionalLight('#00ff00', 1, 0.4)
			tLight.x = -10
			tLight.y = 0
			tLight.z = 0
			tScene.addLight(tLight)

			tLight = new RedDirectionalLight('#0000ff', 1, 0.5)
			tLight.x = 0
			tLight.y = 0
			tLight.z = 10
			tScene.addLight(tLight)

			let i2 = 30
			let testColor = ['#ff0000', '#00ff00', '#0000ff', '#ffffff', '#ff2234']
			while (i2--) {
				let tLight = new RedPointLight(testColor[i2 % 5], 1, 1, parseInt(Math.random() * 30) + 10)
				tLight.x = Math.random() * 80 - 40
				tLight.y = Math.random() * 80 - 40
				tLight.z = Math.random() * 80 - 40
				tScene.addLight(tLight)
			}

			redGPU.view = tView
			let testTextureList = [
				new RedBitmapTexture(redGPU, 'assets/UV_Grid_Sm.jpg'),
				new RedBitmapTexture(redGPU, 'assets/Brick03_col.jpg'),
				new RedBitmapTexture(redGPU, 'assets/Brick03_col.jpg'),
				new RedBitmapTexture(redGPU, 'assets/crate.png'),
				new RedBitmapTexture(redGPU, 'assets/Brick03_col.jpg')

			];

			let tMat1 = new RedColorMaterial(redGPU, '#ffff00');
			let tMat2 = new RedColorPhongMaterial(redGPU, '#ff00ff');
			let tMat3 = new RedBitmapMaterial(redGPU, testTextureList[0]);
			let tMat4 = new RedStandardMaterial(redGPU, testTextureList[1]);
			let tMat5 = new RedStandardMaterial(redGPU, testTextureList[1], testTextureList[2]);
			let tMat6 = new RedStandardMaterial(redGPU, testTextureList[1], testTextureList[2], testTextureList[4]);
			tMat6.displacementPower = 1
			tMat6.displacementFlowSpeedX = 0.1
			tMat6.displacementFlowSpeedY = 0.1

			// let mats = [tMat1,tMat2,tMat3,tMat4,tMat5,tMat6]
			// let changeNum = 0
			// setTimeout(_ => {
			// 	let tChildren = tView.scene.children
			// 	let i = tChildren.length;
			//
			// 	console.log('안오냐')
			//
			// 	while (i--) {
			//
			// 		tChildren[i].material = tMat1
			// 	}
			// }, 3000)

			let randomGeometry = function () {
				return Math.random() > 0.5
					? new RedSphere(redGPU, 0.5, 16, 16, 16) :
					Math.random() > 0.5
						? new RedCylinder(redGPU, 0, 1, 2, 16, 16) :
						Math.random() > 0.5 ? new RedBox(redGPU) : new RedPlane(redGPU)
			}
			let testMesh = new RedMesh(
				redGPU,
				new RedSphere(redGPU, 0.5, 32, 32, 32),
				tMat6
			);
			tScene.addChild(testMesh)
			while (i--) {
				let testMesh = new RedMesh(
					redGPU,
					randomGeometry(),
					i > MAX / 4 ? tMat2 : i > MAX / 8 ? tMat6 : i > MAX / 12 ? tMat4 : i > MAX / 16 ? tMat1 : i > MAX / 20 ? tMat5 : tMat3
				);
				testMesh.x = Math.random() * 100 - 50;
				testMesh.y = Math.random() * 100 - 50;
				testMesh.z = Math.random() * 100 - 50;
				testMesh.rotationX = testMesh.rotationY = testMesh.rotationZ = Math.random() * 360;
				testMesh.scaleX = testMesh.scaleY = testMesh.scaleZ = Math.random() * 3 + 1;
				tScene.addChild(testMesh)
				// //
				// let testMesh2 = new RedMesh(
				// 	redGPU,
				// 	new RedSphere(redGPU, 1, 16, 16, 16),
				// 	tMat2
				// );
				// testMesh2.x = 2
				// testMesh2.scaleX = testMesh2.scaleY = testMesh2.scaleZ = 0.5;
				// testMesh.addChild(testMesh2)
				//
				// let testMesh3 = new RedMesh(
				// 	redGPU,
				// 	new RedSphere(redGPU),
				// 	tMat3
				// );
				// testMesh3.x = 2
				// testMesh3.scaleX = testMesh3.scaleY = testMesh3.scaleZ = 0.5;
				// testMesh2.addChild(testMesh3)

			}
			let renderer = new RedRender();
			let render = function (time) {

				// tView.camera.x = Math.sin(time / 3000) * 80;
				// tView.camera.y = Math.cos(time / 4000) * 80;
				// tView.camera.z = Math.cos(time / 3000) * 80;
				// tView.camera.x = 3;
				// tView.camera.y = 3;
				// tView.camera.z = 3;


				// tView.camera.x = 10;
				// tView.camera.y =10;
				// tView.camera.z = 10;
				// tView.camera.lookAt(0, 0, 0);

				renderer.render(time, redGPU, tView);

				let tChildren = tView.scene.pointLightList
				let i = tChildren.length;
				while (i--) {
					tChildren[i].x = Math.sin(time / 1000 + Math.PI * 2 / tChildren.length * i) * 25
					tChildren[i].y = Math.tan(time / 2000 + Math.PI * 2 / tChildren.length * i) * 25
					tChildren[i].z = Math.cos(time / 2000 + Math.PI * 2 / tChildren.length * i) * 25
				}


				requestAnimationFrame(render);
			};
			requestAnimationFrame(render);
			setTestUI(redGPU, tView, tScene)
		}
	);


})();
let setTestUI = function (redGPU, tView, tScene) {

	let tFolder;


	let testSceneUI = new dat.GUI({});

	testSceneUI.width = 350
	tFolder = testSceneUI.addFolder('RedScene')
	tFolder.open()
	tFolder.addColor(tScene, 'backgroundColor')
	tFolder.add(tScene, 'backgroundColorAlpha', 0, 1, 0.01)
	tFolder = testSceneUI.addFolder('RedView')
	tFolder.open()
	let viewTestData = {
		setLocationTest1: function () {
			tView.setLocation(0, 0)
		},
		setLocationTest2: function () {
			tView.setLocation(100, 100)
		},
		setLocationTest3: function () {
			tView.setLocation('50%', 100)
		},
		setLocationTest4: function () {
			tView.setLocation('40%', '40%')
		},
		setSizeTest1: function () {
			tView.setSize(200, 200)
		},
		setSizeTest2: function () {
			tView.setSize('50%', '100%')
		},
		setSizeTest3: function () {
			tView.setSize('50%', '50%')
		},
		setSizeTest4: function () {
			tView.setSize('20%', '20%')
		},
		setSizeTest5: function () {
			tView.setSize('100%', '100%')
		}
	}
	tFolder.add(viewTestData, 'setLocationTest1').name('setLocation(0,0)');
	tFolder.add(viewTestData, 'setLocationTest2').name('setLocation(100,100)');
	tFolder.add(viewTestData, 'setLocationTest3').name('setLocation(50%,100)');
	tFolder.add(viewTestData, 'setLocationTest4').name('setLocation(40%,40%)');
	tFolder.add(viewTestData, 'setSizeTest1').name('setSize(200,200)');
	tFolder.add(viewTestData, 'setSizeTest2').name('setSize(50%,100%)');
	tFolder.add(viewTestData, 'setSizeTest3').name('setSize(50%,50%)');
	tFolder.add(viewTestData, 'setSizeTest4').name('setSize(20%,20%)');
	tFolder.add(viewTestData, 'setSizeTest5').name('setSize(100%,100%)');

	let testUI = new dat.GUI({});
	let testData = {
		useDepthTest: true,
		depthTestFunc: "less",
		cullMode: "back",
		primitiveTopology: "triangle-list"
	};
	tFolder = testUI.addFolder('RedMesh')
	tFolder.open()
	tFolder.add(testData, 'useDepthTest').onChange(v => tScene.children.forEach(tMesh => tMesh.useDepthTest = v));

	tFolder.add(testData, 'depthTestFunc', [
		"never",
		"less",
		"equal",
		"less-equal",
		"greater",
		"not-equal",
		"greater-equal",
		"always"
	]).onChange(v => tScene.children.forEach(tMesh => tMesh.depthTestFunc = v));
	tFolder.add(testData, 'cullMode', [
		"none",
		"front",
		"back"
	]).onChange(v => tScene.children.forEach(tMesh => tMesh.cullMode = v));

	tFolder.add(testData, 'primitiveTopology', [
		"point-list",
		"line-list",
		"line-strip",
		"triangle-list",
		"triangle-strip"
	]).onChange(v => tScene.children.forEach(tMesh => tMesh.primitiveTopology = v));
}
