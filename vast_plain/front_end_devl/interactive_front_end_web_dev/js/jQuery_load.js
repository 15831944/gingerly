$('nav a').on('click', function(e){
  e.preventDefault();
  var url = this.href;
  console.log("url: "+ url);

  $('nav a.current').removeClass('current');
  $(this).addClass('current');

  $('#container').remove();
  $('#content').load(url + ' #container').hide().fadeIn('slow');
});
