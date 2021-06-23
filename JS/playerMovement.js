const player = document.getElementById('player');
const clouds = document.getElementById('clouds');
const scoreDisplay = document.getElementById('score');
const scoreText = document.getElementById("score");

let gameOver = false;
let bottom = 18;
let gravity = 0.05;
let isJumping = false;
let isGoingLeft = false;
let isGoingRight = true;
let left = 0;
let rightTimerId;
let leftTimerId;
let jumpSpeed = 2;
let cloudParallax = 0.3;
let testParallax = 1;
let cloudX = 0;
let enemyX = 0;
let score = 0;
let speed = 2.5;

function updater() {
    let speedcount = true;
    setInterval(() => {
        if (score % 5 === 0 && score != 0 && speedcount) {
            speedcount = false;
            speed += 0.25
        }
        if (score % 5 === 1 && score != 1) {
            speedcount = true;

        }
    }, 20);
}

function jump() {
    if (isJumping) {
        return;
    } else {
        isJumping = true;
    }
    let timerDown = setInterval(() => {
        if (bottom >= 18) {
            bottom += jumpSpeed;
            jumpSpeed -= gravity;
            if (bottom < 18) {
                isJumping = false;
                jumpSpeed = 2;
                bottom = 18;
                clearInterval(timerDown);
            }
            player.style.bottom = bottom + '%';
        }
    }, 20)
}

function movePlayerRight() {
    if (isGoingRight) {
        clearInterval(rightTimerId);
        isGoingRight = false;
    }
    isGoingLeft = true;
    leftTimerId = setInterval(function () {
        cloudX += 0.5 * speed;
        enemyX += 2 * speed;

        clouds.style.transform = 'translateX(' + cloudX + 'px)';
        enemies.forEach(element => {
            element.element.style.transform = 'translateX(' + enemyX + 'px)';
        });
    }, 20)
}

function movePlayerLeft() {
    if (isGoingLeft) {
        clearInterval(leftTimerId);
        isGoingLeft = false;
    }
    isGoingRight = true;
    rightTimerId = setInterval(function () {
        cloudX -= 0.5 * speed;
        enemyX -= 2 * speed;

        clouds.style.transform = 'translateX(' + cloudX + 'px)';
        enemies.forEach(element => {
            element.element.style.transform = 'translateX(' + enemyX + 'px)';
        });
    }, 20)
}

function control(e) {
    if (!e.repeat) {
        if (e.keyCode === 32) {
            jump();
            sound.play();
        } else if (e.keyCode === 37) {
            movePlayerRight();
        } else if (e.keyCode === 39) {
            movePlayerLeft();
        }
    }
}

function stop(e) {
    if (e.keyCode === 32) {
    } else if (e.keyCode === 37) {
        clearInterval(leftTimerId);
        isGoingLeft = false;

    } else if (e.keyCode === 39) {
        clearInterval(rightTimerId);
        isGoingRight = false;
    }
}


function startCollision() {
    setInterval(() => {
        let enemyTop = []
        let enemyLeft = []
        let enemyRight = []
        let enemyBottom = []

        var rect = player.getBoundingClientRect();
        let playerTop = rect.top;
        let playerBottom = rect.bottom;
        let playerRight = rect.right - 10;
        let playerLeft = rect.left + 10;

        for (let i = 0; i < enemies.length; i++) {
            let getEnemey = enemies[i].element.getBoundingClientRect();
            enemyTop.push(getEnemey.top)
            enemyRight.push(getEnemey.right)
            enemyBottom.push(getEnemey.bottom)
            enemyLeft.push(getEnemey.left)
        }
        //collision detection
        for (let i = 0; i < enemies.length; i++) {
            if (enemyLeft[i] < playerRight &&
                enemyRight[i] > playerLeft &&
                playerTop < enemyBottom[i] &&
                playerBottom > enemyTop[i]) {
                gameEnd();
            }

            // highscore
            if (enemyLeft[i] < playerRight &&
                enemyRight[i] > playerLeft &&
                playerTop < enemyTop[i]) {
                if (!enemies[i].visited) {
                    score++;
                    scoreDisplay.innerHTML = score;
                    enemies[i].visited = true;
                    removed = true;
                }
            }

        }
    }, 10);
}

window.addEventListener('keydown', control);
window.addEventListener('keyup', stop);




