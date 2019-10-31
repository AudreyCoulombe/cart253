// Predator-Prey Simulation
// by Audrey Coulombe
//
// Creates a predator and three preys (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator looses health over time, so must keep eating to survive.

// Our predator
let shark;

// The three preyS
let yellowFish;
let greyFish;
let seahorse;

// Images for predators, preys, background and foreground
let yellowFishImage;
let greyFishImage;
let seahorseImage;
let backgroundWaterImage;
let foregroundSeaWeedImage;

// Sound
let jawsThemeSFX;

// preload()
//
// Preload images and sounds
function preload() {
  // images
  sharkImage = loadImage("assets/images/shark.png");
  yellowFishImage = loadImage("assets/images/yellowFish.png");
  greyFishImage = loadImage("assets/images/greyFish.png");
  seahorseImage = loadImage("assets/images/seahorse.png");
  backgroundWaterImage = loadImage("assets/images/background.jpg");
  foregroundSeaWeedImage = loadImage("assets/images/foreground.png");
  // sounds
  jawsThemeSFX = loadSound("assets/sounds/JawsTheme.mp3");
}

// setup()
//
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

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Show the background as an image of water
  image(backgroundWaterImage, 0, 0, width, height);

  // Handle input for the shark
  shark.handleInput();

  // Move all the "sea animals"
  shark.move();
  yellowFish.move();
  greyFish.move();
  seahorse.move();

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
