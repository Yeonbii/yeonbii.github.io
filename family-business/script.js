const categoryFilter = document.querySelector('#categoryFilter');
const searchField = document.querySelector('#searchField');
const productList = document.querySelector('#product-list');
const pagination = document.querySelector('#pagination');
const paginationInfo = document.querySelector('#pagination-info');

let jsonData = [];

let currentPage = 1;
const itemsPerPage = 10;

async function loadData() {
    try {
        const response = await fetch('product-list.json');
        jsonData = await response.json();
        // console.log('Berhasil memuat data:', jsonData);
        
        jsonData.sort((a, b) => a.name.localeCompare(b.name)); // Mengurutkan data
        const categoryList = [...new Set(jsonData.map(item => item.category))];
        categoryList.sort((a, b) => a.localeCompare(b)); // Mengurutkan kategori

        populateCategoryOptions(categoryList);
        populateData(jsonData);
        setupFilters();
    } catch (error) {
        console.log('Gagal memuat data: ', error);
    }
}

function populateCategoryOptions(categories) {
    categories.forEach(category => {
        const option = document.createElement('option');
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function populateData(data) {
    productList.innerHTML = '';

    if (data.length === 0) {
        productList.innerHTML = `
            <div class="text-center text-white py-6">
                <p class="font-semibold">Data tidak ditemukan</p>
            </div>
        `;
        pagination.innerHTML = '';
        paginationInfo.innerHTML = '';
        return;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    paginatedData.forEach((item) => {
        const row = document.createElement('div');
        row.innerHTML = `
            <div class="flex items-top justify-between">
                <p class="text-white font-semibold pe-2">${item.name}</p>
                <p class="w-1/3 text-end md:w-1/4">${formatCurrency(item.price)}</p>
            </div>
            <div class="item-detail bg-secondary text-black mt-3 p-1.5 rounded hidden">
                <div class="flex items-top justify-between">
                    <p class="font-bold pe-2">Kategori</p>
                    <p>${item.category}</p>
                </div>
                <div class="flex items-top justify-between">
                    <p class="font-bold pe-2">Harga</p>
                    <p>${formatCurrency(item.price)}</p>
                </div>
                <div class="flex items-top justify-between">
                    <p class="font-bold pe-2">Harga Satuan</p>
                    <p>${formatCurrency(item.unit_price)}</p>
                </div>
                <div class="flex flex-wrap items-top justify-between">
                    <p class="font-bold pe-2">Keterangan</p>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
        row.className = 'items border-b border-secondary rounded-t-lg p-3 mb-3 hover:border-white hover:bg-neutral-800 transition duration-300 ease-in-out cursor-pointer';

        row.addEventListener('click', () => {
            const allItems = productList.querySelectorAll('.items');
            allItems.forEach(i => {
                const itemDetail = i.querySelector('.item-detail');
                itemDetail.classList.add('hidden');
                i.classList.add('border-secondary');
                i.classList.remove('border-white', 'bg-neutral-800');
            });

            const currentItemDetail = row.querySelector('.item-detail');
            currentItemDetail.classList.remove('hidden');
            row.classList.add('border-white', 'bg-neutral-800');
            row.classList.remove('border-secondary');
        });

        productList.appendChild(row);
    });

    renderPagination(data.length);
    updatePaginationInfo(startIndex, endIndex, data.length);
}


// Fungsi untuk mengubah integer harga menjadi format mata uang
function formatCurrency(price) {
    if (price !== null && price !== undefined) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,   // Mengatur angka di belakang koma menjadi 0
            maximumFractionDigits: 0    // Mengatur angka di belakang koma menjadi 0
        }).format(price);
    } else {
        return '-';
    }
}

function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    pagination.innerHTML = '';

    // First Page
    const firstBtn = document.createElement('button');
    firstBtn.innerHTML = `
        <i class="fa-solid fa-angles-left"></i>
    `;
    firstBtn.className = `px-3 py-1 rounded transition duration-300 ease-in-out cursor-pointer ${currentPage <= 2 ? 'opacity-0' : 'text-white hover:bg-neutral-800'}`;
    firstBtn.disabled = currentPage === 1;
    firstBtn.addEventListener('click', () => {
        currentPage = 1;
        filterData();
    });
    pagination.appendChild(firstBtn);

    // Prev Page
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = `
        <i class="fa-solid fa-angle-left"></i>
    `;
    prevBtn.className = `px-3 py-1 rounded mx-1 transition duration-300 ease-in-out cursor-pointer ${currentPage === 1 ? 'opacity-0' : 'text-white hover:bg-neutral-800'}`;
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        currentPage--;
        filterData();
    });
    pagination.appendChild(prevBtn);

    // Current Page
    const currentBtn = document.createElement('button');
    currentBtn.textContent = currentPage;
    currentBtn.className = 'px-3 py-1 rounded bg-white text-black font-bold';
    currentBtn.disabled = true;
    pagination.appendChild(currentBtn);

    // Next Page
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = `
        <i class="fa-solid fa-angle-right"></i>
    `;
    nextBtn.className = `px-3 py-1 rounded mx-1 transition duration-300 ease-in-out cursor-pointer ${currentPage === totalPages ? 'opacity-0' : 'text-white hover:bg-neutral-800'}`;
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        currentPage++;
        filterData();
    });
    pagination.appendChild(nextBtn);

    // Last Page
    const lastBtn = document.createElement('button');
    lastBtn.innerHTML = `
        <i class="fa-solid fa-angles-right"></i>
    `;
    lastBtn.className = `px-3 py-1 rounded transition duration-300 ease-in-out cursor-pointer ${currentPage >= (totalPages - 1) ? 'opacity-0' : 'text-white hover:bg-neutral-800'}`;
    lastBtn.disabled = currentPage === totalPages;
    lastBtn.addEventListener('click', () => {
        currentPage = totalPages;
        filterData();
    });
    pagination.appendChild(lastBtn);
}

function updatePaginationInfo(startIndex, endIndex, totalItems) {
    const firstItem = totalItems === 0 ? 0 : startIndex + 1;
    const lastItem = Math.min(endIndex, totalItems);

    paginationInfo.innerHTML = `
        <p>Menampilkan nomor ${firstItem} ${firstItem === lastItem ? '' : `- ${lastItem}`} dari ${totalItems} data barang</p>
    `;
}

function setupFilters() {
    categoryFilter.addEventListener('change', () => filterData(true)); // resetPage = true, kembali ke halaman pertama
    searchField.addEventListener('input', () => filterData(true)); // resetPage = true, kembali ke halaman pertama
}

function filterData(resetPage = false) {
    if (resetPage) currentPage = 1;

    const selectedCategory = categoryFilter.value;
    const searchText = searchField.value.toLowerCase();

    const filtered = jsonData.filter(item => {
        const matchesCategory = selectedCategory === '0' || selectedCategory === item.category;
        const matchesSearch = item.name.toLowerCase().includes(searchText) 
            || item.category.toLowerCase().includes(searchText)
            || item.price.toString().includes(searchText)
            || (item.unit_price !== null && item.unit_price.toString().includes(searchText))
            || item.description.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    populateData(filtered);
}

loadData();