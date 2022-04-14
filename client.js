var socket = io.connect('http://localhost:3000', { 'forceNew': true });

socket.on('messages', function (data) {
    console.log(data);
})
//CANVAS
const getClickCoordinates = (element, ev) => {
    const { top, left } = element.getBoundingClientRect();
    const { clientX, clientY } = ev;

    return {
        x: clientX - left,
        y: clientY - top
    }
};
const getBoard = (canvas, numCells = 5) => {

    const ctx = canvas.getContext('2d');
    const cellSize = Math.floor(canvas.width / numCells);

    const fillCell = (x, y, color) => {
        ctx.fillStyle = color;
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    };

    const drawGrid = () => {

        ctx.beginPath();

        for (let i = 0; i < numCells + 1; i++) {
            ctx.moveTo(i * cellSize, 0);
            ctx.lineTo(i * cellSize, cellSize * numCells);

            ctx.moveTo(0, i * cellSize);
            ctx.lineTo(cellSize * numCells, i * cellSize);
        }

        ctx.stroke();
    };

    const clear = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const renderBoard = (board = []) => {
        board.forEach((row, y) => {
            row.forEach((color, x) => {
                color && fillCell(x, y, color);
            });
        });
    };

    const reset = (board) => {
        clear();
        drawGrid();
        renderBoard(board)
    };

    const getCellCoordinates = (x, y) => {
        return {
            x: Math.floor(x / cellSize),
            y: Math.floor(y / cellSize)
        }
    }

    return { fillCell, reset, getCellCoordinates };

};

(() => {

    const canvas = document.querySelector('canvas');
    const { fillCell, reset, getCellCoordinates } = getBoard(canvas);
    const socket = io.connect("http://localhost:3000");

    const onClick = (e) => {
        const { x, y } = getClickCoordinates(canvas, e);
        let result = getCellCoordinates(x, y);
        const user = JSON.parse(sessionStorage.getItem("p"));
        result.email = user.Email;
        socket.emit('turn', result);
    };

    reset();
    //fillCell(3, 2);

    socket.on('board', reset);
    socket.on('message', (message) => {
        alert(message);
    });
    socket.on('turn', ({x, y, color}) => {
        fillCell(x, y, color)
    });


    canvas.addEventListener('click', onClick);

})();