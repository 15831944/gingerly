(function (window) {
  'use strict';
  var FORM_SELECTOR='[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR='[data-coffee-order="checklist"]';
  var SERVER_URL='http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';

  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var CheckList = App.CheckList;
  var Validation = App.Validation;

  console.log('enter main');
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var webshim = window.webshim;

  //var myTruck = new Truck ('ncc-1701', new DataStore());
  var myTruck = new Truck ('ncc-1701', remoteDS);
  window.myTruck = myTruck;

  var checkList =  new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

  var formHandler = new FormHandler(FORM_SELECTOR);
  //formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
  formHandler.addSubmitHandler(function (data) {
    console.log('add submit handler');
    return myTruck.createOrder.call(myTruck, data)
    .then (function () {
        checkList.addRow.call(checkList, data);
    },
    function() {
      alert('server unreachable');
    });
  });

  formHandler.addInputHandler(Validation.isCompanyEmail);
  myTruck.printOrders(checkList.addRow.bind(checkList));
  webshim.polyfill('forms forms-ext');
  webshim.setOptions('forms {addValidators: true, lazyCustomMessages: true}');

  //console.log(formHandler);

})(window);
