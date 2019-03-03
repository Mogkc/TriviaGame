var questions = [
    { q: "What is the Trivium?", a: "Medieval college curiculum", b: "Something that doesn't matter", c: "Another name for the illuminati", d: "A committee of three people", actual: "a" },
    { q: "What doesn't the Trivium cover?", a: "Logic", b: "Grammar", c: "Astronomy", d: "Rhetoric", actual: "c" },
    { q: "Why is the Trivium important?", a: "It isn't", b: "It teaches how to identify bad faith arguments", c: "English teachers care about it", d: "It's a prerequisite for math classes", actual: "b" }
];

var correct;
var currQues;
var seconds = -1;
//Game doesn't start until they click start
var gameOver = true;
//Start the timer once, use continuously!!!
var countDown = function () {
    seconds--;
    $("#time").text(seconds);
    if (seconds === 0) {
        outOfTime();
    }
}

setInterval(countDown, 1000);


var outOfTime = function () {
    $("#fin").text("Out of Time!");
    $("#chosen").text("You didn't chose any answer");
    $("#correct").text("The correct answer was: " + $("#" + questions[currQues].actual).text());
    show();

    nextQuestion();
}

var newGame = function () {
    //Reset values
    gameOver = false;
    correct = 0;
    currQues = -1;
    //Start the first question
    nextQuestion();
    hide();
}

var nextQuestion = function () {
    currQues++;
    if (currQues < questions.length) {
        //Display next question
        $("#question").text(questions[currQues].q);
        $("#a").text(questions[currQues].a);
        $("#b").text(questions[currQues].b);
        $("#c").text(questions[currQues].c);
        $("#d").text(questions[currQues].d);
        //Change question timer from max value
        seconds = 31;
    } else {
        gameOver = true;
        prepFinal();
        show();
    }
}

var prepFinal = function () {
    $("#fin").text("Game Over!");
    $("#chosen").text("You got " + correct + " questions right!");
    $("#correct").text("There were " + questions.length + " questions total.");
}

var show = function () {
    $("#results").css("z-index", 1);
    if (gameOver) {
        $("#new-game").css("display", "block");
    }
    setTimeout(hide, 5000);
}

var hide = function () {
    if (!gameOver) {
        $("#results").css("z-index", -1);
    }
}

$(".ans").on("click", function (event) {
    var ans = questions[currQues].actual;
    if (event.target.id === ans) {
        $("#fin").text("Correct!");
        correct++;
    } else {
        $("#fin").text("Incorrect");
    }
    $("#chosen").text("You chose " + $(event.target).text());
    $("#correct").text("The correct answer was: " + $("#" + ans).text());
    show();

    nextQuestion();
});

$("#new-game").on("click", function () {
    newGame();
    $("#new-game").css("display", "none");
})