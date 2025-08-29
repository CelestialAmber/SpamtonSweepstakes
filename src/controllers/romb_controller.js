import { Howl } from 'howler';
import { Controller } from '@hotwired/stimulus';

export default class RombController extends Controller {
  connect() {
    this.locale = {
      en: {
        rumble: 'You can never defeat us!!! Let\'s rumble!'
      },
      ja: {
        rumble: 'おまえには　われらを　たおすことは　できぬ！　いくぞ！！'
      }
    };

    this.slam = new Howl({
      src: [
        '/assets/audio/slam.ogg',
        '/assets/audio/slam.mp3'
      ],
      volume: 0.5
    });

    this.ma = new Howl({
      src: [
        '/assets/audio/ma.ogg',
        '/assets/audio/ma.mp3'
      ],
      volume: 0.5
    });
  }

  start() {
    if(this.startedValue == false){
      this.slam.play();
      this.doorTarget.classList.add('hidden');
      this.squareTarget.classList.remove('hidden');
      window.requestAnimationFrame(this.moveTick.bind(this));
      setTimeout(
        () => {
          if(this.clickedValue == false){
            this.escapedTarget.classList.remove('hidden');
            this.escapedValue = true;
            this.squareTarget.classList.add('hidden');
            window.getSelection().removeAllRanges();
          }
        },
        5000
      );
    }
  }

  moveTick() {
    if (this.escapedValue == false && this.clickedValue == false) {
      let o = this.containerTarget.clientWidth / 2;
      let t = this.containerTarget.clientHeight / 2;
      let e = 250;
      let n = e * Math.cos(this.angleValue);
      let i = e * Math.sin(this.angleValue) * Math.cos(this.angleValue);

      this.angleValue += 0.02;
      this.squareTarget.setAttribute(
        'style',
        `left: ${ o + n - this.squareTarget.clientWidth / 2 }px; top: ${ t + i - this.squareTarget.clientHeight / 2 }px`
      );
      window.requestAnimationFrame(this.moveTick.bind(this));
    }
  }

  click() {
    if(this.clickedValue == false){
      this.clickedValue = true;
      this.squareTarget.classList.add('animate-fly-off');
      this.squareTarget.classList.remove('cursor-pointer');
      this.ma.play();
      document.title = this.locale[this.localeValue].rumble;
      setTimeout(() => {
        window.location.href = '/chapter3'
      }, 3000);
    }
  }

  playMa() {
    this.ma.play();
  }
}

__publicField(RombController, 'targets', [
  'container',
  'door',
  'square',
  'escaped'
]);

__publicField(RombController, 'values', {
    clicked: { type: Boolean, default: false },
    escaped: { type: Boolean, default: false },
    started: { type: Boolean, default: false },
    angle: { type: Number, default: 0 },
    locale: { type: String, default: 'en' }
});