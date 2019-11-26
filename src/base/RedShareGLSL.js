"use strict";
export default class RedShareGLSL {
	static GLSL_SystemUniforms_vertex = {
		systemUniforms: `
		layout(set=0,binding = 0) uniform SystemUniforms {
	        mat4 perspectiveMTX;
	        mat4 cameraMTX;
	        float time;
	    } systemUniforms;
	    `
	};
	static GLSL_SystemUniforms_fragment = {
		systemUniformsWithLight: `
		const int MAX_DIRECTIONAL_LIGHT = 3;
		struct DirectionalLight {
	        vec4 directionalLightColor;
	        vec3 directionalLightPosition;
	        float directionalLightIntensity;
		};
		layout(set=1,binding = 0) uniform SystemUniforms {
	        float directionalLightCount;
	        DirectionalLight directionalLight[MAX_DIRECTIONAL_LIGHT];
        } systemUniforms;
        
        vec4 calcDirectionalLight(
            vec4 diffuseColor,
            vec3 N,
			vec4 ld, 
			vec4 ls,
			float loopNum,
			DirectionalLight[MAX_DIRECTIONAL_LIGHT] lightList,
			float shininess,
			float specularPower,
			vec4 specularColor
		){
		    vec3 L;	
		    vec4 lightColor;
		    
		    float lambertTerm;
		    float intensity;
		    float specular;
		  
		    DirectionalLight lightInfo;
		    for(int i = 0; i< loopNum; i++){
		        lightInfo = lightList[i];
			    L = normalize(-lightInfo.directionalLightPosition);	
			    lightColor = lightInfo.directionalLightColor;
			    lambertTerm = dot(N,-L);
			    intensity = lightInfo.directionalLightIntensity;
			    if(lambertTerm > 0.0){
					ld += lightColor * diffuseColor * lambertTerm * intensity;
					specular = pow( max(dot(reflect(L, N), -L), 0.0), shininess) * specularPower;
					ls +=  specularColor * specular * intensity;
			    }
		    }
			return ld + ls;
		}
		`,
		perturb_normal: `
		vec3 perturb_normal( vec3 N, vec3 V, vec2 texcoord, vec3 normalColor , float normalPower)
		{	   
			vec3 map = normalColor;
			map =  map * 255./127. - 128./127.;
			map.xy *= normalPower;
			mat3 TBN = cotangent_frame(N, V, texcoord);
			return normalize(TBN * map);
		}
		`,
		cotangent_frame: `
		mat3 cotangent_frame(vec3 N, vec3 p, vec2 uv)
		{
			vec3 dp1 = dFdx( p );
			vec3 dp2 = dFdy( p );
			vec2 duv1 = dFdx( uv );
			vec2 duv2 = dFdy( uv );
			
			vec3 dp2perp = cross( dp2, N );
			vec3 dp1perp = cross( N, dp1 );
			vec3 T = dp2perp * duv1.x + dp1perp * duv2.x;
			vec3 B = dp2perp * duv1.y + dp1perp * duv2.y;
			
			float invmax = inversesqrt( max( dot(T,T), dot(B,B) ) );
			return mat3( T * invmax, B * invmax, N );
		}
		`
	}

}