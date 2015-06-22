<<<<<<< HEAD
/*
=======
/**
>>>>>>> master
* board.js
* 
* Author: Frank Chan
* Source: https://github.com/fuhranku/dash-in-the-dark
*
<<<<<<< HEAD
* Making this game was mostly for me to learn javascript and become comfortable with the syntax
=======
* Making this game was mostly for me to learn javascript and become comfortable
* with the syntax
>>>>>>> master
* If it helps you learn, feel free to use anything from here
*/

//set up all three canvases to be the same size
<<<<<<< HEAD

=======
>>>>>>> master
//the bottom canvas used to draw the maze and the introductory screens on
//does not need to be updated during gameplay
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width=1275;
canvas.height=640; 

//the middle canvas used to keep track of players and their projectiles
//constantly updates for player and projectile movement
var gameplay = document.getElementById('gameplay');
var gctx = gameplay.getContext('2d');
gameplay.width = 1275;
gameplay.height = 640;

//the top canvas used to keep track of the spotlights illuminating the players
//updates until one player finishes the maze
var spotlight = document.getElementById('spotlight');
var sctx = spotlight.getContext('2d');
sctx.width = 1275;
sctx.height = 640;

//load all textures before the game starts
finish = new Image();
finish.src = "visuals/finish.png";

blocked = new Image();
blocked.src = "visuals/blocked.png";

floorTile = new Image();
floorTile.src = "visuals/floor-tile.png";

wallTile = new Image();
wallTile.src = "visuals/wall-tile.png";

redPlayer = new Image();
redPlayer.src = "visuals/Red Player.png";

bluePlayer = new Image();
bluePlayer.src = "visuals/Blue Player.png";

blueFire = new Image();
blueFire.src = "visuals/BlueFireSS.png";

redFire = new Image();
redFire.src = "visuals/RedFireSS.png";

title = new Image();
title.src = "visuals/title.png";

controls = new Image();
controls.src = "visuals/controls.png";

instructions = new Image();
instructions.src = "visuals/instructions.png";

instructButton = new Image();
instructButton.src = "visuals/instructionButton.png";

startButton = new Image();
startButton.src = "visuals/startButton.png";

rightArrow = new Image();
rightArrow.src = "visuals/rightArrow.png";

leftArrow = new Image();
leftArrow.src = "visuals/leftArrow.png";

playAgain = new Image();
playAgain.src = "visuals/playAgain.png";

playerWins = new Image();
playerWins.src = "visuals/playerWins.png";

backButton = new Image();
backButton.src = "visuals/backButton.png";

var ROWS = 15;
var COLS = 15;

//when all resources are loaded, go to the start screen
window.onload = startScreen;

<<<<<<< HEAD
//sets up the title and buttons for the introduction screen
=======
/**
* Sets up the title and buttons for the introduction screen
*/
>>>>>>> master
function startScreen() {
	canvas.style.backgroundColor = "transparent";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(title, canvas.width/2 - title.width/2, 
		canvas.height/3 - title.height/2, title.width, title.height);
	ctx.drawImage(startButton, canvas.width/3 - startButton.width/2, 
		3*canvas.height/4 - startButton.height/2, startButton.width, 
		startButton.height);
	ctx.drawImage(instructButton, 2* canvas.width/3 - instructButton.width/2, 
		3*canvas.height/4 - instructButton.height/2, instructButton.width,
		instructButton.height);
	ctx.drawImage(leftArrow, 0, 0, leftArrow.width, leftArrow.height);
	spotlight.addEventListener("mousedown", startScreenClicks);
}

<<<<<<< HEAD
//
=======
/**
* Navigates to proper page from the start screen if the buttons are clicked
*/
>>>>>>> master
function startScreenClicks(event) {
	if(ButtonHover(event, canvas.width/3 - startButton.width/2, 
		3*canvas.height/4 - startButton.height/2, startButton.width, 
		startButton.height)) {
		startGame();
	}
	else if(ButtonHover(event, 2* canvas.width/3 - instructButton.width/2, 
		3*canvas.height/4 - instructButton.height/2, instructButton.width,
		instructButton.height)) {
		instructionScreen();
		spotlight.removeEventListener("mousedown", startScreenClicks);
	}
	else if(ButtonHover(event, 0, 0, leftArrow.width, leftArrow.height)) {
		window.location.href = "http://fuhranku.github.io";
	}
}

/**
* Sets up text and buttons for the instructions page
*/
function instructionScreen() {
	//spotlight.removeEventListener("mousedown", startScreenClicks);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(instructions, 0, 0, instructions.width, instructions.height);
	ctx.drawImage(rightArrow, instructions.width - rightArrow.width, 0,
		rightArrow.width, rightArrow.height);
	spotlight.addEventListener("mousedown", instructScreenClicks);
}

/**
* @typedef {object} MouseEvent
*/

