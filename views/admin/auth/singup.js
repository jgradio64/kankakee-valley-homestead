module.exports = ({ req }) => {
	return `
        <div>
            Your id is: ${req.session.userID}
            <form method="POST">
                <input name="email" placeholder="email">
                <input name="password" placeholder="password">
                <input name="passwordConfirmation" placeholder="password">
                <button>Sign-Up</button>
            </form>
        </div>
    `;
};
