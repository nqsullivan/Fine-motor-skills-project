let instructionStates = 1; //intro page = 0,
let rArrow, lArrow;
let imgGuitarHero;

function instructionsSetup() {
  rArrow = new Arrow(width * 91 / 100, height * 92 / 100, 1);
  lArrow = new Arrow(width * 9 / 100, height * 92 / 100, 0);
  imgGuitarHero = loadImage('guitarHero.png');
}

function instructionsDraw() { //Function for instructions page
  switch (instructionStates) {
    case 0: //intro
      intro();
      break;
    case 1: //Page1
      page1();
      break;
    case 2: //Page2
      page2();
      break;
    case 3: //Page3
      page3();
      break;
  }
  exitButtonInstructions();
}

function intro() {
  textAlign(CENTER, CENTER);
  textSize(50);
  text("Instructions", width / 2, height / 5);
  rArrow.display();
  rArrow.mouseCheck();
  lArrow.mouseCheck();

  textAlign(LEFT, TOP);
  textSize(30);
  text("This booklet will familarize you with the rules of the games. As well as provide tips and tricks to help you learn the games. Good luck :)", width / 2, height * 2/3, width * 9 / 12, height * 2 / 3);
}

function page1() {
  textAlign(CENTER, CENTER);
  textSize(50);
  text("Target Practice", width / 2, height / 5);
  textAlign(LEFT, TOP);
  textSize(30)
  text("This booklet will familarize you with the rules of the games. As well as provide tips and tricks to help you learn the games. Good luck :)", width / 2, height * 2/3, width * 9 / 12, height * 2 / 3);
  rArrow.display();
  lArrow.display();
  rArrow.mouseCheck();
  lArrow.mouseCheck();
}

function page2() {
  textAlign(CENTER, CENTER);
  textSize(50);
  text("Guitar Hero", width / 2, height / 5);
  textAlign(LEFT, TOP);
  textSize(30)
  image(imgGuitarHero, width / 11, height / 4, imgGuitarHero.width * 45 / 100, imgGuitarHero.height / 2);
  rArrow.display();
  lArrow.display();
  rArrow.mouseCheck();
  lArrow.mouseCheck();
}

function page3() {
  textAlign(CENTER, CENTER);
  textSize(50);
  text("Line Draw", width / 2, height / 5);
  textAlign(LEFT, TOP);
  textSize(30)
  text("This booklet will familarize you with the rules of the games. As well as provide tips and tricks to help you learn the games. Good luck :)", width / 2, height * 2/3, width * 9 / 12, height * 2 / 3);
  lArrow.display();
  rArrow.mouseCheck();
  lArrow.mouseCheck();
}

function exitButtonInstructions() {
  push();
  if (dist(mouseX, mouseY, width/2, height * 92/100) <= 40) {
      this.high = true;
    } else {
      this.high = false;
    }
  if (this.high) {
      strokeWeight(3);
      stroke(250);
    } else {
      strokeWeight(1);
      stroke(0);
    }
  textAlign(CENTER, CENTER);
  fill(255, 0, 0);
  text("Exit", width / 2, height * 92 / 100);
  pop();
  
  if(this.high||rArrow.high||lArrow.high){
    pointerStates = 1;
  } else {
    pointerStates = 0;
  }
}

class Arrow {
  constructor(x, y, direction) {
    this.pos = createVector(x, y);
    this.direction = direction; //right = 1, left = 0
    this.high = false;
  }

  display() {
    switch (this.direction) {
      case 0:
        push();
        fill(0);
        if (this.high) {
          strokeWeight(3);
          stroke(250);
        } else {
          strokeWeight(1);
          stroke(0);
        }
        beginShape();
        vertex(this.pos.x, this.pos.y - this.pos.y * 0.05);
        vertex(this.pos.x, this.pos.y + this.pos.y * 0.05);
        vertex(this.pos.x - this.pos.x * 0.5, this.pos.y);
        endShape(CLOSE);
        fill(0);
        rect(this.pos.x + this.pos.x * 0.40, this.pos.y - this.pos.y * 0.00275, this.pos.x * 0.8, this.pos.y * 0.05);
        pop();
        break;

      case 1:
        push();
        fill(0);
        if (this.high) {
          strokeWeight(3);
          stroke(250);
        } else {
          strokeWeight(1);
          stroke(0);
        }
        beginShape();
        vertex(this.pos.x, this.pos.y + this.pos.y * 0.05);
        vertex(this.pos.x, this.pos.y - this.pos.y * 0.05);
        vertex(this.pos.x + this.pos.x * 0.05, this.pos.y);
        endShape(CLOSE);
        fill(0);
        rect(this.pos.x - this.pos.x * 0.04, this.pos.y - this.pos.y * 0.00275, this.pos.x * 0.08, this.pos.y * 0.05);
        pop();
        break;
    }

  }
  mouseCheck() {
    if (dist(mouseX, mouseY, this.pos.x, this.pos.y) <= width/12) {
      this.high = true;
    } else {
      this.high = false;
    }
  }
}