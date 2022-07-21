function delay(n){
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
}

// 初期モデル
function pageTransition() {
    var tl = new TimelineMax();
    tl.set('.slide-box',{zIndex:'10',height: '100%'})
    .addLabel('up').fromTo('.slide1', 1,{y:'-105%',opacity:'0'},{y:'0%', opacity:'1', ease:Power4.easeInOut})
    .fromTo('.slide2', 1,{y:'105%',opacity:'0'},{y:'0%', opacity:'1', ease:Power4.easeInOut}, 'up+=0.2')
    .fromTo('.slide3', 1,{y:'-105%',opacity:'0'},{y:'0%', opacity:'1', ease:Power4.easeInOut}, 'up+=0.4')
    .fromTo('.slide4', 1,{y:'105%',opacity:'0'},{y:'0%', opacity:'1', ease:Power4.easeInOut}, 'up+=0.4')
    .fromTo('.slide5', 1,{y:'-105%',opacity:'0'},{y:'0%', opacity:'1', ease:Power4.easeInOut}, 'up+=0.2')
    .fromTo('.slide6', 1,{y:'105%',opacity:'0'},{y:'0%', opacity:'1', ease:Power4.easeInOut}, 'up+=0')
    .fromTo('.img1', 1,{opacity:'0'},{opacity:'1', ease:Power4.easeInOut}, 'up+=0.2')
    .fromTo('.img2', 1,{opacity:'0'},{opacity:'1', ease:Power4.easeInOut}, 'up+=0.4')
    .fromTo('.img3', 1,{opacity:'0'},{opacity:'1', ease:Power4.easeInOut}, 'up+=0.6')
    .fromTo('.img4', 1,{opacity:'0'},{opacity:'1', ease:Power4.easeInOut}, 'up+=0.6')
    .fromTo('.img5', 1,{opacity:'0'},{opacity:'1', ease:Power4.easeInOut}, 'up+=0.4')
    .fromTo('.img6', 1,{opacity:'0'},{opacity:'1', ease:Power4.easeInOut}, 'up+=0.2')
    .addLabel('up2').fromTo('.slide1', 1,{y:'0%'},{y:'105%', ease:Power4.easeInOut}, 'up2+=0.2')
    .fromTo('.slide2', 1,{y:'0%'},{y:'-105%', ease:Power4.easeInOut}, 'up2+=0.4')
    .fromTo('.slide3', 1,{y:'0%'},{y:'105%', ease:Power4.easeInOut}, 'up2+=0.6')
    .fromTo('.slide4', 1,{y:'0%'},{y:'-105%', ease:Power4.easeInOut}, 'up2+=0.6')
    .fromTo('.slide5', 1,{y:'0%'},{y:'105%', ease:Power4.easeInOut}, 'up2+=0.4')
    .fromTo('.slide6', 1,{y:'0%'},{y:'-100%', ease:Power4.easeInOut}, 'up2+=0.2')
    .set('.slide-box',{zIndex:'-10',height: '0%'});
}


function contentAnimation() {
    var tl = new TimelineMax();
    tl.fromTo('.img', 1, {height:'0%'}, {height:'80%', ease:Power4.easeInOut})
    .addLabel('up3')
    .fromTo('.img', 1, {width:'100%'}, {width:'70%', ease:Power4.easeInOut}, 'up3+=0.2')
    .fromTo('.overlay', 1.2, {x:'-100%'}, {x:'0%', ease:Power4.easeInOut}, 'up3+=0.2')
    .staggerFromTo('.letters', 0.5, {x:'1em', y:'1.3em', rotateZ:180}, {x:0, y:0, rotateZ:0, ease:Power4.easeInOut},0.05, 'up3+=0.2');
}
$(function() {
    barba.init({
        sync: true,

        transitions: [
            {
                async leave(date) {
                    const done = this.async();

                    pageTransition();
                    await delay(1000);
                    done();
                },

                async afterEnter (data) {
                    await delay(1100);
                    contentAnimation();
                },

                once(data) {
                    contentAnimation();
                },
            },
        ],
    });
});

//ページスクロールして最初に見たときだけアニメーションを行う
let tlText = gsap.timeline({
    scrollTrigger: {
      trigger: '.text-box',
      start: 'top center',
      end: () => '+=' +
      document.querySelector('.text-box').offsetHeight,
    }
  });
  tlText.fromTo('.bg-chara0', 0.7,{height:'0%'},{height:'100%'})
  .addLabel('up').fromTo('.bg-chara1', 1,{width:'0%'},{width:'13%', ease:Power2.easeInOut})
  .fromTo('.bg-chara2', 1,{width:'0%'},{width:'18%', ease:Power2.easeInOut}, 'up+=0.4')
  .fromTo('.bg-chara3', 1,{height:'0%'},{height:'30%', ease:Power2.easeInOut}, 'up+=0.5')
  .fromTo('.text', 1,{display:'flex', width:'0%', opacity:0},{width:'60%', opacity:1, ease:Power2.easeInOut}, 'up+=0.5')
  .set('.text-title, .text-body',{display:'block'})
  .fromTo('.text-title', 1,{y:'-105%', opacity:0},{y:'0%', opacity:1, ease:Power2.easeInOut})
  .staggerFromTo('.text-body', 1,{y:'105%', opacity:0},{y:'0%', opacity:1, ease:Power2.easeInOut},0.3)

  let tlShop = gsap.timeline({
    scrollTrigger: {
      trigger: '.shop-box',
      start: 'top center',
      end: () => '+=' +
      document.querySelector('.shop-box').offsetHeight,
    }
  });
  tlShop.addLabel('up').staggerTo('.shadow-top',0.6,{ top:'-110%' }, 0.3)
  .staggerTo('.shadow-bottom',0.6,{ top:'210%' }, 0.3, 'up+=0')
  .staggerTo('.shadow-top-second',1.3,{ top:'-110%' }, 0.3, 'up+=0')
  .staggerTo('.shadow-bottom-second',1.3,{ top:'210%' }, 0.3, 'up+=0')
  .staggerFromTo('.shop-text',0.6,{ rotationX: 360},{ rotationX: 0, transformOrigin:"center", transformStyle:"preserve-3d"}, 0.3, 'up+=0')
  .staggerFromTo('.shop-detail',0.6,{ opacity:0},{ opacity:1}, 0.3, 'up+=0.3')
