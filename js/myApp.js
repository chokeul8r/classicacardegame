// Enemies our player must avoid
class Enemy {
    constructor(sx, sy, speed, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
      this.x = sx;
      this.y = sy;
      this.speed = speed;
      this.sprite = sprite;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    update(dt) {
      this.x = this.x + this.speed * dt;
       if(this.x >= 505) {
        this.x = -100;
      }
    }
    // Draw the enemy on the screen, required method for game
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    } 
  }

// Place all enemy objects in an array called allEnemies
let enemies = 6;
let allEnemies = [];
let cordArray = [
{x:0,y:65},
{x:0,y:145},
{x:0,y:225},
{x:300,y:65},
{x:300,y:145},
{x:300,y:225}
];

for(let i = 0; i < enemies; i++){
    allEnemies.push(new Enemy(`${cordArray[i].x}`,`${cordArray[i].y}`,`${Math.ceil((Math.random() * 100) + 75)}`, 'images/enemy-bug.png'));
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(px,py,sprite){
      this.x = px;
      this.y = py;
      this.sprite = sprite;
    }
    update() {
      if(this.y <= 0){
          alert("Game Over! You Win!");
          this.x = 200;
          this.y = 400;
      }
    }
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(e) {
      if (e === "left" && this.x >= 25) {
        this.x -= 25;
      }
      if (e === "right" && this.x <= 375) {
        this.x += 25;
      }
      if (e === "up" && this.y >= 0) {
        this.y -= 25;
      }
      if (e === "down" && this.y <= 380) {
        this.y += 25;
      }
    }
  }
  // Place the player object in a variable called player
  let player = new Player(200, 400, 'images/char-boy.png')

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
