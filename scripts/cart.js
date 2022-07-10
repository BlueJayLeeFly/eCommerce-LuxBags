import { numOfItem, listInCartPage, totalInCart } from './elements.js';

import { getTotalInCart, reloadProducts } from './utils.js';

let itemsInCart = [];
let cartTotalCost = 0;

itemsInCart = reloadProducts();

// Cart Page

itemsInCart.map((item) => {
	// 1. Create elements
	let li = document.createElement('li');

	let deleteBtn = document.createElement('img');
	let itemImg = document.createElement('img');
	let itemName = document.createElement('div');
	let itemPrice = document.createElement('div');

	let quantityWrapper = document.createElement('div');
	let plusBtn = document.createElement('img');
	let quantity = document.createElement('span');
	let minusBtn = document.createElement('img');

	let itemPriceTotal = document.createElement('div');

	// 2. Set attributes
	deleteBtn.setAttribute('src', './images/c-remove.svg');
	deleteBtn.classList.add('remove-btn');

	itemImg.setAttribute('src', item.img);
	itemName.textContent = item.name;
	itemPrice.textContent = `$${item.price.toFixed(2)}`;

	quantityWrapper.classList.add('quantityWrapper');
	plusBtn.setAttribute('src', './images/circle-caret-right.svg');
	plusBtn.classList.add('plus-btn');
	minusBtn.setAttribute('src', './images/circle-caret-left.svg');
	minusBtn.classList.add('minus-btn');
	quantity.textContent = item.quantity;

	itemPriceTotal.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

	cartTotalCost += item.price * item.quantity;
	totalInCart.textContent = `$${cartTotalCost.toFixed(2)}`;

	// 3. Append elements
	quantityWrapper.append(minusBtn, quantity, plusBtn);
	listInCartPage.appendChild(li);

	li.append(
		deleteBtn,
		itemImg,
		itemName,
		itemPrice,
		quantityWrapper,
		itemPriceTotal
	);

	// 4. Event click
	deleteBtn.addEventListener('click', () => {
		const index = itemsInCart.indexOf(item);

		itemsInCart.splice(index, 1);
		localStorage.setItem('cart', JSON.stringify(itemsInCart));

		cartTotalCost -= item.price * item.quantity;
		totalInCart.textContent = `$${cartTotalCost.toFixed(2)}`;

		listInCartPage.removeChild(li);
		numOfItem.textContent = getTotalInCart(itemsInCart);
	});

	plusBtn.addEventListener('click', () => {
		item.quantity++;
		quantity.textContent = item.quantity;
		itemPriceTotal.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

		localStorage.setItem('cart', JSON.stringify(itemsInCart));
		numOfItem.textContent = getTotalInCart(itemsInCart);

		cartTotalCost += item.price;
		totalInCart.textContent = `$${cartTotalCost.toFixed(2)}`;
	});

	minusBtn.addEventListener('click', () => {
		if (item.quantity > 1) {
			item.quantity--;
			cartTotalCost -= item.price;
		}
		quantity.textContent = item.quantity;
		itemPriceTotal.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

		localStorage.setItem('cart', JSON.stringify(itemsInCart));
		numOfItem.textContent = getTotalInCart(itemsInCart);

		totalInCart.textContent = `$${cartTotalCost.toFixed(2)}`;
	});
});
