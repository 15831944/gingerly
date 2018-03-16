function getTarget(e) {
  if (!e) {
    e = window.event;
  }
  return e.target || e.srcElement ;
}

function itemDone(e) {
  var target, elParent, elGrandParent;
  target = getTarget(e);
  elParent = target.parentNode;
  elGrandParent = target.parentNode.parentNode;
  elGrandParent.removeChild(elParent);
  e.preventDefault();
}

var el=document.getElementById('shoppingList');
el.addEventListener('click', function(e) {
  itemDone(e);
}, false);
