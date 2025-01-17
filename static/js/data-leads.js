(() => {

// =========================
// Input Dropdown
// ========================= 
    const products = [
        'UMKM',
        'Mikro'
    ];
    
    const applicationType = [
        "Apple",
        "Samsung",
        "Huawei",
        "Oppo",
        "Vivo"
    ]

    const kelurahan = [
        'Papanggo',
        'Kelapa Gading',
        'Pademangan',
        'Kemayoran'
    ]

    function initializeSearchDropdown(inputSelector, dropdownSelector, data){
        const input = document.querySelector(inputSelector);
        const dropdown = document.querySelector(dropdownSelector);

        input.addEventListener('input', function(){
            const query = this.value.toLowerCase();
            dropdown.innerHTML = '';

            const filteredItems = data.filter((p) => p.toLowerCase().includes(query));

            if(filteredItems.length){
                filteredItems.forEach((item) => {
                const listItem = document.createElement("li");
                listItem.textContent = item;
            
                // Add click event to select item
                listItem.addEventListener("click", function () {
                    input.value = item;
                    dropdown.classList.add("hidden");
                });
            
                dropdown.appendChild(listItem);
                });
            
                dropdown.classList.remove("hidden");
            } 
            else {
                dropdown.classList.add("hidden");
            }
            
        });

        //Show all products on input focus
        input.addEventListener("focus", function () {
            dropdown.innerHTML = ""; // Clear previous dropdown options
        
            data.forEach((product) => {
            const listItem = document.createElement("li");
            listItem.textContent = product;
        
            // Add click event to select item
            listItem.addEventListener("click", function () {
                input.value = product;
                dropdown.classList.add("hidden");
            });
        
            dropdown.appendChild(listItem);
            });
        
            dropdown.classList.remove("hidden");
        });

        //Closes dropdown when clicking outside
        document.addEventListener("click", function (event) {
            if (!dropdown.contains(event.target) && event.target !== input) {
            dropdown.classList.add("hidden");
            }
        });
    }

    initializeSearchDropdown('#produk', '#produk-dropdown', products);
    initializeSearchDropdown('#tipe-aplikasi', '#tipe-aplikasi-dropdown', applicationType);
    initializeSearchDropdown('#kelurahan', '#kelurahan-dropdown', kelurahan);
    initializeSearchDropdown('#kelurahan-d', '#kelurahan-dropdown-d', kelurahan);
    initializeSearchDropdown('#sumber-data-aplikasi', '#sumber-data-aplikasi-dropdown', products);
    initializeSearchDropdown('#referensi', '#referensi-dropdown', products);
    initializeSearchDropdown('#keterangan-aplikasi', '#keterangan-aplikasi-dropdown', products);
    initializeSearchDropdown('#pot', '#pot-dropdown', products);
    initializeSearchDropdown('#kategori', '#kategori-dropdown', products);
    initializeSearchDropdown('#merek', '#merek-dropdown', products);
    initializeSearchDropdown('#tipe', '#tipe-dropdown', products);
    initializeSearchDropdown('#model', '#model-dropdown', products);

})()