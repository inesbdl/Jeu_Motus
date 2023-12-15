let mot = [];
let tabTemp = [];
let motATrouver = [];
let resultat;
let verif = false;

fetch("https://trouve-mot.fr/api/random")
  .then((response) => response.json())
  .then((words) => {
    setTimeout(() => {
      words.forEach(word => {
        motATrouver = word.name.split('');
        // console.log(motATrouver);
      })
      Main(tabTemp);
    }, 2000)
  });

function Main(tabTemp) {
  console.log(motATrouver);

  let i = 0;
  let indexTabTemp = 0;

  let affichage = document.querySelector('#cadre');
  let ul = affichage.appendChild(document.createElement("ul"));

  //____________________________ D2CLARATION VARIABLES _________________________________________


  motATrouver.forEach(_ => {
    let li = ul.appendChild(document.createElement("li"));
    if (tabTemp.length == 0) {
      li.innerText = " _ ";
    }
    else {
      li.innerText = tabTemp[indexTabTemp];
      indexTabTemp++;
    }

  });

  document.addEventListener("keydown", (event) => {
    if (/^[A-Za-z]$/i.test(event.key) && mot.length < motATrouver.length) {

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


      mot.forEach(lettre => {

        if (ul.children[mot.indexOf(lettre)].style.backgroundColor === "red") {
          tabTemp.push(lettre);
        }
        else {
          tabTemp.push(" _ ");
        }
        tabTemp.forEach(lettre => {
          if (lettre === " _ ") {
            Main(tabTemp);
          }
          else {
            resultat = tabTemp.join("");
            verif = true
          }
        });

      });
      // console.log(tabTemp);
      if (verif) {
        // console.log("sofuosougbsbs");
        let display = document.createElement("h2");
        display.innerText = resultat;
        ul.append(display);
      }
    }

  });

}




// let verif = false;
