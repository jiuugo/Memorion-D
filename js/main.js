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

aceptar.addEventListener("click",() => {

    if(nombre.value===""){
        alert("Introduce un nombre.");
        return;
    }

    if(tema.value==="aleatorio"){
        const temas = document.getElementsByClassName("temas");

        let numRnd = Math.floor(4*Math.random());

        tema.value = temas[numRnd].value;
    }


    actIntentos();
    poneNombre();
    poneTema();

    colocaImagenes();

    inicio.style.display = "none";
    juego.style.display = "block";
})


nivel.addEventListener("click",() => {
    if(nivel.value==="personalizado"){

        for(const tr of personalizado){
            tr.style.display = "table-row"
        }

    }

    if(nivel.value!=="personalizado"){

        for(const tr of personalizado){
            tr.style.display = "none"
        }

    }
})

function actIntentos(){
    intent.textContent = "Intentos: " +  intentos;
}

function poneNombre(){
    hNombre.textContent = "Jugador: " +  nombre.value;
}

function poneTema(){
    hTema.textContent = "Tema: " +  tema.value;
}

let nFilas;
let nColumnas;

const persFilas = document.getElementById
const persFilas = document.getElementById


function colocaImagenes(){
    switch (nivel.value){
        case "facil":
            nFilas = 4;
            nColumnas = 4;
        break;
        case "medio":
            nFilas = 5;
            nColumnas = 6;
        break;
        case "dificil":
            nFilas = 6;
            nColumnas = 6;
        break;
        case "personalizado":

        break;
    }


}