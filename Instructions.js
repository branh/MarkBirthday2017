function DisplayText(context, text, xPos, yPos) {
	context.fillStyle = "#000000";
	context.font = "30px Helvetica";
	context.fillText(text, xPos, yPos);
}

function DisplayUpArrow(context, xPos, yPos) {
	context.strokeRect(xPos, yPos, 30, 30);
	
	context.moveTo(xPos + 15, yPos + 25);
	context.lineTo(xPos + 15, yPos + 5);
	context.stroke();
	
	context.moveTo(xPos + 5, yPos + 15);
	context.lineTo(xPos + 15, yPos + 5);
	context.lineTo(xPos + 25, yPos + 15);
	context.stroke();
}

function DisplayDownArrow(context, xPos, yPos) {
	context.strokeRect(xPos, yPos, 30, 30);
	
	context.moveTo(xPos + 15, yPos + 25);
	context.lineTo(xPos + 15, yPos + 5);
	context.stroke();
	
	context.moveTo(xPos + 5, yPos + 15);
	context.lineTo(xPos + 15, yPos + 25);
	context.lineTo(xPos + 25, yPos + 15);
	context.stroke();
}

function DisplayInstructions() {
   var canvas = document.getElementById("IntroCanvas");
   var context = canvas.getContext("2d");
   context.fillStyle = "#A52A2A"; 
   context.fillRect(0, 0, 750, 400);
   
   DisplayText(context, "Defend the farm! Destroy the bandits! Cook!", 40, 100);
   DisplayText(context, "Press", 40, 170);
   DisplayUpArrow(context, 130, 140);
   DisplayText(context, "or", 170, 170);
   DisplayDownArrow(context, 210, 140);
   DisplayText(context, "to move.", 260, 170);
   
   DisplayText(context, "Press the space bar to shoot.", 40, 230);
}

document.addEventListener("DOMContentLoaded", DisplayInstructions, false);