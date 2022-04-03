// Script que carga en la vista los jugadores logueados
$(document).ready(function () {
    cargarJugadoresEspera();
});

function cargarJugadoresEspera() {

    $.get("http://localhost:3000/api/jugadores-en-espera", function (res) {

    var result = "";

    for (var i = 0; i < res.length; i++) {
        result += "<ol class='p-0 m-0'>" + res[i].Name +  "<img class='arrastrar' style='width: 50px' src='assets/" + res[i].Avatar + "' /></ol>";
    }

    $("#playerList").html(result)

    });
}