var elForm, elSelectPackage, elPackageHint, elTerms, elTermsHint;

elForm = document.getElementById("formSignup");
elSelectPackage = document.getElementById("package");
elPackageHint = document.getElementById("packageHint");
elTerms = document.getElementById("terms");
elTermsHint = document.getElementById("termHint");
function packageHint(){
  var package = this.options[this.selectedIndex].value;
  console.log("package selected " + package);
  if (package == 'monthly') {
    elPackageHint.innerHTML='Save $10 if yo upay for 1 year';
  } else {
    elPackageHint.innerHTML='Wise choice';
  }
}
function checkTerms (event) {
  console.log("enter check Terms");
  console.log('elterms ' + elTerms.toString())
  if (!elTerms.checked) {
    console.log("not checked");
    elTermsHint.innerHTML = 'You must agree to the terms';
    event.preventDefault();
  }

  event.preventDefault();
}

elForm.addEventListener('submit', checkTerms, false);
elSelectPackage.addEventListener('change', packageHint, false);
