function celebrityIDCreator (theCelebrities) {
    console.log('enter id creator func');
    var i;
    var uniqueID = 100;
    for (i = 0; i < theCelebrities.length; i++) {
      console.log('for loop i='+ i);
      theCelebrities[i]["id"] = function ()  {
        console.log('enter anonymous func , i=' + i);
        return uniqueID + i;
      }
    }
    
    console.log('return creator func, i=' + i);
    return theCelebrities;
}

console.log('set action celebs array');
var actionCelebs = [{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}];

console.log('init id creator func');
var createIdForActionCelebs = celebrityIDCreator (actionCelebs);

console.log('init stall id as 0');
var stalloneID = createIdForActionCelebs [0];

console.log('calling id property');
console.log(stalloneID.id()); // 103
