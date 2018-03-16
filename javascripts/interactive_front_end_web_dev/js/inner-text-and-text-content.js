var firstItem = document.getElementById('one');
var showtextContent = firstItem.textContent;
var showInnerText = firstItem.innerText;

console.log("text Content " + showtextContent);
console.log("inner text " + showInnerText);


var msg = '<p>textContent: '+showtextContent+ '</p>';
//msg +=  '<p>innerText: ' + showInnerText + '</p>';
if (firstItem.hasAttribute('class')){
  var attr = firstItem.getAttribute('class');
  console.log("first item attr " + attr);
  var el2 = document.getElementById('scriptResult2');
  el2.innerHTML = '<p>The first item has a class name: ' + attr + '</p>';
}
var el = document.getElementById('scriptResults');
console.log("el is " + el.toString() + "  ===" + msg);
el.innerHTML = msg;

firstItem.textContent = 'sourdough bread';
