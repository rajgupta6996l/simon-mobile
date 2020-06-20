var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var game=0;

//Text Pulsate
function pulsate(){
  while(game<50){
    $("#level-title").fadeOut(1000).fadeIn(1000);
    game++;
  }
}
pulsate();

//Sound function
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play()
}
//Random button animation
function buttonFlash(name) {
  $("#" + name).fadeOut(100).fadeIn(100);
}
//User-clicked button animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}
//Reset Value Function
function resetValues() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  buttonFlash(randomChosenColor);
  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];
};

// The Game
$("body").one("swipe", playgame);

function playgame() {
  $("#level-title").stop(true).fadeIn();
  nextSequence();
  $(".btn").on("tap",userInput);
  function userInput() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  }

  function checkAnswer(currentClicked) {
    if (userClickedPattern[currentClicked] === gamePattern[currentClicked]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("#level-title").text("Game Over, Swipe left or right to Restart!");
      game=0;
      pulsate();
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

      $(".btn").off("tap");
      $("body").one("swipe",playgame);
      resetValues();
    }
  }
}
