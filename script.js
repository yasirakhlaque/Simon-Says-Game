let gameSeq = [];
let userSeq = [];
let userScore = 0;
let highScore = 0;
let userScoreElement = document.getElementById('user-score');
let highScoreElement = document.getElementById('high-score');

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

function startGame() {
    if (!started) {
        console.log("Game has been started");
        started = true;
        levelUp();
    }
}

document.addEventListener("keypress", startGame);
document.addEventListener("touchstart", startGame, { once: true });

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    userScore++;
    updateScores();
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randbtn);
}

function updateScores() {
    if (userScore > highScore) {
        highScore = userScore;
    }
    userScoreElement.innerText = userScore;
    highScoreElement.innerText = highScore;
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over. Your Score was <b>${userScore}</b><br>Press any key to start again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    userScore = 0;
    updateScores();
}
