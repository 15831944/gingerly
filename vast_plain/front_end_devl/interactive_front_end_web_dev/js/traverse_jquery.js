$(function(){
  var $h2 = $('h2');
  $('ul').hide();
  console.log("add show ..");
  $h2.append('<a>show</a>');

  $h2.on('click', function(){
    $h2.next()
      .fadeIn(5000)
      .children('.hot')
      .addClass('complete');
      $h2.find('a').fadeOut();
  });
});
