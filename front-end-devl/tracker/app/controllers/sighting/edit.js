import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  sighting: Ember.computed.alias('model.sighting'),
  actions: {
    update(){
      if (this.get('sighting').get('hasDirtyAttributes')){
        this.get('sighting').save().then( () => {
          this.transitionToRoute('sightings');
        });
      }
    },
    cancel(){
      if (this.get('sighting').get('hasDirtyAttributes')) {
        this.get('sighting').rollbackAttribute();
      }
      this.transitionToRoute('sightings');
    }
  }
});
