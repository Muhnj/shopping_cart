let cart = [];

// Load cart from local storage
function loadCart() {
    let savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Save cart to local storage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id, name, price) {
    let existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    saveCart();
    updateCart();
}

function updateCart() {
    const cartContainer = document.querySelector(".cart");
    cartContainer.innerHTML = "";
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <p>${item.name} - $${item.price} x ${item.quantity}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById("total").textContent = total;
    saveCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

// Toggle Cart Visibility
function toggleCart() {
    const cartContainer = document.querySelector(".cart-container");
    cartContainer.classList.toggle("active");
}

// Show & Hide Checkout Form
function showCheckout() {
    document.querySelector(".checkout").style.display = "block";
}

function hideCheckout() {
    document.querySelector(".checkout").style.display = "none";
}

// Validate Checkout Form
function validateCheckout() {
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    
    if (name.trim() === "" || address.trim() === "") {
        alert("Please fill in all fields.");
        return false;
    }
    
    alert("Order placed successfully!");
    localStorage.removeItem("cart"); // Clear cart on order completion
    cart = [];
    updateCart();
    return true;
}

// Apply Discount Code
function applyDiscount() {
    let discountCode = document.getElementById("discount-code").value.trim().toUpperCase();
    let totalElement = document.getElementById("total");
    let total = parseFloat(totalElement.textContent);

    if (discountCode === "SAVE10") {
        total = total * 0.90; // Apply 10% discount
        alert("Discount applied! 10% off.");
    } else {
        alert("Invalid discount code.");
    }

    totalElement.textContent = total.toFixed(2);
}

// Load cart when the page loads
loadCart();
