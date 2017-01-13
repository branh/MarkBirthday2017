var score = 0;
var lives = 3;

var player = {
	xPos : 130,
	yPos : 200,
	radius : 10,
	color : "green"
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

function UpdatePositions() {
	// TODO
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