const inicio = document.getElementById("inicio");
const juego = document.getElementById("juego");

const nombre = document.getElementById("nombre");
const modo = document.getElementById("modo");
const nivel = document.getElementById("nivel");
const tema = document.getElementById("tema");
const temp = document.getElementById("temp");


const aceptar = document.getElementById("btnJugar");

const hNombre = document.getElementById("hNombre");
const hTema = document.getElementById("hTema");
const intent = document.getElementById("intent");

const personalizado = document.getElementsByClassName("personalizado");

let intentos = 0;

aceptar.addEventListener("click", () => {

    if (nombre.value === "") {
        alert("Introduce un nombre.");
        return;
    }

    if (tema.value === "aleatorio") {
        const temas = document.getElementsByClassName("temas");

        let numRnd = Math.floor(4 * Math.random());

        tema.value = temas[numRnd].value;
    }


    actIntentos();
    poneNombre();
    poneTema();

    if (!tomaValoresFilas()) {
        return;
    }

    colocaTarjetas();

    inicio.style.display = "none";
    juego.style.display = "block";
})


nivel.addEventListener("click", () => {
    if (nivel.value === "personalizado") {

        for (const tr of personalizado) {
            tr.style.display = "table-row"
        }

    }

    if (nivel.value !== "personalizado") {

        for (const tr of personalizado) {
            tr.style.display = "none"
        }

    }
})

function actIntentos() {
    intent.textContent = "Intentos: " + intentos;
}

function poneNombre() {
    hNombre.textContent = "Jugador: " + nombre.value;
}

function poneTema() {
    hTema.textContent = "Tema: " + tema.value;
}

let nFilas;
let nColumnas;

const persFilas = document.getElementById("persFilas");
const persColumnas = document.getElementById("persColumnas");


function tomaValoresFilas() {
    switch (nivel.value) {
        case "facil":
            nFilas = 4;
            nColumnas = 4;
            break;
        case "medio":
            nFilas = 6;
            nColumnas = 5;
            break;
        case "dificil":
            nFilas = 6;
            nColumnas = 6;
            break;
        case "personalizado":
            nFilas = persFilas.value;
            nColumnas = persColumnas.value;

            if ((nFilas * nColumnas) % 2 === 1) {
                alert("El número total de tarjetas debe ser par. Cambia los valores personalizados.");
                return false;
            }
            break;
    }
    return true;

}

const wrapper = document.getElementById("wrapper");

function colocaTarjetas() {
    for (var i = 0; i < nFilas * nColumnas; i++) {
        const carta = document.createElement("div");
        carta.classList.add("carta");

        carta.innerHTML = "<img src=" + "../img/Bart_Simpson.webp" + ">";

        wrapper.appendChild(carta);


    }

    wrapper.style.gridTemplateColumns = "repeat(" + nColumnas + ", 1fr)";
}