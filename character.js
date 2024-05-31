class Character {
  constructor(width, height, characterPosition, color) {
    this.width = width;
    this.height = height;
    this.characterPosition = characterPosition;
    this.color = color;
    this.velocity = 0;
    this.weight = 0.1;
    this.gravityEnabled = true;
    this.jumpPower = 90;
    this.jumpEnabled = false;
    this.jumpedDistance = 0;
  }

  drawCharacter() {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.characterPosition.x,
      this.characterPosition.y,
      this.width,
      this.height
    );
  }
}
