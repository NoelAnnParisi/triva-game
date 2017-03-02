// create an object containing an array of my questions/ choices/ and functions
var time = 31;
var answerTime = 6;
var currentQuestion;
var decrementTime;
var waitToChoose;

var game = {

    questions: [

        {
            question: "Question One?",
            answerChoices: [

                {
                    text: "choice one",
                    value: true
                },

                {
                    text: "choice two",
                    value: false
                },

                {
                    text: "choice three",
                    value: false
                }
            ]
        },

        {
            question: "Question Two?",
            answerChoices: [

                {
                    text: "choice one",
                    value: false
                },

                {
                    text: "choice two",
                    value: true
                },

                {
                    text: "choice three",
                    value: false
                }
            ]
        },

        {
            question: "Question Three?",
            answerChoices: [

                {
                    text: "choice one",
                    value: false
                },

                {
                    text: "choice two",
                    value: false
                },

                {
                    text: "choice three",
                    value: true
                }
            ]
        },

        {
            question: "Question Four?",
            answerChoices: [

                {
                    text: "choice one",
                    value: false
                },

                {
                    text: "choice two",
                    value: false
                },

                {
                    text: "choice three",
                    value: true
                }
            ]
        }

    ],

    questionTimer: function questionTimer(obj) {

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
    game.questionTimer(game.questions[0]);
    time = 31;

}

var clearHTMLdivs = function clearHTMLdivs() {

    $('.correct').empty();
    $('.incorrect').empty();

}

var gameOver = function gameOver() {

    $('.question-timer').empty();
    $('.question').html('<strong> GAME OVER</strong>');
    $('.answerChoices').empty();
    $('.correct').empty();
    $('.incorrect').empty();
    clearInterval(decrementTime);
}

var chooseRandomQuestion = function chooseRandomQuestion() {

    if (waitToChoose) {
        clearTimeout(waitToChoose);
    }

    var currentQuestionIndex = Math.floor(Math.random() * game.questions.length);

    var currentQuestion = game.questions[currentQuestionIndex]

    game.questions.splice(currentQuestionIndex, 1);

    console.log(game.questions);

    if (game.questions.length === 0) {

        // when there are no more question to ask exit function and stop game
        clearTimeout(waitToChoose);
        var stopGame = setTimeout(gameOver(),4000);
    }

    // display question  

    $('.question').html('<p id="question">' + currentQuestion.question + '</p>');


    // display answer choices 

    for (let i = 0; i < currentQuestion.answerChoices.length; i++) {

        $('.answerChoices').append("<li class='choices'>" + currentQuestion.answerChoices[i].text + "</li>");

        console.log(currentQuestion.answerChoices[i].value);

        var val = currentQuestion.answerChoices[i].value;

        $('.answerChoices > li').last().attr('value', val);

    }

    // when a user clicks on an answer choice the answer timer should start 
    // and the question timer should stop/be hidden

    $('.answerChoices').on('click', function(event) {

        $('.question-timer').empty();

        $('.answerChoices').empty();

        $('.question').empty();

        clearInterval(decrementTime);

        waitToChoose = setTimeout(function() {
            chooseRandomQuestion();
            displayTimer();
            clearHTMLdivs();
        }, 5000);

        if ($(event.target).attr('value') === 'true') {

            $('.correct').html("<strong> Correct </strong");

            // if wrong answer

        } else {

            $('.incorrect').html("<strong> Incorrect </strong");
        }

    })

}


// when button is clicked start the game
$('button').on('click', function(event) {

    chooseRandomQuestion();
    displayTimer();
});



