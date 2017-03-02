// create an object containing an array of my questions/ choices/ and functions
var time = 31;
var answerTime = 6;

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
        }

    ],

    questionTimer: function questionTimer(obj) {

        let decrementTime = setInterval(function() {
            time -= 1;
            $('.question-timer').html(time);
            if (time === 0) { clearTimeout(decrementTime) };
        }, 1000);


    },

    answerTimer: function answerTimer(obj) {

        let decrementTime = setInterval(function() {

            answerTime -= 1;

            $('.answer-timer').html(answerTime);
            if (answerTime === 0) { clearTimeout(decrementTime) };
        }, 1000)


    }
}

// select a random item from the questions array 

var currentQuestion = game.questions[Math.floor(Math.random()* game.questions.length)];

console.log(currentQuestion);

// display question first 

$('.question').html('<p id="question">' + currentQuestion.question + '</p>');

// display question timer

game.questionTimer(game.questions[0]);

// display answer choices 

for (let i = 0; i < currentQuestion.answerChoices.length; i++) {

    $('.answerChoices').append("<li class='choices'>" + currentQuestion.answerChoices[i].text + "</li>");

    console.log(currentQuestion.answerChoices[i].value);

    var val = currentQuestion.answerChoices[i].value;

    $('.answerChoices > li').last().attr('value', val);

}


// when a user clicks on an answer choice the answer timer should start

$('.answerChoices').on('click', function (event) {

    console.log(typeof $(event.target).attr('value'));

    if ($(event.target).attr('value') === 'true'){

        console.log('correct');

    // if wrong answer

    } else {

        console.log('incorrect')
    }

})


// when button is clicked to start the game 

// $('#startGame').on('click', function() {

//     game.questionTimer(game.questions[0]);
// });

//     // display the questions (one after another)

//     game.questions.forEach(function(index) {

//         console.log(index.question);

//         $('.question').html(index.question);

//         console.log(index.answerChoices);

//         $('.answerChoices').html(index.answerChoices);
//     });


//     game.questionTimer(game.questions[0]);
//     game.answerTimer(game.questions[1])

// });
