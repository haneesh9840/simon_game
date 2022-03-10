var gamepattern = [];
var userclickedpattern = [];

function nextseq() {
    userclickedpattern = [];

    $("#title-heading").text("Level " + level);
    level++;
    var rand = Math.floor(Math.random() * 4)
    var colors = ["red", "blue", "green", "yellow"]
    var colorchoosen = colors[rand];
    gamepattern.push(colorchoosen);

    var audio = new Audio("sounds/" + colorchoosen + ".mp3")
    audio.play()
    $("." + colorchoosen).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}
var level = 0;
$(document).on("keypress", () => {
    if (level === 0) {
        nextseq();
    }

})

function animate() {
    $("." + this.id).addClass("pressed")
    setTimeout(() => {
        $("." + this.id).removeClass("pressed")
    }, 100)
}
$(".btn").on("click", function() {
    userclickedpattern.push(this.id);
    var audio = new Audio("sounds/" + this.id + ".mp3")
    audio.play()
    animate()
    compare(userclickedpattern.length - 1);
});


function compare(index) {
    if (gamepattern[index] === userclickedpattern[index]) {
        if (userclickedpattern.length === gamepattern.length) {
            setTimeout(function() {
                nextseq();
            }, 1000);
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3")
        audio.play()
        $("body").addClass("game-over");
        $("#title-heading").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamepattern = [];
}