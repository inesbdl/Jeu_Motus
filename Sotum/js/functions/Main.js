function Main(tabTemp) {
    console.log(`tabtemp: ${tabTemp}`);
    // Gestion affichage
    let affichage = document.querySelector("#cadre");
    let ul = affichage.appendChild(document.createElement("ul"));
    let tabIdJoined = tabId.join("");
    ul.id = tabIdJoined;
    console.log(`id ul: ${ul.id}`);
    for (let i = 0; i < motATrouver.length; i++) {
        let li = ul.appendChild(document.createElement("li"));
        //tabTemp contient les lettres correctement placées
        // afin de les replacer à titre indicatif pour l'essai suivant
        if (i == 0) {
            li.innerText = motATrouver[i];
            li.style.background = "#177e89";
        } else {
            li.innerText = tabTemp[i];
            li.style.background = "#084c61";
        }
    }

    mot = [];
    mot[0] = motATrouver[0];
    let i = 0;

    document.addEventListener("keydown", CreateEventKeyDown);

    function CreateEventKeyDown(event) {
        // vérifier si la touche tapée est une lettre et si la limite du mot n'est pas atteinte
        if (/^[A-Za-z]$/i.test(event.key) && mot.length < motATrouver.length) {
            let lettreEntree = event.key.toUpperCase();
            // les instructions suivantes permettent de garder la première lettre du mot à trouver
            // inchangée dans l'affichage et dans le tableau du mot entré par le joueur
            if (i == 0 && lettreEntree != motATrouver[0]) {
                let derniereListe = document.querySelector("#" + tabIdJoined);
                // si la lettre entrée est différente de la première lettre,
                // celle-ci est directement placée à la seconde place
                derniereListe.children[i].innerText = motATrouver[0];
                derniereListe.children[i + 1].innerText = lettreEntree;
                derniereListe.children[i + 1].style.backgroundColor = "#177e89";
                mot.push(lettreEntree);
                i += 2;
            } else if (i == 0 && lettreEntree === motATrouver[0]) {
                let derniereListe = document.querySelector("#" + tabIdJoined);
                derniereListe.children[i].innerText = motATrouver[0];
                console.log("Element ul.children[i] :", ul.children[i]);
            } else {
                let derniereListe = document.querySelector("#" + tabIdJoined);
                derniereListe.children[i].innerText = lettreEntree;
                derniereListe.children[i].style.backgroundColor = "#177e89";
                mot.push(lettreEntree);
                i++;
            }
        }
        else if (event.key === "Backspace" && mot.length > 1) {
            let derniereListe = document.querySelector("#" + tabIdJoined);
            mot.pop();
            i--;
            derniereListe.children[i].innerText = " _ ";
            derniereListe.children[i].style.backgroundColor = "#084c61";
        }
        else if (event.key === "Enter" && mot.length == motATrouver.length) {
            let nbOccurence = 0;
            for (let index = 0; index < motATrouver.length; index++) {
                if (mot[index] === motATrouver[index]) {
                    let derniereListe = document.querySelector("#" + tabIdJoined);
                    derniereListe.children[index].style.backgroundColor = "green";
                    tabTemp.splice(index, 1, mot[index]);
                    console.log(`tatebmp apres splice : ${tabTemp}`);
                }
                // slice(1) permet de ne pas vérifier la première case car elle n'est pas à placer
                else if (mot[index] != motATrouver[index] && (motATrouver.slice(1).indexOf(mot[index]) != -1 && tabTemp[index] === " _ ")) {
                    // while (nbOccurence > 0) {
                    // récupérer la bonne liste
                    let derniereListe = document.querySelector("#" + tabIdJoined);
                    // background en jaune
                    derniereListe.children[index].style.backgroundColor = "#f7b735";
                    // remplacer
                    tabTemp.splice(index, 1, " _ ");
                    nbOccurence--;
                    // }
                }
                else if (motATrouver.indexOf(mot[index]) === -1) {
                    tabTemp.splice(index, 1, " _ ");
                }
            }
            // pas de " _ " donc mot correct
            if (tabTemp.indexOf(" _ ") === -1) {
                resultat = tabTemp.join("");
                let displayResult = document.createElement("h2");
                displayResult.innerText = resultat;
                affichage.append(displayResult);
                document.removeEventListener("keydown", CreateEventKeyDown);
                replayButton();
            }
            // mot incomplet
            else if (tabTemp.indexOf(" _ ") !== -1 && essai < nombreEssais) {
                tabId.push("a");
                essai++;
                displayEssai.innerText = `Essai ${essai}/${nombreEssais}`;
                document.removeEventListener("keydown", CreateEventKeyDown);
                console.log(`tabtemp avant rappel ${tabTemp}`);
                Main(tabTemp);
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