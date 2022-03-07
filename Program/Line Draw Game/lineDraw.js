let highScoreLineDraw = 0;

const runnerStatesLineDraw = {
  MENU: 0,
  LINE: 1,
}
let runnerStateLineDraw = runnerStatesLineDraw.MENU; // the runner state describes which game is being run
let pauseRunning = false; // this condition can be met at the same time as the game (and it takes priority)

function lineDrawSetup() {
  pauseSetup(); // this should be called at the start of the program
  lineGamePrep(); // should be called right before the line game starts
  runnerStateLineDraw = runnerStatesLineDraw.LINE; // This is set because the runner game should start immediately (for this program)
}

function lineDrawDraw() {
  push();
  rectMode(CORNER);
  mouseStateHandler(); // should be called every frame a dialogue box or the mouse handler is being used (if only the line game uses this, it can be grouped in the line game's conditional)

  // pause the game
  if (runnerStateLineDraw != runnerStatesLineDraw.MENU && // pausing on the menu is not allowed
      key == "p" && keyIsPressed && !pauseRunning) // pausing can only happen when the p key was just pressed and the game isn't already paused
    onPauseStart();
  if (pauseRunning) pauseDraw();

  else if (runnerStateLineDraw == runnerStatesLineDraw.LINE) // the condition to run the game must be met
    lineGameDraw(); // the draw function of the lineGame
  pop();
}


function onPauseStart() {
  console.log("Pausing current game.");
  pauseRunning = true;
}

function pauseResume() {
  console.log("Resuming current game.");
  pauseRunning = false;
}

function pauseExit() {
  runnerStates = 0;
  pauseRunning = false;
  runnerStateLineDraw = runnerStatesLineDraw.MENU;
}



// this function is called at the end of the line game
function onLineGameExit() {
  runnerStates = 0;
  runnerStateLineDraw = runnerStatesLineDraw.MENU;
}

//////////////////////////////////////////////////
// Pause screen

let squarePlayerLineDraw, circlePlayerLineDraw, trianglePlayerLineDraw;
let ResumeButton, ExitButton;

function pauseSetup() {
  squarePlayerLineDraw = new squareClassLineDraw();
  circlePlayerLineDraw = new circleClassLineDraw();
  trianglePlayerLineDraw = new triangleClassLineDraw();
  
  ResumeButton = new DialogueButton(null);
  ResumeButton.relY = 4/7;
  ResumeButton.relX = 3/7;
  ResumeButton.text = "Resume";

  ExitButton = new DialogueButton(null);
  ExitButton.relY = 4/7;
  ExitButton.relX = 4/7;
  ExitButton.text = "Exit";
}

function pauseDraw() {
  push();
  background(220);
  squarePlayerLineDraw.update();
  circlePlayerLineDraw.update();
  trianglePlayerLineDraw.update();
  
  squarePlayerLineDraw.show();
  circlePlayerLineDraw.show();
  trianglePlayerLineDraw.show();
  
  
  push();
  textSize(50);
  text("Pause",width/2,height/2);
  pop();
  
  ResumeButton.draw();
  if (ResumeButton.getState()==2) {
    pauseResume();
  }
  ExitButton.draw();
  if (ExitButton.getState()==2) pauseExit();
  pop();
}

class squareClassLineDraw{
  constructor(){
    this.pos = createVector(width / 2,height / 2);
    this.vel = createVector(random(-5,5),random(-5,5));
    this.size = random(20,30);
  }
  
  show(){
    push();
    fill(0,255,0);
    strokeWeight(3);
    square(this.pos.x - this.size / 2,this.pos.y - this.size / 2,this.size);
    pop();
  }
  
  update(){
    this.pos.add(this.vel);
    
    if((this.pos.x > width - this.size / 2) || (this.pos.x < this.size / 2)){
      this.vel.x *= -1;
    }
    
    if((this.pos.y > height - this.size / 2) || (this.pos.y < this.size / 2)){
      this.vel.y *= -1;
    }
  }
}

class circleClassLineDraw{
  constructor(){
    this.pos = createVector(width / 2,height / 2);
    this.vel = createVector(random(-5,5),random(-5,5));
    this.size = random(20,30);
  }
  
