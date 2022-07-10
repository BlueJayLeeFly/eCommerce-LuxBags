import { numOfItem } from './elements.js';

const getTotalInCart = (cart) => {
	let sum = 0;
	for (const item of cart) {
		sum += item.quantity;
	}
	return sum;
};

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

const parsePrice = (priceWithDollarSign) => {
	return Number(priceWithDollarSign.substring(2));
};

const parseItemInfo = (node) => {
	return {
		img: node[0].currentSrc,
		name: node[1].innerText,
		price: parsePrice(node[2].innerText),
	};
};

// Loop an array of addToCart buttons
const handleAddToCart = (buttons, cartItems) => {
	for (const button of buttons) {
		button.addEventListener('click', () => {
			// Get object of the item with name and price
			const itemInfo = parseItemInfo(button.parentNode.children);

			// Expand item with quantity
			const itemInfoWithQuantity = { ...itemInfo, quantity: 1 };

			// Find a match in the cart array
			const isFound = cartItems.find(
				(item) => item.name === itemInfoWithQuantity.name
			);

			if (isFound) {
				isFound.quantity++;
			} else {
				// Save in localStorage
				cartItems.push(itemInfoWithQuantity);
			}

			localStorage.setItem('cart', JSON.stringify(cartItems));

			numOfItem.textContent = getTotalInCart(cartItems);
		});
	}
};

export { getTotalInCart, reloadProducts, parseItemInfo, handleAddToCart };
