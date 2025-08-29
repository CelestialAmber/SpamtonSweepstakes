import { Controller } from '@hotwired/stimulus';

export default class ParticlesController extends Controller {
  connect() {
    if (this.hasContainerTarget) {
      var o = Math.floor(Math.random() * 4) + 6;
      for (var t = 0; t < o; t++) {
        var e = Math.floor(Math.random() * 600) + 600 + t * 10;
        var n = Math.floor(Math.random() * 400) + 20 + t * 10;
        if(t % 2 == 0){
          e = 0 - e - 20;
        }
        this.appendParticle(e, n, this.containerTarget);
      }

      var i = Math.floor(Math.random() * 4) + 8;
      for (var t = 0; t < i; t++) {
        var e = Math.floor(Math.random() * 600) + 800 + t * 10;
        var n = Math.floor(Math.random() * 400) + 20 + t * 10;
        if(t % 2 == 0){
          e = 0 - e - 20;
        }
        this.appendPixel(e, n, this.containerTarget);
      }
    }

    if (this.hasMobileTarget && false) {
      var o;
      for (var t; t < o; t++){
        var e;
        var n;
      }
      var i;
      for (var t; t < i; t++){
        var e;
        var n;
      }
    }
  }

  appendParticle(o, t, e, n = 12) {
    var i = Math.floor(Math.random() * 3) + 1;
    if(o > 0) i += 3;
    var a = Math.floor(Math.random() * 6) + 1;
    var l = Math.floor(Math.random() * 80) + 50;
    t += l * 2;

    var c = document.createElement('img');

    c.setAttribute(
      'class',
      'absolute opacity-50 animate-pulse motion-safe:translate-y-0'
    );
    c.setAttribute('data-distance', l);
    c.setAttribute('data-scroll-target', 'parallax');
    c.setAttribute('src', `/assets/images/particle-${ i }.png`);
    c.setAttribute(
      'style',
      `margin-left: ${ o }px; margin-top: ${ t }px; animation-delay: -${ a }s; max-width: ${ n }px`
    );
    c.setAttribute('alt', 'Particle');
    c.setAttribute('aria-hidden', 'true');
    e.append(c);
  }

  appendPixel(o, t, e, n = 4) {
    var i = Math.floor(Math.random() * n) + 2;
    var a = Math.floor(Math.random() * 6) + 1;
    var l = Math.floor(Math.random() * 100) + 20;
    var c = Math.floor(Math.random() * 200);
    t += l * 2;

    var h = document.createElement('span');

    h.setAttribute(
      'class',
      'absolute animate-pulse motion-safe:translate-y-0 border-0'
    );
    h.setAttribute('data-distance', l);
    h.setAttribute('data-scroll-target', 'parallax');
    h.setAttribute(
      'style',
      `margin-left: ${ o }px; margin-top: ${ t }px; width: ${ i }px; height: ${ i }px; background-color: rgb(${ c }, ${ c }, 255); animation-delay: -${ a }s`
    );
    h.setAttribute('aria-hidden', 'true');
    e.append(h);
  }
}

__publicField(ParticlesController, 'targets', [
  'particle',
  'container',
  'mobile'
]); 