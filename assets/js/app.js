
  //update this with your $form selector
  var form_id = "jquery_form";

  var data = {
      "access_token": "ocnhkl8pvs9r0go38iyw4owi"   // Dev's
  };

  function onSuccess() {
      sendButton.val('Send');
      sendButton.prop('disabled', false);
  }

  function onError(error) {
      sendButton.val('Send');
      sendButton.prop('disabled', false);
  }

  var sendButton = $("#" + form_id + " [name='send']");

  function send() {
      sendButton.val('Sending…');
      sendButton.prop('disabled', true);

      var subject = "Notification from personal website!";
      var message = $("#" + form_id + " [name='text']").val();
      var address = $("#" + form_id + " [name='extra_address']").val();
      var email = $("#" + form_id + " [name='extra_email']").val();

      data['subject'] = subject;
      data['text'] = message;
      data['extra_address'] = address;
      data['extra_email'] = email;

      $.post('https://postmail.invotes.com/send',
          data,
          onSuccess
      ).fail(onError);

      return false;
  }

  sendButton.on('click', send);

  var $form = $("#" + form_id);

  $form.submit(function (event) {
      event.preventDefault();
  });

 

