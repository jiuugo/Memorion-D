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


    volteaCartas();


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

function volteaCartas(){
    for(var i = 0; i <nFilas * nColumnas; i++){
        const carta = document.getElementById(i);

        carta.addEventListener("click", () => {

            carta.classList.add("voltea");

            setTimeout(function(){
                carta.innerHTML = "<img src=" + "../img/banderas/" + imgCartas[carta.id] + ".png" + ">";
            }, 300);

            elegidas.push(carta.id);

            if(elegidas.length==2){
                if(imgCartas[elegidas[0]] === imgCartas[elegidas[1]]){
                    alert("Acertaste.")
                }else{
                    alert("Fallaste.");
                }
                elegidas = [];
                intentos++;
                actIntentos();
            }

        })
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

        carta.innerHTML = "<img src=" + "../img/Simpson/0.webp" + ">";

        wrapper.appendChild(carta);

        

    }

    wrapper.style.gridTemplateColumns = "repeat(" + nColumnas + ", 1fr)";
}

let banderas = [
    { name: "afghanistan", img: "../img/banderas/afghanistan_32.png", id: 1 },
    { name: "albania", img: "../img/banderas/albania_32.png", id: 2 },
    { name: "algeria", img: "../img/banderas/algeria_32.png", id: 3 },
    { name: "andorra", img: "../img/banderas/andorra_32.png", id: 4 },
    { name: "andorra la vella", img: "../img/banderas/andorra_la_vella_32.png", id: 5 },
    { name: "angola", img: "../img/banderas/angola_32.png", id: 6 },
    { name: "antarctica", img: "../img/banderas/antarctica_32.png", id: 7 },
    { name: "antarctica british ensign", img: "../img/banderas/antarctica_british_ensign_32.png", id: 8 },
    { name: "antarctica magallanes", img: "../img/banderas/antarctica_magallanes_32.png", id: 9 },
    { name: "antarctica treaty", img: "../img/banderas/antarctica_treaty_32.png", id: 10 },
    { name: "armenia", img: "../img/banderas/armenia_32.png", id: 11 },
    { name: "australia", img: "../img/banderas/australia_32.png", id: 12 },
    { name: "australia christmas island", img: "../img/banderas/australia_christmas_island_32.png", id: 13 },
    { name: "australia cocos keeling", img: "../img/banderas/australia_cocos_keeling_32.png", id: 14 },
    { name: "australia new south wales", img: "../img/banderas/australia_new_south_wales_32.png", id: 15 },
    { name: "australia norfolk island", img: "../img/banderas/australia_norfolk_island_32.png", id: 16 },
    { name: "australia northern australia", img: "../img/banderas/australia_northern_australia_32.png", id: 17 },
    { name: "australia queensland", img: "../img/banderas/australia_queensland_32.png", id: 18 },
    { name: "australia south australia", img: "../img/banderas/australia_south_australia_32.png", id: 19 },
    { name: "australia tasmania", img: "../img/banderas/australia_tasmania_32.png", id: 20 },
    { name: "australia victoria", img: "../img/banderas/australia_victoria_32.png", id: 21 },
    { name: "australia western australia", img: "../img/banderas/australia_western_australia_32.png", id: 22 },
    { name: "austria", img: "../img/banderas/austria_32.png", id: 23 },
    { name: "austria burgenland", img: "../img/banderas/austria_burgenland_32.png", id: 24 },
    { name: "austria carinthia", img: "../img/banderas/austria_carinthia_32.png", id: 25 },
    { name: "austria lower austria", img: "../img/banderas/austria_lower_austria_32.png", id: 26 },
    { name: "austria salzburg vienna vorarlberg", img: "../img/banderas/austria_salzburg_vienna_vorarlberg_32.png", id: 27 },
    { name: "austria styria", img: "../img/banderas/austria_styria_32.png", id: 28 },
    { name: "austria tirol", img: "../img/banderas/austria_tirol_32.png", id: 29 },
    { name: "austria tirol upper austria", img: "../img/banderas/austria_tirol_upper_austria_32.png", id: 30 },
    { name: "austria vorarlberg", img: "../img/banderas/austria_vorarlberg_32.png", id: 31 },
    { name: "azerbaijan", img: "../img/banderas/azerbaijan_32.png", id: 32 },
    { name: "azerbaijan artsakh", img: "../img/banderas/azerbaijan_artsakh_32.png", id: 33 },
    { name: "bahrain", img: "../img/banderas/bahrain_32.png", id: 34 },
    { name: "bangladesh", img: "../img/banderas/bangladesh_32.png", id: 35 },
    { name: "belarus", img: "../img/banderas/belarus_32.png", id: 36 },
    { name: "belarus brest voblasts", img: "../img/banderas/belarus_brest_voblasts_32.png", id: 37 },
    { name: "belarus homyel voblasts", img: "../img/banderas/belarus_homyel_voblasts_32.png", id: 38 },
    { name: "belarus hrodna voblasts", img: "../img/banderas/belarus_hrodna_voblasts_32.png", id: 39 },
    { name: "belarus mahilyow voblasts", img: "../img/banderas/belarus_mahilyow_voblasts_32.png", id: 40 },
    { name: "belarus minsk", img: "../img/banderas/belarus_minsk_32.png", id: 41 },
    { name: "belarus minsk voblasts", img: "../img/banderas/belarus_minsk_voblasts_32.png", id: 42 },
    { name: "belarus vitsebsk voblasts", img: "../img/banderas/belarus_vitsebsk_voblasts_32.png", id: 43 },
    { name: "belgium", img: "../img/banderas/belgium_32.png", id: 44 },
    { name: "belgium antwerp", img: "../img/banderas/belgium_antwerp_32.png", id: 45 },
    { name: "belgium brussels", img: "../img/banderas/belgium_brussels_32.png", id: 46 },
    { name: "belgium east flanders", img: "../img/banderas/belgium_east_flanders_32.png", id: 47 },
    { name: "belgium flanders", img: "../img/banderas/belgium_flanders_32.png", id: 48 },
    { name: "belgium flemish brabant", img: "../img/banderas/belgium_flemish_brabant_32.png", id: 49 },
    { name: "belgium hainaut", img: "../img/banderas/belgium_hainaut_32.png", id: 50 },
    { name: "belgium liege", img: "../img/banderas/belgium_liege_32.png", id: 51 },
    { name: "belgium limburg", img: "../img/banderas/belgium_limburg_32.png", id: 52 },
    { name: "belgium luxembourg", img: "../img/banderas/belgium_luxembourg_32.png", id: 53 },
    { name: "belgium namur", img: "../img/banderas/belgium_namur_32.png", id: 54 },
    { name: "belgium wallonia", img: "../img/banderas/belgium_wallonia_32.png", id: 55 },
    { name: "belgium walloon brabant", img: "../img/banderas/belgium_walloon_brabant_32.png", id: 56 },
    { name: "belgium west flanders", img: "../img/banderas/belgium_west_flanders_32.png", id: 57 },
    { name: "benin", img: "../img/banderas/benin_32.png", id: 58 },
    { name: "bhutan", img: "../img/banderas/bhutan_32.png", id: 59 },
    { name: "bolivia", img: "../img/banderas/bolivia_32.png", id: 60 },
    { name: "bolivia beni", img: "../img/banderas/bolivia_beni_32.png", id: 61 },
    { name: "bolivia chuquisaca", img: "../img/banderas/bolivia_chuquisaca_32.png", id: 62 },
    { name: "bolivia cochabamba", img: "../img/banderas/bolivia_cochabamba_32.png", id: 63 },
    { name: "bolivia la paz", img: "../img/banderas/bolivia_la_paz_32.png", id: 64 },
    { name: "bolivia oruro", img: "../img/banderas/bolivia_oruro_32.png", id: 65 },
    { name: "bolivia pando", img: "../img/banderas/bolivia_pando_32.png", id: 66 },
    { name: "bolivia potosi", img: "../img/banderas/bolivia_potosi_32.png", id: 67 },
    { name: "bolivia santa cruz", img: "../img/banderas/bolivia_santa_cruz_32.png", id: 68 },
    { name: "bolivia tarija", img: "../img/banderas/bolivia_tarija_32.png", id: 69 },
    { name: "bosnia herzegovina", img: "../img/banderas/bosnia_herzegovina_32.png", id: 70 },
    { name: "botswana", img: "../img/banderas/botswana_32.png", id: 71 },
    { name: "brazil", img: "../img/banderas/brazil_32.png", id: 72 },
    { name: "brazil acre", img: "../img/banderas/brazil_acre_32.png", id: 73 },
    { name: "brazil alagoas", img: "../img/banderas/brazil_alagoas_32.png", id: 74 },
    { name: "brazil amapa", img: "../img/banderas/brazil_amapa_32.png", id: 75 },
    { name: "brazil amazonas", img: "../img/banderas/brazil_amazonas_32.png", id: 76 },
    { name: "brazil bahia", img: "../img/banderas/brazil_bahia_32.png", id: 77 },
    { name: "brazil ceara", img: "../img/banderas/brazil_ceara_32.png", id: 78 },
    { name: "brazil distrito federal", img: "../img/banderas/brazil_distrito_federal_32.png", id: 79 },
    { name: "brazil espirito santo", img: "../img/banderas/brazil_espirito_santo_32.png", id: 80 },
    { name: "brazil goias", img: "../img/banderas/brazil_goias_32.png", id: 81 },
    { name: "brazil maranha", img: "../img/banderas/brazil_maranha_32.png", id: 82 },
    { name: "brazil mato grosso", img: "../img/banderas/brazil_mato_grosso_32.png", id: 83 },
    { name: "brazil mato grosso do sul", img: "../img/banderas/brazil_mato_grosso_do_sul_32.png", id: 84 },
    { name: "brazil minas gerais", img: "../img/banderas/brazil_minas_gerais_32.png", id: 85 },
    { name: "brazil para", img: "../img/banderas/brazil_para_32.png", id: 86 },
    { name: "brazil paraiba", img: "../img/banderas/brazil_paraiba_32.png", id: 87 },
    { name: "brazil parana", img: "../img/banderas/brazil_parana_32.png", id: 88 },
    { name: "brazil pernambuco", img: "../img/banderas/brazil_pernambuco_32.png", id: 89 },
    { name: "brazil piaui", img: "../img/banderas/brazil_piaui_32.png", id: 90 },
    { name: "brazil rio de janeiro", img: "../img/banderas/brazil_rio_de_janeiro_32.png", id: 91 },
    { name: "brazil rio grande", img: "../img/banderas/brazil_rio_grande_32.png", id: 92 },
    { name: "brazil rio grande do sul", img: "../img/banderas/brazil_rio_grande_do_sul_32.png", id: 93 },
    { name: "brazil rondonia", img: "../img/banderas/brazil_rondonia_32.png", id: 94 },
    { name: "brazil roraima", img: "../img/banderas/brazil_roraima_32.png", id: 95 },
    { name: "brazil santa catarina", img: "../img/banderas/brazil_santa_catarina_32.png", id: 96 },
    { name: "brazil sao paulo", img: "../img/banderas/brazil_sao_paulo_32.png", id: 97 },
    { name: "brazil sergipe", img: "../img/banderas/brazil_sergipe_32.png", id: 98 },
    { name: "brazil tocantins", img: "../img/banderas/brazil_tocantins_32.png", id: 99 },
    { name: "brunei", img: "../img/banderas/brunei_32.png", id: 100 },
    { name: "bulgaria", img: "../img/banderas/bulgaria_32.png", id: 101 },
    { name: "burkina faso", img: "../img/banderas/burkina_faso_32.png", id: 102 },
    { name: "burundi", img: "../img/banderas/burundi_32.png", id: 103 },
    { name: "cambodia", img: "../img/banderas/cambodia_32.png", id: 104 },
    { name: "cameroon", img: "../img/banderas/cameroon_32.png", id: 105 },
    { name: "canada 01", img: "../img/banderas/canada_01_32.png", id: 106 },
    { name: "canada 02", img: "../img/banderas/canada_02_32.png", id: 107 },
    { name: "canada alberta", img: "../img/banderas/canada_alberta_32.png", id: 108 },
    { name: "canada british columbia", img: "../img/banderas/canada_british_columbia_32.png", id: 109 },
    { name: "canada manitoba", img: "../img/banderas/canada_manitoba_32.png", id: 110 },
    { name: "canada new brunswick", img: "../img/banderas/canada_new_brunswick_32.png", id: 111 },
    { name: "canada newfoundland labrador", img: "../img/banderas/canada_newfoundland_labrador_32.png", id: 112 },
    { name: "canada northwest", img: "../img/banderas/canada_northwest_32.png", id: 113 },
    { name: "canada nova scotia", img: "../img/banderas/canada_nova_scotia_32.png", id: 114 },
    { name: "canada nunavut", img: "../img/banderas/canada_nunavut_32.png", id: 115 },
    { name: "canada ontario", img: "../img/banderas/canada_ontario_32.png", id: 116 },
    { name: "canada prince edward", img: "../img/banderas/canada_prince_edward_32.png", id: 117 },
    { name: "canada quebec", img: "../img/banderas/canada_quebec_32.png", id: 118 },
    { name: "canada saskatchewan", img: "../img/banderas/canada_saskatchewan_32.png", id: 119 },
    { name: "canada yukon", img: "../img/banderas/canada_yukon_32.png", id: 120 },
    { name: "cape verde", img: "../img/banderas/cape_verde_32.png", id: 121 },
    { name: "central african republic", img: "../img/banderas/central_african_republic_32.png", id: 122 },
    { name: "chad", img: "../img/banderas/chad_32.png", id: 123 },
    { name: "chile", img: "../img/banderas/chile_32.png", id: 124 },
    { name: "chile arica parinacota", img: "../img/banderas/chile_arica_parinacota_32.png", id: 125 },
    { name: "chile atacama", img: "../img/banderas/chile_atacama_32.png", id: 126 },
    { name: "chile aysen", img: "../img/banderas/chile_aysen_32.png", id: 127 },
    { name: "chile biobio", img: "../img/banderas/chile_biobio_32.png", id: 128 },
    { name: "chile la araucania", img: "../img/banderas/chile_la_araucania_32.png", id: 129 },
    { name: "chile los rios", img: "../img/banderas/chile_los_rios_32.png", id: 130 },
    { name: "chile maule", img: "../img/banderas/chile_maule_32.png", id: 131 },
    { name: "chile nuble", img: "../img/banderas/chile_nuble_32.png", id: 132 },
    { name: "chile tarapaca", img: "../img/banderas/chile_tarapaca_32.png", id: 133 },
    { name: "chile valparaiso", img: "../img/banderas/chile_valparaiso_32.png", id: 134 },
    { name: "china", img: "../img/banderas/china_32.png", id: 135 },
    { name: "china hong kong", img: "../img/banderas/china_hong_kong_32.png", id: 136 },
    { name: "china kinmen", img: "../img/banderas/china_kinmen_32.png", id: 137 },
    { name: "china lienchiang", img: "../img/banderas/china_lienchiang_32.png", id: 138 },
    { name: "china macau", img: "../img/banderas/china_macau_32.png", id: 139 },
    { name: "china taiwan", img: "../img/banderas/china_taiwan_32.png", id: 140 },
    { name: "china tibet", img: "../img/banderas/china_tibet_32.png", id: 141 },
    { name: "comoros", img: "../img/banderas/comoros_32.png", id: 142 },
    { name: "croatia", img: "../img/banderas/croatia_32.png", id: 143 },
    { name: "croatia bjelovar bilogora", img: "../img/banderas/croatia_bjelovar_bilogora_32.png", id: 144 },
    { name: "croatia brod posavina", img: "../img/banderas/croatia_brod_posavina_32.png", id: 145 },
    { name: "croatia dubrovnik neretva", img: "../img/banderas/croatia_dubrovnik_neretva_32.png", id: 146 },
    { name: "croatia istria", img: "../img/banderas/croatia_istria_32.png", id: 147 },
    { name: "croatia karlovac", img: "../img/banderas/croatia_karlovac_32.png", id: 148 },
    { name: "croatia koprivnica krizevci", img: "../img/banderas/croatia_koprivnica_krizevci_32.png", id: 149 },
    { name: "croatia krapina zagorje", img: "../img/banderas/croatia_krapina_zagorje_32.png", id: 150 },
    { name: "croatia lika senj", img: "../img/banderas/croatia_lika_senj_32.png", id: 151 },
    { name: "croatia medimuje", img: "../img/banderas/croatia_medimuje_32.png", id: 152 },
    { name: "croatia osijek baranja", img: "../img/banderas/croatia_osijek_baranja_32.png", id: 153 },
    { name: "croatia pozega slavonia", img: "../img/banderas/croatia_pozega_slavonia_32.png", id: 154 },
    { name: "croatia primorje gorskikotar", img: "../img/banderas/croatia_primorje_gorskikotar_32.png", id: 155 },
    { name: "croatia sibenik knin", img: "../img/banderas/croatia_sibenik_knin_32.png", id: 156 },
    { name: "croatia sisak moslavina", img: "../img/banderas/croatia_sisak_moslavina_32.png", id: 157 },
    { name: "croatia split dalmatia", img: "../img/banderas/croatia_split_dalmatia_32.png", id: 158 },
    { name: "croatia varazdin", img: "../img/banderas/croatia_varazdin_32.png", id: 159 },
    { name: "croatia virovitica podravina", img: "../img/banderas/croatia_virovitica_podravina_32.png", id: 160 },
    { name: "croatia vukovar srijem", img: "../img/banderas/croatia_vukovar_srijem_32.png", id: 161 },
    { name: "croatia zadar", img: "../img/banderas/croatia_zadar_32.png", id: 162 },
    { name: "croatia zagreb", img: "../img/banderas/croatia_zagreb_32.png", id: 163 },
    { name: "croatia zagreb city", img: "../img/banderas/croatia_zagreb_city_32.png", id: 164 },
    { name: "cyprus", img: "../img/banderas/cyprus_32.png", id: 165 },
    { name: "czech", img: "../img/banderas/czech_32.png", id: 166 },
    { name: "czech central bohemian", img: "../img/banderas/czech_central_bohemian_32.png", id: 167 },
    { name: "czech hradec kralove", img: "../img/banderas/czech_hradec_kralove_32.png", id: 168 },
    { name: "czech karlovy vary", img: "../img/banderas/czech_karlovy_vary_32.png", id: 169 },
    { name: "czech liberec", img: "../img/banderas/czech_liberec_32.png", id: 170 },
    { name: "czech moravian silesian", img: "../img/banderas/czech_moravian_silesian_32.png", id: 171 },
    { name: "czech olomouc", img: "../img/banderas/czech_olomouc_32.png", id: 172 },
    { name: "czech pardubic", img: "../img/banderas/czech_pardubic_32.png", id: 173 },
    { name: "czech plzen", img: "../img/banderas/czech_plzen_32.png", id: 174 },
    { name: "czech prague", img: "../img/banderas/czech_prague_32.png", id: 175 },
    { name: "czech south bohemian", img: "../img/banderas/czech_south_bohemian_32.png", id: 176 },
    { name: "czech south moravian", img: "../img/banderas/czech_south_moravian_32.png", id: 177 },
    { name: "czech usti nad labem", img: "../img/banderas/czech_usti_nad_labem_32.png", id: 178 },
    { name: "czech vysocina", img: "../img/banderas/czech_vysocina_32.png", id: 179 },
    { name: "czech zlin", img: "../img/banderas/czech_zlin_32.png", id: 180 },
    { name: "democratic congo", img: "../img/banderas/democratic_congo_32.png", id: 181 },
    { name: "denmark", img: "../img/banderas/denmark_32.png", id: 182 },
    { name: "djibouti", img: "../img/banderas/djibouti_32.png", id: 183 },
    { name: "east timor", img: "../img/banderas/east_timor_32.png", id: 184 },
    { name: "egypt", img: "../img/banderas/egypt_32.png", id: 185 },
    { name: "egypt alexandria", img: "../img/banderas/egypt_alexandria_32.png", id: 186 },
    { name: "egypt aswan", img: "../img/banderas/egypt_aswan_32.png", id: 187 },
    { name: "egypt asyut", img: "../img/banderas/egypt_asyut_32.png", id: 188 },
    { name: "egypt behira", img: "../img/banderas/egypt_behira_32.png", id: 189 },
    { name: "egypt beni suef", img: "../img/banderas/egypt_beni_suef_32.png", id: 190 },
    { name: "egypt cairo", img: "../img/banderas/egypt_cairo_32.png", id: 191 },
    { name: "egypt dakahlia", img: "../img/banderas/egypt_dakahlia_32.png", id: 192 },
    { name: "egypt damietta", img: "../img/banderas/egypt_damietta_32.png", id: 193 },
    { name: "egypt fayum", img: "../img/banderas/egypt_fayum_32.png", id: 194 },
    { name: "egypt gharbia", img: "../img/banderas/egypt_gharbia_32.png", id: 195 },
    { name: "egypt giza", img: "../img/banderas/egypt_giza_32.png", id: 196 },
    { name: "egypt ismailiya", img: "../img/banderas/egypt_ismailiya_32.png", id: 197 },
    { name: "egypt kafr el sheikh", img: "../img/banderas/egypt_kafr_el_sheikh_32.png", id: 198 },
    { name: "egypt luxor", img: "../img/banderas/egypt_luxor_32.png", id: 199 },
    { name: "egypt matrouh", img: "../img/banderas/egypt_matrouh_32.png", id: 200 },
    { name: "egypt menoufia", img: "../img/banderas/egypt_menoufia_32.png", id: 201 },
    { name: "egypt minya", img: "../img/banderas/egypt_minya_32.png", id: 202 },
    { name: "egypt new valley", img: "../img/banderas/egypt_new_valley_32.png", id: 203 },
    { name: "egypt north sinai", img: "../img/banderas/egypt_north_sinai_32.png", id: 204 },
    { name: "egypt port said", img: "../img/banderas/egypt_port_said_32.png", id: 205 },
    { name: "egypt qalyubiya", img: "../img/banderas/egypt_qalyubiya_32.png", id: 206 },
    { name: "egypt qena", img: "../img/banderas/egypt_qena_32.png", id: 207 },
    { name: "egypt red sea", img: "../img/banderas/egypt_red_sea_32.png", id: 208 },
    { name: "egypt sharkia", img: "../img/banderas/egypt_sharkia_32.png", id: 209 },
    { name: "egypt south sinai", img: "../img/banderas/egypt_south_sinai_32.png", id: 210 },
    { name: "egypt suez", img: "../img/banderas/egypt_suez_32.png", id: 211 },
    { name: "egypt suhaj", img: "../img/banderas/egypt_suhaj_32.png", id: 212 },
    { name: "equatorial guinea", img: "../img/banderas/equatorial_guinea_32.png", id: 213 },
    { name: "eritrea", img: "../img/banderas/eritrea_32.png", id: 214 },
    { name: "estonia", img: "../img/banderas/estonia_32.png", id: 215 },
    { name: "estonia harju", img: "../img/banderas/estonia_harju_32.png", id: 216 },
    { name: "estonia hiiu", img: "../img/banderas/estonia_hiiu_32.png", id: 217 },
    { name: "estonia ida viru", img: "../img/banderas/estonia_ida_viru_32.png", id: 218 },
    { name: "estonia jarva", img: "../img/banderas/estonia_jarva_32.png", id: 219 },
    { name: "estonia jogeva", img: "../img/banderas/estonia_jogeva_32.png", id: 220 },
    { name: "estonia laane", img: "../img/banderas/estonia_laane_32.png", id: 221 },
    { name: "estonia laane viru", img: "../img/banderas/estonia_laane_viru_32.png", id: 222 },
    { name: "estonia parnu", img: "../img/banderas/estonia_parnu_32.png", id: 223 },
    { name: "estonia polva", img: "../img/banderas/estonia_polva_32.png", id: 224 },
    { name: "estonia rapla", img: "../img/banderas/estonia_rapla_32.png", id: 225 },
    { name: "estonia saare", img: "../img/banderas/estonia_saare_32.png", id: 226 },
    { name: "estonia tartu", img: "../img/banderas/estonia_tartu_32.png", id: 227 },
    { name: "estonia valga", img: "../img/banderas/estonia_valga_32.png", id: 228 },
    { name: "estonia viljandi", img: "../img/banderas/estonia_viljandi_32.png", id: 229 },
    { name: "estonia voru", img: "../img/banderas/estonia_voru_32.png", id: 230 },
    { name: "eswatini", img: "../img/banderas/eswatini_32.png", id: 231 },
    { name: "ethiopia", img: "../img/banderas/ethiopia_32.png", id: 232 },
    { name: "ethiopia addis ababa", img: "../img/banderas/ethiopia_addis_ababa_32.png", id: 233 },
    { name: "ethiopia afar", img: "../img/banderas/ethiopia_afar_32.png", id: 234 },
    { name: "ethiopia amhara", img: "../img/banderas/ethiopia_amhara_32.png", id: 235 },
    { name: "ethiopia benishangul gumuz", img: "../img/banderas/ethiopia_benishangul_gumuz_32.png", id: 236 },
    { name: "ethiopia central", img: "../img/banderas/ethiopia_central_32.png", id: 237 },
    { name: "ethiopia dire dawa", img: "../img/banderas/ethiopia_dire_dawa_32.png", id: 238 },
    { name: "ethiopia gambella", img: "../img/banderas/ethiopia_gambella_32.png", id: 239 },
    { name: "ethiopia harari", img: "../img/banderas/ethiopia_harari_32.png", id: 240 },
    { name: "ethiopia oromia", img: "../img/banderas/ethiopia_oromia_32.png", id: 241 },
    { name: "ethiopia sidama", img: "../img/banderas/ethiopia_sidama_32.png", id: 242 },
    { name: "ethiopia somali", img: "../img/banderas/ethiopia_somali_32.png", id: 243 },
    { name: "ethiopia south west", img: "../img/banderas/ethiopia_south_west_32.png", id: 244 },
    { name: "ethiopia southern", img: "../img/banderas/ethiopia_southern_32.png", id: 245 },
    { name: "ethiopia tigray", img: "../img/banderas/ethiopia_tigray_32.png", id: 246 },
    { name: "finland", img: "../img/banderas/finland_32.png", id: 247 },
    { name: "finland aland", img: "../img/banderas/finland_aland_32.png", id: 248 },
    { name: "finland central finland", img: "../img/banderas/finland_central_finland_32.png", id: 249 },
    { name: "finland central ostrobothnia", img: "../img/banderas/finland_central_ostrobothnia_32.png", id: 250 },
    { name: "finland kainuu", img: "../img/banderas/finland_kainuu_32.png", id: 251 },
    { name: "finland kanta hame", img: "../img/banderas/finland_kanta_hame_32.png", id: 252 },
    { name: "finland kymenlaakso", img: "../img/banderas/finland_kymenlaakso_32.png", id: 253 },
    { name: "finland lapland", img: "../img/banderas/finland_lapland_32.png", id: 254 },
    { name: "finland north karelia", img: "../img/banderas/finland_north_karelia_32.png", id: 255 },
    { name: "finland north ostrobothnia", img: "../img/banderas/finland_north_ostrobothnia_32.png", id: 256 },
    { name: "finland northern savonia", img: "../img/banderas/finland_northern_savonia_32.png", id: 257 },
    { name: "finland ostrobothnia", img: "../img/banderas/finland_ostrobothnia_32.png", id: 258 },
    { name: "finland paijat hame", img: "../img/banderas/finland_paijat_hame_32.png", id: 259 },
    { name: "finland pirkanmaa", img: "../img/banderas/finland_pirkanmaa_32.png", id: 260 },
    { name: "finland satakunta", img: "../img/banderas/finland_satakunta_32.png", id: 261 },
    { name: "finland south karelia", img: "../img/banderas/finland_south_karelia_32.png", id: 262 },
    { name: "finland south savonia", img: "../img/banderas/finland_south_savonia_32.png", id: 263 },
    { name: "finland southern ostrobothnia", img: "../img/banderas/finland_southern_ostrobothnia_32.png", id: 264 },
    { name: "finland southwest finland", img: "../img/banderas/finland_southwest_finland_32.png", id: 265 },
    { name: "finland uusimaa", img: "../img/banderas/finland_uusimaa_32.png", id: 266 },
    { name: "france", img: "../img/banderas/france_32.png", id: 267 },
    { name: "france auvergne rhone alpes", img: "../img/banderas/france_auvergne_rhone_alpes_32.png", id: 268 },
    { name: "france bourgogne franche comte", img: "../img/banderas/france_bourgogne_franche_comte_32.png", id: 269 },
    { name: "france bretagne", img: "../img/banderas/france_bretagne_32.png", id: 270 },
    { name: "france centre val de loire", img: "../img/banderas/france_centre_val_de_loire_32.png", id: 271 },
    { name: "france corsica", img: "../img/banderas/france_corsica_32.png", id: 272 },
    { name: "france french guiana", img: "../img/banderas/france_french_guiana_32.png", id: 273 },
    { name: "france french polynesia", img: "../img/banderas/france_french_polynesia_32.png", id: 274 },
    { name: "france french southern and antarctic lands", img: "../img/banderas/france_french_southern_and_antarctic_lands_32.png", id: 275 },
    { name: "france grand est", img: "../img/banderas/france_grand_est_32.png", id: 276 },
    { name: "france guadeloupe", img: "../img/banderas/france_guadeloupe_32.png", id: 277 },
    { name: "france hauts de france", img: "../img/banderas/france_hauts_de_france_32.png", id: 278 },
    { name: "france ile de france", img: "../img/banderas/france_ile_de_france_32.png", id: 279 },
    { name: "france martinique", img: "../img/banderas/france_martinique_32.png", id: 280 },
    { name: "france mayotte", img: "../img/banderas/france_mayotte_32.png", id: 281 },
    { name: "france normandy", img: "../img/banderas/france_normandy_32.png", id: 282 },
    { name: "france nouvelle aquitaine", img: "../img/banderas/france_nouvelle_aquitaine_32.png", id: 283 },
    { name: "france occitanie", img: "../img/banderas/france_occitanie_32.png", id: 284 },
    { name: "france pays de la loire", img: "../img/banderas/france_pays_de_la_loire_32.png", id: 285 },
    { name: "france provence alpes cote d azur", img: "../img/banderas/france_provence_alpes_cote_d_azur_32.png", id: 286 },
    { name: "france reunion", img: "../img/banderas/france_reunion_32.png", id: 287 },
    { name: "france saint barthelemy", img: "../img/banderas/france_saint_barthelemy_32.png", id: 288 },
    { name: "france saint pierre and miquelon", img: "../img/banderas/france_saint_pierre_and_miquelon_32.png", id: 289 },
    { name: "france wallis and futuna", img: "../img/banderas/france_wallis_and_futuna_32.png", id: 290 },
    { name: "gabon", img: "../img/banderas/gabon_32.png", id: 291 },
    { name: "gambia", img: "../img/banderas/gambia_32.png", id: 292 },
    { name: "georgia", img: "../img/banderas/georgia_32.png", id: 293 },
    { name: "georgia abkhazia", img: "../img/banderas/georgia_abkhazia_32.png", id: 294 },
    { name: "georgia adjara", img: "../img/banderas/georgia_adjara_32.png", id: 295 },
    { name: "georgia south ossetia", img: "../img/banderas/georgia_south_ossetia_32.png", id: 296 },
    { name: "georgia tbilisi", img: "../img/banderas/georgia_tbilisi_32.png", id: 297 },
    { name: "germany", img: "../img/banderas/germany_32.png", id: 298 },
    { name: "germany baden wurttemberg", img: "../img/banderas/germany_baden_wurttemberg_32.png", id: 299 },
    { name: "germany bavaria", img: "../img/banderas/germany_bavaria_32.png", id: 300 },
    { name: "germany berlin", img: "../img/banderas/germany_berlin_32.png", id: 301 },
    { name: "germany brandenburg", img: "../img/banderas/germany_brandenburg_32.png", id: 302 },
    { name: "germany bremen", img: "../img/banderas/germany_bremen_32.png", id: 303 },
    { name: "germany hamburg", img: "../img/banderas/germany_hamburg_32.png", id: 304 },
    { name: "germany hesse", img: "../img/banderas/germany_hesse_32.png", id: 305 },
    { name: "germany lower saxony", img: "../img/banderas/germany_lower_saxony_32.png", id: 306 },
    { name: "germany mecklenburg vorpommern", img: "../img/banderas/germany_mecklenburg_vorpommern_32.png", id: 307 },
    { name: "germany north rhine westphalia", img: "../img/banderas/germany_north_rhine_westphalia_32.png", id: 308 },
    { name: "germany rhineland palatinate", img: "../img/banderas/germany_rhineland_palatinate_32.png", id: 309 },
    { name: "germany saarland", img: "../img/banderas/germany_saarland_32.png", id: 310 },
    { name: "germany saxony", img: "../img/banderas/germany_saxony_32.png", id: 311 },
    { name: "germany saxony anhalt", img: "../img/banderas/germany_saxony_anhalt_32.png", id: 312 },
    { name: "germany schleswig holstein", img: "../img/banderas/germany_schleswig_holstein_32.png", id: 313 },
    { name: "germany thuringia", img: "../img/banderas/germany_thuringia_32.png", id: 314 },
    { name: "ghana", img: "../img/banderas/ghana_32.png", id: 315 },
    { name: "greece", img: "../img/banderas/greece_32.png", id: 316 },
    { name: "guinea", img: "../img/banderas/guinea_32.png", id: 317 },
    { name: "guinea bissau", img: "../img/banderas/guinea_bissau_32.png", id: 318 },
    { name: "hungary", img: "../img/banderas/hungary_32.png", id: 319 },
    { name: "iceland", img: "../img/banderas/iceland_32.png", id: 320 },
    { name: "india", img: "../img/banderas/india_32.png", id: 321 },
    { name: "indonesia", img: "../img/banderas/indonesia_32.png", id: 322 },
    { name: "ireland", img: "../img/banderas/ireland_32.png", id: 323 },
    { name: "ireland connacht", img: "../img/banderas/ireland_connacht_32.png", id: 324 },
    { name: "ireland leinster", img: "../img/banderas/ireland_leinster_32.png", id: 325 },
    { name: "ireland munster", img: "../img/banderas/ireland_munster_32.png", id: 326 },
    { name: "ireland ulster", img: "../img/banderas/ireland_ulster_32.png", id: 327 },
    { name: "italy", img: "../img/banderas/italy_32.png", id: 328 },
    { name: "italy abruzzo", img: "../img/banderas/italy_abruzzo_32.png", id: 329 },
    { name: "italy aosta valley", img: "../img/banderas/italy_aosta_valley_32.png", id: 330 },
    { name: "italy apulia", img: "../img/banderas/italy_apulia_32.png", id: 331 },
    { name: "italy basilicata", img: "../img/banderas/italy_basilicata_32.png", id: 332 },
    { name: "italy calabria", img: "../img/banderas/italy_calabria_32.png", id: 333 },
    { name: "italy campania", img: "../img/banderas/italy_campania_32.png", id: 334 },
    { name: "italy emilia romagna", img: "../img/banderas/italy_emilia_romagna_32.png", id: 335 },
    { name: "italy friuli venezia giulia", img: "../img/banderas/italy_friuli_venezia_giulia_32.png", id: 336 },
    { name: "italy lazio", img: "../img/banderas/italy_lazio_32.png", id: 337 },
    { name: "italy liguria", img: "../img/banderas/italy_liguria_32.png", id: 338 },
    { name: "italy lombardy", img: "../img/banderas/italy_lombardy_32.png", id: 339 },
    { name: "italy marche", img: "../img/banderas/italy_marche_32.png", id: 340 },
    { name: "italy molise", img: "../img/banderas/italy_molise_32.png", id: 341 },
    { name: "italy piedmont", img: "../img/banderas/italy_piedmont_32.png", id: 342 },
    { name: "italy sardinia", img: "../img/banderas/italy_sardinia_32.png", id: 343 },
    { name: "italy sicily", img: "../img/banderas/italy_sicily_32.png", id: 344 },
    { name: "italy trentino south tyrol", img: "../img/banderas/italy_trentino_south_tyrol_32.png", id: 345 },
    { name: "italy tuscany", img: "../img/banderas/italy_tuscany_32.png", id: 346 },
    { name: "italy umbria", img: "../img/banderas/italy_umbria_32.png", id: 347 },
    { name: "italy veneto", img: "../img/banderas/italy_veneto_32.png", id: 348 },
    { name: "japan", img: "../img/banderas/japan_32.png", id: 349 },
    { name: "japan aichi", img: "../img/banderas/japan_aichi_32.png", id: 350 },
    { name: "japan akita", img: "../img/banderas/japan_akita_32.png", id: 351 },
    { name: "japan aomori", img: "../img/banderas/japan_aomori_32.png", id: 352 },
    { name: "japan chiba", img: "../img/banderas/japan_chiba_32.png", id: 353 },
    { name: "japan ehime", img: "../img/banderas/japan_ehime_32.png", id: 354 },
    { name: "japan fukui", img: "../img/banderas/japan_fukui_32.png", id: 355 },
    { name: "japan fukuoka", img: "../img/banderas/japan_fukuoka_32.png", id: 356 },
    { name: "japan fukushima", img: "../img/banderas/japan_fukushima_32.png", id: 357 },
    { name: "japan gifu", img: "../img/banderas/japan_gifu_32.png", id: 358 },
    { name: "japan gunma", img: "../img/banderas/japan_gunma_32.png", id: 359 },
    { name: "japan hiroshima", img: "../img/banderas/japan_hiroshima_32.png", id: 360 },
    { name: "japan hokkaido", img: "../img/banderas/japan_hokkaido_32.png", id: 361 },
    { name: "japan hyogo", img: "../img/banderas/japan_hyogo_32.png", id: 362 },
    { name: "japan ibaraki", img: "../img/banderas/japan_ibaraki_32.png", id: 363 },
    { name: "japan ishikawa", img: "../img/banderas/japan_ishikawa_32.png", id: 364 },
    { name: "japan iwate", img: "../img/banderas/japan_iwate_32.png", id: 365 },
    { name: "japan kagawa", img: "../img/banderas/japan_kagawa_32.png", id: 366 },
    { name: "japan kagoshima", img: "../img/banderas/japan_kagoshima_32.png", id: 367 },
    { name: "japan kanagawa", img: "../img/banderas/japan_kanagawa_32.png", id: 368 },
    { name: "japan kochi", img: "../img/banderas/japan_kochi_32.png", id: 369 },
    { name: "japan kumamoto", img: "../img/banderas/japan_kumamoto_32.png", id: 370 },
    { name: "japan kyoto", img: "../img/banderas/japan_kyoto_32.png", id: 371 },
    { name: "japan mie", img: "../img/banderas/japan_mie_32.png", id: 372 },
    { name: "japan miyagi", img: "../img/banderas/japan_miyagi_32.png", id: 373 },
    { name: "japan miyazaki", img: "../img/banderas/japan_miyazaki_32.png", id: 374 },
    { name: "japan nagano", img: "../img/banderas/japan_nagano_32.png", id: 375 },
    { name: "japan nagasaki", img: "../img/banderas/japan_nagasaki_32.png", id: 376 },
    { name: "japan nara", img: "../img/banderas/japan_nara_32.png", id: 377 },
    { name: "japan niigata", img: "../img/banderas/japan_niigata_32.png", id: 378 },
    { name: "japan ogasawara", img: "../img/banderas/japan_ogasawara_32.png", id: 379 },
    { name: "japan oita", img: "../img/banderas/japan_oita_32.png", id: 380 },
    { name: "japan okayama", img: "../img/banderas/japan_okayama_32.png", id: 381 },
    { name: "japan okinawa", img: "../img/banderas/japan_okinawa_32.png", id: 382 },
    { name: "japan osaka", img: "../img/banderas/japan_osaka_32.png", id: 383 },
    { name: "japan saga", img: "../img/banderas/japan_saga_32.png", id: 384 },
    { name: "japan saitama", img: "../img/banderas/japan_saitama_32.png", id: 385 },
    { name: "japan shiga", img: "../img/banderas/japan_shiga_32.png", id: 386 },
    { name: "japan shimane", img: "../img/banderas/japan_shimane_32.png", id: 387 },
    { name: "japan shizuoka", img: "../img/banderas/japan_shizuoka_32.png", id: 388 },
    { name: "japan tochigi", img: "../img/banderas/japan_tochigi_32.png", id: 389 },
    { name: "japan tokushima", img: "../img/banderas/japan_tokushima_32.png", id: 390 },
    { name: "japan tokyo", img: "../img/banderas/japan_tokyo_32.png", id: 391 },
    { name: "japan tottori", img: "../img/banderas/japan_tottori_32.png", id: 392 },
    { name: "japan toyama", img: "../img/banderas/japan_toyama_32.png", id: 393 },
    { name: "japan wakayama", img: "../img/banderas/japan_wakayama_32.png", id: 394 },
    { name: "japan yamagata", img: "../img/banderas/japan_yamagata_32.png", id: 395 },
    { name: "japan yamaguchi", img: "../img/banderas/japan_yamaguchi_32.png", id: 396 },
    { name: "japan yamanashi", img: "../img/banderas/japan_yamanashi_32.png", id: 397 },
    { name: "jordan", img: "../img/banderas/jordan_32.png", id: 398 },
    { name: "kazakhstan", img: "../img/banderas/kazakhstan_32.png", id: 399 },
    { name: "kazakhstan almaty", img: "../img/banderas/kazakhstan_almaty_32.png", id: 400 },
    { name: "kazakhstan astana", img: "../img/banderas/kazakhstan_astana_32.png", id: 401 },
    { name: "kazakhstan baikonur", img: "../img/banderas/kazakhstan_baikonur_32.png", id: 402 },
    { name: "kazakhstan karagandy oblast", img: "../img/banderas/kazakhstan_karagandy_oblast_32.png", id: 403 },
    { name: "kuwait", img: "../img/banderas/kuwait_32.png", id: 404 },
    { name: "kyrgyzstan", img: "../img/banderas/kyrgyzstan_32.png", id: 405 },
    { name: "laos", img: "../img/banderas/laos_32.png", id: 406 },
    { name: "latvia", img: "../img/banderas/latvia_32.png", id: 407 },
    { name: "latvia latgale", img: "../img/banderas/latvia_latgale_32.png", id: 408 },
    { name: "latvia riga", img: "../img/banderas/latvia_riga_32.png", id: 409 },
    { name: "latvia vidzeme", img: "../img/banderas/latvia_vidzeme_32.png", id: 410 },
    { name: "latvia zemgale", img: "../img/banderas/latvia_zemgale_32.png", id: 411 },
    { name: "lebanon", img: "../img/banderas/lebanon_32.png", id: 412 },
    { name: "lgbtqia", img: "../img/banderas/lgbtqia_32.png", id: 413 },
    { name: "lgbtqia agender", img: "../img/banderas/lgbtqia_agender_32.png", id: 414 },
    { name: "lgbtqia androgyne", img: "../img/banderas/lgbtqia_androgyne_32.png", id: 415 },
    { name: "lgbtqia aroace", img: "../img/banderas/lgbtqia_aroace_32.png", id: 416 },
    { name: "lgbtqia asexual", img: "../img/banderas/lgbtqia_asexual_32.png", id: 417 },
    { name: "lgbtqia bear", img: "../img/banderas/lgbtqia_bear_32.png", id: 418 },
    { name: "lgbtqia bisexual", img: "../img/banderas/lgbtqia_bisexual_32.png", id: 419 },
    { name: "lgbtqia demisexual", img: "../img/banderas/lgbtqia_demisexual_32.png", id: 420 },
    { name: "lgbtqia gender neutral", img: "../img/banderas/lgbtqia_gender_neutral_32.png", id: 421 },
    { name: "lgbtqia genderfluid", img: "../img/banderas/lgbtqia_genderfluid_32.png", id: 422 },
    { name: "lgbtqia genderqueer", img: "../img/banderas/lgbtqia_genderqueer_32.png", id: 423 },
    { name: "lgbtqia lesbian", img: "../img/banderas/lgbtqia_lesbian_32.png", id: 424 },
    { name: "lgbtqia nonbinary", img: "../img/banderas/lgbtqia_nonbinary_32.png", id: 425 },
    { name: "lgbtqia pansexual", img: "../img/banderas/lgbtqia_pansexual_32.png", id: 426 },
    { name: "lgbtqia pride", img: "../img/banderas/lgbtqia_pride_32.png", id: 427 },
    { name: "lgbtqia transgender", img: "../img/banderas/lgbtqia_transgender_32.png", id: 428 },
    { name: "liechtenstein", img: "../img/banderas/liechtenstein_32.png", id: 429 },
    { name: "lithuania", img: "../img/banderas/lithuania_32.png", id: 430 },
    { name: "luxembourg", img: "../img/banderas/luxembourg_32.png", id: 431 },
    { name: "malaysia", img: "../img/banderas/malaysia_32.png", id: 432 },
    { name: "malaysia kuala lumpur", img: "../img/banderas/malaysia_kuala_lumpur_32.png", id: 433 },
    { name: "maldives", img: "../img/banderas/maldives_32.png", id: 434 },
    { name: "malta", img: "../img/banderas/malta_32.png", id: 435 },
    { name: "malta central region", img: "../img/banderas/malta_central_region_32.png", id: 436 },
    { name: "malta gozo", img: "../img/banderas/malta_gozo_32.png", id: 437 },
    { name: "malta northern region", img: "../img/banderas/malta_northern_region_32.png", id: 438 },
    { name: "malta southeastern region", img: "../img/banderas/malta_southeastern_region_32.png", id: 439 },
    { name: "malta southern region", img: "../img/banderas/malta_southern_region_32.png", id: 440 },
    { name: "maritime rect alfa", img: "../img/banderas/maritime_rect_alfa_32.png", id: 441 },
    { name: "maritime rect answer", img: "../img/banderas/maritime_rect_answer_32.png", id: 442 },
    { name: "maritime rect bissotwo", img: "../img/banderas/maritime_rect_bissotwo_32.png", id: 443 },
    { name: "maritime rect bravo", img: "../img/banderas/maritime_rect_bravo_32.png", id: 444 },
    { name: "maritime rect charlie", img: "../img/banderas/maritime_rect_charlie_32.png", id: 445 },
    { name: "maritime rect delta", img: "../img/banderas/maritime_rect_delta_32.png", id: 446 },
    { name: "maritime rect echo", img: "../img/banderas/maritime_rect_echo_32.png", id: 447 },
    { name: "maritime rect first sub", img: "../img/banderas/maritime_rect_first_sub_32.png", id: 448 },
    { name: "maritime rect fourth sub", img: "../img/banderas/maritime_rect_fourth_sub_32.png", id: 449 },
    { name: "maritime rect foxtrot", img: "../img/banderas/maritime_rect_foxtrot_32.png", id: 450 },
    { name: "maritime rect golf", img: "../img/banderas/maritime_rect_golf_32.png", id: 451 },
    { name: "maritime rect hotel", img: "../img/banderas/maritime_rect_hotel_32.png", id: 452 },
    { name: "maritime rect india", img: "../img/banderas/maritime_rect_india_32.png", id: 453 },
    { name: "maritime rect juliet", img: "../img/banderas/maritime_rect_juliet_32.png", id: 454 },
    { name: "maritime rect kartefour", img: "../img/banderas/maritime_rect_kartefour_32.png", id: 455 },
    { name: "maritime rect kilo", img: "../img/banderas/maritime_rect_kilo_32.png", id: 456 },
    { name: "maritime rect lima", img: "../img/banderas/maritime_rect_lima_32.png", id: 457 },
    { name: "maritime rect mike", img: "../img/banderas/maritime_rect_mike_32.png", id: 458 },
    { name: "maritime rect nadazero", img: "../img/banderas/maritime_rect_nadazero_32.png", id: 459 },
    { name: "maritime rect nato eight", img: "../img/banderas/maritime_rect_nato_eight_32.png", id: 460 },
    { name: "maritime rect nato five", img: "../img/banderas/maritime_rect_nato_five_32.png", id: 461 },
    { name: "maritime rect nato four", img: "../img/banderas/maritime_rect_nato_four_32.png", id: 462 },
    { name: "maritime rect nato nine", img: "../img/banderas/maritime_rect_nato_nine_32.png", id: 463 },
    { name: "maritime rect nato one", img: "../img/banderas/maritime_rect_nato_one_32.png", id: 464 },
    { name: "maritime rect nato seven", img: "../img/banderas/maritime_rect_nato_seven_32.png", id: 465 },
    { name: "maritime rect nato six", img: "../img/banderas/maritime_rect_nato_six_32.png", id: 466 },
    { name: "maritime rect nato three", img: "../img/banderas/maritime_rect_nato_three_32.png", id: 467 },
    { name: "maritime rect nato two", img: "../img/banderas/maritime_rect_nato_two_32.png", id: 468 },
    { name: "maritime rect nato zero", img: "../img/banderas/maritime_rect_nato_zero_32.png", id: 469 },
    { name: "maritime rect november", img: "../img/banderas/maritime_rect_november_32.png", id: 470 },
    { name: "maritime rect novenine", img: "../img/banderas/maritime_rect_novenine_32.png", id: 471 },
    { name: "maritime rect oktoeight", img: "../img/banderas/maritime_rect_oktoeight_32.png", id: 472 },
    { name: "maritime rect oscar", img: "../img/banderas/maritime_rect_oscar_32.png", id: 473 },
    { name: "maritime rect pantafive", img: "../img/banderas/maritime_rect_pantafive_32.png", id: 474 },
    { name: "maritime rect papa", img: "../img/banderas/maritime_rect_papa_32.png", id: 475 },
    { name: "maritime rect quebec", img: "../img/banderas/maritime_rect_quebec_32.png", id: 476 },
    { name: "maritime rect romeo", img: "../img/banderas/maritime_rect_romeo_32.png", id: 477 },
    { name: "maritime rect second sub", img: "../img/banderas/maritime_rect_second_sub_32.png", id: 478 },
    { name: "maritime rect setteseven", img: "../img/banderas/maritime_rect_setteseven_32.png", id: 479 },
    { name: "maritime rect sierra", img: "../img/banderas/maritime_rect_sierra_32.png", id: 480 },
    { name: "maritime rect soxisix", img: "../img/banderas/maritime_rect_soxisix_32.png", id: 481 },
    { name: "maritime rect tango", img: "../img/banderas/maritime_rect_tango_32.png", id: 482 },
    { name: "maritime rect terrathree", img: "../img/banderas/maritime_rect_terrathree_32.png", id: 483 },
    { name: "maritime rect third sub", img: "../img/banderas/maritime_rect_third_sub_32.png", id: 484 },
    { name: "maritime rect unaone", img: "../img/banderas/maritime_rect_unaone_32.png", id: 485 },
    { name: "maritime rect uniform", img: "../img/banderas/maritime_rect_uniform_32.png", id: 486 },
    { name: "maritime rect victor", img: "../img/banderas/maritime_rect_victor_32.png", id: 487 },
    { name: "maritime rect whiskey", img: "../img/banderas/maritime_rect_whiskey_32.png", id: 488 },
    { name: "maritime rect xray", img: "../img/banderas/maritime_rect_xray_32.png", id: 489 },
    { name: "maritime rect yankee", img: "../img/banderas/maritime_rect_yankee_32.png", id: 490 },
    { name: "maritime rect zulu", img: "../img/banderas/maritime_rect_zulu_32.png", id: 491 },
    { name: "maritime square alfa", img: "../img/banderas/maritime_square_alfa_32.png", id: 492 },
    { name: "maritime square bravo", img: "../img/banderas/maritime_square_bravo_32.png", id: 493 },
    { name: "maritime square charlie", img: "../img/banderas/maritime_square_charlie_32.png", id: 494 },
    { name: "maritime square delta", img: "../img/banderas/maritime_square_delta_32.png", id: 495 },
    { name: "maritime square echo", img: "../img/banderas/maritime_square_echo_32.png", id: 496 },
    { name: "maritime square foxtrot", img: "../img/banderas/maritime_square_foxtrot_32.png", id: 497 },
    { name: "maritime square golf", img: "../img/banderas/maritime_square_golf_32.png", id: 498 },
    { name: "maritime square hotel", img: "../img/banderas/maritime_square_hotel_32.png", id: 499 },
    { name: "maritime square india", img: "../img/banderas/maritime_square_india_32.png", id: 500 },
    { name: "maritime square juliett", img: "../img/banderas/maritime_square_juliett_32.png", id: 501 },
    { name: "maritime square kilo", img: "../img/banderas/maritime_square_kilo_32.png", id: 502 },
    { name: "maritime square lima", img: "../img/banderas/maritime_square_lima_32.png", id: 503 },
    { name: "maritime square mike", img: "../img/banderas/maritime_square_mike_32.png", id: 504 },
    { name: "maritime square nato eight", img: "../img/banderas/maritime_square_nato_eight_32.png", id: 505 },
    { name: "maritime square nato five", img: "../img/banderas/maritime_square_nato_five_32.png", id: 506 },
    { name: "maritime square nato four", img: "../img/banderas/maritime_square_nato_four_32.png", id: 507 },
    { name: "maritime square nato nine", img: "../img/banderas/maritime_square_nato_nine_32.png", id: 508 },
    { name: "maritime square nato one", img: "../img/banderas/maritime_square_nato_one_32.png", id: 509 },
    { name: "maritime square nato seven", img: "../img/banderas/maritime_square_nato_seven_32.png", id: 510 },
    { name: "maritime square nato six", img: "../img/banderas/maritime_square_nato_six_32.png", id: 511 },
    { name: "maritime square nato three", img: "../img/banderas/maritime_square_nato_three_32.png", id: 512 },
    { name: "maritime square nato two", img: "../img/banderas/maritime_square_nato_two_32.png", id: 513 },
    { name: "maritime square nato zero", img: "../img/banderas/maritime_square_nato_zero_32.png", id: 514 },
    { name: "maritime square november", img: "../img/banderas/maritime_square_november_32.png", id: 515 },
    { name: "maritime square oscar", img: "../img/banderas/maritime_square_oscar_32.png", id: 516 },
    { name: "maritime square papa", img: "../img/banderas/maritime_square_papa_32.png", id: 517 },
    { name: "maritime square quebec", img: "../img/banderas/maritime_square_quebec_32.png", id: 518 },
    { name: "maritime square romeo", img: "../img/banderas/maritime_square_romeo_32.png", id: 519 },
    { name: "maritime square sierra", img: "../img/banderas/maritime_square_sierra_32.png", id: 520 },
    { name: "maritime square tango", img: "../img/banderas/maritime_square_tango_32.png", id: 521 },
    { name: "maritime square uniform", img: "../img/banderas/maritime_square_uniform_32.png", id: 522 },
    { name: "maritime square victor", img: "../img/banderas/maritime_square_victor_32.png", id: 523 },
    { name: "maritime square whiskey", img: "../img/banderas/maritime_square_whiskey_32.png", id: 524 },
    { name: "maritime square xray", img: "../img/banderas/maritime_square_xray_32.png", id: 525 },
    { name: "maritime square yankee", img: "../img/banderas/maritime_square_yankee_32.png", id: 526 },
    { name: "maritime square zulu", img: "../img/banderas/maritime_square_zulu_32.png", id: 527 },
    { name: "melanesia fiji", img: "../img/banderas/melanesia_fiji_32.png", id: 528 },
    { name: "melanesia new caledonia", img: "../img/banderas/melanesia_new_caledonia_32.png", id: 529 },
    { name: "melanesia papua new guinea", img: "../img/banderas/melanesia_papua_new_guinea_32.png", id: 530 },
    { name: "melanesia solomon islands", img: "../img/banderas/melanesia_solomon_islands_32.png", id: 531 },
    { name: "melanesia solomon islands capital", img: "../img/banderas/melanesia_solomon_islands_capital_32.png", id: 532 },
    { name: "melanesia solomon islands central province", img: "../img/banderas/melanesia_solomon_islands_central_province_32.png", id: 533 },
    { name: "melanesia solomon islands choiseul", img: "../img/banderas/melanesia_solomon_islands_choiseul_32.png", id: 534 },
    { name: "melanesia solomon islands guadalcanal", img: "../img/banderas/melanesia_solomon_islands_guadalcanal_32.png", id: 535 },
    { name: "melanesia solomon islands isabel", img: "../img/banderas/melanesia_solomon_islands_isabel_32.png", id: 536 },
    { name: "melanesia solomon islands makira ulawa", img: "../img/banderas/melanesia_solomon_islands_makira_ulawa_32.png", id: 537 },
    { name: "melanesia solomon islands malaita", img: "../img/banderas/melanesia_solomon_islands_malaita_32.png", id: 538 },
    { name: "melanesia solomon islands rennel and bellona", img: "../img/banderas/melanesia_solomon_islands_rennel_and_bellona_32.png", id: 539 },
    { name: "melanesia solomon islands temotu", img: "../img/banderas/melanesia_solomon_islands_temotu_32.png", id: 540 },
    { name: "melanesia solomon islands western province", img: "../img/banderas/melanesia_solomon_islands_western_province_32.png", id: 541 },
    { name: "melanesia vanuatu", img: "../img/banderas/melanesia_vanuatu_32.png", id: 542 },
    { name: "micronesia", img: "../img/banderas/micronesia_32.png", id: 543 },
    { name: "micronesia chuuk", img: "../img/banderas/micronesia_chuuk_32.png", id: 544 },
    { name: "micronesia kiribati", img: "../img/banderas/micronesia_kiribati_32.png", id: 545 },
    { name: "micronesia kosrae", img: "../img/banderas/micronesia_kosrae_32.png", id: 546 },
    { name: "micronesia marshall islands", img: "../img/banderas/micronesia_marshall_islands_32.png", id: 547 },
    { name: "micronesia nauru", img: "../img/banderas/micronesia_nauru_32.png", id: 548 },
    { name: "micronesia palau", img: "../img/banderas/micronesia_palau_32.png", id: 549 },
    { name: "micronesia pohnpei", img: "../img/banderas/micronesia_pohnpei_32.png", id: 550 },
    { name: "micronesia yap", img: "../img/banderas/micronesia_yap_32.png", id: 551 },
    { name: "moldova", img: "../img/banderas/moldova_32.png", id: 552 },
    { name: "monaco", img: "../img/banderas/monaco_32.png", id: 553 },
    { name: "mongolia", img: "../img/banderas/mongolia_32.png", id: 554 },
    { name: "montenegro", img: "../img/banderas/montenegro_32.png", id: 555 },
    { name: "myanmar", img: "../img/banderas/myanmar_32.png", id: 556 },
    { name: "nepal", img: "../img/banderas/nepal_32.png", id: 557 },
    { name: "netherlands", img: "../img/banderas/netherlands_32.png", id: 558 },
    { name: "netherlands bonaire", img: "../img/banderas/netherlands_bonaire_32.png", id: 559 },
    { name: "netherlands drenthe", img: "../img/banderas/netherlands_drenthe_32.png", id: 560 },
    { name: "netherlands flevoland", img: "../img/banderas/netherlands_flevoland_32.png", id: 561 },
    { name: "netherlands frisian", img: "../img/banderas/netherlands_frisian_32.png", id: 562 },
    { name: "netherlands gelderland", img: "../img/banderas/netherlands_gelderland_32.png", id: 563 },
    { name: "netherlands groningen", img: "../img/banderas/netherlands_groningen_32.png", id: 564 },
    { name: "netherlands limburg", img: "../img/banderas/netherlands_limburg_32.png", id: 565 },
    { name: "netherlands north brabant", img: "../img/banderas/netherlands_north_brabant_32.png", id: 566 },
    { name: "netherlands north holland", img: "../img/banderas/netherlands_north_holland_32.png", id: 567 },
    { name: "netherlands overijssel", img: "../img/banderas/netherlands_overijssel_32.png", id: 568 },
    { name: "netherlands saba", img: "../img/banderas/netherlands_saba_32.png", id: 569 },
    { name: "netherlands sint eustatius", img: "../img/banderas/netherlands_sint_eustatius_32.png", id: 570 },
    { name: "netherlands utrecht", img: "../img/banderas/netherlands_utrecht_32.png", id: 571 },
    { name: "netherlands zeeland", img: "../img/banderas/netherlands_zeeland_32.png", id: 572 },
    { name: "netherlands zuid holland", img: "../img/banderas/netherlands_zuid_holland_32.png", id: 573 },
    { name: "new zealand", img: "../img/banderas/new_zealand_32.png", id: 574 },
    { name: "new zealand cook islands", img: "../img/banderas/new_zealand_cook_islands_32.png", id: 575 },
    { name: "new zealand nelson", img: "../img/banderas/new_zealand_nelson_32.png", id: 576 },
    { name: "new zealand niue", img: "../img/banderas/new_zealand_niue_32.png", id: 577 },
    { name: "new zealand otago", img: "../img/banderas/new_zealand_otago_32.png", id: 578 },
    { name: "new zealand tokelau", img: "../img/banderas/new_zealand_tokelau_32.png", id: 579 },
    { name: "north korea", img: "../img/banderas/north_korea_32.png", id: 580 },
    { name: "north macedonia", img: "../img/banderas/north_macedonia_32.png", id: 581 },
    { name: "norway", img: "../img/banderas/norway_32.png", id: 582 },
    { name: "oman", img: "../img/banderas/oman_32.png", id: 583 },
    { name: "pakistan", img: "../img/banderas/pakistan_32.png", id: 584 },
    { name: "philippines", img: "../img/banderas/philippines_32.png", id: 585 },
    { name: "pirates bartholomew-roberts", img: "../img/banderas/pirates_bartholomew-roberts_32.png", id: 586 },
    { name: "pirates captain-napin", img: "../img/banderas/pirates_captain-napin_32.png", id: 587 },
    { name: "pirates christopher-condent", img: "../img/banderas/pirates_christopher-condent_32.png", id: 588 },
    { name: "pirates christopher-moody", img: "../img/banderas/pirates_christopher-moody_32.png", id: 589 },
    { name: "pirates edmund-cooke", img: "../img/banderas/pirates_edmund-cooke_32.png", id: 590 },
    { name: "pirates edward-low", img: "../img/banderas/pirates_edward-low_32.png", id: 591 },
    { name: "pirates emanuel-wynn", img: "../img/banderas/pirates_emanuel-wynn_32.png", id: 592 },
    { name: "pirates harris-blackbeard", img: "../img/banderas/pirates_harris-blackbeard_32.png", id: 593 },
    { name: "pirates henry-every", img: "../img/banderas/pirates_henry-every_32.png", id: 594 },
    { name: "pirates john-phillips", img: "../img/banderas/pirates_john-phillips_32.png", id: 595 },
    { name: "pirates john-rackham", img: "../img/banderas/pirates_john-rackham_32.png", id: 596 },
    { name: "pirates jolly-rober", img: "../img/banderas/pirates_jolly-rober_32.png", id: 597 },
    { name: "pirates richard-worley", img: "../img/banderas/pirates_richard-worley_32.png", id: 598 },
    { name: "pirates samuel-bellamy", img: "../img/banderas/pirates_samuel-bellamy_32.png", id: 599 },
    { name: "pirates stede-bonnet", img: "../img/banderas/pirates_stede-bonnet_32.png", id: 600 },
    { name: "pirates thomas-nichols", img: "../img/banderas/pirates_thomas-nichols_32.png", id: 601 },
    { name: "poland", img: "../img/banderas/poland_32.png", id: 602 },
    { name: "portugal", img: "../img/banderas/portugal_32.png", id: 603 },
    { name: "qatar", img: "../img/banderas/qatar_32.png", id: 604 },
    { name: "republic congo", img: "../img/banderas/republic_congo_32.png", id: 605 },
    { name: "romania", img: "../img/banderas/romania_32.png", id: 606 },
    { name: "samoa", img: "../img/banderas/samoa_32.png", id: 607 },
    { name: "san marino", img: "../img/banderas/san_marino_32.png", id: 608 },
    { name: "saudi arabia", img: "../img/banderas/saudi_arabia_32.png", id: 609 },
    { name: "serbia", img: "../img/banderas/serbia_32.png", id: 610 },
    { name: "serbia kosovo", img: "../img/banderas/serbia_kosovo_32.png", id: 611 },
    { name: "singapore", img: "../img/banderas/singapore_32.png", id: 612 },
    { name: "slovakia", img: "../img/banderas/slovakia_32.png", id: 613 },
    { name: "slovenia", img: "../img/banderas/slovenia_32.png", id: 614 },
    { name: "south korea", img: "../img/banderas/south_korea_32.png", id: 615 },
    { name: "spain", img: "../img/banderas/spain_32.png", id: 616 },
    { name: "spain andalusia", img: "../img/banderas/spain_andalusia_32.png", id: 617 },
    { name: "spain aragon", img: "../img/banderas/spain_aragon_32.png", id: 618 },
    { name: "spain asturias", img: "../img/banderas/spain_asturias_32.png", id: 619 },
    { name: "spain balearic islands", img: "../img/banderas/spain_balearic_islands_32.png", id: 620 },
    { name: "spain basque", img: "../img/banderas/spain_basque_32.png", id: 621 },
    { name: "spain canary islands", img: "../img/banderas/spain_canary_islands_32.png", id: 622 },
    { name: "spain cantabria", img: "../img/banderas/spain_cantabria_32.png", id: 623 },
    { name: "spain castile lamancha", img: "../img/banderas/spain_castile_lamancha_32.png", id: 624 },
    { name: "spain castile leon", img: "../img/banderas/spain_castile_leon_32.png", id: 625 },
    { name: "spain catalonia", img: "../img/banderas/spain_catalonia_32.png", id: 626 },
    { name: "spain ceuta", img: "../img/banderas/spain_ceuta_32.png", id: 627 },
    { name: "spain extremadura", img: "../img/banderas/spain_extremadura_32.png", id: 628 },
    { name: "spain galicia", img: "../img/banderas/spain_galicia_32.png", id: 629 },
    { name: "spain la rioja", img: "../img/banderas/spain_la_rioja_32.png", id: 630 },
    { name: "spain madrid", img: "../img/banderas/spain_madrid_32.png", id: 631 },
    { name: "spain melilla", img: "../img/banderas/spain_melilla_32.png", id: 632 },
    { name: "spain murcia", img: "../img/banderas/spain_murcia_32.png", id: 633 },
    { name: "spain navarre", img: "../img/banderas/spain_navarre_32.png", id: 634 },
    { name: "spain valencia", img: "../img/banderas/spain_valencia_32.png", id: 635 },
    { name: "sri lanka", img: "../img/banderas/sri_lanka_32.png", id: 636 },
    { name: "suriname", img: "../img/banderas/suriname_32.png", id: 637 },
    { name: "sweden", img: "../img/banderas/sweden_32.png", id: 638 },
    { name: "switzerland", img: "../img/banderas/switzerland_32.png", id: 639 },
    { name: "syria", img: "../img/banderas/syria_32.png", id: 640 },
    { name: "tajikistan", img: "../img/banderas/tajikistan_32.png", id: 641 },
    { name: "thailand", img: "../img/banderas/thailand_32.png", id: 642 },
    { name: "tonga", img: "../img/banderas/tonga_32.png", id: 643 },
    { name: "turkiye", img: "../img/banderas/turkiye_32.png", id: 644 },
    { name: "turkmenistan", img: "../img/banderas/turkmenistan_32.png", id: 645 },
    { name: "tuvalu", img: "../img/banderas/tuvalu_32.png", id: 646 },
    { name: "ukraine", img: "../img/banderas/ukraine_32.png", id: 647 },
    { name: "united arab emirates", img: "../img/banderas/united_arab_emirates_32.png", id: 648 },
    { name: "united kingdom", img: "../img/banderas/united_kingdom_32.png", id: 649 },
    { name: "united kingdom anguilla", img: "../img/banderas/united_kingdom_anguilla_32.png", id: 650 },
    { name: "united kingdom ascension island", img: "../img/banderas/united_kingdom_ascension_island_32.png", id: 651 },
    { name: "united kingdom bermuda", img: "../img/banderas/united_kingdom_bermuda_32.png", id: 652 },
    { name: "united kingdom british virgin islands", img: "../img/banderas/united_kingdom_british_virgin_islands_32.png", id: 653 },
    { name: "united kingdom cayman islands", img: "../img/banderas/united_kingdom_cayman_islands_32.png", id: 654 },
    { name: "united kingdom england", img: "../img/banderas/united_kingdom_england_32.png", id: 655 },
    { name: "united kingdom falkland islands", img: "../img/banderas/united_kingdom_falkland_islands_32.png", id: 656 },
    { name: "united kingdom gibraltar", img: "../img/banderas/united_kingdom_gibraltar_32.png", id: 657 },
    { name: "united kingdom greater london", img: "../img/banderas/united_kingdom_greater_london_32.png", id: 658 },
    { name: "united kingdom montserrat", img: "../img/banderas/united_kingdom_montserrat_32.png", id: 659 },
    { name: "united kingdom pitcairn islands", img: "../img/banderas/united_kingdom_pitcairn_islands_32.png", id: 660 },
    { name: "united kingdom saint helena", img: "../img/banderas/united_kingdom_saint_helena_32.png", id: 661 },
    { name: "united kingdom scotland", img: "../img/banderas/united_kingdom_scotland_32.png", id: 662 },
    { name: "united kingdom turks and caicos islands", img: "../img/banderas/united_kingdom_turks_and_caicos_islands_32.png", id: 663 },
    { name: "uzbekistan", img: "../img/banderas/uzbekistan_32.png", id: 664 },
    { name: "vatican city", img: "../img/banderas/vatican_city_32.png", id: 665 },
    { name: "vietnam", img: "../img/banderas/vietnam_32.png", id: 666 },
    { name: "yemen", img: "../img/banderas/yemen_32.png", id: 667 },
  ];


