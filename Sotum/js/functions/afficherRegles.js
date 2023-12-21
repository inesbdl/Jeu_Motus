const boutonRegles = document.querySelector("#boutonRegles");
const regles = document.querySelector("#regles");

boutonRegles.addEventListener('click', function () {
    if (regles.style.display === 'none') {

        regles.style.display = 'block';
        boutonRegles.textContent = 'Masquer les règles';
        setTimeout(() => {
            regles.style.opacity = '1';
            regles.style.visibility = 'visible';
        }, 10);
    } else {
        regles.style.opacity = '0';
        regles.style.visibility = 'hidden';
        setTimeout(() => {
            regles.style.display = 'none';
        }, 300);
        boutonRegles.textContent = 'Afficher les règles ';
    }
});

