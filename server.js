import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

const players = [];

class Player {
  constructor(id) {
    this.id = id;
  }

  assignRobot(robot) {
    this.robot = robot;
  }

  updatePosition(x, y) {
    (this.x = x), (this.y = y);
  }
  assignAttacks(attacks) {
    this.attacks = attacks;
  }
}

class Robot {
  constructor(name) {
    this.name = name;
  }
}

app.get("/join", (req, res) => {
  const id = `${Math.random()}`;

  const player = new Player(id);

  players.push(player);

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.send(id);
});

app.post("/robot/:playerId", (req, res) => {
  const playerId = req.params.playerId || "";
  const name = req.body.robot || "";
  const robot = new Robot(name);

  const playerIndex = players.findIndex((player) => playerId === player.id);

  if (playerIndex >= 0) {
    players[playerIndex].assignRobot(robot);
  }

  console.log(players);
  console.log(playerId);
  res.end();
});

app.post("/robot/:playerId/position", (req, res) => {
  const playerId = req.params.playerId || "";
  const x = req.body.x || 0;
  const y = req.body.y || 0;

  const playerIndex = players.findIndex((player) => playerId === player.id);

  if (playerIndex >= 0) {
    players[playerIndex].updatePosition(x, y);
  }

  const enemies = players.filter((player) => playerId !== player.id);

  res.send({ enemies });
});

app.post("/robot/:playerId/attacks", (req, res) => {
  const playerId = req.params.playerId || "";
  const attacks = req.body.attacks || [];

  const playerIndex = players.findIndex((player) => playerId === player.id);

  if (playerIndex >= 0) {
    players[playerIndex].assignAttacks(attacks);
  }

  res.end();
});

app.get("/robot/:playerId/attacks", (req, res) => {
  const playerId = req.params.playerId || "";
  const player = players.find((player) => player.id === playerId);
  res.send({
    attacks: player.attacks || [],
  });
});

app.listen(8080, () => {
  console.log("server working!");
});
