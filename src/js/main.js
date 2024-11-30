const canvas = document.querySelector('canvas');
const board = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let font = "21px 'Press Start 2P', cursive";
if (canvas.width <= 480) {
    font = "14px 'Press Start 2P', cursive";
}

const textNotification = {
    text: "Portofolio Belum Dibuat",
    font: font,
    color: "black",
    position: {
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
    heightJump: 100
}

const ground = new Ground("/src/assets/cloud.png", canvas.width, canvas.height, 2);
const player = new Player(playerProperty);
const notification = new Notification(textNotification);

function animate() {
    ground.create();
    player.create();
    notification.create();

    ground.update();
    player.update();

    window.requestAnimationFrame(animate);
}

window.addEventListener("keydown", function(callback) {
    player.movement(callback.code);
});

window.addEventListener("touchstart", function(event) {
    // console.log(event);
    player.movement('Touch');
});

animate();