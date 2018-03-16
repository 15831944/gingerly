function checkUsername(e, minLen){
  console.log("minlen is " + minLen);
  var el, elMsg;
  if (!e) {
    e = window.event;
  }
  el = e.target || e.srcElement;
  elMsg = el.nextSibling;

  if (el.value.length < minLen) {
    console.log("flag error");
    elMsg.innerHTML = "User name must be " + minLen + " characters or more";
  } else {
    elMsg.innerHTML = '';
  }
}

var elUsername = document.getElementById("username");


elUsername.addEventListener('blur', function(e){
  console.log("enter add event listener")
  checkUsername(e, 5);
}, false);
