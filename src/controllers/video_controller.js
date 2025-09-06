import { Controller } from '@hotwired/stimulus';

export default class VideoController extends Controller {
  static targets = [
    'container',
    'playButton',
    'video'
  ];

  connect() {
    for (let o of this.element.querySelectorAll('video')){
      o.setAttribute('data-video-target', 'video');
    }
  }

  playVideo(o) {
    if(this.hasVideoTarget && this.hasPlayButtonTarget){
      this.videoTarget.play();
      this.videoTarget.setAttribute('controls', true);
      this.playButtonTarget.classList.add('hidden');
      this.videoTarget.focus();
    }
  }

  playExternalVideo(o) {
    if(this.hasContainerTarget){
      o.preventDefault();
      this.containerTarget.innerHTML =
      `<iframe class="w-full aspect-video" src="https://www.youtube-nocookie.com/embed/${ o.params.ytid }?autoplay=1"`
      + ` credentialless allowfullscreen referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin"`
      + ` csp="sandbox allow-scripts allow-same-origin;" frameborder="0" allow="accelerometer 'none'; ambient-light-sensor 'none';`
      + ` autoplay 'none'; battery 'none'; browsing-topics 'none'; camera 'none'; display-capture 'none'; domain-agent 'none';`
      + ` document-domain 'none'; encrypted-media 'none'; execution-while-not-rendered 'none'; execution-while-out-of-viewport '';`
      + ` gamepad 'none'; geolocation 'none'; gyroscope 'none'; hid 'none'; identity-credentials-get 'none'; idle-detection 'none';`
      + ` local-fonts 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; otp-credentials 'none'; payment 'none';`
      + ` picture-in-picture 'none'; publickey-credentials-create 'none'; publickey-credentials-get 'none'; screen-wake-lock 'none';`
      + ` serial 'none'; speaker-selection 'none'; usb 'none'; window-management 'none'; xr-spatial-tracking 'none'"></iframe>`;
    }
  }
}