/**
* Navigates to the proper page from the instructions page
* @param {MouseEvent} event
*/
function instructScreenClicks(event) {
	if(ButtonHover(event, instructions.width - rightArrow.width, 0,
		rightArrow.width, rightArrow.height)) {
		controlScreen();
	}
}

/**
* Page describing the controls for the two players
*/
function controlScreen() {
	//Remove the listener to ensure buttons from previous page don't work
	spotlight.removeEventListener("mousedown", instructScreenClicks);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(controls, 0, 0, controls.width, controls.height);
	ctx.drawImage(leftArrow, 0, 0, leftArrow.width, leftArrow.height);
	ctx.drawImage(rightArrow, instructions.width - rightArrow.width, 0,
		rightArrow.width, rightArrow.height);
	spotlight.addEventListener("mousedown", controlScreenClicks);
}

/**
* Navigates to the proper page
* @param {MouseEvent} event
*/
function controlScreenClicks(event) {
	if(ButtonHover(event, instructions.width - rightArrow.width, 0,
		rightArrow.width, rightArrow.height)) {
		startScreen();
		spotlight.removeEventListener("mousedown", controlScreenClicks);
	}
	else if(ButtonHover(event, 0, 0, leftArrow.width, leftArrow.height)) {
		instructionScreen();
	}
}

/**
* Game page; starts the game and calls the loop
*/
function startGame() {
	spotlight.removeEventListener("mousedown", startScreenClicks);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.style.backgroundColor = "black";
	director = new Director();

	//variable keeps track of the time for updating
	lastTime = Date.now();

	maze1 = new Maze(ctx, generateMaze(ROWS, COLS), 5, 5);
	maze2 = new Maze(ctx, generateMaze(ROWS, COLS), 10+floorTile.width*ROWS, 5);

	//uses WASD and the space bar to shoot
	blue = new Character(gctx, bluePlayer, 7, 7, bluePlayer.width/3,
		bluePlayer.height/4, maze1, 200, 87, 83, 65, 68, 32, 32);

	//uses arrow keys to move and 0 to shoot
	red = new Character(gctx, redPlayer, 12+floorTile.width*ROWS, 7,
		redPlayer.width/3, redPlayer.height/4, maze2, 200, 38, 40, 37, 39, 96, 48);
	
	//the flames at the end of the mazes
	redFlame = new Sprite(gctx, redFire, 18+floorTile.width*(COLS*2 -1), 
		13+floorTile.height*(ROWS-1), redFire.height, redFire.height);
	blueFlame = new Sprite(gctx, blueFire, 13+floorTile.width*(COLS-1), 
		13+floorTile.height*(ROWS-1), blueFire.height, blueFire.height);
	
	//game elements are those that need to be constantly updated during the
	//game from the start
	gameElements = [red, blue, redFlame, blueFlame];

	for(var i = 0; i<gameElements.length; i++) {
		gameElements[i].render();
	}
	
	maze1.render();
	maze2.render();

	director.follow();

	//calls the main loop, which updates everything during gameplay
	gameLoop();
}

/**
* Called when one player dies
* Displays the winner and offers options to play again or go back to the start screen
*/
function endScreen() {
	canvas.style.backgroundColor = "transparent";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	gctx.clearRect(0, 0, gameplay.width, gameplay.height);
	if(red.isAlive) {
		ctx.drawImage(redPlayer, redPlayer.width/3, 0, redPlayer.width/3,
			redPlayer.height/4, canvas.width/2 - redPlayer.width/2,
			redPlayer.width, redPlayer.width, redPlayer.height);
	}
	else if(blue.isAlive) {
		ctx.drawImage(bluePlayer, bluePlayer.width/3, 0, bluePlayer.width/3,
			bluePlayer.height/4, canvas.width/2 - bluePlayer.width/2,
			bluePlayer.width, bluePlayer.width, bluePlayer.height);	
	}
	ctx.drawImage(playerWins, canvas.width/2 - playerWins.width/2, 
		2*canvas.height/5, playerWins.width, playerWins.height);
	ctx.drawImage(playAgain, canvas.width/2 - playAgain.width/2, 
		3*canvas.height/5, playAgain.width, playAgain.height);
	ctx.drawImage(backButton, canvas.width/2 - playAgain.width/2, 
		4*canvas.height/5, backButton.width, backButton.height);
	spotlight.addEventListener("mousedown", endScreenClicks);
}

/**
* Navigates to the proper page from the end screen
* @param {MouseEvent} event
*/
function endScreenClicks(event) {
	if(ButtonHover(event, canvas.width/2 - playAgain.width/2, 
		3*canvas.height/5, playAgain.width, playAgain.height)) {
		startGame();
		spotlight.removeEventListener("mousedown", endScreenClicks);
	}
	else if(ButtonHover(event, canvas.width/2 - playAgain.width/2, 
		4*canvas.height/5, backButton.width, backButton.height)) {
		startScreen();
		spotlight.removeEventListener("mousedown", endScreenClicks);
	}
}

