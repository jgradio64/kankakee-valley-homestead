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
            Your id is: ${req.session.userID}
            <form method="POST">
                <input name="email" placeholder="email">
                ${getError(errors, 'email')}
                <input name="password" placeholder="password">
                ${getError(errors, 'password')}
                <input name="passwordConfirmation" placeholder="password">
                ${getError(errors, 'passwordConfirmation')}
                <button>Sign-Up</button>
            </form>
        </div>
        `
	});
};
