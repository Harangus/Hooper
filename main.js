let c = document.getElementById("gameCanvas");
let ctx = c.getContext("2d");
let gameSpeed = setInterval(gameLoop, 1000 / 90);
let background = new Image();
let movingSpeed = 1;
let framesBetweenSprites = 22.5;
let actualFrames = 0;
let currentSprite = 0;
background.src =
  "https://media.istockphoto.com/id/1333010525/vector/simple-flat-pixel-art-illustration-of-cartoon-outdoor-landscape-background-pixel-arcade.jpg?s=612x612&w=0&k=20&c=uTGqB9fhmjzaNd17EGRHYU04_70K7a3M8ilRoJjDwtY=";
let backgroundPosition = { x: 0, y: 0 };
let background2 = new Image();
background2.src =
  "https://media.istockphoto.com/id/1333010525/vector/simple-flat-pixel-art-illustration-of-cartoon-outdoor-landscape-background-pixel-arcade.jpg?s=612x612&w=0&k=20&c=uTGqB9fhmjzaNd17EGRHYU04_70K7a3M8ilRoJjDwtY=";

let background2Position = { x: 1000, y: 0 };

let player = new Character(105, 87, { x: 200, y: 100 });
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
  capyAnimation();
  player.drawCharacter();

  backgroundPosition.x -= movingSpeed;
  background2Position.x -= movingSpeed;
  if (backgroundPosition.x < -999) {
    backgroundPosition.x = 1000;
  }
  if (background2Position.x < -999) {
    background2Position.x = 1000;
  }
  movingSpeed += 0.001;
  if (framesBetweenSprites > 5) framesBetweenSprites -= 0.001;
}

function capyAnimation()
{
  actualFrames++;
  if (actualFrames >= framesBetweenSprites) {
    actualFrames = 0;
    switch (currentSprite) {
      case 0:
        player.sprite.src = './Sprites/capyStand.png';
        break;
      case 1:
        player.sprite.src = './Sprites/capyLeftLeg.png';
        break;
      case 2:
        player.sprite.src = './Sprites/capyStand.png';
        break;
      case 3:
        player.sprite.src = './Sprites/capyRightLeg.png';
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
    player.velocity -= 1;
  } else {
    player.jumpEnabled = false;
    player.velocity = 0;
    player.gravityEnabled = true;
    player.jumpedDistance = 0;
  }
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