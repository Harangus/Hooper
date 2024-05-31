class Character
{
    constructor(width, height, characterPosition, color)
    {
        this.width = width;
        this.height = height;
        this.characterPosition = characterPosition;
        this.color = color;
    }

    drawCharacter()
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.characterPosition.x, this.characterPosition.y, this.width, this.height);
    }
}