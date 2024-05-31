let c = document.getElementById("gameCanvas");
let ctx = c.getContext("2d");
let gameSpeed = setInterval(gameLoop, 1000 / 90);

let player = new Character(20, 40, { x: 200, y: 100 }, "blue");
player.drawCharacter();

function gameLoop() {
  ctx.clearRect(0, 0, c.width, c.height); //Vyčištění obrazu
  if (player.gravityEnabled) {
    gravity();
  }
  if (player.jumpEnabled) {
    jump();
  }
  player.drawCharacter();
}

function gravity() {
  if (player.characterPosition.y < c.height - player.height) {
    player.characterPosition.y += player.velocity + player.weight;
    player.velocity += 0.1;
  }

  if (player.characterPosition.y == c.height - player.height) {
    player.velocity = 0;
  }
}

function jump() {
    if (player.jumpedDistance < player.jumpPower) {
        player.characterPosition.y -= player.velocity + player.jumpPower / 30
        player.jumpedDistance += player.velocity + player.jumpPower / 30;
        player.velocity -= 1;
    }else
    {
        player.jumpEnabled = false;
        player.velocity = 0;
        player.gravityEnabled = true;
        player.jumpedDistance = 0;
    }
}

document.addEventListener("keydown", function (event) {
  if (event.keyCode == 32) {
    player.velocity = 10;
    player.gravityEnabled = false;
    player.jumpEnabled = true;
  }
});
