/* ***** Variables for Gutiar Hero Game ***** */
//Game states
let gutiarHeroState = 0; //Running = 0, Pause = 1, Game Over = 2

//Variables for shakes
let shakeBool = false; //A boolean to shake the screen if true
let shakeCounter = 0; //A counter to keep track of number of shakes
let livesTemp = 5; //Variable to check if lives goes down

//Button Variables
let button; //A variable to hold the pause utton class in the upper right of the game
let resumeButton; //A variable to hold the resume button from the pause screen
let exitButton; //A variable to hold the exit button from the pause screen
let resumeButton2; //A variable to hold the resume button from the gameover screen
let exitButton2; //A variable to hold the exit button from the gameover screen

//Pause screen variables
let squarePlayer, circlePlayer, triangleplayer; //The three object varables for the pause and gameover screen

let targetGuitar = []; //Array to hold falling circles
let score = 0; //Variable to hold score
let lineColor; //A vector to store the rgb values of the bottom line allowing for a visual queue for button pressing
let monoSynth; //A variable to hold the p5.js MonoSynth class

//Modifiers
const targetSizeMod = 0.5; //A modifier for the falling circles' sizes
let speedFall = 7; //A modifier for the speed the targets should fall
const speedSpawn = 1; //A modifier for the speed the targets should spawn
let shake = 1; //A modifier for the magnitude of the shake
let lives = 5; //Modifier for number of lives
let lineSize = 3; //A modifier for the base size of the bottom line also allows for a visual queue for button pressing


/* ***** Setup function for the Gutiar Hero Game ****** */
function gutiarHeroSetup() {
  lineColor = createVector(0, 0, 0);
  monoSynth = new p5.MonoSynth();
  button = new pauseButton();

  
  squarePlayer = new squareClass();
  circlePlayer = new circleClass();
  trianglePlayer = new triangleClass();

  resumeButton = new Button(width / 3, height / 2, 100, 30, "Resume");
  resumeButton2 = new Button(width / 3, height * 2 / 3, 100, 30, "Reset");
  exitButton = new Button(width * 2 / 3, height / 2, 100, 30, "Exit");
  exitButton2 = new Button(width * 2 / 3, height * 2 / 3, 100, 30, "Exit");
}


/* ***** Draw function for the Gutiar Hero Game ***** */
function gutiarHeroDraw() {
  background(220); //Background color of grey
  
  //Keeps track of the highscore for the Gutiar Hero Game
  if (score > hsGutiarHero) {
    hsGutiarHero = score;
  }
  
  //If the player runs out of lives go to Game Over state
  if (lives <= 0) {
    gutiarHeroState = 2;
  }
  
  //Game States case statement for the Gutiar Hero Draw: Running = 0, Paused = 1, Game Over = 2
  switch (gutiarHeroState) {
    case 0: //Running
      button.display(); //Display the upper right pause button
      button.mouseCheck(); //Check if mouse is over button
      if(button.high){
        pointerStates = 1;
      }else{
        pointerStates = 0;
      }
      
      //background shapes
      strokeWeight(2);
      line(1 / 6 * width + shake, 0, 1 / 6 * width + shake, height * 0.94);//Vertical Line
      line(1 / 3 * width + shake, 0, 1 / 3 * width + shake, height * 0.94);//Vertical Line
      line(1 / 2 * width + shake, 0, 1 / 2 * width + shake, height * 0.94);//Vertical Line
      line(2 / 3 * width + shake, 0, 2 / 3 * width + shake, height * 0.94);//Vertical Line
      line(5 / 6 * width + shake, 0, 5 / 6 * width + shake, height * 0.94);//Vertical Line
      push();
      stroke(lineColor.x, lineColor.y, lineColor.z); //Color for the horizontal line
      strokeWeight(lineSize); //Size of horizontal line
      line(1 / 8 * width + shake, 5 / 6 * height, 7 / 8 * width + shake, 5 / 6 * height); //Horizontal line
      pop();
      
      //Text for the upper left counters of lives and score
      push();
      fill(100, 150, 30); //Color of text
      textSize(20); //Size of text
      text("Score: " + score, width / 10 + shake, height / 15); //Text for score counter
      text("Lives : " + lives, width / 10 + shake, height / 10); //Text for lives counter
      pop();


      //Target creation
      if (frameCount % round(30 * speedSpawn) == 0) {
        append(targetGuitar, new targetClass(random([1, 2, 3, 4])));
        speedFall += 0.05;
        //speedSpawn -= 0.001;
      }



      //Line reset color every 25 frames
      if (frameCount % 25 == 0) {
        lineSize = 3
        lineColor.x = 0;
        lineColor.y = 0;
        lineColor.z = 0;
      }


      //Code for the shake
      if (lives < livesTemp && shakeCounter < 10) {
        shake = cos(frameCount) * 5; //moves the whole screen by cos of the frame count
        shakeCounter++;
      } else {
        if (shakeCounter >= 10) { //Reset after 10 shakes
          shake = 0;
          shakeBool = false;
          playSynth("dead");
          shakeCounter = 0;
          livesTemp = lives;
        }
      }

      //check if alive
      for (let i = 0; i < targetGuitar.length; i++) {
        if (targetGuitar[i].alive) {
          targetGuitar[i].update();
          targetGuitar[i].display();
        }
      }
      break;

    case 1: //Case if paused
      //Update position and show the background objects
      squarePlayer.update();
      circlePlayer.update();
      trianglePlayer.update();
      squarePlayer.show();
      circlePlayer.show();
      trianglePlayer.show();

      //Display the buttons
      resumeButton.display();
      exitButton.display();
      resumeButton.mouseCheck();
      exitButton.mouseCheck();
      
      if(resumeButton.high || exitButton.high){
        pointerStates = 1;
      } else {
        pointerStates = 0;
      }
      
      //Main "Pause" text
      push();
      textSize(50);
      text("Pause", width / 2, height / 3);
      pop();
      break;

    case 2: //Game Over
      //Update position and show the background objects
      squarePlayer.update();
      circlePlayer.update();
      trianglePlayer.update();
      squarePlayer.show();
      circlePlayer.show();
      trianglePlayer.show();
      
      if(resumeButton2.high || exitButton2.high){
        pointerStates = 1;
      } else {
        pointerStates = 0;
      }
      
      //Main "Game Over" text and displaying the score
      textSize(40);
      textAlign(CENTER, CENTER);
      text("GAME OVER", width / 2, height * 4 / 10);
      textSize(30);
      text("Your Score was: " + score, width * 1 / 2, height * 5 / 10);
      resumeButton2.display();
      exitButton2.display();
      resumeButton2.mouseCheck();
      exitButton2.mouseCheck();
      break;
  }
}