/**
* Find the mouse location and checks to see if the location is within the
    boundaries describes by the parameters
* @param {MouseEvent} event
* @param {number} x Describes the x-coordinate of location of bounds
* @param {number } y Describes the y-coordinate of location of bounds
* @param {number} width The width of the bounds
* @param {number} height The height of the bounds
* @return {boolean} Returns whether the mouse location is within the bounds
*/
function ButtonHover(event, x, y, width, height) {
	var mouseX;
    var mouseY;
    var canvas = document.getElementById("canvas");

    if (event.x != undefined && event.y != undefined)
    {
    	mouseX = event.x;
    	mouseY = event.y;
    }
    else // if the browser is Firefox
    {
    mouseX = event.clientX + document.body.scrollLeft +
              document.documentElement.scrollLeft;
    mouseY = event.clientY + document.body.scrollTop +
              document.documentElement.scrollTop;
    }

    mouseX -= canvas.offsetLeft;
    mouseY -= canvas.offsetTop;
	if((mouseX > x && mouseX < x + width) && (mouseY > y && mouseY< y + height)) {
		return true;
	}
	return false;
}

/**
* Director class keeps track of lights in the game
* @constructor
*/
function Director() {
	this.lights = false;
}

/**
* Operates on instance of Director class and uses spotlights to follow players
*/
Director.prototype.follow = function() {
	var blueX = blue.xPos + (blue.width/2);
	var blueY = blue.yPos + (blue.height/2);
	var redX = red.xPos + (red.width/2);
	var redY = red.yPos + (red.height/2);
	var radius = 60;

	//first paints the whole screen black
	sctx.clearRect(0, 0, gameplay.width, gameplay.height);
	sctx.fillStyle = 'black';
	sctx.fillRect(0, 0, gameplay.width, gameplay.height);
	sctx.save();

	//draws circle around blue player
	sctx.beginPath();
	sctx.arc(blueX, blueY, radius, 0, 2 * Math.PI);

	//clips the circle and erases it
	sctx.clip();
	sctx.clearRect(0, 0, gameplay.width, gameplay.height);

	//go back and draw a circle around red player
	sctx.restore();
	sctx.save();
	sctx.beginPath();
	sctx.arc(redX, redY, radius, 0, 2 * Math.PI);

	//clip the circle and erase it
	sctx.clip();
	sctx.clearRect(0, 0, gameplay.width, gameplay.height);
	sctx.restore();
}

/**
* Operates on instance of the Director class to illuminate the canvas
*/
Director.prototype.lightsOn = function() {
	sctx.clearRect(0, 0, gameplay.width, gameplay.height);
}

/**
* The main game loop, it calls the update method continuously while the game
*    is in play and redraws the characters in their new positions. Checks if 
*    the players are still alive and calculates the time elapsed.
*/
function gameLoop() {
	var now = Date.now();
	var dt = (now-lastTime)/1000.0; //time elapsed in seconds

	update(dt);
	for(var i = 0; i<gameElements.length; i++) {
		if(gameElements[i].isAlive) {
			gameElements[i].render();
		}
	}

	for(var i = 0; i<maze1.fireballs.length; i++) {
		maze1.fireballs[i].render();
	}
	for(var i = 0; i<maze2.fireballs.length; i++) {
		maze2.fireballs[i].render();
	}

	lastTime = now;
	if(red.isAlive && blue.isAlive) {
		window.requestAnimationFrame(gameLoop);
	}
	else {
		endScreen();
	}
}

/**
* Updates the positions of all game elements including players and projectiles
*    and whether players have finished the maze
* @param {number} deltaTime The time elapsed since last update
*/
function update(deltaTime) {
	gctx.clearRect(0, 0, gameplay.width, gameplay.height);
	handleInput(blue, red);
	
	if(red.isAlive && blue.isAlive) {
		red.move(deltaTime);
		blue.move(deltaTime);
	}

	if(!director.lights) {
		director.follow();
	}

	//check for players finishing the maze
	if(maze1.portalOn || !blue.canShoot || !red.canShoot) {
		if(reachFinish(blue, maze1)) {
			blue.canShoot = true;
			blueFlame.isAlive = false;
			maze1.shutPortal();
			maze2.shutPortal();
			director.lights = true;
			director.lightsOn();
			if(redFlame.isAlive) {
				//teleport to other maze
				blue.maze = maze2;
				blue.xPos = blue.maze.xPos + 7;
				blue.yPos = blue.maze.yPos + 7;
			}
		}
		
		else if(reachFinish(red, maze2)) {
			red.canShoot = true;
			maze1.shutPortal();
			maze2.shutPortal();
			director.lights = true;
			director.lightsOn();
			redFlame.isAlive = false;
			if(blueFlame.isAlive) {
				//teleport to other maze
				red.maze = maze1;
				red.xPos = red.maze.xPos + 7;
				red.yPos = red.maze.yPos + 7;
			}
		}
	}

	//make all fireballs move, and remove ones that hit a wall/border
	for(var i = maze1.fireballs.length-1; i>=0 ; i--) {
		maze1.fireballs[i].move(deltaTime);
		if(!maze1.fireballs[i].isAlive) {
			removeElement(maze1.fireballs, i);
		}
	}
	
	for(var i = maze2.fireballs.length-1; i>=0; i--) {
		maze2.fireballs[i].move(deltaTime);
		if(!maze2.fireballs[i].isAlive) {
			removeElement(maze2.fireballs, i);
		}
	}
	
	//updates the frame of the fireballs at the finish tile
	if(redFlame.isAlive) {
		redFlame.nextFrame(4);
	}
	if(blueFlame.isAlive) {
		blueFlame.nextFrame(4);
	}

	//updates whether players can shoot yet after delay
	if(!blue.canFire) {
		blue.fireCounter += deltaTime;
		if(blue.fireCounter >= blue.fireCooldown) {
			blue.canFire = true;
			blue.fireCounter = 0;
		}
	}

	if(!red.canFire) {
		red.fireCounter += deltaTime;
		if(red.fireCounter >= red.fireCooldown) {
			red.canFire = true;
			red.fireCounter = 0;
		}
	}
}

