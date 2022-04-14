$("#userLogin").submit(function (e) {
    e.preventDefault();

    var login = {
        email: $('#email').val(),
        password: $('#password').val()
    };

    $.post($(this).attr("action"), login, function (response) {
        if (response == null) {
            alert("Error de login");
        } else {
            sessionStorage.setItem("p", JSON.stringify(response));
            window.location.href = 'salas.html';
        }

    });

    return false;
});