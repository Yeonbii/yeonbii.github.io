const tabButtons = document.querySelectorAll('#tab-buttons [data-tab-button]');
const tabContents = document.querySelectorAll('#tab-contents [data-tab-content]');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('border-b', 'text-white'));
        tabContents.forEach(c => c.classList.add('hidden'));

        btn.classList.add("border-b", "text-white");
        const target = btn.getAttribute("data-tab-button");

        document.querySelector(`#tab-contents [data-tab-content="${target}"]`).classList.remove('hidden');
    });
});