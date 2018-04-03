console.log("enter data-json.js");
var xhr = new XMLHttpRequest();
xhr.onload = function(){
 console.log("onload XMLHttpRequest");
  if(xhr.status === 200) {


    responseObject = JSON.parse(xhr.responseText);

    var newContent = '';
    for ( var i =0 ; i< responseObject.events.length; i++) {
      newContent += '<div class="event>"';
      newContent += '<img src="' + responseObject.events[i].map +'" ';
      newContent += 'alt="' + +responseObject.events[i].location +'"';
      newContent += '<p><b>' + responseObject.events[i].location + '</b></p>';
      newContent += responseObject.events[i].date + '</p>';
      newContent += '</div>';
    }
    console.log("nweContent=" + newContent);
    document.getElementById('content').innerHTML = newContent;
  }
};

console.log("get data");
xhr.open('GET', 'data/data.json', true);
xhr.send(null);
