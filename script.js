const video = document.getElementById("myVideo");
const muteBtn = document.getElementById("muteBtn");
const unmuteBtn = document.getElementById("unmuteBtn");

muteBtn.addEventListener("click", muteVideo);
unmuteBtn.addEventListener("click", unmuteVideo);

function muteVideo() {
    video.muted = true;
    muteBtn.style.display = "none";
    unmuteBtn.style.display = "block";
}

function unmuteVideo() {
    video.muted = false;
    muteBtn.style.display = "block";
    unmuteBtn.style.display = "none";
}

function toggleMenuSection(menuButton, menuSection) {
    menuButton.addEventListener('click', (event) => {
        event.preventDefault();
        menuSection.classList.toggle('hidden');
    });
}

function getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    let month = tomorrow.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = tomorrow.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
}

const cookiesMenuButton = document.querySelector('.cookies-menu');
const cookiesMenuSection = document.querySelector('.cookies-section');
toggleMenuSection(cookiesMenuButton, cookiesMenuSection);

const cupcakesMenuButton = document.querySelector('.cupcakes-menu');
const cupcakesMenuSection = document.querySelector('.cupcakes-section');
toggleMenuSection(cupcakesMenuButton, cupcakesMenuSection);

const chouxMenuButton = document.querySelector('.choux-menu');
const chouxMenuSection = document.querySelector('.choux-section');
toggleMenuSection(chouxMenuButton, chouxMenuSection);

const cakesMenuButton = document.querySelector('.cakes-menu');
const cakesMenuSection = document.querySelector('.cakes-section');
toggleMenuSection(cakesMenuButton, cakesMenuSection);

const jarMenuButton = document.querySelector('.jar-menu');
const jarMenuSection = document.querySelector('.jar-cake-section');
toggleMenuSection(jarMenuButton, jarMenuSection);

const muffinsMenuButton = document.querySelector('.muffins-menu');
const muffinsMenuSection = document.querySelector('.muffins-section');
toggleMenuSection(muffinsMenuButton, muffinsMenuSection);

