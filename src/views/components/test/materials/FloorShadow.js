import { ShaderMaterial } from 'three'

// import shaderFragment from '../shaders/floorShadow/fragment.glsl'
// import shaderVertex from '../shaders/floorShadow/vertex.glsl'
const shaderFragment=`uniform sampler2D tBackground;

varying vec2 vUv;

void main()
{
    vec4 backgroundColor = texture2D(tBackground, vUv);

    gl_FragColor = backgroundColor;
}

`
const shaderVertex=`varying vec2 vUv;

void main()
{
    vUv = uv;

    vec3 newPosition = position;
    newPosition.z = 1.0;
    gl_Position = vec4(newPosition, 1.0);
}

`
export default function ()
{
    const uniforms = {
        tShadow: { value: null },
        uShadowColor: { value: null },
        uAlpha: { value: null }
    }

    const material = new ShaderMaterial({
        wireframe: false,
        transparent: true,
        uniforms,
        vertexShader: shaderVertex,
        fragmentShader: shaderFragment
    })

    return material
}
