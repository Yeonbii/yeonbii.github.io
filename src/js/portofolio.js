const emojiImg = document.querySelector('#emoji');
let lastTap = 0;

function angryEmoji() {
    emojiImg.src = "src/img/emoji-eyes-angry.png";
}

function defaultEmoji() {
    emojiImg.src = "src/img/emoji-eyes-default.png";
}

function happyEmoji() {
    emojiImg.src = "src/img/emoji-eyes-happy.png";
}

// Hover (PC): senyum
emojiImg.addEventListener('mouseenter', () => {
    happyEmoji();
});

// Hover keluar (PC): default
emojiImg.addEventListener('mouseleave', () => {
    defaultEmoji();
});

// Double click (PC): marah
emojiImg.addEventListener('dblclick', () => {
    angryEmoji();
});

// Double tap (HP): marah
emojiImg.addEventListener('touchend', () => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
        // Double tap terdeteksi
        angryEmoji();
    }

    lastTap = currentTime;
});
