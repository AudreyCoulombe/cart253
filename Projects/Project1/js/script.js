"use strict";

/******************************************************

Game - Chaser
Pippin Barr

A "simple" game of cat and mouse. The player is a circle and can move with keys,
if they overlap the (randomly moving) prey they "eat it" by sucking out its life
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/

// Track whether the game is over
let gameOver = false;

// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 25;
//Radius increasement when the player eats the prey
let increaseRadius = 0.5;
let playerVX = 0;
let playerVY = 0;
//Tuning: increase player (and prey) speed so the game goes faster and is more fun to play
let playerMaxSpeed = 4;
//player speed when sprinting (when shift is pressed)
let playerSprintSpeed = 6;
//Player speed when not sprinting
let playerInitialSpeed = 4;
//decrease player speed when eating
let decreaseSpeed = 0.05;
// Player health
let playerHealth;
let playerMaxHealth = 255;
// Player fill color
let playerFill = 50;

// Prey position, size, velocity
let preyX;
let preyY;
//Tuning: decrease prey radius so it is harder to catch
let preyRadius = 20;
let preyVX;
let preyVY;
//Tuning: increase prey speed so the game goes faster and the prey is harder to catch
let preyMaxSpeed = 9;

//2 dimensions time variables for noise movement of prey
let tx;
let ty;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 200;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 10;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;
// Images for background player and prey
let underWaterBackground;
let turtlePlayer;
let plasticBagPrey;

//preload
function preload() {
  // Loads the background, player and prey images before the program starts
  underWaterBackground = loadImage("assets/images/underwater.jpeg");
  turtlePlayer = loadImage("assets/images/turtle.png");
  plasticBagPrey = loadImage("assets/images/plasticBag.png");
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500,500);

  noStroke();

  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();
//give a random value to  time variables for noise movement of prey
  tx=random(0,1000);
  ty=random(0,1000);
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  //draw the background with the underwater image
  image(underWaterBackground,0,0,width,height);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }

  //Making the player sprint and loose health faster when shift is pressed
  if (keyIsDown(16)){
    playerMaxSpeed = playerSprintSpeed;
    playerHealth = playerHealth - 2;
  }
  else {
    playerMaxSpeed = playerInitialSpeed;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  }
  else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  }
  else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - 0.5;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);
    //increase player radius when eating prey
    playerRadius += increaseRadius;
    //constrain the radius to a sensible range
    playerRadius = constrain(playerRadius,25,40);
    //decrease player speed when eating prey
    playerInitialSpeed -= decreaseSpeed;
    //constrain the speed to a sensible range
    playerInitialSpeed = constrain(playerInitialSpeed,1,playerInitialSpeed);

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
        // Change the prey's velocity at random intervals
        // random() will be < 0.05 5% of the time, so the prey
        // will change direction on 5% of frames
        //if (random() < 0.05) {
        // Set velocity based on random values to get a new direction
        // and speed of movement
        // Use map() to convert from the 0-1 range of the random() function
        // to the appropriate range of velocities for the prey
        //old code: preyVX = map(random(), 0, 1, -preyMaxSpeed, preyMaxSpeed);
        //old code: preyVY = map(random(), 0, 1, -preyMaxSpeed, preyMaxSpeed);
    //Use map() to convert from the 0-1 range of the noise function
  preyVX = map(noise(tx), 0, 1, -preyMaxSpeed, preyMaxSpeed);
  preyVY = map(noise(ty), 0, 1, -preyMaxSpeed, preyMaxSpeed);

  // Update prey position based on velocity
  preyX = preyX + preyVX;
  preyY = preyY + preyVY;

  //increase time values (to update prey velocity)
  //Tuning: Increase the time value so the prey changes direction more quickly and is less predictable
  tx += 0.06;
  ty += 0.06;
  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  }
  else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  }
  else if (preyY > height) {
    preyY = preyY - height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  push();
  imageMode(CENTER);
  //tint the prey image so its opacity reflects its health
  tint(255, preyHealth);
  //draw the player with the plastic bag image
  image(plasticBagPrey,preyX,preyY,preyRadius * 2,preyRadius * 2);
  pop();
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha value based on health
function drawPlayer() {
  push();
  imageMode(CENTER);
  //tint the player image so its opacity reflects its health
  tint(255, playerHealth);
  //draw the player with the turtle image
  image(turtlePlayer,playerX,playerY,playerRadius*2,playerRadius*2);
  pop();
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "You ate " + preyEaten + " prey\n";
  gameOverText = gameOverText + "before you died."
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}
