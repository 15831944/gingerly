import $ from 'jquery';

export class ChatForm {
  constructor(formSel, inputSel) {
    this.$form = $(formSel);
    this.$input = $(inputSel);
  }


  init(submitCallback) {
    console.log('---enter init submitcallback');
    this.$form.submit((event) => {
      console.log('---inside submit event ')
      event.preventDefault();
      let val = this.$input.val();
      console.log('---sending val out ' + val);
      submitCallback(val);
      this.$input.val('');
    });
    this.$form.find('button').on('click', () =>this.$form.submit());
  }

}

export class ChatList{
  constructor (listSel, username) {
    this.$list = $(listSel);
    this.username = username;
  }

  drawMessage( {user: u , timestamp: t, message: m} ) {
    let $messageRow = $('<li>', {
      'class': 'message-row'
    });

    if (this.username ===u) {
      $messageRow.addClass('me');
    }

    let $message = $('<p>');

    $message.append($('<span>', {
      'class': 'message-username',
      text: u
    }));

    $message.append($('<span>' , {
      'class': 'timestap',
      'data-time': t,
      text: (new Date(t).getTime())
    }));

    $message.append($('<span>', {
      'class': 'message-message',
      text: m
    }));


    $messageRow.append($message);
    this.$list.append($messageRow);
    $messageRow.get(0).scrollIntoView();
  }
}
