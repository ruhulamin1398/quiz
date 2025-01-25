const asyncHandler = require("express-async-handler")
const User = require("../models/user.model")
// const DoctorProfile = require("../../models/doctorProfileModel")
// const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
// const VerificationCode = require("../../models/verificationCodeModel")
// const { sentEMail } = require("./mailSenderController")


//@desc Register a user 
//@route POST /api/v1/users/register
//@access public 
// const registerUser = asyncHandler(async (req, res) => {

//     // console.log(req.body)
//     const { username, email, password, user_type } = req.body;

//     if (!username || !email || !password) {
//         res.status(400);
//         throw new Error("All fields are mandatory");
//     }
//     const userAvailable = await User.findOne({ email });

//     if (userAvailable) {
//         res.status(400);
//         throw new Error("User Already Registered");
//     }


//     // Hash Password 
//     const hashedPassword = await bcrypt.hash(password, 10)

//     const user = await User.create({
//         username,
//         email,
//         password: hashedPassword,
//         user_type: user_type === "doctor" ? "doctor" : "patient",
//     })

//     if (user) {
//         console.log("verify email sending!!!", user.id)
//         // const isSentVerifyMail = await sentVerifyMail(user.id)
//         console.log("verify email send done !!!")
//         const data = {
//             type: "user"
//         }

//         const accessToken = await generateJwtToken(user.username, user.email, user._id, 0, data);

//         try {
//             await User.findByIdAndUpdate(
//                 user.id,
//                 { token: accessToken },
//                 { new: true }
//             );
//         }
//         catch (err) {
//             res.status(500);
//             throw new Error("Some things went worong , Please try again")

//         }



//         /// creating a doctor profile 

//         // const doctor = await DoctorProfile.create({
//         //     name:username,
//         //     "user_id":user.id,
//         //     "img": "https://example.com/doctor_image.jpg",
//         //     "rating": 4.5,
//         //     "degree": "MBBS",
//         //     "location": "City Hospital",
//         //     "availableDate": ["Monday", "Wednesday", "Friday"],
//         //     "availableTime": ["09:00", "14:00"]


//         // })





//         res.status(201);

//         res.json({
//             "msg": "Account Created Successful. Please verify your Email",
//             "token": accessToken,
//         })



//     }
//     else {
//         res.status(400)
//         throw new Error("user data is not valid ")
//     }

// }
// )


/**
 * @description Handles user login or registration. If a valid JWT token exists, it verifies the user and generates a new token. 
 * If the JWT is invalid or absent, it validates the Firebase token, checks the user's existence in the database, 
 * and either creates a new user or updates the existing user's details. Finally, it returns an access token.
 * 
 * @route POST /api/v1/users/login
 * @access Public
 */
const loginOrRegisterUser = asyncHandler(async (req, res) => {
    let isValidUser = false; // Tracks whether the user is valid
    let resStatus = 200; // Default response status code

    // Destructure the required fields from the request body
    const { email, name, image, firebase_token } = req.body;

    // Step 1: Validate input
    if (!email || !firebase_token) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    // Step 2: Extract JWT token from Authorization header or query
    let authHeader = req.headers?.Authorization || req.headers?.authorization || req.query?.token;

    // If JWT token exists, verify it
    if (authHeader && authHeader.startsWith("Bearer")) {
        const jwt_token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
        isValidUser = await validateLoginToken(jwt_token, email); // Verify token validity
    }

    // Step 3: If JWT is invalid or absent, validate Firebase token
    if (!isValidUser) {
        console.log("isValidUser __", isValidUser);

        // Validate Firebase token
        const isValidFirebaseToken = await validateFirebaseToken(firebase_token);
        if (isValidFirebaseToken) {
            // Step 4: Check if user exists in the database
            const user = await User.findOne({ email });
            if (!user) {
                // If user doesn't exist, create a new one
                const newUser = await User.create({
                    email,
                    name,
                    image,
                });

                if (newUser) {
                    resStatus = 201; // Set response status to Created
                    isValidUser = true; // Mark the user as valid
                }
            } else {
                // If user exists, mark as valid
                isValidUser = true;
            }
        }
    }

    // Step 5: If user is valid, generate a new JWT token and update user details
    if (isValidUser) {
        let user = await User.findOne({ email }); // Retrieve the user from the database
        const data = {
            type: "user", // Additional token payload
        };

        // Generate a new JWT token
        const accessToken = await generateJwtToken(user.email, firebase_token, user._id, 0, data);

        // Update user's token and Firebase token in the database
        user = await User.findByIdAndUpdate(
            user.id,
            { token: accessToken, firebase_token: firebase_token },
            { new: true } // Return the updated document
        );

        if (!accessToken) {
            res.status(500);
            throw new Error("Something went wrong. Please try again.");
        }

        // Respond with success, including the new token
        res.status(resStatus).json({
            msg: "Login successful",
            token: accessToken,
            firebase_token: user.firebase_token,
        });

        return; // End the request here
    }

    // If no valid user was found or created, return an error
    res.status(500);
    throw new Error("Something went wrong. Please try again.");
});


