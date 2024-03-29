"use strict";

// Tennis Pong
// by Audrey Coulombe
//
// A "simple" implementation of Pong with scoring system based on opacity
// Up and down keys control the right hand paddle, W and S keys control the left hand paddle

// checks if the game is over
let gameOver = false;
// Whether the game has started
let playing = false;

// Game colors (using hexadecimal)
let bgColor = 0;
let fgColor = 255;

// BALL
// A ball object with the properties of position, size, velocity, and speed
let ball = {
  x: 0,
  y: 0,
  size: 20,
  vx: 0,
  vy: 0,
  speed: 5
}

// PADDLES
// Basic definition of a left paddle object with its key properties of position, size, velocity, speed, score and opacity
let leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 87,
  downKey: 83,
  score: 0,
  opacity: 255
}

// RIGHT PADDLE
// Basic definition of a left paddle object with its key properties of position, size, velocity, speed, score and opacity
let rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 38,
  downKey: 40,
  score: 0,
  opacity: 255
}

// sound variables
let beepSFX;
let cheeringSFX;
let tennisGruntSFX;

// images variables for background and ball
let tennisYardBg;
let tennisBall;

// preload()
//
// Loads the beep, grunt and cheering audio and the images for the backgroung and the ball
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  tennisGruntSFX = new Audio("assets/sounds/tennisGrunt.mp3");
  cheeringSFX = new Audio("assets/sounds/cheering.wav");

  tennisYardBg = loadImage("assets/images/tennisYard.jpg");
  tennisBall = loadImage("assets/images/tennisBall.png");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640, 480);
  rectMode(CENTER);
  noStroke();
  fill(fgColor);

  setupPaddles();
  resetBall();
}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 0 + leftPaddle.w;
  leftPaddle.y = height / 2;

  // Initialise the right paddle position
  rightPaddle.x = width - rightPaddle.w;
  rightPaddle.y = height / 2;
}

// draw()
//
// Calls the appropriate functions to run the game
function draw() {
  // Draws background as a tennis yard
  image(tennisYardBg, 0, 0, width, height);

  if (playing && !gameOver) {
    // If the game is in play, we check if game is over, handle input, move the elements around and show score
    checkGameOver();
    handleInput(leftPaddle);
    handleInput(rightPaddle);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);

    // Check if the ball went out of bounds and respond if so
    if (ballIsOutOfBounds()) {
      // If it went off either side, reset it
      resetBall();
      // This is where we would likely count points, depending on which side the ball went off...
    }
  }

  // We always display the paddles, ball and score on console
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();
  displayScore();

  //if the game is over, display the game over message
  if (gameOver) {
    showGameOver();
  }
  //if not playing, display start message
  else if (!playing) {
    displayStartMessage();
  }
}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the left and right paddles respectively.
function handleInput(paddle) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  }
  else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePositions()
//
// Sets the positions of the paddles and ball based on their velocities
function updatePaddle(paddle) {
  // Update the paddle position based on its velocity
  paddle.y += paddle.vy;
}

// updateBall()
//
// Sets the position of the ball based on its velocity
function updateBall() {
  // Update the ball's position based on velocity
  ball.x += ball.vx;
  ball.y += ball.vy;
}

// ballIsOutOfBounds()
//
// Checks if the ball has gone off the left or right
// Returns true if so, false otherwise
function ballIsOutOfBounds() {
  // Checks for ball going off the left side. If it does, upgrades score and opacity
  if (ball.x < 0) {
    rightPaddle.score += 1;
    leftPaddle.opacity -= 25;
  }
  // Checks for ball going off the right side. If it does, upgrades score and opacity
  if (ball.x > width) {
    leftPaddle.score += 1;
    rightPaddle.opacity -= 25;
  }

  if (ball.x < 0 || ball.x > width) {
    // Play cheering sound effect by rewinding and then playing
    cheeringSFX.currentTime = 0;
    cheeringSFX.play();
    return true;
  }
  else {
    return false;
  }
}

// checkBallWallCollision()
//
// Check if the ball has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkBallWallCollision() {
  // Check for collisions with top or bottom...
  if (ball.y < 0 || ball.y > height) {
    // It hit so reverse velocity
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// checkBallPaddleCollision(paddle)
//
// Checks for collisions between the ball and the specified paddle
function checkBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // We will calculate the top, bottom, left, and right of the
  // paddle and the ball to make our conditionals easier to read...
  let ballTop = ball.y - ball.size / 2;
  let ballBottom = ball.y + ball.size / 2;
  let ballLeft = ball.x - ball.size / 2;
  let ballRight = ball.x + ball.size / 2;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h / 2;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2;

  // First check the ball is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction
      ball.vx = -ball.vx;
      // Play our grunt sound effect by rewinding and then playing
      tennisGruntSFX.currentTime = 0;
      tennisGruntSFX.play();
    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle(paddle) {
  // Draw the paddles with the opacity variable
  push();
  fill(fgColor, paddle.opacity);
  rect(paddle.x, paddle.y, paddle.w, paddle.h);
  pop();
}

// displayBall()
//
// Draws the ball on screen as a tennis ball
function displayBall() {
  // Draw the ball
  image(tennisBall, ball.x, ball.y, ball.size, ball.size);
}

// resetBall()
//
// Initialise the ball's position and velocity
function resetBall() {
  // if right team makes a point, reset ball and move it toward right team
  if (ball.x < 0) {
    ball.vx = ball.speed;
  }
  // if left team makes a point, reset ball and move it toward left team
  else if (ball.x > width) {
    ball.vx = -ball.speed;
  }
  // if the game just started and no point has been made yet, move the ball toward the right
  else {
    ball.vx = ball.speed;
  }
  // Sets the starting position of the ball
  ball.x = width / 2;
  ball.y = height / 2;
  // Sets a random velocity in y axe so the ball doesn't always arrive at same level when it resets
  ball.vy = random(-4, 4);
}

// displayStartMessage()
//
// Shows a message about how to start the game
function displayStartMessage() {
  push();
  textAlign(CENTER, CENTER);
  textSize(32);
  text("CLICK TO START", width / 2, height / 2);
  pop();
}

// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  playing = true;
}

// displayScore()
//
// shows the score of each team on console
function displayScore() {
  console.log("left team score:" + leftPaddle.score);
  console.log("right team score:" + rightPaddle.score);
}

//checkGameOver()
//
// checks if one of the player have a score of ten or more. If so, the game is over.
function checkGameOver() {
  if ((rightPaddle.score >= 10) || (leftPaddle.score >= 10)) {
    // If so, the game is over
    gameOver = true;
  }
}

//showGameOver()
//
// Display text about the game being over
function showGameOver() {
  // Set up the font & display text in the centre of the screen
  textSize(50);
  textAlign(CENTER, CENTER);
  fill(255);
  noStroke();
  // If right team has 10 points or more, display a message saying the right team won
  if (rightPaddle.score >= 10) {
    text("Right team wins!", width / 2, height / 3);
  }
  // If left team has 10 points or more, display a message saying the left team won
  else if (leftPaddle.score >= 10) {
    text("Left team wins!", width / 2, height / 3);
  }
}
