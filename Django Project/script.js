// Static credentials
const STATIC_USERNAME = "group8";
const STATIC_PASSWORD = "sanapasado";

// Attach event listener to the form
document.getElementById("loginForm")?.addEventListener("submit", validateLogin);

function validateLogin(event) {
    event.preventDefault(); // Prevent the form from submitting and reloading the page

    // Get user input
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validate credentials
    if (username === STATIC_USERNAME && password === STATIC_PASSWORD) {
        alert(`Welcome, ${username}! Login successful.`);
        // Redirect to index.html
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
}

// Function to add product to cart
function addToCart(productName, productImage, productPrice) {
    // Create a product object
    const product = {
        name: productName,
        image: productImage,
        price: productPrice,
        quantity: 1
    };

    // Check if cart exists in localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1; // If exists, increase quantity
    } else {
        cart.push(product); // Otherwise, add new product
    }

    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${product.name} added to your cart!`);
}

// Function to display cart items on the cart page
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.querySelector("#cart tbody");

    // Clear any existing rows
    cartTableBody.innerHTML = "";

    // Add each product to the table
    cart.forEach((product, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><button onclick="removeFromCart(${index})">Remove</button></td>
            <td><img src="${product.image}" alt="${product.name}" /></td>
            <td>${product.name}</td>
            <td>₱${product.price.toFixed(2)}</td>
            <td>
                <input type="number" min="1" value="${product.quantity}" onchange="updateQuantity(${index}, this.value)" />
            </td>
            <td>₱${(product.price * product.quantity).toFixed(2)}</td>
        `;

        cartTableBody.appendChild(row);
    });

    // Update subtotal
    updateCartTotal();
}

// Function to update the cart total
function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

    document.querySelector("#subTotal table td:nth-child(1)").textContent = `₱${total.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(); // Refresh the cart display
}

// Function to update the quantity of a product
function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (quantity < 1) {
        removeFromCart(index);
    } else {
        cart[index].quantity = parseInt(quantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems(); // Refresh the cart display
    }
}

// Automatically display cart items if on the cart page
if (window.location.pathname.includes("cart.html")) {
    displayCartItems();
}

document.addEventListener("DOMContentLoaded", () => {
    const checkoutBtn = document.getElementById("checkoutBtn");
    const modal = document.getElementById("checkoutModal");
    const closeModal = document.getElementById("closeModal");
    const confirmCheckout = document.getElementById("confirmCheckout");
    const cancelCheckout = document.getElementById("cancelCheckout");

    // Show the modal when Proceed to Checkout is clicked
    checkoutBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Close the modal when the 'X' is clicked
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Handle Confirm Checkout
    confirmCheckout.addEventListener("click", () => {
        alert("Thank you for your purchase! Your order has been confirmed.");
        modal.style.display = "none";

        // Clear cart data
        localStorage.removeItem("cart");
        window.location.href = "purchases.html"; // Redirect to a thank you page
    });

    // Handle Cancel Checkout
    cancelCheckout.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal if clicked outside of the content
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});


