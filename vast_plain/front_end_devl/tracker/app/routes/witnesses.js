import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    /*************************************************
    let witnessRecord = this.store.createRecord('witness', {
      fName: "John",
      lName: "Smith",
      email: "john@email.com"
    });
    return [witnessRecord];
    ****************************************************/
    return this.store.findAll('witness');
  }
});
