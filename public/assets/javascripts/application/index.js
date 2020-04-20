$(() => {
  const loader = $('.loading-container');
  $('#faucetForm').submit(function (e) {
    e.preventDefault();
    	$this = $(this);
    loader.removeClass('hidden');
    const receiver = $('#receiver').val();
    $.ajax({
		  	url: '/',
		  	type: 'POST',
		  	data: $this.serialize(),
    }).done((data) => {
      grecaptcha.reset();
      if (!data.success) {
        loader.addClass('hidden');
        console.log(data);
        console.log(data.error);
        swal('Error', data.error.message, 'error');
        return;
      }

      $('#receiver').val('');
      loader.addClass('hidden');
      swal('Success',
			  `1 tKAT has been successfully transferred to <a href="http://catalystexplorer.z33.web.core.windows.net/tx/${data.success.txHash}" target="blank">${receiver}</a>`,
			  'success');
    }).fail((err) => {
      grecaptcha.reset();
      console.log(err);
      loader.addClass('hidden');
    });
  });
});
