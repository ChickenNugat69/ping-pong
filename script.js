let player1Score = 0;
let player2Score = 0;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

console.log(document.body.innerHTML);
const overlay = document.getElementById("overlay");
const winnerText = document.getElementById("winnerText");
const restartButton = document.getElementById("restartButton");

canvas.width = 800;
canvas.height = 500;

let paddleY = 180;
let paddle2Y = 180;

let ballX = 400;
let ballY = 250;

let ballSpeedX = 4;
let ballSpeedY = 3;

let gameOver = false;

let nextServeDirection = 1;

function draw() {

if (gameOver) {
    return;
}

if (paddle2Y < ballY - 60) {
    paddle2Y += 2,5;
}

if (paddle2Y > ballY - 60) {
    paddle2Y -= 2,5;
}


if (ballX >= canvas.width) {

    player1Score++;

    if (player1Score >= 7) {
         gameOver = true;
         nextServeDirection = -1;
         winnerText.textContent = "Player 1 gewinnt!";
         overlay.classList.remove("hidden");
        
    } else {

        resetBall(-1);

    }

}

if (ballX <= 0) {

    player2Score++;

    if (player2Score >= 7) {

        gameOver = true;
        nextServeDirection = 1;
        winnerText.textContent = "Player 2 gewinnt!";
        overlay.classList.remove("hidden");
          } else {

        resetBall(1);
    }
}

ballX = ballX + ballSpeedX;
ballY = ballY + ballSpeedY;

if (ballY <= 10 || ballY >= canvas.height - 10) {
    ballSpeedY = -ballSpeedY;
}


if (
    ballSpeedX > 0 &&
    ballX >= 740 &&
    ballY >= paddle2Y &&
    ballY <= paddle2Y + 120
) {
    ballSpeedX = -ballSpeedX;
    ballX = 740;
}

if (
    ballSpeedX < 0 &&
    ballX <= 50 &&
    ballY >= paddleY &&
    ballY <= paddleY + 120
) {
    ballSpeedX = -ballSpeedX;
    ballX = 50;
}

    ctx.clearRect(0, 0, canvas.width, canvas.height);

     ctx.font = "30px Arial";
    ctx.fillStyle = "white";

   
    ctx.fillText(player1Score, 150, 50);
    ctx.fillText(player2Score, 650, 50);

    ctx.fillRect(30, paddleY, 20, 120);
    ctx.fillRect(750, paddle2Y, 20, 120);

ctx.beginPath();

ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);

ctx.fill();

ctx.closePath();

}

canvas.addEventListener("mousemove", function(event) {

    paddleY = event.offsetY - 60;

});

setInterval(draw, 16);

function resetBall(direction) {

    ballX = 400;
    ballY = 250;

    ballSpeedX = direction * 4;
    ballSpeedY = 3;

}

restartButton.addEventListener("click", function () {

    player1Score = 0;
    player2Score = 0;

    gameOver = false;

    overlay.classList.add("hidden");

    resetBall(nextServeDirection);

});