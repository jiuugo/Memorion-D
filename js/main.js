const inicio = document.getElementById("inicio");
const juego = document.getElementById("juego");

const nombre = document.getElementById("nombre");


const aceptar = document.getElementById("btnJugar");

const hNombre = document.getElementById("hNombre");

const intent = document.getElementById("intent");

let intentos = 0;

aceptar.addEventListener("click",() => {
    inicio.style.display = "none";
    juego.style.display = "block";

    actIntentos();
    poneNombre();
})

function actIntentos(){
    intent.textContent = "Intentos: "+  intentos;
}

function poneNombre(){
    hNombre.textContent = "Jugador: "+  nombre.value;
}
