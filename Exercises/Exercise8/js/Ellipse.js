// Ellipse
// A class that ectends the spiralMovement
// Displays ellipses in a spiral movement
class Ellipse extends SpiralMovement {
  constructor() {
    // Calling the parent's constructor
    super();
    // Width and height of the shape
    this.shapeWidth = 10;
    this.shapeHeight = 10;
    // RGB colors filling the shape
    this.red = random(0, 255);
    this.green = random(0, 255);
    this.blue = random(0, 255);
  }

  // changeColor()
  // Changes colors with the "Z", "X" and "C" keys
  changeColor() {
    // If the key "Z" is down, decrease the red value
    if (keyIsDown(90)) {
      if (this.red > 0) {
        this.red -= 1;
        // If the red value is less than or equal to 0, set it to 255
      } else if (this.red <= 0) {
        this.red = 255;
      }
    }
    // If the key "X" is down, decrease the green value
    if (keyIsDown(88)) {
      if (this.green > 0) {
        this.green -= 1;
        // If the green value is less than or equal to 0, set it to 255
      } else if (this.green <= 0) {
        this.green = 255;
      }
    }
    // If the key "C" is down, decrease the blue value
    if (keyIsDown(67)) {
      if (this.blue > 0) {
        this.blue -= 1;
        // If the blue value is less than or equal to 0, set it to 255
      } else if (this.blue <= 0) {
        this.blue = 255;
      }
    }
  }

  // displayShape()
  // Displays the ellipses and handles the mouse positon --> MAKE A handleInput FUNCTION
  displayShape() {
    // Fills the ellipse with variabes, without stroke and displays it from the center
    fill(this.red, this.green, this.blue);
    noStroke();
    ellipseMode(CENTER);
    // Sets the width and height according to the mouse position
    this.shapeWidth = map(mouseX, 0, width, 2, 50);
    this.shapeHeight = map(mouseY, 0, height, 2, 50);
    // Display the ellipse
    ellipse(this.x, this.y, this.shapeWidth, this.shapeHeight);
  }
}
