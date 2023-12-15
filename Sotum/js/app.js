// déclaration des variabless générales

let mot = [];
let tabTemp = [];
let motATrouver = [];
let resultat;
let verif = true;

// récupération du mot à deviner via une API

fetch("https://trouve-mot.fr/api/random")
  .then((response) => response.json())
  .then((words) => {
    setTimeout(() => {
      words.forEach(word => {
        // split permet de découper une chaine de caractères dans un tableau
        motATrouver = word.name.split('');
        // console.log(motATrouver);
      })
      Main(tabTemp);
    }, 2000)
  });


// définition de la fonction principale

function Main(tabTemp) {
  console.log(motATrouver);

  let i = 0;
  let indexTabTemp = 0;

  // récupération de la div où sera affiché le jeu
  let affichage = document.querySelector('#cadre');
  // création d'une liste dans cette div
  let ul = affichage.appendChild(document.createElement("ul"));

  // ajout de li dans la liste précédement créée
  // il y en a autant que d'éléments dans le tableau contenant le mot à deviner
  motATrouver.forEach(_ => {
    let li = ul.appendChild(document.createElement("li"));
    if (tabTemp.length == 0) {
      // tabTemp.length sera =0 si c'est le premier essai
      li.innerText = " _ ";
    }
    else {
      // ici tabTemp contient les lettres correctement placées
      // afin de les replacer pour l'essai suivant
      li.innerText = tabTemp[indexTabTemp];
      indexTabTemp++;
    }

  });

  // récupération de ce que l'utilisateur rentre sur le clavier
  document.addEventListener("keydown", (event) => {
    // vérifier si la touche tapée est une lettre et si la limite du mot n'est pas atteinte
    if (/^[A-Za-z]$/i.test(event.key) && mot.length < motATrouver.length) {
      // ajouter la touche tapée à la fin du tableau contenant le mot entré par l'utilisateur
      mot.push(event.key)
      // remplacer " _ " par la touche tapée dans la liste
      ul.children[i].innerText = event.key;
      i++;
    }
    // dans le cas où la touche tapée n'est pas une lettre, vérifier si c'est un Backspace
    else if (event.key === "Backspace" && mot.length > 0) {
      i--;
      // pop supprime le dernier élément du tableau 
      mot.pop();
      // remplacer la lettre par " _ " dans la liste
      ul.children[i].innerText = " _ ";
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
            // Main(tabTemp);
            verif = false;
          }
          // else {
          //   resultat = tabTemp.join("");
          //   verif = true
          // }
        });

      });

      if (verif) {
        // si verif=true, transformer le contenu de tabTemp en chaine 
        resultat = tabTemp.join("");
        // afficher la chaine dans un titre
        let display = document.createElement("h2");
        display.innerText = resultat;
        ul.append(display);
      }
      else {
        // rappeler la fonction pour un autre essai
        Main(tabTemp);
      }
    }
  });

}
