document.querySelector('#reloadButton').addEventListener('click', function () {
  // reload la page
  location.reload();
});

function sansAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// déclaration des variabless générales
const loadingGif = document.getElementById('loadingGif');
let mot = [];
// let tabTemp = [];
let motATrouver = [];
let motATrouverAccent = [];
let resultat;
let essai = 1;
let nombreEssais = 6;
// creation id
let tabId = ["a"];
// récupération de la div où sera affiché les infos
let affichage = document.querySelector('#cadre');
let affichageEnTete = document.querySelector('#enTeteJs')
let displayEssai = affichageEnTete.appendChild(document.createElement('h2'));
let displayNbLettres = affichageEnTete.appendChild(document.createElement('h2'));

loadingGif.style.display = 'block';

// récupération du mot à deviner via une API
fetch("https://trouve-mot.fr/api/random")
  .then((response) => response.json())
  .then((words) => {
    setTimeout(() => {
      words.forEach(word => {
        // split permet de découper une chaine de caractères dans un tableau
        motATrouverAccent = word.name.split('');
      })
      motATrouver = motATrouverAccent.map((lettre) => sansAccents(lettre).toUpperCase());
      console.log(motATrouver);
      // affichage des essais restants
      displayEssai.innerText = `Essai ${essai}/${nombreEssais}`;
      // affichage du nombre de lettres
      displayNbLettres.innerText = `${motATrouver.length} lettres`;
      // Création du tableau temporaire
      let tabTemp = [];
      for (let valeur = 0; valeur < motATrouver.length; valeur++) {
        tabTemp.push(" _ ");
      }
      // appel fonction principale
      Main(tabTemp);
      loadingGif.style.display = 'none';
    }, 2000)
  });


