//array colores
var colores = ["red", "blue", "green", "white", "black"];
var jugadores;

//recorrer juegadores en sala

$(document).ready(function () {

});
function cargarJugadores() {
    $.get("http://localhost:3000/api/jugadores-en-sala?=id" + value, function (res) {

        jugadores = res;

    });
}

//dar color aleatorio
function aleatorio(inferior, superior) {
    numPosibilidades = superior - inferior
    aleat = Math.random() * numPosibilidades
    aleat = Math.floor(aleat)
    return parseInt(inferior) + aleat
}
function asignarColor() {
    for (i = 0; i < jugadores.length; i++) {
        posarray = aleatorio(0, colores.length);
        jugadores[i].color = colores[posarray];
    }
}


//marcar las casillas


