const gameCanvas = document.getElementById('game-canvas');
const gameCtx = gameCanvas.getContext('2d');

var camera = {
    rotate: true,
    follow: true
}

var car1 = new Car(30, 50, 250, 250, 'default');
car1.staticTurn = false;
car1.color = 'red';
var car2 = new Car(30, 50, 300, 250);

var carController = new Controller([
    new KeyHandler(['w', 'W', 'ArrowUp'], () => {car1.forward = true;}, () => {car1.forward = false;}),
    new KeyHandler(['s', 'S', 'ArrowDown'], () => {car1.reverse = true;}, () => {car1.reverse = false;}),
    new KeyHandler(['a', 'A', 'ArrowLeft'], () => {car1.left = true;}, () => {car1.left = false;}),
    new KeyHandler(['d', 'D', 'ArrowRight'], () => {car1.right = true;}, () => {car1.right = false;})
]);

function drawSpeedometer(car) {
    gameCtx.fillStyle = 'red';
    gameCtx.fillRect(0, gameCanvas.height, lerp(0, gameCanvas.width, Math.abs(car.speed / car.maxSpeed)), -10);
}

function drawTestBackground(gridSize = 50) {
    let backgroundSize = 5000;

    gameCtx.strokeStyle = 'lightBlue';
    gameCtx.lineWidth = 3;

    for(let i = 0; i < (backgroundSize / gridSize); i++) {
        for(let j = 0; j < (backgroundSize / gridSize); j++) {
            gameCtx.strokeRect(i*gridSize - ((backgroundSize + gameCanvas.width) / 2), j*gridSize - ((backgroundSize + gameCanvas.height) / 2), gridSize, gridSize);
        }
    }

    gameCtx.lineWidth = 5;

    gameCtx.strokeStyle = 'pink';
    gameCtx.beginPath();
    gameCtx.moveTo(((backgroundSize - gameCanvas.width) / 2), gameCanvas.width / 2);
    gameCtx.lineTo((-(backgroundSize + gameCanvas.width) / 2), gameCanvas.width / 2);
    gameCtx.stroke();
    
    gameCtx.closePath();

    gameCtx.strokeStyle = 'lightGreen';
    gameCtx.beginPath();
    gameCtx.moveTo(gameCanvas.height / 2, ((backgroundSize - gameCanvas.height) / 2));
    gameCtx.lineTo(gameCanvas.height / 2, (-(backgroundSize + gameCanvas.height) / 2));
    gameCtx.stroke();

    gameCtx.strokeStyle = 'transparent';
    gameCtx.stroke();
}

function nextFrame() {

    gameCanvas.height = 500;

    car1.update();
    car2.update();

    if(camera.follow) {
        gameCtx.save();
        gameCtx.translate(gameCanvas.width/2, gameCanvas.height/2);

        if(camera.rotate) {
            gameCtx.rotate(car1.direction);
        }

        gameCtx.translate(-car1.x, -car1.y);
    }

    drawTestBackground();
    
    car1.draw(gameCtx);
    car2.draw(gameCtx);

    gameCtx.restore();

    drawSpeedometer(car1);
}

nextFrame();

setInterval(nextFrame, 1000/60);