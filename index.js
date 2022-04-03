const { addJugador, getJugadores, getSalas, login, jugadorEspera } = require("./models/AppData");

var express = require("express"),
  app = express(),
  bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(methodOverride());

//const Jugador = require('models/jugador');


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

  console.log(email);
  console.log(password);

  var result = login(email, password);

  res.send(result);
});

//Rutas jugador
router.get("/api/dame-usuarios", function (req, res) {
  const result = getJugadores();

  console.log(result);

  res.send(result);
});

router.post("/api/registrar-usuario", function (req, res) {
  let jugador = req.body;

  console.log(jugador);

  addJugador(jugador);

  console.log(getJugadores());

  res.send("jugador registrado");
});

// Jugadores en espera
router.get("/api/jugadores-en-espera", function (req, res){
 var playerExist =jugadorEspera();

 res.send(playerExist);
})

//Rutas salas
router.get("/api/salas", function (req, res) {
  const result = getSalas();

  console.log(result);

  res.send(result);
});

router.get('/sala/salaId', async (req, res) => {
  var sala = await findSalaById(req.params.salaId);
  console.log("sala " + req.params.salaId);
  console.log(sala.players);

  res.render('juego', { sala: sala });

});

router.post("/api/añadirJugador-sala", function (req, res) {
  let(salaId, jugador) = req.body;
  console.log(salaId, jugador);
  asignarJugadorASala(salaId, jugador);

  console.log(getisPlayerInSala());
  res.send("jugador en sala");
});

app.use(router);

app.listen(3000, function () {
  console.log("Node server running on http://localhost:3000");
});