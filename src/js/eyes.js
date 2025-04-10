const emojiDiv = document.querySelector('#emoji');
const emojiImg = emojiDiv.querySelector('img');
let lastTap = 0;

function angryEmoji() {
    emojiImg.src = "src/img/emoji3.png";
}

function defaultEmoji() {
    emojiImg.src = "src/img/emoji1.png";
}

function happyEmoji() {
    emojiImg.src = "src/img/emoji2.png";
}

// Hover (PC): senyum
emojiDiv.addEventListener('mouseenter', () => {
    happyEmoji();
});

// Hover keluar (PC): default
emojiDiv.addEventListener('mouseleave', () => {
    defaultEmoji();
});

// Double click (PC): marah
emojiDiv.addEventListener('dblclick', () => {
    angryEmoji();
});

// Double tap (HP): marah
emojiDiv.addEventListener('touchend', () => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
        // Double tap terdeteksi
        angryEmoji();
    }

    lastTap = currentTime;
});
