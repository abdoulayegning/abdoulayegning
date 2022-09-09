<template>
    <div> 
        <nuxt-link to="/">index</nuxt-link>
        <nuxt-link to="/work">projects</nuxt-link> 
            <div ref="logo" class="logo"> 
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 1000 418.71" style="enable-background:new 0 0 1000 418.71;" xml:space="preserve">
                <g id="Line">
                    <rect x="405.32" y="181.87" class="st0" width="198.31" height="45.76"/>
                </g>
                <g id="G">
                    <g>
                        <path class="st0" d="M641.3,212.23c0-61.86,38.73-100.06,97.9-100.06c50.3,0,89.3,28.78,95.75,71.55h-50.3
                            c-3.23-17.75-20.98-29.32-42.77-29.32c-31.47,0-50.03,21.25-50.03,57.02c0,33.62,16.14,54.87,52.72,54.87
                            c27.97,0,45.72-12.1,47.61-30.66h-45.72v-37.39h69.66c15.87,0,25.55,9.15,25.55,25.55v81.77h-48.68v-28.78
                            c-7.53,14.52-24.48,32.28-61.05,32.28C675.99,309.06,641.3,270.59,641.3,212.23z"/>
                    </g>
                </g>
                <g id="A">
                    <g>
                        <path class="st0" d="M238.71,111.4h92.54l62.53,195.91h-53.63l-18.34-59.19h-74.48l-18.34,59.19h-53.08L238.71,111.4z
                            M307.91,203.94l-23.34-74.75l-23.34,74.75H307.91z"/>
                    </g>
                </g>
                </svg> 
            </div> 
        <div id="GL" ref="GL"></div>
    </div>
</template>

<script>
import GL from '../static/webgl';
import profile from '../static/lionel.jpg' 
import gsap from 'gsap'; 

export default {
    data() {
        return {
            GLCanvas: null,
            gui: null
        }
    },   
    mounted() { 
        this.GLCanvas = new GL(this.$refs.GL, profile) 
        this.$refs.logo.style.width = (window.innerWidth * 0.75) + 'px'
        this.$refs.logo.style.top = ((window.innerHeight * 0.5) - (this.$refs.logo.offsetHeight/2)) + 'px'
        this.$refs.logo.style.left = ((window.innerWidth * 0.5) - (this.$refs.logo.offsetWidth/2)) + 'px' 

        console.log(this.GLCanvas.material.uniforms)

        gsap.fromTo(this.GLCanvas.material.uniforms.uProgressVertex, {value: 0}, {value: 1, duration: 3})
        gsap.fromTo(this.GLCanvas.material.uniforms.uProgressFrag, {value: 0}, {value: 0.95, duration: 3})
    },
}
</script>

<style>
    .st0 {
        fill:#1D1D1B;
    }

    #GL {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        mix-blend-mode: color;
    }

    .logo { 
        border: 0qpx solid black;
        z-index: -100; 
        position: absolute; 
    } 

</style>