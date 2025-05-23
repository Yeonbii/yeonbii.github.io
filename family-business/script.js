const categoryFilter = document.querySelector('#categoryFilter');
const searchField = document.querySelector('#searchField');
const productList = document.querySelector('#product-list');

let jsonData = [];

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

    data.forEach((item, index) => {
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
        row.className = 'items border-b border-secondary rounded-t-lg p-3 mb-3 hover:border-white hover:bg-neutral-900 transition duration-300 ease-in-out cursor-pointer';
        
        row.addEventListener('click', () => {
            const allItems = productList.querySelectorAll('.items');
            allItems.forEach(i => {
                const itemDetail = i.querySelector('.item-detail');
                itemDetail.classList.add('hidden');
                i.classList.add('border-secondary');
                i.classList.remove('border-white', 'bg-neutral-900');
            });
            
            const currentItemDetail = row.querySelector('.item-detail');
            currentItemDetail.classList.remove('hidden');
            row.classList.add('border-white', 'bg-neutral-900');
            row.classList.remove('border-secondary');
        });

        productList.appendChild(row);

    })
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

function setupFilters() {
    categoryFilter.addEventListener('change', filterData);
    searchField.addEventListener('input', filterData);
}

function filterData() {
    const selectedCategory = categoryFilter.value;
    const searchText = searchField.value.toLowerCase();

    const filterData = jsonData.filter(item => {
        const matchesCategory = selectedCategory === '0' || selectedCategory === item.category;
        const matchesSearch = item.name.toLowerCase().includes(searchText) 
            || item.category.toLowerCase().includes(searchText)
            || item.price.toString().includes(searchText)
            || (item.unit_price !== null && item.unit_price.toString().includes(searchText))
            || item.description.toLowerCase().includes(searchText);
        
        return matchesCategory && matchesSearch;
    });

    populateData(filterData);
}

loadData();