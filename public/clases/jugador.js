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

$("#formulario").submit(function (e) {
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

    $.ajax({
        url: $(this).attr("action"),
        type: 'POST',
        dataType: 'json',
        async:false,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(usuario),
        destroy: true,
        success: function (result) {
            if (usuario != undefined) {
                var nombre = document.getElementById('#inputName').value;
                localStorage.setItem("Nombre", nombre);
    
            }
        }
     });

    
    

   /* $.post($(this).attr("action"), usuario, function (response) {
        console.log(response);

        if (usuario != undefined) {
            var nombre = document.getElementById('#inputName').value;
            localStorage.setItem("Nombre", nombre);

        }



    });*/
    return false;
});


function capturarSiSePuede (x, y){
    $("#c" + x + y).css("background", "blue");
}


