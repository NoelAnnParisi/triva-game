var statusOfGame;
var currentQuestion;
var currentQuestionIndex;
var value;
var time = 9;
var decrementTime;
var incorrectAnswers = 0;
var correctAnswers = 0;
var chooseAgain;
var correctAnswer;

var game = {

    questions: [

        {
            question: "The companies HP, Microsoft and Apple were all started in a what?",
            answerChoices: [

                {
                    text: "A. Shed",
                    value: false
                },

                {
                    text: "B. College Dorm",
                    value: false
                },

                {
                    text: "C. Garage",
                    value: true
                }
            ]
        },

        {
            question: "In what year was the first Apple computer released?",
            answerChoices: [

                {
                    text: "A. 1976",
                    value: true
                },

                {
                    text: "B. 1980",
                    value: false
                },

                {
                    text: "C. 1986",
                    value: false
                }
            ]
        },

        {
            question: "In database programming, SQL is an acronym for what?",
            answerChoices: [

                {
                    text: "A. Selected Query Library",
                    value: false
                },

                {
                    text: "B. Structured Query Language",
                    value: true
                },

                {
                    text: "C. Super Quick Learner",
                    value: false
                }
            ]
        },


        {
            question: "Fonts that contain small decorative lines at the end of a stroke are known as what?",
            answerChoices: [

                {
                    text: "A. Pretentious",
                    value: false
                },

                {
                    text: "B. Sans Fonts",
                    value: false
                },

                {
                    text: "C. Serif Fonts",
                    value: true
                }
            ]
        }

    ],

    correct: function() {

        console.log("the length at correct function " + game.questions.length);

        $('.correct').html("<strong> Correct </strong>");

        correctAnswers++;

        clearInterval(decrementTime);

        chooseAgain = setTimeout(function() {

            $('.question-timer').empty();

            game.chooseRandomQuestion();

        }, 3000);

    },


    incorrect: function() {

        console.log("the length at the incorrect function " + game.questions.length);

        game.checkLength();

        if (time === 0) {

            clearInterval(decrementTime);

            $('.question-timer').text('Out of time!');

            $('.question-timer').hide();

            $('.question').html("You didn't pick anything!");

            $('.answerChoices').empty();

            chooseAgain = setTimeout(function() {

                $('.question-timer').empty();

                game.chooseRandomQuestion();

            }, 3000);

        } else {

            clearInterval(decrementTime);

            $('.incorrect').html("<strong> Incorrect </strong>");

            $('.correctImage').html('<p> The correct answer is: ' + correctAnswer + '</p>');

            incorrectAnswers++;

            chooseAgain = setTimeout(function() {

                $('.question-timer').empty();

                game.chooseRandomQuestion();

            }, 3000);
        }
    },


    questionTimer: function questionTimer() {

        console.log("The questionTimer is running!");

        decrementTime = setInterval(function() {

            time -= 1;

            $('.question-timer').html(time);

            if (time === 0) {

            	game.checkLength();

                game.incorrect();

                clearInterval(decrementTime);

            }

        }, 1000)

    },

    chooseRandomQuestion: function chooseRandomQuestion() {

    	if (statusOfGame === false) {

    		return;
    	}

        clearTimeout(chooseAgain);

        time = 9;

        console.log("chooseRandomQuestion time : " + time);

        $('.question-timer').show();

        $('.answerChoices').empty();

        $('.question').show();

        currentQuestionIndex = Math.floor(Math.random() * game.questions.length);

        console.log("Current question Index " + currentQuestionIndex);

        currentQuestion = game.questions[currentQuestionIndex].question;

        game.assignValueToChoices();

        $('.question').html('<p id="question">' + currentQuestion + '</p>');

        $('.question-timer').html(game.questionTimer);

        $('.container').show();

        $('.scoreBox').hide();

        game.questions.splice(currentQuestionIndex, 1);

    },

    assignValueToChoices: function assignValueToChoices() {

        for (let i = 0; i < game.questions[currentQuestionIndex].answerChoices.length; i++) {

            console.log("value is ", game.questions[currentQuestionIndex].answerChoices[i].value);

            console.log("length of game array " + game.questions[currentQuestionIndex].answerChoices.length)

            var val = game.questions[currentQuestionIndex].answerChoices[i].value;

            console.log(typeof val);

            $('.answerChoices').append("<li class='choices' data-value='" + val + "'>" + game.questions[currentQuestionIndex].answerChoices[i].text + "</li>");

            console.log(game.questions[currentQuestionIndex].answerChoices[i].text);

        }
    },

    answerClickEvent: function answerClickEvent(event) {

    	game.checkLength();

        $('.correct').empty();

        $('.incorrect').empty();

        $('.scoreBox').show();

        $('.answerChoices').empty();

        $('.question').hide();

        $('.question-timer').hide();

        $('.container').hide();

        if ($(event.target).attr('data-value') === 'true') {

            game.correct();

        } else {

            game.incorrect();
        }
    },


    checkLength: function() {

        if (game.questions.length === 0) {

        	statusOfGame = false;
 
            console.log("the check length function is running!");

            clearTimeout(chooseAgain);

            clearInterval(decrementTime);

            $('.question-timer').empty();

            $('.question').empty();

            $('.correct').html('<strong> GAME OVER</strong>');

            $('.incorrect').html('<strong> GAME OVER</strong>');

            $('.answerChoices').empty();

            // $('.correct').empty();

            // $('.incorrect').empty();

            $('.score').html("<p>You got this many wrong: </p>" + incorrectAnswers + "<p>You got this many correct: </p>" + correctAnswers);

            $('.playAgain').html("<button type='submit' id='playAgain'>Want to play again?</button> ");
        }
    },

    replayGame: function () {

    	game.chooseRandomQuestion();

    }

}


$('button').on('click', function(event) {

	game.questions = game.questions.slice(0);

    $('.question-timer').hide();

    $('.scoreBox').hide();

    $('button').toggle();

    game.chooseRandomQuestion();

});

$('.answerChoices').on('click', function(event) {

    game.answerClickEvent(event);

});


$('.playAgain').on('click', function() {

    $('.question-timer').hide();

    $('.scoreBox').hide();

    $('button').toggle();

    game.replayGame();
    
});

$('.container').hide();
