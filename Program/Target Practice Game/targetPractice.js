  let target = [],
    countTarget = 10,
    circleGroup = [],
    timerValue = 0,
    formatedTime = "0:00",
    incrementTimer = true,
    clicks = 0,
    pauseButtonTarget,
    targetPracticeStates = 0; //Running = 0, Pause = 1
  let buttonTarget; //A variable to hold the pause utton class in the upper right of the game
  let resumeButtonTarget; //A variable to hold the resume button from the pause screen
  let exitButtonTarget; //A variable to hold the exit button from the pause screen
  let resumeButton2Target; //A variable to hold the resume button from the gameover screen
  let exitButton2Target; //A variable to hold the exit button from the gameover screen

  function targetPracticeSetup() {
    pauseButtonTarget = new pauseButton();
    for (let i = 0; i < 10; i++) {
      target[i] = new circleClassTarget(random(width * 1 / 15, width * 14 / 15), random(height * 1 / 15, height * 14 / 15), random(10, 30));
    }
    setInterval(timeIt, 1000);

    squarePlayerTarget = new squareClass();
    circlePlayerTarget = new circleClass();
    trianglePlayerTarget = new triangleClass();

    resumeButtonTarget = new Button(width / 3, height / 2, 100, 30, "Resume");
    resumeButtonTarget2 = new Button(width / 3, height * 2 / 3, 100, 30, "Reset");
    exitButtonTarget = new Button(width * 2 / 3, height / 2, 100, 30, "Exit");
    exitButtonTarget2 = new Button(width * 2 / 3, height * 2 / 3, 100, 30, "Exit");
  }

  function timeIt() {
    if (incrementTimer) {
      timerValue++;
      if (timerValue % 60 >= 10) {
        formatedTime = int(timerValue / 60) + ":" + timerValue % 60;
      } else if (timerValue % 60 < 10) {
        formatedTime = int(timerValue / 60) + ":0" + timerValue % 60;
      }
    }
  }

  function timerDraw() {
    push();
    fill(0);
    textSize(50);
    text(formatedTime, 70, 50);
    pop();

  }

  function targetPracticeDraw() {
    switch (targetPracticeStates) {
      case 0:
        pauseButtonTarget.display();
        pauseButtonTarget.mouseCheck();
        timerDraw();
        if (countTarget == 10) {
          fill(0);
          textSize(300);
          text(countTarget, width / 2, height / 2);
        } else {
          fill(0);
          textSize(300);
          text(countTarget, width / 2, height / 2);
        }
        for (let i = 0; i < 10; i++) {
          target[i].show();
        }

        if (countTarget < 1) {
          for (let i = 0; i < 10; i++) {
            incrementTimer = false;
          }
        }
        break;

      case 1:
        //Update position and show the background objects
        squarePlayerTarget.update();
        circlePlayerTarget.update();
        trianglePlayerTarget.update();
        squarePlayerTarget.show();
        circlePlayerTarget.show();
        trianglePlayerTarget.show();

        //Display the buttons
        resumeButtonTarget.display();
        exitButtonTarget.display();
        resumeButtonTarget.mouseCheck();
        exitButtonTarget.mouseCheck();

        if (resumeButtonTarget.high || exitButtonTarget.high) {
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
    }
  }

  class circleClassTarget {
    constructor(x, y, size) {
      this.x = x; // x coordinate of circle
      this.y = y; // y coordinate of circle
      this.s = size; // size of circle
      this.d = true; // display circle or not
      this.e = false;
      this.explosions = [];
    }
    show() {
      if (this.d) { // if circle show be displayed
        push();
        fill(255, 0, 0);
        stroke(255, 0, 0);
        circle(this.x, this.y, this.s); // draw circle
        pop();
      } else {
        for (var v = 0; v < this.explosions.length; v++) {
          this.explosions[v].present();
        }
      }
    }
    move() {
      this.x = random(width * 1 / 15, width * 14 / 15);
      this.y = random(height * 1 / 15, height * 14 / 15);
    }
    explode() {
      this.explosions[0] = new circleExplosionClass(this.x, this.y, this.s / 2, this.s * 2.5, 20, 1);
      this.explosions[1] = new circleExplosionClass(this.x, this.y, this.s / 2, this.s * 3.7, 10, 4);
      this.explosions[2] = new circleExplosionClass(this.x, this.y, this.s / 2, this.s * 2.0, 50, 1);
      this.explosions[3] = new circleExplosionClass(this.x, this.y, this.s / 2, this.s * 1.8, 30, 2);
    }
    explosionActivate() {
      for (var v = 0; v < this.explosions.length; v++) {
        this.explosions[v].activate();
      }
    }
  }

  class circleExplosionClass {
    constructor(centerX, centerY, rLow, rBig, num, strokeWidth) {
      this.rLow = rLow;
      this.rBig = rBig;
      this.r = [];
      this.rgoal = rLow;
      this.num = num;
      this.cX = centerX;
      this.cY = centerY;
      this.speed = [];
      this.active = [];
      this.locX = [];
      this.locY = [];
      this.f = 255;
      this.strokeWidth = strokeWidth;
      for (var i = 0; i < num; i++) {
        this.active[i] = false;
        this.r[i] = this.rLow;
        this.locX[i] = this.cX + cos((360 * i) / this.num) * this.rLow;
        this.locY[i] = this.cY + sin((360 * i) / this.num) * this.rLow;
      }
    }
    move() {
      for (var i = 0; i < this.num; i++) {
        if (this.active[i]) {
          this.r[i] += (this.rgoal - this.r[i]) / this.speed[i]; // update radius
          if ((this.r[i] > this.rBig) || (this.r[i] < this.rLow)) { // Check if in the boundaries
            this.r[i] = this.rgoal;
            this.active[i] = false;
          }
          this.locX[i] = this.cX + cos((360 * i) / this.num) * this.r[i];
          this.locY[i] = this.cY + sin((360 * i) / this.num) * this.r[i]; // Update location
        }
      }
    }
    isActive() {
      for (var i = 0; i < this.num; i++) {
        if (this.active[i]) {
          return true;
        }
      }
      return false;
    }
    activate() {
      if (this.rgoal == this.rLow) { //when pressing circle to explode
        this.rgoal = this.rBig;
      } else {
        this.rgoal = this.rLow;
      }
      for (var i = 0; i < this.num; i++) {
        this.active[i] = true;
        this.speed[i] = random(10, 50);
      }
    }
    present() {
      push();
      strokeWeight(this.strokeWidth);

      stroke(255, 0, 0, this.f);
      if (this.isActive()) {
        this.move();
        this.f -= 5;
      }
      for (var i = 0; i < this.num; i++) {
        point(this.locX[i], this.locY[i]);
      }
      pop();
    }
  }

function targetPracticeReset(){
  target = [];
    countTarget = 10;
    circleGroup = [];
    timerValue = 0;
    formatedTime = "0:00";
    incrementTimer = true;
    clicks = 0;
    targetPracticeStates = 0;
  for (let i = 0; i < 10; i++) {
      target[i] = new circleClassTarget(random(width * 1 / 15, width * 14 / 15), random(height * 1 / 15, height * 14 / 15), random(10, 30));
    }
}