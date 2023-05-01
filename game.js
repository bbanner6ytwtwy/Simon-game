var level = 0;
var userClickedPattern = [];
var buttonColours = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var started = false;

function animatePress(name) {
    
        $("#" + name).addClass("pressed");
   
    setTimeout(() => {
        $("#" + name).removeClass("pressed");
    }, 200);
}

function playMusic(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } 
    else {
      playMusic("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();

    }
}

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
    playMusic(randomChosenColour);
    animatePress(randomChosenColour);
    level++;
    console.log(gamePattern);


    $("#level-title").text("Level " + level);
}

$(".btn").click(() => {
    
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playMusic(userChosenColour);
    animatePress(userChosenColour);

    console.log(userClickedPattern.length - 1);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);

});

$("body").keypress(() => {
    if (!started) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
});



function startOver() {
    level = 0;
    gamePattern = []
    started = false;
}

