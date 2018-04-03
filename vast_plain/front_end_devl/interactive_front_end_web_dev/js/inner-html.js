var firstItem = document.getElementById('one');
var showtextContent = firstItem.textContent;
var showInnerText = firstItem.innerText;

var secondItem = document.getElementById('two');
var itemContent = secondItem.innerHTML;

secondItem.innerHTML = '<a href=\"https//google.com\">'+itemContent+'</a>';

console.log("text Content " + showtextContent);
console.log("inner text " + showInnerText);

var msg = '<p>textContent: '+showtextContent+ '</p>';
msg +=  '<p>innerText: ' + showInnerText + '</p>';

var el = document.getElementById('scriptResults');
console.log("el is " + el.toString());
el.innerHTML = msg;

firstItem.textContent = 'sourdough bread';
