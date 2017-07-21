// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -100;
    this.yPos = [50, 133, 216]; // Array of starting positions for enemies.
    this.y = -100
    this.enemySpeed = 100;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.enemySpeed * dt; // Makes enemy move across the canvas,
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 500) { // Check if the enemy left the canvas then reset it. 500px gave the best results to prevent the players from seeing the enemies pop out.
        this.reset();
    }
};

Enemy.prototype.reset = function() {
    this.x = -100;
    this.y = this.yPos[Math.floor(Math.random() * this.yPos.length)]; // Picks a random starting Y location from my yPos array.
    this.enemySpeed = Math.floor((Math.random() * 300) + 100); // Sets a random speed for the enemies.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if (winScreen === true) { // Checks if the player has won or lost. Otherwise draws the enemies.
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText('You won! Click to play again.', 50, 100); // Write texts on the screen explaining that the player won.
    } else if (loseScreen === true) {
        ctx.fillText('You lost. Click to play again.', 50, 100); // Write texts on the screen explaining that the player lost.
    } else {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 382;
    this.sprite = "images/char-boy.png";
};

Player.prototype.update = function() {
    this.checkCollision();
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 382;
};

Player.prototype.render = function() {
    if (winScreen === true || loseScreen === true) { // Checks if the player has won or lost.
        return; // Stops the game from drawing if the player has won or lost.
    } else {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y); // Draws the player on the canvas.
    }
};

Player.prototype.checkCollision = function() {
    // console.log ("Trigger"); was having lots of trouble with collision was added some logs to help me troubleshoot.
    for (var i = 0; i < allEnemies.length; i++) { // Loops through enemies.
        if (this.y == allEnemies[i].y) { // if an enemy is one the same y pixel as an enemy this willbe true and continue.
            // console.log ("Y Trigger"); use these to check if statements.
            if (this.x - 25 <= allEnemies[i].x && this.x + 25 >= allEnemies[i].x) { // 25px comes from testing with below and is a buffer for the size of the image. If and enemy touchs the player this will be true.
                // console.log (allEnemies[i].x); Use this to line up width of images to prevent wierd clipping.
                loseScreen = true; // If player is hit by an enemy they lose.
                this.reset();
            }
        }
    }
};

Player.prototype.handleInput = function(e) { // e is the key that was pressed from the event listener.
    if (e === "up") {
        this.y -= 83;
    } else if (e === "down") {
        this.y += 83;
    } else if (e === "left") {
        this.x -= 100;
    } else if (e === "right") {
        this.x += 100;
    }

    if (this.x > 400 || this.x < 0) { // Resets if the player tries to leave the canvas.
        this.reset();
    }
    if (this.y < 0) { // If the player reaches the water they win!
        winScreen = true;
        this.reset();
    }
    if (this.y > 383) {
        this.reset(); // Resets if the player tries to leave the bottom of the canvas.
    }
};

// Now instantiate your objects.
var cleopatra = new Enemy(); // I picked famous women from history because the image is a lady bug.
var joanofArc = new Enemy();
var florenceNightingale = new Enemy();
var susanbAnthony = new Enemy();
var rosaParks = new Enemy();

// Place all enemy objects in an array called allEnemies
var allEnemies = [cleopatra, joanofArc, florenceNightingale, susanbAnthony, rosaParks]; // After testing 6 enemies was too much so I took it down to 5.

// Place the player object in a variable called player
var player = new Player();

//win and lose Screens used to stop the game to display win or lose messages.
var winScreen = false;
var loseScreen = false;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('mousedown', mouseClick); // Added listener for a mouse click.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function mouseClick() { // Resets the win and lose screens so the game will restart after a mouse click.
    if (winScreen) {
        winScreen = false;
    }
    if (loseScreen) {
        loseScreen = false;
    }
}
