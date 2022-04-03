// Drag and Drop
var objectDraged;
        
document.addEventListener('dragstart', e => {
    if (e.target.className === "arrastrar"){
        var parent = e.target.parentElement;
            
        objectDraged = parent;
    }
});
      
const contenedor = document.querySelectorAll('.waiting-box__room');

for(var j = 0; j < contenedor.length; j++){
    const cont = contenedor[j];

    cont.addEventListener('dragenter', e => {
    });

    cont.addEventListener('dragleave', e => {
    });

    cont.addEventListener('dragover', e => {
        e.preventDefault();
    });

    cont.addEventListener('drop', e => {
        cont.appendChild(objectDraged);
    });
}