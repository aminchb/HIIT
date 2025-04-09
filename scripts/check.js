// CHECK :
const website_url = "https://aminchb.github.io/hiit/";
const deployments_url = "https://github.com/aminchb/hiit/deployments";

function check(){
    if (typeof window !== "undefined" && typeof window.open === "function") {
        window.open(website_url, "_blank");
        window.open(deployments_url, "_blank");
    } else {
        const { exec } = require("child_process");
        const platform = process.platform;
        if (platform === "win32") {
            exec(`start ${website_url}`);
            exec(`start ${deployments_url}`);
        } else if (platform === "darwin") {
            exec(`open ${website_url}`);
            exec(`open ${deployments_url}`);
        } else {
            exec(`xdg-open ${website_url}`);
            exec(`xdg-open ${deployments_url}`);
        }
    }
}

check();