<template>
    <div>
        <div class="social-links">
            <div class="social-link-item item-a">
                <div>IN</div>
                <div>IN</div>
            </div>  
            <div class="social-link-item item-b">
                <div>LI</div>
                <div>LI</div>
            </div> 
            <div class="social-link-item item-c">
                <div>FB</div>
                <div>FB</div>
            </div> 
            <div class="social-link-item item-d">
                <div>VI</div>
                <div>VI</div>
            </div>
        </div>
    </div>
</template>

<script>
import gsap from 'gsap'
import {LinkReveal} from '../static/misc'
export default {
    mounted() {
    LinkReveal('.item-a', 20)
    LinkReveal('.item-b', 20)
    LinkReveal('.item-c', 20)
    LinkReveal('.item-d', 20) 
    },
}
</script>

<style>
    .social-links {  
        display: grid;
        grid-template-columns: 25% 25% 25% 25%;
        width: 20vw; 
        height: 20px;
        background-color: none;
        clip-path: inset(0 0);
        position: fixed;
        bottom: 3vh;
        right: 2vw
    }
    .social-link-item {
        position: relative; 
        text-align: right;
    }
</style> 