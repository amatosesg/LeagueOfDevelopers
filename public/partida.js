const partida = (size) => {

    let board;

    const clear = () => {
        board = Array(size).fill().map(() => Array(size).fill(null));
    };


    /*  const empezarPartida = (sala) =>{
          
      }*/

    const celdaOcupada = (x, y) => {
        const result = board[y][x];
        if (result == null) {
            return false;
        } else return true;
    }
    const getBoard = () => board;

    const makeTurn = (x, y, color) => {
        board[y][x] = color;
        // return isWinning(x, y);
    };

    const inBounds = (x, y) => {
        return y >= 0 && y < board.length && x >= 0 && x < board[y].length;
    };

    const primeraCelda = (color) => {
        let pintar = true;
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                const tablero = board[y][x];
                if (tablero == color) {
                    pintar = false;
                }
            }
        }

        return pintar;
    }


    const celdaContigua = (x, y, color) => {
        // PARTE SUPERIOR
        console.log(board);
        if (y > 0) {
            if (board[y - 1][x - 1] === color)
                return true;
            if (board[y - 1][x] === color)
                return true;
            if (board[y - 1][x + 1] === color)
                return true;
        }

        //PARTE CENTRAL
        if (x > 0 && board[y][x - 1] === color)
            return true;
        if (x < size && board[y][x + 1] === color)
            return true;
        //PARTE INFERIOR
        if (y < size - 1) {
            if (board[y + 1][x + 1] === color)
                return true;
            if (board[y + 1][x] === color)
                return true;
            if (board[y + 1][x + 1] === color)
                return true;
        }

        return false;
    }

    const ganar = (color1, color2) => {
        let acabado = true;
        let color = null;
        let contador1 = 0;
        let contador2 = 0;

        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                const resultado = board[y][x];
                if (resultado === null) {
                    acabado = false;
                    break;
                } else {
                    if (color === null)
                        color = resultado;

                    if (color === color1) {
                        contador1++;
                    }

                    if (color === color2) {
                        contador2++;
                    }
                }
            }
        }

        let colorGanador = null;
            if (contador1 > contador2){
                colorGanador = color1;
            }else{
                colorGanador = color2;
            }
        return {
            acabado: acabado,
            colorGanador: colorGanador
        };
    }



    clear();

    return {
        clear, getBoard, makeTurn, ganar, celdaContigua, primeraCelda, celdaOcupada
    };
};

module.exports = partida;