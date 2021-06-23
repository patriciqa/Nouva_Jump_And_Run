const game = document.getElementById("game-container");
const enemies = [];
let platformCount = 8;
let newPlat;
let removed = false;

class Enemy {
    constructor(newPlat) {
        this.left = newPlat;
        this.element = document.createElement("div");
        this.visited = false;
        const element = this.element;
        element.classList.add('platform');
        element.style.left = this.left + 'px';
        game.appendChild(element);

    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function createEnemies() {
    for (let i = 0; i < platformCount; i++) {
        let platformGap = getRandomInt(400, 800);
        if (enemies[0] == null) {
            newPlat = i + platformGap;
        } else {
            newPlat = enemies[i - 1].left + getRandomInt(400, 800);
        }
        let newPlatform = new Enemy(newPlat);
        enemies.push(newPlatform)
    }
}

function removePlatform() {
    setInterval(() => {
        if (score >= 4 && removed == true) {
            removed = false;
            let game = document.querySelector('#game-container')
            let platform = document.querySelector('.platform')
            game.removeChild(platform);
            enemies.shift();
            console.log("check" + enemies)
            newPlat = enemies[6].left + getRandomInt(400, 800);
            let newPlatform = new Enemy(newPlat);
            enemies.push(newPlatform);
        }
    }, 20)

}

