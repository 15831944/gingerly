import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    let record1 = this.store.createRecord('sighting', {
      location: 'Atlanta',
      sightedAt: new Date('2017-05-01')
    });

    let record2 = this.store.createRecord('sighting', {
      location: 'Hartford',
      sightedAt: new Date('2017-06-01')
    });
    let record3 = this.store.createRecord('sighting', {
      location: 'Raleigh',
      sightedAt: new Date('2017-07-01')
    });
    let record4 = this.store.createRecord('sighting', {
      location: 'Detroit',
      sightedAt: new Date('2017-08-01')
    });

    return [record1, record2, record3, record4 ];
  }
});
