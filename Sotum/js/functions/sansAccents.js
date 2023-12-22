// enlever l'accent d'une lettre
export function sansAccents(lettre) {
    return lettre.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}