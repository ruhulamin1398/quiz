const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization || req.query.token;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        try {
            const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRT);

            req.user = decoded.user;
            console.log("req.user", req.user);
            const email = decoded.user.email;

            if (decoded.user.type === "user") {
                try {
                    const user = await User.findOne({ email });

                    // console.log("user", user);

                    // console.log("token: ", email);
                    // console.log("userToken: ", user.token);
                    req.user = user;

                    if (user.token !== token) {
                        res.status(401);
                        throw new Error(`Token mismatch. Expected: ${user.token}, Actual: ${token}`);
                    }
                } catch (error) {
                    res.status(500);
                    throw new Error("Error fetching user from the database");
                }
            }

            next();
        } catch (err) {
            res.status(401);
            throw new Error("User is not authorized 2");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("User isn't authorized 3");
    }
});


module.exports = validateToken;