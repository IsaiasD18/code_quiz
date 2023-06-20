//create a variable that represents the current question that the user is on
var currentQuestionIndex = 0;
//Create a variable for the time depending on the questions length
var time = questionsData.length * 15;
var timer;

// variables to reference DOM elements
var question = document.querySelector("#questions");
//Create a variable containig the element that will have the timer
var timerEl = document.querySelector("#time");
//Create a variable containig the element that will have the choises
var choises = document.querySelector("#choices");
//Create a variable containig the element that will have the submit button
var submitBtn = document.querySelector("#submit");
//Create a variable containig the element that will have the start button
var startBtn = document.querySelector("#start");
//Create a variable containig the element that will have the user's initals
var initialsEl = document.querySelector("#initials");
//Create a variable containig the element that will have the incorrect/correct message
var feedbackEl = document.querySelector("#feedback");


function startQ() {
  // hide start screen
  var startScreen = document.querySelector("#start-screen");
  startScreen.setAttribute("class", "start hide");

  // un-hide questions section
  question.setAttribute("class", " ");
  // start timer
  timer = setInterval(function(){
    clockUpdate();
  }, 1000);
  // show starting time
  timerEl.textContent = time;

  getQuestion();
}

//function shows the current question
function getQuestion() {
  // store the question object to a variable
  var currentQuestion = questionsData[currentQuestionIndex];
  // update title with current question
  question.children[0].textContent = currentQuestion.question;
  // clear out any old question choices
  while (choises.hasChildNodes()) {
    choises.removeChild(choises.lastChild);
  }
  // cretate a for loop for the choices
  for(var i = 0; i < currentQuestion.choices.length; i++){

    // create new button for each choice
    var choiceButton = document.createElement("button");
    choiceButton.textContent = currentQuestion.choices[i];
    
    // display on the page
    choises.appendChild(choiceButton);
  }
  // attach click event listener to each choice
  choises.children[0].addEventListener("click", function(e){
    questionClick(choises.children[0]);
  });
  choises.children[1].addEventListener("click", function(e){
    questionClick(choises.children[1]);
  });
  choises.children[2].addEventListener("click", function(e){
    questionClick(choises.children[2]);
  });
  choises.children[3].addEventListener("click", function(e){
    questionClick(choises.children[3]);
  });
}

//create a function to track if the user guessed correctly
function questionClick(answerChoice) {
  // guessed wrong
  if(answerChoice.textContent != questionsData[currentQuestionIndex].answer){
    // take time off
    time -= 10;
    // display a message
    feedbackEl.textContent = "Incorrect";
  }
  else {
    feedbackEl.textContent = "Correct";
  }

  // show right/wrong message on page 
  feedbackEl.setAttribute("class", "feedback");
  setInterval(function(){
    feedbackEl.setAttribute("class", "feedback hide");
  }, 500);

  // move to next question
  currentQuestionIndex++;

  // create an if stament to check if there are still more questions
  if(currentQuestionIndex === questionsData.length)

    endQ();
  else
    getQuestion();
}

//Create a function that will end the quiz
function endQ() {
  // clear the timer 
  clearInterval(timer);
  timerEl.textContent = time;

  // display the end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.setAttribute("class", " ");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  question.setAttribute("class", "hide");
}

function clockUpdate() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if(time === 0)
    endQ();
  
}

//cretate a function that will save the user score to local storage
function saveScore() {
  // create a variable that will have the initials value
  var initials = initialsEl.value;
  
  // get saved scores from localstorage
    var highscores;
     if(JSON.parse(localStorage.getItem("highscores")) != null)
      highscores = JSON.parse(window.localStorage.getItem("highscores"));
    else
    //create an empty array for the new scores
      highscores = [];
    // create a new score object for the user
    var newScore = {
      initials: initials,
      score: time
    };
    highscores.push(newScore);
    // save to localstorage
    localStorage.setItem("highscores", JSON.stringify(highscores));
  
}

function checkForEnter(e) {
  // check if e key is enter
    if(e.keyCode === 13);
    saveScore();
}

// user clicks button to submit initials
submitBtn.onclick = saveScore;

// user clicks button to start quiz
startBtn.onclick = startQ;

initialsEl.onkeyup = checkForEnter;