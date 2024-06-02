let c = document.getElementById("gameCanvas");
let ctx = c.getContext("2d");
let score = document.getElementById("score");
let gameSpeed = setInterval(gameLoop, 1000 / 60);
let background = new Image();
let movingSpeed = 1;
let currentScore = 0;
let framesBetweenSprites = 22.5;
let actualFrames = 0;
let currentSprite = 0;
let colectible = {
  image : new Image(),
  x : 800,
  y : 200,
  width : 50,
  height : 50,
  drawCharacter : function() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
};
colectible.image.src = "./Sprites/orange.png";

background.src =
  "https://media.istockphoto.com/id/1333010525/vector/simple-flat-pixel-art-illustration-of-cartoon-outdoor-landscape-background-pixel-arcade.jpg?s=612x612&w=0&k=20&c=uTGqB9fhmjzaNd17EGRHYU04_70K7a3M8ilRoJjDwtY=";
let backgroundPosition = { x: 0, y: 0 };
let background2 = new Image();
background2.src =
  "https://media.istockphoto.com/id/1333010525/vector/simple-flat-pixel-art-illustration-of-cartoon-outdoor-landscape-background-pixel-arcade.jpg?s=612x612&w=0&k=20&c=uTGqB9fhmjzaNd17EGRHYU04_70K7a3M8ilRoJjDwtY=";

let background2Position = { x: 1000, y: 0 };

let player = new Character(105, 87, { x: 200, y: 100 });
enemySpeed = 2;
let enemies = new Array();
enemies.push(new Character(50, 50, {x: 900, y: 360}));
enemies.push(new Character(50, 50, {x: 1100, y: 360}));
enemies.forEach((enemy) => {
  enemy.sprite.src = './Sprites/fireBall.png';
});

player.drawCharacter();

function gameLoop() {
  //ctx.clearRect(0, 0, c.width, c.height); //Vyčištění obrazu
  ctx.drawImage(
    background,
    backgroundPosition.x,
    backgroundPosition.y,
    c.width,
    c.height
  );
  ctx.drawImage(
    background2,
    background2Position.x,
    background2Position.y,
    c.width,
    c.height
  );
  if (player.gravityEnabled) {
    gravity();
  }
  if (player.jumpEnabled) {
    jump();
  }
  countScore();
  capyAnimation();
  player.drawCharacter();
  drawEnemies();
  colectible.drawCharacter();
  checkCollision();

  backgroundPosition.x -= movingSpeed;
  background2Position.x -= movingSpeed;
  if (backgroundPosition.x < -999) {
    backgroundPosition.x = 1000;
  }
  if (background2Position.x < -999) {
    background2Position.x = 1000;
  }
  if (movingSpeed < 10) {
    movingSpeed += 0.001;
    enemySpeed += 0.001;
    colectible.x -= enemySpeed;
  }
  if (framesBetweenSprites > 5) framesBetweenSprites -= 0.001;
}

function drawEnemies() {
  enemies.forEach((enemy) => {
    enemy.characterPosition.x -= enemySpeed;
    enemy.drawCharacter();
  });
}

function checkCollision()
{
  enemies.forEach((enemy, index) => {
    if (
      enemy.characterPosition.x > player.characterPosition.x - 50 &&
      enemy.characterPosition.x < player.characterPosition.x + enemy.width * 1.6 &&
      enemy.characterPosition.y > player.characterPosition.y &&
      enemy.characterPosition.y < player.characterPosition.y + enemy.height * 1.74
    ) {
      alert("Game over! Capy is Dead :(");
    }

    if (enemy.characterPosition.x < 0 && index == 0) {
      enemy.characterPosition.x = 1000 + getRandomInt(150, 800);
    }
    if (enemy.characterPosition.x < 0 && index == 1) {
      enemy.characterPosition.x = 1000 + getRandomInt(enemies[0].characterPosition.x + 150, 800);
    }
  });

  if (
    colectible.x > player.characterPosition.x  - 50 &&
    colectible.x < player.characterPosition.x + colectible.width * 1.6 &&
    colectible.y > player.characterPosition.y &&
    colectible.y < player.characterPosition.y + colectible.height * 1.74
  ) {
    colectible.x = getRandomInt(1100, 2000);
    currentScore += 10;
  }

  if (colectible.x < 0) colectible.x = getRandomInt(1100, 2000);
}

function countScore() {
  currentScore += 0.001;
  score.innerHTML = "Score: " + Math.floor(currentScore);
}

function capyAnimation() {
  actualFrames++;
  if (actualFrames >= framesBetweenSprites) {
    actualFrames = 0;
    switch (currentSprite) {
      case 0:
        player.sprite.src = "./Sprites/capyStand.png";
        break;
      case 1:
        player.sprite.src = "./Sprites/capyLeftLeg.png";
        break;
      case 2:
        player.sprite.src = "./Sprites/capyStand.png";
        break;
      case 3:
        player.sprite.src = "./Sprites/capyRightLeg.png";
        break;
    }
    currentSprite++;
    if (currentSprite > 3) currentSprite = 0;
  }
}

function gravity() {
  if (player.characterPosition.y < c.height - 180) {
    player.characterPosition.y += player.velocity + player.weight;
    player.velocity += 0.1;
  }

  if (player.characterPosition.y >= c.height - 180) {
    player.velocity = 0;
    player.jumpCompleted = true;
  }
}

function jump() {
  if (player.jumpedDistance < player.jumpPower) {
    player.characterPosition.y -= player.velocity + player.jumpPower / 30;
    player.jumpedDistance += player.velocity + player.jumpPower / 30;
    if (player.velocity > 0) player.velocity -= 1;
  } else {
    player.jumpEnabled = false;
    player.velocity = 0;
    player.gravityEnabled = true;
    player.jumpedDistance = 0;
  }
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

document.addEventListener("keydown", function (event) {
  if (event.keyCode == 32) {
    if (player.jumpCompleted) {
      player.jumpCompleted = false;
      player.velocity = 10;
      player.gravityEnabled = false;
      player.jumpEnabled = true;
    }
  }
});
