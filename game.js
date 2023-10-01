let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

$(document).keypress(function (e) {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").on("click", function () {
    let userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)
});



function nextSequence() {
    userClickedPattern = []
    // started=true;
    level++;
    $("#level-title").text("Level " + level);
    console.log(level)
    let sequence = (Math.floor(Math.random() * 4));
    let randomChosenColor = buttonColors[sequence];
    gamePattern.push(randomChosenColor)
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    // animatePress(randomChosenColor);
    playSound(randomChosenColor)


}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }

    }
    else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart")

        startOver();

    }
}


function playSound(name) {
    let aud = new Audio("sounds/" + name + ".mp3")
    aud.play();
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}
