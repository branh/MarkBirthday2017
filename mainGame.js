var score = 0;
var lives = 3;
var gameOver = false;

var banditFrequency = 75;
var bossFrequency = 375;
var framesSinceLastBandit = 40;
var framesSinceLastBoss = 200;
var framesSinceLastArrow = 100;

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

function Reset() {
   score = 0;
   lives = 3;
   gameOver = false;
   
   player.yPos = 200;
   bandits = [];
   arrows = [];
   
   banditFrequency = 75;
   bossFrequency = 375;
   framesSinceLastBandit = 40;
   framesSinceLastBoss = 200;
   framesSinceLastArrow = 100;

   gameArea.interval = setInterval(updateGameState, 20);   
}

var gameArea = {
   // When called from the event handler, this refers to document, not gameArea.
   start : function() {
      gameArea.canvas = document.getElementById("GameCanvas");
      gameArea.context = gameArea.canvas.getContext("2d");
      gameArea.interval = setInterval(updateGameState, 20);
   },
   
   end : function() {
      gameOver = true;
      gameArea.context.fillStyle = "Black";
      gameArea.context.font = "30 px Helvetica";
      gameArea.context.textAlign = "center";
      gameArea.context.fillText("Game over!", gameArea.canvas.width/2, gameArea.canvas.height/2); 
	  gameArea.context.fillText("Press any letter to start.",  gameArea.canvas.width/2, gameArea.canvas.height/2 + 45);
   }
}

function updateGameState() {
   var tempScore = score;
   UpdatePositions();
   DrawBackground();
   DrawObjects();

   if (lives <= 0) {
      clearInterval(gameArea.interval);
	  gameArea.end();
   } else if (tempScore < score) {
      banditFrequency = Math.max(30, 75 - (score / 10));
      bossFrequency = Math.max(45, 375 - (score / 5));
   }
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

// Returns false if the bandit should be removed from the board.
function UpdateBanditPosition(object, speed) {
   object.xPos = object.xPos - speed;
   if (object.xPos < 110) {
      lives--;
	  return false;
   }

   // Check death by arrow.
   for (var i = 0; i < arrows.length && arrows[i].xPos >= object.xPos; ++i) {
      if (arrows[i].xPos >= (object.xPos - object.radius) &&
          arrows[i].yPos >= (object.yPos - object.radius) &&
          arrows[i].yPos <= (object.yPos + object.radius)) {
         arrows.splice(i, 1);
		 object.life = object.life - 1;
      }
   }
   
   if (object.life <= 0) {
      score += object.pointVal;
      return false;	  
   }
   return true;
}

function UpdatePositions() {
   UpdatePlayerPosition();
   framesSinceLastBandit++;
   framesSinceLastBoss++;
   framesSinceLastArrow++;
   if (framesSinceLastBandit >= banditFrequency) {
      framesSinceLastBandit = 0;
      banditYPos = Math.floor(400 * Math.random());
	  var newBandit = {
         xPos : 750,
		 yPos : banditYPos,
         radius: 10,
		 color: "black",
         pointVal : 5,
		 life : 1
	  };
      bandits.push(newBandit);
   }
   
   if (framesSinceLastBoss >= bossFrequency) {
      framesSinceLastBoss = 0;
	  banditYPos = Math.floor(400 * Math.random());
	  var newBoss = {
         xPos : 750,
         yPos : banditYPos,
         radius : 8,
		 color : "blue",
         pointVal : 15,
         life : 2
      }
	  var newBossShell = {
         xPos : 750,
         yPos : banditYPos,
         radius : 12,
         color : "LightBlue",
         pointVal : 0,
         life : 3	 
      }
      bandits.push(newBossShell);
      bandits.push(newBoss);
   }
   
   while (arrows.length > 0 && arrows[0].xPos > 750) {
      arrows.shift();
   }
   for (var i = 0; i < arrows.length; ++i) {
      arrows[i].xPos = arrows[i].xPos + 2;
   }
   
   for (var i = 0; i < bandits.length; ++i) {
      if (!UpdateBanditPosition(bandits[i], 0.75)) {
         bandits.splice(i, 1);
      }
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

function DisplayText(context, text, xPos, yPos) {
	context.fillStyle = "#000000";
	context.font = "12px Helvetica";
	context.textAlign = "left";
	context.fillText(text, xPos, yPos);
}

function DrawLives() {
   gameArea.context.fillStyle = "red";
   for (var i = 0; i < lives; ++i) {
      gameArea.context.beginPath();
      gameArea.context.moveTo(20 + (i * 40), 35);
      gameArea.context.lineTo(10 + (i * 40), 20);
      gameArea.context.arc(15 + (i * 40), 20, 5, Math.PI, 2 * Math.PI);
      gameArea.context.arc(25 + (i * 40), 20, 5, Math.PI, 2 * Math.PI);
      gameArea.context.lineTo(20 + (i * 40), 35);
      gameArea.context.fill();
   }
}

function DrawObjects() {
   DrawLives();
   DisplayText(gameArea.context, score.toString(), 650, 30);
   DrawCircle(player);
   for (var i = 0; i < bandits.length; ++i) {
      DrawCircle(bandits[i]);
   }
   
   gameArea.context.strokeStyle = "black";
   for (var i = 0; i < arrows.length; ++i) {
      gameArea.context.moveTo(arrows[i].xPos - 5, arrows[i].yPos);
      gameArea.context.lineTo(arrows[i].xPos, arrows[i].yPos);
      gameArea.context.stroke();
	
      gameArea.context.moveTo(arrows[i].xPos - 2, arrows[i].yPos - 3);
      gameArea.context.lineTo(arrows[i].xPos, arrows[i].yPos);
      gameArea.context.lineTo(arrows[i].xPos - 2, arrows[i].yPos + 3);
      gameArea.context.stroke();
	}
}

document.addEventListener("DOMContentLoaded", gameArea.start, false);
window.addEventListener("keydown", function(e) {
   if (gameOver == false) {
      if (e.keyCode == 38) {
         player.speed = -2;
      } else if (e.keyCode == 40) {
         player.speed = 2;	   
      } else if (e.keyCode == 32) {
         if (framesSinceLastArrow > 10) {
		    framesSinceLastArrow = 0;
            var newArrow = {
               xPos : player.xPos,
		       yPos : player.yPos,
	        };
            arrows.push(newArrow);
	     }
      }
   } else if (e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 32) {
      Reset();
   }
});
window.addEventListener("keyup", function(e) {
   if (e.keyCode == 38 || e.keyCode == 40) {
      player.speed = 0;
   }
});