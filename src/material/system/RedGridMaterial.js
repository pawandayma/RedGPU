"use strict";
import RedTypeSize from "../../resources/RedTypeSize.js";
import RedBaseMaterial from "../../base/RedBaseMaterial.js";
import RedUtil from "../../util/RedUtil.js";
import RedUUID from "../../base/RedUUID.js";
import RedShareGLSL from "../../base/RedShareGLSL.js";
import RedUniformBufferDescriptor from "../../buffer/RedUniformBufferDescriptor.js";

export default class RedGridMaterial extends RedBaseMaterial {

	static vertexShaderGLSL = `
	#version 450
	${RedShareGLSL.GLSL_SystemUniforms_vertex.systemUniforms}
    layout(set=2,binding = 0) uniform Uniforms {
        mat4 modelMatrix;
    } uniforms;
	layout(location = 0) in vec3 position;
	layout(location = 1) in vec4 color;
	layout(location = 0) out vec4 vColor;

	void main() {
		gl_Position = systemUniforms.perspectiveMTX * systemUniforms.cameraMTX * uniforms.modelMatrix* vec4(position,1.0);
		vColor = color;
	}
	`;
	static fragmentShaderGLSL = `
	#version 450
	layout(location = 0) in vec4 vColor;
	layout(location = 0) out vec4 outColor;
	void main() {
		outColor = vColor;
	}
	`;
	static PROGRAM_OPTION_LIST = [];
	static uniformsBindGroupLayoutDescriptor = {
		bindings: [
			{
				binding: 0,
				visibility: GPUShaderStage.VERTEX,
				type: "uniform-buffer"
			},
			{
				binding: 1,
				visibility: GPUShaderStage.FRAGMENT,
				type: "uniform-buffer"
			}
		]
	};
	static uniformBufferDescriptor_vertex = new RedUniformBufferDescriptor(
		[
			{size: RedTypeSize.mat4, valueName: 'matrix'}
		]
	);
	static uniformBufferDescriptor_fragment = RedBaseMaterial.uniformBufferDescriptor_empty;
	constructor(redGPU) {
		super(redGPU);
		this.resetBindingInfo()
	}


	resetBindingInfo() {
		this.bindings = null;
		this.searchModules();
		this.bindings = [
			{
				binding: 0,
				resource: {
					buffer: null,
					offset: 0,
					size: this.uniformBufferDescriptor_vertex.size
				}
			},
			{
				binding: 1,
				resource: {
					buffer: null,
					offset: 0,
					size: this.uniformBufferDescriptor_fragment.size
				}
			}
		];
		this.setUniformBindGroupDescriptor();
		this._UUID = RedUUID.makeUUID();
	}
}
