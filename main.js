let c = document.getElementById("gameCanvas");
let ctx = c.getContext("2d");
//let gameSpeed = setInterval(gameLoop, 1000/60);

let player = new Character(20, 40, {x: 200, y: 100}, "blue");
player.drawCharacter();

function gameLoop()
{
    ctx.clearRect(0, 0, c.width, c.height);
    player.characterPosition.x += 1;
    player.drawCharacter();
}