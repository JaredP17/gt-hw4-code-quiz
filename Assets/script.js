// VARIABLES
var timer = document.querySelector("#timer");
var start = document.querySelector("#start");
var startBtn = document.querySelector("#start-btn");
var questions = document.querySelector("#questions");
var question = document.querySelector("#question");
var choices = document.getElementById("answer-choices");
var done = document.querySelector("#done");
var timerInterval;
var timeRemaining = 75; // Also sets the score
var qIndex = 0;

// FUNCTION DEFINITIONS

// Countdown timer
function setTimer() {
  timerInterval = setInterval(function () {
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      alert("Out of time!");
    } else {
      timeRemaining--;
      timer.textContent = timeRemaining;
      // console.log(timeRemaining);
    }
  }, 1000);
}

// Displays if answer was correct/wrong for a short period
function choiceResult(correctOrWrong) {
  var result = document.querySelector("#choice-result");
  result.classList.remove("d-none");
  // Display message
  document.getElementById("correctness").textContent = correctOrWrong;

  var time = 2;
  var correctnessInterval = setInterval(function () {
    if (time > 0) {
      time--;
    } else {
      clearInterval(correctnessInterval);
      result.classList.add("d-none");
    }
  }, 500);
}

// Render all question of the current question index in questions.js
function renderQuestions() {
  questions.classList.remove("d-none");
  question.textContent = questionsList[qIndex].question;
  choices.innerHTML = "";

  // Render answer buttons
  for (var i = 0; i < questionsList[qIndex].choices.length; i++) {
    var answerBtn = choices.appendChild(document.createElement("button"));
    answerBtn.classList.add("btn", "btn-primary", "btn-sm", "btn-block");
    answerBtn.textContent = questionsList[qIndex].choices[i];
  }
}

// When the quiz is over
function showScore() {
  clearInterval(timerInterval);
  questions.classList.add("d-none");
  done.classList.remove("d-none");
  document.getElementById("score").textContent = timeRemaining;
}

// FUNCTION CALLS

// EVENT LISTENERS

// Start Quiz
startBtn.addEventListener("click", function () {
  start.classList.add("d-none");
  renderQuestions();
  setTimer();
});

// Choose Answers
choices.addEventListener("click", function (event) {
  event.preventDefault();

  if (event.target.matches("button")) {
    console.log("clicking " + event.target.textContent);
    var choice = event.target.textContent;
    qIndex++;
    choiceResult("Correct!");
    if (qIndex < questionsList.length && timeRemaining > 0) {
      renderQuestions();
    } else { // No more quiz questions
      console.log("Out of questions!");
      showScore();
    }
  }
});
