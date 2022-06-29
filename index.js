const addToCart = document.querySelectorAll('.add-to-cart');
const numOfItem = document.querySelector('.item-number');

let itemsInCart = [];

// ** function reload localStorage
const reloadProducts = () => {
	let products = localStorage.getItem('cart');
	products = JSON.parse(products);
	if (products) {
		console.log(products.length);
		numOfItem.textContent = products.length;
		return products;
	}
};

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
		// rest operator

		// Get object of the item with name and price
		const itemInfo = parseItemInfo(item.parentNode.children);

		// Save in localStorage
		itemsInCart.push(itemInfo);
		localStorage.setItem('cart', JSON.stringify(itemsInCart));

		// // update quantity of items in the cart
		numOfItem.textContent = itemsInCart.length;
	});
}