    show(){
      push();
      fill(255,0,0);
      noStroke();
      circle(this.pos.x,this.pos.y,this.size);
      pop();
  }
  
  
  update(){
    this.pos.add(this.vel);
    
    if((this.pos.x > width - this.size / 2) || (this.pos.x < this.size / 2)){
      this.vel.x *= -1;
    }
    
    if((this.pos.y > height - this.size / 2) || (this.pos.y < this.size / 2)){
      this.vel.y *= -1;
    }
  }
}

class triangleClassLineDraw{
  constructor(){
    this.pos = createVector(width / 2,height / 2);
    this.vel = createVector(random(-5,5),random(-5,5));
    this.size = random(10,20);
  }
  
  show(){
    push();
    fill(0,0,255);
    strokeWeight(2);
    stroke(255,255,255);
    triangle(this.pos.x,this.pos.y - this.size,this.pos.x + this.size,this.pos.y +this.size,this.pos.x - this.size,this.pos.y + this.size);
    pop();
  }
  update(){
    this.pos.add(this.vel);
    
    if((this.pos.x > width - this.size) || (this.pos.x < this.size)){
      this.vel.x *= -1;
    }
    
    if((this.pos.y > height - this.size) || (this.pos.y < this.size)){
      this.vel.y *= -1;
    }
  }
}

//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Tools (written for Line Game)

// Create booleans to keep track of the mouse for the line game
let mouseIsPressedPrev, mouseJustClicked;

// handle the mouse variables for the program
// this is so the game will know the exact frame the mouse is clicked without the use of the functions
function mouseStateHandler() {
  mouseJustClicked = mouseIsPressed && !mouseIsPressedPrev;
  mouseIsPressedPrev = mouseIsPressed;
}

// a Dialogue box
// properties:
// x : (of upper left corner)
// y : (of upper left corner)
// width : (of box)
// hieght : (of box)
// color : background color of box
// ftsize : font size of text
// dialogue : text in box
// functions:
// constructor() : creates a default DialogueBox
// draw() : draws box (calls all children boxes)
class DialogueBox {
  constructor() {
    this.x = 1/8*width; // px
    this.y = 3/8*height; // px
    this.width = 3/4*width; // px
    this.height = 1/4*height; // px
    this.color = color(255, 64, 0); // color (of background)
    this.ftsize = 18;
    this.dialogue = "no text";
    
    this.items = []; // things the box owns and should draw with itself
  }
  
  draw() {
    push();
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    fill("black")
    textSize(this.ftsize);
    textAlign(CENTER,CENTER);
    text(
      this.dialogue,
      this.x+1/2*this.width,
      this.y+1/3*this.height
    );
    pop();
    // draw all buttons on top of the dialogue box
    this.items.forEach((e)=>e.draw());
  }
}

// a button in a DialogueBox
// properties:
// relX : percent from 0 to 1 of where button lies in owner
// relY : percent from 0 to 1 of where button lies in owner
// color : background color of box
// ftsize : font size of text
// dialogue : text in box
// padding : pixels between text and the rectangle
// functions:
// constructor(owner) : creates a default DialogueButton with an owner Dialogue Box (owner can be null if it is just a lone button)
// draw() : draws button
// getState() : gets the state of the button, -1 mouse not on, 0 hovered, 1 held, 2 clicked
class DialogueButton {
  constructor(owner) {
    this.owner = owner;
    // if the box has no owner, make it based on the background
    if (this.owner==null) {
      this.owner = new DialogueBox();
      this.owner.x = 0;
      this.owner.y = 0;
      this.owner.width = width;
      this.owner.height = height;
    }
    append(this.owner.items, this);
    // relative position inside the owner box
    this.relX = 0.5; // %
    this.relY = 0.5; // %
    this.color = color(0, 153, 255); // color (of background)
    this.ftsize = 14;
    this.text = "no text";
    this.padding = 3; // px
  }
  
  draw() {
    let owner = this.owner;
    push();
    if (this.getState()==0) fill("white");
    else fill(this.color);
    textSize(this.ftsize);
    // background rectangle is slightly larger than the font
    rect(
      owner.x+this.relX*owner.width-1/2*textWidth(this.text)-this.padding,
      owner.y+this.relY*owner.height-1/2*this.ftsize-this.padding,
      textWidth(this.text)+2*this.padding,
      this.ftsize+2*this.padding
    );
    fill("black");
    textAlign(CENTER,CENTER);
    text(
      this.text,
      owner.x+this.relX*owner.width,
      owner.y+this.relY*owner.height
    );
    pop();
  }
  