// @des login udate sponsor token 
// @route POST /api/users/sponsor
// @access public 

const updateSponsor = asyncHandler(async (req, res) => {
    const { email } = req.user;
    const { sponsor } = req.body
    const user = await User.findOne({ email });


    if (sponsor && user && user.sponsor == "") {

        const updatedUser = await User.findByIdAndUpdate(
            user.id,
            { sponsor: sponsor },
            { new: true }
        );

        if (updatedUser.sponsor == "") {
            res.status(500);
            throw new Error("Some things went worong , Please try again")
        }

        res.status(200)
        res.json({

            "msg": "Sponsor update Successful",
            "sponsor": updatedUser.sponsor
        })



    } else {


        res.status(400)
        res.json({

            "msg": "Bed Request",
        })
    }




})



// const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         res.status(400)
//         throw new Error("All field are mendatory")
//     }
//     const user = await User.findOne({ email });
//     if (user && (await bcrypt.compare(password, user.password))) {

//         let accessToken = user.token;
//         if (!accessToken) {
//             const data = {
//                 type: "user"
//             }
//             accessToken = await generateJwtToken(user.username, user.email, user._id, 0, data)
//             await User.findByIdAndUpdate(
//                 user.id,
//                 { token: accessToken },
//                 { new: true }
//             );

//             if (!accessToken) {
//                 res.status(500);
//                 throw new Error("Some things went worong , Please try again")
//             }


//         }

//         res.status(200)
//         res.json({

//             "msg": "login Successfull",
//             "token": accessToken,
//             "firebase_token": user.firebase_token
//         })

//     }
//     else {
//         res.status(401);
//         throw new Error("Email or Password is wrong ");
//     }

// })


//@des login udate token 
//@route POST /api/v1/users/update-user-token
//@access public 

// const updateUserToken = asyncHandler(async (req, res) => {
//     const { email } = req.user;

//     const user = await User.findOne({ email });



//     if (user) {
//         const data = {
//             type: "user"
//         }
//         accessToken = await generateJwtToken(user.username, user.email, user._id, 0, data)
//         await User.findByIdAndUpdate(
//             user.id,
//             { token: accessToken },
//             { new: true }
//         );

//         if (!accessToken) {
//             res.status(500);
//             throw new Error("Some things went worong , Please try again")
//         }


//     }

//     res.status(200)
//     res.json({

//         "msg": "Token update Successful",
//         "token": accessToken,
//     })




// })




//@des login udate firebase token 
//@route POST /api/v1/users/update-firebase-token
//@access public 

// const updateFirebaseToken = asyncHandler(async (req, res) => {
//     const { email } = req.user;
//     const { firebase_token } = req.body

//     const user = await User.findOne({ email });



//     if (user) {

//         await User.findByIdAndUpdate(
//             user.id,
//             { firebase_token: firebase_token },
//             { new: true }
//         );

//         if (!firebase_token) {
//             res.status(500);
//             throw new Error("Some things went worong , Please try again")
//         }


//     }

//     res.status(200)
//     res.json({

//         "msg": "Token update Successful",
//         "firebase_token": firebase_token,
//     })




// })





//@des current user 
//@route POST /api/v1/users/currentuser
//@access public 

// const currentUser = asyncHandler(async (req, res) => {

//     try {

//         const email = req.user.email;
//         const user = await User.findOne({ email });


//         const id = user._id;
//         const username = user.username;
//         const is_verified = user.is_verified
//         const user_type = user.user_type
//         const amount = user.amount


//         res.status(200)


//         res.json({
//             id,
//             username,
//             email,
//             is_verified,
//             user_type,
//             amount
//         })

//     }
//     catch (err) {
//         res.status(401);
//         throw new Error(err);
//     }


// })


//@des resend-verification-email
//@route POST /api/v1/users/resend-verification-email
//@access Protected  

// const reSendVerificationOTP = asyncHandler(async (req, res) => {
//     console.log("req ", req.user.id)
//     res.status(200)
//     const isSentVerifyMail = await sentVerifyMail(req.user.id)
//     res.json({
//         "msg": "Verification email send successful"
//     })

// })

//@des verify-user-otp-token
//@route POST /api/v1/users/verify-user-otp-token
//@access Protected  