// définition de la fonction principale
function Main(tabTemp) {
  console.log(`tabtemp: ${tabTemp}`);
  // récupération de la div où sera affiché le jeu
  let affichage = document.querySelector('#cadre');
  // création d'une liste dans cette div
  let ul = affichage.appendChild(document.createElement("ul"));
  let tabIdJoined = tabId.join('');
  ul.id = tabIdJoined;
  console.log(`id ul: ${ul.id}`);

  // ajout de li dans la liste précédement créée
  // il y en a autant que d'éléments dans le tableau contenant le mot à deviner
  for (let i = 0; i < motATrouver.length; i++) {
    let li = ul.appendChild(document.createElement("li"));
    if (i == 0) {
      // ici tabTemp contient les lettres correctement placées
      // afin de les replacer à titre indicatif pour l'essai suivant
      li.innerText = motATrouver[i];
      li.style.background = "#177e89";

    }
    else {
      li.innerText = tabTemp[i];
      li.style.background = "#084c61";

    }

  };
  // Réinitialisation
  // tabTemp = [];
  mot = [];
  mot[0] = motATrouver[0];
  let i = 0;
  // récupération de ce que l'utilisateur rentre sur le clavier
  document.addEventListener("keydown", (event) => {
    // vérifier si la touche tapée est une lettre et si la limite du mot n'est pas atteinte
    if (/^[A-Za-z]$/i.test(event.key) && mot.length < motATrouver.length) {
      let lettreEntree = event.key.toUpperCase();
      // console.log(lettreEntree);
      // les instructions suivantes permettent de garder la première lettre du mot à trouver
      // inchangée dans l'affichage et dans le tableau du mot entré par le joueur
      if (i == 0 && lettreEntree != motATrouver[0]) {
        // récupérer la bonne liste
        let derniereListe = document.querySelector('#' + tabIdJoined);
        // si la lettre entrée est différente de la première lettre,
        // celle-ci est directement placée à la seconde place
        derniereListe.children[i].innerText = motATrouver[0];
        derniereListe.children[i + 1].innerText = lettreEntree;
        derniereListe.children[i + 1].style.backgroundColor = "#177e89";
        // ajouter la touche tapée à la fin du tableau contenant le mot entré par l'utilisateur
        mot.push(lettreEntree);
        i += 2;
        console.log("Element ul.children[i] :", ul.children[i]);
      }
      else if (i == 0 && lettreEntree === motATrouver[0]) {
        // récupérer la bonne liste
        let derniereListe = document.querySelector('#' + tabIdJoined);
        derniereListe.children[i].innerText = motATrouver[0];
        console.log("Element ul.children[i] :", ul.children[i]);
      }
      else {
        // récupérer la bonne liste
        let derniereListe = document.querySelector('#' + tabIdJoined);
        // remplacer " _ " par la touche tapée dans la liste
        derniereListe.children[i].innerText = lettreEntree;
        derniereListe.children[i].style.backgroundColor = "#177e89";
        // ajouter la touche tapée à la fin du tableau contenant le mot entré par l'utilisateur
        mot.push(lettreEntree);
        i++;
        console.log("Element ul.children[i] :", ul.children[i]);
      }

    }
    // dans le cas où la touche tapée n'est pas une lettre, vérifier si c'est un Backspace
    else if (event.key === "Backspace" && mot.length > 1) {
      // récupérer la bonne liste
      let derniereListe = document.querySelector('#' + tabIdJoined);
      // pop supprime le dernier élément du tableau 
      mot.pop();
      i--;
      // remplacer la lettre par " _ " dans la liste
      derniereListe.children[i].innerText = " _ ";
      derniereListe.children[i].style.backgroundColor = "#084c61";
    }
    // vérifier si le mot entré par l'utilisateur correspond au mot à trouver
    // vérifier si la touche tapée est Enter et si le mot est complet
    else if (event.key === "Enter" && mot.length == motATrouver.length) {
      // parcourir les deux mots parallèlement
      for (let index = 0; index < motATrouver.length; index++) {
        // vérifier si la lettre à l'index est la même des les deux tableaux
        if (mot[index] === motATrouver[index]) {
          // récupérer la bonne liste
          let derniereListe = document.querySelector('#' + tabIdJoined);
          // colore le background des lettres correctement placées en rouge
          derniereListe.children[index].style.backgroundColor = "red";
          // Remplacer l'élément présent à cet index par la lettre validée
          tabTemp.splice(index, 1, mot[index]);
        }
        // vérifier si la lettre entrée existe dans le mot mais est mal placée
        // slice(1) permet de ne pas vérifier la première case car elle n'est pas à placer
        // ajouter slice indice lettre dejà placée correctement
        else if (
          mot[index] !== motATrouver[index] &&
          (
            // si jamais pas de tabTemp (pour le premier essai)
            (tabTemp.length === 0 && motATrouver.slice(1).indexOf(mot[index]) !== -1) ||
            // autres cas
            (motATrouver.indexOf(mot[index]) !== -1 && tabTemp[index] === " _ ")
          )
        ) {
          console.log("if à rallonge");
          // récupérer la bonne liste
          let derniereListe = document.querySelector('#' + tabIdJoined);
          // background en jaune
          derniereListe.children[index].style.backgroundColor = "#f7b735";
          // remplacer
          tabTemp.splice(index, 1, " _ ");
        }
        else if (motATrouver.indexOf(mot[index]) === -1) {
          tabTemp.splice(index, 1, " _ ");
        }
      }
      // pas de " _ " donc mot correct
      if (tabTemp.indexOf(" _ ") === -1 && tabTemp.length == motATrouver.length) {
        resultat = tabTemp.join("");
        let displayResult = document.createElement("h2");
        displayResult.innerText = resultat;
        affichage.append(displayResult);
      }
      // mot incomplet
      else if ((tabTemp.indexOf(" _ ") !== -1 && essai <= nombreEssais) || (tabTemp.length != motATrouver.length && essai <= nombreEssais)) {
        tabId.push("a");
        essai++;
        displayEssai.innerText = `Essai ${essai}/${nombreEssais}`;
        // incrémentation pour le prochain essai
        Main(tabTemp);
      }
      // plus d'essais restants
      else if ((tabTemp.indexOf(" _ ") != -1 && essai > nombreEssais) || (tabTemp.length != motATrouver.length && essai > nombreEssais)) {
        let displayResult = document.createElement("h2");
        displayResult.innerText = `Perdu ! Le mot était ${motATrouver.join()}`;
        affichage.append(display);
      }
    }
  });

}
