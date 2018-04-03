$(function(){
  $('li').on('click', function(){
    $(this).animate({
      opacity: 0.0,
      paddingLeft: '+=80'
    }, 5000 , function(){
      $(this).remove();
    });
  });
});
