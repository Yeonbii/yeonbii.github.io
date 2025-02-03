const canvas = document.querySelector('canvas');
const board = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontType = "'Press Start 2P', cursive";

let notificationFontSize = 21;
if (canvas.width <= 480) {
    notificationFontSize = 12;
}

const notificationText = {
    text: "Portofolio Belum Dibuat",
    fontType: fontType,
    fontSize: notificationFontSize,
    color: "black",
    position: {
        // Tengah || Kanan || Kiri || Bebas
        x: "Tengah",
        y: canvas.height / 4
    }
}

const playerProperty = {
    width: 30,
    height: 30,
    color: "mediumslateblue",
    position: {
        x: 50,
        y: canvas.height / 2
    },
    heightJump: 100,
    play: false
}

const scoreValue = {
    fontType: fontType,
    fontSize: 14,
    color: "black",
    position: {
        // Tengah || Kanan || Kiri || Bebas
        x: "Kanan", 
        y: 30
    }
}


const ground = new Ground("/src/img/game1/cloud.png", canvas.width, canvas.height, 2);
const player = new Player(playerProperty);
const notification = new Notification(notificationText);
const score = new Score(scoreValue);

function animate() {
    ground.create();
    player.create();
    notification.create();
    score.create();

    if (player.play == true) {
        ground.update();
        player.update();
        if (score.currentScore < 999) {
            score.update();
        }
    }

    window.requestAnimationFrame(animate);
}

window.addEventListener("keydown", function(callback) {
    player.movement(callback.code);
});

window.addEventListener("click", function(callback) {
    player.movement('Touch');
});

window.addEventListener("touchstart", function() {
    // console.log(event);
    player.movement('Touch');
});

animate();