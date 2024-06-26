var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var randomNumber;
var userClickedPattern=[];
var started=false;
var level=0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        gameSequence();
        started=true;
    }
});
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                gameSequence();
            },1000);
        }
    }
        else{
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key To Restart");

            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
        
            startOver();
        }
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
function gameSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    var a=Math.random();
    randomNumber=Math.floor(a*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

