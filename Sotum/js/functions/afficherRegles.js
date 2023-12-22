const boutonRegles = document.querySelector("#boutonRegles");
const regles = document.querySelector("#regles");

boutonRegles.addEventListener('click', function () {
    if (regles.style.display === 'none') {
        regles.style.display = 'block';
        overlay.style.display = 'block';
        boutonRegles.textContent = 'Masquer les règles';
        regles.style.opacity = '1';
        regles.style.visibility = 'visible';
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';

    } else {
        regles.style.opacity = '0';
        overlay.style.opacity = '0';
        regles.style.visibility = 'hidden';
        setTimeout(() => {
            regles.style.display = 'none';
            overlay.style.display = 'none';
        }, 300);
        boutonRegles.textContent = 'Afficher les règles ';
    }
});

