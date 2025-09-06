import { Controller } from '@hotwired/stimulus';

export default class CountdownController extends Controller {
  static targets = [
    'date',
    'countdown',
    'info'
  ];

  static values = {
    time: { type: String, default: '' },
    cooldown: { type: Number, default: 0 },
    started: { type: Boolean, default: false },
    locale: { type: String, default: 'en_US' },
    source: { type: String, default: 'https://files.deltarune.com/is-it-ready-yet.txt' },
    timeSinceRefresh: { type: Number, default: 0 }
  };

  connect() {
    this.localeValue = document.querySelector('meta[property="og:locale"]').content;
    this.getLatestCountdown();
  }

  updateCountdown() {
    this.timeSinceRefreshValue += 1;
    if(this.timeSinceRefreshValue >= 300){
      this.timeSinceRefreshValue = 0;
      this.getLatestCountdown();
    }

    let o = new Date().getTime();
    let t = new Date(this.timeValue);
    let e = '';
    let n = t.getTime() - o;
    
    let i = Math.floor(n / (1000 * 60 * 60 * 24));
    if(i < 10 && i > 0) i = `0${ i }`;
    
    let a = Math.floor(n % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    if(a < 10 && a >= 0) a = `0${ a }`;
    
    let l = Math.floor(n % (1000 * 60 * 60) / (1000 * 60));
    if(l < 10 && l >= 0) l = `0${ l }`;
    if(l == 0) l = '00';
    
    let c = Math.floor(n % (1000 * 60) / 1000);
    if(c < 10) c = `0${ c }`;

    if(i == 0) {
      if(a == 0) {
        e = ' scale-[1.5]';
      } else {
        e = ' scale-[1.3]';
      }
    } else if(i <= 3) e = ' scale-[1.1]';

    if (n < 0) {
      this.dateTarget.innerHTML = 'NOW';
      this.countdownTarget.innerHTML = '(REFRESH)';
      document.getElementById('index2').classList.remove('hidden');
      document.getElementById('index1').classList.add('hidden');
    } else {
      if (this.localeValue == 'ja_JP'){
        //Much simpler lol
        this.dateTarget.innerHTML = `${ this.timeValue.substring(0, 4) }年${ this.timeValue.substring(6, 7) }月${ this.timeValue.substring(9, 10) }日　リリース`;
      } else {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ];

        let date = this.timeValue.substring(9, 10);

        this.dateTarget.innerHTML = `Releasing on ${ months[t.getMonth()] } ${ date - 1 }, ${ this.timeValue.substring(0, 4) }`;
        this.infoTarget.innerHTML = `* ${ months[t.getMonth()] } ${ date } in Japan, Australia, and New Zealand`;
      }

      this.countdownTarget.innerHTML =
      `<div class='flex gap-x-2 items-center justify-center${ e }'>`
      + `${ i > 0 ? '<span class=\'text-3xl whitespace-nowrap md:text-6xl min-w-[50px] md:min-w-[86px] text-right\'>' + i + '</span><span class=\'text-2xl md:text-5xl w-4 md:w-8\'>:</span>' : '' }`
      + `${ i > 0 || a > 0 ? '<span class=\'text-3xl whitespace-nowrap md:text-6xl min-w-[50px] md:min-w-[86px] text-right\'>' + a + '</span><span class=\'text-2xl md:text-5xl w-4 md:w-8\'>:</span>' : '' }`
      + `<span class='text-3xl whitespace-nowrap md:text-6xl min-w-[50px] md:min-w-[86px] text-right'>${ l }</span>`
      + `<span class='text-2xl md:text-5xl w-4 md:w-8'>:</span>`
      + `<span class='text-3xl whitespace-nowrap md:text-6xl min-w-[50px] md:min-w-[86px] text-right'>${ c }</span>`
      + `</div>`;
    }
  }

  getLatestCountdown() {
    fetch(this.sourceValue, {
      cache: 'no-store'
    }).then(o => o.text()).then(
      o => {
        if(o == 'NO') this.startCountdown()
        else if(!o.includes('https')){
          this.timeValue = o;
          this.startCountdown();
        }
      }
    ).catch(
      o => {
        this.timeValue = '2025-06-05T00:00:00+09:00';
        this.startCountdown();
      }
    )
  }

  startCountdown() {
    this.updateCountdown(),
    this.startedValue ||
    (
      setInterval(this.updateCountdown.bind(this), 1000),
      this.startedValue = true
    )
  }
}