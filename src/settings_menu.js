// SETTINGS MENU : ................................

// CONSTANTS : ................................
const inputs = document.querySelectorAll(".input");
const start_button = document.querySelector("button");

const settings = document.getElementById("SETTINGS");
const settings_button = document.getElementById("SETTINGS-BUTTON");
const settings_theme = document.getElementById("SETTINGS-SECTION");

// FUNCTIONS : ................................

export function toggle_menu(){
    start_button.classList.toggle("hidden");

    settings.classList.toggle("hidden");
    settings_button.classList.toggle("hidden");

    settings_theme.classList.toggle("hide-settings");
    settings_theme.classList.toggle("show-settings");
    console.log("MENU TOGGLE : OK.");

}

window.toggle_menu = toggle_menu;

export function reset_display(){
    start_button.classList.remove("hidden");

    settings.classList.add("hidden");
    settings_button.classList.remove("hidden");

    settings_theme.classList.add("hide-settings");
    settings_theme.classList.remove("show-settings");

    inputs.forEach(input => {
        input.value = input.min;
    });
    console.log("DISPLAY RESET : OK.");
}

// window.reset_display = reset_display;



function formatInput(input) {
    const max = parseInt(input.max);
    let value = parseInt(input.value);
    let user_input = value;
    if (isNaN(value)) {
        value = 0;
    }
    if (value > max) {
        value = max;
    }
    input.value = value.toString().padStart(2, '0');
    console.log("FORMAT INPUT : " + user_input + " -> " + input.value);
}


inputs.forEach(input => {
    input.addEventListener("blur", () => formatInput(input));
});