/**
* @typedef {object} KeyEvent
*/

/**
* Handles keyboard input to move and shoot. Speed is measured in pixels/second
* @param {Character} player Instance of Character class which represents player
* @param {Character} player2 Instance of Character class representing the other
*    player
*/
function handleInput(player, player2) {

	/**
	* Handles select keys when they are pressed
	* @param {KeyEvent} e
	*/
	document.onkeydown = function(e) {
		e = e || window.event;
		//direction value - 0 is down, 1 is right, 2 is up, and 3 is left
		//up arrow
		if(e.keyCode === player.up) {
			player.direction = 2;
			player.ySpeed = -1*player.speed;
			player.xSpeed = 0;
		}

		//down arrow
		else if(e.keyCode === player.down) {
			player.direction = 0;
			player.ySpeed = player.speed;
			player.xSpeed = 0;
		}
		//left arrow
		else if(e.keyCode === player.left) {
			player.direction = 3;
			player.xSpeed = -1*player.speed;
			player.ySpeed = 0;
		}

		//right arrow
		else if(e.keyCode === player.right) {
			player.direction = 1;
			player.xSpeed = player.speed;
			player.ySpeed = 0;
		}

		//player 2 up arrow
		if(e.keyCode === player2.up) {
			player2.direction = 2;
			player2.ySpeed = -1*player.speed;
			player2.xSpeed = 0;
		}

		//player 2 down arrow
		else if(e.keyCode === player2.down) {
			player2.direction = 0;
			player2.ySpeed = player2.speed;
			player2.xSpeed = 0;
		}
		//player 2 left arrow
		else if(e.keyCode === player2.left) {
			player2.direction = 3;
			player2.xSpeed = -1*player2.speed;
			player2.ySpeed = 0;
		}

		//player 2 right arrow
		else if(e.keyCode === player2.right) {
			player2.direction = 1;
			player2.xSpeed = player2.speed;
			player2.ySpeed = 0;
		}

		//player shoot button with delay
		if(player.canShoot && e.keyCode === player.shoot) {
			if(player.canFire) {
				player.maze.addFireball(player, blueFire);
				player.canFire = false;
			}
		}
		if(player2.canShoot && ((e.keyCode === player2.shoot) || 
			(e.keyCode === player2.shoot2))) {
			if(player2.canFire) {
				player2.maze.addFireball(player2, redFire);
				player2.canFire = false;
			}
		}
		
	}

	/**
	* Handles keys when they are released
	* @param {KeyEvent} e
	*/
	document.onkeyup = function(e) {
		//for player 1
		if(e.keyCode === player.up || e.keyCode === player.down) {
			player.frameIndex = 1;
			player.ySpeed = 0;
		}
		if(e.keyCode === player.left || e.keyCode === player.right) {
			player.frameIndex = 1;
			player.xSpeed = 0;
		}
		//for player 2
		if(e.keyCode === player2.up || e.keyCode === player2.down) {
			player2.frameIndex = 1;
			player2.ySpeed = 0;
		}
		if(e.keyCode === player2.left || e.keyCode === player2.right) {
			player2.frameIndex = 1;
			player2.xSpeed = 0;
		}
	}
}


/**
* Checks all the wall tiles to see if any collide with the sprite
* @param {Sprite} player A sprite, either a character or a fireball
* @param {Maze} mazeObj The maze the sprite belongs in
* @return {Sprite} Returns the wall tile that the player collided with and
*    null if nothing was hit
*/
function wallCollision(player, mazeObj) {
	
	var tileList = mazeObj.getSpriteList(); 

	for(var i = 0; i< mazeObj.maze.length; i++) {
		for(var j = 0; j<mazeObj.maze.length; j++) {
			//if the tile we are currently looking at is a wall
			if(mazeObj.maze[i][j] === 1 && overlap(player, tileList[i][j], 4)) {
				return tileList[i][j];
			}
		}
	}
	return null;
}

