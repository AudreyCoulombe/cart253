// Predator-Prey Simulation
// by Audrey Coulombe
//
// Creates a predator and three preys (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator looses health over time, so must keep eating to survive.

// state of the game
let started = false;

// Track whether the game is over
let gameOver = false;

// Our predator
let shark;

// The three preyS
let yellowFish;
let greyFish;
let seahorse;

// Images for predators, preys, background, foreground and start page
let yellowFishImage;
let greyFishImage;
let seahorseImage;
let backgroundWaterImage;
let foregroundSeaWeedImage;
let startPageImage;

// Sound
let jawsThemeSFX;

// preload()
// Preload images and sounds
function preload() {
  // images
  sharkImage = loadImage("assets/images/shark.png");
  yellowFishImage = loadImage("assets/images/yellowFish.png");
  greyFishImage = loadImage("assets/images/greyFish.png");
  seahorseImage = loadImage("assets/images/seahorse.png");
  backgroundWaterImage = loadImage("assets/images/background.jpg");
  foregroundSeaWeedImage = loadImage("assets/images/foreground.png");
  startPageImage = loadImage("assets/images/startPage.png");
  // sounds
  jawsThemeSFX = loadSound("assets/sounds/JawsTheme.mp3");
}

// setup()
// Sets up a canvas
// Creates objects for the predator and three prey
// plays the sound in loop
function setup() {
  createCanvas(windowWidth, windowHeight);
  shark = new Predator(100, 100, 5, color(200, 200, 0), 40, sharkImage);
  yellowFish = new Prey(100, 100, 10, color(255, 100, 10), 50, yellowFishImage);
  greyFish = new Prey(100, 100, 8, color(255, 255, 255), 60, greyFishImage);
  seahorse = new Prey(100, 100, 20, color(255, 255, 0), 10, seahorseImage);
  // play the sound in loop
  jawsThemeSFX.loop();
}

//draw()
// Displays start page when the game has not started
// While the game is active, displays background and foreground images, handles input, movement, eating, and displaying for preys and predator.
// When the game is over, shows the game over screen.
function draw() {
  //if the game has not started, display the start page
  if (!started) {
    displayStartPage();
  }
  // If the game has started...
  else {
    // Draw the background with the underwater image
    image(backgroundWaterImage, 0, 0, width, height);
    if (!gameOver) {
      // Show the background as an image of water
      image(backgroundWaterImage, 0, 0, width, height);

      // Handle input for the shark
      shark.handleInput();

      // Move all the "sea animals"
      shark.move();
      yellowFish.move();
      greyFish.move();
      seahorse.move();

      // Check if the predator is dead
      shark.checkGameOver();

      // Handle the shark eating any of the prey
      shark.handleEating(yellowFish);
      shark.handleEating(greyFish);
      shark.handleEating(seahorse);

      // Display all the sea "animals"
      shark.display();
      yellowFish.display();
      greyFish.display();
      seahorse.display();

      // Show the foreground as an image of nenuphars
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
// When mouse is pressed, start the game
function mousePressed() {
  started = true;
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
  image(yellowFishImage, width/14*3, height/3*2, width/7, width/7);
  image(greyFishImage, width/2, height/3*2, width/7, width/7);
  image(seahorseImage, width/14*11, height/3*2, width/7, width/7);
  textSize(30);
  textStyle(BOLD);
  fill(255);
  text("= " + yellowFish.numberOfDeath, width/14*4, height/3*2);
  text("= " + greyFish.numberOfDeath, width/14*8, height/3*2);
  text("= " + seahorse.numberOfDeath, width/14*12, height/3*2);
  pop();
}
