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
    this.x = loc.x || 0;
    this.y = loc.y || 70;
    this.or = loc.orientation || 2; //1:up 2:right 3:down 4:left
    this.speed = loc.speed || 100;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    switch(this.or){
        case 2:
            this.x = this.x + (this.speed * dt);
            break;
        case 4:
            this.x = this.x + (-1 * this.speed * dt);
            break;
    }
// wall bounce
    if((this.x <= 5)&&(this.or === 4)){
        this.or = 2;
    }    
    if((this.x >= 400)&&(this.or === 2)){
        this.or = 4;
    }    

    //this.x = this.x + (this.speed * dt);
    // player colision
    if((player.x + 100 >= this.x)
        &&(this.x + 100 >= player.x)
        &&(player.y + 100 >= this.y)
        &&(this.y + 100 >= player.y)){
        console.log('colision');
    }

    //console.log(this.x);
    this.render;
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
    this.x = loc.x || 200;
    this.y = loc.y || 400;
    this.or = loc.orientation || 1;

};
Player.prototype.update = function(dt){
    /*switch(this.or){
        case 1:
            this.y = this.y - (100);
        break;
        case 2:
            this.x = this.x + (100);
        break;
        case 3:
            this.y = this.y + (100);
        break;
        case 4:
            this.x = this.x - (100);
        break;
    }*/
    this.render;
};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(direction){
    
    console.log(direction);
    switch(direction){
        case 'up':
            this.or = 1;
            this.y = this.y - (10);
            break;
        case 'right':
            this.or = 2;
            this.x = this.x + (10);
            break;
        case 'down':
            this.or = 3;
            this.y = this.y + (10);
            break;
        case 'left':
            this.or = 4;
            this.x = this.x - (10);
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

allEnemies.push( new Enemy());
allEnemies.push( new Enemy({
    x:0,
    y:150,
    speed:150
}));
allEnemies.push( new Enemy({
    x:0,
    y:230,
    speed:50
}));
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
