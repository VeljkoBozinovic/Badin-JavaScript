const elementOptions = document.querySelector("select");
const elementOptionRGB = document.querySelector("option[value=RGB]");
const elementOptionHEXA = document.querySelector("option[value=HEXA]");
const elementsColors = document.querySelectorAll(".container-item");
const elementCodeDisplay = document.querySelector(".header-code-paragraph");
const elementsTableCells = document.querySelectorAll("td");
const elementPlayerName = document.querySelector(".playerName");
let playerName;
let playerScore;
let player = {};
let players = [];
let randomCodePicked;

elementOptions.addEventListener("change", getColors);

function getColors() {
  let randomCodesHEX = [];
  let randomCodePickedHEX;

  elementsColors.forEach((element) => {
    element.style.visibility = "visible";
    element.style.pointerEvents = "auto";
  });
  elementOptions.style.pointerEvents = "none";
  randomCodePicked = 0;
  playerScore = 1;

  if (elementOptions.value === "HEXA") {
    for (let i = 0; i < elementsColors.length; i++) {
      let x = Math.round(0xffffff * Math.random()).toString(16);
      let y = 6 - x.length;
      let z = "000000";
      let z1 = z.substring(0, y);
      randomCodesHEX[i] = "#" + z1 + x;

      elementsColors[i].style.backgroundColor = randomCodesHEX[i];
      elementOptions.value = "NewColor";
    }

    randomCodePickedHEX = Math.floor(Math.random() * 6);
    randomCodePicked = randomCodePickedHEX;
    elementCodeDisplay.innerHTML = randomCodesHEX[randomCodePickedHEX];
  } else if (elementOptions.value === "RGB") {
    let randomCodesRGB = [];
    let randomCodePickedRGB = Math.floor(Math.random() * 6);

    for (let i = 0; i < elementsColors.length; i++) {
      randomCodesRGB[i] =
        "rgb(" +
        randomValuesRBG() +
        ", " +
        randomValuesRBG() +
        ", " +
        randomValuesRBG() +
        ")";

      elementsColors[i].style.backgroundColor = randomCodesRGB[i];
      randomCodePicked = randomCodePickedRGB;
      elementCodeDisplay.innerHTML = randomCodesRGB[randomCodePickedRGB];
    }

    elementOptions.value = "NewColor";
  }
}

function randomValuesRBG() {
  return Math.floor(Math.random() * 256);
}

for (let i = 0; i < elementsColors.length; i++) {
  elementsColors[i].addEventListener("click", () => {
    if (i === randomCodePicked) {
      console.log("TO JE TA");
      disableClicks();
      playerName =
        elementPlayerName.value !== ""
          ? elementPlayerName.value
          : elementPlayerName.placeholder;
      player = {
        pName: playerName,
        pScore: playerScore,
      };
      players.unshift(player);
      fillTable();
      elementOptions.style.pointerEvents = "auto";
    } else {
      elementsColors[i].style.visibility = "hidden";
      playerScore++;
    }
  });
}

function disableClicks() {
  for (let i = 0; i < elementsColors.length; i++) {
    elementsColors[i].style.pointerEvents = "none";
  }
}

function fillTable() {
  for (var i = 0; i < 10; i++) {
    if (players[i] !== undefined) {
      elementsTableCells[i].innerHTML = players[i].pName;
      elementsTableCells[i + 10].innerHTML = players[i].pScore;
    }
  }
}
