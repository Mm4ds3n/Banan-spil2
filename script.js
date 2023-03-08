"use strict";
window.addEventListener("load", start);

// globale variabler 

let points = 0

let lives = 3;
const lowerLimit = 0;
const upperLimit = 3;


// start knap-event
document.querySelector("#btn_start").addEventListener("click", startGame);

function start() {  
  

  displayPoints();

  // Start animationer
  startAnimationer();

  // Start positioner
  startPositioner();

  // Registrer click
  registrerClick();
  
  
}


function startGame() {
  document.querySelector("#sound_jungle").volume = 0.05;
  document.querySelector("#sound_jungle").play();

   // skjul startskærm
   document.querySelector("#start").classList.add("hidden");
   startTimer();
 
   function startTimer() {
     // Sæt timer-animationen (shrink) i gang ved at tilføje klassen shrink til time_sprite
     document.querySelector("#time_sprite").classList.add("shrink");
 
     // Tilføj en eventlistener som lytter efter at animationen er færdig (animationend) og kalder funktionen timeIsUp
     document.querySelector("#time_sprite").addEventListener("animationend", timeIsUp);
 }
 function timeIsUp() {

 
   if (points >= 10) {
       levelComplete();
   } else {
       gameOver();
   }
 }
    // fjerner game_over 
  spilIgen()

}

function startAnimationer(){

  

  document.querySelector("#banana1_container").classList.add("falling");
  document.querySelector("#banana2_container").classList.add("falling");
  document.querySelector("#banana3_container").classList.add("falling");
  document.querySelector("#heart_container").classList.add("falling");
  document.querySelector("#snake_container").classList.add("falling");
// Registrer når bunden rammes
  document.querySelector("#banana1_container").addEventListener("animationiteration", bananaRestart); 
  document.querySelector("#banana2_container").addEventListener("animationiteration", bananaRestart);
  document.querySelector("#banana3_container").addEventListener("animationiteration", bananaRestart);
  document.querySelector("#heart_container").addEventListener("animationiteration", bananaRestart);
  document.querySelector("#snake_container").addEventListener("animationiteration", bananaRestart);
}

function startPositioner(){
  document.querySelector("#banana1_container").classList.add("position1");
  document.querySelector("#banana2_container").classList.add("position2");
  document.querySelector("#banana3_container").classList.add("position3");
  document.querySelector("#heart_container").classList.add("position4");
  document.querySelector("#snake_container").classList.add("position5");
}

function registrerClick(){
  document.querySelector("#banana1_container").addEventListener("click", clickBanana);
  document.querySelector("#banana2_container").addEventListener("click", clickBanana2);
  document.querySelector("#banana3_container").addEventListener("click", clickBanana3);
  document.querySelector("#snake_container").addEventListener("click", clickSnake);
  document.querySelector("#heart_container").addEventListener("click", clickHeart);
}

function bananaRestart(){
  let banana = this
  banana.classList.remove("falling");
  banana.offsetWidth; 
  banana.classList.add("falling");
  banana.classList.remove("position1", "position2", "position3", "position4", "position5");
  // giver banana1_container en random position
  let pos = Math.floor(Math.random()*5)+1;
  banana.classList.add("position"+pos);
}

function snakeRestart(){
  let snake = this
  snake.classList.remove("falling");
  snake.offsetWidth; 
  snake.classList.add("falling");
  snake.classList.remove("position1", "position2", "position3", "position4", "position5");
  // giver snake_container en random position
  let pos = Math.floor(Math.random()*5)+1;
  snake.classList.add("position"+pos);
}

function heartRestart(){
  let heart = this
  heart.classList.remove("falling");
  heart.offsetWidth; 
  heart.classList.add("falling");
  heart.classList.remove("position1", "position2", "position3", "position4", "position5");
  // giver heart_container en random position
  let pos = Math.floor(Math.random()*5)+1;
  heart.classList.add("position"+pos);
}



function displayPoints() {
  let myElement = document.querySelector("#point_count");
  myElement.textContent = points; 
}

 // point ved click
 function incrementPoints() {
  points++; 
  if (points>10){
    levelComplete()
  }
  displayPoints()
}

