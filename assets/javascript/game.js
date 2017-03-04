// create an object containing an array of my questions/ choices/ and functions
var statusOfGame = false;
var decrementTime;
var waitToChoose;
var time = 31;
var incorrectAnswers = 0;
var correctAnswers = 0;
var value;
var currentQuestion;
var currentQuestionIndex;

var game = {

    questions: [

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
            if (time === 0) {
                clearInterval(decrementTime);
                $('.question-timer').text('Out of time!');
                game.chooseRandomQuestion();
            };
        }, 1000);


    },

    chooseRandomQuestion: function chooseRandomQuestion(obj) {


         if (game.questions.length === 0) {

            clearInterval(decrementTime);
            // I want to display a game over sentence
            $('.correct').html('<strong> GAME OVER</strong>');
            $('.incorrect').html('<strong> GAME OVER</strong>');
            //           no more anser choices should show!
            $('.answerChoices').empty();
            // empty the correct and incorrect divs
            $('.correct').empty();
            $('.incorrect').empty();

            // display their score!
            $('.score').html("<p>You got this many wrong: </p>" + incorrectAnswers + "<p>You got this many correct: </p>" + correctAnswers);

        }

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

        for (let i = 0; i < game.questions[0].answerChoices.length; i++) {

            console.log("length of game array " + game.questions[0].answerChoices.length)

            var val = game.questions[0].answerChoices[i].value;

            $('.answerChoices > li').last().attr('value', val);

            console.log(typeof val);

            $('.answerChoices').append("<li class='choices'>" + game.questions[currentQuestionIndex].answerChoices[i].text + "</li>");

            console.log(game.questions[currentQuestionIndex].answerChoices[i].text);
        }
    },

    answerClickEvent: function answerClickEvent() {

        // how would I use a switch function to check the 
        // length of the array so that me code doesnt break at the end of the arry?
        // https://www.w3schools.com/js/exercise.asp?filename=exercise_switch1

        game.questions.splice(currentQuestionIndex, 1);


        console.log(game.questions);

        $('.scoreBox').show();

        $('.answerChoices').empty();

        $('.question').hide();

        $('.question-timer').hide();

        $('.container').hide();

        console.log($(event.target).attr('value'))

        if ($(event.target).attr('value') === 'true') {

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
            game.chooseRandomQuestion();
            clearInterval(decrementTime);
            time = 30;
        }, 5000);

        console.log('something is being clicked');

    }

};

// when (statusOfGame) call choose random question function and display questions
$('button').on('click', function(event) {

    statusOfGame = true;
    console.log(statusOfGame);
    $('.question-timer').hide();
    $('.scoreBox').hide();
    $('button').toggle();

    game.chooseRandomQuestion();

});

$('.answerChoices').on('click', function(event) {

    game.answerClickEvent();

})

$('.container').hide();


// // select a random item from the questions array 

// // make a function that chooses random current question & displays ?'s/choices

// var displayTimer = function displayTimer() {
//     // display question timer
//     console.log("The displayTimer function is running");
//     game.questionTimer(game.questions[0]);
//     time = 31;

// }

// var clearHTMLdivs = function clearHTMLdivs() {

//     console.log("The clearHTMLdivs function is running");

//     $('.correct').empty();
//     $('.incorrect').empty();

// }

// //when all the questions in the array have been asked it's time to end the game!
// var gameOver = function gameOver() {

//     console.log("The gameOver function is running!")
//         //I want to stop the timer and clear the div
//     clearInterval(decrementTime);
//     // I want to display a game over sentence
//     $('.question').html('<strong> GAME OVER</strong>');

//     // no more anser choices should show!
//     $('.answerChoices').empty();
//     // empty the correct and incorrect divs
//     $('.correct').empty();
//     $('.incorrect').empty();

//     //display their score!
//     $('.score').html("<p>You got this many wrong: </p>" + incorrectAnswers + "<p>You got this many correct: </p>" + correctAnswers);
// }

// var incrementScore = function(event) {

//     console.log("The incrementScore function is running!")

//     // if they clicked on the right answer increment their score
//     if (event.target.attributes[1].nodeValue === "true") {

//         correctAnswers++;
//         console.log("The number of correct answers: " + correctAnswers);

//         // if they got it wrong do the same thing!
//     } else {

//         incorrectAnswers++;
//         console.log("The number of incorrect answers: " + incorrectAnswers);


//     }

// }

// // main function of the game!
// var chooseRandomQuestion = function chooseRandomQuestion() {

//     $('.question-timer').show();
//     $('.container').show();
//     $('.scoreBox').hide();

//     console.log("The chooseRandomQuestion function is running!");

//     // if set timer variable is true, clear it so that it doesn't load every 3 secs
//     if (waitToChoose) {
//         clearTimeout(waitToChoose);
//     }

//     // choose random question from the game.questions object

//     currentQuestionIndex = Math.floor(Math.random() * game.questions.length);

//     currentQuestion = game.questions[currentQuestionIndex];

//     // display question  

//     $('.question').html('<p id="question">' + currentQuestion.question + '</p>');


//     // assign value to each answer choice so I can access it later to increment score 

//     for (let i = 0; i < currentQuestion.answerChoices.length; i++) {

//         $('.answerChoices').append("<li class='choices'>" + currentQuestion.answerChoices[i].text + "</li>");

//         console.log(currentQuestion.answerChoices[i].value);

//         var val = currentQuestion.answerChoices[i].value;

//         $('.answerChoices > li').last().attr('value', val);

//     }

//     // when a user clicks on an answer choice the answer timer should start 
//     // and the question timer should stop/be hidden

//     $('.answerChoices').on('click', function(event) {

//         console.log("an answer choice was clicked and clearInterval is running");

//         $('.container').hide();


//         $('.question-timer').empty();

//         $('.answerChoices').empty();

//         $('.question').empty();

//         clearInterval(decrementTime);

//         waitToChoose = setTimeout(function() {
//             chooseRandomQuestion();
//             displayTimer();
//             clearHTMLdivs();
//         }, 3000);

//         if ($(event.target).attr('value') === 'true') {

//             $('.correct').html("<strong> Correct </strong");

//             // if wrong answer

//         } else {

//             $('.incorrect').html("<strong> Incorrect </strong");

//         }

//     })

// }


// // console.log(game.questions[0].answerChoices[0].value);
// // when button is clicked start the game
// $('button').on('click', function(event) {

//     $('button').toggle();

//     chooseRandomQuestion();
//     displayTimer();
// });

// $('.answerChoices').on('click', function() {

//     $('.question-timer').hide();
//     $('.scoreBox').show();

//     incrementScore(event);
//     //take the qyestion that was just asked out of the array
//     game.questions.splice(currentQuestionIndex, 1);
//     console.log(currentQuestionIndex);

//     if (game.questions.length === 0) {

//         // when there are no more question to ask exit function and stop game
//         clearTimeout(waitToChoose);
//         var stopGame = setTimeout(gameOver(), 4000);
//         console.log("how is this doing?");

//         if (gameOver) {
//             clearInterval(decrementTime);
//             console.log("Do you want to play again?");

//         }

//     }


// });
