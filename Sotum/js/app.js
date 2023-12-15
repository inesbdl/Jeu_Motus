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
let verif = true;
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
      mot[0] = motATrouver[0];
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
  let i = 0;
  let indexTabTemp = 0;

  // récupération de la div où sera affiché le jeu
  let affichage = document.querySelector('#cadre');
  // création d'une liste dans cette div
  let ul = affichage.appendChild(document.createElement("ul"));

  // ajout de li dans la liste précédement créée
  // il y en a autant que d'éléments dans le tableau contenant le mot à deviner
  for (let i = 0; i < motATrouver.length; i++) {
    let li = ul.appendChild(document.createElement("li"));
    if (tabTemp.length == 0 && i == 0) {
      // ajouter la première lettre du mot
      li.innerText = motATrouver[0];
    }
    else if (tabTemp.length == 0) {
      // tabTemp.length sera =0 si c'est le premier essai
      li.innerText = " _ ";
    }
    else {
      // ici tabTemp contient les lettres correctement placées
      // afin de les replacer pour l'essai suivant
      console.log("_______ INDEX TEMP _________");
      li.innerText = tabTemp[indexTabTemp];
      console.log(li);
      indexTabTemp++;
    }

  };

  // récupération de ce que l'utilisateur rentre sur le clavier
  document.addEventListener("keydown", (event) => {
    // vérifier si la touche tapée est une lettre et si la limite du mot n'est pas atteinte
    if (/^[A-Za-z]$/i.test(event.key) && mot.length < motATrouver.length) {
      let lettreEntree = event.key.toUpperCase();
      // les instructions suivantes permettent de garder la première lettre du mot à trouver
      // inchangée dans l'affichage et dans le tableau du mot entré par le joueur
      if (i == 0 && lettreEntree != motATrouver[0]) {
        ul.children[i].innerText = motATrouver[0]
        ul.children[i + 1].innerText = lettreEntree;
        // ajouter la touche tapée à la fin du tableau contenant le mot entré par l'utilisateur
        mot.push(lettreEntree);
        i += 2;
      }
      else if (i == 0 && lettreEntree === motATrouver[0]) {
        ul.children[i].innerText = motATrouver[0];
      }
      else {
        // remplacer " _ " par la touche tapée dans la liste
        ul.children[i].innerText = lettreEntree;
        // ajouter la touche tapée à la fin du tableau contenant le mot entré par l'utilisateur
        mot.push(lettreEntree);
        i++;
      }

    }
    // dans le cas où la touche tapée n'est pas une lettre, vérifier si c'est un Backspace
    else if (event.key === "Backspace" && mot.length > 0) {

      if (mot.length > 1) {
        i--;
        // pop supprime le dernier élément du tableau 
        mot.pop();
        // remplacer la lettre par " _ " dans la liste
        ul.children[i].innerText = " _ ";
      }

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
        }
      }
      // stocker les lettres correctement placées dans un tableau en vue de les
      // réinjecter lors de l'appel de la fonction pour le prochain essai
      mot.forEach(lettre => {
        // vérifier si le background est rouge (= lettre au bon endroit)
        if (ul.children[mot.indexOf(lettre)].style.backgroundColor === "red") {
          // si oui écrire la lettre dans le tableau tabTemp
          tabTemp.push(lettre);
        }
        else {
          // sinon écrire " _ "
          tabTemp.push(" _ ");
        }
        // vérifier si le mot a été trouvé
        // parcourir le tableau tabTemp
        tabTemp.forEach(lettre => {
          // si un " _ " est trouvé, verif passe à false sinon verif=true
          if (lettre === " _ ") {
            // ça appelait en boucle
            // Main(tabTemp);
            verif = false;
          }
          else {
            resultat = tabTemp.join("");
          }
        });

      });

      if (verif) {
        // afficher la chaine dans un titre
        let display = document.createElement("h2");
        display.innerText = resultat;
        ul.append(display);
      }
      else if (essai <= nombreEssais) {
        // rappeler la fonction pour un autre essai
        essai++;
        displayEssai.innerText = `Essai ${essai}/${nombreEssais}`;
        Main(tabTemp);
      }
      else if (essai == nombreEssais) {
        // afficher le mot à trouver si le joueur a utilisé tous les essais
        let display = document.createElement("h2");
        display.innerText = `Perdu ! Le mot était ${motATrouver.join()}`;
        ul.append(display);
      }
    }
  });

}

// /!\ si pls fois la meme lettre dans le mot à trouver :
// si placee pls fois bien placee une fois l'affiche sur toutes les positions : pas ok
// si placée une seule fois à la bonne position : c'est ok
// on ne peut pas écrire dans les essais suivants : pas ok