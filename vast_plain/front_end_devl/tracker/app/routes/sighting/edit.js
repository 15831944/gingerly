import Ember from 'ember';
import RSVP from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return RSVP.hash({
      sighting: this.store.findRecord('sighting', params.sighting_id),
      cryptid: this.store.findAll('cryptid'),
      witnesses: this.store.findAll('witness')
    })
  }
});