/**
* Checks if a player made it to the finish tile of the maze
* @param {Character} player The player being checked
* @param {Maze} mazeObj The maze the player belongs in
* @return {Boolean} Returns whether the player finished the maze or not
*/
function reachFinish(player, mazeObj) {
	return overlap(player, mazeObj.portalSprite, 0);
}

/**
* Checks if a player collided with any of the maze's borders
* @param {Character} player The player being checked
* @param {Maze} mazeObj The maze the player belongs in
* @return {Boolean} Returns whether the player hit a maze border or not
*/
function borderCollision(player, mazeObj) {
	//colliding with left border
	if(player.xPos < mazeObj.xPos) {
		return mazeObj.xPos - player.xPos;
	}
	//colliding with right border
	else if(player.xPos + player.width > mazeObj.xPos + floorTile.width*COLS) {
		return (player.xPos + player.width) - 
		(mazeObj.xPos + floorTile.width*COLS);
	}
	//colliding with top border
	else if(player.yPos < mazeObj.yPos) {
		return mazeObj.yPos - player.yPos;
	}
	//colliding with bottom border
	else if(player.yPos + player.height > mazeObj.yPos + floorTile.height*ROWS) {
		return (player.yPos + player.height) - 
		(mazeObj.yPos + floorTile.height*ROWS);
	}

	else {
		return 0;
	}
}

/**
* Tests for collision between two Sprites within a range of forgiveness
* @param {Sprite} sprite1 The first sprite to be tested against the second
* @param {Sprite} sprite2 The second sprite to be tested against the first
* @param {number} dev The number of pixels up to which two objects can overlap
*    by before it is considered a collision
* @return {Boolean} Returns whether two items collided
*/
function overlap(sprite1, sprite2, dev) {
	var verticalOverlap = false;
	var horizontalOverlap = false;
	//if intersects & sprite1 to the right of sprite2
	if(sprite1.xPos - sprite2.xPos > dev && 
		(sprite2.xPos + sprite2.width) - sprite1.xPos > dev) {
		horizontalOverlap = true;
	}
	//if intersects & sprite1 to the left of sprite2
	else if((sprite1.xPos + sprite1.width) - sprite2.xPos > dev && 
		(sprite2.xPos + sprite2.width) - (sprite1.xPos + sprite1.width) > dev) {
		horizontalOverlap = true;
	}
	//if intersects & sprite1 above sprite2
	if(sprite1.yPos + sprite1.height - sprite2.yPos > dev && 
		(sprite2.yPos + sprite2.height) - (sprite1.yPos + sprite1.height) > dev) {
		verticalOverlap = true;
	}
	//if intersects & sprite2 above sprite1
	else if(sprite1.yPos - sprite2.yPos > dev && 
		(sprite2.yPos + sprite2.height) - sprite1.yPos > dev) {
		verticalOverlap = true;
	}
	//if sprite1 vertically encompasses sprite2
	else if(sprite1.yPos <= (sprite2.yPos + dev) && 
		(sprite1.yPos + sprite1.height >= (sprite2.yPos + sprite2.height - dev))) {
		verticalOverlap = true;
	}
	return (horizontalOverlap && verticalOverlap);
}

/**
* Calculates the amount of overlap between two sprites assuming they collided
* @param {Character} sprite1 The first sprite in the collision
* @param {Character} sprite2 The second sprite in the collision
* @param {number} direction The value denoting direction of the character
* @param {number} dev The number of pixels up to which two objects can overlap
*    by before it is considered a collision
* @return {number} Returns the number of pixels they overlap by
*/
function overlapAmount(sprite1, sprite2, direction, dev) {
	//if char facing down
	if(direction === 0) {
		return sprite1.yPos + sprite1.height - sprite2.yPos - dev;
	}
	//char facing right
	else if(direction === 1) {
		return sprite1.xPos + sprite1.width - sprite2.xPos - dev;
	}
	//char facing up
	else if(direction === 2) {
		return sprite2.yPos + sprite2.height - sprite1.yPos - dev;
	}
	//char facing left
	else {
		return sprite2.xPos + sprite2.width - sprite1.xPos - dev;
	}
}

/**
* Simple class representing a vector
* @param {number} x The x component of the vector
* @param {number} y The y component of the vector
* @constructor
*/
function Vector(x, y) {
	this.x = x;
	this.y = y;
}

/**
* Representation of a game sprite
* @param {object} context The canvas context this sprite exists in
* @param {Image} img The image of the sprite
* @param {number} x The x-coordinate of the sprite
* @param {number} y The y-coordinate of the sprite
* @param {number} width The width of the sprite
* @param {number} height The height of the sprite
* @constructor
*/
function Sprite(context, img, x, y, width, height) {
	this.isAlive = true;
	this.context = context;
	this.image = img;
	this.xPos = x;
	this.yPos = y;
	this.width = width;
	this.height= height;
	this.frameIndex = 0;
	this.frameCounter = 0;
	this.frameCap = 5;
}

