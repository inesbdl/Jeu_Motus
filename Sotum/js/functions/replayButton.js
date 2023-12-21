function replayButton() {
    const reloadButton = document.createElement('button');
    reloadButton.textContent = 'REJOUER';
    reloadButton.id = 'reloadButton';
    reloadButton.addEventListener('click', function () {
        location.reload();
    });
    affichage.append(reloadButton);
}