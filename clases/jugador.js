/*function capturarForm(){
   
    var nombreCapturar = document.getElementById("inputName").value;
    //console.log(nombreCapturar);

    var apellidoCapturar = document.getElementById("inputSurname").value;
    //console.log(apellidoCapturar);

    var emailCapturar = document.getElementById("inputEmail").value;
    //console.log(emailCapturar);

    var paisCapturar = document.getElementById("inputState").value;
    //console.log(paisCapturar);

    var ciudadCapturar = document.getElementById("inputCity").value;
   // console.log(ciudadCapturar);

    var passwordCapturar = document.getElementById("inputPassword").value;
    //console.log(passwordCapturar);

    var avatarCapturar = document.getElementById("inputAvatar").value;
    //console.log(avatarCapturar);

   
}*/

$("#formulario").submit(function(e){
    e.preventDefault();

    var usuario = {
        Name: $('#inputName').val(),
        Surname: $('#inputSurname').val(),
        Email: $('#inputEmail').val(),
        State: $('#inputState').val(),
        City: $('#inputCity').val(),
        Password: $('#inputPassword').val(),   
        Avatar: $("input[type='radio'][name='avatarId']:checked").val()
    };

    //$("input[name=rate]:checked").val()
    //$("input[type='radio'][name='rate']:checked").val();

    $.post($(this).attr("action"), usuario, function (response) {
      console.log(response);

      if(usuario != undefined){
        var nombre = document.getElementById('#inputName').value;
        localStorage.setItem("Nombre", nombre);
    
      }



   });
   return false;
});

/*var form = document.querySelector("#formulario");

form.addEventListener('submit', function(){
    console.log("entra");
    var nombre = document.getElementById('#inputName').value;
    localStorage.setItem("Nombre", nombre);

});*/
