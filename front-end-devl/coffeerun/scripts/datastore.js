(function (window) {
  'use strict'
  var App = window.App || {};
  var Promise = window.Promise;

  function DataStore (){
    console.log('running datastore function');
    this.data = {};

  }
  function promiseResolveWith(value) {
    var promise = new Promise(function(resolve, reject){
      resolve(value);
    });
    return promise;
  }

  DataStore.prototype.add = function (key, val) {

    var promise = new Promise(function(resolve, reject){
      this.data[key] = val;
      resolve(null);
    }.bind(this));
    return promise;

  };

  DataStore.prototype.get = function (key) {
    //return this.data[key];
    return promiseResolveWith(this.data[key]);
  };

  DataStore.prototype.getAll = function () {
    //return this.data ;
    return promiseResolveWith(this.data);
  };

  DataStore.prototype.remove = function (key) {
    delete this.data[key];
    return promiseResolveWith(null);
  };

  App.DataStore = DataStore;
  window.App = App;

}) (window);
