const inicio = document.getElementById("inicio");
const juego = document.getElementById("juego");
const aceptar = document.getElementById("aceptar");

const intent = document.getElementById("intent");

let intentos = 0;

aceptar.addEventListener("click",() => {
    inicio.style.display = "none";
    juego.style.display = "block";
})

function actIntentos(){
    intent.textContent = intent.textContent + " "+  intentos;
}

actIntentos();