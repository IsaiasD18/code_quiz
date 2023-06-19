// create a variable for the body of the file html
var body = document.body; 
//Create a variable containig the element that will have the timer
var timerEl = document.getElementById('timer');
//create a variable that represents the current question that the user is on
var currentQuestionIndex = 0;
var input = document.querySelector('#name-input');
var form = document.querySelector('#user-form');
var choises = document.querySelector('.choises');
var questionsEl = document.querySelector('.questions');


//create a button element and store it to a variable
var button = document.createElement('button');
//Add text to the button
button.innerText = 'Start Quiz'
//Add a clas to the button
button.classList.add('btn');
//Add the button to the body
body.append(button);

//create a funtion to display the countdown
function countdown() {
  // create a variable showing how much time is left
  var timeLeft = 60;

  //create a method that will call a function to be executed every second
  var timeInterval = setInterval(function() {
    //Decrease the time by one
    timeLeft--;
    //Display the time to the window
    timerEl.innerText = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timeInterval);
      alert('Time is up!!')
    }
  }, 1000)
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
  choicesEl.appendChild(choiceButton);
}
// attach click event listener to each choice
choicesEl.children[0].addEventListener("click", function(event){
  questionClick(choicesEl.children[0]);
});
choicesEl.children[1].addEventListener("click", function(event){
  questionClick(choicesEl.children[1]);
});
choicesEl.children[2].addEventListener("click", function(event){
  questionClick(choicesEl.children[2]);
});
choicesEl.children[3].addEventListener("click", function(event){
  questionClick(choicesEl.children[3]);
});

}
button.classList.add('hide');

//This function will show the question when the buttom is clicked
function startGame() {
  //hide the start button
button.classList.add('hide');
//show the current question usinf the index
showCurrentQ()
countdown()
}

button.addEventListener('click', startGame);

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