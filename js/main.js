const inicio = document.getElementById("inicio");
const juego = document.getElementById("juego");

const nombre = document.getElementById("nombre");
const modo = document.getElementById("modo");
const nivel = document.getElementById("nivel");
const tema = document.getElementById("tema");
const temp = document.getElementById("temp");

const body = document.getElementsByTagName("body")[0];

const aceptar = document.getElementById("btnJugar");

const hNombre = document.getElementById("hNombre");
const intent = document.getElementById("intent");

const personalizado = document.getElementsByClassName("personalizado");

let reversoCarta = "<img src=" + "../img/banderas/20.png" + ">";

let background;
let carpetaCartas = "<img src='../img/banderas/";
let tipoArchivoCartas = ".png'>";


let contadorJugadores = 0;

let intentos = 0;

let imgCartas;
let resueltas;

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

    seleccionaAssetsTema();

    actIntentos();
    poneNombre();

    if (!tomaValoresFilas()) {
        return;
    }

    imgCartas = new Array(nFilas * nColumnas);
    resueltas = new Array(nFilas * nColumnas);

    colocaTarjetas();

    inicio.style.display = "none";
    juego.style.display = "block";

    
    const cartas = document.getElementsByClassName("carta");

    
    aleatorizaBanderas();


    activaVolteo();


})

function seleccionaAssetsTema(){

    switch (tema.value) {
        case "banderas":
            reversoCarta = "<img src=" + "../img/banderas/20.png" + ">";
            carpetaCartas = "<img src='../img/banderas/";
            tipoArchivoCartas = ".png'>";
            body.style.backgroundImage = "url('../img/Fondos/FondoBanderas.jpg')";
            break;
        case "Simpson":
            reversoCarta = "<img src=" + "../img/Reversos/ReversoSimpson.webp" + ">";
            carpetaCartas = "<img src='../img/Simpson/";
            tipoArchivoCartas = ".webp'>";
            body.style.backgroundImage = "url('../img/Fondos/FondoSimpsons.webp')";
            break;
        case "Coches":
            reversoCarta = "<img src=" + "../img/Reversos/back720.png" + ">";
            carpetaCartas = "<img src='../img/coches/";
            tipoArchivoCartas = ".jpg'>";
            body.style.backgroundImage = "url('../img/Fondos/FondoCoches.jpg')";
            break;
        case "Animales":
            reversoCarta = "<img src=" + "../img/Reversos/backanimales.png" + ">";
            carpetaCartas = "<img src='../img/Animales/";
            tipoArchivoCartas = ".jpg'>";
            body.style.backgroundImage = "url('../img/Fondos/FondoAnimales.webp')";
            break;
    }
}

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
    iniciarCrono();
    const carta = event.currentTarget;

    document.getElementById(carta.id).removeEventListener("click", manejarClickCarta);


    carta.classList.add("voltea");

    setTimeout(function(){
        carta.innerHTML = carpetaCartas + imgCartas[carta.id] + tipoArchivoCartas;
    }, 300);

    elegidas.push(carta.id);

    if (elegidas.length === 2) {
        if (imgCartas[elegidas[0]] === imgCartas[elegidas[1]]) {

            // Desactiva el click en ambas cartas acertadas
            document.getElementById(elegidas[0]).removeEventListener("click", manejarClickCarta);
            document.getElementById(elegidas[1]).removeEventListener("click", manejarClickCarta);

            document.getElementById(elegidas[0]).style.backgroundColor = "Green";
            document.getElementById(elegidas[1]).style.backgroundColor = "Green";
            resueltas[elegidas[0]] = 1;
            resueltas[elegidas[1]] = 1;

            if(resueltas.reduce((acumulador, valorActual) => acumulador + valorActual, 0)===nFilas*nColumnas){
                //ganar
                detenerCrono();
                alert("Tu puntuación es: " + calculaPuntuacion());
                acabarPartida();
            }
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

                //document.getElementById(elegida0).classList.remove("voltea");
                //document.getElementById(elegida1).classList.remove("voltea");

            }, 1300);

            setTimeout(() => {


                document.getElementById(elegida0).classList.remove("voltea");
                document.getElementById(elegida1).classList.remove("voltea");

            }, 1500);



        }
        elegidas = [];
        intentos++;
        actIntentos();
    }
}

function guardaPuntuacion() {
    const puntuacion = calculaPuntuacion();
    let jugador = {
        nombreJ: nombre.value,
        puntuacionJ: puntuacion,
        parejasJ: nFilas*nColumnas/2,
    };

    localStorage.setItem("jugador" + contadorJugadores, JSON.stringify(jugador));
    contadorJugadores++;
}

let puntuaciones = [];

