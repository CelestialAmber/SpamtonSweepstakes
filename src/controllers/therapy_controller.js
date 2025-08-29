import { Controller } from '@hotwired/stimulus';

export default class TherapyController extends Controller {
  startDrawing(o) {
    this.drawingValue = true;
  }

  stopDrawing(o) {
    this.drawingValue = false;
  }

  draw(o) {
    if (this.drawingValue) {
      let t = document.elementFromPoint(o.clientX, o.clientY);

      if ('therapyTarget' in t.dataset && t.dataset.therapyTarget == 'cover') {
        let n = document.querySelectorAll('.revealed').length;

        t.classList.remove('z-3');
        t.classList.add('z-1', 'revealed');
        this.treeTarget.setAttribute('style', `opacity: ${ n / 300 }`);

        if (n > 300){
          for (let i of this.coverTargets){
            i.classList.remove('z-3');
          }
          i.classList.add('z-1', 'revealed');
          this.treeTarget.classList.remove('pointer-events-none');
        }
      }

      let e = document.createElement('span');

      e.classList.add(
        'absolute',
        'w-[8px]',
        'h-[8px]',
        'bg-white',
        'pointer-events-none',
        'select-none'
      );

      if(this.revealingValue){
        e.classList.add('z-1');
      }else {
        e.classList.add('z-4');
      }

      e.setAttribute('data-therapy-target', 'dot');
      e.setAttribute('style', `left: ${ o.clientX }px; top: ${ o.clientY }px`);
      this.containerTarget.append(e);

      if (this.dotTargets.length > 500) {
        let n = this.dotTargets.length - 500;
        for (let i of this.dotTargets){
          i.remove();
          n -= 1;
          if (n <= 0) break;
        }
      }

      this.dotsDrawnValue += 1;

      if(this.revealingValue == false && this.dotsDrawnValue > 2500){
        this.revealingValue = true;
        this.treeTarget.classList.remove('hidden');
        this.coverboxTarget.classList.remove('hidden');
        this.treeTarget.setAttribute('style', 'opacity: 0');
      }
    }
  }
}

__publicField(TherapyController, 'targets', [
  'container',
  'coverbox',
  'cover',
  'dot',
  'tree'
]);

__publicField(TherapyController, 'values', {
    drawing: { type: Boolean, default: false },
    dotsDrawn: { type: Number, default: 0 },
    revealing: { type: Boolean, default: false }
});