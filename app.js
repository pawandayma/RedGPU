/*
 *   RedGPU - MIT License
 *   Copyright (c) 2019 ~ By RedCamel( webseon@gmail.com )
 *   issue : https://github.com/redcamel/RedGPU/issues
 *   Last modification time of this file - 2019.11.30 19:22:30
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
import RedSkyBox from "./src/object3D/RedSkyBox.js";
import RedBitmapCubeTexture from "./src/resources/RedBitmapCubeTexture.js";
import RedColorPhongTextureMaterial from "./src/material/RedColorPhongTextureMaterial.js";


(async function () {
	const cvs = document.createElement('canvas');
	const glslangModule = await import(/* webpackIgnore: true */ 'https://unpkg.com/@webgpu/glslang@0.0.9/dist/web-devel/glslang.js');
	document.body.appendChild(cvs);

	const glslang = await glslangModule.default();
	console.log(glslang);
	let testMat_color, testMat_colorPhong, testMat_bitmap, testMat_standard_diffuse, testMat_standard_diffuse_normal,
		testMat_standard_diffuse_normal_displacement, testMat_colorPhongTexture_normal,
		testMat_colorPhongTexture_normal_displacement;
	let redGPU = new RedGPU(cvs, glslang,
		function () {

			let MAX = 5000;
			let i = MAX;
			let tView, tView2;
			let tScene = new RedScene();
			let tScene2 = new RedScene();
			let tGrid = new RedGrid(this)
			let tCamera = new RedObitController(this)
			let tCamera2 = new RedObitController(this)
			tGrid.centerColor = '#ff0000'
			tScene2.backgroundColor = '#ff0000'

			tView = new RedView(this, tScene, tCamera)
			tView2 = new RedView(this, tScene2, tCamera2)
			tView2.setSize(300, 300)
			tView2.setLocation(0, 0)


			tCamera.targetView = tView // optional
			tCamera2.targetView = tView2 // optional
			tCamera.distance = 200

			tScene.grid = tGrid
			tScene.skyBox = new RedSkyBox(redGPU)
			let tLight
			tLight = new RedDirectionalLight('#0000ff', 0.5)
			tLight.x = 10
			tLight.y = 10
			tLight.z = 10
			tScene.addLight(tLight)
			//
			tLight = new RedDirectionalLight('#ff0000', 0.5)
			tLight.x = -10
			tLight.y = -10
			tLight.z = -10
			tScene.addLight(tLight)

			tLight = new RedDirectionalLight('#00ff00', 0.5)
			tLight.x = -10
			tLight.y = 20
			tLight.z = 20
			tScene.addLight(tLight)


			let i2 = 10
			let testColor = ['#ff0000', '#00ff00', '#0000ff', '#ffffff', '#ff2234']
			while (i2--) {
				let tLight = new RedPointLight(testColor[i2 % 5], 1, 2, parseInt(Math.random() * 35) + 35)
				tLight.x = Math.random() * 80 - 40
				tLight.y = Math.random() * 80 - 40
				tLight.z = Math.random() * 80 - 40
				tScene.addLight(tLight)
			}

			redGPU.addView(tView)
			redGPU.addView(tView2)
			let testTextureList = [
				new RedBitmapTexture(redGPU, 'assets/UV_Grid_Sm.jpg'),
				new RedBitmapTexture(redGPU, 'assets/Brick03_col.jpg'),
				new RedBitmapTexture(redGPU, 'assets/Brick03_nrm.jpg'),
				new RedBitmapTexture(redGPU, 'assets/crate.png'),
				new RedBitmapTexture(redGPU, 'assets/Brick03_disp.jpg'),
				new RedBitmapTexture(redGPU, 'assets/specular.png'),
				new RedBitmapTexture(redGPU, 'assets/emissive.jpg')


			];


			testMat_color = new RedColorMaterial(redGPU, '#ffff12');
			testMat_colorPhong = new RedColorPhongMaterial(redGPU, '#11ff23');
			testMat_colorPhongTexture_normal = new RedColorPhongTextureMaterial(redGPU, '#fff253', 1, testTextureList[2])
			testMat_colorPhongTexture_normal_displacement = new RedColorPhongTextureMaterial(redGPU, '#341fff', 1, testTextureList[2], testTextureList[5], testTextureList[6], testTextureList[4])
			console.log(testMat_colorPhong)
			testMat_bitmap = new RedBitmapMaterial(redGPU, testTextureList[0]);
			testMat_standard_diffuse = new RedStandardMaterial(redGPU, testTextureList[1], null, testTextureList[5], testTextureList[6]);
			testMat_standard_diffuse_normal = new RedStandardMaterial(redGPU, testTextureList[0], testTextureList[2], testTextureList[5], testTextureList[6]);
			testMat_standard_diffuse_normal_displacement = new RedStandardMaterial(redGPU, testTextureList[1], testTextureList[2], testTextureList[5], testTextureList[6], testTextureList[4]);
			testMat_standard_diffuse_normal_displacement.displacementPower = 1
			testMat_standard_diffuse_normal_displacement.displacementFlowSpeedX = 0.1
			testMat_standard_diffuse_normal_displacement.displacementFlowSpeedY = 0.1

			testMat_colorPhongTexture_normal_displacement.displacementPower = 1
			testMat_colorPhongTexture_normal_displacement.displacementFlowSpeedX = 0.01
			testMat_colorPhongTexture_normal_displacement.displacementFlowSpeedY = 0.01


			// let mats = [testMat_color, testMat_colorPhong, testMat_bitmap, testMat_standard_diffuse, testMat_standard_diffuse_normal, testMat_standard_diffuse_normal_displacement]
			let changeNum = 0
			// setInterval(_ => {
			// 	let tChildren = tView.scene.children
			// 	let i = tChildren.length;
			// 	changeNum++
			// 	console.log('안오냐')
			//
			// 	while (i--) {
			//
			// 		tChildren[i].material = mats[changeNum%5]
			// 	}
			// }, 500)

			let randomGeometry = function () {
				return new RedSphere(redGPU, 0.5, 16, 16, 16)
				return Math.random() > 0.5
					? new RedSphere(redGPU, 0.5, 16, 16, 16) :
					Math.random() > 0.5
						? new RedCylinder(redGPU, 0, 1, 2, 16, 16) :
						Math.random() > 0.5 ? new RedBox(redGPU) : new RedPlane(redGPU)
			}
			let i3 = 100
			while (i3--) {
				let testMesh = new RedMesh(
					redGPU,
					new RedSphere(redGPU, 0.5, 32, 32, 32),
					testMat_bitmap
				);
				testMesh.x = Math.random() * 30 - 15
				testMesh.y = Math.random() * 30 - 15
				testMesh.z = Math.random() * 30 - 15
				tScene2.addChild(testMesh)
			}
			let testMesh = new RedMesh(
				redGPU,
				new RedSphere(redGPU, 0.5, 32, 32, 32),
				testMat_standard_diffuse
			);
			testMesh.scaleX = testMesh.scaleY = testMesh.scaleZ = 10
			tScene.addChild(testMesh)

			let division = MAX / 8
			while (i--) {
				let testMesh = new RedMesh(
					redGPU,
					randomGeometry(),
					i > division * 7 ? testMat_color
						: i > division * 6 ? testMat_colorPhong
						: i > division * 5 ? testMat_bitmap
							: i > division * 4 ? testMat_standard_diffuse
								: i > division * 3 ? testMat_standard_diffuse_normal
									: i > division * 2 ? testMat_standard_diffuse_normal_displacement
										: i > division * 1 ? testMat_colorPhongTexture_normal : testMat_colorPhongTexture_normal_displacement
				);
				testMesh.x = Math.random() * 300 - 150;
				testMesh.y = Math.random() * 300 - 150;
				testMesh.z = Math.random() * 300 - 150;
				testMesh.rotationX = testMesh.rotationY = testMesh.rotationZ = Math.random() * 360;
				testMesh.scaleX = testMesh.scaleY = testMesh.scaleZ = Math.random() * 5 + 1;
				if (testMesh.material == testMat_standard_diffuse_normal_displacement) testMesh.scaleX = testMesh.scaleY = testMesh.scaleZ = 10
				tScene.addChild(testMesh)
				// //
				// let testMesh2 = new RedMesh(
				// 	redGPU,
				// 	new RedSphere(redGPU, 1, 16, 16, 16),
				// 	testMat_colorPhong
				// );
				// testMesh2.x = 2
				// testMesh2.scaleX = testMesh2.scaleY = testMesh2.scaleZ = 0.5;
				// testMesh.addChild(testMesh2)
				//
				// let testMesh3 = new RedMesh(
				// 	redGPU,
				// 	new RedSphere(redGPU),
				// 	testMat_bitmap
				// );
				// testMesh3.x = 2
				// testMesh3.scaleX = testMesh3.scaleY = testMesh3.scaleZ = 0.5;
				// testMesh2.addChild(testMesh3)

			}
			// const pModel = new Promise((resolve) => {
			// 	OBJ.downloadMeshes({
			// 		'obj': './assets/WaltHead.obj'
			// 	}, resolve);
			// });
			// pModel.then(function (v) {
			// 	console.log('pModel', v)
			// 	let interleave = []
			// 	let vertexData = v.obj.vertices
			// 	let vertexNormals = v.obj.vertexNormals
			// 	let uvData = v.obj.textures
			//
			//
			// 	let i = 0, len = v.obj.indices.length
			// 	for (i; i < len; i++) {
			// 		let tIndex = v.obj.indices[i]
			// 		interleave[tIndex * 8 + 0] = vertexData[tIndex * 3 + 0]
			// 		interleave[tIndex * 8 + 1] = vertexData[tIndex * 3 + 1]
			// 		interleave[tIndex * 8 + 2] = vertexData[tIndex * 3 + 2]
			// 		interleave[tIndex * 8 + 3] = vertexNormals[tIndex * 3 + 0]
			// 		interleave[tIndex * 8 + 4] = vertexNormals[tIndex * 3 + 1]
			// 		interleave[tIndex * 8 + 5] = vertexNormals[tIndex * 3 + 2]
			// 		interleave[tIndex * 8 + 6] = uvData[tIndex * 2 + 0]
			// 		interleave[tIndex * 8 + 7] = uvData[tIndex * 2 + 1]
			// 	}
			// 	let testModelGeo = new RedGeometry(
			// 		redGPU,
			// 		new RedBuffer(
			// 			redGPU,
			// 			`testModelGeo_interleaveBuffer`,
			// 			RedBuffer.TYPE_VERTEX,
			// 			new Float32Array(interleave),
			// 			[
			// 				new RedInterleaveInfo('vertexPosition', 'float3'),
			// 				new RedInterleaveInfo('vertexNormal', 'float3'),
			// 				new RedInterleaveInfo('texcoord', 'float2')
			// 			]
			// 		),
			// 		new RedBuffer(
			// 			redGPU,
			// 			`testModelGeo_indexBuffer`,
			// 			RedBuffer.TYPE_INDEX,
			// 			new Uint32Array(v.obj.indices)
			// 		)
			// 	)
			// 	let testModelMesh = new RedMesh(redGPU, testModelGeo, new RedColorPhongMaterial(redGPU))
			// 	testModelMesh.x = -90
			// 	testModelMesh.rotationY = -90
			// 	tScene.addChild(testModelMesh)
			// 	testModelMesh = new RedMesh(redGPU, testModelGeo, new RedColorPhongMaterial(redGPU))
			// 	testModelMesh.x = 90
			// 	testModelMesh.rotationY = 90
			// 	tScene.addChild(testModelMesh)
			// });

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
				tLight.x = Math.sin(time / 1000)
				tLight.y = Math.cos(time / 500)
				tLight.z = Math.cos(time / 750)
				renderer.render(time, redGPU);
				testMat_standard_diffuse_normal.emissivePower =testMat_standard_diffuse_normal_displacement.emissivePower =testMat_colorPhongTexture_normal_displacement.emissivePower = Math.abs(Math.sin(time/250))
				testMat_colorPhongTexture_normal_displacement.displacementPower = testMat_standard_diffuse_normal_displacement.displacementPower = Math.sin(time / 1000) * 5
				testMat_standard_diffuse.normalPower = testMat_standard_diffuse_normal.normalPower = testMat_standard_diffuse_normal_displacement.normalPower = Math.abs(Math.sin(time / 1000)) + 1
				testMat_colorPhong.shininess = testMat_standard_diffuse.shininess = testMat_standard_diffuse_normal.shininess = Math.abs(Math.sin(time / 1000)) * 64 + 8
				testMat_colorPhong.specularPower = Math.abs(Math.sin(time / 1000)) * 5


				let tChildren = tView.scene.pointLightList
				let i = tChildren.length;
				while (i--) {
					tChildren[i].x = Math.sin(time / 1000 + i * 10 + Math.PI * 2 / tChildren.length * i) * 60
					tChildren[i].y = Math.tan(time / 2000 + i * 10 + Math.PI * 2 / tChildren.length * i) * 60 + Math.cos(time / 500 + i * 10 + Math.PI * 2 / tChildren.length * i) * 12
					tChildren[i].z = Math.cos(time / 2000 + i * 10 + Math.PI * 2 / tChildren.length * i) * 60
				}

				//  tChildren = tView.scene.children
				// i = tChildren.length;
				//
				// while (i--) {
				// 	tChildren[i]._rotationX +=1
				// 	tChildren[i]._rotationY +=1
				// 	tChildren[i]._rotationZ +=1
				// 	tChildren[i].dirtyTransform = 1
				// }


				requestAnimationFrame(render);
			};
			requestAnimationFrame(render);
			setTestUI(redGPU, tView, tScene)
		}
	);

	let setTestUI = function (redGPU, tView, tScene) {

		let tFolder;

		let testCubeTexture = new RedBitmapCubeTexture(redGPU, [
			'./assets/cubemap/SwedishRoyalCastle/px.jpg',
			'./assets/cubemap/SwedishRoyalCastle/nx.jpg',
			'./assets/cubemap/SwedishRoyalCastle/py.jpg',
			'./assets/cubemap/SwedishRoyalCastle/ny.jpg',
			'./assets/cubemap/SwedishRoyalCastle/pz.jpg',
			'./assets/cubemap/SwedishRoyalCastle/nz.jpg'
			// './assets/cubemap/posx.jpg',
			// './assets/cubemap/negx.jpg',
			// './assets/cubemap/posy.jpg',
			// './assets/cubemap/negy.jpg',
			// './assets/cubemap/posz.jpg',
			// './assets/cubemap/negz.jpg'
		])
		console.log('RedBitmapCubeTexture', testCubeTexture)

		let skyBox = new RedSkyBox(redGPU, testCubeTexture)
		tScene.skyBox = skyBox
		let testSceneUI = new dat.GUI({});
		let testSceneData = {
			useSkyBox: true,
			useGrid: true,
		}
		testSceneUI.width = 350
		tFolder = testSceneUI.addFolder('RedScene')
		tFolder.open()
		tFolder.add(testSceneData, 'useSkyBox').onChange(v => tScene.skyBox = v ? skyBox : null)
		tFolder.add(testSceneData, 'useGrid').onChange(v => tScene.grid = v ? new RedGrid(redGPU) : null)
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
			useFloatMode: false,
			useDepthTest: true,
			depthTestFunc: "less",
			cullMode: "back",
			primitiveTopology: "triangle-list"
		};
		tFolder = testUI.addFolder('RedMesh')
		tFolder.open()

		tFolder.add(testData, 'useFloatMode').onChange(v => {
			testMat_color,
				testMat_colorPhong.useFlatMode = v
			testMat_standard_diffuse.useFlatMode = v
			testMat_standard_diffuse_normal.useFlatMode = v
			testMat_standard_diffuse_normal_displacement.useFlatMode = v
			testMat_colorPhongTexture_normal.useFlatMode = v
			testMat_colorPhongTexture_normal_displacement.useFlatMode = v

		});
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


})();