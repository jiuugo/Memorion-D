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

let reversoCarta = "<img src='../img/banderas/20.png'>";
let carpetaCartas = "<img src='../img/banderas/";
let tipoArchivoCartas = ".png'>";

let contadorJugadores = 0;
let intentos = 0;
let imgCartas;
let resueltas;
let elegidas = [];

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

    if (!tomaValoresFilas()) return;

    imgCartas = new Array(nFilas * nColumnas);
    resueltas = new Array(nFilas * nColumnas);

    colocaTarjetas();

    inicio.style.display = "none";
    juego.style.display = "block";

    aleatorizaBanderas();
    activaVolteo();
});

function seleccionaAssetsTema() {
    switch (tema.value) {
        case "banderas":
            reversoCarta = "<img src='../img/banderas/20.png'>";
            carpetaCartas = "<img src='../img/banderas/";
            tipoArchivoCartas = ".png'>";
            body.style.backgroundImage = "url('../img/Fondos/FondoBanderas.jpg')";
            break;
        case "Simpson":
            reversoCarta = "<img src='../img/Reversos/ReversoSimpson.webp'>";
            carpetaCartas = "<img src='../img/Simpson/";
            tipoArchivoCartas = ".webp'>";
            body.style.backgroundImage = "url('../img/Fondos/FondoSimpsons.webp')";
            break;
        case "Coches":
            reversoCarta = "<img src='../img/Reversos/back720.png'>";
            carpetaCartas = "<img src='../img/coches/";
            tipoArchivoCartas = ".jpg'>";
            body.style.backgroundImage = "url('../img/Fondos/FondoCoches.jpg')";
            break;
        case "Animales":
            reversoCarta = "<img src='../img/Reversos/backanimales.png'>";
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
        pares.push(i, i);
    }

    for (let i = pares.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pares[i], pares[j]] = [pares[j], pares[i]];
    }

    imgCartas = pares;
}

function activaVolteo() {
    for (let i = 0; i < nFilas * nColumnas; i++) {
        document.getElementById(i).addEventListener("click", manejarClickCarta);
    }
}

function manejarClickCarta(event) {
    iniciarCrono();
    const carta = event.currentTarget;

    carta.removeEventListener("click", manejarClickCarta);
    carta.classList.add("voltea");

    setTimeout(() => {
        carta.innerHTML = carpetaCartas + imgCartas[carta.id] + tipoArchivoCartas;
    }, 300);

    elegidas.push(carta.id);

    if (elegidas.length === 2) {
        const [id1, id2] = elegidas;
        if (imgCartas[id1] === imgCartas[id2]) {
            document.getElementById(id1).style.backgroundColor = "Green";
            document.getElementById(id2).style.backgroundColor = "Green";
            resueltas[id1] = resueltas[id2] = 1;

            if (resueltas.reduce((a, b) => a + (b || 0), 0) === nFilas * nColumnas) {
                detenerCrono();
                alert("Tu puntuación es: " + calculaPuntuacion());
                acabarPartida();
            }
        } else {
            setTimeout(() => {
                document.getElementById(id1).innerHTML = reversoCarta;
                document.getElementById(id2).innerHTML = reversoCarta;
                document.getElementById(id1).classList.remove("voltea");
                document.getElementById(id2).classList.remove("voltea");
                document.getElementById(id1).addEventListener("click", manejarClickCarta);
                document.getElementById(id2).addEventListener("click", manejarClickCarta);
            }, 1300);
        }
        intentos++;
        actIntentos();
        elegidas = [];
    }
}

