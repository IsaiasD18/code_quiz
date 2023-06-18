// create a variable for the body of the file html
var body = document.body; 
//Create a variable containig the element that will have the timer
var timerEl = document.getElementById('timer');


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
  var timeLeft = 10;

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

countdown()