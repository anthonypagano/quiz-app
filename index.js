"use strict";

// set counters for questions and the score
let questionCount = 0;
let scoreCount = 0;

// increment the question counter
function questionCounter() {
  questionCount++;
}

// increment the score counter
function scoreCounter() {
  scoreCount++;
}

// function to start the quiz from the landing page which will call for the question and start the quiz engine
function startQuiz() {
  $('#startTheQuiz').click(function(event) {
    nextQuestion();
    quizEngine();
  });
}

// function to move to and load the next question
function nextQuestion() {
  $('.container').html(loadQuestions());  
}

// load the necessary question info and assets from the STORE array
function loadQuestions() {
  $('.container').html(`
    <section id="quizQuestions" role="application">
    <img src="${STORE[questionCount].relatedPhoto}" alt="${STORE[questionCount].alt}" />
    <ul>
      <li class="question">Question ${questionCount +1} of 10</li>
      <li class="score">Score ${scoreCount} of 10</li>
    </ul>    
    <h1>${STORE[questionCount].question}</h1>
    <form id="js-quizQuestionForm" role="form">
      <fieldset class="fieldset">
      <legend>Questions and answer options</legend>
  `);  
  
  const countTo = 3;
  for (let i = 0; i <= countTo; i++) {
    $('.fieldset').append(`
          <label>
            <input type="radio" name="answer" value="${STORE[questionCount].answerOptions[i]}" required></input>
            <span>${STORE[questionCount].answerOptions[i]}</span>
          </label>
    `);
  }    

  $('.fieldset').append(`
      </fieldset>  
      <button type="submit">Submit</button>
    </form>      
  </section>
  `);
}

// check the users selected answer, compare it to what is in the STORE array for the question shown. If it is correct run the function to show them the correct answer pannel, if it's incorrect show them the incorrect answer pannel
function checkTheAnswer() {
  $('#js-quizQuestionForm').submit(function(event) {
    event.preventDefault();
    let userChoice = $('input:checked');
    let answer = userChoice.val();
    let correctAnswer = `${STORE[questionCount].theRightAnswer}`;
    showAnswerPannel(answer, correctAnswer)
  });
}

// takes the users answer and the correct answer and passes them in to show the user the correct or incorrect user pannel. In the case of a correct answer the correct answer is shown and the score increment function is called. In the case of an incorrect answer the users answer as well as the correct answer are shown. For either answer the increment question function is called.
function showAnswerPannel(answer, correctAnswer) {
  let correctAnswerPhrase = `${STORE[questionCount].rightAnswerPhrase}` + `${STORE[questionCount].theRightAnswer}`;
  $('.container').html(`
      <section role="application">
  `);  

  if (answer === correctAnswer) {
    scoreCounter();
    $('.container').append(`
        <img src="https://s3.amazonaws.com/speedsport-news/speedsport-news/wp-content/uploads/2018/04/09082815/80-SteveTorrence-Celeb-LasVegas1-1068x799.jpg" alt="Steve Torrence wins the top fuel class at the 4 Wide Nationals in Las Vegas" />
          <p>You Are Correct!</p>
          <p>${correctAnswerPhrase}.</p>
    `);    
  } else {
    $('.container').append(`
      <img src="https://media.giphy.com/media/HiqKxcqQn5OF2/giphy.gif" alt="Ron Capps' engine explodes" />
        <p>You chose ${answer}.</p>
        <p>I'm sorry, your answer is incorrect.</p>
        <p>The correct answer is ${STORE[questionCount].theRightAnswer}.</p>
    `);    
  }
  	
  $('.container').append(`
          <ul>
            <li class="question">Question ${questionCount +1} of 10</li>
            <li class="score">Score ${scoreCount} of 10</li>
          </ul>  
          <button id="continue">Continue</button>  
      </section>    
  `);
  questionCounter();
}

//function to increment the question counter when a user clicks on the continue button and determine how to move to the next question. If the questionCount is less than the length of the STORE array then show the next question otherwise show them the end of the quiz pannel.
function continueToNextQuestion() {
  $('.container').on('click', '#continue', function(event) {
    if (questionCount < STORE.length) {
      nextQuestion();
      quizEngine();
    } else {
      showEndOfQuizPannel();
    }
  });
}  

// when the user gets to the end of the quiz show them their score and button to re-start the quiz.
function showEndOfQuizPannel() {
$('.container').html(`
    <section role="application">
      <img src="https://www.racingjunk.com/news/wp-content/uploads/2013/12/John-Force-Racing-Museum-003.jpg?w=222&h=166&crop=1" alt="Just a few of the Wally Trophies at the John Force Racing Museum" />
        <p>You made it to the Winners Circle!</p>
        <p>Out of the ${questionCount} questions, you got ${scoreCount} right. Click the button below to try the quiz again and improve your score!</p>
        <button id="tryAgain">Try Again</button>  
    </section>
`);  
}

//upon clicking the Try Again button reload the page to bring the users back to the beginning and clear the question and score counters
function tryTheQuizAgain() {
  $('.container').on('click', '#tryAgain', function(event) {
    window.location.reload();
  });
}

// function to handle checking the users answer, moving to the next question and restarting the quiz
function quizEngine() {
  checkTheAnswer();
  continueToNextQuestion();
  tryTheQuizAgain();
}

//call back to start the quiz
$(startQuiz);