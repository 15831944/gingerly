function setup(){
  var  textInput;
  textInput = document.getElementById('username');
  textInput.focus();
}

var el = document.getElementById("username");
var elMsg = document.getElementById("feedback");

function checkUsername(){
 var username = el.value;
  if (username.length < 5) {
    elMsg.className = 'warning';
    elMsg.textContent = "not long enough yet";
  } else {
    elMsg.textContent = '';
  }
}

function tipUsername(){
  elMsg.className = 'tip';
  elMsg.innerHTML = 'Username must be at least 5 characters';
}

el.addEventListener('focus', tipUsername, false);
el.addEventListener('blur', checkUsername, false);

window.addEventListener('load',setup, false);
