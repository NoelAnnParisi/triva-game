// create an object containing an array of my questions/ choices/ and functions
var time = 31;
var currentQuestion;
var decrementTime;
var waitToChoose;
var incorrectAnswers = 0;
var correctAnswers = 0;
var value;
var currentQuestionIndex;

var game = {

    questions: [

        {
            question: "Question One?",
            answerChoices: [

                {
                    text: "choice for question one",
                    value: true
                },

                {
                    text: "choice for question one",
                    value: false
                },

                {
                    text: "choice for question one",
                    value: false
                }
            ]
        },

        {
            question: "Question Two?",
            answerChoices: [

                {
                    text: "choice for question two",
                    value: false
                },

                {
                    text: "choice for question two",
                    value: true
                },

                {
                    text: "choice for question two",
                    value: false
                }
            ]
        },

        {
            question: "Question Three?",
            answerChoices: [

                {
                    text: "choice for question three",
                    value: false
                },

                {
                    text: "choice for question three",
                    value: false
                },

                {
                    text: "choice for question three",
                    value: true
                }
            ]
        },

        {
            question: "Question Four?",
            answerChoices: [

                {
                    text: "choice for question four",
                    value: false
                },

                {
                    text: "choice for question four",
                    value: false
                },

                {
                    text: "choice for question four",
                    value: true
                }
            ]
        }

    ],

    questionTimer: function questionTimer(obj) {

        console.log("The questionTimer is running!")

        decrementTime = setInterval(function() {
            time -= 1;
            $('.question-timer').html(time);
            if (time === 0) { clearTimeout(decrementTime) };
        }, 1000);


    },

}

// select a random item from the questions array 

// make a function that chooses random current question & displays ?'s/choices

var displayTimer = function displayTimer() {
    // display question timer
    console.log("The displayTimer function is running");
    game.questionTimer(game.questions[0]);
    time = 31;

}

var clearHTMLdivs = function clearHTMLdivs() {

    console.log("The clearHTMLdivs function is running");

    $('.correct').empty();
    $('.incorrect').empty();

}

//when all the questions in the array have been asked it's time to end the game!
var gameOver = function gameOver() {

    console.log("The gameOver function is running!")
    //I want to stop the timer and clear the div
    $('.question-timer').empty();
    clearInterval(decrementTime);

    // I want to display a game over sentence
    $('.question').html('<strong> GAME OVER</strong>');

    // no more anser choices should show!
    $('.answerChoices').empty();
    // empty the correct and incorrect divs
    $('.correct').empty();
    $('.incorrect').empty();

    //display their score!
    $('.score').html("<p>You got this many wrong: </p>" + incorrectAnswers + "<p>You got this many correct: </p>" + correctAnswers);
}

var incrementScore = function(event) {

    console.log("The incrementScore function is running!")

    // if they clicked on the right answer increment their score
    if (event.target.attributes[1].nodeValue === "true"){

        correctAnswers ++;
        console.log("The number of correct answers: " + correctAnswers); 

    // if they got it wrong do the same thing!
    } else {

        incorrectAnswers ++;
        console.log("The number of incorrect answers: " + incorrectAnswers);


    } 

}

// main function of the game!
var chooseRandomQuestion = function chooseRandomQuestion() {

    console.log("The chooseRandomQuestion function is running!")

    // if set timer variable is true, clear it so that it doesn't load every 3 secs
    if (waitToChoose) {
        clearTimeout(waitToChoose);
    }

    // choose random question from the game.questions object

    currentQuestionIndex = Math.floor(Math.random() * game.questions.length);

    currentQuestion = game.questions[currentQuestionIndex];

    // display question  

    $('.question').html('<p id="question">' + currentQuestion.question + '</p>');


    // assign value to each answer choice so I can access it later to increment score 

    for (let i = 0; i < currentQuestion.answerChoices.length; i++) {

        $('.answerChoices').append("<li class='choices'>" + currentQuestion.answerChoices[i].text + "</li>");

        console.log(currentQuestion.answerChoices[i].value);

        var val = currentQuestion.answerChoices[i].value;

        $('.answerChoices > li').last().attr('value', val);

    }

    // when a user clicks on an answer choice the answer timer should start 
    // and the question timer should stop/be hidden

    $('.answerChoices').on('click', function(event) {

        console.log("is this running");

        $('.question-timer').empty();

        $('.answerChoices').empty();

        $('.question').empty();

        clearInterval(decrementTime);

        waitToChoose = setTimeout(function() {
            chooseRandomQuestion();
            displayTimer();
            clearHTMLdivs();
        }, 3000);

        if ($(event.target).attr('value') === 'true') {

            $('.correct').html("<strong> Correct </strong");

            // correctAnswers ++;
            // console.log("The number of correct answers: " + correctAnswers);

            // if wrong answer

        } else {

            $('.incorrect').html("<strong> Incorrect </strong");
            // incorrectAnswers ++;
            // console.log("The number of incorrect answers: "+ incorrectAnswers);
        }

    })

}


// console.log(game.questions[0].answerChoices[0].value);
// when button is clicked start the game
$('button').on('click', function(event) {

    chooseRandomQuestion();
    displayTimer();
});

$('.answerChoices').on('click', function(){

    incrementScore(event);
    //take the qyestion that was just asked out of the array
    game.questions.splice(currentQuestionIndex, 1);
    console.log(currentQuestionIndex);

    if (game.questions.length === 0) {

        // when there are no more question to ask exit function and stop game
        clearTimeout(waitToChoose);
        var stopGame = setTimeout(gameOver(),4000);
        console.log("how is this doing?");
    }


});

