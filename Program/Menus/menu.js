function menuDraw() {
  //variables for color and for highscores
  let b = color(0, 150, 255);
  let g = color('green');
  let r = color('red');
  this.highScore = false;
  this.highInstructions = false;
  this.highTarget = false;
  this.highGuitar = false;
  this.highLine = false;

  textAlign(CENTER, CENTER);
  rectMode(CENTER);

  //High Score Text in upper left
  push();
  if (abs(mouseX - width / 5) <= width / 7 && abs(mouseY - height * 1 / 8) <= height / 40) {
    this.highScore = true;
  } else {
    this.highScore = false;
  }
  if (this.highScore) {
    strokeWeight(3);
    stroke(250);
  } else {
    strokeWeight(1);
    stroke(0);
  }
  fill(207, 181, 59);
  textSize(30);
  text("High Scores", width * 1 / 5, height * 1 / 8);
  pop();

  //Main menu text in center of screen
  push();
  textSize(60);
  text("Main Menu", width / 2, height * 2 / 5)
  pop();

  //Blue target practice box and text
  push();
  if (abs(mouseX - width / 5) <= width / 7 && abs(mouseY - height * 66 / 100) <= height / 7) {
    this.highTarget = true;
  } else {
    this.highTarget = false;
  }
  if (this.highTarget) {
    strokeWeight(3);
    stroke(250);
  } else {
    strokeWeight(1);
    stroke(0);
  }
  fill(b);
  square(width / 5, height * 66 / 100, width / 4);
  fill(0);
  textSize(20);
  text("Target", width * 1 / 5, height * 63 / 100);
  text("Practice", width * 1 / 5, height * 70 / 100);
  pop();

  //Green gutiar hero box and text
  push();
  if (abs(mouseX - width / 2) <= width / 7 && abs(mouseY - height * 66 / 100) <= height / 7) {
    this.highGuitar = true;
  } else {
    this.highGuitar = false;
  }
  if (this.highGuitar) {
    strokeWeight(3);
    stroke(250);
  } else {
    strokeWeight(1);
    stroke(0);
  }
  fill(g);
  square(width * 1 / 2, height * 66 / 100, width / 4);
  fill(0);
  textSize(20);
  text("Guitar", width * 1 / 2, height * 63 / 100);
  text("Hero", width * 1 / 2, height * 70 / 100);
  pop();

  //Red line draw box and text
  push();
  if (abs(mouseX - width * 4 / 5) <= width / 7 && abs(mouseY - height * 66 / 100) <= height / 7) {
    this.highLine = true;

  } else {
    this.highLine = false;
  }
  if (this.highLine) {
    strokeWeight(3);
    stroke(250);
  } else {
    strokeWeight(1);
    stroke(0);
  }
  fill(r);
  square(width * 4 / 5, height * 66 / 100, width / 4);
  fill(0);
  textSize(20);
  text("Line", width * 8 / 10, height * 63 / 100);
  text("Draw", width * 8 / 10, height * 70 / 100);
  pop();

  //Instructions
  push();
  if (abs(mouseX - width * 4 / 5) <= width / 7 && abs(mouseY - height * 1 / 8) <= height / 40) {
    this.highInstructions = true;
    pointerStates = 1;
  } else {
    this.highInstructions = false;

  }
  if (this.highInstructions) {
    strokeWeight(3);
    stroke(250);
  } else {
    strokeWeight(1);
    stroke(0);
  }
  fill(50);
  textSize(30);
  text("Instructions", width * 4 / 5, height * 1 / 8);
  pop();

  if ((this.highScore || this.highInstructions || this.highTarget || this.highGuitar || this.highLine)) {
    pointerStates = 1;
  } else {
    pointerStates = 0;
  }
}