/**
* Operates on an instance of the Sprite class and draws it on it's context
*/
Sprite.prototype.render = function() {
	this.context.drawImage(
		this.image,
		this.width*this.frameIndex,
		0,
		this.width,
		this.height,
		this.xPos,
		this.yPos,
		this.width,
		this.height);
}

/**
* Operates on an instance of the Sprite class and shift it's image to the next
*    frame number depending on total number of frames
* @param {number} numberOfFrames The total number of frames to shift through
*/
Sprite.prototype.nextFrame = function(numberOfFrames) {
	this.frameCounter += 1;
		if(this.frameCounter === this.frameCap) {
			this.frameIndex = (this.frameIndex+1)%numberOfFrames;
			this.frameCounter = 0;
		}
}

/**
* Representation of a game character/player
* @param {object} context The canvas context this character exists in
* @param {Image} img The image of the character
* @param {number} x The x-coordinate of the character
* @param {number} y The y-coordinate of the character
* @param {number} width The width of the character
* @param {number} height The height of the character
* @param {Maze} mazeObj The maze the character belongs in
* @param {number} speed The speed in pixels per second
* @param {number} up The keycode for the character to go up
* @param {number} down The keycode for the character to go down
* @param {number} left The keycode for the character to go left
* @param {number} right The keycode for the character to go right
* @param {number} shoot The keycode for the character to shoot
* @param {number} shoot2 The alternate keycode for the character to shoot
* @constructor
* @extends {Sprite}
*/
function Character(context, img, x, y, width, height, mazeObj, speed, up, down, left, right, shoot, shoot2) {
	Sprite.call(this, context, img, x, y, width, height);
	this.canShoot = false;
	this.canFire = true;
	this.fireCounter = 0;
	this.fireCooldown = 2;
	this.direction = 0;
	this.frameIndex = 1;
	this.speed = speed;
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.maze = mazeObj;
	this.up = up;
	this.down = down;
	this.left = left;
	this.right = right;
	this.shoot = shoot;
	this.shoot2 = shoot2;
}

/**
* Simple function to create an object with stated prototype
* @param {object} proto The prototype
* @return {object} Returns the object created
*/
function createObject(proto) {
	function creator() { }
	creator.prototype = proto;
	return new creator();
}

Character.prototype = createObject(Sprite.prototype);
Character.prototype.constructor = Character;

/**
* Change the coordinates of the character to represent moving
* @param {number} deltaTime The time elapsed since last update
*/
Character.prototype.move = function(deltaTime) {
	this.xPos += Math.floor(this.xSpeed*deltaTime);
	this.yPos += Math.floor(this.ySpeed*deltaTime);

	//collide is the tile sprite that the character collided with
	var collide = wallCollision(this, this.maze);

	//bounds is the amount the character overlapped with the border
	var bounds = borderCollision(this, this.maze);
	if(collide != null) {
		var extra = overlapAmount(this, collide, this.direction, 4);
		//char facing down
		if(this.direction === 0) {
			this.yPos -= extra;
		}
		//char facing right
		else if(this.direction === 1) {
			this.xPos -= extra;
		}
		//char facing up
		else if(this.direction === 2) {
			this.yPos += extra;
		}
		//char facing left
		else {
			this.xPos += extra;
		}
	}
	//if overlapping with the border, move position back by amount of overlap
	if(bounds != 0) {
		if(this.direction ==- 0) {
			this.yPos -= bounds;
		}
		else if(this.direction === 1) {
			this.xPos -= bounds;
		}
		else if(this.direction === 2) {
			this.yPos += bounds;
		}
		else {
			this.xPos += bounds;
		}
	}
	//if moving then switch frames to indicate walking
	if(this.xSpeed + this.ySpeed != 0) {
		this.nextFrame(3);
	}
}

/**
* Operates on an instance of the Character class and draws it on it's context
*/
Character.prototype.render = function() {
	this.context.drawImage(
		this.image,
		this.width * this.frameIndex,
		this.height * this.direction,
		this.width,
		this.height,
		this.xPos,
		this.yPos, 
		this.width,
		this.height);
}

/**
* A class representing the fireballs the players shoot
* @param {object} context The context the fireball resides in
* @param {Image} img The image representing the fireball
* @param {number} height The height (and source width) of the fireball image
* @param {Character} origin The character who shot this fireball
* @param {number} speed The speed of the fireball in pixels per second
* @constructor
* @extends {Sprite}
*/
function Fireball(context, img, height, origin, speed) {
	Sprite.call(this, context, img, origin.xPos + 3, origin.yPos + 5, height, height);
	this.origin = origin;
	this.maze = origin.maze;
	this.speed = speed;
	this.direction = origin.direction;
	this.frameCap = 4;
}

