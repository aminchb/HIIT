import { toggle_menu, reset_display } from './settings_menu.js';

// TIMER : ................................

// CONSTANTS : ................................
const start_button = document.querySelector("button");
const chrono = document.getElementById("CHRONO");
const chrono_inputs = document.querySelectorAll(".chrono-input");
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// VARIABLES : ................................
let chrono_time = 0;
let chrono_base_time = 0;
let chrono_interval = null;


let is_rest_mode = false;
let is_running = false;
// NEEDED : ...................................
let timer_time = 0;
let resting_time = 0;
let current_time = 0;

// OTHERS : ...................................
var rest_time = 0;
const settingsInputs = document.querySelectorAll(".input");


// FUNCTIONS : ................................

function reset_timer(){
    toggle_menu();
}


function set_rest_time() {
    console.log("SET REST TIME : OK.");
    //toggle_menu();
    /*
    settings_button.classList.toggle("hidden");

    let minutes = parseInt(document.getElementById("rest-minutes").value) || 0;
    let seconds = parseInt(document.getElementById("rest-seconds").value) || 0;
    let hundreths = parseInt(document.getElementById("rest-hundreths").value) || 0;
    // REST TIME :
    rest_time = (minutes * 60 + seconds) * 1000 + hundreths * 10;

    if(rest_time > 990){
        // Afficher un message temporaire
        const message = document.createElement("div");
        message.textContent = "⏱️ Temps de repos enregistré !";
        message.className = "confirmation-message";
        //message.style.color = "white";
        settings_section.appendChild(message);

        // Supprimer le message après 2 secondes
        setTimeout(() => {
            message.remove();
            //settings_button.classList.toggle("hidden");
        }, 1000);
        console.log("SET REST TIME : " + rest_time);
        return;
    }
    rest_time = 0;
    */
    console.log("SET REST TIME : " + rest_time);  
}

window.set_rest_time = set_rest_time;





// ➕ Stocker la durée définie
function set_chrono_time() {
    let minutes = parseInt(document.getElementById("chrono-minutes").value) || 0;
    let seconds = parseInt(document.getElementById("chrono-seconds").value) || 0;
    let hundreths = parseInt(document.getElementById("chrono-hundreths").value) || 0;

    chrono_time = (minutes * 60 + seconds) * 1000 + hundreths * 10;
    chrono_base_time = chrono_time; // 👈 On mémorise la durée de base
    console.log("CHRONO TIME : " + chrono_time);
}

function start_pause_chrono(button) {
    if (is_running) {
        stop_chrono(button);
    } else {
        start_chrono(button);
    }
}

function start_chrono(button) {
    if (chrono_interval) return; // déjà lancé
    is_running = true;

    // Si pas encore de base, on l’enregistre
    if (!chrono_base_time) {
        chrono_base_time = chrono_time;
    }

    // Si chrono trop court, mais qu'on a une base, on le restaure
    if (chrono_time < 1000) {
        if (chrono_base_time >= 1000) {
            chrono_time = chrono_base_time;
        } else {
            console.log("trop court, eviter !!!");
            return;
        }
    }

    button.textContent = "PAUSE";

    chrono_interval = setInterval(() => {
        chrono_time -= 10;
        display_time();

        if (chrono_time <= 0) {
            beep();
        
            if (is_rest_mode) {
                // On était en repos → retour au chrono principal
                chrono_time = chrono_base_time;
                
                chrono.classList.toggle("rest");

                is_rest_mode = false;
                console.log("Retour au chrono principal !");
            } else {
                // On était en chrono → passage au temps de repos
                if (typeof rest_time !== "undefined" && rest_time > 0) {
                    
                    chrono.classList.toggle("rest");

                    chrono_time = rest_time;
                    is_rest_mode = true;
                    console.log("Passage au temps de repos !");
                } else {
                    // S'il n'y a pas de temps de repos défini, recommencer le chrono
                    chrono_time = chrono_base_time;
                    console.log("Pas de temps de repos défini. Boucle chrono.");
                }
            }
        }        
    }, 10);
}

// 🛑 Stopper le chrono
function stop_chrono(button) {
    clearInterval(chrono_interval);
    chrono_interval = null;
    is_running = false;
    button.textContent = "START";
}

// 📺 Afficher les valeurs
function display_time() {
    let total = chrono_time;
    let minutes = Math.floor(total / 60000);
    total %= 60000;
    let seconds = Math.floor(total / 1000);
    let hundreths = Math.floor((total % 1000) / 10);

    document.getElementById("chrono-minutes").value = String(minutes).padStart(2, "0");
    document.getElementById("chrono-seconds").value = String(seconds).padStart(2, "0");
    document.getElementById("chrono-hundreths").value = String(hundreths).padStart(2, "0");

    /*console.log("chrono interval : " + chrono_interval);*/
}

// 🔊 Bip sonore
function beep() {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(500, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), 200);
}

// Events sur les inputs
chrono_inputs.forEach(input => {
    input.addEventListener("blur", set_chrono_time);
    input.addEventListener("focus", stop_chrono);
});




function reset(){
    stop_chrono(start_button); // stoppe le chrono s'il tourne
    if(chrono.classList.contains("rest")){
        chrono.classList.toggle("rest");
    }
    chrono_time = chrono_base_time || 0; // remet le temps initial ou 0
    rest_time = 0;
    display_time(); // met à jour l'affichage

    let settings_inputs = document.getElementsByClassName("inpt");
    for (let input of settings_inputs) {
        input.value = "00";
    }    
}