  // returns 2 if clicked
  // returns 1 if held
  // returns 0 if hovered
  // returns -1 if mouse off button
  getState() {
    let owner = this.owner;
    let x1, x2, y1, y2;
    x1 = owner.x+this.relX*owner.width-1/2*textWidth(this.text)-this.padding;
    y1 = owner.y+this.relY*owner.height-1/2*this.ftsize-this.padding;
    x2 = x1 + textWidth(this.text)+2*this.padding;
    y2 = y1 + this.ftsize+2*this.padding;
    
    // check if the mouse is outside of the button
    if (mouseX < x1 || x2 < mouseX || mouseY < y1 || y2 < mouseY) return -1;
    // check if the mouse is not pressed
    if (!mouseIsPressed) return 0;
    // check if the mouse was not just pressed
    if (!mouseJustClicked) return 1;
    return 2;
  }
}

// a container for stars in a DialogueBox
// properties:
// relX : percent from 0 to 1 of where button lies in owner
// relY : percent from 0 to 1 of where button lies in owner
// colorbox : background color of box
// colorstar : color of stars
// starOuterR : outside radius of star
// starInnerR : inner radius of star
// starWeight : the weight of the star
// starValue : the value for the stars (as a percentage from 0 to 1)
// functions:
// constructor(owner) : creates a default DialogueStarContainer with an owner Dialogue Box (owner can be null if it is just a lone star container)
// draw() : draws button
class DialogueStarContainer {
  constructor(owner) {
    this.owner = owner;
    // if the box has no owner, make it based on the background
    if (this.owner==null) {
      this.owner = new DialogueBox();
      this.owner.x = 0;
      this.owner.y = 0;
      this.owner.width = width;
      this.owner.height = height;
    }
    append(this.owner.items, this);
    // relative position inside the owner box, based on center of center star
    this.relX = 0.5; // %
    this.relY = 0.6; // %
    this.colorbox = this.owner.color; // color (of box)
    this.colorstar = color("gold"); // color (of stars)
    this.starOuterR = 20;
    this.starInnerR = 10;
    this.starWeight = 2.5;
    this.starValue = 0.5; // %
  }
  
  draw() {
    // prevent weird score values that are outside of 0 and 1
    if (this.starValue>1) this.starValue=1;
    if (this.starValue<0) this.starValue=0;
    // get the middle of the middle star
    var x = this.owner.x + this.owner.width * this.relX;
    var y = this.owner.y + this.owner.height * this.relY;
    var i;
    push();
    // draw background
    noStroke();
    fill(this.colorbox);
    rect(x-5*this.starOuterR, y-this.starOuterR, 10*this.starOuterR, 2*this.starOuterR);
    // draw all stars filled
    stroke("black");
    strokeWeight(this.starWeight);
    fill(this.colorstar);
    for (i=0; i<5; i++) {
      star(x+(i-2)*2*this.starOuterR,y,this.starOuterR,this.starInnerR)
    }
    // draw background over stars (leaving intended fill left)
    noStroke();
    fill(this.colorbox);
    rect(x+10*this.starOuterR*(this.starValue-0.5), y-this.starOuterR, 10*this.starOuterR*(1-this.starValue), 2*this.starOuterR);
    // redraw stars not filled
    stroke("black");
    strokeWeight(this.starWeight);
    noFill();
    for (i=0; i<5; i++) {
      star(x+(i-2)*2*this.starOuterR,y,this.starOuterR,this.starInnerR)
    }
    pop();
  }
}

// draws a star shape centered at x,y and with outer and inner radii
// (works similar to the other shape functions but does not work with rotate(angle))
function star(x, y, outerR, innerR) {
  push();
  angleMode(DEGREES);
  beginShape();
  // go around the star drawing the an outside point and inside point
  for (var d=0; d<360; d+=36) {
    vertex(x+outerR*sin(d),y-outerR*cos(d));
    d+=36;
    vertex(x+innerR*sin(d),y-innerR*cos(d));
  }
  endShape(CLOSE);
  pop();
}

