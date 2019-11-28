// Ellipse
// A class that extends the spiralMovement
// Displays ellipses in a spiral movement
class Ellipse extends SpiralMovement {
  constructor() {
    // Calling the parent's constructor
    super();
    // Width and height of the shape
    this.shapeWidth = 10;
    this.shapeHeight = 10;
  }

  // displayShape()
  // Displays the ellipses and handles the mouse positon
  displayShape() {
    // Fills the ellipse with variabes, without stroke and displays it from the center
    fill(this.red, this.green, this.blue);
    noStroke();
    ellipseMode(CENTER);
    // Sets the width and height according to the mouse position
    this.shapeWidth = map(mouseX, 0, width, 2, 40);
    this.shapeHeight = map(mouseY, 0, height, 2, 40);
    // Display the ellipse
    ellipse(this.x, this.y, this.shapeWidth, this.shapeHeight);
  }
}
