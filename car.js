class Car {
    constructor(width, height, x = 0, y = 0, viewType = 'default') {
        this.width = width;
        this.height = height;
        this.direction = 0;
        this.x = x;
        this.y = y;

        this.throttle = 0;
        this.steering = 0;

        this.acceleration = 0.1;
        this.friction = 0.03;
        this.decelerationBonus = 0.1;

        this.turnSpeed = 0.03;
        this.turnBuffer = 3;
        this.speed = 0;
        this.maxSpeed = 20;

        this.staticTurn = false;

        this.color = 'black';

        this.viewType = viewType;

        this.forward = false;
        this.reverse = false;
        this.left = false;
        this.right = false;
    }

    update() {
        if(this.forward && this.reverse) {
            this.throttle = 0;
        } 
        else if(this.forward) {
            this.throttle = 1;
        }
        else if(this.reverse) {
            this.throttle = -1;
        }
        else {
            this.throttle = 0;
        }

        if(this.left && this.right) {
            this.steering = 0;
        }
        else if(this.left) {
            this.steering = 1;
        }
        else if(this.right) {
            this.steering = -1;
        }
        else {
            this.steering = 0;
        }

        if(this.speed * this.throttle < 0) {
            this.speed += (this.acceleration + this.decelerationBonus) * this.throttle;
        }
        else {
            this.speed += this.acceleration * this.throttle;
        }

        if(this.speed > 0) {
            this.speed -= this.friction;
        }
        if(this.speed < 0) {
            this.speed += this.friction;
        }
        if(Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }
        
        if(this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if(this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }

        if(Math.abs(this.speed) > 0) {
            if(Math.abs(this.speed) < this.turnBuffer) {
                this.direction += ((this.speed / this.turnBuffer) * this.turnSpeed) * this.steering;
            }
            else {
                let flip = this.speed > 0 ? 1 : -1;
                this.direction += this.turnSpeed * this.steering * flip;
            }
        }
        else if(this.staticTurn){
            this.direction += this.turnSpeed * this.steering;
        }

        this.x -= Math.sin(this.direction) * this.speed;
        this.y -= Math.cos(this.direction) * this.speed;
    }

    draw(ctx) {
        ctx.save();

        ctx.fillStyle = this.color;

        if(this.viewType == 'default') {
            ctx.translate(this.x, this.y);
            ctx.rotate(-this.direction);

            ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
            ctx.stroke();
        }
        else if(this.viewType == 'centered') {
            ctx.translate(this.x, this.y);
            ctx.rotate(-this.direction);
            ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
        }

        ctx.restore();
    }
}