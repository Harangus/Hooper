class Character {
  constructor(width, height, characterPosition) {
    this.width = width;
    this.height = height;
    this.characterPosition = characterPosition;
    this.velocity = 0;
    this.weight = 0.1;
    this.gravityEnabled = true;
    this.jumpPower = 90;
    this.jumpEnabled = false;
    this.jumpedDistance = 0;
    this.jumpCompleted = false;
    this.sprite = new Image();
    this.sprite.src = 'https://seeklogo.com/images/D/dinosaur-game-logo-2723F385F0-seeklogo.com.png';
  }

  drawCharacter() {
    /*ctx.strokeRect(
      this.characterPosition.x,
      this.characterPosition.y,
      this.width,
      this.height
    );*/
    ctx.drawImage(this.sprite, this.characterPosition.x, this.characterPosition.y, this.width, this.height);
  }
}
