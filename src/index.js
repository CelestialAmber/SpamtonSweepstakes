//The website is made with Bridgetown, a Ruby website framework

//Library versions:
//Fancyapps UI: 5.0.36
//Howler: 2.2.4
//Stimulus: unknown (probably 3.2.2) 
//basicScroll: unknown (probably 3.0.4)
//stimulus-components: unknown
//stimulus-use (uses hotkeys.js): unknown

import { Application } from '@hotwired/stimulus';
import Dialog from '@stimulus-components/dialog';
import { Fancybox } from '@fancyapps/ui';

import AudioController from './controllers/audio_controller';
import Chapter3Controller from './controllers/chapter3_controller';
import CountdownController from './controllers/countdown_controller';
import ParticlesController from './controllers/particles_controller';
import RareCatsController from './controllers/rarecats_controller';
import RombController from './controllers/romb_controller';
import RootsController from './controllers/roots_controller';
import ScrollController from './controllers/scroll_controller';
import StarsController from './controllers/stars_controller';
import ThankYouController from './controllers/thankyou_controller';
import TherapyController from './controllers/therapy_controller';
import VideoController from './controllers/video_controller';

const controllers = {
  './controllers/audio_controller.js': AudioController,
  './controllers/chapter3_controller.js': Chapter3Controller,
  './controllers/countdown_controller.js': CountdownController,
  './controllers/particles_controller.js': ParticlesController,
  './controllers/rarecats_controller.js': RareCatsController,
  './controllers/romb_controller.js': RombController,
  './controllers/roots_controller.js': RootsController,
  './controllers/scroll_controller.js': ScrollController,
  './controllers/stars_controller.js': StarsController,
  './controllers/thankyou_controller.js': ThankYouController,
  './controllers/therapy_controller.js': TherapyController,
  './controllers/video_controller.js': VideoController
};

Fancybox.bind(
  '[data-fancybox]',
  {
    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: [
          'close'
        ]
      }
    },
    Thumbs: {
      type: 'classic'
    },
    Hash: false
  }
);

window.Stimulus = Application.start();
//Register Dialog component
Stimulus.register('dialog', Dialog);

//Register custom page controls
Object.entries(controllers).forEach(
  ([filename, symbol]) => {
    if (filename.includes('_controller.') || filename.includes('-controller.')) {
      let e = filename.replace('./controllers/', '').replace(/[_-]controller\..*$/, '').replace(/_/g, '-').replace(/\//g, '--');
      Stimulus.register(e, symbol.default);
    }
  }
);
