const AppData = require("./models/AppData");
const { addJugador, getJugadores, getSalas, login, jugadorEspera, jugadorEnSala, asignarJugadorASala, getJugadorPorEmail } = require("./models/AppData");
//
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser");
const socketio = require('socket.io');
const randomColor = require('randomcolor');
const partida = require('./public/partida');
//Sockets
app.use(express.static(`${__dirname}/../public`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




//Ruta principal
var router = express.Router();

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


//MIDDLEWARES
//Añadimos los middlewares con el metodo use con la propiedad extended
app.use(bodyParser.urlencoded({ extended: false }));
//Para poder admitir peticiones con el cuerpo de mensaje en JSON
app.use(bodyParser.json());
app.use(express.json());
app.use('/', router);


//Login jugador
router.post("/user/login", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  var result = login(email, password);

  res.send(result);
});

//Rutas jugador
router.get("/api/dame-usuarios", function (req, res) {
  const result = getJugadores();

  res.send(result);
});

router.post("/api/registrar-usuario", function (req, res) {
  let jugador = req.body;

  addJugador(jugador);

  res.send("jugador registrado");
});

// Jugadores en espera
router.get("/api/jugadores-en-espera", function (req, res) {
  var playerExist = jugadorEspera();

  res.send(playerExist);
})

router.post("/api/jugador-en-sala", function (req, res) {
  let IdSalas = req.body.IdSalas;
  let email = req.body.email;
  console.log(IdSalas);
  console.log(email);
  jugadorEnSala(IdSalas, email);
  const salas = getSalas();
  res.send(true);
})

//Rutas salas
router.get("/api/salas", function (req, res) {
  const result = getSalas();

  res.send(result);
});

router.get('/sala/salaId', async (req, res) => {
  var sala = await findSalaById(req.params.salaId);
  console.log("sala " + req.params.salaId);
  console.log(sala.players);

  res.render('juego', { sala: sala });

});

router.post("/api/anadirJugador-sala", function (req, res) {
  let salaId = req.body.salaId;
  let jugador = req.body.jugador;
  console.log(salaId, jugador);
  let sala = asignarJugadorASala(salaId, jugador);

  console.log(sala);
  res.send(sala);
});

//SOCKET
app.use(router);
app.set("port", 3000);
var server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const { clear, getBoard, makeTurn, ganar, celdaContigua, primeraCelda, celdaOcupada } = partida(5);

//Metodo responsable de las conexiones de los clientes
io.on('connection', function (socket) {
  console.log("El cliente se ha conectado");
  const color = randomColor();
  socket.emit('board', getBoard());

  socket.on('turn', ({ x, y, email }) => {
    let pintarPrimera = primeraCelda(color);
    let jugador = getJugadorPorEmail(email);

    //io.emit('turn');
    if (pintarPrimera) {
      makeTurn(x, y, color)

      console.log(x);
      console.log(y);
      console.log(color);

      io.emit('turn', { x, y, color });
    } else {

      let ocupada = celdaOcupada(x, y);
      if (!ocupada) {

        let celda = celdaContigua(x, y, color);

        if (celda) {
          makeTurn(x, y, color)
          io.emit('turn', { x, y, color });
        }
      }
    }

    let resultado = ganar();

    if (resultado.acabado) {
      io.emit('message', 'Ha ganado el jugador:' + jugador.Name + " " + jugador.Surname);
      io.emit('message', 'Nueva ronda');

      //io.emit('board');
    }

  });
});



server.listen(3000, function () {
  console.log("Node server running on http://localhost:3000");
});




