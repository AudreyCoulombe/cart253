"use strict";
// Predator-Prey Simulation
// by Audrey Coulombe
//
// Creates a predator, three preys, two obstacles and one boost
// The predator chases the prey using the arrow keys and consumes them.
// The predator looses health over time, so must keep eating to survive.
// The prodator dies if he overlaps the obstacles and he gains max health for 5 seconds if he overlaps the boost

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
// The class for the three preys
let preys = [];

// The two divers
let diverGoingRight;
let diverGoingLeft;
// The class for the two divers
let divers = [];

// Images for start page, gameover page, background, foreground, predators, preys, divers and elephant seal
let startPageImage;
let gameoverImage;
let backgroundWaterImage;
let foregroundSeaWeedImage;
let sharkImage;
let yellowFishImage;
let greyFishImage;
let seahorseImage;
let diverGoingRightImage;
let diverGoingLeftImage;
let elephantSealImage;

// Sound
let jawsThemeSFX;

// preload()
// Preload images and sounds
function preload() {
  // Load images for start page, gameover page, background, foreground, predators, preys, divers and elephant seal
  startPageImage = loadImage("assets/images/startPage.png");
  gameoverImage = loadImage("assets/images/gameoverImage.png");
  backgroundWaterImage = loadImage("assets/images/background.jpg");
  foregroundSeaWeedImage = loadImage("assets/images/foreground.png");
  sharkImage = loadImage("assets/images/shark.png");
  yellowFishImage = loadImage("assets/images/yellowFish.png");
  greyFishImage = loadImage("assets/images/greyFish.png");
  seahorseImage = loadImage("assets/images/seahorse.png");
  diverGoingRightImage = loadImage("assets/images/diverGoingRight.png");
  diverGoingLeftImage = loadImage("assets/images/diverGoingLeft.png");
  elephantSealImage = loadImage("assets/images/elephantSeal.png");
  // Load sound
  jawsThemeSFX = loadSound("assets/sounds/JawsTheme.mp3");
}

// setup()
// Sets up a canvas
// Creates objects for the predator, preys, obstacles and boost
// plays the sound in loop
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Predator
  shark = new Predator(width / 3, height / 5 * 2, 5, 40, sharkImage);
  // Preys
  yellowFish = new Prey(random(0, width), random(0, height), 10, 50, yellowFishImage);
  greyFish = new Prey(random(0, width), random(0, height), 8, 60, greyFishImage);
  seahorse = new Prey(random(0, width), random(0, height), 20, 10, seahorseImage);
  // Add the preys in the array
  preys.push(yellowFish, greyFish, seahorse);
  // Obstacles
  diverGoingRight = new Obstacle(height / 5, 277, 69, 7, diverGoingRightImage);
  diverGoingLeft = new Obstacle(height / 5 * 3, 295, 70, -10, diverGoingLeftImage);
  // Add the obstacles in the array
  divers.push(diverGoingRight, diverGoingLeft);
  // Boost
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

      // Handle input for the predator
      shark.handleInput();
      // Move the predator
      shark.move();
      // Check if the predator is dead
      shark.checkGameOver();
      // Handles when the predator eats any of the prey
      shark.handleEating(yellowFish);
      shark.handleEating(greyFish);
      shark.handleEating(seahorse);
      // Displays the predator
      shark.display();

      // Move, display and check collisions with predator for the boost
      elephantSeal.move();
      elephantSeal.display();
      elephantSeal.checkPredatorCollision(shark);

      // Moves and displays all the preys
      for (let i = 0; i < preys.length; i++) {
        // And for each one, move it and display it
        preys[i].move();
        preys[i].display();
      }

      // Moves, displays and checks for collision with the predator for all the preys
      for (let i = 0; i < divers.length; i++) {
        // And for each one, move it and display it
        divers[i].move();
        divers[i].display();
        divers[i].checkPredatorCollision(shark);
      }

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
function displayStartPage() {
  // Display image
  image(startPageImage, 0, 0, width, height);
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
  image(gameoverImage, 0, 0, width, height);
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
  text(gameOverText, width / 3 * 2, height / 3);
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
// Resets the state of the game
// Resets all the predator, preys, obstacles and boost
function resetGame() {
  // Resets the state of the game
  gameOver = false;
  state = "TITLE";
  // Resets the predator
  shark = new Predator(width / 3, height / 5 * 2, 5, 40, sharkImage);
  // Resets the preys
  yellowFish = new Prey(random(0, width), random(0, height), 10, 50, yellowFishImage);
  greyFish = new Prey(random(0, width), random(0, height), 8, 60, greyFishImage);
  seahorse = new Prey(random(0, width), random(0, height), 20, 10, seahorseImage);
  // Resets the obstacles
  diverGoingRight = new Obstacle(height / 5, 277, 69, 7, diverGoingRightImage);
  diverGoingLeft = new Obstacle(height / 5 * 3, 295, 70, -10, diverGoingLeftImage);
  // Reset the boost
  elephantSeal = new Boost(random(0, width), random(0, height), 200, 100, 15, elephantSealImage);
  // Reset the health of the predator to max health
  shark.health = shark.maxHealth;
  // Reset the score
  shark.numberOfPreyEaten = 0;
  for (let i = 0; i < preys.length; i++) {
    // And for each one, move it and display it
    preys[i].numberOfDeath = 0;
  }
}
