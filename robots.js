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

let playerId = null;
let enemyId = null;
let robots = [];
let enemyRobots = [];
let robotOption;
let playerAttack = [];
let enemyAttack = [];
let dronePet;
let slugPet;
let observerPet;
let sentinelPet;
let steelPet;
let playerRobot;
let playerRobotObject;
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
let desiredHeight;
let desiredWidth = window.innerWidth - 20;
const maxMapHeight = 450;

if (desiredWidth > maxMapHeight) {
  desiredWidth = maxMapHeight - 20;
}

desiredHeight = (desiredWidth * 600) / 800;

mapa.width = desiredWidth;
mapa.height = desiredHeight;

class Robot {
  constructor(name, image, life, photoMap, id = null) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.life = life;
    this.attacks = [];
    this.ancho = 80;
    this.alto = 80;
    this.x = randomPower(0, mapa.width - this.ancho);
    this.y = randomPower(0, mapa.height - this.alto);
    this.mapImage = new Image();
    this.mapImage.src = photoMap;
    this.speedX = 0;
    this.speedY = 0;
  }

  drawRobot() {
    lienzo.drawImage(this.mapImage, this.x, this.y, this.ancho, this.alto);
  }
}

let drone = new Robot("Drone", "assets/Drone.png", 3, "assets/Drone.png");

const DRONE_ATTACKS = [
  { name: "????", id: "heavy-bullets" },
  { name: "????", id: "heavy-bullets" },
  { name: "???", id: "laser-rays" },
];

drone.attacks.push(...DRONE_ATTACKS);

let slug = new Robot(
  "Slug",
  "assets/Metal-Slug.png",
  3,
  "assets/Metal-Slug.png"
);

const SLUG_ATTACKS = [
  { name: "???", id: "shield" },
  { name: "???", id: "shield" },
  { name: "????", id: "heavy-bullets" },
];

slug.attacks.push(...SLUG_ATTACKS);

let observer = new Robot(
  "Observer",
  "assets/observer.png",
  3,
  "assets/observer.png"
);

const OBSERVER_ATTACKS = [
  { name: "???", id: "laser-rays" },
  { name: "???", id: "laser-rays" },
  { name: "???", id: "shield" },
];

observer.attacks.push(...OBSERVER_ATTACKS);

let sentinel = new Robot(
  "Sentinel",
  "assets/Sentinel.png",
  3,
  "assets/Sentinel.png"
);

const SENTINEL_ATTACKS = [
  { name: "???", id: "laser-rays" },
  { name: "????", id: "heavy-bullets" },
  { name: "???", id: "shield" },
];

sentinel.attacks.push(...SENTINEL_ATTACKS);

let steel = new Robot(
  "Steel",
  "assets/steel-eagle.png",
  3,
  "assets/steel-eagle.png"
);

const STEEL_ATTACKS = [
  { name: "???", id: "laser-rays" },
  { name: "???", id: "laser-rays" },
  { name: "???", id: "laser-rays" },
];

steel.attacks.push(...STEEL_ATTACKS);

/* enemyDrone.attacks.push(
  { name: "????", id: "heavy-bullets" },
  { name: "????", id: "heavy-bullets" },
  { name: "???", id: "laser-rays" }
); */

/* enemySlug.attacks.push(
  { name: "???", id: "shield" },
  { name: "???", id: "shield" },
  { name: "????", id: "heavy-bullets" }
); */

/* enemyObserver.attacks.push(
  { name: "???", id: "laser-rays" },
  { name: "???", id: "laser-rays" },
  { name: "???", id: "shield" }
); */

/* enemySentinel.attacks.push(
  { name: "???", id: "laser-rays" },
  { name: "????", id: "heavy-bullets" },
  { name: "???", id: "shield" }
); */

/* enemySteel.attacks.push(
  { name: "???", id: "laser-rays" },
  { name: "???", id: "laser-rays" },
  { name: "???", id: "laser-rays" }
); */

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

  joinGame();
}

function joinGame() {
  fetch("http://localhost:8080/join").then(function (res) {
    console.log(res);
    if (res.ok) {
      res.text().then(function (response) {
        console.log(response);
        playerId = response;
      });
    }
  });
}

function pickPet() {
  avilablePets.style.display = "none";

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

  selectRobot(playerRobot);

  extractAttacks(playerRobot);
  sectionMap.style.display = "flex";
  startMap();
}

