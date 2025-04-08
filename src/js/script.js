const avatarImg = document.querySelector('#avatar');
const toggle = document.querySelector('#menuToggle');
const iconToggle = toggle.querySelector('i');
const options = document.querySelector('#menuOptions');

let isHovered = false;

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

toggle.addEventListener('click', () => {
    options.classList.toggle('hidden');
    iconToggle.classList.toggle('rotate-180');
});

// Optional: klik di luar dropdown nutupin menu
document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !options.contains(e.target)) {
        options.classList.add('hidden');
    }
});