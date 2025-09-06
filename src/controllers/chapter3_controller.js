import { Controller } from '@hotwired/stimulus';
import { useHotkeys } from 'stimulus-use/hotkeys';

export default class Chapter3Controller extends Controller {
  static targets = [
    'but'
  ];

  static values = {
    moving: { type: Boolean, default: false }
  };

  connect() {
    this.butTarget.style.left = '120%';
    useHotkeys(
      this,
      {
        hotkeys: {
          left: {
            handler: this.startMove,
            options: {
              keydown: true,
              keyup: true
            }
          }
        }
      }
    );
    window.requestAnimationFrame(this.moveLeft.bind(this));
  }

  startMove(o) {
    if(o.type == 'keydown') this.movingValue = true;
    else this.movingValue = false;
  }
  
  moveLeft() {
    if (this.movingValue) {
      let o = this.butTarget.style.left.replace('%', '');
      if(o > 75){
        this.butTarget.style.left = `${ o - 0.05 }%`;
      }
    }
    window.requestAnimationFrame(this.moveLeft.bind(this));
  }
}