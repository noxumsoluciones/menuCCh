let cart = [];

// 1. Función para cambiar cantidades (NUEVA)
// delta puede ser +1 (sumar) o -1 (restar)
function changeQty(index, delta) {
    cart[index].qty += delta;

    // Si la cantidad llega a 0, preguntamos o eliminamos directo
    if (cart[index].qty <= 0) {
        removeFromCart(index);
    } else {
        // Solo actualizamos visualmente
        updateCartIcon();
        openCart(); // Re-renderizar el modal
    }
}

// 1. Agregar al carrito
function addToCart(id, name, price) {
    // Buscar si ya existe para sumar cantidad
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }
    updateCartIcon();
    // Feedback visual simple
    const btn = event.target.closest('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => btn.innerHTML = originalText, 1000);
}

// 2. Actualizar icono flotante
function updateCartIcon() {
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    document.getElementById('cart-count').innerText = totalQty;
    
    // Animación de rebote
    const icon = document.querySelector('.cart-float');
    icon.style.transform = "scale(1.2)";
    setTimeout(() => icon.style.transform = "scale(1)", 200);
}

// 3. Abrir Modal y Renderizar
function openCart() {
    const modal = document.getElementById('cartModal');
    const container = document.getElementById('cart-items-container');
    const totalElem = document.getElementById('cart-total-price');
    
    modal.style.display = "block";
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p style='text-align:center'>Tu carrito está vacío 😢</p>";
        totalElem.innerText = "$0";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        
        // AQUÍ ESTÁ EL CAMBIO VISUAL: Botones - y +
        container.innerHTML += `
            <div class="cart-item">
                <div style="flex:1;">
                    <strong class="cart-item-title">${item.name}</strong>
                    <div style="font-size:0.8rem; color:#888;">$${item.price.toLocaleString()} c/u</div>
                </div>

                <div style="display:flex; align-items:center; gap:15px;">
                    <div class="qty-control" style="display:flex; align-items:center; gap:5px; background:#222; padding:5px; border-radius:5px;">
                        <button onclick="changeQty(${index}, -1)" style="background:none; border:none; color:white; cursor:pointer; font-weight:bold; width:20px;">-</button>
                        <span style="font-weight:bold; color:var(--neon-orange);">${item.qty}</span>
                        <button onclick="changeQty(${index}, 1)" style="background:none; border:none; color:white; cursor:pointer; font-weight:bold; width:20px;">+</button>
                    </div>

                    <div style="min-width:70px; text-align:right;">
                        $${itemTotal.toLocaleString()}
                    </div>
                    
                    <i class="fas fa-trash" style="color:#ff003c; cursor:pointer; margin-left:10px;" onclick="removeFromCart(${index})"></i>
                </div>
            </div>
        `;
    });
    
    totalElem.innerText = "$" + total.toLocaleString();
}

// 4. Eliminar Item
function removeFromCart(index) {
    cart.splice(index, 1);
    openCart(); // Re-renderizar
    updateCartIcon();
}

function closeCart() {
    document.getElementById('cartModal').style.display = "none";
}

// 5. Enviar a WhatsApp
function sendToWhatsApp(e) {
    e.preventDefault();
    
    if (cart.length === 0) return alert("Agrega productos primero");

    const name = document.getElementById('custName').value;
    const address = document.getElementById('custAddress').value;
    const payment = document.getElementById('custPayment').value;
    const ref = document.getElementById('custRef').value;
    const phone = "573243700225"; // Número del Cerdo Chingón

    let msg = `*DOMICILIO SOLICITADO* 🛵💨\n\n`;
    msg += `*Cliente:* ${name}\n`;
    msg += `----------------------------\n`;
    
    let total = 0;
    cart.forEach(item => {
        msg += `▪ ${item.qty}x ${item.name} ($${(item.price * item.qty).toLocaleString()})\n`;
        total += item.price * item.qty;
    });

    msg += `----------------------------\n`;
    msg += `*TOTAL: $${total.toLocaleString()}*\n\n`;
    
    msg += `📍 *Dirección:* ${address}\n`;
    msg += `🏦 *Medio de Pago:* ${payment}\n`;
    msg += `🗺 *Ubicación/Ref:* ${ref}\n`;
    msg += `\nGracias por comunicarte con El Cerdo Chingon 🐷`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}

// Cerrar modal si clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target == modal) {
        closeCart();
    }
}

function addFromButton(btn) {
    // dataset lee los atributos 'data-id', 'data-name', 'data-price'
    const id = btn.dataset.id;
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price); // Aseguramos que sea número

    // Llamamos a tu función original
    addToCart(id, name, price);
}