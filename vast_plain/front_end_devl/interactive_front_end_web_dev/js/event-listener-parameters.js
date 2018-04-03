var elUsername = document.getElementById("username");
var elMsg = document.getElementById("feedback");

function checkUsername(minLen){
  console.log("minlen is " + minLen);
  if (elUsername.value.length < minLen) {
    elMsg.textContent = "User name must be " + minLen + " characters or more";
  } else {
    elMsg.textContent = '';
  }
}


elUsername.addEventListener('blur', function(){
  console.log("enter add event listener")
  checkUsername(5);
}, false);