function ordenaPuntuaciones(){
    let contador = 0;
    puntuaciones = [];
    let jugador = null;

    do{
        jugador = JSON.parse(localStorage.getItem("jugador" + contador));
        if(jugador){
            puntuaciones.push(jugador);
        }else{
            break;
        }
        contador++;
    }while(jugador);

    //Devuelve el array de puntuaciones ordenando de menor a mayor por número de parejas y luego por puntuación.
    puntuaciones.sort((a, b) => {
        if (a.parejasJ === b.parejasJ) {
            return a.puntuacionJ - b.puntuacionJ;
        }
        return a.parejasJ - b.parejasJ;
    });

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

let horas = 0, minutos = 0, segundos = 0, centesimas = 0;
let intervalo;

function actualizarCrono() {
    // Actualiza la vista en pantalla
    document.getElementById("horas").textContent = horas.toString().padStart(2, '0');
    document.getElementById("minutos").textContent = ':' + minutos.toString().padStart(2, '0');
    document.getElementById("segundos").textContent = ':' + segundos.toString().padStart(2, '0');
    document.getElementById("centesimas").textContent = ':' + centesimas.toString().padStart(2, '0');
}

function iniciarCrono() {
    if (!intervalo) {
        intervalo = setInterval(() => {
            centesimas++;
            if (centesimas > 99) {
                centesimas = 0;
                segundos++;
            }
            if (segundos > 59) {
                segundos = 0;
                minutos++;
            }
            if (minutos > 59) {
                minutos = 0;
                horas++;
            }
            actualizarCrono();
        }, 10); // 10 ms para centésimas
    }
}

function detenerCrono() {
    clearInterval(intervalo);
    intervalo = null;
}

function reiniciarCrono() {
    detenerCrono();
    horas = 0;
    minutos = 0;
    segundos = 0;
    centesimas = 0;
    actualizarCrono();
}


function calculaPuntuacion(){
    let tiempo = (horas * 3600) + (minutos * 60) + segundos + (centesimas / 100);
    let puntuacion = Math.round(((nFilas * nColumnas) / (intentos * tiempo))*100000);
    return puntuacion;
}


const ranking = document.getElementById("ranking");


function cambiarPantallaPuntuacion(){

    const mensajeFinal = document.getElementById("mensajeFinal");
    mensajeFinal.textContent = "¡Has ganado! La puntuación de "+ nombre.value +" es: " + calculaPuntuacion() + " puntos.";

    juego.style.display = "none";
    puntuacion.style.display = "block";

    ranking.innerHTML = '';
    const cabecera = document.createElement("tr");
    cabecera.innerHTML = "<th>Nombre</th><th>Puntuación</th><th>Parejas</th>";
    ranking.appendChild(cabecera);

    for(var i = 0; i < puntuaciones.length;i++){
        let jugador = JSON.parse(localStorage.getItem("jugador" + i));


        const fila = document.createElement("tr");

        const colNombre = document.createElement("td");
        const colPuntuacion = document.createElement("td");
        const colParejas = document.createElement("td");

        colNombre.innerHTML = jugador.nombreJ;
        colPuntuacion.innerHTML = jugador.puntuacionJ;
        colParejas.innerHTML = jugador.parejasJ;
        
        fila.appendChild(colNombre);
        fila.appendChild(colPuntuacion);
        fila.appendChild(colParejas);

        ranking.appendChild(fila);

    }


}

const btnGanar = document.getElementById("btnGanar");

btnGanar.addEventListener("click", () => {
    //Toma intentos al azar entre 10 y 50
    let intentos = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    //Toma tiempo al azar entre 1 y 5 minutos
    let tiempo = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

    acabarPartida();

})


const btnVolver = document.getElementById("btnVolver");

btnVolver.addEventListener("click", () => {
    reiniciarJuego()


});

function reiniciarJuego() {
    inicio.style.display = "block";
    puntuacion.style.display = "none";
    juego.style.display = "none";
    // Reinicia el cronómetro y los intentos
    detenerCrono();
    reiniciarCrono();
    intentos = 0;
    actIntentos();
    elegidas = new Array();

    // Reinicia el juego y vuelve a la pantalla de inicio
    inicio.style.display = "block";
    juego.style.display = "none";

    // Limpia el contenedor de cartas
    wrapper.innerHTML = '';

    // Reinicia las variables
    imgCartas = null;
    resueltas = null
}


function acabarPartida(){
    body.style.backgroundImage = "url('../img/Fondos/tablero.jpg')";
    body.style.backgroundRepeat = "repeat";
    guardaPuntuacion();
    ordenaPuntuaciones();
    cambiarPantallaPuntuacion()
}