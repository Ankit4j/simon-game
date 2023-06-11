
let userClickedPattern = [];
let gamePattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;

$(document).keydown(function () {
    if(!started) {
        nextSequence();
        started = true;
    }
});


function nextSequence() {
    $("#level-title").text("Level " + level);
    level++;
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}


$(".btn").click(function() {
    
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length - 1);
});



 function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if(userClickedPattern.length === gamePattern.length) {
            
            console.log("stage complete");
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");

        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        startOver();
        console.log("wrong");
    }
 }

    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }

    function playSound(name) {
        let audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }

    function animatePress(currentColour) {

        $("#" + currentColour).addClass("pressed");
        setTimeout( function() {
        $("#" + currentColour).removeClass("pressed");
        },100);
    }