function selectRobot(playerRobot) {
  fetch(`http://localhost:8080/robot/${playerId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      robot: playerRobot,
    }),
  });
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
      if (e.target.textContent === "????") {
        playerAttack.push("heavyBulslets");
        console.log(playerAttack);
        bt.style.background = "#112f58";
        bt.disabled = true;
      } else if (e.target.textContent === "???") {
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
      //randomEnemyAttack();
      if (playerAttack.length === 3) {
        sendAttack();
      }
    });
  });
}

function sendAttack() {
  fetch(`http://localhost:8080/robot/${playerId}/attacks`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      attacks: playerAttack,
    }),
  });

  intervalo = setInterval(obtainAttacks, 50);
}

function obtainAttacks() {
  fetch(`http://localhost:8080/robot/${enemyId}/attacks`).then(function (res) {
    if (res.ok) {
      res.json().then(function ({ attacks }) {
        if (attacks.length === 3) {
          enemyAttack = attacks;
          theWinnerIs();
        }
      });
    }
  });
}

function pickEnemyPet(enemy) {
  enemyPet.innerHTML = enemy.name;
  image = `<img src=${enemy.image} alt=${enemy.name}>`;
  enemyPetImage.innerHTML = image;
  enemyPetAttack = enemy.attacks;
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
  clearInterval(intervalo);

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
  playerRobotObject.x = playerRobotObject.x + playerRobotObject.speedX;
  playerRobotObject.y = playerRobotObject.y + playerRobotObject.speedY;
  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(backgroundMap, 0, 0, mapa.width, mapa.height);

  playerRobotObject.drawRobot();

  sendPosition(playerRobotObject.x, playerRobotObject.y);

  enemyRobots.forEach(function (robot) {
    robot.drawRobot();
    checkImpack(robot);
  });
}

function sendPosition(x, y) {
  fetch(`http://localhost:8080/robot/${playerId}/position`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      x,
      y,
    }),
  }).then(function (res) {
    if (res.ok) {
      res.json().then(function ({ enemies }) {
        //console.log(enemies);
        enemyRobots = enemies.map(function (enemy) {
          let enemyRobot = null;
          const robotName = enemy.robot.name || "";
          if (robotName === "Drone") {
            enemyRobot = new Robot(
              "Drone",
              "assets/Drone.png",
              3,
              "assets/Drone.png",
              enemy.id
            );
          } else if (robotName === "Slug") {
            enemyRobot = new Robot(
              "Slug",
              "assets/Metal-Slug.png",
              3,
              "assets/Metal-Slug.png",
              enemy.id
            );
          } else if (robotName === "Observer") {
            enemyRobot = new Robot(
              "Observer",
              "assets/observer.png",
              3,
              "assets/observer.png",
              enemy.id
            );
          } else if (robotName === "Sentinel") {
            enemyRobot = new Robot(
              "Sentinel",
              "assets/Sentinel.png",
              3,
              "assets/Sentinel.png",
              enemy.id
            );
          } else if (robotName === "Steel") {
            enemyRobot = new Robot(
              "Steel",
              "assets/steel-eagle.png",
              3,
              "assets/steel-eagle.png",
              enemy.id
            );
          }

          enemyRobot.x = enemy.x;
          enemyRobot.y = enemy.y;

          return enemyRobot;
        });
      });
    }
  });
}

function moveRight() {
  playerRobotObject.speedX = 5;
}

function moveLeft() {
  playerRobotObject.speedX = -5;
}

function moveDown() {
  playerRobotObject.speedY = 5;
}

function moveUp() {
  playerRobotObject.speedY = -5;
}

function stopMove() {
  playerRobotObject.speedX = 0;
  playerRobotObject.speedY = 0;
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
  playerRobotObject = obtainPlayerRobot(playerRobot);
  intervalo = setInterval(drawCanvas, 50);
  window.addEventListener("keydown", pressKey);
  window.addEventListener("keyup", stopMove);
}

function obtainPlayerRobot() {
  for (let i = 0; i < robots.length; i++) {
    if (playerRobot === robots[i].name) {
      return robots[i];
    }
  }
}

const checkImpack = (enemy) => {
  const enemyUp = enemy.y;
  const enemyDown = enemy.y + enemy.alto;
  const enemyRight = enemy.x + enemy.ancho;
  const enemyLeft = enemy.x;

  const petUp = playerRobotObject.y;
  const petDown = playerRobotObject.y + playerRobotObject.alto;
  const petRight = playerRobotObject.x + playerRobotObject.ancho;
  const petLeft = playerRobotObject.x;

  if (
    petDown < enemyUp ||
    petUp > enemyDown ||
    petRight < enemyLeft ||
    petLeft > enemyRight
  ) {
    return;
  }
  stopMove();
  clearInterval(intervalo);

  enemyId = enemy.id;

  battle.style.display = "flex";
  sectionMap.style.display = "none";
  pickEnemyPet(enemy);
  // alert("Inminent Impact" + enemy.name);
};

window.addEventListener("load", startGame);
