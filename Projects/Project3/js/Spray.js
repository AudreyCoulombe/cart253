// Spray
// A class that extends the spiralMovement
// Displays a spray of pixels in a spiral movement
class Spray extends SpiralMovement {
  // constructor()
  // Sets the initial values for the ellipse's properties
  // Either sets default values or uses the arguments provided
  constructor(sound) {
    // Calling the parent's constructor
    super(sound);
    // Note: this.x and this.y from the parent class refer to the central position of the spray
    // Width and height of the spray
    this.sprayWidth = 10;
    this.sprayHeight = 10;
    // Width and height of each pixels
    this.pixelWidth = 1;
    this.pixelHeight = 1;
    // Position of each pixel
    this.pixelX = 1;
    this.pixelY = 1;
  }

  // displayShape()
  // Displays the spray of pixels and changes width and height according to the mouse position
  displayShape() {
    // Displays 10 pixels each frame
    for (let i = 0; i < 10; i++) {
      // Sets the width and height of the pixels according to the mouse position
      this.pixelWidth = map(mouseX, 0, width, 1, 5);
      this.pixelHeight = map(mouseY, 0, height, 1, 5);
      // Display the pixel
      this.displayPixel();
    }
  }

  // dispalyPixel()
  // Displays a pixel ramdomly around the center position of the spray
  displayPixel() {
    // Display a pixel randomly inside the spray
    this.pixelX = random(this.x + this.sprayWidth / 2, this.x - this.sprayWidth / 2);
    this.pixelY = random(this.y + this.sprayHeight / 2, this.y - this.sprayHeight / 2);
    // Fills the pixel with rgb values, without stroke and displays it from the center
    fill(this.red, this.green, this.blue);
    rectMode(CENTER);
    // Draws one pixel
    rect(this.pixelX, this.pixelY, this.pixelWidth, this.pixelHeight);
  }
}
