// SpiralMovement
// A class that displays the shape in spiral (I plan to eventually make a separate class for the shapes)
// Width and height of the shape are controlled by the mouse position
// RGB colors can be changed with the keys "Z", "X" and "C"
// I started from the code of this example to do the spiral: https://editor.p5js.org/hyershin/sketches/SkG_S5K3W
class SpiralMovement {
  // constructor()
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor() {
    // Angle from the center of the spiral that tells where to put the next shape
    this.angle = 2.0;
    // The radius of the spiral to say at what distance from the center the shape has to be displayed
    this.spiralRadius = 1;
    // Speed
    this.speed = 0.1;
    // Width and height of the shape
    this.shapeWidth = 10;
    this.shapeHeight = 10;
    // RGB colors filling the shape
    this.red = random(0, 255);
    this.green = random(0, 255);
    this.blue = random(0, 255);
    // Position of the shape
    this.x = 0;
    this.y = 0;
  }

  // displaySpiral()
  // Displays the shape in spiral
  displaySpiral() {
    // Sets x and y positons of the shape so that it is displayed in spiral
    this.x = cos(this.angle) * this.spiralRadius;
    this.y = sin(this.angle) * this.spiralRadius;
    // Fills the ellipse with variabes, without stroke and displays it from the center
    fill(this.red, this.green, this.blue);
    noStroke();
    ellipseMode(CENTER);
    // Sets the width and height according to the mouse position
    this.shapeWidth = map(mouseX, 0, width, 2, 50);
    this.shapeHeight = map(mouseY, 0, height, 2, 50);
    // Display the ellipse
    ellipse(this.x, this.y, this.shapeWidth, this.shapeHeight);
    // Add speed to the angle and the spiral radius so that the shapes are displayed in spiral
    this.angle += this.speed;
    this.spiralRadius += this.speed;
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
}
