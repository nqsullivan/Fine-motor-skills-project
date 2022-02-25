/* ***** Pause Screen Classes ***** */

class squareClass { //Class for square object
  constructor() {
    this.pos = createVector(width / 2, height / 2); //Vector for position
    this.vel = createVector(random(-5, 5), random(-5, 5)); //Vector for velocity
    this.size = 30; //Size of object
  }

  show() { //Display the square object
    push();
    fill(0, 255, 0);
    strokeWeight(3);
    square(this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size);
    pop();
  }

  update() { //Movement function
    this.pos.add(this.vel);
    
    //Bounce off walls
    if ((this.pos.x > width - this.size / 2) || (this.pos.x < this.size / 2)) {
      this.vel.x *= -1;
    }

    if ((this.pos.y > height - this.size / 2) || (this.pos.y < this.size / 2)) {
      this.vel.y *= -1;
    }
  }
}

class circleClass {//Class for circle object
  constructor() {
    this.pos = createVector(width / 2, height / 2);//Vector for position
    this.vel = createVector(random(-5, 5), random(-5, 5)); //Vector for velocity
    this.size = 32.5;//Size of object
  }
  show() { //Display the circle object
    push();
    fill(255, 0, 0);
    noStroke();
    circle(this.pos.x, this.pos.y, this.size);
    pop();
  }


  update() {//Movement function
    this.pos.add(this.vel);

    //Bounce off walls
    if ((this.pos.x > width - this.size / 2) || (this.pos.x < this.size / 2)) {
      this.vel.x *= -1;
    }

    if ((this.pos.y > height - this.size / 2) || (this.pos.y < this.size / 2)) {
      this.vel.y *= -1;
    }
  }
}

class triangleClass {//Class for triangle object
  constructor() {
    this.pos = createVector(width / 2, height / 2); //Vector for position
    this.vel = createVector(random(-5, 5), random(-5, 5)); //Vector for velocity
    this.size = 20;//Size of object
  }

  show() { //Display the triangle object
    push();
    fill(0, 0, 255);
    strokeWeight(2);
    stroke(255, 255, 255);
    triangle(this.pos.x, this.pos.y - this.size, this.pos.x + this.size, this.pos.y + this.size, this.pos.x - this.size, this.pos.y + this.size);
    pop();
  }
  update() {//Movement function
    this.pos.add(this.vel);

    //Bounce off walls
    if ((this.pos.x > width - this.size) || (this.pos.x < this.size)) {
      this.vel.x *= -1;
    }

    if ((this.pos.y > height - this.size) || (this.pos.y < this.size)) {
      this.vel.y *= -1;
    }
  }
}