function guardaPuntuacion() {
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

let nFilas, nColumnas;
const persFilas = document.getElementById("persFilas");
const persColumnas = document.getElementById("persColumnas");

function tomaValoresFilas() {
    switch (nivel.value) {
        case "facil":
            nFilas = 4; nColumnas = 4; break;
        case "medio":
            nFilas = 6; nColumnas = 5; break;
        case "dificil":
            nFilas = 6; nColumnas = 6; break;
        case "personalizado":
            nFilas = parseInt(persFilas.value);
            nColumnas = parseInt(persColumnas.value);
            if (isNaN(nFilas) || isNaN(nColumnas) || nFilas < 1 || nFilas > 6 || nColumnas < 1 || nColumnas > 6 || (nFilas * nColumnas) % 2 === 1) {
                alert("Valores inválidos.");
                return false;
            }
            break;
    }
    return true;
}

const wrapper = document.getElementById("wrapper");

function colocaTarjetas() {
    wrapper.innerHTML = '';
    for (let i = 0; i < nFilas * nColumnas; i++) {
        const carta = document.createElement("div");
        carta.classList.add("carta");
        carta.id = i;
        carta.innerHTML = reversoCarta;
        wrapper.appendChild(carta);
    }
    wrapper.style.gridTemplateColumns = `repeat(${nColumnas}, 1fr)`;
}

let horas = 0, minutos = 0, segundos = 0, centesimas = 0;
let intervalo;

function actualizarCrono() {
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
        }, 10);
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
    let puntuacion = Math.round(((nFilas * nColumnas) / (intentos * tiempo)) * 100000);
    return puntuacion;
}

const ranking = document.getElementById("ranking");

function cambiarPantallaPuntuacion() {
    const mensajeFinal = document.getElementById("mensajeFinal");
    mensajeFinal.textContent = "¡Has ganado! La puntuación de " + nombre.value + " es: " + calculaPuntuacion() + " puntos.";

    juego.style.display = "none";
    puntuacion.style.display = "block";

    actualizarRankingPantalla();
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


const btnGanar = document.getElementById("btnGanar");
btnGanar.addEventListener("click", () => {
    acabarPartida();
});

const btnVolver = document.getElementById("btnVolver");
btnVolver.addEventListener("click", reiniciarJuego);

function reiniciarJuego() {
    inicio.style.display = "block";
    puntuacion.style.display = "none";
    juego.style.display = "none";
    detenerCrono();
    reiniciarCrono();
    intentos = 0;
    actIntentos();
    elegidas = [];
    wrapper.innerHTML = '';
    imgCartas = null;
    resueltas = null;
}

function acabarPartida() {
    body.style.backgroundImage = "url('../img/Fondos/tablero.jpg')";
    body.style.backgroundRepeat = "repeat";
    guardaPuntuacion();
    ordenaPuntuaciones();
    cambiarPantallaPuntuacion();
}

function verRankingDesdePuntuacion(filas, columnas) {
    nFilas = filas;
    nColumnas = columnas;
    ordenaPuntuaciones();
    actualizarRankingPantalla();
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
    verRankingDesdePuntuacion(filas, columnas);
}

function verHistorial() {
    const rankingContainer = document.getElementById("ranking"); // El contenedor donde se mostrará el historial y el ranking.
    
    // Limpiar el contenedor antes de mostrar el historial.
    rankingContainer.innerHTML = '';

    // Obtener historial de partidas desde el localStorage
    let historialPartidas = JSON.parse(localStorage.getItem("historialPartidas")) || [];

    // Si no hay historial de partidas, mostrar mensaje.
    if (historialPartidas.length === 0) {
        rankingContainer.innerHTML = "<p>No hay historial de partidas.</p>";
        return;
    }

    // Crear una lista para mostrar las partidas.
    let listaHistorial = document.createElement("ul");

    // Recorrer el historial y agregar cada partida a la lista.
    historialPartidas.forEach((partida, index) => {
        const listaItem = document.createElement("li");
        listaItem.innerHTML = `${partida.nombreJ} - ${partida.puntuacionJ} puntos - ${partida.fecha} (Tablero: ${partida.nFilas}x${partida.nColumnas})`;
        listaHistorial.appendChild(listaItem);
    });

    // Agregar la lista al contenedor del ranking (se utiliza el mismo contenedor para ranking e historial).
    rankingContainer.appendChild(listaHistorial);

    // Si el historial es visible, ocultar la pantalla de puntuación.
    puntuacion.style.display = "none";
    rankingContainer.style.display = "block";
    juego.style.display = "none";
    inicio.style.display = "none";
}

