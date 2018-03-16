var firstItem = document.getElementById('one');


if (firstItem.hasAttribute('class')){
  var attr = firstItem.getAttribute('class');
  console.log("first item attr was" + attr);
  var el2 = document.getElementById('scriptResult2');
  el2.innerHTML = '<p>The first item has a class name: ' + attr + '</p>';
}

firstItem.className = 'complete';

var fourthItem = document.getElementsByTagName('li').item(3);
fourthItem.setAttribute('class', 'cool');
