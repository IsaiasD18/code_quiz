// create a variable for the body of the file html
var body = document.body; 
//Create a variable containig the element that will have the timer
var timerEl = document.getElementById('timer');
//create a variable that represents the current question that the user is on
var currentQuestionIndex = 0;
var time = questionsData.length * 15;
var timerId;
var input = document.querySelector('#name-input');
var form = document.querySelector('#user-form');
var choises = document.querySelector('.choises');
var questionsEl = document.querySelector('.questions');
var feedbackEl = document.querySelector(".feedback");


//create a function to start the quiz, this will hide the buttom and show it
function startGame() {
  // hide start screen
  var startScreen = document.querySelector("#start-screen");
  startScreen.setAttribute("class", "start hide");

  // un-hide questions section
  questionsEl.setAttribute("class", " ");
  // start timer
  timerId = setInterval(function(){
    clockTick();
  }, 1000);
  // show starting time
  timerEl.textContent = time;

  showCurrentQ();
}

//function shows the current question
function showCurrentQ() {
  // store the question object to a variable
var currentQuestion = questionData[currentQuestionIndex];
// update title with current question
questionsEl.children[0].textContent = currentQuestion.title;
// clear out any old question choices
while (choises.hasChildNodes()) {
  choises.removeChild(choises.lastChild);
}
// loop over choices
for(var i = 0; i < currentQuestion.choices.length; i++){

  // create new button for each choice
  var choiceButton = document.createElement("button");
  choiceButton.textContent = currentQuestion.choices[i];
  
  // display on the page
  choices.appendChild(choiceButton);
}
// attach click event listener to each choice
choices.children[0].addEventListener("click", function(event){
  questionChoise(choices.children[0]);
});
choices.children[1].addEventListener("click", function(event){
  questionChoise(choices.children[1]);
});
choices.children[2].addEventListener("click", function(event){
  questionChoise(choices.children[2]);
});
choices.children[3].addEventListener("click", function(event){
  questionChoise(choices.children[3]);
});

}

//create a function to show what happen if they guessed wrog
function questionChoise(ac) {
  if(ac.textContent != questionData[currentQuestionIndex].answer){
    // take time from the timer
    time -= 10;
    // display new time on page
    feedbackEl.textContent = "Incorrect";
  }
  else{
    feedbackEl.textContent = "Correct";
  }

  // show the feedback for half of a second
  feedbackEl.setAttribute("class", "feedback");
  setInterval(function(){
    feedbackEl.setAttribute("class", "feedback hide");
  }, 500);

  // move to next question
  currentQuestionIndex++;

  // check if there are questions left
  if(currentQuestionIndex === questionsData.length)
    // quizEnd
    quizEnd();
  // else 
  else
    // getQuestion
    showCurrentQ();
}


function getUserInput(eventObj) {
  eventObj.preventDefault();
var initials = input.value;

localStorage.setItem('initials-value', initials);

  if (eventObj.keyCode === 13) {
 
  }
}

// input.addEventListener('keydown', getUserInput);

//prevent event default of the summit
form.addEventListener('submit', getUserInput);

function quizEnd() {
  // stop timer
  clearInterval(timerId);
  timerEl.textContent = time;

  // show end screen
  var endScreenEl = document.querySelector("#user-form");
  endScreenEl.setAttribute("class", " ");

  // show final score
  var finalScoreEl = document.querySelector(".score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}