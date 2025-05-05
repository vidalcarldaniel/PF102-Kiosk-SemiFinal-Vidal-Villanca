let cart = [];

function saveCartAndNavigate(url) {
  localStorage.setItem('cartData', JSON.stringify(cart));

  if (url) {
    window.location.href = url;
  } else {
    console.error("URL is not defined for navigation.");
  }
}

function goToMainCourse() {
  saveCartAndNavigate('mainCourse.html');
}

function goToSeaFood() {
  saveCartAndNavigate('seaFoods.html');
}

function goToDesserts() {
  saveCartAndNavigate('desserts.html');
}

function goToAppetizers() {
  saveCartAndNavigate('appetizers.html');
}

function goToFastFood() {
  saveCartAndNavigate('fastFood.html');
}

function goToDrinks() {
  saveCartAndNavigate('drinks.html');
}

function goBackToCategory() {
  window.history.back();
}

function proceedToOrder() {
  const savedCart = JSON.parse(localStorage.getItem('cartData')) || [];

  if (savedCart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  localStorage.setItem('orderData', JSON.stringify(savedCart));
  localStorage.removeItem('cartData');
  window.location.href = 'orderedList.html';
}

window.onload = function () {
  const savedCart = localStorage.getItem('cartData');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  } else {
    cart = [];
  }
  renderCart();
};

function addToCart(name, price, imageUrl) {
  const savedCart = JSON.parse(localStorage.getItem('cartData')) || [];
  const existing = savedCart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    savedCart.push({ name, price, image: imageUrl, quantity: 1 });
  }

  localStorage.setItem('cartData', JSON.stringify(savedCart));
  cart = savedCart;
  renderCart();
}

function removeFromCart(name) {
  const index = cart.findIndex(item => item.name === name);
  if (index !== -1) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  }
}

function renderCart() {
  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span class="remove" onclick="removeFromCart('${item.name}')">&times;</span>
      <img src="${item.image}" alt="${item.name}">
      <div class="quantity-controls">
        <button class="qty-btn" onclick="decreaseQuantity('${item.name}')">−</button>
        <span class="quantity">${item.quantity}</span>
        <button class="qty-btn" onclick="increaseQuantity('${item.name}')">+</button>
      </div>
      <div class="name">${item.name}</div>
    `;
    container.appendChild(div);
  });
  saveCart();
}

document.getElementById('toggleCart').addEventListener('click', () => {
  const cartElement = document.getElementById('cart');
  cartElement.classList.toggle('collapsed');
  const cartBody = document.getElementById('cart-items');
  cartBody.style.display = cartBody.style.display === 'none' ? 'flex' : 'none';
});

function increaseQuantity(name) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.quantity += 1;
    saveCart();
    renderCart();
  }
}
  
function decreaseQuantity(name) {
  const item = cart.find(i => i.name === name);
  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
    
      cart.splice(cart.indexOf(item), 1);
    }
    saveCart();
    renderCart();
  }
}

function saveCart() {
  localStorage.setItem('cartData', JSON.stringify(cart));
}