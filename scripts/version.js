// VERSION : 

// REPOSITORY :
const repo = "hiit";

// CONSTS : 
const owner = "aminchb";
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits`;

function version(){
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
    if (Array.isArray(data) && data.length > 0) {
      console.log("Dernier commit :", data[0].commit.message);
    } else {
      console.log("Aucun commit trouvé.");
    }
    })
    .catch(error => console.error("Erreur lors de la récupération des commits :", error));
}

version();