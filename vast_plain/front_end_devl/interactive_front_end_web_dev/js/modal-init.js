(function(){
  console.log("enter modal-init");
  var $content = $('#share-options').detach();
  $('#share').on('click', function(){
    modal.open({
      content: $content,
      width: 340,
      height: 300
    });
  });
}());
