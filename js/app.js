// Enemies our player must avoid
var Enemy = function(loc, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    //assign location object if none present
    if(!loc){loc = {};}
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    //set properties or default
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

// wall bounce feature
    if((this.x <= 5)&&(this.or === 4)){
        this.or = 2;
        this.speed = Math.random()* (150) + 75;
    }    
    if((this.x >= 400)&&(this.or === 2)){
        this.or = 4;
        this.speed = Math.random()* (150) + 75;
    }    

    //this.x = this.x + (this.speed * dt);
    // player collision
    if((player.x + 80 >= this.x)&&(this.x + 80 >= player.x)&&(player.y + 50 >= this.y)&&(this.y + 50 >= player.y)){
        //console.log('collision');
        player.x = 200;
        player.y = 400;
        player.destx = 200;
        player.desty = 400;
    }

    //console.log(this.x);
    this.render();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(loc, sprite){
    if(!loc){loc = {};}
    this.sprite = sprite || 'images/char-boy.png';
    this.x = loc.x || 200;
    this.y = loc.y || 400;
    this.or = loc.orientation || 1;
    this.desty = this.y;
    this.destx = this.x;    

};
Player.prototype.update = function(dt){
    //animate player move
    switch(this.or){
        case 1:
            if(this.y > this.desty){
                this.y -= Math.ceil(160 * dt);
            }else{
                this.desty = this.y;
            }
            break;
        case 2:
            if(this.x < this.destx){
               this.x += Math.ceil(200 * dt);
            }else{
              this.destx = this.x;
            }
            break;
        case 3:
            if(this.y < this.desty){
                this.y += Math.ceil(160 * dt);
            }else{
                this.desty = this.y;
            }
            break;
        case 4:
            if(this.x > this.destx){
                this.x -= Math.ceil(200 * dt);
            }else{
                this.destx = this.x;
            }
            break;
    }
    this.render();
};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(direction){
    
    switch(direction){
        case 'up':
            this.or = 1;
            if(this.desty < 80){
                this.desty = 80;
            }else{
                this.desty = this.desty - (80);
            }
            if(80 > this.y){
                this.y = 400;
                this.x = 200;
                this.desty = 400;
                this.destx = 200;
            }
            break;
        case 'right':
            this.or = 2;
            if(this.destx + 100 <= 400){
                this.destx = this.destx + (100);
            }else{
                this.destx = 400;
            }
            //this.x = ((this.x + (100))<= 400)?(this.x + (100)):400;
            break;
        case 'down':
            this.or = 3;
            if(this.desty + 80 <= 400){
                this.desty = this.desty + (80);
            }else{
                this.desty = 400;
            }
            //this.y = ((this.y + (80))<= 400)?(this.y + (80)):400;
            break;
        case 'left':
            this.or = 4;
            if(this.destx - 100 >= 0){
                this.destx = this.destx - (100);
            }else{
                this.destx = 0;
            }
            //this.x = ((this.x - (100))>= 0)?(this.x - (100)):0;
            break;
    }
    console.log(this.destx + ': ' +this.x);
    console.log(this.desty + ': ' +this.y);
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
