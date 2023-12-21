let dictionnaire = [];
let motDicoAccent = [];
let motDico = [];

function sansAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

fetch("https://trouve-mot.fr/api/random/3575")
  .then((response) => response.json())
  .then((words) => {

    words.forEach(word => {
      motDicoAccent = word.name.split("");
    });
    motDico = motDicoAccent.map((lettre) =>
      sansAccents(lettre).toUpperCase()
    );
    if (!motDico.indexOf("-") !== -1 || motDico.length > 4) {
      motDico.join("");
      // ajouter au dictionnaire
      dictionnaire.push(motDico);
      //ajouter au json
    }
  });

console.log(dictionnaire);
