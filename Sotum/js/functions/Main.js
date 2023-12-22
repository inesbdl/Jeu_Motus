import { replayButton } from "./replayButton.js";
import { compterOccurrencesLettres } from "./compterOccurrenceLettres.js";

let resultat;
let affichage = document.querySelector("#cadre");


export function Main(tabTemp, tabId, motATrouver, mot, essai, nombreEssais, displayEssai) {
    // Gestion affichage
    let ul = affichage.appendChild(document.createElement("ul"));
    let tabIdJoined = tabId.join("");
    ul.id = tabIdJoined;
    for (let i = 0; i < motATrouver.length; i++) {
        let li = ul.appendChild(document.createElement("li"));
        if (i == 0) {
            li.innerText = motATrouver[i];
            li.style.background = "#185256";
        } else {
            li.innerText = tabTemp[i];
            li.style.background = "#033437";
        }
    }

    mot = [];
    mot[0] = motATrouver[0];
    let i = 0;
    let tabOccurrences = compterOccurrencesLettres(motATrouver);

    document.addEventListener("keydown", CreateEventKeyDown);

    function CreateEventKeyDown(event) {
        // vérifier si la touche tapée est une lettre et si la limite du mot n'est pas atteinte
        if (/^[A-Za-z]$/i.test(event.key) && mot.length < motATrouver.length) {
            let lettreEntree = event.key.toUpperCase();
            // les instructions suivantes permettent de garder la première lettre du mot à trouver
            // inchangée dans l'affichage et dans le tableau du mot entré par le joueur
            if (i == 0 && lettreEntree != motATrouver[0]) {
                let derniereListe = document.querySelector("#" + tabIdJoined);
                // si la lettre entrée est différente de la première lettre, celle-ci est directement placée à la seconde place
                derniereListe.children[i].innerText = motATrouver[0];
                derniereListe.children[i + 1].innerText = lettreEntree;
                derniereListe.children[i + 1].style.backgroundColor = "#185256";
                mot.push(lettreEntree);
                i += 2;
            } else if (i == 0 && lettreEntree === motATrouver[0]) {
                let derniereListe = document.querySelector("#" + tabIdJoined);
                derniereListe.children[i].innerText = motATrouver[0];
            } else {
                let derniereListe = document.querySelector("#" + tabIdJoined);
                derniereListe.children[i].innerText = lettreEntree;
                derniereListe.children[i].style.backgroundColor = "#185256";
                mot.push(lettreEntree);
                i++;
            }
        }
        else if (event.key === "Backspace" && mot.length > 1) {
            let derniereListe = document.querySelector("#" + tabIdJoined);
            mot.pop();
            i--;
            derniereListe.children[i].innerText = `${tabTemp[i]}`;
            derniereListe.children[i].style.backgroundColor = "#033437";
        }
        else if (event.key === "Enter" && mot.length == motATrouver.length) {
            // seulement vérifier les lettres correctement placées
            for (let index = 0; index < motATrouver.length; index++) {
                let motIndex = mot[index];
                if (motIndex === motATrouver[index]) {
                    let derniereListe = document.querySelector("#" + tabIdJoined);
                    derniereListe.children[index].style.backgroundColor = "green";
                    tabTemp.splice(index, 1, motIndex);
                    tabOccurrences[motIndex.toLowerCase()] -= 1;
                }
            }
            for (let index = 0; index < motATrouver.length; index++) {
                let motIndex = mot[index];
                // slice(1) permet de ne pas vérifier la première case car elle n'est pas à placer
                // si !meme lettre ET lettre présente dans le mot sauf premiere place ET nombre d'occurrences de la lettre !dépassé
                if (mot[index] != motATrouver[index] && motATrouver.slice(1).indexOf(mot[index]) != -1 && tabOccurrences[motIndex.toLowerCase()] > 0) {
                    let derniereListe = document.querySelector("#" + tabIdJoined);
                    derniereListe.children[index].style.backgroundColor = "#f7b735";
                    tabOccurrences[motIndex.toLowerCase()] -= 1;
                }
                else if (motATrouver.indexOf(mot[index]) === -1) {
                }
            }
            // pas de " . " donc mot correct
            if (tabTemp.indexOf(" . ") === -1) {
                resultat = tabTemp.join("");
                let displayResult = document.createElement("h2");
                displayResult.innerText = resultat;
                affichage.append(displayResult);
                document.removeEventListener("keydown", CreateEventKeyDown);
                replayButton();
            }
            // mot incomplet
            else if (tabTemp.indexOf(" . ") !== -1 && essai < nombreEssais) {
                tabId.push("a");
                essai++;
                displayEssai.innerText = `Essai ${essai}/${nombreEssais}`;
                document.removeEventListener("keydown", CreateEventKeyDown);
                Main(tabTemp, tabId, motATrouver, mot, essai, nombreEssais, displayEssai);
            }
            // plus d'essais restants
            else {
                let displayResult = document.createElement("h2");
                displayResult.innerText = `Perdu ! Le mot était ${motATrouver.join("")}`;
                affichage.append(displayResult);
                replayButton();
                document.removeEventListener("keydown", CreateEventKeyDown);
            }
        }
    }
}