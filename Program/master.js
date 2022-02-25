runnerStates = 0; //Menu = 0, Target = 1, Gutiar Hero = 2, Line Draw Game = 3, highScores = 4 Instructions = 5
pointerStates = 0; //Arrow = 0, HAND = 1

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  textAlign(CENTER);
  gutiarHeroSetup();
  instructionsSetup();
  targetPracticeSetup();
  lineDrawSetup();
}

function draw() {
  background(220);
  switch (pointerStates) {
    case 0:
      cursor(ARROW);
      break;
    case 1:
      cursor(HAND);
      break;
  }

  switch (runnerStates) {
    case 0:
      menuDraw();

      break;

    case 1: //Target Practice Game
      pointerStates = 0;
      targetPracticeDraw();

      break;

    case 2: //Gutiar Hero Game
      gutiarHeroDraw();

      break;

    case 3: //Line Draw Game
      lineDrawDraw();

      break;

    case 4: //High Scores
      highScoresDraw();

      break;
    case 5: //Instructions
      instructionsDraw();

      break;
  }

}

function mouseReleased() { //p5.js function that is run whenever mouse is realeased
  switch (runnerStates) { //switch statement between all main states
    case 0: //Menu
      //Target Practice Button
      if (mouseX >= width * 50 / 600 && mouseX <= width * 50 / 600 + width / 4 && mouseY >= height * 55 / 100 && mouseY <= height * 55 / 100 + width / 4) {
        runnerStates = 1;
        targetPracticeReset();
      }
      //Gutiar Hero Button
      if (mouseX >= width * 225 / 600 && mouseX <= width * 225 / 600 + width / 4 && mouseY >= height * 55 / 100 && mouseY <= height * 55 / 100 + width / 4) {
        runnerStates = 2;
        gutiarHeroReset();
      }
      //Line Draw Button
      if (mouseX >= width * 400 / 600 && mouseX <= width * 400 / 600 + width / 4 && mouseY >= height * 55 / 100 && mouseY <= height * 55 / 100 + width / 4) {
        runnerStates = 3;
        lineDrawSetup();
      }
      //Highscore Button
      if (abs(mouseX - width * 1 / 5) <= 90 && abs(mouseY - height * 1 / 8) <= 13) {
        runnerStates = 4;
      }
      //Instruction Button
      if (abs(mouseX - width * 4 / 5) <= 105 && abs(mouseY - height * 1 / 8) <= 13) {
        runnerStates = 5;
        instructionStates = 0;
      }
      break;

    case 1: //Target Practice Game
      switch(targetPracticeStates){
        case 0:
      for (let i = 0; i < 10; i++) {
        if (dist(mouseX, mouseY, target[i].x, target[i].y) <= target[i].s / 2) {
          target[i].d = false;
          target[i].explode();
          target[i].explosionActivate();
          target[i].move();
        }
      }
      
      if (countTarget >= 1) {
      countTarget = 0;
      for (let i = 0; i < 10; i++) {
        if (target[i].d) {
          countTarget++;
        }
      }
    }
      clicks++;
      
      //Check if upper right pause button is clicked
          if (dist(mouseX, mouseY, button.pos.x, button.pos.y) <= 25) {
            targetPracticeStates = 1;
            incrementTimer = false;
          }
      break;
      
      case 1: //Paused
          //Check if resume button is clicked
          if (abs(mouseX - resumeButtonTarget.pos.x) <= resumeButtonTarget.width / 2 && abs(mouseY - resumeButtonTarget.pos.y) <= resumeButtonTarget.height / 2) {
            targetPracticeStates = 0;
            incrementTimer = true;
          }
          //Check if exit button is clicked
          if (abs(mouseX - exitButtonTarget.pos.x) <= exitButtonTarget.width / 2 && abs(mouseY - exitButtonTarget.pos.y) <= exitButtonTarget.height / 2) {
            runnerStates = 0;
          }
          
          break;
      }
      break;

    case 2: //Gutiar Hero Game
      switch (gutiarHeroState) {
        case 0: //Running main game
          //Check if upper right pause button is clicked
          if (dist(mouseX, mouseY, button.pos.x, button.pos.y) <= 25) {
            gutiarHeroState = 1;
          }
          break;

        case 1: //Paused
          //Check if resume button is clicked
          if (abs(mouseX - resumeButton.pos.x) <= resumeButton.width / 2 && abs(mouseY - resumeButton.pos.y) <= resumeButton.height / 2) {
            gutiarHeroState = 0;
          }
          //Check if exit button is clicked
          if (abs(mouseX - exitButton.pos.x) <= exitButton.width / 2 && abs(mouseY - exitButton.pos.y) <= exitButton.height / 2) {
            runnerStates = 0;
          }
          break;

        case 2: //Game Over
          //Check if reset button is clicked
          if (abs(mouseX - resumeButton2.pos.x) <= resumeButton2.width / 2 && abs(mouseY - resumeButton2.pos.y) <= resumeButton2.height / 2) {
            gutiarHeroReset();
          }
          //Check if exit button is clicked
          if (abs(mouseX - exitButton2.pos.x) <= exitButton2.width / 2 && abs(mouseY - exitButton2.pos.y) <= exitButton2.height / 2) {
            runnerStates = 0;
          }
      }

      break;

    case 3: //Line Draw Game
      

      break;

    case 4: //High Scores
      if (abs(mouseX - width * 1 / 2) <= 45 && abs(mouseY - height * 9 / 10) <= 30) {
        runnerStates = 0;
      }
      break;

    case 5: //Instructions
      switch (instructionStates) {
        default:
          if (abs(mouseX - lArrow.pos.x) <= width / 10 && abs(mouseY - lArrow.pos.y) <= height / 12) {
            instructionStates -= 1;
          }
          if (abs(mouseX - rArrow.pos.x) <= width / 10 && abs(mouseY - rArrow.pos.y) <= height / 12) {
            instructionStates += 1;
          }
          if (dist(mouseX, mouseY, width / 2, height * 92 / 100) <= 30) {
            runnerStates = 0;
          }
          break;
        case 0:
          if (abs(mouseX - rArrow.pos.x) <= width / 10 && abs(mouseY - rArrow.pos.y) <= height / 12) {
            instructionStates += 1;
          }
          if (dist(mouseX, mouseY, width / 2, height * 92 / 100) <= 30) {
            runnerStates = 0;
          }
          break;
        case 3:
          if (abs(mouseX - lArrow.pos.x) <= width / 10 && abs(mouseY - lArrow.pos.y) <= height / 12) {
            instructionStates -= 1;
          }
          if (dist(mouseX, mouseY, width / 2, height * 92 / 100) <= 40) {
            runnerStates = 0;
          }
      }
      break;
  }
}