// Predator-Prey Simulation
// by Audrey Coulombe
//
// Creates a predator and three preys (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator looses health over time, so must keep eating to survive.

// Starting state of the game
let state = "TITLE";
let gameOver = false;

// Boosting state (here, true when touching the elephant seal)
let boosting = false;

// Our predator
let shark;

// The three preys and the elephant seal
let yellowFish;
let greyFish;
let seahorse;
let elephantSeal;

// The two divers
let diverGoingRight;
let diverGoingLeft;

// Images for predators, preys, background, foreground, start page, divers and elephant seal
let sharkImage;
let yellowFishImage;
let greyFishImage;
let seahorseImage;
let backgroundWaterImage;
let foregroundSeaWeedImage;
let startPageImage;
let diverGoingRightImage;
let diverGoingLeftImage;
let elephantSealImage;

// Sound
let jawsThemeSFX;

// preload()
// Preload images and sounds
function preload() {
  // Load images
  sharkImage = loadImage("assets/images/shark.png");
  yellowFishImage = loadImage("assets/images/yellowFish.png");
  greyFishImage = loadImage("assets/images/greyFish.png");
  seahorseImage = loadImage("assets/images/seahorse.png");
  backgroundWaterImage = loadImage("assets/images/background.jpg");
  foregroundSeaWeedImage = loadImage("assets/images/foreground.png");
  startPageImage = loadImage("assets/images/startPage.png");
  diverGoingRightImage = loadImage("assets/images/diverGoingRight.png");
  diverGoingLeftImage = loadImage("assets/images/diverGoingLeft.png");
  elephantSealImage = loadImage("assets/images/elephantSeal.png");
  // Load sounds
  jawsThemeSFX = loadSound("assets/sounds/JawsTheme.mp3");
}

// setup()
// Sets up a canvas
// Creates objects for the predator, preys, obstacles and boost
// plays the sound in loop
function setup() {
  createCanvas(windowWidth, windowHeight);
  shark = new Predator(width / 3, height / 5 * 2, 5, 40, sharkImage);
  yellowFish = new Prey(random(0, width), random(0, height), 10, 50, yellowFishImage);
  greyFish = new Prey(random(0, width), random(0, height), 8, 60, greyFishImage);
  seahorse = new Prey(random(0, width), random(0, height), 20, 10, seahorseImage);
  diverGoingRight = new Obstacle(height / 5, 277, 69, 7, diverGoingRightImage);
  diverGoingLeft = new Obstacle(height / 5 * 3, 295, 70, -10, diverGoingLeftImage);
  elephantSeal = new Boost(random(0, width), random(0, height), 200, 100, 15, elephantSealImage);
}

// setupSound()
function setupSound() {
  // play the sound in loop
  jawsThemeSFX.loop();
}

//draw()
// Displays start page when not playing
// While the game is active, displays background and foreground images, handles input, movement, eating, and displaying for preys, predator, obstacles and boost
// When the game is over, shows the game over screen.
function draw() {
  //if not playing, display the start page
  if (state === "TITLE") {
    displayStartPage();
  }
  // If playing...
  else if (state === "PLAY") {
    // Draw the background with the underwater image
    image(backgroundWaterImage, 0, 0, width, height);
    if (!gameOver) {
      // Show the background as an image of water
      image(backgroundWaterImage, 0, 0, width, height);

      // Handle input for the shark
      shark.handleInput();

      // Move all the preys, predator, obstacles and boost
      shark.move();
      yellowFish.move();
      greyFish.move();
      seahorse.move();
      diverGoingLeft.move();
      diverGoingRight.move();
      elephantSeal.move();

      // Check if the predator is dead
      shark.checkGameOver();

      // Checks if the predator touch the obstacles or the boost
      diverGoingRight.checkPredatorCollision(shark);
      diverGoingLeft.checkPredatorCollision(shark);
      elephantSeal.checkPredatorCollision(shark);

      // Handle the shark eating any of the prey
      shark.handleEating(yellowFish);
      shark.handleEating(greyFish);
      shark.handleEating(seahorse);

      // Display all the preys, predator, obstacles and boost
      shark.display();
      yellowFish.display();
      greyFish.display();
      seahorse.display();
      diverGoingLeft.display();
      diverGoingRight.display();
      elephantSeal.display();

      // Show the foreground as an image of sea weeds
      image(foregroundSeaWeedImage, 0, 0, width, height);
    }
    // If the game is over, display the game over page
    else {
      showGameOver();
    }
  }
}

