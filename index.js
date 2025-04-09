import { menuArray } from "./data.js"; 
let orderArray = [];

function renderMenu() {
    let menuHTML = "";
    menuArray.forEach(item => {
        menuHTML += `
            <div class="menu-item">
                <h1>${item.emoji}</h1>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>${item.ingredients.join(", ")}</p>
                    <h3>Price: $${item.price}</h3>
                </div>
                <button class="order-button" data-id="${item.id}">+</button>
            </div>
        `;
    })
    document.getElementById("menu").innerHTML = menuHTML;
}

function completeOrder(itemId) {
    const selectedItem = menuArray.find(item => item.id === itemId);
    if (selectedItem) {
        orderArray.push(selectedItem);
    }
}

function removeOrder(itemId) {
    const itemIndex = orderArray.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        orderArray.splice(itemIndex, 1);
    }
}

function renderOrder() {
    const orderHTML = `
        <div class="order-section">
            <h2>Your Order</h2>
            ${orderArray.map(item => `
                <div class="order-item">
                    <span>${item.name}</span>
                    <button class="remove-button" data-id="${item.id}">remove</button>
                    <span>${item.price}</span>
                </div> 
            `).join('')}
            <div class="order-total">
                <h3>Total: ${orderArray.reduce((total, item) => total + item.price, 0)}</h3>
            </div>
            ${orderArray.length > 0 ? `
                <button class="complete-order-btn">Complete Order</button>
            ` : ''
            }
        </div>
    `;
    document.getElementById('order-section').innerHTML = orderHTML;
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('order-button')) {
        const itemId = parseInt(e.target.dataset.id);
        completeOrder(itemId);
        renderOrder();
    } 
    else if (e.target.classList.contains('remove-button')) {
        const itemId = parseInt(e.target.dataset.id);
        removeOrder(itemId);
        renderOrder();
    } 
    else if (e.target.classList.contains('complete-order-btn')) {
        paymentSection();
    }
});

function paymentSection() {
    let paymentSectionHTML = `
    <div class="payment-modal"
        <div class="payment-section">
            <h2>Enter Card Details</h2>
            <form id="payment-form">
                <input type="text" id="name" placeholder="Enter your name" required />
                <input type="text" id="card-number" placeholder="Enter Card Number" required />
                <input type="text" id="cvv" placeholder="Enter CVV" required />
                <button type="submit" id="payment-btn">Pay</button>
            </form>
        </div>
    `;
    document.getElementById('payment-modal-container').innerHTML = paymentSectionHTML;
}
renderMenu();
