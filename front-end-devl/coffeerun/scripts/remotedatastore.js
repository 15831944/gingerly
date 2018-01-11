(function (window){
  'use strict';

  var App = window.App;
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error ('No remote URL provided');
    }
    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function (key, val) {
    return $.post(this.serverUrl, val, function (serverResponse){
      console.log("anonymous call back from post - " + serverResponse);
    });

  }

  RemoteDataStore.prototype.remove = function (key) {
    return $.ajax(this.serverUrl+'/'+key , {
      type: 'DELETE'
    });
  }

  RemoteDataStore.prototype.get = function (key, cb) {
    return $.get(this.serverUrl+'/'+key ,  function (serverResponse){
      if (cb) {
        console.log(serverResponse);
        cb(serverResponse);
      }
    });
  }
  RemoteDataStore.prototype.getAll = function (cb) {
    return $.get(this.serverUrl,  function (serverResponse){
      if (cb) {
        console.log(serverResponse);
        cb(serverResponse);
      }

    });
  }
  App.RemoteDataStore = RemoteDataStore;
  window.App = App;


})(window);
