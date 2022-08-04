const battle = document.getElementById("battle-powers");
const pickButton = document.getElementById("pick-button");
const restartGame = document.getElementById("reload");

const avilablePets = document.getElementById("available-pets");
const yourPet = document.getElementById("player-Pet");
const yourPetImage = document.getElementById("player-img");
const enemyPet = document.getElementById("enemy-Pet");
const enemyPetImage = document.getElementById("enemy-img");

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
const robotsCard = document.getElementById("robot-card");
const robotsPowersContainer = document.getElementById("robots-container");

let robots = [];
let robotOption;
let playerAttack = [];
let enemyAttack;
let dronePet;
let slugPet;
let observerPet;
let sentinelPet;
let steelPet;
let playerRobot;
let robotsAttacks;
let heavyBullets;
let laserRays;
let lightningShield;
let bts = [];

let playerLives = 3;
let enemyLives = 3;

class Robot {
  constructor(name, image, life) {
    this.name = name;
    this.image = image;
    this.life = life;
    this.attacks = [];
  }
}

let drone = new Robot("Drone", "assets/Drone.png", 3);
let slug = new Robot("Slug", "assets/Metal-Slug.png", 3);
let observer = new Robot("Observer", "assets/observer.png", 3);
let sentinel = new Robot("Sentinel", "assets/Sentinel.png", 3);
let steel = new Robot("Steel", "assets/steel-eagle.png", 3);

drone.attacks.push(
  { name: "🔫", id: "heavy-bullets" },
  { name: "🔫", id: "heavy-bullets" },
  { name: "⚡", id: "laser-rays" }
);

slug.attacks.push(
  { name: "☔", id: "shield" },
  { name: "☔", id: "shield" },
  { name: "🔫", id: "heavy-bullets" }
);

observer.attacks.push(
  { name: "⚡", id: "laser-rays" },
  { name: "⚡", id: "laser-rays" },
  { name: "☔", id: "shield" }
);

sentinel.attacks.push(
  { name: "⚡", id: "laser-rays" },
  { name: "🔫", id: "heavy-bullets" },
  { name: "☔", id: "shield" }
);

steel.attacks.push(
  { name: "⚡", id: "laser-rays" },
  { name: "⚡", id: "laser-rays" },
  { name: "⚡", id: "laser-rays" }
);

robots.push(drone, slug, observer, sentinel, steel);

function startGame() {
  battle.style.display = "none";

  robots.forEach((robot) => {
    robotOption = `
    <label htmlFor=${robot.name} class="pets-card">
      <input type="radio" name="pet" id=${robot.name} alt="" />
      <img src=${robot.image} alt=${robot.name} />
      <p>${robot.name}</p>
    </label>
  `;
    robotsCard.innerHTML += robotOption;

    dronePet = document.getElementById("Drone");
    slugPet = document.getElementById("Slug");
    observerPet = document.getElementById("Observer");
    sentinelPet = document.getElementById("Sentinel");
    steelPet = document.getElementById("Steel");
  });

  pickButton.addEventListener("click", pickPet);

  restartGame.addEventListener("click", reloadGame);
}

function pickPet() {
  avilablePets.style.display = "none";
  battle.style.display = "block";

  if (dronePet.checked) {
    yourPet.innerHTML = dronePet.id;
    playerRobot = dronePet.id;
    image = `<img src=${drone.image} alt=${drone.nombre}>`;
    yourPetImage.innerHTML = image;
  } else if (slugPet.checked) {
    yourPet.innerHTML = slugPet.id;
    playerRobot = slugPet.id;
    image = `<img src=${slug.image} alt=${slug.nombre}>`;
    yourPetImage.innerHTML = image;
  } else if (observerPet.checked) {
    yourPet.innerHTML = observerPet.id;
    playerRobot = observerPet.id;
    image = `<img src=${observer.image} alt=${observer.nombre}>`;
    yourPetImage.innerHTML = image;
  } else if (sentinelPet.checked) {
    yourPet.innerHTML = sentinelPet.id;
    playerRobot = sentinelPet.id;
    image = `<img src=${sentinel.image} alt=${sentinel.nombre}>`;
    yourPetImage.innerHTML = image;
  } else if (steelPet.checked) {
    yourPet.innerHTML = steelPet.id;
    playerRobot = steelPet.id;
    image = `<img src=${steel.image} alt=${steel.nombre}>`;
    yourPetImage.innerHTML = image;
  } else {
    alert("You must select a Pet ");
  }
  extractAttacks(playerRobot);
  pickEnemyPet();
}

function extractAttacks(playerRobot) {
  let attacks;

  for (let i = 0; i < robots.length; i++) {
    if (playerRobot === robots[i].name) {
      attacks = robots[i].attacks;
    }
  }
  showAttacks(attacks);
}

function showAttacks(attacks) {
  attacks.forEach((attack) => {
    robotsAttacks = `
  <button id=${attack.id} class="BAttack">${attack.name}</button>
  `;
    robotsPowersContainer.innerHTML += robotsAttacks;
  });

  heavyBullets = document.getElementById("heavy-bullets");
  laserRays = document.getElementById("laser-rays");
  lightningShield = document.getElementById("shield");
  bts = document.querySelectorAll(".BAttack");
}

function attackSequence() {
  bts.forEach((bt) => {
    bt.addEventListener("click", (e) => {
      if (e.target.textContent === "🔫") {
        playerAttack.push("heavyBullets");
        console.log(playerAttack);
        bt.style.background = "#112f58";
      } else if (e.target.textContent === "⚡") {
        playerAttack.push("laserRays");
        console.log(playerAttack);
        bt.style.background = "#112f58";
      } else {
        playerAttack.push("lightningShield");
        console.log(playerAttack);
        bt.style.background = "#112f58";
      }
    });
  });
}

function pickEnemyPet() {
  let randomEnemyPet = randomPower(0, robots.length - 1);

  enemyPet.innerHTML = robots[randomEnemyPet].name;
  image = `<img src=${robots[randomEnemyPet].image} alt=${robots[randomEnemyPet].name}>`;
  enemyPetImage.innerHTML = image;
  attackSequence();
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
