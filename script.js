// MENU DATA
const M = {
    hot: [
        {
            n: 'Americano', r: 420, l: null,
            img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400',
            d: 'Classic espresso shots topped with hot water for a bold finish.'
        },
        {
            n: 'Cappuccino', r: 610, l: 710,
            img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
            d: 'Velvety steamed milk foam poured over rich espresso.'
        },
        {
            n: 'Al-Arabic Special', r: null, l: 1080,
            img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
            d: 'Our signature blend with secret Arabic spices and cream.'
        }
    ],
    cold: [
        {
            n: 'Ice Arabic Latte', r: 880, l: 1080,
            img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400',
            d: 'Chilled latte infused with premium Arabic flavors.'
        }
    ]
    // Baaki categories yahan add karein (same format mein)
};

const sel = {};
let cart = [];

function buildGrid(key) {
    const g = document.getElementById('g-' + key);
    if (!g || !M[key]) return;
    g.innerHTML = ''; // Clear previous items

    M[key].forEach((item, i) => {
        const id = key + i;
        const def = item.r ? 'r' : 'l';
        sel[id] = def;
        const defPrice = def === 'r' ? item.r : item.l;

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item.img || 'https://via.placeholder.com/400x300'}" class="card-img">
            <div class="card-name">${item.n}</div>
            <p class="card-desc">${item.d || 'A premium selection from Al Arabic.'}</p>
            <div class="size-row">
                <div class="sz ${item.r ? '' : 'na'} ${def === 'r' ? 'on' : ''}" id="r-${id}" onclick="pick('${id}','r',${item.r},${item.l})">Regular</div>
                <div class="sz ${item.l ? '' : 'na'} ${def === 'l' ? 'on' : ''}" id="l-${id}" onclick="pick('${id}','l',${item.r},${item.l})">Large</div>
            </div>
            <div class="add-row">
                <span class="cur-price" id="p-${id}">Rs. ${defPrice}</span>
                <button class="add-btn" onclick="addItem('${id}','${item.n}',${item.r},${item.l})">+ Add</button>
            </div>
        `;
        g.appendChild(card);
    });
}

function pick(id, size, r, l) {
    if ((size === 'r' && !r) || (size === 'l' && !l)) return;
    sel[id] = size;
    document.getElementById('r-' + id).classList.toggle('on', size === 'r');
    document.getElementById('l-' + id).classList.toggle('on', size === 'l');
    document.getElementById('p-' + id).textContent = 'Rs. ' + (size === 'r' ? r : l);
}

function addItem(id, name, r, l) {
    const size = sel[id];
    const price = size === 'r' ? r : l;
    cart.push({ id: Date.now(), name, sz: size === 'r' ? 'Regular' : 'Large', price });
    updateCart();
    toast('✦ ' + name + ' Added');
}

function updateCart() {
    const total = cart.reduce((s, c) => s + c.price, 0);
    document.getElementById('s-count').textContent = cart.length;
    document.getElementById('s-total').textContent = total;
    document.getElementById('cp-total').textContent = total;
    document.getElementById('cart-strip').classList.toggle('strip-active', cart.length > 0);
}

function show(key, btn) {
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    document.getElementById('sec-' + key).style.display = 'block';
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    buildGrid(key);
}

function openCart() { document.getElementById('cart-panel').classList.add('cp-open'); }
function closeCart() { document.getElementById('cart-panel').classList.remove('cp-open'); }
function toast(m) {
    const t = document.getElementById('toast');
    t.textContent = m; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
}

window.onload = () => {
    buildGrid('hot');
    setTimeout(() => { document.getElementById('splash').style.display = 'none'; }, 2500);
};