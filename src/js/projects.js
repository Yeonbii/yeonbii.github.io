const projectList = document.querySelector('#project-list');

async function loadData() {
    try {
        const response = await fetch('/src/json/projects.json');
        jsonData = await response.json();
        populateData(jsonData);
        console.log(jsonData);
    } catch (error) {
        console.error('Gagal memuat data:', error);
    }
}

function populateData(data) {
    projectList.innerHTML = ''; // Kosongkan list
    data.reverse(); // Balik urutan data

    data.forEach((item, index) => {
        const keywordList = item.keywords.map(keyword =>
            `<span class="bg-secondary text-black rounded-md text-xs py-1 px-2">${keyword}</span>`
        ).join(' ');

        let linksHTML = '';
        if (item.links?.demo) {
            linksHTML += `
                <a href="${item.links.demo}" target="_blank" class="group font-semibold hover:text-white transition duration-300 ease-in-out">
                    <i class="fa-solid fa-rocket"></i>
                    <span class="ms-1 group-hover:underline">Demo</span>
                </a>
            `;
        }
        if (item.links?.doc) {
            linksHTML += `
                <a href="${item.links.doc}" target="_blank" class="group font-semibold hover:text-white transition duration-300 ease-in-out">
                    <i class="fa-solid fa-file-lines"></i>
                    <span class="ms-1 group-hover:underline">Document</span>
                </a>
            `;
        }
        if (item.links?.code) {
            linksHTML += `
                <a href="${item.links.code}" target="_blank" class="group font-semibold hover:text-white transition duration-300 ease-in-out">
                    <i class="fa-solid fa-code"></i>
                    <span class="ms-1 group-hover:underline">Code</span>
                </a>
            `;
        }

        const row = document.createElement('div');
        row.innerHTML = `
            <div class="flex items-top justify-between">
                <p class="text-white font-semibold">${item.title}</p>
                <p class="ms-2">${item.year}</p>
            </div>
            <p class="mb-1.5">${item.desc}</p>
            <div class="flex flex-wrap gap-1">${keywordList}</div>
            ${linksHTML ? `<div class="links hidden w-full mt-7 gap-3 transition duration-300 ease-in-out">${linksHTML}</div>` : ''}
        `;
        row.className = "items border-b border-secondary rounded-t-lg p-3 mb-3 hover:border-white hover:bg-neutral-900 transition duration-300 ease-in-out cursor-pointer";

        row.addEventListener('click', () => {
            const allItems = projectList.querySelectorAll('.items');
            allItems.forEach(i => {
                const linkDiv = i.querySelector('.links');
                if (linkDiv) {
                    linkDiv.classList.add('hidden');
                    linkDiv.classList.remove('flex', 'flex-wrap', 'items-center');
                };
                i.classList.remove('border-white', 'bg-neutral-900');
            });

            const currentLinkDiv = row.querySelector('.links');
            if (currentLinkDiv) {
                currentLinkDiv.classList.remove('hidden')
                currentLinkDiv.classList.add('flex', 'flex-wrap', 'items-center');
            };
            row.classList.add('border-white', 'bg-neutral-900');
        });

        projectList.appendChild(row);
    });
}

loadData();