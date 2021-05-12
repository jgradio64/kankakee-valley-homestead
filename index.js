const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const keys = require('./keys');

// Database connection
const mongoose = require('mongoose');
let url = 'mongodb://localhost:27017/kkvh';
mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to db');
	})
	.catch((err) => {
		console.log('Error', err.message);
	});

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: [ keys.cookieSessionKey ]
	})
);

// This "activates" the routes, it starts them up when this script is called.
app.use(authRouter);
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);

app.listen(3000, () => {
	console.log('Server has started');
});
