class AppData {

    static jugadores = [];

    static salas = [
        {
            id: "sala1",
            players: []             
            
        },
        {
            id: "sala2",
            players: []

        },
        {
            id: "sala3",
            players: []


        },
        {
            id: "sala4",
            players: []
        }
    ];

    static jugadoresConectados = []

}

module.exports = {
    //funciones jugador
    getJugadores: function getJugadores() {
        return AppData.jugadores;
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
    findSalaById: function findSalaById(id) {
        return AppData.salas.find((sala) => {
            return (sala.id === id);
        })
    },
    isPlayerInSala: function (sala, jugador) {
        var result = sala.players.find((p) => {
            return (p.Email === jugador.Email);
        });
        return result;
    },
    //hace un push al array de jugadores de la sala en concreto.
    asignarJugadorASala(salaId, jugador) {
        var sala = this.findSalaById(salaId);
        if (sala && !this.isPlayerInSala(sala, jugador)) {
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

       

    }

};