/* ***** Function to check keyboard inputs ***** */
function keyPressed() {
  if (keyCode === 65) { //Check the "A" key
    lineSize = 5;
    for (let i = 0; i < targetGuitar.length; i++) {
      if (dist(targetGuitar[i].pos.y, 0, 5 / 6 * height, 0) <= width / 6 * targetSizeMod && targetGuitar[i].col == 1) { //Check if the bottom circle is in the first column
        playSynth(1);
        score++;
        lineColor.x = 0;
        lineColor.z = 255;
        targetGuitar.shift();
      } else {
        lineColor.x = 255;
      }
    }
  }
  if (keyCode === 83) { //Check the "S" key
    lineSize = 5;
    for (let i = 0; i < targetGuitar.length; i++) {
      if (dist(targetGuitar[i].pos.y, 0, 5 / 6 * height, 0) <= width / 6 * targetSizeMod && targetGuitar[i].col == 2) { //Check if the bottom circle is in the second column
        playSynth(2);
        score++;
        lineColor.x = 0;
        lineColor.z = 255;
        targetGuitar.shift();
      } else {
        lineColor.x = 255;
      }
    }
  }
  if (keyCode === 68) { //Check the "D" key
    lineSize = 5;
    for (let i = 0; i < targetGuitar.length; i++) {
      if (dist(targetGuitar[i].pos.y, 0, 5 / 6 * height, 0) <= width / 6 * targetSizeMod && targetGuitar[i].col == 3) { //Check if the bottom circle is in the third column
        playSynth(3);
        score++;
        lineColor.x = 0;
        lineColor.z = 255;
        targetGuitar.shift();
      } else {
        lineColor.x = 255;
      }
    }
  }
  if (keyCode === 70) { //Check the "F" key
    lineSize = 5;
    for (let i = 0; i < targetGuitar.length; i++) {
      if (dist(targetGuitar[i].pos.y, 0, 5 / 6 * height, 0) <= width / 6 * targetSizeMod && targetGuitar[i].col == 4) { //Check if the bottom circle is in the forth column
        playSynth(4);
        score++;
        lineColor.x = 0;
        lineColor.z = 255;
        targetGuitar.shift();
      } else {
        lineColor.x = 255;
      }
    }
  }
  if (keyCode === 80) { //Check the "P" key
    gutiarHeroState = 1; //Pause the game
  }
}

/* ***** Class for creating the falling circles ***** */
class targetClass {
  constructor(c) { //Case statment to determine x coordinate
    this.alive = true;
    switch (c) {
      case 1: //First column
        this.col = 1;
        this.pos = createVector(width * 3 / 12, 0);
        this.letter = "A";
        break;

      case 2: //Second column
        this.col = 2;
        this.pos = createVector(width * 5 / 12, 0);
        this.letter = "S";
        break;

      case 3: //Third column
        this.col = 3;
        this.pos = createVector(width * 7 / 12, 0);
        this.letter = "D";
        break;

      case 4: //Forth column
        this.col = 4;
        this.pos = createVector(width * 9 / 12, 0);
        this.letter = "F";
        break;
    }

    // Vectors to keep track of speed of fall
    this.vel = createVector(0, speedFall);
  }

  display() { //Function to display the object
    push();
    fill(255, 0, 0);
    circle(this.pos.x, this.pos.y, width / 6);
    fill(255);
    textSize(40)
    text(this.letter, this.pos.x, this.pos.y);
    pop();
  }

