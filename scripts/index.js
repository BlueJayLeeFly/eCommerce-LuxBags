import { addToCart } from './elements.js';

import { reloadProducts, handleAddToCart } from './utils.js';

let itemsInCart = [];

itemsInCart = reloadProducts();

// Handle add to cart button
handleAddToCart(addToCart, itemsInCart);