// displayStartPage()
// Display the start page image with back story and instructions
// Display text in a rectangle to tell the player she/he has to click
function displayStartPage() {
  // Display background image
  image(startPageImage, 0, 0, width, height);
  // Display the rectangle in which the text will be placed
  push();
  fill(245, 197, 66);
  rectMode(CENTER);
  rect(width / 2, height / 5 * 3, 280, 50);
  pop();

  // Set up the font & display text over the rectangle
  push();
  textSize(30);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  fill(34, 32, 125);

  // Display start text
  text("CLICK TO START", width / 2, height / 5 * 3);
  pop();
}

// mousePressed()
// When mouse is pressed, and the state is TITLE, change it it PLAY.
// When it is pressed and the state is gameover, reset the game.
function mousePressed() {
  // if we're at the title page, begin playing
  if (state === "TITLE") {
    state = "PLAY";
  }
  // if the state is gameover, resets the game.
  if (gameOver === true) {
    resetGame();
  }
}

// showGameOver()
// Display text about the game being over, the total number of prey eaten and the number of times you ate each prey
function showGameOver() {
  push();
  // Set up the font & display text about the game being over and the total number of prey eaten
  textSize(50);
  textAlign(CENTER, CENTER);
  fill(255);
  noStroke();
  let gameOverText = "GAME OVER\n";
  gameOverText = gameOverText + "You ate " + shark.numberOfPreyEaten + " preys\n";
  gameOverText = gameOverText + "before dying";
  // Display the text
  text(gameOverText, width / 2, height / 3);
  pop();

  // Set up the font and display the number of times you ate each prey next to the image of the prey
  push();
  imageMode(CENTER);
  image(yellowFishImage, width / 14 * 3, height / 3 * 2, width / 7, width / 7);
  image(greyFishImage, width / 2, height / 3 * 2, width / 7, width / 7);
  image(seahorseImage, width / 14 * 11, height / 3 * 2, width / 7, width / 7);
  textSize(30);
  textStyle(BOLD);
  fill(255);
  text("= " + yellowFish.numberOfDeath, width / 14 * 4, height / 3 * 2);
  text("= " + greyFish.numberOfDeath, width / 14 * 8, height / 3 * 2);
  text("= " + seahorse.numberOfDeath, width / 14 * 12, height / 3 * 2);
  pop();
}

// resetGame()
// Resets all the predator, preys, obstacles and boostTime
function resetGame() {
  gameOver = false;
  state = "TITLE";
  shark = new Predator(width / 3, height / 5 * 2, 5, 40, sharkImage);
  yellowFish = new Prey(random(0, width), random(0, height), 10, 50, yellowFishImage);
  greyFish = new Prey(random(0, width), random(0, height), 8, 60, greyFishImage);
  seahorse = new Prey(random(0, width), random(0, height), 20, 10, seahorseImage);
  diverGoingRight = new Obstacle(height / 5, 277, 69, 7, diverGoingRightImage);
  diverGoingLeft = new Obstacle(height / 5 * 3, 295, 70, -10, diverGoingLeftImage);
  elephantSeal = new Boost(random(0, width), random(0, height), 200, 100, 15, elephantSealImage);
  // Reset the health of the predator to max health
  shark.health = shark.maxHealth;
  // Reset the score of prey eaten
  shark.numberOfPreyEaten = 0;
  yellowFish.numberOfDeath = 0;
  greyFish.numberOfDeath = 0;
  seahorse.numberOfDeath = 0;
}
