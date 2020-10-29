/**
 * Mastermind
 * @author Matteo Fattorini
 * coded on 28/10/2020
 *
 */

/**
 * questa funzione serve a generare un numero random compreso fra due valori
 * @param {number} min è il valore minimo, compreso
 * @param {number} max è il valore massimo, compreso
 */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Funzione che crea un array di x numeri random unici
 * @param {number} rangeMin minimo numero compreso
 * @param {number} rangeMax ultimo numero compreso
 * @param {number} elements numero di elementi
 */

function randomNumList(rangeMin, rangeMax, elements) {
  var arr = [];
  while (arr.length < elements) {
    var r = getRandomInt(rangeMin, rangeMax);
    if (arr.indexOf(r) === -1) {
      arr.push(r);
    }
  }
  return arr.join("");
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/**
 * funzione che controlla i valori e restituisce X e O casuali
 * @param {arrayUtente} array
 * @param {arrayPc} pcarray
 */
function checkResult(array, pcarray) {
  simbols = [];

  for (var i = 0; i < array.length; i++) {
    if (array[i] == pcarray[i]) {
      simbols.push("O");
    } else if (pcarray.includes(array[i])) {
      simbols.push("X");
    }
  }
  return shuffle(simbols).join("");
}

function hasDuplicates(array) {
  return new Set(array).size !== array.length;
}

//!elementi

var startEl = document.getElementById("startGame");
var scoreNumbersEl = document.getElementById("scoreNumbers");
var scoreSimbolsEl = document.getElementById("scoreSimbols");
var titleEl = document.getElementById("title");
var numberInput = document.getElementById("numberInput");
var pushNumEl = document.getElementById("pushNum");
var instrucionsEl = document.getElementById("instructions");
var scoreboxEl = document.getElementById("scorebox");
var scoreResultEl = document.getElementById("scoreResult");
var triesEL = document.getElementById("tries");
//!variabili

var NUMLENGHT = 5;
var TRIES = 10;
var LOST = false;
var WINCONDITION = "OOOOO";
var WINNER = false;

startEl.addEventListener("click", function () {
  instrucionsEl.style.display = "none";
  scoreboxEl.style.display = "block";
  scoreResultEl.style.display = "block";
  pcPicks = randomNumList(0, 10, 5);
});

pushNumEl.addEventListener("click", function () {
  //?validation

  if (WINNER) {
    alert("Hai vinto, refresha per rigiocare");
  } else if (hasDuplicates(numberInput.value)) {
    alert("hai messo un doppione! Non fare il furbo...");
  } else if (
    isNaN(numberInput.value) ||
    numberInput.value.length > 5 ||
    numberInput.value.length < 5
  ) {
    alert("Hai inserito un numero di 5 cifre?");
    //? ha vinto?
  } else if (checkResult(numberInput.value, pcPicks) == WINCONDITION) {
    WINNER = true;
    alert("HAI VINTO!! Ci hai messo " + (10 - TRIES) + " tentativi!");
  } else if (TRIES == 1) {
    alert("HAI PERSO :(");
  } else {
    scoreNumbersEl.innerHTML += numberInput.value + "<br>";
    scoreSimbolsEl.innerHTML +=
      checkResult(numberInput.value, pcPicks) + "<br>";
    TRIES -= 1;
    triesEL.innerHTML = TRIES;
  }
});
