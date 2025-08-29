import * as basicScroll from 'basicScroll'
import { Controller } from '@hotwired/stimulus';

export default class ScrollController extends Controller {
  parallaxTargetConnected(o) {
    o.classList.add('parallax');

    let t = 10;
    if('distance' in o.dataset) t = o.dataset.distance;
    let e = window.innerHeight / 200;

    basicScroll.create({
      elem: o,
      from: 0,
      to: 'bottom-top',
      direct: true,
      props: {
        '--tw-translate-y': {
          from: 0,
          to: `-${ e * t }px`
        }
      }
    }).start();
  }

  parafadeTargetConnected(o) {
    o.classList.add('parafade');
    basicScroll.create({
      elem: o,
      from: 'top-bottom',
      to: 'top-middle',
      direct: true,
      props: {
        opacity: {
          from: 0,
          to: 1
        }
      }
    }).start();
  }

  parashadowTargetConnected(o) {
    o.classList.add('parafade');
    basicScroll.create({
      elem: o,
      from: 'top-bottom',
      to: 'middle-middle',
      direct: true,
      props: {
        '--shadow-length': {
          from: '100px',
          to: '10px'
        },
        '--shadow-y': {
          from: '100px',
          to: '10px'
        },
        '--shadow-z': {
          from: '-100px',
          to: '-10px'
        }
      }
    }).start();
  }

  scrollTo(o) {
    if(document.querySelector(o.params.element)){
      document.querySelector(o.params.element).scrollIntoView({ behavior: 'smooth' });
    }else{
      window.location.href = `${ window.location.origin }${ o.params.element }`;
    }
  }
}

__publicField(ScrollController, 'targets', [
  'parallax',
  'parafade'
]);