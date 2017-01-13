var score = 0;
var lives = 3;

var player = {
	xPos : 130,
	yPos : 200,
	radius : 10,
	color : "green",
	speed : 0
}

var bandits = [];

var arrows = [];
// Use push to add to the array.
// Use shift to remove when they get to the end of the screen.
// Use splice to remove when they hit an enemy.
// Or is this super unperformant.

var gameArea = {
   // When called from the event handler, this refers to document, not gameArea.
   start : function() {
      gameArea.canvas = document.getElementById("GameCanvas");
      gameArea.context = gameArea.canvas.getContext("2d");
      gameArea.interval = setInterval(updateGameState, 20);
   }
}

function updateGameState() {
	UpdatePositions();
	DrawBackground();
	DrawObjects();
}

function UpdatePlayerPosition() {
   player.yPos = player.yPos + player.speed;
   if (player.yPos < 0) {
      player.yPos = 0;
   }
   if (player.yPos > 400) {
      player.yPos = 400;
   }
}

function UpdateBanditPosition(object, speed) {
   object.xPos = object.xPos - speed;
   // TODO: Check loss condition.
   // TODO: Check death by arrow.
}

function UpdatePositions() {
   UpdatePlayerPosition();
   for (var i = 0; i < bandits.length; ++i) {
      UpdateBanditPosition(bandits[i], 1);
   }
   
   while (arrows.length > 0 && arrows[0].xPos > 750) {
      arrows.shift();
   }
   for (var i = 0; i < arrows.length; ++i) {
      arrows[i].xPos = arrows[i].xPos + 1;
   }
}

function DrawBackground() {
   var context = gameArea.context;
   var backgroundGradient = context.createRadialGradient(375, 200, 250, 375, 200, 750);
   backgroundGradient.addColorStop(0, "#993300");
   backgroundGradient.addColorStop(0.90, "#ffbb99");
   context.fillStyle = backgroundGradient; 
   context.fillRect(0, 0, 750, 400);
   
   context.strokeRect(0, 50, 100, 140);
   context.strokeRect(0, 210, 100, 140);
}

function DrawCircle(object) {
   gameArea.context.fillStyle = object.color;
   gameArea.context.beginPath();
   gameArea.context.arc(object.xPos, object.yPos, object.radius, 0, 2 * Math.PI);
   gameArea.context.fill();
}

function DrawObjects() {
   DrawCircle(player);
}

document.addEventListener("DOMContentLoaded", gameArea.start, false);
window.addEventListener("keydown", function(e) {
   if (e.keyCode == 38) {
      player.speed = 1;
   } else if (e.keyCode == 40) {
      player.speed = -1;	   
   } else if (e.keyCode == 32) {
      var newArrow = {
         xPos : player.xPos,
		 yPos : player.yPos,
         length : 5,
	  };
      arrows.push(newArrow); 
   }
});
window.addEventListener("keyup", function(e) {
   if (e.keyCode == 38 || e.keyCode == 40) {
      player.speed = 0;
   }
});