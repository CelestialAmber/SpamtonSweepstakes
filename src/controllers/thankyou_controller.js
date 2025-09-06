import { Controller } from '@hotwired/stimulus';

export default class ThankYouController extends Controller {
  static targets = [
    'button',
    'form',
    'feedback',
    'field'
  ];

  static values = {
    locale: { type: String, default: 'en' }
  };

  connect() {
    this.locale = {
      en: {
        unknown: 'Unknown contact.',
        error: 'She never smiled?',
        thank_you: 'Thank you.'
      },
      ja: {
        unknown: '不明の連絡先',
        error: '彼女は二度と笑わなかった？',
        thank_you: 'ありがとう。'
      }
    };
    this.destroyForm();
  }

  clearForm() {
    if (this.hasFieldTarget){
      for (let o of this.fieldTargets) o.value = '';
    }
  }

  destroyForm() {
    if (this.hasFieldTarget){
      for (let o of this.fieldTargets) o.remove();
    }
    if (this.hasButtonTarget){
      for (let o of this.buttonTargets) o.remove();
    }
  }

  checkInput() {
    this.destroyForm();
    //localeValue doesn't exist in this class anymore. The code to set it was
    //probably removed by accident.
    this.feedbackTarget.innerHTML = this.locale[this.localeValue].thank_you;
  }
}