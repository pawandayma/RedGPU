/*
 *   RedGPU - MIT License
 *   Copyright (c) 2019 ~ By RedCamel( webseon@gmail.com )
 *   issue : https://github.com/redcamel/RedGPU/issues
 *   Last modification time of this file - 2019.12.13 10:30:31
 *
 */

"use strict";
import RedUUID from "../base/RedUUID.js";

export default class RedBuffer extends RedUUID {
	static TYPE_VERTEX = 'vertexBuffer';
	static TYPE_INDEX = 'indexBuffer';
	type;
	vertexCount;
	originData;
	bufferDescriptor;
	GPUBuffer;

	constructor(redGPU, typeKey, bufferType, data, interleaveInfo, usage) {
		super();
		if (redGPU.state.RedBuffer[bufferType].has(typeKey)) return redGPU.state.RedBuffer[bufferType].get(typeKey);
		let tUsage;
		this.type = bufferType;
		this.vertexCount = 0;
		this.stride = 0
		switch (bufferType) {
			case RedBuffer.TYPE_VERTEX :
				tUsage = usage || GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST;
				this.interleaveInfo = interleaveInfo;
				interleaveInfo.forEach(v => {
					this.vertexCount += v['stride'] / Float32Array.BYTES_PER_ELEMENT;
					this.stride += v['stride'] / Float32Array.BYTES_PER_ELEMENT
				});
				this.vertexCount = data.length / this.vertexCount;
				console.log('최종 this.vertexCount', this.vertexCount);
				break;
			case RedBuffer.TYPE_INDEX :
				tUsage = usage || GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST;
				this.indexNum = data.length;
				break
		}
		// 실제 버퍼 생성
		this.bufferDescriptor = {
			size: data.byteLength,
			usage: tUsage
		};
		this.data = data;
		this.GPUBuffer = redGPU.device.createBuffer(this.bufferDescriptor);
		this.GPUBuffer.setSubData(0, data);
		redGPU.state.RedBuffer[bufferType].set(typeKey, this);
		console.log(this);
	}
	update(data) {
		this.data = data;
		this.GPUBuffer.setSubData(0, new Float32Array(data));
	}

	destroy() {
		if (this.GPUBuffer) this.GPUBuffer.destroy();
		this.GPUBuffer = null
	}
}