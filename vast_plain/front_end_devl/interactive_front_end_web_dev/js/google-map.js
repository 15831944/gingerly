function init(){
  var pinLocation = new google.maps.LatLng(40.78270, -73.96530) ;
  var mapOptions = {
    center: pinLocation,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 15,
    panControl: false,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL,
      position: google.maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      position: google.maps.ControlPosition.TOP_LEFT
    },
    scaleControl: true,
    scaleControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER
    },
    streetViewControl: false,
    overviewMapControl: false ,
    styles: [
     {
       stylers: [
         { hue: "#00ff6f" },
         { saturation: -50 }
       ]
     }, {
       featureType: "road",
       elementType: "geometry",
       stylers: [
         { lightness: 100 },
         { visibility: "simplified" }
       ]
     }, {
       featureType: "transit",
       elementType: "geometry",
       stylers: [
         { hue: "#ff6600" },
         { saturation: +80 }
       ]
     }, {
       featureType: "transit",
       elementType: "labels",
       stylers: [
         { hue: "#ff0066" },
         { saturation: +80 }
       ]
     }, {
       featureType: "poi",
       elementType: "labels",
       stylers: [
         { visibility: "off" }
       ]
     }, {
       featureType: "poi.park",
       elementType: "labels",
       stylers: [
         { visibility: "on" }
       ]
     }, {
       featureType: "water",
       elementType: "geometry",
       stylers: [
         { hue: "#c4f4f4" }
       ]
     }, {
       featureType: "road",
       elementType: "labels",
       stylers: [
         { visibility: "off" }
       ]
     }
   ]
  };
  var venueMap;
  vanueMap = new google.maps.Map(document.getElementById('map'), mapOptions);
  var startPosition = new google.maps.Marker({
    position: pinLocation,
    map: venueMap,
    icon: "img/go.png"
  });
}

function loadScript(){
  console.log("loading script");
  var script = document.createElement('script');
  script.src='http://maps.googleapis.com/maps/api/js?key=AIzaSyBmhwfVdmfu5qDDX0rJIUM6quW3B282GOs&sensor=false&callback=init';
  document.body.appendChild(script);
}

console.log('enter google map js');
window.onload = loadScript();
