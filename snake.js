var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//Snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//Snake Food
var foodX;
var foodY;

//Score Board
var score = 0;
//Game over
var gameOver = false;


window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");//Used for drawing on the board
    placeFood();
    drawScore();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000 / 10);//100 millisecond update function runs
}
function drawScore() {
    context.fillStyle = "white";
    context.font = "20px verdana";
    context.fillText("Score:" + score, board.width - 120, 20);
}

function update() {
    if (gameOver) {
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "Red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        score++;
        snakeBody.push([foodX, foodY])
        placeFood();

        // if (velocityX > 1) {
        //     velocityX += 0.5;
        // }
        // if (velocityX < 0) {
        //     velocityX -= 0.5;
        // }
        // if (velocityY > 1) {
        //     velocityY += 0.5;
        // }
        // if (velocityY < 0) {
        //     velocityY -= 0.5;
        // }

    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];

    }


    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    //Game Over Conditions
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {

        context.fillStyle = "white";
        context.font = "50px verdana";
        context.fillText("Game Over!", board.width / 5, board.height / 2);
        gameOver = true;
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            context.fillStyle = "white";
            context.font = "50px verdana";
            context.fillText("Game Over!", board.width / 5, board.height / 2);
        }
    }
    drawScore();
}




function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }

}


function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}