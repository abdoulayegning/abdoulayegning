import * as THREE from 'three'   

export default class GL {
    constructor(ref, image){ 
        this.image = image
        this.ref = ref
        this.setup()
        this.settings()
        this.addPlane()
        this.raycast()
        this.loop()
        window.addEventListener( 'mousemove', (e)=>{
            this.pointer.x = ( e.clientX / window.innerWidth ) * 2 - 1;
            this.pointer.y = - ( e.clientY / window.innerHeight ) * 2 + 1; 
        })
    }

    raycast(){
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
    }

    vert(){
        return `
        

        float rand(vec2 n) { 
            return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }
        
        float noise(vec2 p){
            vec2 ip = floor(p);
            vec2 u = fract(p);
            u = u*u*(3.0-2.0*u);
            
            float res = mix(
                mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
                mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
            return res*res;
        }

        varying vec2 vUv; 
        uniform float time;
        uniform float uProgressVertex;

        void main(){
            vUv = vec2(uv.x, uv.y); 
            
            vec3 pos = position; 
            float amp = 20.;
            float intensity = 0.005;
            pos.x += (noise(pos.xy * intensity + sin(time)) * amp)*uProgressVertex; 
            pos.y += (noise(pos.xy * intensity + sin(time)) * amp)*uProgressVertex;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
        `
    }

    frag(){
        return `
        float rand(vec2 n) { 
            return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }
        
        float noise(vec2 p){
            vec2 ip = floor(p);
            vec2 u = fract(p);
            u = u*u*(3.0-2.0*u);
            
            float res = mix(
                mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
                mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
            return res*res;
        }

        varying vec2 vUv;
        uniform sampler2D image;
        uniform float time; 
        uniform float uProgressFrag;

        void main(){
            vec2 uv = vUv;
            uv.x *= 2.5;
            uv.y += (uv.x + 5.);
            uv.x += time * 1.5;

            vec3 distort = vec3(noise(uv)); 
            
            vec2 uvMix = mix(distort.xy, vUv, uProgressFrag);

            vec3 col = vec3(texture2D(image, uvMix));
            gl_FragColor = vec4(col, 1.0);
        }
        `
    }

    settings(){ 
    }

    setup(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.ref.appendChild( this.renderer.domElement );
        this.renderer.setClearAlpha(0)

        this.camera.position.z = 5
        this.camera.lookAt(this.scene.position)

        this.width = this.ref.offsetWidth 
        this.height = this.ref.offsetHeight

        //Mix HTML WebGL
        this.camera.fov = 2 * Math.atan((this.height/2)/this.camera.position.z) * 180/Math.PI
        this.camera.aspect = this.width/this.height
        this.camera.updateProjectionMatrix()
        
        this.clock = new THREE.Clock()
        
    }

    addPlane(){
        this.geometry = new THREE.PlaneGeometry(
            this.height * 0.75,
            this.height * 0.75,
            60,60)
        
        
 
        this.material = new THREE.ShaderMaterial({
            fragmentShader: this.frag(),
            vertexShader: this.vert(), 
            wireframe: false,
            uniforms:{
                time: { value: 1.0 },
	            resolution: new THREE.Vector2(this.width, this.height),
                image: {value: new THREE.TextureLoader().load(this.image)},
                uProgressVertex: {value: 1.0},
                uProgressFrag: {value: 0.95},
            }
        }) 

        this.plane = new THREE.Mesh(this.geometry, this.material)
        this.plane.name = 'main'
        this.scene.add(this.plane)
 
    }

    loop(){
        this.material.uniforms.time.value = this.clock.getElapsedTime()
        requestAnimationFrame(()=>this.loop())  
        this.renderer.render(this.scene,this.camera);
    }
 
}