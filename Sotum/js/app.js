import { Main } from "./functions/Main.js";
import { sansAccents } from "./functions/sansAccents.js";

const loadingGif = document.querySelector("#loadingGif");
const wait = document.querySelector("#wait");
const clavier = document.querySelector("#clavier");
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
clavier.style.display = "none";


// récupération du mot à deviner via une API
fetch("https://trouve-mot.fr/api/random")
  .then((response) => response.json())
  .then((words) => {
    setTimeout(() => {
      words.forEach((word) => {
        // découper le mot dans un tableau
        motATrouverAccent = word.name.split("");
      });
      motATrouver = motATrouverAccent.map((lettre) =>
        sansAccents(lettre).toUpperCase()
      );
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
      Main(tabTemp, tabId, motATrouver, mot, essai, nombreEssais, displayEssai);
      loadingGif.style.display = "none";
      wait.style.display = "none";
      clavier.style.display = "block";
    }, 2000);
  });





