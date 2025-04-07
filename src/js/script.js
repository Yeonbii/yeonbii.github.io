let isHovered = false;
const avatarImg = document.getElementById('avatar');

function kedip() {
    if (isHovered) {
        return;
    }

    avatarImg.src = "src/img/avatar-close-eyes.png";

    setTimeout(() => {
        if (!isHovered) {
            avatarImg.src = "src/img/avatar.png";
        }
    }, 1000);
}

kedip();

let intervalId = setInterval(kedip, 5000); // Looping

// Hover: hentikan kedip
avatarImg.addEventListener('mouseenter', () => {
    isHovered = true;
    clearInterval(intervalId);
    avatarImg.src = "src/img/avatar-close-eyes.png";
});

// Mouse keluar: lanjutkan lagi
avatarImg.addEventListener('mouseleave', () => {
    isHovered = false;
    avatarImg.src = "src/img/avatar.png";
    intervalId = setInterval(kedip, 5000);
});
