// create an object containing an array of my questions/ choices/ and functions
var statusOfGame = false;
var decrementTime;
var waitToChoose;
var time = 10;
var incorrectAnswers = 0;
var correctAnswers = 0;
var value;
var currentQuestion;
var currentQuestionIndex;

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

    questionTimer: function questionTimer(obj) {

        console.log("The questionTimer is running!");

        // begin decreasing timer by one (setInterval timer variable)

        decrementTime = setInterval(function() {
            time -= 1;
            $('.question-timer').html(time);
            if (time === 0 && statusOfGame === true) {
                console.log('decrement time is running');
                $('.question-timer').text('Out of time!');
                game.chooseRandomQuestion();
            };
        }, 1000);


    },

    chooseRandomQuestion: function chooseRandomQuestion(obj) {

        $('.answerChoices').empty();
        $('.question').show();

        currentQuestionIndex = Math.floor(Math.random() * game.questions.length);

        console.log("Current question Index " + currentQuestionIndex);

        currentQuestion = game.questions[currentQuestionIndex].question;

        game.assignValueToChoices();

        $('.question').html('<p id="question">' + currentQuestion + '</p>');
        $('.question-timer').html(game.questionTimer);
        $('.question-timer').show();
        $('.container').show();
        $('.scoreBox').hide();

    },

    // display the correct answer choices 
    //if an answer choice is clicked on 
    // delete the random question from the game object's array
    // clear the timer and set the waitToChoose function (wait 4 seconds to choose the next ?)

    assignValueToChoices: function assignValueToChoices(obj) {

        for (let i = 0; i < game.questions[currentQuestionIndex].answerChoices.length; i++) {

            console.log("value is ", game.questions[currentQuestionIndex].answerChoices[i].value);

            console.log("length of game array " + game.questions[currentQuestionIndex].answerChoices.length)

            var val = game.questions[currentQuestionIndex].answerChoices[i].value;

            // $('.answerChoices > li').children().eq(i).attr('data-value', val);

            console.log(typeof val);

            $('.answerChoices').append("<li class='choices' data-value='" + val + "'>" + game.questions[currentQuestionIndex].answerChoices[i].text + "</li>");

            console.log(game.questions[currentQuestionIndex].answerChoices[i].text);
        }
    },

    answerClickEvent: function answerClickEvent(event) {


        // how would I use a switch function to check the 
        // length of the array so that me code doesnt break at the end of the arry?
        // https://www.w3schools.com/js/exercise.asp?filename=exercise_switch1

        console.log("This is the event : ", event.target);

        game.questions.splice(currentQuestionIndex, 1);


        console.log(game.questions);

        $('.correct').empty();

        $('.incorrect').empty();

        $('.scoreBox').show();

        $('.answerChoices').empty();

        $('.question').hide();

        $('.question-timer').hide();

        $('.container').hide();

        console.log($(event.target).attr('data-value'))

        if ($(event.target).attr('data-value') === 'true') {

            $('.correct').html("<strong> Correct </strong>");

            correctAnswers++;

            console.log('correct');

            // if wrong answer tell them they are wrong

        } else {

            $('.incorrect').html("<strong> Incorrect </strong>");

            incorrectAnswers++;

            console.log('incorrect');

        }

        // set a timer to run choose random question function

        waitToChoose = setTimeout(function() {

            // change status of game to false when length of the game array is 0
            if (game.questions.length === 0) {

                statusOfGame = false;

                console.log(statusOfGame);

                console.log("This is the length of the game: " + game.questions.length);

                console.log("this should run")

                clearTimeout(waitToChoose);

                // I want to display a game over sentence
                // I only want to do this once the game is over!

                $('.correct').html('<strong> GAME OVER</strong>');
                $('.incorrect').html('<strong> GAME OVER</strong>');
                // no more anser choices should show!
                $('.answerChoices').empty();
                // empty the correct and incorrect divs
                $('.correct').empty();
                $('.incorrect').empty();

                //display their score!
                $('.score').html("<p>You got this many wrong: </p>" + incorrectAnswers + "<p>You got this many correct: </p>" + correctAnswers);
                $('.playAgain').html("<button type='submit' id='playAgain'>Want to play again?</button> ");
            } else {
                game.chooseRandomQuestion();
                clearInterval(decrementTime);
                time = 10;
            }
        }, 5000)
    }
}

// when (statusOfGame) call choose random question function and display questions
$('button').on('click', function(event) {

    statusOfGame = true;
    console.log(statusOfGame);
    $('.question-timer').hide();
    $('.scoreBox').hide();
    $('button').toggle();
    console.log("261")

    game.chooseRandomQuestion();

});

$('.answerChoices').on('click', function(event) {

    game.answerClickEvent(event);

})

$('.playAgain').on('click', function() {

    statusOfGame = true;
    console.log(statusOfGame);
    $('.question-timer').hide();
    $('.scoreBox').hide();
    $('button').toggle();
    console.log("279")
    game.chooseRandomQuestion();

})

$('.container').hide();
