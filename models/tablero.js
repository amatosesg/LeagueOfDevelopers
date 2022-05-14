class TableroJuego{
      
    constructor(fila, columna){
        this._fila = fila;
        this._columna = columna;
        this._tableroDeJuego;
    }

    //Creamos tablero
crea_tableroDeJuego(){
    this.defineDimension_tableroDeJuego(this._tableroDeJuego);
    this.instanciarCasillas_tableroDeJuego(this._tableroDeJuego);
    this.imprimeResultado();
 }
 
 defineDimension_tableroDeJuego(tableroDeJuego){
    //Inicializamos las filas
    tableroDeJuego = new Array(this._fila);
    //Agregamos a cada fila sus columna
    for (var i = 0; i < this._fila; i++){
        tableroDeJuego[i] = new Array(this._columna);
    }
    //Asignamos la matriz a '_tableroDeJuego'
    this._tableroDeJuego = tableroDeJuego;
}

instanciarCasillas_tableroDeJuego(tableroDeJuego){       
    for (var i = 0; i < this._fila; i++){
        for (var j = 0; j < this._columna; j++){
            //Asignar a cada casilla un <td> del HTML
            let casillaVacia = new Casilla(i, j);
            tableroDeJuego[i][j] = casillaVacia;
        }
    }
}

}   
