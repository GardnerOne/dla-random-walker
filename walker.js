class Walker {
    constructor(x, y, stuck = false) {
        this.pos = (x && y) ? createVector(x, y) : this.randomPoint();
        this.stuck = stuck;
        this.r = 10;
    }

    render() {
        this.stuck ? fill(...secondary, 100) : fill(...primary, 100);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }

    move() {
        let vel = p5.Vector.random2D();
        this.pos.add(vel);

        this.pos.x = constrain(this.pos.x, 0, windowWidth);
        this.pos.y = constrain(this.pos.y, 0, windowHeight);
    }

    isStuck(others) {
        for (let other of others) {
            // Check if walker reached goal
            let d = this.collision(this.pos, other.pos);
            if (d < (this.r * this.r * 4)) {
                this.stuck = true;
            }
        }

        return this.stuck;
    }

    collision(v1, v2) {
        let dx = v2.x - v1.x;
        let dy = v2.y - v1.y;

        return dx * dx + dy * dy;
    }

    randomPoint() {
        let i = floor(random(4));
        let x, y;

        switch (i) {
            case 0:
                x = random(width);
                y = 0;
                break;
            case 1:
                x = width;
                y = random(height);
                break;
            case 2:
                x = random(width);
                y = height;
                break;
            case 3:
                x = 0;
                y = random(height);
                break;

            default:
                break;
        }

        return createVector(x, y);
    }
}
