const inicio = document.getElementById("inicio");
const juego = document.getElementById("juego");

const nombre = document.getElementById("nombre");
const modo = document.getElementById("modo");
const nivel = document.getElementById("nivel");
const tema = document.getElementById("tema");
const temp = document.getElementById("temp");

const body = document.getElementsByTagName("body")[0];

const aceptar = document.getElementById("btnJugar");

const header = document.getElementsByTagName("header")[0];
const info = document.getElementById("info");

const hNombre = document.getElementById("hNombre");
const intent = document.getElementById("intent");

const personalizado = document.getElementsByClassName("personalizado");

const sonidoAcierto = new Audio("audio/acierto.wav");
const sonidoFallo = new Audio("audio/fallo.mp3");

let reversoCarta = "<img src=" + "img/banderas/20.png" + ">";

let background;
let carpetaCartas = "<img src='img/banderas/";
let tipoArchivoCartas = ".png'>";


let contadorJugadores = 0;

let intentos = 0;

let imgCartas;
let resueltas;
let bloqueo = false;

let elegidas = new Array();

let rotated = false;

aceptar.addEventListener("click", () => {

    if ((nombre.value === "Elias") || (nombre.value === "Elena") || (nombre.value === "Hugo")) {
        rotated = !rotated;
        document.body.style.transform = rotated ? 'rotate(180deg)' : 'rotate(0deg)';

    }

    if (!tomaValoresFilas()) {
        return;
    }

    if (nombre.value === "") {
        alert("Introduce un nombre.");
        return;
    }

    if (tema.value === "aleatorio") {
        const temas = document.getElementsByClassName("temas");

        let numRnd = Math.floor(4 * Math.random());

        tema.value = temas[numRnd].value;
    }

    if (temp.value === "false") {
        document.getElementById("crono").style.display = "none";
    }

    seleccionaAssetsTema();

    actIntentos();
    poneNombre();



    imgCartas = new Array(nFilas * nColumnas);
    resueltas = new Array(nFilas * nColumnas);

    aleatorizaBanderas();

    colocaTarjetas();

    inicio.style.display = "none";
    juego.style.display = "block";

    if (modo.value === "flash") {
        voltearTodasCartas();
    }


    activaVolteo();


})

function seleccionaAssetsTema() {

    switch (tema.value) {
        case "banderas":
            reversoCarta = "img/banderas/20.png";
            carpetaCartas = "img/banderas/";
            tipoArchivoCartas = ".png";
            body.style.backgroundImage = "url('img/Fondos/FondoBanderas.jpg')";

            header.style.border = "3px solid #000";
            info.style.color = "#000";
            btnVolver[0].style.border = "2px solid #000";
            btnVolver[0].style.color = "#000";
            break;
        case "Simpson":
            reversoCarta = "img/Reversos/ReversoSimpson.webp";
            carpetaCartas = "img/Simpson/";
            tipoArchivoCartas = ".webp";
            body.style.backgroundImage = "url('img/Fondos/FondoSimpsons.webp')";

            header.style.border = "3px solid #000";
            info.style.color = "#000";
            btnVolver[0].style.border = "2px solid #000";
            btnVolver[0].style.color = "#000";
            break;
        case "Coches":
            reversoCarta = "img/Reversos/back720.png";
            carpetaCartas = "img/coches/";
            tipoArchivoCartas = ".jpg";
            body.style.backgroundImage = "url('img/Fondos/FondoCoches.jpg')";

            header.style.border = "3px solid white";
            info.style.color = "white";
            btnVolver[0].style.border = "2px solid white";
            btnVolver[0].style.color = "white";
            break;
        case "Animales":
            reversoCarta = "img/Reversos/backanimales.png";
            carpetaCartas = "img/Animales/";
            tipoArchivoCartas = ".jpg";
            body.style.backgroundImage = "url('img/Fondos/FondoAnimales.webp')";

            header.style.border = "3px solid white";
            info.style.color = "white";
            btnVolver[0].style.border = "2px solid white";
            btnVolver[0].style.color = "white";
            break;
    }
}

