$("#userLogin").submit(function (e) {
    e.preventDefault();

    var login = {
        email: $('#email').val(),
        password: $('#password').val()
    };

   /* $.post($(this).attr("action"), login, function (response) {
        if (response == null) {
            alert("Error de login");
        } else {
            sessionStorage.setItem("p", JSON.stringify(response));
            window.location.href = 'salas.html';
        }

    });*/

    $.ajax({
        url: $(this).attr("action"),
        type: 'POST',
        dataType: 'json',
        async:false,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(login),
        destroy: true,
        success: function (response) {
            if (response == null) {
                alert("Error de login");
            } else {
                sessionStorage.setItem("p", JSON.stringify(response));
                window.location.href = 'salas.html';
            }
        }
     });

    return false;
});