var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var level = 0;
var started = false;

var gamePattern = [];

$(document).on("keydown", function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".button").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    makeSound(userChosenColor);
    animateButton(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * (4 - 0) + 0);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColor);
}

function startOver () {
    level = 0;
    gamePattern = [];
    started = false;
}

function makeSound(key) {
    var audio = new Audio("sounds/" + key + ".mp3");
    audio.play();
}

function animateButton(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        makeSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game over, Press Any Key to Restart");
        startOver();
    }
}

$(".home").on("click", function() {
    window.location.replace("index.html");
});

$(".play").on("click", function() {
    window.location.replace("howToPlay.html");
});