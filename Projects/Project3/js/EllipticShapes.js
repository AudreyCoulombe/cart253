// EllipticShapes
// A class that displays an ellipse according to the mouse location when you press the space bar.
// As long as the space bar is down, ellipses are displayed from the same center position each frame.
// Move the mouse horizontally to change width of the shape and switch breath in / breath out sound.
// Move the mouse vertically to change height of the shape.
// RGB colors can be changed with "Z", "X" and "C" keys.

class EllipticShapes {
  // constructor()
  // Sets the initial values for the shapes's properties
  // Either sets default values or uses the arguments provided
  constructor(breathInSound, breathOutSound) {
    // Center position of the shape
    this.x = 1;
    this.y = 1;
    // Distance between the mouse and the center of the shape
    this.distanceFromCenterX = 1;
    this.distanceFromCenterY = 1;
    // State of the position
    this.positionIsGiven = false;
    // Size
    this.width = 1;
    this.height = 1;
    // Colors
    this.red = 168;
    this.green = 218;
    this.blue = 247;
    // State of the RGB colors
    this.decreaseRed = true;
    this.decreaseGreen = true;
    this.decreaseBlue = true;
    // color increment or decrement
    this.colorChangeValue = 10;
    // Sounds
    this.breathInSound = breathInSound;
    this.breathOutSound = breathOutSound;
    // State of the sounds
    this.breathInSoundPlaying = false;
    this.breathOutSoundPlaying = false;
  }

  // changeColor()
  // Changes colors with the "Z", "X" and "C" keys
  changeColor() {
    // If the key "Z" is down, change the red value
    if (keyIsDown(90)) {
      // Keep the red value between 0 and 255
      this.red = constrain(this.red, 0, 255);
      // If decrease red is true, decrease red
      if (this.decreaseRed) {
        this.red -= this.colorChangeValue;
        // If red is smaller or equal to 0, change decrease red to false
        if (this.red <= 0) {
          this.decreaseRed = false;
        }
      }
      // If decrease red is false, increase red
      else if (!this.decreaseRed) {
        this.red += this.colorChangeValue;
        // If red is greater or equal to 255, change decrease red to true
        if (this.red >= 255) {
          this.decreaseRed = true;
        }
      }
    }

    // If the key "X" is down, change the green value
    if (keyIsDown(88)) {
      // Keep the green value between 0 and 255
      this.green = constrain(this.green, 0, 255);
      // If decrease green is true, decrease green
      if (this.decreaseGreen) {
        this.green -= this.colorChangeValue;
        // If green is smaller or equal to 0, change decrease green to false
        if (this.green <= 0) {
          this.decreaseGreen = false;
        }
      }
      // If decrease green is false, increase green
      else if (!this.decreaseGreen) {
        this.green += this.colorChangeValue;
        // If green is greater or equal to 255, change decrease green to true
        if (this.green >= 255) {
          this.decreaseGreen = true;
        }
      }
    }
    // If the key "C" is down, change the blue value
    if (keyIsDown(67)) {
      // Keep the blue value between 0 and 255
      this.blue = constrain(this.blue, 0, 255);
      // If decrease blue is true, decrease blue
      if (this.decreaseBlue) {
        this.blue -= this.colorChangeValue;
        // If blue is smaller or equal to 0, change decrease blue to false
        if (this.blue <= 0) {
          this.decreaseBlue = false;
        }
      }
      // If decrease blue is false, increase blue
      else if (!this.decreaseBlue) {
        this.blue += this.colorChangeValue;
        // If blue is greater or equal to 255, change decrease blue to true
        if (this.blue >= 255) {
          this.decreaseBlue = true;
        }
      }
    }
  }

  // handleSound()
  // If the mouse is moving away from the center of the shape on the X axis, plays the breath in sound. If it gets closer, plays the breath out sound.
  handleSound() {
    // On the X axis, if the mouse is closer to the center of the shape than it was in the previous frame...
    if (this.distanceFromCenterX > mouseX - this.x) {
      // Change state to say that the breath in sound is not playing and stop the sound
      this.breathInSoundPlaying = false;
      this.breathInSound.stop();
      // If the breath out sound is not playing, play it and change its state so it wont play every frame
      if (!this.breathOutSoundPlaying) {
        this.breathOutSound.play();
        this.breathOutSoundPlaying = true;
      }
    }
    // On the X axis, if the mouse is farther from the center of the shape than it was in the previous frame...
    else if (this.distanceFromCenterX < mouseX - this.x) {
      // Change state to say that the breath out sound is not playing and stop the sound
      this.breathOutSoundPlaying = false;
      this.breathOutSound.stop();
      // If the breath in sound is not playing, play it and change its state so it wont play every frame
      if (!this.breathInSoundPlaying) {
        this.breathInSound.play();
        this.breathInSoundPlaying = true;
      }
    }
  }

  // changeSize()
  // Changes wisdh and height of the shape according to the mouse position
  changeSize() {
    // Calculate the distance between the mouse and the center of the shape
    this.distanceFromCenterX = mouseX - this.x;
    this.distanceFromCenterY = mouseY - this.y;
    // Change width and height according to the mouse position
    this.width = 2 * (this.distanceFromCenterX);
    this.height = 2 * (this.distanceFromCenterY);
  }

  // displayShapes()
  // When we press space bar, sets the central position of the ellipse and handles mouse and keys inputs to change size, colors and sound
  displayShapes() {
    // Displays shapes when the space bar is pressed
    if (keyIsDown(32)) {
      // If the central position of the shape is not given...
      if (this.positionIsGiven === false) {
        // Set it to the mouse position
        this.x = mouseX;
        this.y = mouseY;
        // And change state so the central position stays the same as long as the space bar is pressed
        this.positionIsGiven = true;
      }
      // If the central position is given...
      else if (this.positionIsGiven === true) {
        // Handle keys inputs to change the color of the stroke
        this.changeColor();
        // Play breath in sound when the width of the shape is increasing and oplay the breath out sound if the width is decreasing
        this.handleSound();
        // Change the size of the shape according to the mouse position
        this.changeSize();
        // Display the ellipse from the center, color the stroke with the rgb values and don't fill it
        ellipseMode(CENTER);
        stroke(this.red, this.green, this.blue);
        noFill();
        // Draw the ellipse
        ellipse(this.x, this.y, this.width, this.height);
      }
    }
    // If the space bar is released, change the state of positionIsGiven to false to be able to set a new position when we press space bar again
    else {
      this.positionIsGiven = false;
    }
  }
}
