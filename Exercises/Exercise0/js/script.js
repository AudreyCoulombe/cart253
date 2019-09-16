/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload
function setup() {
noStroke();
  createCanvas(1000,1000);
  background(0,0,255,200);

rectMode(CENTER);
ellipseMode(CENTER);

//sun
fill(249,255,84);
ellipse(0,0,300,300);

fill(249,255,84,200);
ellipse(0,0,400,400);

fill(249,255,84,150);
ellipse(0,0,500,500);

fill(249,255,84,100);
ellipse(0,0,600,600);

fill(249,255,84,50);
ellipse(0,0,700,700);

//clouds
fill(255,255,255,100);
ellipse(800,100,600,200);
ellipse(300,500,1000,200);
ellipse(570,140,400,150);

//hair
  fill(255,0,0);
  rect(500,750,420,500);

//face
fill(245,245,220);
ellipse(500,500,400,400);

//hair
noFill();
strokeWeight(40);
stroke(255,0,0);
ellipse(500,600,400,630);

rectMode(CENTER)

//neck
fill(245,245,220);
noStroke();
rect(500,750,200,500);

//body
fill(100,0,100);
ellipse(500,1000,500,600);

//neckline
fill(245,245,220);
ellipse(500,730,200,200);

//mouth
fill(0);
ellipse(500,600,40,40);
fill(245,245,220);
rect(500,580,40,40);

//eyes
fill(255);
ellipse(400,500,60,60);
ellipse(600,500,60,60);
fill(0);
ellipse(400,500,10,10);
ellipse(600,500,10,10);

}