  update() { //Function to update the objects position
    this.pos.add(this.vel);
    if (this.pos.y > height - width / 14 && this.alive) { //Check if objects are out of bounds and subtract lives and kill the object if so
      this.alive = false;
      targetGuitar.shift();
      lives--;
    }
  }
}


/* ***** Function to play sound ***** */
function playSynth(x) {
  let octave = 3; //Set octave for notes
  
  //Every note in hertz across 5 octaves
  let noteC = [32, 65, 130, 261, 523];
  let noteCs = [34, 69, 138, 277, 554];
  let noteD = [36, 73, 146, 293, 587];
  let noteDs = [38, 77, 155, 311, 622];
  let noteE = [41, 82, 164, 329, 659];
  let noteF = [43, 87, 174, 349, 698];
  let noteFs = [46, 92, 185, 369, 739];
  let noteG = [49, 98, 196, 392, 784];
  let noteGs = [52, 104, 208, 415, 830];
  let noteA = [55, 110, 220, 440, 880];
  let noteAs = [58, 116, 233, 466, 932];
  let noteB = [61, 123, 246, 493, 987];

  userStartAudio(); //p5.js native function to play sounds
  let note = 0; //initialize note
  let velocity = 1  // initialize note velocity (volume, from 0 to 1)
  let time = 0; // initalize time from now (in seconds)
  let dur = 1 / 6; // initialize note duration (in seconds)
  
  switch (x) { //Case statement dependent on column of the note
    case 1: //Column 1 notes
      note = random([
        noteC[octave],
        noteD[octave]
      ]);

      // note velocity (volume, from 0 to 1)
      velocity = 0.5;
      // time from now (in seconds)
      time = 0;
      // note duration (in seconds)
      dur = 1 / 6;
      break;

    case 2: //Column 2 notes
      note = random([
        noteDs[octave],
        noteF[octave]
      ]);

      // note velocity (volume, from 0 to 1)
      velocity = 0.5;
      // time from now (in seconds)
      time = 0;
      // note duration (in seconds)
      dur = 1 / 6;
      break;

    case 3: //Column 3 notes
      note = random([
        noteG[octave],
        noteGs[octave]
      ]);

      // note velocity (volume, from 0 to 1)
      velocity = 0.5;
      // time from now (in seconds)
      time = 0;
      // note duration (in seconds)
      dur = 1 / 6;
      break;

    case 4: //Column 4 notes
      note = random([
        noteB[octave],
        noteC[octave + 1],
      ]);

      // note velocity (volume, from 0 to 1)
      velocity = 0.5;
      // time from now (in seconds)
      time = 0;
      // note duration (in seconds)
      dur = 1 / 6;
      break;

    case "dead": //Sound if lives goes down
      note = 100;
      // note velocity (volume, from 0 to 1)
      velocity = 2;
      // time from now (in seconds)
      time = 0;
      // note duration (in seconds)
      dur = 1 / 400;
      break;

  }
  monoSynth.play(note, velocity, time, dur);
}


/* ***** Function for pause button in the upper right of the game ***** */
class pauseButton {
  constructor() { //Location of button
    this.pos = createVector(width * 12 / 13, height * 1 / 13);
    this.high = false;
  }
  display() { //Shape of button
    push();
    if (this.high) {
      strokeWeight(2);
      stroke(250);
    } else {
      strokeWeight(1);
      stroke(0);
    }
    fill(255, 0, 0);
    rect(this.pos.x - 15, this.pos.y - 15, 10, 30);
    rect(this.pos.x + 5, this.pos.y - 15, 10, 30);
    pop();
  }
  mouseCheck() {
    if (abs(mouseX - this.pos.x + 7.5) <=25 && abs(mouseY - this.pos.y + 15) <= 20) {
      this.high = true;
    } else {
      this.high = false;
    }
  }
  
}


/* ***** Generic button class ***** */
class Button {
  constructor(x, y, width, height, text) { //Variables for location and content of button
    this.pos = createVector(x, y);
    this.width = width;
    this.height = height;
    this.text = text;
    this.high = false;
  }

  display() { //Function to display the box and text of the button
    push();
    if (this.high) {
      strokeWeight(2);
      stroke(250);
    } else {
      strokeWeight(1);
      stroke(0);
    }
    fill(130);
    rect(this.pos.x, this.pos.y, this.width, this.height);
    fill(0);
    textSize(15);
    text(this.text, this.pos.x, this.pos.y);
    pop();
  }
  mouseCheck() {
    if (dist(mouseX, mouseY, this.pos.x, this.pos.y) <= this.width / 2) {
      this.high = true;
    } else {
      this.high = false;
    }
  }
}

function gutiarHeroReset() { //Function to reset all of the variables in the game
  targetGuitar = [];
  score = 0;
  lives = 5;
  livesTemp = 5;
  lineSize = 3;
  shake = 1;
  shakeBool = false;
  shakeCounter = 0;
  speedFall = 7;
  pause = false;
  lineSize = 3
  lineColor.x = 0;
  lineColor.y = 0;
  lineColor.z = 0;
  gutiarHeroState = 0;
}