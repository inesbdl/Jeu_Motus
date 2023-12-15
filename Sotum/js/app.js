let mot = [];
let tab_verif_temp = [];
let motATrouver = ["c", "o", "u", "c", "o", "u"];

let i = 0;

let affichage = document.querySelector('#cadre');
let ul = affichage.appendChild(document.createElement("ul"));

//____________________________ D2CLARATION VARIABLES _________________________________________

motATrouver.forEach(_ => {
  let li = ul.appendChild(document.createElement("li"));
  li.innerText = " _ ";
});

document.addEventListener("keydown", (event) => {
  if (/^[A-Za-z]$/i.test(event.key) && mot.length < motATrouver.length) {
    // if (){
    //   return;
    // }
    mot.push(event.key)
    ul.children[i].innerText = event.key;
    i++;
  }
  else if (event.key === "Backspace" && mot.length > 0) {
    i--;
    mot.pop();
    ul.children[i].innerText = " _ ";
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    for (let index = 0; index < motATrouver.length; index++) {
      if (mot[index] === motATrouver[index]) {
        ul.children[index].style.backgroundColor = "red";
      }
    }
  }
});


// let verif = false;
