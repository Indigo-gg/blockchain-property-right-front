import { RGBAFormat, Color, DataTexture, LinearFilter, ShaderMaterial } from 'three'
// import shaderFragment from '../shaders/floor/fragment.glsl'
// import shaderVertex from '../shaders/floor/vertex.glsl'
const shaderFragment=`uniform sampler2D tShadow;
uniform vec3 uShadowColor;
uniform float uAlpha;

varying vec2 vUv;

void main()
{
    float shadowAlpha = 1.0 - texture2D(tShadow, vUv).r;
    shadowAlpha *= uAlpha;

    gl_FragColor = vec4(uShadowColor, shadowAlpha);
}
`
const shaderVertex=`varying vec2 vUv;

void main()
{
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
export default function () {
    const topLeft = new Color('#cfbfa7')
    const topRight = new Color('#cfbfa7')
    const bottomRight = new Color('#cbbda5')
    const bottomLeft = new Color('#ded5c8')

    const data = new Uint8Array([
        Math.round(bottomLeft.r * 255), Math.round(bottomLeft.g * 255), Math.round(bottomLeft.b * 255), 1,
        Math.round(bottomRight.r * 255), Math.round(bottomRight.g * 255), Math.round(bottomRight.b * 255), 1,
        Math.round(topLeft.r * 255), Math.round(topLeft.g * 255), Math.round(topLeft.b * 255), 1,
        Math.round(topRight.r * 255), Math.round(topRight.g * 255), Math.round(topRight.b * 255), 1
    ])

    // texture-floor
    const texture = new DataTexture(data, 2, 2, RGBAFormat)
    texture.magFilter = LinearFilter
    texture.needsUpdate = true

    const uniforms = {
        tBackground: { value: texture }
    }

    const material = new ShaderMaterial({
        wireframe: false,
        transparent: false,
        uniforms,
        vertexShader: shaderVertex,
        fragmentShader: shaderFragment
    })

    return material
}
