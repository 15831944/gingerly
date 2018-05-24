(function(){
  console.log("enter modal-init");
  var $content = $('#share-options').detach();
  $('#share').on('click', function(){
    modal.open({
      content: $content,
      width: 240,
      height: 300
    });
  });
}());