// calculates the R^2 for a line given a set of points
function rsquared(pointArray, lineP1, lineP2) {
  // prevent function from crashing by divide by 0
  if (pointArray.length<2 || lineP1.x-lineP2.x==0) return 0;
  
  // derivation of R^2 comes directly from https://en.wikipedia.org/wiki/Coefficient_of_determination#Definitions
  
  // y1-y2 = m(x1-x2)
  // m = (y1-y2)/(x1-x2)
  slopeL = (lineP1.y-lineP2.y)/(lineP1.x-lineP2.x); // y = Mx+b
  // y = mx + y2 - mx2
  intercept = lineP2.y - slopeL*lineP2.x; // y = mx+B
  // f(x) = mx+b
  
  // y bar or y mean
  ymean = 0;
  for (let i=0; i<pointArray.length; i++) {
    ymean+= pointArray[i].y;
  }
  ymean/= pointArray.length;
  
  SStot = 0;
  SSres = 0;
  for (let i=0; i<pointArray.length; i++) {
    pointI = pointArray[i];
    SStot+= sq(pointI.y - ymean);
    SSres+= sq(pointI.y - (slopeL*pointI.x+intercept));
  }
  
  return 1-SSres/SStot;
}

// calculate the slope of a line defined by 2 points (4 integers)
function slopeFunction(firstPointX, firstPointY, secondPointX, secondPointY) {
  this.x1 = firstPointX;
  this.y1 = firstPointY;
  this.x2 = secondPointX;
  this.y2 = secondPointY;
  //console.log(this.x1, this.y1,this.x2,this.y2);
  if(isFinite((this.y1 - this.y2) / (this.x1 - this.x2))) {
    return((this.y1 - this.y2) / (this.x1 - this.x2));
  }
}

//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Line Game

// Declare objects for line game
let point1, point2;
// Declare class objects for line game
let origin, targetLineDraw;
// Declare a pencil object to draw lines for line game
let line1;
// Declare two integers to contain debug slope values for line game
let targetLineDrawSlope, lineSlope = 0;
// Initialize an rsquared variable for line game
let rs = 0;

// Initialize the distance needed between points to be recorded for line game
let lineGameVerifyDistance = 1;
// Initialize the size of the circles in the line drawing game
let lineGameCircleRadius = 15;

// define the states for the line game
const lineGameStates = {
  PREP: 0,
  DRAW: 1,
  SCORE: 2,
  FAIL: 3,
  END: 4,
}
let lineGameState;

// declare the dialogue boxes and buttons for the line game
let RetryBox, RetryButton, ScoreStars, FailBox, FailRetryButton, LineGameExitButton;

function lineGamePrep() {
  lineGameState = lineGameStates.PREP;
  point1 = createVector(random(width),random(height));
  point2 = createVector(random(width),random(height));
  origin = new lineGameCircle(point1.x,point1.y, color("white"));
  targetLineDraw = new lineGameCircle(point2.x,point2.y, color("black"));
  line1 = new lineGamePencil();
  targetLineDrawSlope = slopeFunction(point1.x,point1.y,point2.x,point2.y);
  // if the slope is too low or high then restart the game prep
  if (targetLineDrawSlope == undefined || targetLineDrawSlope < 1/3 || targetLineDrawSlope > 3) {
    lineGamePrep();
    return;
  }
  
  RetryBox = new DialogueBox();
  RetryBox.dialogue = "Press the button to restart.";
  RetryBox.color = color("blue");
  RetryButton = new DialogueButton(RetryBox);
  RetryButton.relY = 0.85;
  RetryButton.text = "Retry";
  ScoreStars = new DialogueStarContainer(RetryBox);
  
  FailBox = new DialogueBox();
  FailBox.dialogue = "You must release on the other circle.";
  FailBox.color = color("red");
  FailButton = new DialogueButton(FailBox);
  FailButton.relY = 0.7
  FailButton.text = "Retry";
  
  LineGameExitButton = new DialogueButton(null);
  LineGameExitButton.text = "EXIT";
  LineGameExitButton.color = color("Orange");
  LineGameExitButton.relX = textWidth(LineGameExitButton.text)/width;
  LineGameExitButton.relY = LineGameExitButton.ftsize/height;
  
}

