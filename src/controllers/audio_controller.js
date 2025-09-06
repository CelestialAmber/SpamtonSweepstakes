import { Controller } from '@hotwired/stimulus';

export default class AudioController extends Controller {
  static targets = [
    'audioPlayer'
  ];

  static values = {
    playing: { type: String },
    bpm: { type: Number, default: 90 },
    volume: { type: Number, default: 0.5 },
    muted: { type: Boolean, default: false }
  };

  connect() {
    this.nextNote = false;
  }

  audioPlayerTargetConnected(o) {
    let t = o.querySelector('audio');
    t.volume = this.volumeValue;
  }

  playAudio(o) {
    let t = o.target;
    if(!o.target.classList.contains('audio-player')){
      t = o.target.closest('.audio-player');
    }

    let e = t.querySelector('audio');
    if (this.playingValue && this.playingValue != t.id) {
      let n = document.getElementById(this.playingValue);
      if(n) n.querySelector('audio').pause();
    }

    if(e.paused) e.play();
    t.classList.add('playing');
    this.playingValue = t.id;
    if(t.dataset.bpm){
      this.bpmValue = t.dataset.bpm;
    }
  }

  toggleAudio(o) {
    let t = o.target;
    if(!o.target.classList.contains('audio-player')){
      t = o.target.closest('.audio-player');
    }
    let e = t.querySelector('audio');
    if(t.classList.contains('playing')) e.pause();
    else e.play();
  }

  pauseAudio(o) {
    let t = o.target;
    if(!o.target.classList.contains('audio-player')){
      t = o.target.closest('.audio-player');
    }
    let e = t.querySelector('audio');
    t.classList.remove('playing');
    if(!document.querySelector('.audio-player.playing')){
      this.playingValue = '';
    }
  }

  spawnNote() {
    if (this.playingValue) {
      let o = document.getElementById(this.playingValue);
      if (o) {
        let t = o.querySelector('.audio-player__dog');
        if (t) {
          if(o.classList.contains('playing-alt')){
            o.classList.remove('playing-alt')
          }else {
            o.classList.add('playing-alt');
          }

          let e = document.createElement('img');
          e.src = '/assets/images/note-small.png';
          e.classList.add('absolute', 'animate-note', 'z-30', 'pixel');
          e.width = 18;
          e.height = 18;

          let n = Math.floor(Math.random() * 10) - 10;
          let i = Math.floor(Math.random() * 10) - 5;
          let a = Math.floor(Math.random() * 10) - 40;

          e.setAttribute(
            'style',
            `top: ${ Math.floor(Math.random() * 10) - 10 }; left: ${ Math.floor(Math.random() * 30) + 40 }%; offset-path: path('M 0 0 C ${ n } ${ n / 2 } ${ i } ${ a } ${ i } ${ a }`
          );
          t.appendChild(e);
          setTimeout(() => e.remove(), 1000);

          if(o.dataset.bpm) this.bpmValue = o.dataset.bpm;
          this.nextNote = setTimeout(this.spawnNote.bind(this), 60 / this.bpmValue * 1000);
        }
      }
    }
  }

  updateVolume(o) {
    if(o.target.muted){
      this.mutedValue = true;
      this.volumeValue = 0;
    }else{
      this.mutedValue = false;
      this.volumeValue = o.target.volume;
    }

    for (let t of this.audioPlayerTargets) {
      let e = t.querySelector('audio');
      e.volume = this.volumeValue;
    }
  }

  stopNotes() {
    if(this.nextNote){
      clearTimeout(this.nextNote);
      this.nextNote = false;
    }
  }

  syncNotes() {
    this.stopNotes();
    this.spawnNote();
  }
}

