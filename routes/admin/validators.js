const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
	requireTitle: check('title')
		.trim()
		.isLength({ min: 5, max: 40 })
		.withMessage('Must be between 5 and 40 characters'),
	requirePrice: check('price')
		.trim()
		.toFloat()
		.isFloat({ min: 1 })
		.withMessage('Must be a number with a minimum value of 1'),
	requireEmail: check('email')
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage('Must be a valid email')
		.custom(async (email) => {
			const existingUser = await usersRepo.getOneBy({ email });
			if (existingUser) {
				throw new Error('Email already in use');
			}
		}),
	requirePassword: check('password')
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage('Must be between 4 and 20 characters'),
	requirePasswordConfirmation: check('passwordConfirmation')
		.trim()
		.isLength({ min: 4, max: 20 })
		.custom(async (passwordConfirmation, { req }) => {
			if (passwordConfirmation !== req.body.password) {
				throw new Error('Password confirmation does not match the password');
			}
			return true;
		}),
	requireEmailExists: check('email')
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage('Must provide a valid email')
		.custom(async (email) => {
			const user = await usersRepo.getOneBy({ email });
			if (!user) {
				throw new Error('Email not found');
			}
		}),
	requireValidUserPassword: check('password').trim().custom(async (password, { req }) => {
		const user = await usersRepo.getOneBy({ email: req.body.email });
		if (!user) {
			throw new Error('Invalid Password');
		}
		const validPassword = await usersRepo.comparePasswords(user.password, password);
		if (!validPassword) {
			throw new Error('Invalid Password');
		}
	})
};