function lineGameDraw() {
  background(220);
  origin.show();
  targetLineDraw.show();
  
  switch (lineGameState) {
    case lineGameStates.PREP:
      // draw phase/game starts when origin is clicked
      origin.color = color("white");
      targetLineDraw.color = color("black");
      if (origin.isClicked()) lineGameState = lineGameStates.DRAW;
      break;
    
    case lineGameStates.DRAW:
      line1.update();
      line1.show();
      origin.color = color("black");
      targetLineDraw.color = color("white");
      
      // line is finished (user has stopped drawing)
      if (!mouseIsPressed) {
        // line finishes at the end
        if (targetLineDraw.isReleased()) {
          // end the game if the mouse is released in the correct spot
          lineGameState = lineGameStates.SCORE;
          
          lineSlope = slopeOfArray(line1.slope);
          value = (abs(lineSlope/targetLineDrawSlope)) * 100;
          console.log(lineSlope, value);
        }
        
        // line finishes in the incorrect spot
        else {
          lineGameState = lineGameStates.FAIL;
        }
      }
      
      // displayLineGameCornerScore();
      break;
    
    case lineGameStates.SCORE:
      line1.show();
      // displayLineGameCornerScore();
      ScoreStars.starValue = rsquared(line1.pos, point1, point2);
      if(highScoreLineDraw <= ScoreStars.starValue * 5){
        highScoreLineDraw = ScoreStars.starValue * 5;
      }
      RetryBox.draw();
      // restart the game if the user clicks the retry button
      if (RetryButton.getState() == 2) lineGamePrep();
      break;
      
    case lineGameStates.FAIL:
      line1.show();
      FailBox.draw();
      // restart the game if the user clicks the retry button
      if (FailButton.getState() == 2) lineGamePrep();
      break;
    
    default: break;
  }

  LineGameExitButton.draw();
  if (LineGameExitButton.getState()==2) {
    lineGameState = lineGameStates.EXIT;
    onLineGameExit();
  }
}

// display corner scorebox
function displayLineGameCornerScore() {
  rs = rsquared(line1.pos, point1, point2);
  text("Correlation = " + rs,width * 6/10, height * 9/10);

  // text("targetLineDraw Slope = " + targetLineDrawSlope,width * 6/10, height * 8/10);
  
  lineSlope = slopeOfArray(line1.slope);
  value = (abs(lineSlope/targetLineDrawSlope)) * 100;
  // text("Your Slope = " + lineSlope,width * 6/10, height * 7/10);
}

// circle object used in the line game
class lineGameCircle {
  constructor(x,y,c){
    this.x = x;
    this.y = y;
    this.color = c;
    this.r = lineGameCircleRadius;
  }
  
  show() {
    push();
    fill(this.color);
    circle(this.x,this.y,this.r);
    pop();
  }
  
  // true if the mouse is over the circle
  mouseOver() {
    return this.r>=dist(mouseX, mouseY, this.x, this.y);
  }
  
  // true if the mouse is clicked while in the circle
  isClicked() {
    return mouseJustClicked && this.r>=dist(mouseX, mouseY, this.x, this.y);
  }
  
  // true if the mouse is not held while in the circle
  isReleased() {
    return !mouseIsPressed && this.r>=dist(mouseX, mouseY, this.x, this.y);
  }
}

class lineGamePencil {
  constructor(){
    this.pos = [];
    this.slope = [];
    append(this.pos,createVector(point1.x,point1.y));
  }
  update(){
    if(mouseIsPressed){
      if(frameCount % 1 == 0) {
        //append(this.pos,createVector(mouseX,mouseY));
        lineGameVerifyPoint(this.pos,createVector(mouseX,mouseY));
      }
    }
  }

  show() {
    //if(this.pos.length > 2) {
      for(let i = 1; i < this.pos.length; i++) {
        if (this.pos[i-1].x && this.pos[i-1].y && this.pos[i].x && this.pos[i].y) {
          line(this.pos[i-1].x,this.pos[i-1].y,this.pos[i].x,this.pos[i].y);
          this.slope[i-1] = slopeFunction(this.pos[i-1].x,this.pos[i-1].y,this.pos[i].x,this.pos[i].y);
        }
      }
    //}
  }
}

function slopeOfArray(array){
  this.arr = array;
  this.averageSlope = 0;
  this.total = 0;
  this.count = 0;

  for(let i = 0; i < this.arr.length; i++) {
    if(this.arr[i]) {
      this.count++;
      this.total += this.arr[i];
    }
  }
  if (isFinite(this.total/this.count)){
    return(this.total/this.count);
  } else return 0;
}

// Add a point to the array if it is a specific distance from the previous
// said distance is lineGameVerifyDistance
function lineGameVerifyPoint(pointArray, point) {
  lastPoint = pointArray[pointArray.length-1];
  if (dist(lastPoint.x, lastPoint.y, point.x, point.y)>lineGameVerifyDistance) {
    append(pointArray, point);
  }
  return;
}

//////////////////////////////////////////////////