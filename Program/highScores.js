let hsTarget =0, hsGutiarHero = 0; //High score  varibles

function highScoresDraw(){
  //Title
  push();
  textAlign(CENTER,CENTER);
  textSize(50)
  text("High Scores",width/2, height / 6);
  pop();
  
  //Target
  push();
  textAlign(LEFT,CENTER);
  textSize(40)
  text("Target Practice:" ,width/100, height*7 / 20);
  pop();
  
  //Gutiar Hero
  push();
  textAlign(LEFT,CENTER);
  textSize(40)
  text("Gutiar Hero : " + hsGutiarHero+ " points",width/100, height* 11 / 20);
  pop();
  
  //Line Draw
  push();
  textAlign(LEFT,CENTER);
  textSize(40);
  text("Line Draw : " + round(highScoreLineDraw,1) + " Stars",width/100, height* 15 / 20);
  pop();
  
  //Exit
   push();
  textSize(50);
  if (dist(mouseX, mouseY, width/2, height * 92/100) <= 43) {
      this.high = true;
      pointerStates = 1;
    } else {
      this.high = false;
      pointerStates = 0;
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
}