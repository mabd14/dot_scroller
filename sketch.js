let player;
let pressedKyes = {};
function setup()  {
    createCanvas(windowWidth, windowHeight);
    player = new Player(250, 250);
}

function draw()  {
    background(220);
    player.update();;
    player.draw();
}

function keyPressed()  {
    pressedKyes[keyCode] = true;
    Text("key pressed", 250, 250);
}

function keyReleased()  {
    delete pressedKyes[keyCode];

}

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.speed = 4;
        this.tailX = x;
        this.tailY = y;
        this.trail = []; // Store previous positions in an array
    }
update() {
      // Calculate the new position
  let newX = this.x + this.speed * (keyIsDown(RIGHT_ARROW) ? 1 : -1);
  let newY = this.y + this.speed * (keyIsDown(DOWN_ARROW) ? 1 : -1);

  // Interpolate between the old and new positions
  this.x += (newX - this.x) * 0.1;
  this.y += (newY - this.y) * 0.1;


    this.trail.push({ x: this.x, y: this.y }); // Add current position to trail
    if (this.trail.length > 30) { // Limit trail length to 30 positions
      this.trail.shift();
    }
    if (keyIsDown(LEFT_ARROW)) {
        this.x -= this.speed;

        
    }
    if (keyIsDown(RIGHT_ARROW)) {
        this.x += this.speed;

    }
    if (keyIsDown(UP_ARROW)) {
        this.y -= this.speed * 2;

    }
    if (keyIsDown(DOWN_ARROW)) {
        this.y += this.speed;

    }
    else {
        this.y += 4;
    }

}
    draw() {
        for (let i = 0; i < this.trail.length; i++) {
            let pos = this.trail[i];
            stroke(255, 0, 0, map(i, 0, this.trail.length, 255, 0)); // Fade out trail
            line(pos.x, pos.y, this.x, this.y);
          }

        fill(0);
        circle(this.x, this.y, 10);
        
    }
}


