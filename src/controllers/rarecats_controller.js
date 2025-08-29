import { Howl } from 'howler';
import { Controller } from '@hotwired/stimulus';

export default class RareCatsController extends Controller {
  connect() {
    this.sprinkle = new Howl({
      src: [
        '/assets/audio/sprinkle.ogg',
        '/assets/audio/sprinkle.mp3'
      ],
      volume: 0.5
    });
    this.ralsei = new Howl({
      src: [
        '/assets/audio/bagel_ralsei.ogg',
        '/assets/audio/bagel_ralsei.mp3'
      ],
      volume: 0.5
    });
    this.susie = new Howl({
      src: [
        '/assets/audio/bagel_susie.ogg',
        '/assets/audio/bagel_susie.mp3'
      ],
      volume: 0.5
    });
    this.face = new Howl({
      src: [
        '/assets/audio/face.ogg',
        '/assets/audio/face.mp3'
      ],
      volume: 0.5
    });

    if(localStorage.getItem('rarecats-points') !== null){
      this.pointsValue = localStorage.getItem('rarecats-points');
    }

    this.summonCat();

    setTimeout(() => {
      this.catTarget.classList.remove('hidden');
      this.initializedValue = true;
      window.requestAnimationFrame(this.catTick.bind(this));
    }, 100)
  }

  summonCat() {
    let o = Math.floor(Math.random() * 1000) + 1;

    if(this.pullsValue >= 100){
      this.hardReset();
    }else if(o <= 700){
      this.catTarget.setAttribute('src', '/assets/images/cat-001.gif');
      this.catTarget.setAttribute('data-rarecats-points-param', 10);
    }else if( o <= 879){
      this.catTarget.setAttribute('src', '/assets/images/cat-002.gif');
      this.catTarget.setAttribute('data-rarecats-points-param', 50);
    }else if(o <= 959){
      this.catTarget.setAttribute('src', '/assets/images/cat-005.gif');
      this.catTarget.setAttribute('data-rarecats-points-param', 250);
    }else if(o <= 989){
      this.catTarget.setAttribute('src', '/assets/images/cat-006.gif');
      this.catTarget.setAttribute('data-rarecats-points-param', 1000);
    }else if(o <= 999){
      this.catTarget.setAttribute('src', '/assets/images/cat-007.gif');
      this.catTarget.setAttribute('data-rarecats-points-param', 3000);
    }else if(this.initializedValue == false){
      this.summonCat();
    }else {
      this.hardReset();
    }

    this.xValue = Math.floor(Math.random() * (document.body.clientWidth - 200));
    this.yValue = Math.floor(Math.random() * (document.body.clientHeight - 200));
    this.horizontalValue = Math.round(Math.random()) ? 1 : - 1;
    this.verticalValue = Math.round(Math.random()) ? 1 : - 1;
    this.updateCat();
  }

  clickCat(o) {
    if(this.catTarget.classList.contains('animate-caught') == false){
      this.pullsValue += 1;
      this.catTarget.classList.add('animate-caught');
      this.catTarget.classList.remove('cursor-pointer');
      this.caughtValue = true;
      
      if('points' in o.params){
        if(o.params.points == parseInt(o.params.points)){
          this.pointsValue += o.params.points;
        }else{
          this.hardReset();
        }
      }

      setTimeout(() => {
        this.catTarget.classList.remove('animate-caught');
        this.catTarget.classList.add('cursor-pointer');
        this.caughtValue = false;
        this.catTarget.removeAttribute('disabled');
        this.summonCat();
      }, 1000);
    }
  }

