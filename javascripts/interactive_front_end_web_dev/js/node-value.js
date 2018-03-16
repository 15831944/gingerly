var itemTwo = document.getElementById('two');
var elText = itemTwo.firstChild.nodeValue;
console.log("nodevalue " + elText);
elText = elText.replace('pine nuts', 'kale');
console.log("new nodevalue " + elText);
itemTwo.firstChild.nodeValue = elText;
