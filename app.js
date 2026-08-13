// Shared state management and utilities for R.N. Enterprises

const DEFAULT_OWNER_DATA = {
    doorPdfs: {
        laminate: "https://example.com/laminate.pdf",
        lamination: "https://example.com/lamination.pdf",
        pvc: "https://example.com/pvc.pdf",
        frp: "https://example.com/frp.pdf",
        acp: "https://example.com/acp.pdf",
        teakwood: "https://example.com/teakwood.pdf"
    },
    designs: ["Standard", "Premium Block", "Arch", "Grooved", "Modern Panel"],
    hardware: [
        { name: "Brass Hinge 4 inch", price: 150 },
        { name: "SS Hinge 5 inch", price: 200 },
        { name: "Premium Door Handle", price: 850 },
        { name: "Standard Door Kit", price: 1200 },
        { name: "Luxury Door Kit", price: 3500 }
    ]
};

// Owner Data Functions
function getOwnerData() {
    const data = localStorage.getItem('rn_owner_data');
    if (data) {
        return JSON.parse(data);
    }
    // Initialize if empty
    saveOwnerData(DEFAULT_OWNER_DATA);
    return DEFAULT_OWNER_DATA;
}

function saveOwnerData(data) {
    localStorage.setItem('rn_owner_data', JSON.stringify(data));
}

// Cart Functions
function getCart() {
    const cart = localStorage.getItem('rn_cart');
    return cart ? JSON.parse(cart) : [];
}

function addToCart(item) {
    const cart = getCart();
    cart.push(item);
    localStorage.setItem('rn_cart', JSON.stringify(cart));
    updateCartCount();
    alert("Item added to cart!");
}

function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    localStorage.setItem('rn_cart', JSON.stringify(cart));
    updateCartCount();
}

function clearCart() {
    localStorage.removeItem('rn_cart');
    updateCartCount();
}

function updateCartCount() {
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        const cart = getCart();
        cartCountEl.textContent = cart.length;
    }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});
