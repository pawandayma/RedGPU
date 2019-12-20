/*
 *   RedGPU - MIT License
 *   Copyright (c) 2019 ~ By RedCamel( webseon@gmail.com )
 *   issue : https://github.com/redcamel/RedGPU/issues
 *   Last modification time of this file - 2019.12.20 12:21:27
 *
 */

"use strict";
import BaseLight from "../base/BaseLight.js";

export default class PointLight extends BaseLight {
	#radius = 1;
	constructor(color = '#ffffff', alpha = 1, intensity = 1, radius = 1) {
		super();
		this.color = color;
		this.alpha = alpha;
		this.intensity = intensity;
		this.radius = radius;
	}
	get radius() {
		return this.#radius;
	}
	set radius(value) {
		this.#radius = value;
	}
}