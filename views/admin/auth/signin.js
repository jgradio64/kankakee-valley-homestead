const layout = require('../layout');

const getError = (errors, prop) => {
	// prop === 'email' || 'password'
	try {
		return errors.mapped()[prop].msg;
	} catch (err) {
		return '';
	}
};

module.exports = ({ req, errors }) => {
	return layout({
		content: `
        <div>
            <form method="POST">
				<input name="email" placeholder="email">
				${getError(errors, 'email')}
				<input name="password" placeholder="password">
				${getError(errors, 'password')}
                <button>Sign-In</button>
            </form>
        </div>
        `
	});
};
