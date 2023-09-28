function toggleMenuSection(menuButton, menuSection) {
    menuButton.addEventListener("click", (event) => {
      event.preventDefault();
      menuSection.classList.toggle("hidden");
    });
  }
  
  const cookiesMenuButton = document.querySelector(".cookies-menu");
  const cookiesMenuSection = document.querySelector(".cookies-section");
  toggleMenuSection(cookiesMenuButton, cookiesMenuSection);
  
  const cupcakesMenuButton = document.querySelector(".cupcakes-menu");
  const cupcakesMenuSection = document.querySelector(".cupcakes-section");
  toggleMenuSection(cupcakesMenuButton, cupcakesMenuSection);
  
  const chouxMenuButton = document.querySelector(".choux-menu");
  const chouxMenuSection = document.querySelector(".choux-section");
  toggleMenuSection(chouxMenuButton, chouxMenuSection);
  
  const cakesMenuButton = document.querySelector(".cakes-menu");
  const cakesMenuSection = document.querySelector(".cakes-section");
  toggleMenuSection(cakesMenuButton, cakesMenuSection);
  
  const jarMenuButton = document.querySelector(".jar-menu");
  const jarMenuSection = document.querySelector(".jar-cake-section");
  toggleMenuSection(jarMenuButton, jarMenuSection);
  
  const muffinsMenuButton = document.querySelector(".muffins-menu");
  const muffinsMenuSection = document.querySelector(".muffins-section");
  toggleMenuSection(muffinsMenuButton, muffinsMenuSection);
  
  // DOM
  document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".my-card");
    const cartTotalElement = document.getElementById("cart-total");
    const cartItemsList = document.getElementById("cart-items");
    const cartNotification = document.getElementById("cart-notification");
    const submitOrderBtn = document.getElementById("submitOrderBtn");
    const modalOverlay = document.querySelector(".modal-overlay");
    const containerForm = document.querySelector(".container-form");
    const commandTextarea = document.getElementById("command");
    const cartItems = {};
    let totalSum = 0;
    let currentOpenSection = null;
  
  // Audio
  const audio = document.getElementById("mySong");
  const playBtn = document.getElementById("playBtn");
  const stopBtn = document.getElementById("stopBtn");
  const playText = document.getElementById("play-text");
  const stopText = document.getElementById("stop-text");
  
  // Funcție pentru a gestiona redarea audio
  function toggleAudio() {
    if (audio.paused) {
      audio.play(); // Porniți audio
      playBtn.style.display = "none";
      playText.style.display = "none";
      stopBtn.style.display = "inline-block";
      stopText.style.display = "inline-block";
    } else {
      audio.pause(); // Opreșteți audio
      playBtn.style.display = "inline-block";
      playText.style.display = "inline-block";
      stopBtn.style.display = "none";
      stopText.style.display = "none";
    }
  }
  
  // Butonul de oprire și redare pentru ecrane tactile
  playBtn.addEventListener("click", toggleAudio);
  stopBtn.addEventListener("click", toggleAudio);
  playText.addEventListener("click", toggleAudio);
  
  // Evenimentul "ended" al audio
  audio.addEventListener("ended", function () {
    // Loop song
    audio.currentTime = 0;
    audio.play();
  });
  
  // Eveniment pentru dispozitivele tactile
  playBtn.addEventListener("touchstart", toggleAudio);
  stopBtn.addEventListener("touchstart", toggleAudio);
  playText.addEventListener("touchstart", toggleAudio);
  
  playBtn.style.display = "none";
  playText.style.display = "none";

  
    // Inchiderea secțiunii curente și resetarea checkboxurilor
    function closeCurrentSection() {
      if (currentOpenSection) {
        currentOpenSection.classList.add("hidden");
  
        // Resetarea checkbox-urilor din secțiunea curentă
        const checkboxes = currentOpenSection.querySelectorAll(
          'input[type="checkbox"]'
        );
        checkboxes.forEach((checkbox) => {
          checkbox.checked = false;
          checkbox.disabled = false;
        });
  
        // Obținerea tuturor input-urilor "number" din secțiunea curentă
        const inputNumbers = currentOpenSection.querySelectorAll(
          'input[type="number"]'
        );
  
        // Verificăm dacă am găsit input-uri "number" în secțiunea curentă
        if (inputNumbers.length > 0) {
          // Iterăm prin toate input-urile "number" și le resetăm la valorile inițiale
          inputNumbers.forEach((inputNumber) => {
            inputNumber.value = inputNumber.defaultValue;
          });
        }
  
        // Ascunderea div-ului "cake-section" dacă sunteți în secțiunea "Cakes"
        if (currentOpenSection.classList.contains("cakes-section")) {
          const cakeSection = document.querySelector(".cake-info-section");
          cakeSection.setAttribute("hidden", "true");
        }
      }
    }
  
    // Funcție pentru afișarea sau ascunderea unei secțiuni la apăsarea unui buton
    function toggleMenuSection(menuButton, menuSection) {
      menuButton.addEventListener("click", () => {
        if (currentOpenSection !== menuSection) {
          closeCurrentSection();
          menuSection.classList.remove("hidden");
          currentOpenSection = menuSection;
        } else {
          menuSection.classList.add("hidden");
          currentOpenSection = null;
        }
      });
    }
    // Definirea meniurilor și butoanelor corespunzătoare
    const menus = [
      { button: cookiesMenuButton, section: cookiesMenuSection },
      { button: cupcakesMenuButton, section: cupcakesMenuSection },
      { button: chouxMenuButton, section: chouxMenuSection },
      { button: cakesMenuButton, section: cakesMenuSection },
      { button: jarMenuButton, section: jarMenuSection },
      { button: muffinsMenuButton, section: muffinsMenuSection },
    ];
  
    // Adăugarea evenimentelor de afișare/ascundere pentru fiecare meniu și secțiune
    menus.forEach((menu) => {
      toggleMenuSection(menu.button, menu.section);
    });
  
    const maxSelection = 2; // Definește numărul maxim de selecții posibile
  
    // Funcție pentru gestionarea selecției a două ingrediente
    function handleIngredientSelection(sectionSelector, cakeSectionSelector) {
      const section = document.querySelector(sectionSelector);
      const cakeSection = document.querySelector(cakeSectionSelector);
  
      if (!section || !cakeSection) {
        console.error("Could not find one or both of the specified sections.");
        return;
      }
  
      const checkboxes = section.querySelectorAll("input[type='checkbox']");
  
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          const selectedCheckboxes = Array.from(checkboxes).filter(
            (cb) => cb.checked
          );
  
          if (selectedCheckboxes.length > maxSelection) {
            checkbox.checked = false;
          }
  
          checkboxes.forEach((cb) => {
            if (!cb.checked) {
              cb.disabled = selectedCheckboxes.length >= maxSelection;
            }
          });
  
          // Verificăm dacă s-au selectat cele două checkbox-uri
          if (selectedCheckboxes.length === maxSelection) {
            cakeSection.removeAttribute("hidden"); // Afișăm div-ul "cake-section"
          } else {
            cakeSection.setAttribute("hidden", "true"); // Ascundem div-ul "cake-section"
          }
        });
      });
    }
  
    // Call the function for the cake section
    handleIngredientSelection(".cakes-section", ".cake-info-section");
  
    // Obțineți elementele HTML pe care doriți să le utilizați
    const cakeQuantityInput = document.querySelector(".cake-quantity");
    const cakeText = document.querySelector(".cake-text");
    const cakeTitle = document.getElementById("cakes-title");
    const cakePrice = 95; // Prețul inițial pentru un tort
    let inputValue = parseInt(cakeQuantityInput.value);
    let selectedItems = [];
  
    // Adăugați eveniment pentru modificarea inputului
    cakeQuantityInput.addEventListener("input", function () {
      inputValue = parseInt(cakeQuantityInput.value);
      updateCakeText();
    });
  
    function incrementDecrementCake() {
      const incrementButton = document.querySelector(".increment-button");
      const decrementButton = document.querySelector(".decrement-button");
  
      // Adăugați eveniment pentru butonul "Increment"
      incrementButton.addEventListener("click", function () {
        inputValue = Math.min(inputValue + 1, 4); // Crește valoarea și limitează-o la maxim 4
        cakeQuantityInput.value = inputValue;
        updateCakeText();
      });
  
      // Adăugați eveniment pentru butonul "Decrement"
      decrementButton.addEventListener("click", function () {
        inputValue = Math.max(inputValue - 1, 2); // Scade valoarea și limitează-o la minim 2
        cakeQuantityInput.value = inputValue;
        updateCakeText();
      });
    }
    incrementDecrementCake();
  
    // Adăugați eveniment pentru oricare dintre checkbox-uri, inclusiv "Fistic"
    const checkboxes = document.querySelectorAll(".input-container input");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        updateCakeText();
      });
    });
  
    // Adăugați eveniment pentru checkbox-ul "Fistic" separat
    const fisticCheckbox = document.querySelector(".cakes-fistic-checkbox");
    fisticCheckbox.addEventListener("change", function () {
      updateCakeText();
    });
  
    let cakeTitleText = "";
    let totalPrice = 0;
  
    // Funcție pentru actualizarea textului produsului
    function updateCakeText() {
      let selectedCheckboxCount = document.querySelectorAll(
        ".input-container input:checked"
      ).length;
      let numPersons = inputValue * 5; // Calculați numărul de persoane
      cakeTitleText = cakeTitle.textContent;
      let totalPrice = calculateTotalPrice(selectedCheckboxCount, inputValue); // Prețul în funcție de numărul de checkbox-uri selectate și valoarea din input
  
      // Textul
      let text = `${cakeTitleText} ${getSelectedCheckboxLabels()} : ${inputValue} Kg pentru aprox. ${numPersons} persoane - ${totalPrice} lei`;
      cakeText.textContent = text;
  
      // Afișați sau ascundeți div-ul "cake-info-section" în funcție de selecția checkbox-urilor
      if (selectedCheckboxCount === 2) {
        document.querySelector(".cake-info-section").removeAttribute("hidden");
      } else {
        document.querySelector(".cake-info-section").setAttribute("hidden", "");
      }
    }
  
    // Funcție pentru a calcula prețul în funcție de numărul de checkbox-uri selectate și selecția "Fistic"
    function calculateTotalPrice(selectedCheckboxCount, inputValue) {
      let totalPrice = cakePrice * inputValue; // Prețul inițial
  
      // Verificați dacă checkbox-ul "Fistic" este selectat și actualizați prețul în funcție de valoarea din input
      let fisticCheckbox = document.querySelector(".cakes-fistic-checkbox");
      if (fisticCheckbox.checked) {
        totalPrice = inputValue * 115; // 115 lei pentru fiecare Kg cu "Fistic"
      }
  
      return totalPrice;
    }
  
    // Funcție pentru a obține etichetele checkbox-urilor selectate
    function getSelectedCheckboxLabels() {
      let selectedLabels = [];
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          selectedLabels.push(checkbox.nextElementSibling.textContent);
        }
      });
      return selectedLabels.join(" și ");
    }
  
    // Funcție pentru afișarea mesajelor de succes și eroare
    function displayMessage(message, isError) {
      const section = document.querySelector(".cakes-section"); // Sau înlocuiți cu selectorul corespunzător pentru secțiunea dvs.
  
      const messageElement = document.createElement("p");
  
      if (isError) {
        // Mesaj de eroare
        messageElement.textContent =
          "Nu ai selectat niciun produs, bifeză obțiunea preferată 😀";
        messageElement.classList.add("error-message");
      } else {
        // Mesaj de succes
        const successMessage = document.createElement("p");
        successMessage.classList.add("success-message");
  
        const successText = document.createElement("span");
        successText.textContent = message;
  
        const heartIconBefore = document.createElement("i");
        heartIconBefore.classList.add(
          "fa-regular",
          "fa-heart",
          "fa-beat",
          "fa-2xs"
        );
        heartIconBefore.style.color = "#ff0000";
  
        const heartIconAfter = document.createElement("i");
        heartIconAfter.classList.add(
          "fa-regular",
          "fa-heart",
          "fa-beat",
          "fa-2xs"
        );
        heartIconAfter.style.color = "#ff0000";
  
        successMessage.appendChild(heartIconBefore);
        successMessage.appendChild(successText);
        successMessage.appendChild(heartIconAfter);
  
        section.appendChild(successMessage);
  
        setTimeout(() => {
          successMessage.remove();
        }, 3000);
      }
  
      section.appendChild(messageElement);
  
      setTimeout(() => {
        messageElement.remove();
      }, 3000);
    }
  
    function createCartItem(productKey, productText, totalPrice) {
      const cartItem = document.createElement("li");
  
      // Creați elementul de detalii
      const productDetails = document.createElement("span");
      productDetails.textContent = productText;
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.classList.add("delete-button");
  
      // Adăugați un atribut data-product-key pentru a identifica produsul
      cartItem.setAttribute("data-product-key", productKey);
  
      cartItem.appendChild(productDetails);
      cartItem.appendChild(deleteButton);
  
      return cartItem;
    }
  
    const addToCartButton = document.querySelector(".add-to-cart-button");
  
    addToCartButton.addEventListener("click", () => {
      const selectedCheckboxes = document.querySelectorAll(
        ".input-container input[type='checkbox']:checked"
      );
  
      if (selectedCheckboxes.length >= 2) {
        totalPrice = calculateTotalPrice(selectedCheckboxes.length, inputValue);
        const product = `${inputValue}`;
        const productKey = `Cake - ${getSelectedCheckboxLabels()} : Kg`;
  
        // Verificați dacă elementul există deja în coș
        if (!cartItems[productKey]) {
          // Creați un element de coș pentru produsul adăugat
          const cartItem = createCartItem(
            productKey,
            cakeText.textContent,
            totalPrice
          );
  
          // Adăugați elementul în lista de produse din coș
          cartItemsList.appendChild(cartItem);
  
          // Actualizați totalul coșului
          totalSum += totalPrice; // Adăugați prețul produsului în total
          cartTotalElement.textContent = `Total coș: ${totalSum.toFixed(2)} lei`;
  
          // Actualizați notificarea coșului
          const currentItemCount = parseInt(cartNotification.textContent);
          cartNotification.textContent = currentItemCount + 1;
  
          // Setați stilul butonului "Trimite comanda" pentru a-l face vizibil
          submitOrderBtn.style.display = "block";
  
          // Adăugați elementul în obiectul coșului
          cartItems[productKey] = {
            quantity: inputValue,
            totalPrice: totalPrice,
          };
  
          // Afișați mesajul de succes
          displayMessage("Produsul a fost adăugat în coș.", false);
  
          const fisticCheckbox = document.querySelector(".cakes-fistic-checkbox");
  
          if (fisticCheckbox.checked) {
            fisticCheckbox.checked = false; // Deselectăm checkbox-ul "Fistic"
          }
  
          // Resetați checkbox-urile din secțiunea "Cakes"
          const cakeCheckboxes = document.querySelectorAll(
            ".cakes-section input[type='checkbox']"
          );
          cakeCheckboxes.forEach((checkbox) => {
            checkbox.checked = false;
            checkbox.disabled = false;
          });
  
          cakeQuantityInput.value = 2; // Aceasta linie va reseta valoarea inputului la 2
  
          // Resetați valorile din secțiunea "Cake" la valorile implicite
          cakeTitleText = "";
          inputValue = 2;
          cakeText.textContent = "Selectează ingredientele pentru tort";
  
          // Ascundeți secțiunea cake-section
          const cakeSection = document.querySelector(".cake-info-section");
          cakeSection.setAttribute("hidden", "");
        } else {
          // Dacă produsul există deja în coș, adăugați-l ca o intrare nouă cu același nume dar un nume unic
          let index = 2;
          let newProductKey = productKey;
  
          while (cartItems[newProductKey]) {
            newProductKey = `${productKey} (${index})`;
            index++;
          }
  
          // Creați un element de coș pentru produsul adăugat
          const cartItem = createCartItem(
            newProductKey,
            cakeText.textContent,
            totalPrice
          );
  
          // Adăugați elementul în lista de produse din coș
          cartItemsList.appendChild(cartItem);
  
          // Actualizați totalul coșului
          totalSum += totalPrice; // Adăugați prețul produsului în total
          cartTotalElement.textContent = `Total coș: ${totalSum.toFixed(2)} lei`;
  
          // Actualizați notificarea coșului
          const currentItemCount = parseInt(cartNotification.textContent);
          cartNotification.textContent = currentItemCount + 1;
  
          // Setați stilul butonului "Trimite comanda" pentru a-l face vizibil
          submitOrderBtn.style.display = "block";
  
          // Adăugați elementul în obiectul coșului
          cartItems[newProductKey] = {
            quantity: inputValue,
            totalPrice: totalPrice,
          };
  
          // Afișați mesajul de succes
          displayMessage("Produsul a fost adăugat în coș.", false);
  
          // Resetați checkbox-urile din secțiunea "Cakes"
          const cakeCheckboxes = document.querySelectorAll(
            ".cakes-section input[type='checkbox']"
          );
          cakeCheckboxes.forEach((checkbox) => {
            checkbox.checked = false;
            checkbox.disabled = false;
          });
  
          // Ascundeți secțiunea cake-section
          const cakeSection = document.querySelector(".cake-info-section");
          cakeSection.setAttribute("hidden", "");
        }
      } else {
        displayMessage("Nu ai selectat cele două ingrediente necesare.", true);
  
        const cakeCheckboxes = document.querySelectorAll(
          ".cakes-section input[type='checkbox']"
        );
        cakeCheckboxes.forEach((checkbox) => {
          checkbox.disabled = false;
        });
      }
    });
    // Apelează funcția closeCurrentSection când se apasă butonul de închidere a secțiunii
    const closeSectionButton = document.querySelector(".close-section-btn");
    if (closeSectionButton) {
      closeSectionButton.addEventListener("click", () => {
        closeCurrentSection();
      });
    }
  
    containerForm.style.display = "none";
    submitOrderBtn.style.display = "none";
  
    sections.forEach((section) => {
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
        const sectionTitle = section.querySelector(".card-title");
        selectedItems = [];
        let isInputValid = true;
  
        productItems.forEach((item) => {
          const checkbox = item.querySelector("input[type='checkbox']");
          const quantityInput = item.querySelector(".quantity");
          const priceElement = item.querySelector(".price");
  
          if (checkbox && checkbox.checked && quantityInput && priceElement) {
            const productName = checkbox.labels[0].textContent.trim();
            const productSection = sectionTitle.textContent;
            const productKey = productSection + " - " + productName;
            const quantity = parseInt(quantityInput.value);
            const price = parseFloat(priceElement.getAttribute("data-price"));
  
            if (quantity > 0) {
              const existingCartItem = cartItemsList.querySelector(
                `li[data-product="${productKey}"]`
              );
  
              if (existingCartItem) {
                if (
                  sectionTitle.textContent === cartItems[productKey].sectionTitle
                ) {
                  const quantityElement = existingCartItem.querySelector(
                    ".cart-item-quantity"
                  );
                  const priceElement =
                    existingCartItem.querySelector(".cart-item-price");
  
                  const newQuantity =
                    parseInt(quantityElement.textContent) + quantity;
                  const newTotalPrice =
                    parseFloat(priceElement.textContent) + price * quantity;
  
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
                    totalPrice: price * quantity,
                  });
                }
              } else {
                selectedItems.push({
                  productKey: productKey,
                  sectionTitle: sectionTitle.textContent,
                  name: productName,
                  quantity: quantity,
                  totalPrice: price * quantity,
                });
              }
            } else {
              isInputValid = false;
            }
          }
        });
  
        if (selectedItems.length > 0 && isInputValid) {
          submitOrderBtn.style.display = "block";
        } else {
          submitOrderBtn.style.display = "none";
        }
  
        if (selectedItems.length > 0 && isInputValid) {
          selectedItems.forEach((item) => {
            const existingCartItem = cartItemsList.querySelector(
              `li[data-product="${item.productKey}"]`
            );
            if (existingCartItem) {
              const quantityElement = existingCartItem.querySelector(
                ".cart-item-quantity"
              );
              const priceElement =
                existingCartItem.querySelector(".cart-item-price");
  
              const newQuantity =
                parseInt(quantityElement.textContent) + item.quantity;
              const newTotalPrice =
                parseFloat(priceElement.textContent) + item.totalPrice;
  
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
                totalPrice: item.totalPrice,
              };
            }
  
            const quantityInputs = section.querySelectorAll(".quantity");
            const checkboxes = section.querySelectorAll("input[type='checkbox']");
            quantityInputs.forEach((input) => {
              input.value = 1;
            });
            checkboxes.forEach((checkbox) => {
              checkbox.checked = false;
            });
            priceElements.forEach((priceElement, index) => {
              const initialPrice = parseFloat(
                priceElement.getAttribute("data-price")
              );
              priceElement.textContent = initialPrice.toFixed(2) + " lei";
            });
            section.classList.add("hidden");
          });
  
          totalSum = Object.values(cartItems).reduce(
            (sum, item) => sum + item.totalPrice,
            0
          );
          cartTotalElement.textContent = `Total coș: ${totalSum.toFixed(2)} lei`;
          cartNotification.textContent = Object.keys(cartItems).length;
  
          // Success Msg/Error Msg
          const successMessage = document.createElement("p");
          successMessage.classList.add("success-message");
  
          const successText = document.createElement("span");
          successText.textContent = " Produsul a fost adăugat în coș.";
  
          const heartIconBefore = document.createElement("i");
          heartIconBefore.classList.add(
            "fa-regular",
            "fa-heart",
            "fa-beat",
            "fa-2xs"
          );
          heartIconBefore.style.color = "#ff0000";
  
          const heartIconAfter = document.createElement("i");
          heartIconAfter.classList.add(
            "fa-regular",
            "fa-heart",
            "fa-beat",
            "fa-2xs"
          );
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
          errorMessage.textContent =
            "Nu ai selectat niciun produs, bifeză obțiunea preferată 😀";
          errorMessage.classList.add("error-message");
          section.appendChild(errorMessage);
          setTimeout(() => {
            errorMessage.remove();
          }, 3000);
        }
  
        const quantityInputs = section.querySelectorAll(".quantity");
        const checkboxes = section.querySelectorAll("input[type='checkbox']");
        quantityInputs.forEach((input) => {
          input.value = 1;
        });
        checkboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });
        section.classList.add("hidden");
      });
  
      const cartDropdown = document.getElementById("cart-items");
  
      cartDropdown.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    });
  
    cartItemsList.addEventListener("click", (event) => {
      const deleteButton = event.target.closest(".delete-button");
      if (deleteButton) {
        const cartItem = deleteButton.closest("li");
  
        // Încercați să obțineți mai întâi productKey din atributul "data-product-key"
        const productKey = cartItem.getAttribute("data-product-key");
  
        // Declarați productKeyFromDataProduct înainte de utilizare
        let productKeyFromDataProduct;
  
        // Dacă nu ați obținut un productKey din "data-product-key", încercați să obțineți din "data-product"
        if (!productKey) {
          productKeyFromDataProduct = cartItem.getAttribute("data-product");
        }
  
        if (productKey || productKeyFromDataProduct) {
          // Verificați dacă există un productKey valid înainte de a accesa cartItems
          const validProductKey = productKey || productKeyFromDataProduct;
          if (cartItems[validProductKey]) {
            // Obțineți prețul produsului pe care îl ștergeți
            const productPrice = cartItems[validProductKey].totalPrice;
  
            // Eliminați elementul corespunzător din coș
            cartItem.remove();
  
            // Eliminați elementul din obiectul coșului
            delete cartItems[validProductKey];
  
            // Actualizați totalul coșului
            totalSum -= productPrice;
            cartTotalElement.textContent = `Total coș: ${totalSum.toFixed(
              2
            )} lei`;
  
            delete cartItems[productKey];
            cartNotification.textContent = Object.keys(cartItems).length;
  
            if (Object.keys(cartItems).length === 0) {
              submitOrderBtn.style.display = "none";
            }
          }
        }
      }
  
      if (deleteButton) {
        if (Object.keys(cartItems).length === 0) {
          submitOrderBtn.style.display = "none";
        }
      }
    });
  
    // Funcție pentru a popula dropdown-urile cu arome
    function populateAromaDropdowns() {
      const arome = {
        caramel: "Caramel",
        "caramel-sarat": "Caramel sărat",
        cafea: "Cafea",
        ciocolata: "Ciocolată",
        "ciocolata-alba": "Ciocolată albă",
        nutella: "Nutella",
        fistic: "Fistic",
        praline: "Praline",
        fructe: "Fructe",
        cocos: "Cocos",
        lamaie: "Lămâie",
      };
  
      const jarCakeDropdowns = document.querySelectorAll(
        ".jar-cake-section .aroma-dropdown"
      );
  
      const isDropdownPopulated = Array.from(jarCakeDropdowns).map(
        (dropdown) => dropdown.childElementCount > 1
      );
  
      if (!isDropdownPopulated.includes(false)) {
        return;
      }
  
      const defaultOption = document.createElement("option");
      defaultOption.value = "a-2-a-aroma";
      defaultOption.textContent = "+aromă";
  
      jarCakeDropdowns.forEach((dropdown) => {
        dropdown.appendChild(defaultOption.cloneNode(true));
      });
  
      const firstDropdown = jarCakeDropdowns[0];
      const aromeUnice = new Set();
  
      for (const aromaKey in arome) {
        const option = document.createElement("option");
        option.value = aromaKey;
        option.textContent = arome[aromaKey];
        firstDropdown.appendChild(option);
        aromeUnice.add(aromaKey);
      }
  
      for (let i = 1; i < jarCakeDropdowns.length; i++) {
        const currentDropdown = jarCakeDropdowns[i];
        aromeUnice.forEach((aromaKey) => {
          const option = document.createElement("option");
          option.value = aromaKey;
          option.textContent = arome[aromaKey];
          currentDropdown.appendChild(option);
        });
      }
    }
  
    // Apelarea funcției pentru a popula dropdown-urile cu arome
    populateAromaDropdowns();
  
    // Obținerea secțiunii "Jar cake"
    const jarCakeSection = document.querySelector(".jar-cake-section");
    const jarCakeAddToCartBtn = jarCakeSection.querySelector(
      ".jar-cake-add-to-cart-btn"
    );
    const jarCakeInputs = jarCakeSection.querySelectorAll(".input-container");
  
    // Adăugarea unui event listener pentru butonul "Adaugă în coș"
    jarCakeAddToCartBtn.addEventListener("click", () => {
      const selectedJarCakes = [];
  
      const existingSuccessMessage =
        jarCakeSection.querySelector(".success-message");
      if (existingSuccessMessage) {
        return; // Ieșiți din funcție dacă există deja un mesaj de succes
      }
  
      const existingErrorMessage = jarCakeSection.querySelector(".error-message");
      if (existingErrorMessage) {
        return;
      }
  
      jarCakeInputs.forEach((input) => {
        const checkbox = input.querySelector("input[type='checkbox']");
        const quantityInput = input.querySelector(".quantity");
        const priceElement = input.querySelector(".price");
        const selectedAroma = input.querySelector(".aroma-dropdown").value;
  
        if (checkbox.checked && quantityInput.value > 0) {
          const productName = checkbox.labels[0].textContent.trim();
          const quantity = parseInt(quantityInput.value);
          const price = parseFloat(priceElement.getAttribute("data-price"));
  
          // Restabilirea valorilor implicite
          checkbox.checked = false;
          quantityInput.value = 1;
          priceElement.textContent = (price * 1).toFixed(2) + " lei";
          input.querySelector(".aroma-dropdown").value = "a-2-a-aroma";
  
          const selectedJarCake = {
            productName: productName,
            quantity: quantity,
            price: price,
          };
  
          if (selectedAroma !== "a-2-a-aroma") {
            selectedJarCake.aroma = selectedAroma;
          }
  
          selectedJarCakes.push(selectedJarCake);
        }
      });
  
      if (selectedJarCakes.length === 0) {
        const errorMessage = document.createElement("p");
        errorMessage.textContent =
          "Nu ai selectat niciun produs, bifeză obțiunea preferată 😀";
        errorMessage.classList.add("error-message");
        jarCakeSection.appendChild(errorMessage);
  
        setTimeout(() => {
          errorMessage.remove();
        }, 3000);
      } else {
        selectedJarCakes.forEach((selectedJarCake) => {
          const productName = selectedJarCake.productName;
          const aroma = selectedJarCake.aroma || "";
          const quantity = selectedJarCake.quantity;
          const price = selectedJarCake.price;
  
          // Definiți productKey în funcție de numele produsului și aromă (dacă există)
          const productKey = `Jar cake cu ${productName} - ${aroma}`;
  
          const existingCartItem = cartItemsList.querySelector(
            `li[data-product="${productKey}"]`
          );
  
          if (existingCartItem) {
            const quantityElement = existingCartItem.querySelector(
              ".cart-item-quantity"
            );
            const priceElement =
              existingCartItem.querySelector(".cart-item-price");
  
            const newQuantity = parseInt(quantityElement.textContent) + quantity;
            const newTotalPrice =
              parseFloat(priceElement.textContent) + price * quantity;
  
            quantityElement.textContent = newQuantity;
            priceElement.textContent = newTotalPrice.toFixed(2) + " lei";
  
            cartItems[productKey].quantity = newQuantity;
            cartItems[productKey].totalPrice = newTotalPrice;
          } else {
            const li = document.createElement("li");
            li.setAttribute("data-product", productKey);
  
            const productNameSpan = document.createElement("span");
            productNameSpan.textContent = "Jar cake";
            const itemNameSpan = document.createElement("span");
            itemNameSpan.textContent =
              productName + (aroma !== "" ? ` - ${aroma}` : "");
            const quantitySpan = document.createElement("span");
            quantitySpan.classList.add("cart-item-quantity");
            quantitySpan.textContent = quantity;
            const priceSpan = document.createElement("span");
            priceSpan.classList.add("cart-item-price");
            priceSpan.textContent = (price * quantity).toFixed(2) + " lei";
  
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
  
            cartItems[productKey] = {
              quantity: quantity,
              totalPrice: price * quantity,
            };
  
            submitOrderBtn.style.display = "block";
          }
        });
  
        totalSum = Object.values(cartItems).reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );
        cartTotalElement.textContent = `Total coș: ${totalSum.toFixed(2)} lei`;
        cartNotification.textContent = Object.keys(cartItems).length;
  
        const successMessage = document.createElement("p");
        successMessage.classList.add("success-message");
  
        const successText = document.createElement("span");
        successText.textContent = " Produsul a fost adăugat în coș.";
  
        const heartIconBefore = document.createElement("i");
        heartIconBefore.classList.add(
          "fa-regular",
          "fa-heart",
          "fa-beat",
          "fa-2xs"
        );
        heartIconBefore.style.color = "#ff0000";
  
        const heartIconAfter = document.createElement("i");
        heartIconAfter.classList.add(
          "fa-regular",
          "fa-heart",
          "fa-beat",
          "fa-2xs"
        );
        heartIconAfter.style.color = "#ff0000";
  
        successMessage.appendChild(heartIconBefore);
        successMessage.appendChild(successText);
        successMessage.appendChild(heartIconAfter);
  
        jarCakeSection.appendChild(successMessage);
  
        setTimeout(() => {
          successMessage.remove();
        }, 3000);
      }
    });
  
    function setupJarCakeQuantityButtons(inputContainer, initialValue) {
      const jarCakeQuantityInput = inputContainer.querySelector(".quantity");
      const jarIncrementButton = inputContainer.querySelector(".increment");
      const jarDecrementButton = inputContainer.querySelector(".decrement");
      const jarPriceElement = inputContainer.querySelector(".price");
  
      function jarUpdateCakeText() {
        const totalPrice =
          parseFloat(jarPriceElement.getAttribute("data-price")) *
          jarCakeQuantityInput.value; // Utilizați valoarea din input, nu inițială
        jarPriceElement.textContent = totalPrice.toFixed(2) + " lei";
      }
  
      jarIncrementButton.addEventListener("click", function () {
        jarCakeQuantityInput.value = parseInt(jarCakeQuantityInput.value) + 1; // Crește valoarea din input cu 1
        jarUpdateCakeText();
      });
  
      jarDecrementButton.addEventListener("click", function () {
        const currentValue = parseInt(jarCakeQuantityInput.value);
        if (currentValue > 1) {
          jarCakeQuantityInput.value = currentValue - 1; // Scade valoarea din input cu 1, dar menține minimul la 1
        }
        jarUpdateCakeText();
      });
  
      // Inițializează textul span-ului de preț utilizând valoarea inițială
      jarUpdateCakeText();
    }
  
    // Obțineți toate inputurile pentru "Jar Cake" și configurați butoanele pentru fiecare cu valoarea inițială corectă
    jarCakeInputs.forEach((inputContainer) => {
      const quantityInput = inputContainer.querySelector(".quantity");
      const initialQuantity = parseInt(quantityInput.value); // Obțineți valoarea inițială a fiecărui input
      setupJarCakeQuantityButtons(inputContainer, initialQuantity);
    });
  
    // Ștergere produs din coș
    cartItemsList.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-button")) {
        const li = event.target.parentElement;
        const productKey = li.getAttribute("data-product");
        const item = cartItems[productKey];
        if (item) {
          totalSum -= item.totalPrice;
          cartTotalElement.textContent = `Total coș: ${totalSum.toFixed(2)} lei`;
          cartNotification.textContent =
            parseInt(cartNotification.textContent) - 1;
          delete cartItems[productKey];
          li.remove();
          if (Object.keys(cartItems).length === 0) {
            submitOrderBtn.style.display = "none";
          }
        }
      }
    });
  
    submitOrderBtn.addEventListener("click", () => {
      if (totalSum < 100) {
        const cartWarning = document.getElementById("cart-warning");
        cartWarning.style.display = "block";
        setTimeout(() => {
          cartWarning.style.display = "none";
        }, 3000);
      } else {
        showModalAndTransferData();
  
        const navbarNavDropdown = document.getElementById("navbarNavDropdown");
        navbarNavDropdown.classList.remove("show");
      }
    });
  
    // Scroll to Top
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  
    // Adăugați un eveniment pentru a asculta scroll-ul paginii
    window.addEventListener("scroll", function () {
      // Afișați sau ascundeți butonul în funcție de poziția paginii
      if (window.scrollY > 100) {
        scrollToTopBtn.style.display = "block";
      } else {
        scrollToTopBtn.style.display = "none";
      }
    });
  
    // Adăugați un eveniment pentru butonul "Scroll to Top"
    scrollToTopBtn.addEventListener("click", function () {
      // Faceți scroll până la începutul paginii
      window.scrollTo(0, 0);
    });
  
    const deliveryRadio = document.getElementById("delivery");
    const pickupLocation = document.querySelector(".pickup-location");
    const deliveryAddress = document.querySelector(".delivery-address");
    const pickupRadio = document.getElementById("pickup");
  
    pickupRadio.addEventListener("change", function () {
      if (pickupRadio.checked) {
        deliveryAddress.style.display = "none";
        totalWithTransport = 0; // Resetăm valoarea transportului pentru ridicarea personală
        commandTextarea.value = "Ridicare personală";
        showModalAndTransferData();
  
        countyDropdown.selectedIndex = 0;
        localityDropdown.innerHTML = "";
        localityDropdown.disabled = true;
        deliveryPriceSpan.textContent = "0.00 lei";
      }
  
      if (pickupRadio.checked) {
        pickupLocation.style.display = "block";
        deliveryAddress.style.display = "none";
      }
    });
  
    deliveryRadio.addEventListener("change", function () {
      if (deliveryRadio.checked) {
        pickupLocation.style.display = "none";
        deliveryAddress.style.display = "block";
      }
    });
  
    const countyDropdown = document.getElementById("county-dropdown");
    const localityDropdown = document.getElementById("locality-dropdown");
    const deliveryPriceSpan = document.getElementById("delivery-price");
  
    const localitiesByCounty = {
      București: [
        "Alege localitatea",
        "Sector 1",
        "Sector 2",
        "Sector 3",
        "Sector 4",
        "Sector 5",
        "Sector 6",
      ],
      Ilfov: [
        "Alege localitatea",
        "Voluntari",
        "Otopeni",
        "Pantelimon",
        "Buftea",
        "Chitila",
      ],
    };
  
    const deliveryPrices = {
      "Sector 1": 10.0,
      "Sector 2": 12.0,
      "Sector 3": 8.0,
      "Sector 4": 10.0,
      "Sector 5": 12.0,
      "Sector 6": 10.0,
      Voluntari: 15.0,
      Otopeni: 18.0,
      Pantelimon: 12.0,
      Buftea: 20.0,
      Chitila: 16.0,
    };
  
    countyDropdown.addEventListener("change", function () {
      const selectedCounty = countyDropdown.value;
      if (selectedCounty in localitiesByCounty) {
        localityDropdown.disabled = false;
        localityDropdown.innerHTML = "";
        localitiesByCounty[selectedCounty].forEach((locality) => {
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
  
    localityDropdown.addEventListener("change", function () {
      const selectedLocality = localityDropdown.value;
      
      if (selectedLocality in deliveryPrices) {
        const price = deliveryPrices[selectedLocality];
        deliveryPriceSpan.textContent = `${price.toFixed(2)} lei`;
    
        if (price > 0) {
          totalWithTransport = price;
        } else {
          totalWithTransport = 0;
        }
      } else {
        deliveryPriceSpan.textContent = "0.00 lei";
        totalWithTransport = 0; // Resetăm valoarea transportului pentru localitati
      }
    
      showModalAndTransferData();
    });
    
  
    const closeModalBtn = document.querySelector(".close-modal-btn");
    closeModalBtn.addEventListener("click", () => {
      modalOverlay.style.display = "none";
      containerForm.style.display = "none";
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
  
    let totalWithTransport = 0;
  
    function showModalAndTransferData() {
      modalOverlay.style.display = "block";
      containerForm.style.display = "block";
  
      let commandText = "Lista de cumpărături:\n";
      let totalText = "";
  
      Object.keys(cartItems).forEach((itemName) => {
        const product = cartItems[itemName];
        commandText += `${itemName} x ${product.quantity}; `;
      });
  
      if (deliveryRadio.checked && totalWithTransport > 0) {
        const totalWithTransportText = (totalSum + totalWithTransport).toFixed(2);
        totalText = `Total coș + transport: ${totalWithTransportText} lei`;
        commandText = commandText.replace(
          `Preț total: ${totalSum.toFixed(2)} lei\n`,
          ""
        ); // Elimină Preț total din listă
      } else if (pickupRadio.checked) {
        totalText = `Total coș: ${totalSum.toFixed(2)} lei`;
        totalWithTransport = 0; // Resetăm valoarea transportului pentru ridicarea personală
      }
  
      // Adaugă data selectată în textul comenzii
      const completionDate = completionDateInput.value;
      commandText += `\nData finalizării: ${completionDate}`;
  
      // Adaugă opțiunea de livrare în textul comenzii
      if (pickupRadio.checked) {
        commandText += "\nRidicare personală";
      } else if (deliveryRadio.checked) {
        commandText += "\nLivrare la domiciliu";
  
        // Adaugă datele de adresă în textul comenzii
        const deliveryAddress = document.getElementById("delivery-address").value;
        const countyDropdown = document.getElementById("county-dropdown");
        const localityDropdown = document.getElementById("locality-dropdown");
        const selectedCounty = countyDropdown.value;
        const selectedLocality = localityDropdown.value;
  
        commandText += `\nAdresă de livrare: ${deliveryAddress}`;
        commandText += `\nJudeț: ${selectedCounty}`;
        commandText += `\nLocalitate: ${selectedLocality}`;
      }
  
      commandText += `\n${totalText}`;
      commandTextarea.value = commandText;
    }
  
    completionDateInput.addEventListener("input", function () {
      showModalAndTransferData();
    });
  
    deliveryAddress.addEventListener("input", function () {
      showModalAndTransferData();
    });
  
    countyDropdown.addEventListener("input", function () {
      showModalAndTransferData();
    });
  
    localityDropdown.addEventListener("input", function () {
      showModalAndTransferData();
    });
  
    // Obține toate elementele necesare
    const commandForm = document.forms["command-form"];
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const addressInput = document.getElementById("delivery-address");
    const nameInput = document.getElementById("full-name");
    const emailInput = document.getElementById("email-address");
    const telephoneInput = document.getElementById("telephone");
  
    // Adaugă un ascultător pentru evenimentul de submit al formularului
    commandForm.addEventListener("submit", function (event) {
      let isValid = true;
      let errorMessage = "Te rog completează ";
  
      // Verifică dacă a fost selectat unul dintre radio buttons
      let radioSelected = false;
      radioButtons.forEach((radio) => {
        if (radio.checked) {
          radioSelected = true;
        } else {
          radio.classList.add("heartbeat"); // Adaugă animația de "heartbeat" la radio buttons necompletate
        }
      });
  
      if (!radioSelected) {
        isValid = false;
        errorMessage += "una dintre opțiunile de livrare, ";
        radioButtons.forEach((radio) => {
          radio.classList.add("error-highlight"); // Sublinierea cu roșu pentru radio buttons necompletate
          radio.classList.add("heartbeat"); // Adaugarea clasei "heartbeat" pentru animație
  
          // Obține eticheta textului asociat radio button-ului
          const label = document.querySelector(`label[for="${radio.id}"]`);
  
          if (label) {
            label.classList.add("error-highlight"); // Sublinierea cu roșu pentru eticheta text
            label.classList.add("heartbeat"); // Adaugarea clasei "heartbeat" pentru animație
  
            // Eliminarea clasei "heartbeat" după 3 secunde
            setTimeout(() => {
              radio.classList.remove("heartbeat");
              label.classList.remove("heartbeat");
            }, 3000);
          }
        });
      } else {
        radioButtons.forEach((radio) => {
          radio.classList.remove("error-highlight"); // Eliminați sublinierea cu roșu dacă radio buttons sunt completate corect
  
          // Obține eticheta textului asociat radio button-ului
          const label = document.querySelector(`label[for="${radio.id}"]`);
  
          if (label) {
            label.classList.remove("error-highlight"); // Eliminați sublinierea cu roșu pentru eticheta text
          }
        });
      }
  
      // Dacă Livrare la domiciliu este selectată, verifică adresa și dropdown-urile
      if (radioButtons[1].checked) {
        if (!addressInput.value.trim()) {
          isValid = false;
          errorMessage += "adresa de livrare, ";
  
          // Obține eticheta textului pentru Adresă de livrare
          const addressLabel = document.querySelector(
            'label[for="delivery-address"]'
          );
  
          if (addressLabel) {
            addressLabel.classList.add("error-highlight"); // Sublinierea cu roșu pentru eticheta text
            addressLabel.classList.add("heartbeat"); // Adaugarea clasei "heartbeat" pentru animație
  
            // Eliminarea clasei "heartbeat" după 3 secunde
            setTimeout(() => {
              addressLabel.classList.remove("heartbeat");
            }, 3000);
          }
        }
  
        // Verifică dacă județul și localitatea au fost selectate
        if (
          !countyDropdown.value ||
          localityDropdown.value === "Alege localitatea"
        ) {
          isValid = false;
          errorMessage += "județul și localitatea, ";
  
          // Obține etichetele text pentru dropdown-urile de județ și localitate
          const countyLabel = document.querySelector(
            'label[for="county-dropdown"]'
          );
          const localityLabel = document.querySelector(
            'label[for="locality-dropdown"]'
          );
  
          if (countyLabel) {
            countyLabel.classList.add("error-highlight"); // Sublinierea cu roșu pentru eticheta județului
            countyLabel.classList.add("heartbeat"); // Adaugarea clasei "heartbeat" pentru animație
          }
  
          if (localityLabel) {
            localityLabel.classList.add("error-highlight"); // Sublinierea cu roșu pentru eticheta localității
            localityLabel.classList.add("heartbeat"); // Adaugarea clasei "heartbeat" pentru animație
          }
        }
      }
  
      // Verifică data
      if (!completionDateInput.value) {
        isValid = false;
        errorMessage += "data de finalizare, ";
  
        // Obține eticheta textului de deasupra calendarului
        const dateLabel = document.querySelector('label[for="completion-date"]');
  
        if (dateLabel) {
          dateLabel.classList.add("error-highlight"); // Sublinierea cu roșu pentru eticheta text
          dateLabel.classList.add("heartbeat"); // Adaugarea clasei "heartbeat" pentru animație
  
          // Eliminarea clasei "heartbeat" după 3 secunde
          setTimeout(() => {
            dateLabel.classList.remove("heartbeat");
          }, 3000);
        }
      }
  
      // Verifică nume, email și telefon
      if (!nameInput.value.trim()) {
        isValid = false;
        errorMessage += "numele, ";
      }
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        isValid = false;
        errorMessage += "adresa de email, ";
      }
  
      // Verifică numărul de telefon
      if (!isValidPhoneNumber(telephoneInput.value.trim())) {
        isValid = false;
        errorMessage +=
          "numărul de telefon valid, de forma (+40) 123 123 123, sau 0742563803 ";
  
        // Adaugă clasa CSS pentru a sublinia câmpul telefonului
        telephoneInput.classList.add("error-field");
      } else {
        // Elimină clasa CSS dacă numărul de telefon este completat corect
        telephoneInput.classList.remove("error-field");
      }
  
      // Afiseaza mesajul de eroare daca este necesar
      if (!isValid) {
        event.preventDefault(); // Opriți trimiterea formularului
        const alertMsg = document.querySelector(".alert-form-msg");
        alertMsg.textContent = errorMessage.slice(0, -2); // Elimină ultima virgulă și spațiu
        alertMsg.style.color = "red";
        alertMsg.style.display = "block";
  
        // Afișați mesajul de eroare timp de 3 secunde
        setTimeout(() => {
          alertMsg.style.display = "none";
        }, 3000);
      }
    });
  
    // Funcție pentru a verifica dacă adresa de email este validă
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    // Funcție pentru a verifica dacă numărul de telefon este valid
    function isValidPhoneNumber(phoneNumber) {
      // Elimină spațiile și caracterele care nu sunt cifre din numărul de telefon
      const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
  
      // Verifică dacă numărul are 10 sau 12 cifre
      return /^(\+40)?\d{9}$|^0\d{9}$/.test(cleanedPhoneNumber);
    }
  
    // Cookie
    console.clear();
    ("use strict");
  
    (function () {
      var offcanvas = document.getElementById("offcanvas");
  
      if (!sessionStorage.getItem("offcanvasShown")) {
        var bs_offcanvas = new bootstrap.Offcanvas(offcanvas);
        bs_offcanvas.show();
        sessionStorage.setItem("offcanvasShown", true);
      }
    })();
  });
  