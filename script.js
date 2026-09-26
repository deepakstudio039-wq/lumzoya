const products = [
    {
        id: 1,
        name: "Classic Black T-Shirt",
        category: "T-Shirt",
        price: 499,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 2,
        name: "Oversized White T-Shirt",
        category: "T-Shirt",
        price: 599,
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 3,
        name: "Comfort Black Lower",
        category: "Lower",
        price: 699,
        image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 4,
        name: "Premium Track Lower",
        category: "Lower",
        price: 799,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 5,
        name: "Urban Running Shoes",
        category: "Shoes",
        price: 1299,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 6,
        name: "White Street Shoes",
        category: "Shoes",
        price: 1499,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 7,
        name: "Premium Cotton T-Shirt",
        category: "T-Shirt",
        price: 649,
        image: "https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 8,
        name: "Casual Sneakers",
        category: "Shoes",
        price: 1599,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80"
    }
];


let cart = JSON.parse(localStorage.getItem("lumzoyaCart")) || [];


function displayProducts(list = products) {

    const container = document.getElementById("productContainer");

    if (list.length === 0) {
        container.innerHTML = `
            <p style="grid-column:1/-1;text-align:center;padding:50px;">
                No products found.
            </p>
        `;
        return;
    }

    container.innerHTML = list.map(product => `
        <div class="product">

            <img
                src="${product.image}"
                class="product-image"
                alt="${product.name}"
            >

            <div class="product-info">

                <div class="product-category">
                    ${product.category}
                </div>

                <div class="product-name">
                    ${product.name}
                </div>

                <div class="product-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </div>

                <button
                    class="add-btn"
                    onclick="addToCart(${product.id})"
                >
                    ADD TO CART
                </button>

            </div>
        </div>
    `).join("");
}


function addToCart(id) {

    const product = products.find(p => p.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();

    alert(product.name + " added to cart!");
}


function saveCart() {

    localStorage.setItem(
        "lumzoyaCart",
        JSON.stringify(cart)
    );

    updateCartCount();
    renderCart();
}


function updateCartCount() {

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.getElementById("cartCount").textContent = count;
}


function renderCart() {

    const container = document.getElementById("cartItems");

    if (cart.length === 0) {

        container.innerHTML = `
            <div style="text-align:center;padding:50px 10px;">
                <h3>Your cart is empty</h3>
                <p style="color:#777;margin-top:10px;">
                    Add some products to continue shopping.
                </p>
            </div>
        `;

        document.getElementById("cartTotal").textContent = "0";
        return;
    }


    container.innerHTML = cart.map(item => `

        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>₹${item.price.toLocaleString("en-IN")}</p>

                <div class="qty">

                    <button onclick="changeQty(${item.id}, -1)">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQty(${item.id}, 1)">
                        +
                    </button>

                    <button
                        class="remove"
                        onclick="removeFromCart(${item.id})"
                    >
                        Remove
                    </button>

                </div>

            </div>

        </div>

    `).join("");


    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    document.getElementById("cartTotal").textContent =
        total.toLocaleString("en-IN");
}


function changeQty(id, change) {

    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    saveCart();
}


function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();
}


function openCart() {

    document.getElementById("cart").classList.add("open");

    document.getElementById("cartOverlay").style.display = "block";
}


function closeCart() {

    document.getElementById("cart").classList.remove("open");

    document.getElementById("cartOverlay").style.display = "none";
}


function filterCategory(category) {

    const filtered = products.filter(
        product => product.category === category
    );

    displayProducts(filtered);

    document.getElementById("shop")
        .scrollIntoView({ behavior: "smooth" });
}


function showAllProducts() {

    displayProducts(products);

    document.getElementById("shop")
        .scrollIntoView({ behavior: "smooth" });
}


document.getElementById("searchInput")
.addEventListener("input", function () {

    const search = this.value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search)
    );

    displayProducts(filtered);
});


function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }


    let message =
        "Hello LUMZOYA, I want to place an order:%0A%0A";


    cart.forEach(item => {

        message +=
            `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}%0A`;

    });


    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );


    message +=
        `%0ATotal: ₹${total}%0A%0A`;

    message +=
        "Please confirm my order.";


    /*
      IMPORTANT:
      Neeche 919999999999 ki jagah
      apna WhatsApp number country code ke saath daalna.
      Example India: 919876543210
    */

    const whatsappNumber = "919999999999";

    window.open(
        `https://wa.me/${whatsappNumber}?text=${message}`,
        "_blank"
    );
}


displayProducts();
updateCartCount();
renderCart();