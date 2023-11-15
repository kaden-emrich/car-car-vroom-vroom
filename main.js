const gameCanvas = document.getElementById('game-canvas');
const gameCtx = gameCanvas.getContext('2d');

var car1 = new Car(30, 50, 250, 250, 'default');
car1.staticTurn = false;
car1.color = 'blue';
var car2 = new Car(30, 50, 300, 250);

var carController = new Controller([
    new KeyHandler(['w', 'W', 'ArrowUp'], () => {car1.throttle = 1;}, () => {car1.throttle = 0;}),
    new KeyHandler(['s', 'S', 'ArrowDown'], () => {car1.throttle = -1;}, () => {car1.throttle = 0;}),
    new KeyHandler(['a', 'A', 'ArrowLeft'], () => {car1.steering = 1;}, () => {car1.steering = 0;}),
    new KeyHandler(['d', 'D', 'ArrowRight'], () => {car1.steering = -1;}, () => {car1.steering = 0;})
]);

function drawTestBackground(ctx, gridSize = 20) {
    ctx.strokeStyle = 'lightBlue';

    for(let i = 0; i < 25; i++) {
        for(let j = 0; j < 25; j++) {
            ctx.strokeRect(i*gridSize, j*gridSize, gridSize, gridSize);
        }
    }
}

function nextFrame() {

    gameCanvas.height = 500;

    car1.update();
    car2.update();

    gameCtx.save();
    gameCtx.translate(gameCanvas.width/2, gameCanvas.height/2);
    gameCtx.rotate(car1.direction);
    gameCtx.translate(-car1.x, -car1.y);

    drawTestBackground(gameCtx);
    car1.draw(gameCtx);
    car2.draw(gameCtx);

    gameCtx.restore();
}

nextFrame();

setInterval(nextFrame, 1000/60);