// const verifyUserOtpToken = asyncHandler(async (req, res) => {
//     const user_id = req.user.id;
//     // console.log("user id ", user_id)

//     let user = {}
//     try {
//         user = await User.findById(user_id)
//         if (user.is_verified) {

//             res.status(200)

//             res.json({
//                 "msg": "User Already Activated",

//             })

//         }
//     }
//     catch (err) {
//         res.status(500);
//         throw new Error(err)

//     }


//     const verficationData = await VerificationCode.findOne({ user_id }).sort({ createdAt: -1 }).limit(1);
//     if (!verficationData) {

//         res.status(401)

//         res.json({
//             "msg": "Invalid code !!",

//         })
//     }

//     const codeFromDatabase = verficationData.verification_code
//     const codeFromRequest = req.body.code
//     const BearerToken = req.query.token

//     let status = 0;



//     if (BearerToken && BearerToken.startsWith("Bearer")) {
//         let token = BearerToken.split(" ")[1];
//         if (token == verficationData.token)

//             status = 1;
//     } else if (codeFromDatabase && codeFromDatabase == req.body.code) {

//         status = 1;
//     }


//     if (status) {
//         try {
//             await User.findByIdAndUpdate(
//                 user.id,
//                 { is_verified: true },
//                 { new: true }
//             );
//             await VerificationCode.deleteOne({ _id: verficationData._id });


//             res.status(200);
//             res.json({
//                 "msg": "User is Activated",

//             })

//         } catch (err) {
//             res.status(500);
//             throw new Error("Some things went worong , Please try again2")
//         }


//     }
//     else {
//         res.status(500);
//         throw new Error("Some things went worong , Please try again3")

//     }








// })




// // verify Account via code 
// const verifyEmail = asyncHandler(async (req,res){
//     res.json({
//         "message" : "hello"
//     })

// })



// // send verify email 



// const sentVerifyMail = asyncHandler(async (user_id) => {

//     // console.log("hello i'm here ", user_id)
//     const user = await User.findById(user_id)
//     console.log(user)
//     const code = Math.floor(1000 + Math.random() * 9000)
//     console.log("code is ", code)

//     const verficationCode = await VerificationCode.create({
//         user_id: user.id,
//         verification_code: code,

//     })

//     const data = {
//         verification_code_id: verficationCode.id,
//         code: code,
//         type: "otp"

//     }
//     console.log("data  ", data)

//     console.log("generting token...... ",)
//     let accessToken;
//     try {
//         accessToken = await generateJwtToken(user.username, user.email, user._id, 3600, data)
//     }
//     catch (err) {
//         console.log(err)
//     }

//     console.log("generated access token ", accessToken)




//     try {
//         await VerificationCode.findByIdAndUpdate(
//             verficationCode.id,
//             { token: accessToken },
//             { new: true }
//         );


//     } catch (err) {
//         console.log(err)
//     }





//     const emailBodyHtml = `
//     <H1>Verification code : ${code}</H1>
//     <p>Click the button below to verify your account:</p>
//     <a target="_blank" style="display: inline-block; background-color: blue; color: white; padding: 10px; border: 1px solid;" href="${process.env.HOST}/users/verify-user-otp-token?id=${user_id}&&token=Bearer ${accessToken}">Verify Now</a>
// `;



//     try {
//         await sentEMail({
//             "body": emailBodyHtml,
//             "to": user.email,
//             "subject": "Verification Email",

//         })
//     }
//     catch (err) {
//         console.log(err)
//     }



// })








// generateJwtToken(email, firebase_token, user._id, 0, data);
const generateJwtToken = asyncHandler(async (_email, _token, _id, time, data) => {
    console.log("generating jwt token")
    const jwtToken = jwt.sign({
        user: {
            token: _token,
            email: _email,
            id: _id,
            type: data.type,
            data,
        },
    },
        process.env.ACCESS_TOKEN_SECRT,
        {
            expiresIn: time !== 0 ? time : 60 * 60 * 24 * 30,
        },


    )


    console.log("jwtToken  ____ ", jwtToken)
    return jwtToken;

})

const validateLoginToken = asyncHandler(async (token, email) => {
    try {
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRT);
        const user = decoded.user;
        const decodedEmail = decoded.user.email;

        if (decoded.user.type === "user" && decodedEmail === email) {
            try {
                const user = await User.findOne({ email });

                if (user.token !== token) {
                    return false;
                }
                return true;
            } catch (error) {
                return false;
            }
        }

    } catch (err) {
        return false;
    }


});


const validateFirebaseToken = asyncHandler(async (token) => {
    return true;
});






module.exports = { loginOrRegisterUser, updateSponsor };