// Enemies our player must avoid
var Enemy = function(loc, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    if(!loc){
        var loc = {};
    }
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite || 'images/enemy-bug.png';
    this.x = loc.x || 1;
    this.y = loc.y || 2;
    this.or = loc.orientation || 2; //1:up 2:right 3:down 4:left
    this.speed = loc.speed || 1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    switch(this.orientation){
        case 2:
                this.x = this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(loc, sprite){
    if(!loc){
        var loc = {};
    }
    this.sprite = sprite || 'images/char-boy.png';
    this.x = loc.x||5;
    this.y = loc.y||5;
};
Player.prototype.update = function(){};
Player.prototype.render = function(){};
Player.prototype.handleInput = function(direction){
    console.log(direction);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push( new Enemy());
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