function voltearTodasCartas() {
    const cartas = document.getElementsByClassName("carta");

    for (let i = 0; i < cartas.length; i++) {
        cartas[i].classList.add("volteada");
        resueltas[i] = 1;
    }

    setTimeout(() => {
        for (let i = 0; i < cartas.length; i++) {
            cartas[i].classList.remove("volteada");
            resueltas[i] = 0;
        }
    }, 2000); // Espera 2 segundos antes de voltear las cartas de nuevo
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

function activaVolteo() {
    for (var i = 0; i < nFilas * nColumnas; i++) {
        const carta = document.getElementById(i);

        carta.addEventListener("click", manejarClickCarta);
    }
}

function manejarClickCarta(event) {
    iniciarCrono();

    // Si está bloqueado o ya hay 2 cartas elegidas, no hacemos nada
    if (bloqueo || elegidas.length >= 2) return;

    const carta = event.currentTarget;

    // Si esta carta ya está resuelta (verde), ignoramos el click
    if (resueltas[carta.id] === 1) return;

    // Si ya está volteada, tampoco dejamos seguir (esto evita hacer trampa clicando la misma dos veces)
    if (carta.classList.contains("volteada")) return;

    // Voltea la carta
    carta.classList.add("volteada");
    elegidas.push(carta);

    if (elegidas.length === 2) {
        bloqueo = true; //Bloqueamos mientras comprobamos
        comprobarPareja();
    }
}


function comprobarPareja() {
    const [carta1, carta2] = elegidas;


    if (imgCartas[carta1.id] === imgCartas[carta2.id]) {

        sonidoAcierto.currentTime = 0;
        sonidoAcierto.play();

        //Las dejamos volteadas
        resueltas[carta1.id] = 1;
        resueltas[carta2.id] = 1;

        carta1.querySelector("img").style.border = "5px solid green";
        carta2.querySelector("img").style.border = "5px solid green";


        elegidas = [];
        bloqueo = false; // 🔓 Desbloqueamos clicks aquí mismo

        if (resueltas.reduce((acumulador, valorActual) => acumulador + valorActual, 0) === nFilas * nColumnas) {
            detenerCrono();
            acabarPartida();
        }

    } else {
        //No coinciden, voltearlas de vuelta tras un pequeño delay


        sonidoFallo.currentTime = 0;
        sonidoFallo.play();

        setTimeout(() => {
            carta1.classList.remove("volteada");
            carta2.classList.remove("volteada");


            elegidas = [];
            bloqueo = false; //Ahora sí dejamos que sigan clicando

        }, 1000);
    }

    intentos++;
    actIntentos();
}


function guardaPuntuacion() {
    if (temp.value === "false") {
        return;

    }

    const puntuacion = calculaPuntuacion();
    let jugador = {
        nombreJ: nombre.value,
        puntuacionJ: puntuacion,
        parejasJ: nFilas * nColumnas / 2,
        fecha: new Date().toLocaleString(),  // Fecha y hora de la partida
        nFilas: nFilas,
        nColumnas: nColumnas
    };

    // Guardar en el ranking por nivel
    let nivelKey = `${nFilas}x${nColumnas}`;
    let rankingPorNivel = JSON.parse(localStorage.getItem("ranking_" + nivelKey)) || [];
    rankingPorNivel.push(jugador);
    localStorage.setItem("ranking_" + nivelKey, JSON.stringify(rankingPorNivel));

    // Guardar también en el historial general
    let historialPartidas = JSON.parse(localStorage.getItem("historialPartidas")) || [];
    historialPartidas.push(jugador);
    localStorage.setItem("historialPartidas", JSON.stringify(historialPartidas));
}

let puntuaciones = [];

function ordenaPuntuaciones() {
    let nivelKey = `${nFilas}x${nColumnas}`;
    puntuaciones = JSON.parse(localStorage.getItem("ranking_" + nivelKey)) || [];
    puntuaciones.sort((a, b) => b.puntuacionJ - a.puntuacionJ);
}

nivel.addEventListener("click", () => {
    for (const tr of personalizado) {
        tr.style.display = nivel.value === "personalizado" ? "table-row" : "none";
    }
});

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

            if (((nFilas * nColumnas) % 2 === 1) || nFilas >= 7 || nColumnas >= 7 || nFilas <= 1 || nColumnas <= 1) {
                alert("El número total de cartas debe ser par. Y el número de filas y columnas debe ser mayor que 1 y menor que 7.");
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

        // Crear la cara frente
        const frente = document.createElement("div");
        frente.classList.add("cara", "frente");
        const imgFrente = document.createElement("img");
        // Aquí puedes asignar la ruta de la carta si ya tienes las imágenes generadas
        imgFrente.src = carpetaCartas + imgCartas[i] + tipoArchivoCartas; // de momento pongo "1" como ejemplo
        frente.appendChild(imgFrente);

        // Crear la cara reverso
        const reverso = document.createElement("div");
        reverso.classList.add("cara", "reverso");
        const imgReverso = document.createElement("img");
        imgReverso.src = reversoCarta; // Ahora usamos la ruta limpia directamente

        imgReverso.onload = () => {
            carta.style.height = imgReverso.height + "px";
        };

        reverso.appendChild(imgReverso);

        // Añadir frente y reverso a la carta
        carta.appendChild(frente);
        carta.appendChild(reverso);

        // Añadir la carta al contenedor
        wrapper.appendChild(carta);
    }

    // Ajustar las columnas según nColumnas
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


function calculaPuntuacion() {
    let tiempo = (horas * 3600) + (minutos * 60) + segundos + (centesimas / 100);
    let puntuacion = Math.round(((nFilas * nColumnas) / (intentos * tiempo)) * 10000);
    return puntuacion;
}


const ranking = document.getElementById("ranking");


function cambiarPantallaPuntuacion() {
    const mensajeFinal = document.getElementById("mensajeFinal");

    if (temp.value === "false") {
        mensajeFinal.textContent = "¡Has ganado! La puntuación de " + nombre.value + " no se guardará en el modo sin temporizador.";

    } else {
        mensajeFinal.textContent = "¡Has ganado! La puntuación de " + nombre.value + " es: " + calculaPuntuacion() + " puntos.";
    }

    juego.style.display = "none";
    puntuacion.style.display = "block";

    actualizarRankingPantalla();
}



const btnVolver = document.getElementsByClassName("btnVolver");

for (let btn of btnVolver) {
    btn.addEventListener("click", () => {
        reiniciarJuego();
    });
}

function reiniciarJuego() {
    document.getElementById("crono").style.display = "table";

    inicio.style.display = "block";
    puntuacion.style.display = "none";
    juego.style.display = "none";
    // Reinicia el cronómetro y los intentos
    body.style.backgroundImage = "url('img/Fondos/tablero.jpg')";
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


function acabarPartida() {
    body.style.backgroundImage = "url('img/Fondos/tablero.jpg')";
    body.style.backgroundRepeat = "repeat";
    guardaPuntuacion();
    ordenaPuntuaciones();
    cambiarPantallaPuntuacion()
}

function actualizarRankingPantalla() {
    const tituloRanking = document.getElementById("tituloRanking");
    tituloRanking.textContent = `Ranking ${nFilas}x${nColumnas}`;

    // Elimina todas las filas excepto la primera (que contiene el título)
    const filas = ranking.querySelectorAll("tr:not(:first-child)");
    filas.forEach(fila => fila.remove());

    // Agrega encabezados de columna
    const cabecera = document.createElement("tr");
    cabecera.innerHTML = "<th>Posición</th><th>Nombre</th><th>Puntuación</th><th>Parejas</th>";
    ranking.appendChild(cabecera);

    // Agrega cada fila del ranking
    for (let i = 0; i < puntuaciones.length; i++) {
        let jugador = puntuaciones[i];
        const fila = document.createElement("tr");

        const colPosicion = document.createElement("td");
        const colNombre = document.createElement("td");
        const colPuntuacion = document.createElement("td");
        const colParejas = document.createElement("td");

        switch (i) {
            case 0: colPosicion.innerHTML = "🥇"; break;
            case 1: colPosicion.innerHTML = "🥈"; break;
            case 2: colPosicion.innerHTML = "🥉"; break;
            default: colPosicion.innerHTML = i + 1;
        }

        colNombre.textContent = jugador.nombreJ;
        colPuntuacion.textContent = jugador.puntuacionJ;
        colParejas.textContent = jugador.parejasJ;

        fila.appendChild(colPosicion);
        fila.appendChild(colNombre);
        fila.appendChild(colPuntuacion);
        fila.appendChild(colParejas);

        ranking.appendChild(fila);
    }
}


function verRankingDesdePuntuacion(filas, columnas) {
    nFilas = filas;
    nColumnas = columnas;
    ordenaPuntuaciones();
    actualizarRankingPantalla();

    // Oculta historial si estaba activo
    document.getElementById("historial").style.display = "none";
    document.getElementById("ranking").style.display = "table";

    puntuacion.style.display = "block";
    juego.style.display = "none";
    inicio.style.display = "none";
}


function verRankingDesdePuntuacionCustom() {
    const filas = parseInt(prompt("Introduce número de filas:"));
    const columnas = parseInt(prompt("Introduce número de columnas:"));
    if (!filas || !columnas || (filas * columnas) % 2 !== 0) {
        alert("Tamaño inválido. Asegúrate de que el total de tarjetas sea par.");
        return;
    }

    // Oculta historial si estaba activo
    document.getElementById("historial").style.display = "none";
    document.getElementById("ranking").style.display = "table";

    verRankingDesdePuntuacion(filas, columnas);
}


function verHistorial() {
    const historialDiv = document.getElementById("historial");
    const listaHistorial = document.getElementById("listaHistorial");
    const rankingTable = document.getElementById("ranking");

    // Oculta el ranking
    rankingTable.style.display = "none";
    historialDiv.style.display = "block";

    // Limpia la lista anterior
    listaHistorial.innerHTML = '';

    const historialPartidas = JSON.parse(localStorage.getItem("historialPartidas")) || [];

    // Si no hay historial, mostramos un mensaje
    if (historialPartidas.length === 0) {
        const item = document.createElement("li");
        item.textContent = "No hay historial de partidas.";
        listaHistorial.appendChild(item);
    } else {
        // Crear la cabecera similar a la del ranking, pero sin la columna de "Tablero"
        const cabecera = document.createElement("tr");
        cabecera.innerHTML = "<th>Nombre</th><th>Puntuación</th><th>Parejas</th>";
        listaHistorial.appendChild(cabecera);

        // Mostrar las partidas del historial
        historialPartidas.forEach(partida => {
            const fila = document.createElement("tr");

            const colNombre = document.createElement("td");
            colNombre.textContent = partida.nombreJ;

            const colPuntuacion = document.createElement("td");
            colPuntuacion.textContent = partida.puntuacionJ;

            const colParejas = document.createElement("td");
            colParejas.textContent = partida.parejasJ;

            fila.appendChild(colNombre);
            fila.appendChild(colPuntuacion);
            fila.appendChild(colParejas);

            listaHistorial.appendChild(fila);
        });
    }

    // Muestra pantalla de puntuación, oculta otras
    puntuacion.style.display = "block";
    juego.style.display = "none";
    inicio.style.display = "none";
}