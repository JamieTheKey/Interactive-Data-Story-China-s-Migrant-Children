
const tl1 = gsap.timeline({defaults:{ease:'power1.out'}});

// animation of heading page
tl1.to('.text',{y:'0%',duration:1,stagger:0.25});//move it back to 0%
tl1.to('.slider',{y:"-100%",duration:1.5,delay:0.5});
tl1.to('.intro',{y:'-100%',duration:1},"-=1.1");
tl1.from('.big-text',{opacity:0, duration:1})



// 处理文字强调部分
const textStressOne = document.querySelectorAll('.text-stress')

textStressOne.forEach(element => {
    element.addEventListener('mouseover',function(){
        this.style.backgroundColor = '#0000';
        this.style.color = 'white';
    })
});
const sliders = document.querySelectorAll('.slide-in');
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold:0,
    rootMargin:'0px 0px -200px 0px'
}

const appearOnScroll = new IntersectionObserver(
    function(
        entries,
        appearOnScroll
    ){
        entries.forEach(entry=>{
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target)
            }
        })
    },appearOptions);

    faders.forEach(fader=>{
        appearOnScroll.observe(fader)
    })

    sliders.forEach(slider=>{
        appearOnScroll.observe(slider);
      })