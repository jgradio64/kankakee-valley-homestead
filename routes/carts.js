const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');
const router = express.Router();

// show all items in cart
router.get('/cart', async (req, res) => {
	if (!req.session.cartId) return res.redirect('/');

	const cart = await cartsRepo.getOne(req.session.cartId);
	for (let item of cart.items) {
		const product = await productsRepo.getOne(item.id);
		item.product = product;
	}
	res.send(cartShowTemplate({ items: cart.items }));
});

// add item to cart
router.post('/cart/products', async (req, res) => {
	let cart;
	if (!req.session.cartId) {
		cart = await cartsRepo.create({ items: [] });
		req.session.cartId = cart.id;
	} else {
		cart = await cartsRepo.getOne(req.session.cartId);
	}
	// Add item to a cart, or increment the existing product's quantity
	const existingItem = cart.items.find((item) => item.id === req.body.productID);

	if (existingItem) {
		existingItem.quantity++;
	} else {
		cart.items.push({ id: req.body.productID, quantity: 1 });
	}
	await cartsRepo.update(cart.id, {
		items: cart.items
	});
	res.redirect('/cart');
});

// delete items from cart
router.post('/cart/products/delete', async (req, res) => {
	const { itemID } = req.body;
	const cart = await cartsRepo.getOne(req.session.cartId);

	const items = cart.items.filter((item) => item.id !== itemID);

	await cartsRepo.update(req.session.cartId, { items });

	res.redirect('/cart');
});

module.exports = router;
