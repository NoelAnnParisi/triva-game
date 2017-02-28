var statusOfGame = false;
var wrong = 0;
var right = 0;
var unanswered = 0;
var time;
var answerTime;
var decreasedQuestionTime;
var decreasedAnswerTime;

var gameObject = {

    questionOne: {

        question: "Question One?",

        answer: 'answer 1',

        q1: {

            A: '<li class="answer">answer option one</li>',

            B: '<li> answer option</li>',

            C: '<li> answer option</li>',

            D: '<li> answer option</li>'

        },

        answered: ''

    },

    questionTwo: {


        question: "question Two?",

        answer: "answer 2",

        q2: {

            A: '<li class="answer">answer option one</li>',

            B: '<li> answer option 2</li>',

            C: '<li> answer option 2</li>',

            D: '<li> answer option 2</li>'

        },

        answered: ''

    },


    questionThree: {


        question: "question Three?",

        answer: "answer 3",

        q3: {

            A: '<li class="answer">answer option one</li>',

            B: '<li> answer option 3</li>',

            C: '<li> answer option </li>',

            D: '<li> answer option</li>'

        },

        answered: ''

    },

    questionFour: {


        question: "question Four?",

        answer: "answer 4",

        q4: {

            A: '<li class="answer">answer option one</li>',

            B: '<li> answer option 4</li>',

            C: '<li> answer option</li>',

            D: '<li> answer option</li>'

        },

        answered: ''

    },

    questionFive: {


        question: "question Five?",

        answer: "answer 5",

        q5: {

            A: '<li class="answer">answer option one</li>',

            B: '<li> answer option 5</li>',

            C: '<li> answer option</li>',

            D: '<li> answer option</li>'

        },

        answered: ''

    },


    questionSix: {


        question: "question Six?",

        answer: "answer 6",

        q6: {

            A: '<li class="answer">answer option one</li>',

            B: '<li> answer option 6</li>',

            C: '<li> answer option</li>',

            D: '<li> answer option</li>'

        },

        answered: ''

    },

    questionSeven: {


        question: "question Seven?",

        answer: "answer 7",

        q7: {

            A: '<li class="answer">answer option one</li>',

            B: '<li> answer option 7</li>',

            C: '<li> answer option</li>',

            D: '<li> answer option</li>'

        },

        answered: ''

    },

    questionEight: {


        question: "question Eight?",

        answer: "answer 8",

        q8: {

            A: '<li class="answer">answer option one</li>',

            B: '<li> answer option 8</li>',

            C: '<li> answer option</li>',

            D: '<li> answer option</li>'

        },

        answered: ''

    },


};

var displayQuestions = function(object) {

    for (let questions in object) {

        $('.question').append(object[questions]);

    }

};

var displayChoices = function(object) {

    for (let choice in object) {

        $('.answerChoices').append(object[choice]);

        // list style type none
    }

};


var beginGame = function beginGame() {

    time = 31;

    startQuestionTimer();

    $('#startGame').hide();

    displayQuestions(gameObject.questionOne.question);

    displayChoices(gameObject.questionOne.q1);

    $('.answer').on('click', function() {

        answerTime = 6

        answeredTimer();

        startAnswerTimer();

        clearTimeout(decreasedQuestionTime);

        $('.question-timer').empty();

    });

};




var questionTimer = function timer() {

    time -= 1;

    $('.question-timer').html(time);

    if (time <= 0) {

        alert("you are out of time!");
        return;

    }
};

var startQuestionTimer = function() {

    decreasedQuestionTime = setInterval(questionTimer, 1000);

}


var answeredTimer = function() {

    answerTime -= 1;

    $('.answer-timer').html(answerTime);

    if (answerTime <= 0) {

        clearTimeout(decreasedQuestionTime);

        clearTimeout(decreasedAnswerTime);

        $('.question').empty();

        $('.answerChoices').empty();

        displayQuestions(gameObject.questionTwo.question);

        displayChoices(gameObject.questionTwo.q2);


    }

};

var startAnswerTimer = function() {

    decreasedAnswerTime = setInterval(answeredTimer, 1000);
}


$('#startGame').on('click', function() {

    beginGame();

});




// when the correct answer is guessed a message and image will appear and
// a timer is set for about 5 seconds and then the next question is asked
// when an incorrect answer is pressed same protocol as correct but "WRONG Answer" appears

// when no answer is chosen by the time the timer is up similar protocol as above

// after the timer is up on on either of the three screens above move onto next ?
// create play again button
// when pressed the triva game restarts (stats reset)
