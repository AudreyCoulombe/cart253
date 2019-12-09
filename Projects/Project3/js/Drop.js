// Drops
// A class that displays a drop on the screen and changes its size according to the sound's amplitude
// The user can control the drop's x velocity with the mouse
// Reference for using the sound's amplitude: https://p5js.org/reference/#/p5.Amplitude

class Drop {
  // constructor()
  // Sets the initial values for the drop's properties
  // Either sets default values or uses the arguments provided
  constructor() {
    // X and Y positions
    this.x = 1;
    this.y = 1;
    // Where the artboard starts on X axe (end of the menu)
    this.artboardStartX = 189;
    // Size
    this.dropSize = 100;
    // X and Y velocities
    this.vy = 1;
    this.vx = 1;
    // Time variable
    this.ty = 1;
    // Colors and opacity
    this.redAndGreen = 1;
    this.alpha = 10;
    // Sound properties
    this.amplitude = new p5.Amplitude();
    this.level = 1;
  }

  // displayShape()
  // Set the drop properties and draw it as an ellipse
  displayShape() {
    // Set red, green and alpha to a random value
    this.redAndGreen = random(0, 3);
    this.alpha = random(0, 100);
    // Set x and y position to a random value
    this.x = random(this.artboardStartX, width);
    this.y = random(-50, height / 2);
    // Set properties of the filling color, stroke and display properties
    fill(this.redAndGreen, this.redAndGreen, 8, this.alpha);
    noStroke();
    ellipseMode(CENTER);
    // Draw the ellipse
    ellipse(this.x, this.y, this.dropSize);
  }

  // changeSize()
  // Changes the size of the drop according to the sound amplitude
  changeSize() {
    // Smooth amplitude to reduce the unwanted noise in the size of the drop
    this.amplitude.smooth(0.9);
    // Set the level variable to the actual amplitude of the sound
    this.level = this.amplitude.getLevel();
    // Set the size of the drop according to the amplitude level of the sound
    this.dropSize = map(this.level, 0, 1, 0, 350);
  }

  // moveDrop()
  // Moves the drop on Y axis according to a noise value
  // Moves it on X axis according to the mouse positions
  moveDrop() {
    // Set time Y to a random value
    this.ty = random(0, 3000);
    // Set y velocity to a noise value and map it
    this.vy = map(noise(this.ty), 0, 1, 0, 4);
    // Add the y velocity to the y position
    this.y += this.vy;
    // Set x velocity according to the mouse's x position and map it
    this.vx = map(mouseX, this.artboardStartX, width, -5, 5);
    // Add the x velocity to the x position
    this.x += this.vx;
    // Keep the x position in the canvas
    this.x = constrain(this.x, this.artboardStartX, width);
    // Changes the size according to the sound amplitude
    this.changeSize();
    // Set opacity, red and green to a random value
    this.alpha = random(0, 100);
    this.redAndGreen = random(0, 255);
    // Set the color, stroke and display properties for the ellipse
    fill(this.redAndGreen, this.redAndGreen, 255, this.alpha);
    noStroke();
    ellipseMode(CENTER);
    // Draw the ellipse with the changed position and size
    ellipse(this.x, this.y, this.dropSize);
    // Handles the ellipse going off the bottom of the canvas
    this.handleWrapping();
  }

  // handleWrapping()
  // Checks if the drop has gone off the bottom of the canvas and wraps it to the top if so
  handleWrapping() {
    // When the drop's Y position is passed the end of the canvas
    if (this.y > height + 50) {
      // Move it above the top of the canvas (so it is already moving when it gets in the canvas)
      this.y = -50;
      // Reset the x position
      this.x = random(-200, width);
    }
  }
}