Fireball.prototype = createObject(Sprite.prototype);
Fireball.prototype.constructor = Fireball;

/**
* Change the coordinates of the fireball to represent moving
* @param {number} deltaTime The time elapsed since last update
*/
Fireball.prototype.move = function(deltaTime) {
	//char facing down
	if(this.direction === 0) {
		this.yPos += Math.floor(this.speed*deltaTime);
	}
	//char facing right
	else if(this.direction === 1) {
		this.xPos += Math.floor(this.speed*deltaTime);
	}
	//char facing up
	else if(this.direction === 2) {
		this.yPos -= Math.floor(this.speed*deltaTime);
	}
	//char facing left
	else {
		this.xPos -= Math.floor(this.speed*deltaTime);
	}
	
	if(wallCollision(this, this.maze) != null || borderCollision(this, this.maze) != 0) {
		this.isAlive = false;
	}

	if(overlap(this, blue, 0) && this.origin != blue) {
		this.isAlive = false;
		blue.isAlive = false;
	}

	if(overlap(this, red, 0) && this.origin != red) {
		this.isAlive = false;
		red.isAlive = false;
	}

	this.nextFrame(4);
}


/**
* Maze object to describe a new maze
* @param {object} context The context the maze resides in
* @param {Array} array The array of numbers representing this maze
* @param {number} startX The starting x-coordinate of the maze
* @param {number} startY The starting y-coordinate of the maze
* @constructor
*/
function Maze(context, array, startX, startY) {
	this.context = context;
	this.maze = array;
	this.xPos = startX;
	this.yPos = startY;
	this.width = COLS*floorTile.width;
	this.height = ROWS*floorTile.height;
	this.portalOn = true;
	this.fireballs = new Array();
	this.portalSprite = new Sprite(this.context, finish, this.xPos+finish.width*(COLS-1),
	 this.yPos + finish.height*(ROWS-1), finish.width, finish.height);
}

/**
* Operates on an instance of the Maze class to draw the maze on its canvas
*/
Maze.prototype.render = function() {
	for(var i = 0; i<ROWS; i++) {
		for(var j =0; j<COLS; j++) {
			if(this.maze[i][j] === 0)
				this.context.drawImage(floorTile, this.xPos+floorTile.width*i, this.yPos+floorTile.height*j);
			else
				this.context.drawImage(wallTile, this.xPos+wallTile.width*i, this.yPos+wallTile.height*j);
		}
	}
	this.context.drawImage(finish, this.xPos+finish.width*(COLS-1), this.yPos+finish.height*(ROWS-1));
}

/**
* Operates on an instance of the Maze class to change the finish tile from blue
*    to red and change the property of its Maze to reflect the closed "portal"
*/
Maze.prototype.shutPortal = function() {
	this.portalOn = false;
	this.context.drawImage(blocked, this.portalSprite.xPos, this.portalSprite.yPos);
}

/**
* Operates on an instance of the Maze class to add a fireball to the list of
*    fireballs currently active in the maze
* @param {Character} player The player whom shot the fireball
* @param {Image} img The image of the fireball
*/
Maze.prototype.addFireball = function(player, img) {
	var temp = new Fireball(gctx, img, redFire.height, player, 300);
	this.fireballs.push(temp);
	temp.render();
}

/**
* Operates on an instance of the Maze class to get an array of Sprites in the
*    maze representing the tiles
* @return {Array} Returns the maze array, but with Sprite objects representing
*    each tile
*/
Maze.prototype.getSpriteList = function() {
	//my array of tiles as Sprite objects
	var tileList = create2DArray(ROWS, COLS);
	for(var i = 0; i<this.maze.length; i++) {
		for(var j =0; j<this.maze[i].length; j++) {
			if(this.maze[i][j] === 0)
				tileList[i][j] = new Sprite(this.context, floorTile, this.xPos+floorTile.width*i,
					this.yPos+floorTile.height*j, floorTile.width, floorTile.height);
			else
				tileList[i][j] = new Sprite(this.context, wallTile, this.xPos+wallTile.width*i,
					this.yPos+wallTile.height*j, wallTile.width, wallTile.height);
		}
	}
	return tileList;
}

