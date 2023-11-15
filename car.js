class Car {
    constructor(width, height, x = 0, y = 0, viewType = 'default') {
        this.width = width;
        this.height = height;
        this.direction = 0;
        this.x = x;
        this.y = y;

        this.throttle = 0;
        this.steering = 0;

        this.acceleration = 0.2;
        this.friction = 0.05;

        this.turnSpeed = 0.03;
        this.speed = 0;
        this.maxSpeed = 10;

        this.staticTurn = false;

        this.color = 'black';

        this.viewType = viewType;
    }

    update() {
        this.speed += this.acceleration * this.throttle;
        
        if(this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
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

        if(Math.abs(this.speed) > 0) {
            let flip = this.speed > 0 ? 1 : -1;
            this.direction += this.turnSpeed * this.steering * flip;
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