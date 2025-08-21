const cartBtn = document.querySelector('.cart-btn');
const cartSidebar = document.getElementById('cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let cart = [];

cartBtn.addEventListener('click', () => {
  cartSidebar.classList.add('active');
});

function closeCart() {
  cartSidebar.classList.remove('active');
}

function addToCart(name, price) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCart();
  cartSidebar.classList.add('active'); // auto open
}

function updateCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <div>
        <button onclick="changeQty(${index},-1)">-</button>
        <button onclick="changeQty(${index},1)">+</button>
      </div>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartTotal.textContent = total;
}

function changeQty(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCart();
}
