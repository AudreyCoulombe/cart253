// Exercise 1 - Movement
// Pippin Barr
//
// Starter code for exercise 1.
// Draws a moving square and circle that intersect
// in the middle of the canvas.

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;

//The current position of the elllipse I added
let ellipseX= 0;
let ellipseY= 320;

//declaring the variable for my mario image
let img;
//horizontal position of my mario image
let imgX=320;
//vertical position of my mario image
let imgY=640;

// preload()
//
// Nothing here

function preload() {
  //preload mario image to avoid delay
img =loadImage ("assets/images/mario_PNG55.png");
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;

  // We'll draw rectangles from the center
  rectMode(CENTER);
  // We won't have a stroke in this
  noStroke();

}


// draw()
//
// Change the circle and square's positions so they move
// Draw the circle and square on screen

function draw() {
  // We don't fill the background so we get a drawing effect

//Move the ellipse I added horizontally
ellipseX +=1;
// Apply a color to the circle I added
fill(0,200,200);
//Display the ellipse I added
ellipse(ellipseX,ellipseY,40,40);

//Adding a square that follows the mouse
fill(255,255,0);
rect(mouseX,mouseY,30,30);

  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent red
  fill(255,0,0,10);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  // Move square up and to the left
  squareX -= 1;
  squareY -= 1;
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);

  //Move my mario image from bottom to top
  imgY -= 1;
  //Display my mario image
image(img,imgX,imgY,50,50);

}
