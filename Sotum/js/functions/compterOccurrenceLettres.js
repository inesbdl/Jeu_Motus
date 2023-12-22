
export function compterOccurrencesLettres(mot) {
    let tabOccurrences = {};

    // créer une variable pour chaque lettre
    for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i);
        tabOccurrences[letter] = 0;
    }

    // compter les occurrences de chaque lettre 
    for (let i = 0; i < mot.length; i++) {
        const lettre = mot[i].toLowerCase();
        if (tabOccurrences.hasOwnProperty(lettre)) {
            tabOccurrences[lettre] += 1;
        } else {
            console.log("Lettre non reconnue :", lettre);
        }
    }

    return tabOccurrences;
}
