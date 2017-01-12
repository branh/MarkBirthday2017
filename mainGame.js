var score = 0;
var lives = 3;

function UpdatePositions() {
	// TODO
}

function DrawBackground(context) {
   var backgroundGradient = context.createRadialGradient(375, 200, 250, 375, 200, 750);
   backgroundGradient.addColorStop(0, "#993300");
   backgroundGradient.addColorStop(0.90, "#ffbb99");
   context.fillStyle = backgroundGradient; 
   context.fillRect(0, 0, 750, 400);
}

function DrawObjects(context) {
	// TODO
}

function GameLoop() {
   var canvas = document.getElementById("GameCanvas");
   var context = canvas.getContext("2d");
   
   //while (lives > 0) {
	   UpdatePositions();
	   DrawBackground(context);
	   DrawObjects(context);
   //}
}

document.addEventListener("DOMContentLoaded", GameLoop, false);