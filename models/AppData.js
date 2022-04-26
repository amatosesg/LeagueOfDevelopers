
const randomColor = require('randomcolor');

class AppData {

    static jugadores = [];   
    

    static salas = [
        {
            id: "Sala 1",
            players: []

        },
        {
            id: "Sala 2",
            players: []

        },
        {
            id: "Sala 3",
            players: []


        }/*,
        {
            id: "sala4",
            players: []
        }*/
    ];

    static jugadoresConectados = []

};

function findSalaById(id) {
    return AppData.salas.find((sala) => {
        return (sala.id === id);
    })
}
function isPlayerInSala(salas, jugador) {
    var result = salas.players.find((p) => {
        return (p.Email === jugador.Email);
    });
    return result;
}

module.exports = {
    //funciones jugador
    getJugadores: function getJugadores() {
        return AppData.jugadores;
    },
    getJugadorPorEmail: function getJugadorPorEmail(email) {
        return AppData.jugadores.find(x => x.Email === email);
    },
    addJugador: function addJugador(jugador) {
        AppData.jugadores.push(jugador);
    },
    login: function login(email, password) {
        const user = AppData.jugadores.find(x => x.Email == email && x.Password == password);

        return user;
    },

    //funciones sala
    getSalas: function getSalas() {
        return AppData.salas;
    },
    findSalaById: findSalaById,
    isPlayerInSala: isPlayerInSala,
    //hace un push al array de jugadores de la sala en concreto.
    asignarJugadorASala(salaId, jugadorId) {
        var sala = findSalaById(salaId);

        console.log("asignarJugadorASala: " + jugadorId);

        var jugador = AppData.jugadores.find(x => x.Email === jugadorId);

        if (sala && !isPlayerInSala(sala, jugador)) {
            jugador.Color = randomColor();
            sala.players.push(jugador);
        }

        return sala;
    },

    //Jugadores en espera
    jugadorEspera: function jugadorEspera() {

        let result = [];

        for (var i = 0; i < AppData.jugadores.length; i++) {
            const jugador = AppData.jugadores[i];

            let existe = false;

            for (var j = 0; j < AppData.salas.length; j++) {
                const salas = AppData.salas[j];

                var existeJugador = salas.players.find((p) => {
                    return (p.Email === jugador.Email);
                });

                if (existeJugador !== undefined) {
                    existe = true;
                }
            }

            console.log(existe);
            if (!existe) {
                result.push(jugador);
            }
        }

        return result;

    },

    //Jugador en sala
    jugadorEnSala(idSalas, email) {
        var salaJuego = AppData.salas.find((s) => {
            return (s.id == idSalas);
        });

        var emailJugador = AppData.jugadores.find((j) => {
            return (j.Email == email);
        });



        if (emailJugador !== undefined) {
            emailJugador.Color = colores[aleatorio()];

            salaJuego.players.push(emailJugador);
        }

    }

};

//Asignar color
var colores = ["red", "blue", "green", "white", "black"];

function aleatorio(inferior, superior) {
    numPosibilidades = superior - inferior
    aleat = Math.random() * numPosibilidades
    aleat = Math.floor(aleat)
    return parseInt(inferior) + aleat
}

