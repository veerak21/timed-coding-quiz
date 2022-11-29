// list of all questions, choices, and answers
var questions = [{
    question: "Which of the following is not a commonly used data type?",
    choices: [ "Alerts", "Strings", "Booleans", "Numbers"],
    answer: "Alerts"

}, {
    question: "What can arrays in JavaScript can be used to store?",
    choices: [ "Booleans",  "Numbers and strings", "Other arrays", "All of the above"], 
    answer: "All of the above"
    
}, {
    question: "How do you enclose the condition of an ' if ' statement?",
    choices: ["Quotes",  "Square brackets",  "Curly brackets",  "Parentheses"],
    answer: "Parentheses" 
    
}, {
    question: "What is a very useful tool for debugging and printing content to the debugger?",
    choices: ["Console.log", "For loops",  "CSS",  "Terminal/Bash"], 
    answer: "Console.log"

}, {
    question: "What does DOM stand for?",
    choices: ["Do Over Mulligan", "Document Object Model", "Data Object Model",  "Document Option Model"], 
    answer: "Document Object Model"
}];

// variables to reference DOM elements
var timerEl = document.getElementById("timer");
var startButton = document.getElementById('start-btn')
var answerButtonsElement = document.getElementById('answer-buttons')
var submitButton = document.getElementById('submit-btn')
var answer1 = document.getElementById("btn1");
var answer2 = document.getElementById("btn2");
var answer3 = document.getElementById("btn3");
var answer4 = document.getElementById("btn4");

//questions
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')

//page elements
var welcomePageElements = document.getElementById('welcome-page')
var endGameElements = document.getElementById('end-page')
var scoreElement = document.getElementById('score')
var displayEl = document.getElementById('display')
var displayEl2 = document.getElementById('display2')

//high score page elements
var initialsEl = document.getElementById('initials')
var scoresEl = document.getElementById('high-scores')
var newScore = document.getElementById('newScores')
var viewScoreList = document.getElementById('highscore')
var containerEl = document.getElementById('container')


var questionCounter = 0;
var timeLeft = questions.length * 15;     
                                              
// Timer countdown from 75 seconds
function countDown() {
                            
        if(timeLeft > 0){
            timerEl.textContent = "Time:  " + timeLeft;
            timeLeft--
        }
        else {
            timerEl.textContent = "Time:  " + timeLeft; 
            endGame();
        }
    }

var createQuestionElement = function(index) {

    var currentQuestion = questions[questionCounter]
    question.textContent = currentQuestion.question;

    answer1.textContent = currentQuestion.choices[0]
    answer2.textContent = currentQuestion.choices[1]
    answer3.textContent = currentQuestion.choices[2]
    answer4.textContent = currentQuestion.choices[3]
}

var checkAnswer = function(event) {
    var correctAnswer = questions[questionCounter].answer
    var currentAnswer = event.target.textContent   
    displayEl.classList.remove('hide') 
    displayEl2.classList.remove('hide')
    
    if (currentAnswer === correctAnswer) {
        displayEl2.classList.add('hide')
        displayEl.textContent = "------Correct!------"
    } else {
        displayEl.classList.add('hide')
        displayEl2.textContent = "------Wrong!------"
        timeLeft -= 15;
    }
    
    questionCounter++;
    if(questionCounter === questions.length){
        endGame();
    } else {
    createQuestionElement();
}
}

var startGame = function(){
    timeInterval = setInterval(countDown, 1000);
    startButton.classList.add('hide')
    welcomePageElements.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    countDown();
    // setNextQuestion()
    createQuestionElement();
    }

var endGame = function(){
    clearInterval(timeInterval);
    questionContainerElement.classList.add('hide')
       endGameElements.classList.remove('hide')
       scoreElement.textContent = "Your final score is " + timeLeft;
       timerEl.classList.add('hide')
    

       setTimeout(function() {
           displayEl.setAttribute("class", "hide");
       }, 1000);
       setTimeout(function() {
           displayEl2.setAttribute("class", "hide");
       }, 1000);
       highScore();
  }


  function highScore(){
    submitButton.addEventListener("click", function(event) {
        
    
    var id = initialsEl.value;
    var score = timeLeft;
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    if(id.length > 0) {
        var newScore = {
            id,
            score
        }
        console.log(id)
        scoresEl.classList.remove('hide');
        endGameElements.classList.add('hide');
        containerEl.classList.add('hide')
        viewScoreList.classList.add('hide')
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores)); 

    // sort highscores by score property in descending order
        if(highscores !== undefined) {
            highscores.sort(function(a,b){
                return b.score - a.score
            })
            highscores.forEach(function(score){
                console.log(score)
                // create li for each high score
                var li = document.createElement("li");
                li.innerHTML = "<h5>" + score.id + "  " + score.score + "</h5>"
                var olEl = document.getElementById('newScores');
                olEl.appendChild(li)
            })
        }
    }
    console.log(highscores);
    
 })
  }

  function clearHighscores() {
    localStorage.clear();
    newScore.classList.add('hide');
}

function viewHighScores(){
    startButton.classList.add('hide')
    welcomePageElements.classList.add('hide')
    questionContainerElement.classList.add('hide')
    displayEl.classList.add('hide') 
    displayEl2.classList.add('hide')
    timerEl.classList.add('hide')
    scoresEl.classList.remove('hide')
    containerEl.classList.add('hide')
    viewScoreList.classList.add('hide')

    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];   
 highscores.sort(function(a,b){
    return b.score - a.score
})

highscores.forEach(function(score){
    var li = document.createElement("li");
    li.innerHTML = "<h5>" + score.id + "  " + score.score + "</h5>"
    var olEl = document.getElementById('newScores');
    olEl.appendChild(li)
})

console.log(highscores);  
}

document.getElementById("clear").onclick = clearHighscores;
startButton.addEventListener('click', startGame)
answer1.addEventListener("click", checkAnswer)
answer2.addEventListener("click", checkAnswer)
answer3.addEventListener("click", checkAnswer)
answer4.addEventListener("click", checkAnswer)
viewScoreList.addEventListener("click", viewHighScores)

