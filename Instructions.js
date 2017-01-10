function DisplayText(context, text, xPos, yPos) {
	context.fillStyle = "#000000";
	context.font = "30px Helvetica";
	context.fillText(text, xPos, yPos);
}

function DisplayInstructions() {
   var canvas = document.getElementById("IntroCanvas");
   var context = canvas.getContext("2d");
   context.fillStyle = "#A52A2A";
   context.fillRect(0, 0, 750, 400);
   
   DisplayText(context, "Press", 40, 100);
   context.strokeRect(130, 80, 30, 30);
   context.moveTo(145, 120);
   context.lineTo(145, 85);
   context.stroke();
}

document.addEventListener("DOMContentLoaded", DisplayInstructions, false);