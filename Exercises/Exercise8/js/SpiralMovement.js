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
    // // Position of the shape
    this.x = 0;
    this.y = 0;
  }

  // displaySpiral()
  // Displays the shape in spiral
  displaySpiral() {
    // Add speed to the angle and the spiral radius so that the shapes are displayed in spiral
    this.angle += this.speed;
    this.spiralRadius += this.speed;
    // Sets x and y positons of the shape so that it is displayed in spiral
    this.x = cos(this.angle) * this.spiralRadius;
    this.y = sin(this.angle) * this.spiralRadius;
  }
}