/**
* Creates an integer array that represents a maze with r rows and c columns.
*    The maze is generated using Prim's algorithm to generate a minimum
*    spanning tree, a tree with no cycles and thus a maze with 1 solution.
*    Walls of the maze are 1's and paths are 0's .
* @param {number} r The number of rows in the maze
* @param {number} c The number of columsn in the maze
* @return {Array} Returns a 2D Array consisting of 1's and 0's to represent
*    the maze's walls and floors.
*/
function generateMaze(r, c) {
	//the maze represented by a 2d array with 1's representing the walls and 0's representing the floors
	//create a grid full of walls
	var maze = create2DArray(r, c);
	for(var i = 0; i<r; i++) {
		for(var j = 0; j<c; j++) {
			maze[i][j] = 1;
		}
	}
	//initial start place
	maze[0][0] = 0;

	//add adjacent walls to the wall list
	var walls = new Array();
	walls.push(new Vector(0, 1));
	walls.push(new Vector(1, 0)); 

	//while there are walls in the list
	while(walls.length > 0) {
		//pick a random wall from the list
		var random = Math.floor((Math.random())*walls.length);
		var randomX = walls[random].x;
		var randomY = walls[random].y; 
		//which direction did the wall come from? look in the direction opposite
		//if the cell on the opposite side isnt in the maze yet

		//if left of wall is in the maze and is a passage, then look to the right
		//if the right is not in the maze, add it and the wall to the maze, and add
		//adjacent walls to the wall list
		if(randomX - 1 >=0 && maze[randomX -1][randomY] === 0)
		{
			if(randomX +1 <= maze.length-1 && maze[randomX+1][randomY] === 1) 
			{
				maze[randomX][randomY] = 0;
				maze[randomX +1][randomY] = 0;
				if(randomX+2 <=maze.length-1 && maze[randomX+2][randomY] === 1) {
					walls.push(new Vector(randomX+2, randomY));
				}
				if(randomY+1 <=maze.length-1 && maze[randomX+1][randomY+1] ===1) {
					walls.push(new Vector(randomX+1,randomY+1));
				}
				if(randomY-1 >= 0 && maze[randomX+1][randomY-1] === 1) {
					walls.push(new Vector(randomX+1, randomY-1));
				}
			}
		}
 
		//if the right wall is in the maze and is a passge, do the same thing to the left
		else if(randomX + 1 <=maze.length-1 && maze[randomX +1][randomY] === 0)
		{
			if(randomX -1 >= 0 && maze[randomX-1][randomY] === 1) 
			{
				maze[randomX][randomY] = 0;
				maze[randomX -1][randomY] = 0;
				if(randomX-2 >= 0 && maze[randomX-2][randomY] === 1) {
					walls.push(new Vector(randomX-2, randomY));
				}
				if(randomY+1 <=maze.length-1 && maze[randomX-1][randomY+1] ===1) {
					walls.push(new Vector(randomX-1,randomY+1));
				}
				if(randomY-1 >= 0 && maze[randomX-1][randomY-1] === 1) {
					walls.push(new Vector(randomX-1, randomY-1));
				}
			}
		}

		//if the bottom wall is in the maze and is a passsage, do the same thing to the top wall
		else if(randomY + 1 <=maze.length-1 && maze[randomX][randomY+1] === 0)
		{
			if(randomY -1 >= 0 && maze[randomX][randomY -1] === 1) 
			{
				maze[randomX][randomY] = 0;
				maze[randomX][randomY-1] = 0;
				if(randomX-1 >= 0 && maze[randomX-1][randomY-1] === 1) {
					walls.push(new Vector(randomX-1, randomY-1));
				}
				if(randomY-2 >= 0 && maze[randomX][randomY-2] ===1) {
					walls.push(new Vector(randomX,randomY-2));
				}
				if(randomX+1 <=maze.length-1 && maze[randomX+1][randomY-1] === 1) {
					walls.push(new Vector(randomX+1, randomY-1));
				}
			}
		}

		//if the top wall is in the maze and is a passage, do the same thing to the bottom wall
		else if(randomY - 1 >=0 && maze[randomX][randomY -1] === 0)
		{
			if(randomY +1 <= maze.length-1 && maze[randomX][randomY +1] === 1) 
			{
				maze[randomX][randomY] = 0;
				maze[randomX][randomY +1] = 0;
				if(randomY+2 <= maze.length-1 && maze[randomX][randomY+2] === 1) {
					walls.push(new Vector(randomX, randomY+2));
				}
				if(randomX+1 <=maze.length-1 && maze[randomX+1][randomY+1] ===1) {
					walls.push(new Vector(randomX+1,randomY+1));
				}
				if(randomX-1 >= 0 && maze[randomX-1][randomY+1] === 1) {
					walls.push(new Vector(randomX-1, randomY+1));
				}
			}
		}
		//remove the wall from the list
		removeElement(walls, random);
	}
	return maze;
}

/**
* A simple function to create a new, empty 2D array
* @param {number} rows The number of rows in the array
* @param {number} cols The number of cols in the array
* @return {Array} Returns an empty 2d array with 'rows' rows and 'cols' columns
*/
function create2DArray(rows, cols) {
	var array = new Array(rows);
	for(var i = 0; i<rows; i++) {
		array[i] = new Array(cols);
	} 
	return array;
}

/**
* Simple function to remove an element from an unordered array
* @param {Array} list The array to operate on
* @param {number} index The index of the element to remove
*/
function removeElement(list, index) {
	var v = list[list.length-1];
	list[index] = v;
	list.pop();
}