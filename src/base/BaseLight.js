/*
 *   RedGPU - MIT License
 *   Copyright (c) 2019 ~ By RedCamel( webseon@gmail.com )
 *   issue : https://github.com/redcamel/RedGPU/issues
 *   Last modification time of this file - 2019.12.20 12:21:27
 *
 */

"use strict";
import Mix from "./Mix.js";

export default class BaseLight extends Mix.mix(
	Mix.EmptyClass,
	Mix.color
) {
	#intensity = 1;
	x = 0;
	y = 0;
	z = 0;

	get intensity() {
		return this.#intensity;
	}

	set intensity(value) {
		this.#intensity = value;
	}


}