$(function(){
  function loadContent(url){
    console.log("loading "+url);
    $('#content').load(url + ' #container').hide().fadeIn('slow');
  }
  $('nav a').on('click', function(e){
    e.preventDefault();
    var href = this.href;
    console.log("clicked " + href);
    var $this = $(this);
    $('a').removeClass('current');
    $this.addClass('current');
    loadContent(href);
    history.pushState('', $this.text, href);
  });

  window.onpopstate = function(){
    var path = location.pathname;
    console.log('path ' + path);
    loadContent(path);
    var page = path.substring(location.pathname.lastIndexOf('/')+1);
    console.log('page '+ page);
    
    $('a').removeClass('current');
    $('[href="'+page+'"]').addClass('current');
  };

});
