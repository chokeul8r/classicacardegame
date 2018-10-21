let gameScore = document.getElementById('score');
let gameLives = document.getElementById('lives');

class Game {
  constructor() {
    this.lives = 3;
    this.score = 0; 
  }
}

let game = new Game(3, 0); 

// Enemies our player must avoid
class Enemy {
    constructor(sx, sy, width, height, speed, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
      this.x = sx;
      this.y = sy;
      this.width = width;
      this.height = height;
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
{x:250,y:65},
{x:-150,y:145},
{x:250,y:225},
{x:-250,y:65},
{x:350,y:145},
{x:-375,y:225}
];

for(let i = 0; i < enemies; i++){
    allEnemies.push(new Enemy(cordArray[i].x,cordArray[i].y,75 ,80 ,Math.ceil((Math.random() * 25) + 50), 'images/enemy-bug.png'));
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(px,py){
    this.x = px;
    this.y = py;
    this.width = 75;
    this.height = 100;
    this.players = [
      'images/char-boy.png',
      'images/char-cat-girl.png',
      'images/char-horn-girl.png',
      'images/char-pink-girl.png',
      'images/char-princess-girl.png'
    ];
    this.selectedSprite = 0;
    this.sprite = this.players[this.selectedSprite];  
  }
  update(dt) {
    this.checkForCrossing(dt);
    this.checkForCollisions(dt);
    this.updateScore(dt);
    this.checkLives(dt);    
  }
  updateScore() {
    if(game.lives === 0) {
      game.score = 0;
    } else if (game.lives > 0) {
      gameScore.innerHTML = game.score;
    } 
  }
  checkLives() {
    if (game.lives === 0) {
      alert('Game Over!');
      game.lives = 3;
    }
    gameLives.innerHTML = game.lives;
  }
  checkForCrossing() {
    if(this.y <= 0){
      alert("100 Points!");
      this.x = 200;
      this.y = 400;
      game.score += 100;
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  checkForCollisions() {
    for (let i=0; i < allEnemies.length; i++) {
      let myEnemy = allEnemies[i];
      if(this.x < myEnemy.x + myEnemy.width 
        && this.x + this.width > myEnemy.x
        && this.y < myEnemy.y + myEnemy.height
        && this.y + this.height > myEnemy.y) {
        this.x = 200;
        this.y = 400;
        game.lives--;
        console.log(game.lives);  
      };
    };
  }
  handleInput(e) {
    if (e === "players") {
      (this.selectedSprite < 4) ? this.selectedSprite++ : this.selectedSprite = 0; 
      player.sprite = this.players[this.selectedSprite];
    }
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
let player = new Player(200, 400, this.sprite)

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        16: 'players',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
