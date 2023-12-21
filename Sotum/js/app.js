// imports
import { Main } from "./functions/Main.js";
import { sansAccents } from "./functions/sansAccents.js";


// déclaration des variabless générales
const loadingGif = document.querySelector("#loadingGif");
const wait = document.querySelector("#wait");
let mot = [];
let motATrouver = [];
let motATrouverAccent = [];
let essai = 1;
let nombreEssais = 6;
let tabId = ["a"];
let affichageEnTete = document.querySelector("#enTeteJs");
let displayEssai = affichageEnTete.appendChild(document.createElement("h2"));
let displayNbLettres = affichageEnTete.appendChild(
  document.createElement("h2")
);

loadingGif.style.display = "block";
wait.style.display = "block";

// récupération du mot à deviner via une API
fetch("https://trouve-mot.fr/api/random")
  .then((response) => response.json())
  .then((words) => {
    setTimeout(() => {
      words.forEach((word) => {
        // split permet de découper une chaine de caractères dans un tableau
        motATrouverAccent = word.name.split("");
      });
      motATrouver = motATrouverAccent.map((lettre) =>
        sansAccents(lettre).toUpperCase()
      );
      motATrouver = ["A", "Z", "E", "R", "T", "Y"];
      console.log(motATrouver);
      if (motATrouver.indexOf("-") !== -1 || motATrouver.length < 4) {
        location.reload();
      }
      // affichage des essais restants
      displayEssai.innerText = `Essai ${essai}/${nombreEssais}`;
      // affichage du nombre de lettres
      displayNbLettres.innerText = `${motATrouver.length} lettres`;
      let tabTemp = [];
      for (let valeur = 0; valeur < motATrouver.length; valeur++) {
        tabTemp.push(" . ");
      }
      // appel fonction principale et camouflage du gif
      Main(tabTemp, tabId, motATrouver, mot, essai, nombreEssais, displayEssai);
      loadingGif.style.display = "none";
      wait.style.display = "none";

    }, 2000);
  });





