const addToCart = document.querySelectorAll('.add-to-cart');
const numOfItem = document.querySelector('.item-number');

let itemsInCart = [];

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
		return products;
	}
};

//
if (reloadProducts()) {
	itemsInCart = reloadProducts();
}

// Take out $ and convert to int
const parsePrice = (priceWithDollarSign) => {
	return Number(priceWithDollarSign.substring(2));
};

// Create object of item info
const parseItemInfo = (node) => {
	return {
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
