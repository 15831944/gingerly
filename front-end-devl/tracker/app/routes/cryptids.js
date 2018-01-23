import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel(){
    this.store.createRecord('cryptid', {
      "name" : "Charlie",
      "cryptidType" : "unicorn"
    });
  },
  model(){
    return this.store.findAll('cryptid');
  }
});
