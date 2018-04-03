import Component from '@ember/component';
import { computed } from '@ember/object';
import { capitalize } from '@ember/string';

export default Component.extend({
  classNames: ["alert"],
  classNameBindings: ['typeClass'],
  typeClass: computed('alertType', function(){
    return "alert-" + this.get('alertType');
  }),
  typeTitle: computed('alertType', function(){
    return capitalize(this.get('alertType'));
  }),
  click(){
    this.get('close')();
  }
});
