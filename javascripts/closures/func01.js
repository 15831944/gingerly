function createFunctions(){
 console.log('enter createFuncs');
 var result = new Array();
 for (var i=0; i<10;  i++) {
	 result[i] = function(num){
 	   return function() {
		 return num;
	   }()
	 }(i);

 }
 console.log ( 'result -0' + result[0]);
 console.log ( ' result -8 ' + result[8]);
 return result;
}

var result1 = createFunctions();
console.log( 'result1 - 0 ' +  result1[0]);
