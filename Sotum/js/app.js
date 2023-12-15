document.getElementById('reloadButton').addEventListener('click', function () {
  // reload la page
  location.reload();
});

function sansAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// déclaration des variabless générales
let mot = [];
let tabTemp = [];
let motATrouver = [];
let motATrouverAccent = [];
let resultat;
// let verif = true;
let essai = 1;
let nombreEssais = 6;
// récupération de la div où sera affiché les infos
let affichage = document.querySelector('#cadre');
let affichageEnTete = document.querySelector('#enTeteJs')
let displayEssai = affichageEnTete.appendChild(document.createElement('h2'));
let displayNbLettres = affichageEnTete.appendChild(document.createElement('h2'));

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
      // appel fonction principale
      Main(tabTemp);
    }, 2000)
  });


// définition de la fonction principale
function Main(tabTemp) {

  // récupération de la div où sera affiché le jeu
  let affichage = document.querySelector('#cadre');
  // création d'une liste dans cette div
  let ul = affichage.appendChild(document.createElement("ul"));
  // i = 0;
  // ajout de li dans la liste précédement créée
  // il y en a autant que d'éléments dans le tableau contenant le mot à deviner
  for (let i = 0; i < motATrouver.length; i++) {
    let li = ul.appendChild(document.createElement("li"));
    // si pas de tabTemp et première lettre
    if (tabTemp.length == 0 && i == 0) {
      // ajouter la première lettre du mot
      li.innerText = motATrouver[0];
      li.style.background = "#177e89";
    }
    // si pas de tabTemp ou (tabTemp ET pas de lettre à cet index)
    else if (tabTemp.length == 0 || (tabTemp.length > 0 && tabTemp[i] === " _ ")) {
      // tabTemp.length sera =0 si c'est le premier essai
      li.innerText = " _ ";
    }
    else if (tabTemp.length > 0 && tabTemp[i] !== " _ ") {
      // ici tabTemp contient les lettres correctement placées
      // afin de les replacer à titre indicatif pour l'essai suivant
      li.innerText = tabTemp[i];
      li.style.background = "#177e89";

    }

  };
  // Réinitialisation
  console.log(`tabtemp avant reinitia : ${tabTemp}`);
  console.log(`mot avant reinitia : ${mot}`);
  tabTemp = [];
  mot = [];
  mot[0] = motATrouver[0];
  let i = 0;
  console.log(`tabtemp apres reinitia : ${tabTemp}`);
  console.log(`mot apres reinitia : ${mot}`);
  // récupération de ce que l'utilisateur rentre sur le clavier
  document.addEventListener("keydown", (event) => {
    // vérifier si la touche tapée est une lettre et si la limite du mot n'est pas atteinte
    if (/^[A-Za-z]$/i.test(event.key) && mot.length < motATrouver.length) {
      let lettreEntree = event.key.toUpperCase();
      console.log(lettreEntree);
      // les instructions suivantes permettent de garder la première lettre du mot à trouver
      // inchangée dans l'affichage et dans le tableau du mot entré par le joueur
      if (i == 0 && lettreEntree != motATrouver[0]) {
        ul.children[i].innerText = motATrouver[0]
        ul.children[i + 1].innerText = lettreEntree;
        ul.children[i + 1].style.backgroundColor = "#177e89";
        // ajouter la touche tapée à la fin du tableau contenant le mot entré par l'utilisateur
        mot.push(lettreEntree);
        i += 2;
        console.log(`tabtemp : ${tabTemp}`);
        console.log(`mot : ${mot}`);
      }
      else if (i == 0 && lettreEntree === motATrouver[0]) {
        ul.children[i].innerText = motATrouver[0];
        console.log(`tabtemp : ${tabTemp}`);
        console.log(`mot : ${mot}`);
      }
      else if (i != 0) {
        // remplacer " _ " par la touche tapée dans la liste
        ul.children[i].innerText = lettreEntree;
        ul.children[i].style.backgroundColor = "#177e89";
        // ajouter la touche tapée à la fin du tableau contenant le mot entré par l'utilisateur
        mot.push(lettreEntree);
        i++;
        console.log(`tabtemp : ${tabTemp}`);
        console.log(`mot : ${mot}`);
      }

    }
    // dans le cas où la touche tapée n'est pas une lettre, vérifier si c'est un Backspace
    else if (event.key === "Backspace" && mot.length > 1) {
      // pop supprime le dernier élément du tableau 
      mot.pop();
      i--;
      // remplacer la lettre par " _ " dans la liste
      ul.children[i].innerText = " _ ";
      ul.children[i].style.backgroundColor = "#084c61";
      console.log(`tabtemp bs : ${tabTemp}`);
      console.log(`mot bs : ${mot}`);
    }
    // vérifier si le mot entré par l'utilisateur correspond au mot à trouver
    // vérifier si la touche tapée est Enter et si le mot est complet
    else if (event.key === "Enter" && mot.length == motATrouver.length) {
      // parcourir les deux mots parallèlement
      for (let index = 0; index < motATrouver.length; index++) {
        // vérifier si la lettre à l'index est la même des les deux tableaux
        if (mot[index] === motATrouver[index]) {
          // colore le background des lettres correctement placées en rouge
          ul.children[index].style.backgroundColor = "red";
          tabTemp.push(mot[index]);
          console.log(`tabtemp si verif = meme lettre : ${tabTemp}`);
          console.log(`mot : ${mot}`);
        }
        // vérifier si la lettre entrée existe dans le mot mais est mal placée
        // slice(1) permet de ne pas vérifier la première case car elle n'est pas à placer
        else if (mot[index] != motATrouver[index] && motATrouver.slice(1).indexOf(mot[index]) !== -1) {
          ul.children[index].style.backgroundColor = "#f7b735";
          tabTemp.push(" _ ");
          console.log(`tabtemp si verif = lettre mal placée : ${tabTemp}`);
          console.log(`mot : ${mot}`);
        }
        else {
          tabTemp.push(" _ ");
          console.log(`tabtemp si verif = pas lettre : ${tabTemp}`);
          console.log(`mot : ${mot}`);
        }
      }
      // pas de " _ " donc mot correct
      if (tabTemp.indexOf(" _ ") === -1) {
        resultat = tabTemp.join("");
        let displayResult = document.createElement("h2");
        displayResult.innerText = resultat;
        ul.append(display);
      }
      else if (tabTemp.indexOf(" _ ") != -1 && essai <= nombreEssais) {
        essai++;
        displayEssai.innerText = `Essai ${essai}/${nombreEssais}`;
        console.log(`tabtemp nouvel essai : ${tabTemp}`);
        console.log(`mot new essai : ${mot}`);
        Main(tabTemp);
      }
      else if (tabTemp.indexOf(" _ ") != -1 && essai > nombreEssais) {
        let displayResult = document.createElement("h2");
        displayResult.innerText = `Perdu ! Le mot était ${motATrouver.join()}`;
        ul.append(display);
      }
    }
  });

}
