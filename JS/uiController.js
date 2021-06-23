let indexContainer = document.getElementById("index-container");
let gameContainer = document.getElementById("game-container");
let highscoreContainer = document.getElementById("highscore-container");
let endContainer = document.getElementById("end-container");
let sound = document.getElementById('jumping-sound');
let backgroundSound = document.getElementById('background-sound');
let highscoreList = document.getElementById("highscoreList");
let btnPlay = document.getElementById("btnPlay");
let btnHighscore = document.getElementById("btnHighscore");
let btnSaveScore = document.getElementById("btnSaveScore");
let btnHome = document.querySelectorAll(".btnHome");

btnPlay.addEventListener("click", () => {
    indexContainer.classList.toggle("hidden");
    gameContainer.classList.toggle("hidden");
    start();
});

btnHighscore.addEventListener("click", () => {
    indexContainer.classList.toggle("hidden");
    highscoreContainer.classList.toggle("hidden");
    // get scores from server
    fetch("http://localhost:8080", { method: "GET" })
        .then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data);
            data.forEach(highscore => {
                let listItem = document.createElement("li");
                //first 30 letters of a name will be shown
                let name;
                if (highscore.name.length > 30) {
                    name = highscore.name.slice(0, 30);
                    console.log("not good" + highscore.name.length);
                } else {
                    name = highscore.name;
                }
                listItem.innerHTML = "Name: " + name + " / Score: " + highscore.score;
                highscoreList.appendChild(listItem);
            });
        });
});

btnSaveScore.addEventListener("click", () => {
    let saveName = document.getElementById("name").value;
    let newHighscore = { name: saveName, score: score };
    let test = JSON.stringify(newHighscore);
    fetch('http://localhost:8080', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "post",
        body: test
    });
});


function start() {
    createEnemies();
    removePlatform();
    startCollision();
    updater();
    playAudio();
}

function playAudio() {
    backgroundSound.play();
}

function gameEnd() {
    backgroundSound.pause();
    backgroundSound.currentTime = 0;
    displayEndScreen();
    console.log('game over');
}

function displayEndScreen() {
    gameContainer.classList.toggle("hidden");
    endContainer.classList.toggle("hidden");
    document.getElementById("finalScore").innerHTML += score;
}