function clickHeart() {
  console.log("heart_gained!");

   // Liv-lyd-effekt
   document.querySelector("#life_sound").currentTime = 0;
   document.querySelector("#life_sound").volume = 0.2;
   document.querySelector("#life_sound").play()

  let heart = this

  lives++; // Tilføjer et liv til variablen lives ved click
  if (lives > upperLimit) { // sætter et max for variablen lives
    lives = upperLimit;
  }
  console.log(lives)

  // Fjerner klassen broken_heart ved forskellige betingelser så livet bliver synligt igen
  if (lives==3){
    document.querySelector("#heart3").classList.remove("broken_heart")
  }
  if (lives==2){
    document.querySelector("#heart2").classList.remove("broken_heart")
  }
  if (lives==1){
    document.querySelector("#heart1").classList.remove("broken_heart")
  }
  // Forhindr gentagne clicks
  heart.removeEventListener("click", clickHeart);
  
  // Stop heart_container
  heart.classList.add("paused");

  // sæt forsvind-animation på heart
  heart.querySelector("img").classList.add("zoom_out");

  // når forsvind-animation er færdig: heartGone
  heart.addEventListener("animationend", heartGone);
  
}function heartGone() {

  let heart = this
  // fjern event der bringer os herind
  heart.removeEventListener("animationend", heartGone);

  // fjern forsvind-animation
  heart.querySelector("img").classList.remove("zoom_out");
  
  // fjern pause
  heart.classList.remove("paused");

  // genstart falling animation
  heartRestart.call(this)

 

  // gør det muligt at klikke på heart igen
  document.querySelector("#heart_container").addEventListener("click", clickHeart);
}


function clickBanana() {

  // Banan-lyd-effekt
  document.querySelector("#banana_sound").currentTime = 0;
  document.querySelector("#banana_sound").play()

  incrementPoints()

  let banana = this
  // Forhindr gentagne clicks
  banana.removeEventListener("click", clickBanana);
  
  // Stop banana_container
  banana.classList.add("paused");

  // sæt forsvind-animation på banana
  banana.querySelector("img").classList.add("zoom_out");

  // når forsvind-animation er færdig: bananaGone
  banana.addEventListener("animationend", bananaGone);
  
}

function clickBanana2() {

  // Banan-lyd-effekt
  document.querySelector("#banana_sound").currentTime = 0;
  document.querySelector("#banana_sound").play()

  incrementPoints()

  let banana = this

  // Forhindr gentagne clicks
  banana.removeEventListener("click", clickBanana2);
  
  // Stop banana2_container
  banana.classList.add("paused");

  // sæt forsvind-animation på banana
  banana.querySelector("img").classList.add("zoom_out");

  // når forsvind-animation er færdig: bananaGone2
  banana.addEventListener("animationend", bananaGone2);
  
}

function clickBanana3() {

  // Banan-lyd-effekt
  document.querySelector("#banana_sound").currentTime = 0;
  document.querySelector("#banana_sound").play()

  incrementPoints()

  let banana = this

  // Forhindr gentagne clicks
  banana.removeEventListener("click", clickBanana3);
  
  // Stop banana3_container
  banana.classList.add("paused");

  // sæt forsvind-animation på banana
  banana.querySelector("img").classList.add("zoom_out");

  // når forsvind-animation er færdig: bananaGone3
  banana.addEventListener("animationend", bananaGone3);
  
}

function bananaGone() {

  let banana = this
  
  // fjern event der bringer os herind
  banana.removeEventListener("animationend", bananaGone);

  // fjern forsvind-animation
  banana.querySelector("img").classList.remove("zoom_out");
  
  // fjern pause
  banana.classList.remove("paused");

  // genstart falling animation
  bananaRestart.call(this)
  

  // gør det muligt at klikke på banana igen
  banana.addEventListener("click", clickBanana);
}

function bananaGone2() {

  let banana = this
  // fjern event der bringer os herind
  banana.removeEventListener("animationend", bananaGone2);

  // fjern forsvind-animation
  banana.querySelector("img").classList.remove("zoom_out");
  // fjern pause
  banana.classList.remove("paused");

  // genstart falling animation
  bananaRestart.call(this)

  // giver banana2_container en random position
  let pos = Math.floor(Math.random()*5)+1;
  banana.classList.add("position"+pos);

  // gør det muligt at klikke på coin igen
  banana.addEventListener("click", clickBanana2);

}

