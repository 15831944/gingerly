import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    return Ember.RSVP.hash({
      sighting: this.store.createRecord('sighting'),
      cryptids: this.store.findAll('cryptid'),
      witnesses: this.store.findAll('witness')
    });
  },
  actions: {
    willTransition(){
      var sighting = this.get('controller.model.sighting');
      if (sighting.get('hasDirtyAttributes')){
        sighting.deleteRecord();
      }
    }
  }
});
