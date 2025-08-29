import { Howl } from 'howler';
import { Controller } from '@hotwired/stimulus';

export default class RootsController extends Controller {
  connect() {
    this.sound = new Howl({
      src: [
        '/assets/audio/chord.ogg',
        '/assets/audio/chord.mp3'
      ],
      volume: 0.5
    });
  }

  click(o) {
    if(this.clicksValue >= 3){
      window.location.href = '/window';
    }else{
      o.preventDefault();
      this.sound.play();
      this.clicksValue += 1;
    }
  }
}

__publicField(RootsController, 'values', {
  clicks: { type: Number, default: 0 }
});