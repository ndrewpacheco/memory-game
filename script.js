const gameContainer = document.getElementById("game");
const startGame = document.createElement("button");
startGame.innerText = "Start new game?";
gameContainer.append(startGame);

// Matches declarations
let matchedColors;
let matchesMade = 0;
const WINNING_NUMBER_OF_MATCHES = 1; // The app can only have a maximum of 5 winning matches with this current version
let matchesText = `Matches made: ${matchesMade}. You need ${WINNING_NUMBER_OF_MATCHES} to win`;
const displayMatchResults = document.createElement("h2");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates
// if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div

    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let firstGuess;
let secondGuess;

const nullifyGuesses = () => {
  firstGuess = null;
  secondGuess = null;
};

const clearBackgroundColors = () => {
  firstGuess.style.backgroundColor = "";
  secondGuess.style.backgroundColor = "";
};

const createMatch = () => {
  matchedColors.push(firstGuess.className);
  matchesMade = matchedColors.length;
  displayMatchResults.innerText = matchesText;
};

const determineWinner = () => {
  if (matchesMade === WINNING_NUMBER_OF_MATCHES) {
    displayMatchResults.innerText = "YOU WON! ";
    displayMatchResults.append(startGame);

    for (let child of gameContainer.children) {
      child.removeEventListener("click", handleCardClick);
    }
  }
};

function handleCardClick(event) {
  // Guard clauses
  if (firstGuess && secondGuess) return;
  if (matchedColors.includes(event.target.className)) {
    gameContainer.alert("Card has already been matched!");
    return;
  }

  if (firstGuess) {
    secondGuess = event.target;
    secondGuess.style.backgroundColor = secondGuess.className;

    if (firstGuess === secondGuess) {
      alert("Guesses cannot be the same card!");
      clearBackgroundColors();
      nullifyGuesses();
    } else if (firstGuess.className === secondGuess.className) {
      createMatch();

      determineWinner();
      nullifyGuesses();
    } else {
      setTimeout(() => {
        clearBackgroundColors();
        nullifyGuesses();
      }, 1000);
    }
  } else {
    firstGuess = event.target;
    firstGuess.style.backgroundColor = firstGuess.className;
  }
}

const resetGame = () => {
  gameContainer.innerHTML = "";
  matchesMade = 0;
  matchedColors = [];
  displayMatchResults.innerText = matchesText;
};

const game = () => {
  startGame.addEventListener("click", () => {
    resetGame();
    gameContainer.append(displayMatchResults);
    let shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);
    startGame.remove();
  });
};

game();
