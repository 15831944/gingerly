(function(window){
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    console.log('enter CheckList');
    if (!selector) {
      throw new Error ('no selector provider');
    }
    this.$element = $(selector);
    if (this.$element.length ===0) {
      throw new Error('Could not find element with selector ' + selector)
    }

  }

  function Row(coffeeOrder) {
    console.log('new Row');
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox'
    });
    var $label = $('<label></label');
    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    });
    var description = coffeeOrder.size + ' ';
    if (coffeeOrder.flaor) {
      description += coffeeOrder.flavor + ' ';
    }
    description += coffeeOrder.coffee + ' ';
    description += ' (' + coffeeOrder.emailAddress + ')';
    description += ' [' + coffeeOrder.strength + ']';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;

  }

  CheckList.prototype.addRow = function(coffeeOrder) {
    console.log('enter addRow');
    this.removeRow(coffeeOrder.emailAddress);

    var rowElement = new Row(coffeeOrder);
    console.log('this ' + this.toString());
    console.log('this elelemt' + this.$element.toString());
    this.$element.append(rowElement.$element);

  }
  CheckList.prototype.removeRow = function(email) {
   console.log('enter remove Row' + email);
   console.log('element to be remove ' + this.$element.toString());
   this.$element
      .find('[value="'+email+'"]')
      .closest('[data-coffee-order="checkbox"]')
      .remove();

 }

 CheckList.prototype.addClickHandler = function (fn) {
   this.$element.on('click', 'input', function(event) {
     var email = event.target.value;

     fn(email)
      .then(function(){
        this.removeRow(email);
      }.bind(this));
   }.bind(this));
 };

  App.CheckList = CheckList;
  window.App = App;
})(window);
