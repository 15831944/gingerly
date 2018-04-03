function checkUsername(){
  var elMsg = document.getElementById("feedback");
  if (this.value.length < 5) {
    elMsg.textContent = "User name must be 5 characters or nore"
  } else {
    elMsg.textContent = '';
  }
}

var elUsername = document.getElementById("username");
elUsername.addEventListener('blur', checkUsername, false);
