const categoryFilter = document.getElementById('categoryFilter');
const searchField = document.getElementById('searchField');
// const tbody = document.getElementById('tbody');
const bodyDataList = document.getElementById('bodyDataList');

let jsonData = []; // Menyimpan data asli agar bisa difilter ulang

// Fungsi untuk memuat data dari JSON
async function loadData() {
    try {
        const response = await fetch('../src/json/pricelist.json');
        jsonData = await response.json(); // Simpan data asli
        // jsonData.sort((a, b) => a.kategori.localeCompare(b.kategori)); // Mengurutkan berdasarkan kategori
        const categoryList = [...new Set(jsonData.map(item => item.kategori))];

        populateCategoryOptions(categoryList);
        // populateTable(jsonData);
        populateData(jsonData);
        setupFilters();

    } catch (error) {
        console.error('Gagal memuat data:', error);
    }
}

// Fungsi untuk menampilkan opsi filter kategori
function populateCategoryOptions(categoryList) {
    categoryList.forEach(category => {
        const option = document.createElement('option');
        option.textContent = category;
        option.value = category; // Set nilai opsi agar bisa digunakan saat filtering
        categoryFilter.appendChild(option);
    });
}

// Fungsi untuk mengisi tabel dengan data
// function populateTable(data) {
//     tbody.innerHTML = ''; // Kosongkan tabel

//     data.forEach((item, index)  => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//                     <td class="no">${index + 1}</td>
//                     <td>${item.barang}</td>
//                     <td>${item.kategori}</td>
//                     <td>${formatCurrency(item.harga)}</td>
//                 `;
//         tbody.appendChild(row);
//     });
// }

// Fungsi untuk mengisi list dengan data
function populateData(data) {
    bodyDataList.innerHTML = ''; // Kosongkan list

    data.forEach((item, index)  => {
        const row = document.createElement('div');
        row.innerHTML = `
                    <div class="data flex justify-content-between">
                        <div class="bold">${item.barang}</div>
                        <div>${formatCurrency(item.harga)}</div>
                    </div>
                `;
        bodyDataList.appendChild(row);
    });
}

// Fungsi untuk mengubah integer harga menjadi format mata uang
function formatCurrency(harga) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,   // Mengatur angka di belakang koma menjadi 0
        maximumFractionDigits: 0    // Mengatur angka di belakang koma menjadi 0
    }).format(harga);
}

// Fungsi untuk setup pencarian dan filter kategori
function setupFilters() {
    searchField.addEventListener('input', filterData);
    categoryFilter.addEventListener('change', filterData);
}

// Fungsi untuk memfilter data berdasarkan kategori dan pencarian
function filterData() {
    const searchText = searchField.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredData = jsonData.filter(item => {
        const matchesSearch = item.barang.toLowerCase().includes(searchText) ||
            item.kategori.toLowerCase().includes(searchText) ||
            item.harga.toString().includes(searchText);

        const matchesCategory = selectedCategory === "0" || item.kategori === selectedCategory;

        // console.log('Hasil Logika', matchesSearch, matchesCategory);
        return matchesSearch && matchesCategory;
    });

    // console.log('Filter Data', filteredData);
    populateData(filteredData);
}

// Jalankan saat halaman dimuat
loadData();