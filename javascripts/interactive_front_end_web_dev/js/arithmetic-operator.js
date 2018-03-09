var subtotal = (13+1)*5;
var shipping = 0.5*(13+1);

var total = subtotal +  shipping;

var elSub = document.getElementById('subtotal');
elSub.textContent = subtotal;

var elShipping = document.getElementById('shipping');
elShipping.textContent = shipping;

var elTotal = document.getElementById('total');
elTotal.textContent = total;
