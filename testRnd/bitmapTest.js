/*
 *   RedGPU - MIT License
 *   Copyright (c) 2019 ~ By RedCamel( webseon@gmail.com )
 *   issue : https://github.com/redcamel/RedGPU/issues
 *   Last modification time of this file - 2019.12.20 13:27:33
 *
 */
import RedGPU from "../src/RedGPU.js";

const cvs = document.createElement('canvas');
document.body.appendChild(cvs);


new RedGPU.RedGPUContext(cvs,
	function (v, reason) {
		console.log(this.context)
		let tView;
		let tScene = new RedGPU.Scene();
		let tGrid = new RedGPU.Grid(this)
		let tCamera = new RedGPU.ObitController(this)
		// tGrid.centerColor = '#ff0000'
		// tScene.backgroundColor = '#fff'
		// tScene.backgroundColorAlpha = 0
		let tLight
		tLight = new RedGPU.DirectionalLight()
		tLight.x = 100
		tLight.y = 100
		tLight.z = 100
		tScene.addLight(tLight)

		tView = new RedGPU.View(this, tScene, tCamera)
		tCamera.targetView = tView // optional
		tScene.grid = tGrid

		this.addView(tView)


		let tMesh
		// tMesh = new RedGPU.Mesh(this, new RedGPU.Sphere(this,), new RedGPU.BitmapMaterial(this, new RedGPU.BitmapTexture(this,'../assets/UV_Grid_Sm.jpg')))
		// tMesh.x = Math.random()*10-5
		// tMesh.y = Math.random()*10-5
		// tMesh.z = Math.random()*10-5
		// tScene.addChild(tMesh)
		// tMesh = new RedGPU.Mesh(this, new RedGPU.Sphere(this,), new RedGPU.BitmapMaterial(this, new RedGPU.BitmapTexture(this,'../assets/Brick03_col.jpg')))
		// tMesh.x = Math.random()*10-5
		// tMesh.y = Math.random()*10-5
		// tMesh.z = Math.random()*10-5
		// tScene.addChild(tMesh)
		// tMesh = new RedGPU.Mesh(this, new RedGPU.Sphere(this,), new RedGPU.BitmapMaterial(this, new RedGPU.BitmapTexture(this,'../assets/Brick03_nrm.jpg')))
		// tMesh.x = Math.random()*10-5
		// tMesh.y = Math.random()*10-5
		// tMesh.z = Math.random()*10-5
		// tScene.addChild(tMesh)
		// tMesh = new RedGPU.Mesh(this, new RedGPU.Sphere(this,), new RedGPU.BitmapMaterial(this, new RedGPU.BitmapTexture(this,'../assets/crate.png')))
		// tMesh.x = Math.random()*10-5
		// tMesh.y = Math.random()*10-5
		// tMesh.z = Math.random()*10-5
		// tScene.addChild(tMesh)
		// tMesh = new RedGPU.Mesh(this, new RedGPU.Sphere(this,), new RedGPU.BitmapMaterial(this, new RedGPU.BitmapTexture(this,'../assets/Brick03_disp.jpg')))
		// tMesh.x = Math.random()*10-5
		// tMesh.y = Math.random()*10-5
		// tMesh.z = Math.random()*10-5
		// tScene.addChild(tMesh)
		// tMesh = new RedGPU.Mesh(this, new RedGPU.Sphere(this,), new RedGPU.BitmapMaterial(this, new RedGPU.BitmapTexture(this,'../assets/specular.png')))
		// tMesh.x = Math.random()*10-5
		// tMesh.y = Math.random()*10-5
		// tMesh.z = Math.random()*10-5
		// tScene.addChild(tMesh)
		// tMesh = new RedGPU.Mesh(this, new RedGPU.Sphere(this,), new RedGPU.BitmapMaterial(this, new RedGPU.BitmapTexture(this,'../assets/emissive.jpg')))
		// tMesh.x = Math.random()*10-5
		// tMesh.y = Math.random()*10-5
		// tMesh.z = Math.random()*10-5
		// tScene.addChild(tMesh)

		// tMesh = new RedGPU.Mesh(this, new RedGPU.Sphere(this,), new RedGPU.BitmapMaterial(this, new RedGPU.BitmapTexture(this, '../assets/UV_Gri1d_Sm.jpg', null, true,
		// 	function () {
		// 		console.log('로딩완료', this)
		// 	},
		// 	function (e) {
		// 		console.log('로딩에러', this )
		// 		console.log(e)
		// 		console.log(JSON.parse(`"${e}"`))
		// 	}
		// )))
		//
		// tScene.addChild(tMesh)

		// let textureLoader = new RedGPU.TextureLoader(
		// 	this,
		// 	[
		// 		'../assets/UV_Grid_Sm.jpg',
		// 		'../assets/UV_Grid_Sm.jpg',
		// 		'../assets/UV_Grid_Sm.jpg'
		// 	],
		// 	_ => {
		// 		console.log('여긴오겠고?')
		// 		new RedGPU.TextureLoader(
		// 			this,
		// 			[
		// 				'../assets/UV_Grid_Sm.jpg',
		// 				'../assets/UV_Grid_Sm.jpg',
		// 				'../assets/UV_Grid_Sm.jpg'
		// 			],
		// 			_ => {
		// 				console.log('안오겠지?')
		// 				tMesh = new RedGPU.Mesh(this, new RedGPU.Sphere(this,), new RedGPU.BitmapMaterial(this, new RedGPU.BitmapTexture(this, '../assets/Brick03_col.jpg')))
		// 				tMesh.x = -2
		// 				tScene.addChild(tMesh)
		//
		// 				tMesh = new RedGPU.Mesh(this, new RedGPU.Sphere(this,), new RedGPU.BitmapMaterial(this, new RedGPU.BitmapTexture(this, '../assets/Brick03_col.jpg')))
		//
		// 				tMesh.x = 2
		// 				tScene.addChild(tMesh)
		//
		// 				tMesh = new RedGPU.Mesh(this, new RedGPU.Sphere(this,), new RedGPU.StandardMaterial(this, new RedGPU.BitmapTexture(this, '../assets/Brick03_col.jpg')))
		// 				tMesh.z = -2
		//
		// 				tScene.addChild(tMesh)
		//
		// 				tMesh = new RedGPU.Mesh(this, new RedGPU.Sphere(this,), new RedGPU.ColorMaterial(this, '#00ff00'))
		// 				tMesh.z = 2
		// 				tScene.addChild(tMesh)
		//
		// 				let tMesh2 = new RedGPU.Mesh(this, new RedGPU.Sphere(this,), new RedGPU.ColorMaterial(this, '#ff00ff'))
		// 				tMesh2.x = 3
		// 				tMesh2.scaleX = tMesh2.scaleY = tMesh2.scaleZ = 0.5;
		// 				tMesh.addChild(tMesh2)
		//
		// 				tMesh = new RedGPU.Mesh(this, new RedGPU.Sphere(this,), new RedGPU.ColorPhongMaterial(this))
		// 				tMesh.z = 4
		//
		// 				tScene.addChild(tMesh)
		//
		// 				tMesh = new RedGPU.Mesh(this, new RedGPU.Sphere(this,), new RedGPU.ColorPhongTextureMaterial(this))
		// 				tMesh.z = -4
		//
		// 				tScene.addChild(tMesh)
		//
		// 				tMesh = new RedGPU.Mesh(this, new RedGPU.Sphere(this,), new RedGPU.EnvironmentMaterial(this, new RedGPU.BitmapTexture(this, '../assets/Brick03_col.jpg'), new RedGPU.BitmapCubeTexture(this, [
		// 					'../assets/cubemap/SwedishRoyalCastle/px.jpg',
		// 					'../assets/cubemap/SwedishRoyalCastle/nx.jpg',
		// 					'../assets/cubemap/SwedishRoyalCastle/py.jpg',
		// 					'../assets/cubemap/SwedishRoyalCastle/ny.jpg',
		// 					'../assets/cubemap/SwedishRoyalCastle/pz.jpg',
		// 					'../assets/cubemap/SwedishRoyalCastle/nz.jpg'
		// 				])))
		// 				tMesh.z = -6
		// 				tScene.addChild(tMesh)
		// 				tMesh = new RedGPU.Mesh(this, new RedGPU.Box(this,), new RedGPU.SheetMaterial(this, new RedGPU.BitmapTexture(this, '../assets/sheet/spriteSheet.png'), 24, 5, 3, 15))
		// 				tMesh.z = 0
		//
		// 				tScene.addChild(tMesh)
		//
		//
		// 			}
		// 		)
		// 	}
		// )

		// let t0 = new RedGPU.BitmapTexture(
		// 	this,
		// 	'../assets/UV_Grid_Sm.jpg',
		// 	null,
		// 	true,
		// 	_=>{
		// 		console.log('성공')
		// 		tMesh = new RedGPU.Mesh(this, new RedGPU.Sphere(this), new RedGPU.BitmapMaterial(this, t0))
		// 		tScene.addChild(tMesh)
		// 	},
		// 	e => console.log(e)
		// )


		// new RedGPU.BitmapCubeTexture(this,[
		// 	'../assets/cubemap/SwedishRoyalCastle/px.jpg',
		// 	'../assets/cubemap/SwedishRoyalCastle/nx.jpg',
		// 	'../assets/cubemap/SwedishRoyalCastle/py.jpg',
		// 	'../assets/cubemap/SwedishRoyalCastle/ny.jpg',
		// 	'../assets/cubemap/SwedishRoyalCastle/pz.jpg',
		// 	'../assets/cubemap/SwedishRoyalCastle/nz.jpg'
		// ],null, true,_=>{console.log('성공')},e=>console.log('실패닷',e))


		// let textureLoader = new RedGPU.TextureLoader(
		// 	this,
		// 	[
		// 		'../assets/UV_Grid_Sm.jpg',
		// 		'../assets/Brick03_col.jpg',
		// 		'../assets/Brick03_nrm.jpg',
		// 		'../assets/crate.png',
		// 		'../assets/Brick03_disp.jp1g',
		// 		'../assets/specular.png',
		// 		'../assets/emissive.jpg',
		// 		[
		// 			'../assets/cubemap/SwedishRoyalCastle/px.jpg',
		// 			'../assets/cubemap/SwedishRoyalCastle/nx.jpg',
		// 			'../assets/cubemap/SwedishRoyalCastle/py.jpg',
		// 			'../assets/cubemap/SwedishRoyalCastle/ny.jpg',
		// 			'../assets/cubemap/SwedishRoyalCastle/pz.jpg',
		// 			'../assets/cubemap/SwedishRoyalCastle/nz.jpg'
		// 		],
		// 		[
		// 			'../assets/cubemap/SwedishRoyalCastle/px.jpg',
		// 			'../assets/cubemap/SwedishRoyalCastle/nx.jpg',
		// 			'../assets/cubemap/SwedishRoyalCastle/py.jpg',
		// 			'../assets/cubemap/SwedishRoyalCastle/ny.jpg',
		// 			'../assets/cubemap/SwedishRoyalCastle/pz.jpg',
		// 			'../assets/cubemap/SwedishRoyalCastle/nz.jpg'
		// 		]
		// 	],
		// 	_ => {
		// 		console.log(textureLoader)
		// 	}
		// )
		let i = 100
		while (i--) {
			let tMesh = new RedGPU.Mesh(this, new RedGPU.Box(this), new RedGPU.ColorMaterial(this))
			// let tMesh = new RedGPU.Mesh(this, new RedGPU.Box(this), new RedGPU.BitmapMaterial(this, new RedGPU.BitmapTexture(this, '../assets/Brick03_col.jpg')))
			// let tMesh = new RedGPU.Mesh(this, new RedGPU.Box(this), new RedGPU.StandardMaterial(this, new RedGPU.BitmapTexture(this, '../assets/Brick03_col.jpg')))
			// let tMesh = new RedGPU.Mesh(this, new RedGPU.Box(this), new RedGPU.EnvironmentMaterial(this, new RedGPU.BitmapTexture(this, '../assets/Brick03_col.jpg'), new RedGPU.BitmapCubeTexture(this, [
			// 	'../assets/cubemap/SwedishRoyalCastle/px.jpg',
			// 	'../assets/cubemap/SwedishRoyalCastle/nx.jpg',
			// 	'../assets/cubemap/SwedishRoyalCastle/py.jpg',
			// 	'../assets/cubemap/SwedishRoyalCastle/ny.jpg',
			// 	'../assets/cubemap/SwedishRoyalCastle/pz.jpg',
			// 	'../assets/cubemap/SwedishRoyalCastle/nz.jpg'
			// ])))
			// let tMesh = new RedGPU.Sprite3D(this, new RedGPU.Box(this), new RedGPU.Sprite3DMaterial(this, new RedGPU.BitmapTexture(this, '../assets/Brick03_col.jpg')))

			tMesh.x = Math.random() * 10 - 5
			tMesh.y = Math.random() * 10 - 5
			tMesh.z = Math.random() * 10 - 5
			tScene.addChild(tMesh)

			// tMesh.addEventListener('down', function () {
			// 	console.log('down', this)
			// 	this.scaleX = this.scaleY = this.scaleZ = 0.5
			// })
			// tMesh.addEventListener('up', function () {
			// 	console.log('up', this)
			// 	this.scaleX = this.scaleY = this.scaleZ = 1
			// })
			// tMesh.addEventListener('over', function () {
			// 	console.log('over', this)
			// 	this.material.alpha = 0.5
			// })
			// tMesh.addEventListener('out', function () {
			// 	console.log('out', this)
			// 	this.material.alpha = 1
			// })
		}

		let renderer = new RedGPU.Render();
		let render = time => {
			tScene.children.forEach(tMesh => {
				tMesh.rotationZ += 0.1
				// tMesh.material.alpha = RedGPU.UTIL.clamp(Math.sin(time / 500), 0, 1)

			})
			console.log(tCamera.getPosition())
			renderer.render(time, this);
			requestAnimationFrame(render);
		}
		requestAnimationFrame(render);


	}
)