function bananaGone3() {

  let banana = this

  // fjern event der bringer os herind
  banana.removeEventListener("animationend", bananaGone3);

  // fjern forsvind-animation
  banana.querySelector("img").classList.remove("zoom_out")
  
  // fjern pause
  banana.classList.remove("paused");

  // genstart falling animation
  bananaRestart.call(this)

  // giver banana3_container en random position
  let pos = Math.floor(Math.random()*5)+1;
  banana.classList.add("position"+pos);

  // gør det muligt at klikke på banana igen
  banana.addEventListener("click", clickBanana3);

}

function clickSnake() {
  // lyd ved slange-klik
  document.querySelector("#snake_sound").volume = 1;
  document.querySelector("#snake_sound").currentTime = 0;
  document.querySelector("#snake_sound").play();
  let snake = this
  lives--;// Et liv bliver fratrukket variablen lives ved klik

  // Fjerner liv ved klik på bombe
  if (lives==2){
    document.querySelector("#heart3").classList.add("broken_heart")
  }
  if (lives==1){
    document.querySelector("#heart2").classList.add("broken_heart")
  }
  if (lives==0){
    document.querySelector("#heart1").classList.add("broken_heart")
  }
  if (lives<0){
    gameOver()

  }
  // Forhindr gentagne clicks
  snake.removeEventListener("click", clickSnake);
  
  // Stop coin container
  snake.classList.add("paused");

  // sæt forsvind-animation på coin
  snake.querySelector("img").classList.add("zoom_in");

  // når forsvind-animation er færdig: coinGone
  snake.addEventListener("animationend", snakeGone);
}

function snakeGone() {

  let snake = this
  // fjern event der bringer os herind
  snake.removeEventListener("animationend", snakeGone);

  // fjern forsvind-animation
  document.querySelector("#snake_sprite").classList.remove("zoom_in");
  
  // fjern pause
  snake.classList.remove("paused");

  // genstart falling animation
  snakeRestart.call(this)

  // gør det muligt at klikke på coin igen
  snake.addEventListener("click", clickSnake);
}

// function der fjerner hidden attributen fra game_over
function gameOver() {


  //lyd på game_over

  document.querySelector("#sound_lose").play();

  document.querySelector("#time_sprite").classList.remove("shrink");
  
  document.querySelector("#game_over").classList.remove("hidden")

  


  // knappen spil_igen kalder funktionen spilIgen() 
  document.getElementById("btn_spiligen").addEventListener("click", startGame)
}

function spilIgen(){
  
  // Nulstil liv
  lives = 3;
  
  // Nulstil point
  points = 0

  // genstater liv ikonerne
    document.querySelector("#heart3").classList.remove("broken_heart")
    document.querySelector("#heart2").classList.remove("broken_heart")
    document.querySelector("#heart1").classList.remove("broken_heart")

  // Fjern game_over klassen
  document.querySelector("#game_over").classList.add('hidden');
  
  // Fjern level_complete skærmen
  document.querySelector("#level_complete").classList.add('hidden');

  document.querySelector("#time_sprite").classList.add("shrink");


  
}

function stopGame() {
    // Stop animationer
    document.querySelector("#banana1_container").classList.remove("falling");
    document.querySelector("#banana2_container").classList.remove("falling");
    document.querySelector("#banana3_container").classList.remove("falling");
    document.querySelector("#snake_container").classList.remove("falling");
    document.querySelector("#heart_container").classList.remove("falling");

    // Fjern click
    document.querySelector("#banana1_container").removeEventListener("click", clickBanana);
    document.querySelector("#banana2_container").removeEventListener("click", clickBanana2);
    document.querySelector("#banana3_container").removeEventListener("click", clickBanana3);
    document.querySelector("#snake_container").removeEventListener("click", clickSnake);
    document.querySelector("#heart_container").removeEventListener("click", clickHeart);
}


function levelComplete(){
  console.log("Level Complete")
  document.querySelector("#level_complete").classList.remove("hidden")
  document.querySelector("#time_sprite").classList.remove("shrink");

  // sætter lyd på

  document.querySelector("#sound_win").play()

  // sætter points til 0 igen

  points = 0

  // knappen spil_igen kalder funktionen spilIgen() 
  document.getElementById("btn_back").addEventListener("click", startGame)
}