// WEBSITE :
const website_url = "https://aminchb.github.io/hiit/";

function website(){
    if (typeof window !== "undefined" && typeof window.open === "function") {
        window.open(website_url, "_blank");
    } else {
        const { exec } = require("child_process");
        const platform = process.platform;
        if (platform === "win32") {
            exec(`start ${website_url}`);
        } else if (platform === "darwin") {
            exec(`open ${website_url}`);
        } else {
            exec(`xdg-open ${website_url}`);
        }
    }
}

website();