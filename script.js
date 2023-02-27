"use strict";
window.addEventListener("load", start);

let points = 5

let lives = 3

function start() {
  console.log("JavaScript kører!");

  

  displayPoints();
  // Start animationer
  document.querySelector("#coin1_container").classList.add("falling");
  document.querySelector("#bomb_container").classList.add("falling");

  // Registrer click
  document.querySelector("#coin1_container").addEventListener("click", clickCoin);
  document.querySelector("#coin2_container").addEventListener("click", clickCoin2);
  document.querySelector("#coin3_container").addEventListener("click", clickCoin);
  document.querySelector("#bomb_container").addEventListener("click", clickBomb);
}

function displayPoints() {
  let myElement = document.querySelector("#coin_count");
  myElement.textContent = points.toString(); // er i tvivl om hvad den gør 
}

 // point ved click
 function incrementPoints() {
  points++;
  displayPoints()
}

function clickCoin() {
  console.log("Click coin");

  incrementPoints()

  // Forhindr gentagne clicks
  document.querySelector("#coin1_container").removeEventListener("click", clickCoin);
  
  // Stop coin container
  document.querySelector("#coin1_container").classList.add("paused");

  // sæt forsvind-animation på coin
  document.querySelector("#coin1_sprite").classList.add("zoom_out");

  // når forsvind-animation er færdig: coinGone
  document.querySelector("#coin1_container").addEventListener("animationend", coinGone);
  
}

function clickCoin2() {
  console.log("Click coin2");

  incrementPoints()

  // Forhindr gentagne clicks
  document.querySelector("#coin2_container").removeEventListener("click", clickCoin);
  
  // Stop coin container
  document.querySelector("#coin2_container").classList.add("paused");

  // sæt forsvind-animation på coin
  document.querySelector("#coin2_sprite").classList.add("zoom_out");

  // når forsvind-animation er færdig: coinGone
  document.querySelector("#coin2_container").addEventListener("animationend", coinGone2);
  
}

function coinGone() {
  // fjern event der bringer os herind
  document.querySelector("#coin1_container").removeEventListener("animationend", coinGone);

  // fjern forsvind-animation
  document.querySelector("#coin1_sprite").classList.remove("zoom_out");
  
  // fjern pause
  document.querySelector("#coin1_container").classList.remove("paused");

  // genstart falling animation
  document.querySelector("#coin1_container").classList.remove("falling");
  document.querySelector("#coin1_container").offsetWidth; // hvad gør denne ? Jeg kan ved at fjerne den se at den starter fra samme position som der blev klikket fra sidst og ikke fra toppen.
  document.querySelector("#coin1_container").classList.add("falling");

  // gør det muligt at klikke på coin igen
  document.querySelector("#coin1_container").addEventListener("click", clickCoin);
}

function coinGone2() {
  // fjern event der bringer os herind
  document.querySelector("#coin2_container").removeEventListener("animationend", coinGone);

  // fjern forsvind-animation
  document.querySelector("#coin2_sprite").classList.remove("zoom_out");
  
  // fjern pause
  document.querySelector("#coin2_container").classList.remove("paused");

  // genstart falling animation
  document.querySelector("#coin2_container").classList.remove("falling");
  document.querySelector("#coin2_container").offsetWidth; // hvad gør denne ? Jeg kan ved at fjerne den se at den starter fra samme position som der blev klikket fra sidst og ikke fra toppen.
  document.querySelector("#coin2_container").classList.add("falling");

  // gør det muligt at klikke på coin igen
  document.querySelector("#coin2_container").addEventListener("click", clickCoin);
}

function clickBomb() {
  console.log("Click bomb");

  lives--;
  console.log(lives)
  if (lives==0){
    document.querySelector("#heart3").classList.add("hide_heart")
  }
  if (lives==2){
    document.querySelector("#heart2").classList.add("hide_heart")
  }
  if (lives==1){
    document.querySelector("#heart1").classList.add("hide_heart")
  }

  // Forhindr gentagne clicks
  document.querySelector("#bomb_container").removeEventListener("click", clickBomb);
  
  // Stop coin container
  document.querySelector("#bomb_container").classList.add("paused");

  // sæt forsvind-animation på coin
  document.querySelector("#bomb_sprite").classList.add("zoom_in");

  // når forsvind-animation er færdig: coinGone
  document.querySelector("#bomb_container").addEventListener("animationend", bombGone);
  
}

function bombGone() {
  // fjern event der bringer os herind
  document.querySelector("#bomb_container").removeEventListener("animationend", bombGone);

  // fjern forsvind-animation
  document.querySelector("#bomb_sprite").classList.remove("zoom_in");
  
  // fjern pause
  document.querySelector("#bomb_container").classList.remove("paused");

  // genstart falling animation
  document.querySelector("#bomb_container").classList.remove("falling");
  document.querySelector("#bomb_container").offsetWidth;
  document.querySelector("#bomb_container").classList.add("falling");

  // gør det muligt at klikke på coin igen
  document.querySelector("#bomb_container").addEventListener("click", clickBomb);
}

