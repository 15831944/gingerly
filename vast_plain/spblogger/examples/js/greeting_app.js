'use strict';

angular.module('greetingApp', []).
  controller('GreetingController', function($scope) {
  	this.now = new Date();
    this.helloMessages = ['hello', 'bonjour', 'hola', 'ciao', 'hallo'];

  	this.greeting = this.helloMessages[0];
    this.getRandomHelloMessage = function (){
      this.greeting = this.helloMessages[parseInt((Math.random() * this.helloMessages.length))];
    }
  });
