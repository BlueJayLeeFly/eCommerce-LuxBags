const addToCart = document.querySelectorAll('.add-to-cart');
const numOfItem = document.querySelector('.item-number');

let itemsInCart = [];

let cartTotalCost = 0;

const getTotalInCart = (cart) => {
	let sum = 0;
	for (const item of cart) {
		sum += item.quantity;
	}
	return sum;
};

// function reload localStorage
const reloadProducts = () => {
	let products = localStorage.getItem('cart');
	products = JSON.parse(products);
	if (products) {
		numOfItem.textContent = getTotalInCart(products);
	} else {
		products = [];
	}
	return products;
};

itemsInCart = reloadProducts();

// Take out $ and convert to int
const parsePrice = (priceWithDollarSign) => {
	return Number(priceWithDollarSign.substring(2));
};

// Create object of item info
const parseItemInfo = (node) => {
	return {
		img: node[0].currentSrc,
		name: node[1].innerText,
		price: parsePrice(node[2].innerText),
	};
};

// Loop an array of addToCart buttons
for (const item of addToCart) {
	item.addEventListener('click', (e) => {
		// Get object of the item with name and price
		const itemInfo = parseItemInfo(item.parentNode.children);

		// Expand item with quantity
		const itemInfoWithQuantity = { ...itemInfo, quantity: 1 };

		// Find a match in the cart array
		const isFound = itemsInCart.find(
			(item) => item.name === itemInfoWithQuantity.name
		);

		if (isFound) {
			isFound.quantity++;
		} else {
			// Save in localStorage
			itemsInCart.push(itemInfoWithQuantity);
		}

		localStorage.setItem('cart', JSON.stringify(itemsInCart));

		numOfItem.textContent = getTotalInCart(itemsInCart);
	});
}

// Cart Page

const listInCartPage = document.querySelector('.items-in-cart');

itemsInCart.map((item) => {
	const index = itemsInCart.indexOf(item);

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
	itemPrice.textContent = item.price;

	quantityWrapper.classList.add('quantityWrapper');
	plusBtn.setAttribute('src', './images/circle-caret-right.svg');
	plusBtn.classList.add('plus-btn');
	minusBtn.setAttribute('src', './images/circle-caret-left.svg');
	minusBtn.classList.add('minus-btn');
	quantity.textContent = item.quantity;

	itemPriceTotal.textContent = item.price * item.quantity;

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
		itemsInCart.splice(index, 1);
		localStorage.setItem('cart', JSON.stringify(itemsInCart));

		listInCartPage.removeChild(li);
		numOfItem.textContent = getTotalInCart(itemsInCart);
	});

	plusBtn.addEventListener('click', () => {
		item.quantity++;
		quantity.textContent = item.quantity;
		itemPriceTotal.textContent = item.price * item.quantity;

		localStorage.setItem('cart', JSON.stringify(itemsInCart));
		numOfItem.textContent = getTotalInCart(itemsInCart);
	});

	minusBtn.addEventListener('click', () => {
		if (item.quantity === 1) {
			listInCartPage.removeChild(li);
			itemsInCart.splice(index, 1);
			localStorage.setItem('cart', JSON.stringify(itemsInCart));
			numOfItem.textContent = getTotalInCart(itemsInCart);
		} else {
			item.quantity--;
		}
		quantity.textContent = item.quantity;
		itemPriceTotal.textContent = item.price * item.quantity;

		localStorage.setItem('cart', JSON.stringify(itemsInCart));
		numOfItem.textContent = getTotalInCart(itemsInCart);
	});
});
