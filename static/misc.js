import gsap from "gsap";

export function LinkReveal(selector, wrapperHeight){

    let duration = 0.5

    let a = document.querySelector(selector)  
    
    a.addEventListener('mouseover', ()=>{  
        gsap.to(a, {top: -wrapperHeight, duration: duration, ease: 'power4'}) 
    })

    a.addEventListener('mouseleave', ()=>{  
        gsap.to(a, {top: 0, duration: duration, ease: 'power4'}) 
    })
}