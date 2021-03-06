$(function() {
  var $newItemButton = $('#newItemButton');
  var $newItemForm = $('#newItemForm');
  var item = '';
  var $list = $('ul');

  $('li').hide().each(function(index){
    $(this).delay(450*index).fadeIn(1600);
  });

  function updateCount(){
    var items = $('li[class!=complete]').length;
    console.log("items count " + items);
    $('#counter').text(items);
  }
  updateCount();

  $newItemButton.show();
  $newItemForm.hide();
  $('#showForm').on('click', function(){
    $newItemButton.hide();
    $newItemForm.show();
  });

  $newItemForm.on('submit', function(e){
    e.preventDefault();
    var text = $('input:text').val();
    $list.append('<li>'+text+'</li>');
    $('input:text').val('');
    updateCount();
  });

  $list.on('click', 'li', function(){
    var $this = $(this);
    var complete = $this.hasClass('complete');

    if (complete === true) {
      console.log("complete items");
      $this.animate({
        opacity: 0.9,
        paddingLeft: '+=180'
      }, 500, 'swing', function(){
        $this.remove();
      });
    }else {
      console.log("not complete ");
      item = $this.text();
      $this.remove();
      $list
        .append('<li class=\"complete\">' + item + '</li>')
        .hide().fadeIn(300);
        updateCount();
    }
  });


});
