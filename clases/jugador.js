$("#formulario").submit(function(e){
    e.preventDefault();

    var usuario = {
        Name: $('#inputName').val(),
        Email: $('#inputEmail').val(),
        Password: $('#inputPassword').val(),   
        Avatar: $("input[type='radio'][name='avatarId']:checked").val()
    };

    $.post($(this).attr("action"), usuario, function (response) {
      console.log(response);

      window.location.href = 'index.html';
   });
   return false;
});
