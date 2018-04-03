var price ;
var quantity;
var total;
var username ;
var message;
var title ;
var inStock;
var shipping;
inStock = true;
shiping = false;


title = "Molly's Sepcial Offers";
username = "Molly";
message = '<a href=\"sale.html\">25% off!</a>';

price =5;
quantity = 14;
total = price * quantity;

var elName = document.getElementById('elName');
//elName.textContent = username;
var elTitle = document.getElementById('title');
console.log("element is " + elTitle);
elTitle.innerHTML = title;

var elNote = document.getElementById('note')
elNote.innerHTML = message;

var el=document.getElementById("cost");

el.textContent = '$' + total;

var elStock = document.getElementById('stock');
console.log("element is " + elStock);
elStock.className = inStock;
var elShipping = document.getElementById('shipping');
console.log("element is " + elShipping);
elShipping.className= shipping;