  pointsValueChanged(o, t) {
    document.title = `${ this.pointsValue } points`;

    if(this.initializedValue == true){
      localStorage.setItem('rarecats-points', this.pointsValue);
      if (o > t){
        let e = o - t;
        let n = document.createElement('span');

        n.classList.add(
          'absolute',
          'w-24',
          'h-12',
          'pointer-events-none',
          'text-2xl',
          'text-white',
          'text-center',
          'font-pixel',
          'text-center',
          'z-5'
        );
        
        if(this.yValue > 80) {
            n.classList.add('animate-toast');
            n.setAttribute(
              'style',
              `left: ${ this.xValue + 40 }px; top: ${ this.yValue + 20 }px`
            );
         } else {
            n.classList.add('animate-toast-down');
            n.setAttribute(
              'style',
              `left: ${ this.xValue + 40 }px; top: ${ this.yValue + 160 }px`
            );
        }

        n.innerHTML = `+${e}`;
        this.containerTarget.append(n);
        setTimeout(() => { n.remove() }, 1000);
        
        if(e >= 3000){
          this.ralsei.rate(0.8);
          this.ralsei.play();
          this.ralsei.rate(0.81);
          this.ralsei.play();
          this.sprinkle.rate(0.25);
          this.sprinkle.play();
        }else if(e >= 1000){
          this.ralsei.rate(1);
          this.ralsei.play();
          this.sprinkle.rate(0.5);
          this.sprinkle.play();
        }else if(e >= 250){
          this.susie.rate(1.3);
          this.susie.play();
        }else if(e >= 50){
          this.sprinkle.rate(0.95);
          this.sprinkle.play();
        }else if(e >= 10){
          this.sprinkle.rate(1);
          this.sprinkle.play();
        }

        if (e > 3000) this.hardReset();
        else if (e >= 1000) {
          let i = Math.floor(Math.random() * (document.body.clientWidth - 200));
          let a = Math.floor(Math.random() * (document.body.clientHeight - 200));
          
          this.windowTarget.setAttribute('style', `left: ${ i }px; top: ${ a }px`);
          this.windowTarget.classList.add('animate-fade-in');
          this.windowTarget.classList.remove('hidden', 'animate-fade-out');

          setTimeout(
            () => {
              this.windowTarget.classList.remove('animate-fade-in');
              this.windowTarget.classList.add('animate-fade-out');
            },
            3000
          );
          setTimeout(
            () => {
              this.windowTarget.classList.add('hidden');
              this.windowTarget.classList.remove('animate-fade-out', 'animate-fade-in');
            },
            5000
          );
        }
      }
    }
  }

  catTick() {
    let o = Math.max(document.body.clientWidth - 130, 130);
    let t = Math.max(document.body.clientHeight - 150, 150);

    if(this.xValue >= o || this.xValue <= - 60){
      this.horizontalValue = -this.horizontalValue;
    }
    if(this.xValue >= o) this.xValue = o;

    if(this.yValue >= t || this.yValue <= - 65){
      this.verticalValue = -this.verticalValue;
    }
    if(this.yValue >= t) this.yValue = t;

    this.xValue += this.horizontalValue,
    this.yValue += this.verticalValue,

    this.updateCat();
    window.requestAnimationFrame(this.catTick.bind(this));
  }

  updateCat() {
    if(this.caughtValue == false){
      this.catTarget.setAttribute('style', `left: ${ this.xValue }px; top: ${ this.yValue }px`);
    }
  }

  reset() {
    this.pointsValue = 0;
    this.summonCat();
  }

  /*
  Does the FRIEND jumpscare effect, and then sets a timer to call
  the sweepstakes redirect function
  */
  hardReset() {
    this.pointsValue = 0;
    this.catTarget.setAttribute('src', '/assets/images/cat-009.gif');
    this.catTarget.classList.add('animate-megazoom');
    this.face.play();
    setTimeout(this.fullReset.bind(this), 500);
  }

  //Goes to the sweepstakes page
  fullReset() {
    this.catTarget.classList.remove('animate-megazoom');
    this.summonCat();
    window.location.href = '/sweepstakes/';
  }
};

__publicField(RareCatsController, 'targets', [
  'cat',
  'container',
  'window'
]);

__publicField(RareCatsController, 'values', {
initialized: { type: Boolean, default: false},
points: { type: Number, default: 0},
pulls: { type: Number, default: 0},
horizontal: { type: Number, default: 1},
vertical: { type: Number, default: 1},
x: { type: Number, default: 0},
y: { type: Number, default: 0},
caught: { type: Boolean, default: false}
});