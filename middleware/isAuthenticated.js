const JWT = require('jsonwebtoken');
const SECRET = 'jwtTOken'; // will be set in env later

module.exports = function isAuthenticated(req, res, next) {
	const token = req.cookies.access_token;
		JWT.verify(token,SECRET,(err,decoded) => {
			if(err){
				res.send(401,'Unauthorized');
			} else {
				next();
			}
		})
};