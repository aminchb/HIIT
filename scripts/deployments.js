// DEPLOYMENTS :
const deployments_url = "https://github.com/aminchb/hiit/deployments";

function deployments(){
    if (typeof window !== "undefined" && typeof window.open === "function") {
        window.open(deployments_url, "_blank");
    } else {
        const { exec } = require("child_process");
        const platform = process.platform;
        if (platform === "win32") {
            exec(`start ${deployments_url}`);
        } else if (platform === "darwin") {
            exec(`open ${deployments_url}`);
        } else {
            exec(`xdg-open ${deployments_url}`);
        }
    }
}

deployments();