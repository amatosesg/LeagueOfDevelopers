$("#userLogin").submit(function (e) {
    e.preventDefault();

    var login = {
        email: $('#email').val(),
        password: $('#password').val()
    };
    
    $.post($(this).attr("action"), login, function (response) {
        console.log(response);
        if(response == ''){
            alert("Error de login");
        }else {
            
        window.location.href= 'salas.html';
        }      
        
    });

    return false;
});