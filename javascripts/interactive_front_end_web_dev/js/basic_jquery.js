$(':header').addClass('headline');
$('li em').addClass('seasonal');
$('li.hot').addClass('favorite');

$('ul').before('<p class="notice">Just Updated</p>');
$('ul').attr('id', 'group');

//$('li:lt(3)').hide().fadeIn(1500);
$('li[id!="one"]').hide().delay(500).fadeIn(1400);


//$('li:contains("pine")').text('almonds');
$('li.hot').prepend('+ ');
$('li.hot').html(function() {
    return '<em>' + $(this).text() + '</em>';
  });
//$('li#one').remove();
var $newListItem = $('<li><em>gluten free </em>soy sauce</li>');
$('li:last').after($newListItem);

var backgroundColor = $('li').css('background-color');
console.log("background " + backgroundColor);
$('li').css({
  'background-color': '#c5a996',
  'border': '1px solid #fff',
  'color': '#000',
  'font-family': 'Georgia',
  'padding-left': '+=75'
});

var ids = '';
var $listItems = $('li');

$('li').each(function(){
  ids = this.id;
  $(this).append(' <span class="order"> ' + ids + '</span>');
});

$listItems.on('mouseover', function(){
  ids = this.id;
  $listItems.children('span').remove();
  $(this).append(' <span class="priority">' + ids + '</span>');
});

$listItems.on('mouseout', function(){

  $(this).children('span').remove();
});


$('li').on('click', function(e){
  //$(this).remove();
  console.log("event type " + e.type );
  var date = new Date();
  date.setTime(e.timeStamp);
  console.log(date.toDateString());

  $(this).addClass('complete');
});
