
import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    create(){
      var self= this;
      this.get('model.sighting').save().then(function(){
        self.send('flash', {
          alertType: "success",
          message: "New sighting"
        });
        self.transitionToRoute('sightings');
      });
    },
    cancel(){
      this.get('model.sighting').deleteRecord();
      this.transitionToRoute('sightings');
    }
  }
});
