class Casilla{
    constructor(coordenadaX, coordenadaY){
        this._celdaHTML     = document.getElementById("c"+coordenadaX+coordenadaY);
        this._coordenadaX   = coordenadaX;
        this._coordenadaY   = coordenadaY;
        this._dueño         = null;      
        this._ocupado       = false;   
    }

    ocuparCasilla(color, dueño){        
        this.getCeldaHTML.style.background = color;
        this.setDueño(dueño);
        this.setOcupado(true);
    }

}    

