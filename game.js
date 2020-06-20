var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

//Sound function
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
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


//The Game
$(document).one("keydown", playgame);
$(document).on("pagecreate","#pageone",function(){
  $(document).one("swipe",playgame);
});

function playgame() {
  nextSequence();
  $(".btn").on("click",userInput);
  $(document).on("pagecreate","#pageone",function(){
  $(".btn").on("tap", userInput);
});
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
      $("#level-title").text("Game Over, Press any key or Swipe left/right to Restart!");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

      $(".btn").off("click");
      $(document).on("pagecreate","#pageone",function(){
      $(".btn").off("tap");
    });
      $(document).one("keydown", playgame);
      $(document).on("pagecreate","#pageone",function(){
        $(document).one("swipe",playgame);
      });
      resetValues();
    }
  }
}
