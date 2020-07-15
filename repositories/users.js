const fs = require('fs');
const util = require('util');
const crypto = require('crypto');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
	async create(attrs) {
		attrs.id = this.randomID();

		const salt = crypto.randomBytes(8).toString('hex');
		const buff = await scrypt(attrs.password, salt, 64);

		const records = await this.getAll();
		const record = {
			...attrs,
			password: `${buff.toString('hex')}.${salt}`
		};
		records.push(record);

		await this.writeAll(records);
		return record;
	}

	async comparePasswords(saved, supplied) {
		// saved password = password saved in out DB
		// supplied = password given by user attempting to sign in
		const [ hashed, salt ] = saved.split('.');
		const bufferedSupplied = await scrypt(supplied, salt, 64);
		return hashed === bufferedSupplied.toString('hex');
	}
}

module.exports = new UsersRepository('users.json');
