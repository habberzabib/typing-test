// TYPING TEST START

// use array in quotes.js
let quotes = getQuotes();

// DOM Elements
let quoteDisplay = document.getElementById("quote");
let userInput = document.getElementById("input");
let startButton = document.getElementById("startBtn");
let resultDisplay = document.getElementById("result");

// Variables to track state
let startTime;
let currentQuote = "";

// Picks a random quote from the array and displays it
function setNewQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  currentQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = currentQuote;
  userInput.value = ""; // clear previous input
  resultDisplay.innerHTML = ""; // clear previous results
}

// Start button listener
startButton.addEventListener("click", function () {
  startTest();
});

// End test on Enter key
userInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    endTest();
  }
});

// Starts the typing test
function startTest() {
  setNewQuote();
  startTime = new Date().getTime(); //captures current time in ms
  startButton.disabled = true; //prevents user from restarting the test while it's already running
}

// Calculating typing accuracy
// typed = user input; target = quote
function calculateAccuracy(typed, target) {
  let typedWords = typed.trim().split(/\s+/); //cleans up user input by removing spaces at the beginning and end; then splits the input into words based on spaces
  let targetWords = target.trim().split(/\s+/); //same as above but for the quote
  let correctWords = 0;
  let len = Math.min(typedWords.length, targetWords.length); //compares only the number of words that exist in both arrays as to not go out of bounds

  for (let i = 0; i < len; i++) {
    if (typedWords[i] === targetWords[i]) {
      correctWords++;
    }
  }

  if (typedWords.length === 0) {
    return 0; //if the user leaves the input empty an accuracy of 0% is returned right away as to avoid dividing by 0 later on
  }

  let accuracy = (correctWords / typedWords.length) * 100;
  return accuracy;
}

// Ends the test and calculates results
function endTest() {
  let endTime = new Date().getTime();
  let timeInSeconds = (endTime - startTime) / 1000;
  let typedText = userInput.value;

  //trims spaces in input, splits into words using spaces, and filters out empty entries
  let typedWords = typedText
    .trim()
    .split(/\s+/)
    .filter(function (word) {
      return word.length > 0;
    });

  let wordCount = typedWords.length;

  let wpm = Math.round((wordCount / timeInSeconds) * 60);
  let accuracy = calculateAccuracy(typedText, currentQuote);

  resultDisplay.innerHTML =
    "Accuracy: " +
    accuracy.toFixed(2) +
    "%<br>" +
    "Words Per Minute (WPM): " +
    wpm;

  userInput.disabled = true; //cannot write anything after a test is over
  startButton.disabled = false; //can redo the test with another quote
}
