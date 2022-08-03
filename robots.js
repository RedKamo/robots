const battle = document.getElementById("battle-powers");
const pickButton = document.getElementById("pick-button");
const heavyBullets = document.getElementById("heavy-bullets");
const laserRays = document.getElementById("laser-rays");
const lightningShield = document.getElementById("shield");
const restartGame = document.getElementById("reload");

const avilablePets = document.getElementById("available-pets");
const dronePet = document.getElementById("drone");
const slugPet = document.getElementById("slug");
const observerPet = document.getElementById("observer");
const sentinelPet = document.getElementById("sentinel");
const steelPet = document.getElementById("steel");
const yourPet = document.getElementById("player-Pet");
const enemyPet = document.getElementById("enemy-Pet");

const showPlayerLives = document.getElementById("player-lives");
const showEnemyLives = document.getElementById("enemy-lives");

const powerPicked = document.getElementById("player-power");
const showYourPower = document.createElement("p");
const enemyPowerPicked = document.getElementById("enemy-power");
const showYourEnemyPower = document.createElement("p");
const showScore = document.getElementById("whoWin");
const showing = document.createElement("p");

const final = document.getElementById("whoWin");
const endBanner = document.createElement("p");

let playerAttack;
let enemyAttack;
let resultado;
let playerLives = 3;
let enemyLives = 3;

function startGame() {
  battle.style.display = "none";
  pickButton.addEventListener("click", pickPet);
  heavyBullets.addEventListener("click", bulletsAttack);
  laserRays.addEventListener("click", laserAttack);
  lightningShield.addEventListener("click", shieldAttack);
  restartGame.addEventListener("click", reloadGame);
}

function pickPet() {
  avilablePets.style.display = "none";
  battle.style.display = "block";

  if (dronePet.checked) {
    yourPet.innerHTML = "Drone";
  } else if (slugPet.checked) {
    yourPet.innerHTML = "Slug";
  } else if (observerPet.checked) {
    yourPet.innerHTML = "Observer";
  } else if (sentinelPet.checked) {
    yourPet.innerHTML = "Sentinel";
  } else if (steelPet.checked) {
    yourPet.innerHTML = "Steel";
  } else {
    alert("You must select a Pet ");
  }

  pickEnemyPet();
}

function pickEnemyPet() {
  let random = randomPower(1, 5);

  if (random == 1) {
    enemyPet.innerHTML = "Drone";
  } else if (random == 2) {
    enemyPet.innerHTML = "Slug";
  } else if (random == 3) {
    enemyPet.innerHTML = "Observer";
  } else if (random == 4) {
    enemyPet.innerHTML = "Sentinel";
  } else if (random == 5) {
    enemyPet.innerHTML = "Steel";
  }
}

function bulletsAttack() {
  playerAttack = "heavyBullets";
  randomEnemyAttack();
}

function laserAttack() {
  playerAttack = "laserRays";
  randomEnemyAttack();
}

function shieldAttack() {
  playerAttack = "lightningShield";
  randomEnemyAttack();
}

function randomEnemyAttack() {
  let randomAttack = randomPower(1, 3);

  if (randomAttack == 1) {
    enemyAttack = "heavyBullets";
  } else if (randomAttack == 2) {
    enemyAttack = "laserRays";
  } else if (randomAttack == 3) {
    enemyAttack = "lightningShield";
  }

  theWinnerIs();
}

function theWinnerIs() {
  if (playerAttack == enemyAttack) {
    resultado = "draw";
  } else if (
    (playerAttack == "heavyBullets" && enemyAttack == "lightningShield") ||
    (playerAttack == "laserRays" && enemyAttack == "heavyBullets") ||
    (playerAttack == "lightningShield" && enemyAttack == "laserRays")
  ) {
    resultado = "Your Pet wins";
    enemyLives--;
    showEnemyLives.innerHTML = enemyLives;
  } else {
    resultado = "Enemys Pet Wins";
    playerLives--;
    showPlayerLives.innerHTML = playerLives;
  }
  fight();
  checkLives();
}

function checkLives() {
  if (enemyLives == 0) {
    finalresult("VICTORY");
  } else if (playerLives == 0) {
    finalresult("DEFEAT");
  }
}

function finalresult(victoryOrDefeat) {
  endBanner.innerHTML = victoryOrDefeat;
  final.appendChild(endBanner);

  heavyBullets.disabled = true;
  laserRays.disabled = true;
  lightningShield.disabled = true;
}

/* function colorResult() {
  if (resultado == "draw") {
    resultado = document.getElementById("res-pet").style.backgroundColor =
      "#ffb443";
  } else if (resultado == "Your Pet wins") {
    resultado = document.getElementById("res-pet").style.backgroundColor =
      "##00ff75";
  } else {
    resultado = document.getElementById("res-pet").style.backgroundColor =
      "#ff5d5d";
  }
}
 */

function fight() {
  showYourPower.innerHTML = playerAttack;
  powerPicked.appendChild(showYourPower);

  showYourEnemyPower.innerHTML = enemyAttack;
  enemyPowerPicked.appendChild(showYourEnemyPower);

  showing.setAttribute("id", "res-pet");

  showing.innerHTML = resultado;
  showScore.appendChild(showing);
}

function reloadGame() {
  location.reload();
}

function randomPower(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", startGame);
