function PopulateScoreField() {
   var scoreField = document.getElementById("ScoreField");
   var score = sessionStorage.getItem("lastScore");
   if (score == null) {
      score = 0;
   }
   scoreField.value = score;
}

document.addEventListener("DOMContentLoaded", PopulateScoreField, false);