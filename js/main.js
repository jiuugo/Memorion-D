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

let reversoCarta = "<img src=" + "../img/Simpson/0.webp" + ">";


let intentos = 0;

let imgCartas;

let elegidas = new Array();

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

    imgCartas = new Array(nFilas * nColumnas);

    colocaTarjetas();

    inicio.style.display = "none";
    juego.style.display = "block";

    
    const cartas = document.getElementsByClassName("carta");

    
    aleatorizaBanderas();


    activaVolteo();


})

function aleatorizaBanderas() {
    let totalCartas = nFilas * nColumnas;
    let pares = [];

    for (let i = 0; i < totalCartas / 2; i++) {
        pares.push(i);
        pares.push(i);
    }

    for (let i = pares.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pares[i], pares[j]] = [pares[j], pares[i]];
    }

    imgCartas = pares;
}

function activaVolteo(){
    for(var i = 0; i <nFilas * nColumnas; i++){
        const carta = document.getElementById(i);

        carta.addEventListener("click", manejarClickCarta);
    }
}

function manejarClickCarta(event) {
    const carta = event.currentTarget;

    document.getElementById(carta.id).removeEventListener("click", manejarClickCarta);


    carta.classList.add("voltea");

    setTimeout(function(){
        carta.innerHTML = "<img src='../img/banderas/" + imgCartas[carta.id] + ".png'>";
    }, 300);

    elegidas.push(carta.id);

    if (elegidas.length === 2) {
        if (imgCartas[elegidas[0]] === imgCartas[elegidas[1]]) {
            alert("Acertaste.");

            // Desactiva el click en ambas cartas acertadas
            document.getElementById(elegidas[0]).removeEventListener("click", manejarClickCarta);
            document.getElementById(elegidas[1]).removeEventListener("click", manejarClickCarta);

            document.getElementById(elegidas[0]).style.backgroundColor = "Green";
            document.getElementById(elegidas[1]).style.backgroundColor = "Green";
        } else {
            document.getElementById(elegidas[0]).addEventListener("click", manejarClickCarta);
            document.getElementById(elegidas[1]).addEventListener("click", manejarClickCarta);

            let elegida0 = elegidas[0];

            let elegida1 = elegidas[1];

            setTimeout(() => {
                document.getElementById(elegida0).classList.remove("voltea");
                document.getElementById(elegida1).classList.remove("voltea");
                
            }, 600);







            setTimeout(() => {
                document.getElementById(elegida0).classList.add("voltea");
                
                document.getElementById(elegida1).classList.add("voltea");
                
            }, 1000);

            
            setTimeout(() => {
                document.getElementById(elegida0).innerHTML = reversoCarta;
                
                document.getElementById(elegida1).innerHTML = reversoCarta;

                document.getElementById(elegida0).classList.remove("voltea");
                document.getElementById(elegida1).classList.remove("voltea");

            }, 2000);



        }
        elegidas = [];
        intentos++;
        actIntentos();
    }
}


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

        carta.setAttribute("id", i);

        carta.innerHTML = reversoCarta;

        wrapper.appendChild(carta);

        

    }

    wrapper.style.gridTemplateColumns = "repeat(" + nColumnas + ", 1fr)";
}

