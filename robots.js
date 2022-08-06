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
const enemyPowerPicked = document.getElementById("enemy-power");
const showScore = document.getElementById("whoWin");

const final = document.getElementById("whoWin");
const endBanner = document.createElement("p");
const robotsCard = document.getElementById("robot-card");
const robotsPowersContainer = document.getElementById("robots-container");

const sectionMap = document.getElementById("see-map");
const mapa = document.getElementById("map");

let robots = [];
let robotOption;
let playerAttack = [];
let enemyAttack = [];
let dronePet;
let slugPet;
let observerPet;
let sentinelPet;
let steelPet;
let playerRobot;
let robotsAttacks;
let enemyPetAttack;
let heavyBullets;
let laserRays;
let lightningShield;
let bts = [];
let initialPlayerAttack;
let initialEnemyAttack;
let playerVictories = 0;
let enemyVictories = 0;
let playerLives = 3;
let enemyLives = 3;
let lienzo = mapa.getContext("2d");
let intervalo;
let backgroundMap = new Image();
backgroundMap.src = "assets/bg1.jpg";

class Robot {
  constructor(name, image, life) {
    this.name = name;
    this.image = image;
    this.life = life;
    this.attacks = [];
    this.x = 20;
    this.y = 30;
    this.ancho = 80;
    this.alto = 80;
    this.mapImage = new Image();
    this.mapImage.src = image;
    this.speedX = 0;
    this.speedY = 0;
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
  sectionMap.style.display = "none";

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
  //battle.style.display = "block";
  sectionMap.style.display = "flex";
  startMap();

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
        playerAttack.push("heavyBulslets");
        console.log(playerAttack);
        bt.style.background = "#112f58";
        bt.disabled = true;
      } else if (e.target.textContent === "⚡") {
        playerAttack.push("laserRays");
        console.log(playerAttack);
        bt.style.background = "#112f58";
        bt.disabled = true;
      } else {
        playerAttack.push("lightningShield");
        console.log(playerAttack);
        bt.style.background = "#112f58";
        bt.disabled = true;
      }
      randomEnemyAttack();
    });
  });
}

function pickEnemyPet() {
  let randomEnemyPet = randomPower(0, robots.length - 1);

  enemyPet.innerHTML = robots[randomEnemyPet].name;
  image = `<img src=${robots[randomEnemyPet].image} alt=${robots[randomEnemyPet].name}>`;
  enemyPetImage.innerHTML = image;
  enemyPetAttack = robots[randomEnemyPet].attacks;
  attackSequence();
}

function randomEnemyAttack() {
  let randomAttack = randomPower(0, enemyPetAttack.length - 1);

  if (randomAttack == 0) {
    enemyAttack.push("heavyBullets");
  } else if (randomAttack == 1) {
    enemyAttack.push("laserRays");
  } else if (randomAttack == 2) {
    enemyAttack.push("lightningShield");
  }
  console.log(enemyAttack);
  startFight();
}

function startFight() {
  if (playerAttack.length == 3) {
    theWinnerIs();
  }
}

function mixingAttacks(player, enemy) {
  initialPlayerAttack = playerAttack[player];
  initialEnemyAttack = enemyAttack[enemy];
}

function theWinnerIs() {
  for (let index = 0; index < playerAttack.length; index++) {
    if (playerAttack[index] === enemyAttack[index]) {
      mixingAttacks(index, index);
      resultado = "draw";
    } else if (
      playerAttack[index] === "heavyBullets" &&
      enemyAttack[index] == "lightningShield"
    ) {
      mixingAttacks(index, index);
      resultado = "Your Pet wins";
      playerVictories++;
      showPlayerLives.innerHTML = playerVictories;
    } else if (
      playerAttack[index] === "laserRays" &&
      enemyAttack[index] == "heavyBullets"
    ) {
      mixingAttacks(index, index);
      resultado = "Your Pet wins";
      playerVictories++;
      showPlayerLives.innerHTML = playerVictories;
    } else if (
      playerAttack[index] === "lightningShield" &&
      enemyAttack[index] == "laserRays"
    ) {
      mixingAttacks(index, index);
      resultado = "Your Pet wins";

      playerVictories++;
      showPlayerLives.innerHTML = playerVictories;
    } else {
      mixingAttacks(index, index);
      resultado = "Enemys Pet Wins";
      enemyVictories++;
      showEnemyLives.innerHTML = enemyVictories;
    }
    fight();
  }
  checkLives();
}

function checkLives() {
  if (playerVictories === enemyVictories) {
    finalresult("DRAW");
  } else if (playerVictories > enemyVictories) {
    finalresult("VICTORY");
  } else {
    finalresult("DEFEAT");
  }
}

function fight() {
  let showYourPower = document.createElement("p");
  let showYourEnemyPower = document.createElement("p");
  let showing = document.createElement("p");

  showYourPower.innerHTML = initialPlayerAttack;
  showYourEnemyPower.innerHTML = initialEnemyAttack;

  showing.innerHTML = resultado;
  showing.setAttribute("id", "res-pet");

  powerPicked.appendChild(showYourPower);
  enemyPowerPicked.appendChild(showYourEnemyPower);
  showScore.appendChild(showing);
}

function finalresult(victoryOrDefeat) {
  endBanner.innerHTML = victoryOrDefeat;
  final.appendChild(endBanner);
}

function reloadGame() {
  location.reload();
}

function randomPower(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawCanvas() {
  sentinel.x = sentinel.x + sentinel.speedX;
  sentinel.y = sentinel.y + sentinel.speedY;
  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(backgroundMap, 0, 0, mapa.width, mapa.height);
  lienzo.drawImage(
    sentinel.mapImage,
    sentinel.x,
    sentinel.y,
    sentinel.ancho,
    sentinel.alto
  );
}

function moveRight() {
  sentinel.speedX = 5;
}

function moveLeft() {
  sentinel.speedX = -5;
}

function moveDown() {
  sentinel.speedY = 5;
}

function moveUp() {
  sentinel.speedY = -5;
}

function stopMove() {
  sentinel.speedX = 0;
  sentinel.speedY = 0;
}

//Using Object literals instead of switch statement
function pressKey(e) {
  const testKeys = {
    ArrowUp: () => moveUp(),
    ArrowDown: () => moveDown(),
    ArrowLeft: () => moveLeft(),
    ArrowRight: () => moveRight(),
  };

  testKeys[e.key]();
}

function startMap() {
  mapa.width = 950;
  mapa.height = 450;
  intervalo = setInterval(drawCanvas, 50);
  window.addEventListener("keydown", pressKey);
  window.addEventListener("keyup", stopMove);
}

window.addEventListener("load", startGame);
