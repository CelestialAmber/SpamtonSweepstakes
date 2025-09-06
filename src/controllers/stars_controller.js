import { Controller } from '@hotwired/stimulus';

export default class StarsController extends Controller {
  static targets = [
    'star',
    'container'
  ];

  connect() {
    this.appendStar(
      Math.floor(Math.random() * 10) + 450,
      Math.floor(Math.random() * 10) + 100,
      false
    );
    this.appendStar(
      Math.floor(Math.random() * 10) + 320,
      Math.floor(Math.random() * 5) + 105,
      false
    );
    this.appendStar(
      Math.floor(Math.random() * 10) + 480,
      Math.floor(Math.random() * 10) + 150,
      false
    );
    this.appendStar(
      Math.floor(Math.random() * 10) + 500,
      Math.floor(Math.random() * 10) + 350,
      false
    );
    this.appendStar(
      0 - (Math.floor(Math.random() * 10) + 450),
      Math.floor(Math.random() * 10) + 100,
      false
    );
    this.appendStar(
      0 - (Math.floor(Math.random() * 10) + 320),
      Math.floor(Math.random() * 5) + 105,
      false
    );
    this.appendStar(
      0 - (Math.floor(Math.random() * 10) + 480),
      Math.floor(Math.random() * 10) + 150,
      false
    );
    this.appendStar(
      0 - (Math.floor(Math.random() * 10) + 500),
      Math.floor(Math.random() * 10) + 325,
      false
    );

    var o = Math.floor(Math.random() * 6) + 4;
    for (var t = 0; t < o; t++) {
      var e = Math.floor(Math.random() * 300) + 600 + t * 10;
      var n = Math.floor(Math.random() * 200) + 200 + t * 10;
      var i = false;

      if(t < 2) i = true;
      if(t % 2 == 0) e = 0 - e - 20;
      this.appendStar(e, n, i);
    }
  }

  appendStar(o, t, e) {
    var n = 6;
    if(!e){
      n = Math.floor(Math.random() * 5) + 1;
    }

    var i = Math.floor(Math.random() * 6) + 1;
    var a = Math.floor(Math.random() * 20) + 10;
    t += a * 2;

    var l = document.createElement('img');

    l.setAttribute(
      'class',
      'absolute opacity-50 animate-pulse motion-safe:translate-y-0'
    );
    l.setAttribute('data-distance', a);
    l.setAttribute('data-scroll-target', 'parallax');
    l.setAttribute('src', `/assets/images/star${ n }.png`);
    l.setAttribute(
      'style',
      `margin-left: ${ o }px; margin-top: ${ t }px; animation-delay: -${ i }s`
    );
    l.setAttribute('alt', 'Star');
    l.setAttribute('aria-hidden', 'true');
    this.containerTarget.append(l);
  }
}