// DOM
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".card-body");
    const cartTotalElement = document.getElementById("cart-total");
    const cartItemsList = document.getElementById("cart-items");
    const cartNotification = document.getElementById("cart-notification");
    const submitOrderBtn = document.getElementById('submitOrderBtn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const containerForm = document.querySelector('.container-form');
    const commandTextarea = document.getElementById('command');

    const cartItems = {};
    let totalSum = 0;

    let currentOpenSection = null;

    function closeCurrentSection() {
        if (currentOpenSection) {
            currentOpenSection.classList.add("hidden");
        }
    }
    
    function toggleMenuSection(menuButton, menuSection) {
        menuButton.addEventListener("click", () => {
            if (currentOpenSection !== menuSection) {
                if (currentOpenSection) {
                    currentOpenSection.classList.add("hidden");
                }
                menuSection.classList.remove("hidden");
                currentOpenSection = menuSection;
            } else {
                menuSection.classList.add("hidden");
                currentOpenSection = null;
            }
        });
    }
    
    // Apelează funcția toggleMenuSection pentru fiecare meniu și buton corespunzător
    toggleMenuSection(cookiesMenuButton, cookiesMenuSection);
    toggleMenuSection(cupcakesMenuButton, cupcakesMenuSection);
    toggleMenuSection(chouxMenuButton, chouxMenuSection);
    toggleMenuSection(cakesMenuButton, cakesMenuSection);
    toggleMenuSection(jarMenuButton, jarMenuSection);
    toggleMenuSection(muffinsMenuButton, muffinsMenuSection);
    
    // Apelează funcția closeCurrentSection când se apasă butonul de închidere a secțiunii
    const closeSectionButton = document.querySelector(".close-section-btn");
    if (closeSectionButton) {
        closeSectionButton.addEventListener("click", () => {
            closeCurrentSection();
        });
    }

    containerForm.style.display = 'none';
    submitOrderBtn.style.display = 'none';

    sections.forEach(section => {
        const quantityInputs = section.querySelectorAll(".quantity");
        const priceElements = section.querySelectorAll(".price");
        const addToCartBtn = section.querySelector(".add-to-cart-btn");

        quantityInputs.forEach((input, index) => {
            input.addEventListener("change", () => {
                const priceElement = priceElements[index];
                if (priceElement) {
                    const price = parseFloat(priceElement.getAttribute("data-price"));
                    const quantity = parseInt(input.value);
                    const totalPrice = price * quantity;
                    priceElement.textContent = totalPrice.toFixed(2) + " lei";
                }
            });
        });

        const decrementButtons = section.querySelectorAll(".decrement");
        decrementButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                const input = quantityInputs[index];
                const priceElement = priceElements[index];
                if (input && priceElement) {
                    const price = parseFloat(priceElement.getAttribute("data-price"));
                    const newQuantity = Math.max(parseInt(input.value) - 1, 1);
                    input.value = newQuantity;
                    const totalPrice = price * newQuantity;
                    priceElement.textContent = totalPrice.toFixed(2) + " lei";
                }
            });
        });

        const incrementButtons = section.querySelectorAll(".increment");
        incrementButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                const input = quantityInputs[index];
                const priceElement = priceElements[index];
                if (input && priceElement) {
                    const price = parseFloat(priceElement.getAttribute("data-price"));
                    const newQuantity = Math.max(parseInt(input.value) + 1, 1);
                    input.value = newQuantity;
                    const totalPrice = price * newQuantity;
                    priceElement.textContent = totalPrice.toFixed(2) + " lei";
                }
            });
        });

        addToCartBtn.addEventListener("click", () => {
            const productItems = section.querySelectorAll(".input-container");
            const selectedItems = [];
            const sectionTitle = section.querySelector(".card-title");
            let isInputValid = true;

            productItems.forEach(item => {
                const checkbox = item.querySelector("input[type='checkbox']");
                const quantityInput = item.querySelector(".quantity");
                const priceElement = item.querySelector(".price");

                if (checkbox && checkbox.checked && quantityInput && priceElement) {
                    const productName = checkbox.labels[0].textContent.trim();
                    const productSection = sectionTitle.textContent;
                    const productKey = productSection + ' - ' + productName;
                    const quantity = parseInt(quantityInput.value);
                    const price = parseFloat(priceElement.getAttribute("data-price"));

                    if (quantity > 0) {
                        const existingCartItem = cartItemsList.querySelector(`li[data-product="${productKey}"]`);

                        if (existingCartItem) {
                            if (sectionTitle.textContent === cartItems[productKey].sectionTitle) {
                                const quantityElement = existingCartItem.querySelector(".cart-item-quantity");
                                const priceElement = existingCartItem.querySelector(".cart-item-price");

                                const newQuantity = parseInt(quantityElement.textContent) + quantity;
                                const newTotalPrice = parseFloat(priceElement.textContent) + price * quantity;

                                quantityElement.textContent = newQuantity;
                                priceElement.textContent = newTotalPrice.toFixed(2) + " lei";

                                cartItems[productKey].quantity = newQuantity;
                                cartItems[productKey].totalPrice = newTotalPrice;
                            } else {
                                selectedItems.push({
                                    productKey: productKey,
                                    sectionTitle: sectionTitle.textContent,
                                    name: productName,
                                    quantity: quantity,
                                    totalPrice: price * quantity
                                });
                            }
                        } else {
                            selectedItems.push({
                                productKey: productKey,
                                sectionTitle: sectionTitle.textContent,
                                name: productName,
                                quantity: quantity,
                                totalPrice: price * quantity
                            });
                        }
                    } else {
                        isInputValid = false;
                    }
                }
            });

            if (selectedItems.length > 0 && isInputValid) {
                submitOrderBtn.style.display = 'block';
            } else {
                submitOrderBtn.style.display = 'none';
            }

            if (selectedItems.length > 0 && isInputValid) {
                selectedItems.forEach(item => {
                    const existingCartItem = cartItemsList.querySelector(`li[data-product="${item.productKey}"]`);
                    if (existingCartItem) {
                        const quantityElement = existingCartItem.querySelector(".cart-item-quantity");
                        const priceElement = existingCartItem.querySelector(".cart-item-price");

                        const newQuantity = parseInt(quantityElement.textContent) + item.quantity;
                        const newTotalPrice = parseFloat(priceElement.textContent) + item.totalPrice;

                        quantityElement.textContent = newQuantity;
                        priceElement.textContent = newTotalPrice.toFixed(2) + " lei";

                        cartItems[item.productKey].quantity = newQuantity;
                        cartItems[item.productKey].totalPrice = newTotalPrice;
                    } else {
                        const li = document.createElement("li");
                        li.setAttribute("data-product", item.productKey);

                        const productNameSpan = document.createElement("span");
                        productNameSpan.textContent = sectionTitle.textContent;
                        const itemNameSpan = document.createElement("span");
                        itemNameSpan.textContent = item.name;
                        const quantitySpan = document.createElement("span");
                        quantitySpan.classList.add("cart-item-quantity");
                        quantitySpan.textContent = item.quantity;
                        const priceSpan = document.createElement("span");
                        priceSpan.classList.add("cart-item-price");
                        priceSpan.textContent = item.totalPrice.toFixed(2) + " lei";

                        const deleteButton = document.createElement("button");
                        deleteButton.textContent = "X";
                        deleteButton.classList.add("delete-button");

                        li.appendChild(productNameSpan);
                        li.appendChild(document.createTextNode(" "));
                        li.appendChild(itemNameSpan);
                        li.appendChild(document.createTextNode(" x "));
                        li.appendChild(quantitySpan);
                        li.appendChild(document.createTextNode(" : "));
                        li.appendChild(priceSpan);
                        li.appendChild(deleteButton);

                        cartItemsList.appendChild(li);

                        cartItems[item.productKey] = {
                            quantity: item.quantity,
                            totalPrice: item.totalPrice
                        };
                    }

                    const quantityInputs = section.querySelectorAll(".quantity");
                    const checkboxes = section.querySelectorAll("input[type='checkbox']");
                    quantityInputs.forEach(input => {
                        input.value = 1;
                    });
                    checkboxes.forEach(checkbox => {
                        checkbox.checked = false;
                    });
                    priceElements.forEach((priceElement, index) => {
                        const initialPrice = parseFloat(priceElement.getAttribute("data-price"));
                        priceElement.textContent = initialPrice.toFixed(2) + " lei";
                    });
                    section.classList.add("hidden");
                });

                totalSum = Object.values(cartItems).reduce((sum, item) => sum + item.totalPrice, 0);
                cartTotalElement.textContent = `Total coș: ${totalSum.toFixed(2)} lei`;
                cartNotification.textContent = Object.keys(cartItems).length;

                // Success Msg/Error Msg
                const successMessage = document.createElement("p");
                successMessage.classList.add("success-message");
                
                const successText = document.createElement("span");
                successText.textContent = " Produsul a fost adăugat în coș.";
                
                const heartIconBefore = document.createElement("i");
                heartIconBefore.classList.add("fa-regular", "fa-heart", "fa-beat", "fa-2xs");
                heartIconBefore.style.color = "#ff0000";
                
                const heartIconAfter = document.createElement("i");
                heartIconAfter.classList.add("fa-regular", "fa-heart", "fa-beat", "fa-2xs");
                heartIconAfter.style.color = "#ff0000";
                
                successMessage.appendChild(heartIconBefore);
                successMessage.appendChild(successText);
                successMessage.appendChild(heartIconAfter);
                
                section.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            } else {
                const errorMessage = document.createElement("p");
                errorMessage.textContent = "Nu ai selectat niciun produs, bifeză obțiunea preferată 😀";
                errorMessage.classList.add("error-message");
                section.appendChild(errorMessage);
                setTimeout(() => {
                    errorMessage.remove();
                }, 3000);
            }

            const quantityInputs = section.querySelectorAll(".quantity");
            const checkboxes = section.querySelectorAll("input[type='checkbox']");
            quantityInputs.forEach(input => {
                input.value = 1;
            });
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            section.classList.add("hidden");
        });

        const cartDropdown = document.getElementById("cart-items");

        cartDropdown.addEventListener("click", (event) => {
            event.stopPropagation();
        });

        cartItemsList.addEventListener("click", (event) => {
            const deleteButton = event.target.closest(".delete-button");
            if (deleteButton) {
                const cartItem = deleteButton.closest("li");
                const productKey = cartItem.getAttribute("data-product");
        
                if (productKey) {
                    const product = cartItems[productKey]; // Obține produs corespunzător cheii
        
                    if (product) {
                        const productPrice = parseFloat(product.totalPrice);
                        const productQuantity = parseInt(product.quantity);
        
                        totalSum -= productPrice;
                        cartTotalElement.textContent = `Total coș: ${totalSum.toFixed(2)} lei`;
        
                        delete cartItems[productKey];
                        cartNotification.textContent = Object.keys(cartItems).length;
        
                        cartItem.remove();
        
                        if (Object.keys(cartItems).length === 0) {
                            submitOrderBtn.style.display = 'none';
                        }
                    }
                }
            }
        
            if (deleteButton) {
                if (Object.keys(cartItems).length === 0) {
                    submitOrderBtn.style.display = 'none';
                }
            }
        });

        const pickRadio = document.getElementById("pickup");
        const deliveryRadio = document.getElementById("delivery");
        const pickupLocation = document.querySelector(".pickup-location");
        const deliveryAddress = document.querySelector(".delivery-address");
    
        pickRadio.addEventListener("change", function() {
            if (pickRadio.checked) {
                pickupLocation.style.display = "block";
                deliveryAddress.style.display = "none";
            }
        });
    
        deliveryRadio.addEventListener("change", function() {
            if (deliveryRadio.checked) {
                pickupLocation.style.display = "none";
                deliveryAddress.style.display = "block";
            }
        });

        const pickupRadio = document.getElementById('pickup');
        const deliveryDetails = document.querySelector('.delivery-address');

        deliveryDetails.style.display = 'none';

        deliveryRadio.addEventListener('change', function() {
            if (this.checked) {
                if (this.value === 'delivery') {
                    deliveryDetails.style.display = 'block';
                } else {
                    deliveryDetails.style.display = 'none';
                }
            }
        });

        pickupRadio.addEventListener('change', function() {
            if (this.checked) {
                deliveryDetails.style.display = 'none';
            }
        });

        const countyDropdown = document.getElementById("county-dropdown");
        const localityDropdown = document.getElementById("locality-dropdown");
        const deliveryPriceSpan = document.getElementById("delivery-price");

        const localitiesByCounty = {
            "București": ["Alege localitatea", "Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5", "Sector 6"],
            "Ilfov": ["Alege localitatea", "Voluntari", "Otopeni", "Pantelimon", "Buftea", "Chitila"]
        };

        const deliveryPrices = {
            "Sector 1": 10.00,
            "Sector 2": 12.00,
            "Sector 3": 8.00,
            "Sector 4": 10.00,
            "Sector 5": 12.00,
            "Sector 6": 10.00,
            "Voluntari": 15.00,
            "Otopeni": 18.00,
            "Pantelimon": 12.00,
            "Buftea": 20.00,
            "Chitila": 16.00
        };
        
        countyDropdown.addEventListener("change", function() {
            const selectedCounty = countyDropdown.value;
            if (selectedCounty in localitiesByCounty) {
                localityDropdown.disabled = false;
                localityDropdown.innerHTML = "";
                localitiesByCounty[selectedCounty].forEach(locality => {
                    const option = document.createElement("option");
                    option.value = locality;
                    option.textContent = locality;
                    localityDropdown.appendChild(option);
                });
                localityDropdown.selectedIndex = 0; // Resetează selecția localității
                deliveryPriceSpan.textContent = "0.00 lei"; // Resetarea prețului
            } else {
                localityDropdown.innerHTML = "";
                localityDropdown.disabled = true;
            }
        });
        
        localityDropdown.addEventListener("change", function() {
            const selectedLocality = localityDropdown.value;
            if (selectedLocality in deliveryPrices) {
                const price = deliveryPrices[selectedLocality];
                deliveryPriceSpan.textContent = `${price.toFixed(2)} lei`;
            } else {
                deliveryPriceSpan.textContent = "0.00 lei";
            }
        });

        submitOrderBtn.addEventListener('click', () => {
            if (totalSum < 100) {
                const cartWarning = document.getElementById("cart-warning");
                cartWarning.style.display = "block";
                setTimeout(() => {
                    cartWarning.style.display = "none";
                }, 3000);
            } else {
                showModalAndTransferData();
            }
        });

        function showModalAndTransferData() {
            modalOverlay.style.display = 'block';
            containerForm.style.display = 'block';
        
            let commandText = "Lista de cumpărături:\n";
            let totalText = "";
        
            Object.keys(cartItems).forEach(itemName => {
                const product = cartItems[itemName];
                commandText += `${itemName} x ${product.quantity}; `;
            });
        
            if (deliveryRadio.checked && totalWithTransport > 0) {
                const totalWithTransportText = (totalSum + totalWithTransport).toFixed(2);
                totalText = `Total coș + transport: ${totalWithTransportText} lei`;
                commandText = commandText.replace(`Preț total: ${totalSum.toFixed(2)} lei\n`, ""); // Elimină Preț total din listă
            } else if (pickupRadio.checked) {
                totalText = `Total coș: ${totalSum.toFixed(2)} lei`;
                totalWithTransport = 0; // Resetăm valoarea transportului pentru ridicarea personală
            }
        
            commandText += `\n${totalText}`;
            commandTextarea.value = commandText;
        }
        
        pickupRadio.addEventListener('change', function() {
            if (this.checked) {
                deliveryDetails.style.display = 'none';
                totalWithTransport = 0; // Resetăm valoarea transportului pentru ridicarea personală
                showModalAndTransferData();

                countyDropdown.selectedIndex = 0;
                localityDropdown.innerHTML = "";
                localityDropdown.disabled = true;
                deliveryPriceSpan.textContent = "0.00 lei";
            }
        });
        
        localityDropdown.addEventListener("change", function() {
            const selectedLocality = localityDropdown.value;
            if (selectedLocality in deliveryPrices) {
                const price = deliveryPrices[selectedLocality];
                
                if (price > 0) {
                    totalWithTransport = price;
                } else {
                    totalWithTransport = 0;
                }
            } else {
                totalWithTransport = 0; // Resetăm valoarea transportului pentru localitățile fără preț
            }
        
            showModalAndTransferData();
        });

        const closeModalBtn = document.querySelector('.close-modal-btn');
        closeModalBtn.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
            containerForm.style.display = 'none';
        });

        const completionDateInput = document.getElementById("completion-date");
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const year = tomorrow.getFullYear();
        let month = tomorrow.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`;
        }
        let day = tomorrow.getDate();
        if (day < 10) {
            day = `0${day}`;
        }
        const minDate = `${year}-${month}-${day}`;
        completionDateInput.setAttribute("min", minDate);
    });
});