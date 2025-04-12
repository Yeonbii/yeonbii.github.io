const contentCertificates = document.querySelector('#content-certificates');

async function loadData() {
    try {
        const response = await fetch('/src/json/certificates.json');
        jsonData = await response.json();
        populateData(jsonData);
        console.log(jsonData);
    } catch (error) {
        console.error('Gagal memuat data:', error);
    }
}

function populateData(data) {
    contentCertificates.innerHTML = ''; // Kosongkan list

    data.reverse(); // Balik urutan data

    data.forEach((item, index)  => {
        const row = document.createElement('a');
        row.innerHTML = `
                    <div class="border-b border-secondary p-3 mb-3 hover:border-white hover:text-white hover:bg-neutral-800 rounded-t-lg transition duration-300 ease-in-out">
                        <div class="flex items-center justify-between">
                            <p class="text-white font-semibold truncate">${item.title}</p>
                            <p class="ms-2">${item.year}</p>
                        </div>
                        <p>${item.by}</p>
                    </div>
                `;
        row.href = item.link; // Set link untuk setiap item
        row.target = '_blank'; // Buka link di tab baru
        contentCertificates.appendChild(row);
    });
}

loadData();