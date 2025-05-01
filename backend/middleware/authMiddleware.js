const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
const protect = async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.user.id).select('-password'); //excludeing password
			next();
		} catch (error) {
			console.log('Token Verification Failed', error);
			res.status(401).json({ message: 'Not Authorized, token failed' });
		}
	} else {
		res.status(401).json({ message: 'Not Authorized, No token provided' });
	}
};

// middleware to check if the user is an Admin
const admin = (req, res, next) => {
	if (req.user && req.user.role === 'admin') {
		next();
	} else {
		res.status(403).json({ message: 'Not Authorized as an Admin' });
	}
};

module.exports = { protect, admin };
