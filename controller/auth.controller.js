const {
    signInSchema,
    signUpSchema
} = require("../middleware/auth-validator.middleware");
const { generateAccessToken } = require("../middleware/jwt-token.middleware");
const { hashValue, doHashValidation } = require("../utils/hashing.utils");

const initialUser = [
    {
        id: 1,
        email: "sample@email.com",
        password: "$2a$10$DVle3SdF5FqU85Vpzt0gFOW8D1/L7HY2Hu5I7SswQnS8kMIv6Ic3" //password123
    }
]

const signIn = async (req, res) => {
    const { username, email, password } = req.body;
    const { error, value } = signInSchema.validate({ username, email, password });

    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message
        });
    }

    let userExist;
    if (value.username) {
        userExist = initialUser.find((user) => user.username === value.username);
    } else if (value.email) {
        userExist = initialUser.find((user) => user.email === value.email);
    }

    if (!userExist) {
        return res.status(401).json({ // 401 Unauthorized for bad credentials
            status: false,
            message: "Invalid credentials: User does not exist."
        });
    }


    const matchPassword = await doHashValidation(password, userExist.password);
    if (!matchPassword) { 
        return res.status(401).json({
            status: false,
            message: "Invalid credentials: Incorrect password."
        });
    }

    // 6. Successful login
    const token = generateAccessToken(userExist.email);
    return res.status(200).json({ 
        status: true,
        token: token,
        message: "You are logged in."
    });
};


const signUp = async (req, res) => {
    const { email, username, password } = req.body;
    const {error, value} = signUpSchema.validate({email, username, password});

    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message
        });
    }

    const usernameExist = initialUser.some((user) => user.username === value.username);
    if (usernameExist) {
        return res.status(409).json({
            status: false,
            message: "Username already exist"
        });
    };

    const emailExist = initialUser.some((user) => user.email === value.email);
    if (emailExist) {
        return res.status(409).json({
            status: false,
            message: "Email already exist"
        });
    };

    const hashedNewPassword = await hashValue(value.password);
    let nextUserId = initialUser.length > 0 ? Math.max(...initialUser.map((u) => u.id)) + 1 : 1;

    const newUser = {
        id: nextUserId,
        username: value.username,
        email: value.email,
        password: hashedNewPassword
    };

    initialUser.push(newUser);

    return res.status(201).json({
        status: true,
        message: "User successfully registered",
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newEmail.email
        }
    })
};