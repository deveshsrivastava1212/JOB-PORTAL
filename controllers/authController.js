import userSchema from "../models/userModel.js";

export const registerController = async (req, res, next) => {
    const { name, email, password } = req.body;
    //validate
    if (!name) return next("Name is required...")
    if (!email) return next("Email is required...")
    if (!password) return next("Password is required & should be greater than 6 character...")
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
        return res.status(200).send({
            success: false,
            message: "User Is Already Existing, Please Login.."
        })
    }
    const user = await userSchema.create({ name, email, password });
    //token
    const token = user.createJWT();
    res.status(201).send({
        success: true,
        message: "User Registered Successfully",
        user: {
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            location: user.location
        },
        token
    })
}

//Login Controller
export const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email) return next("Please provide the email")
    if (!password) return next("Please provide the password")
    const user = await userSchema.findOne({ email }).select("+password");
    if (!user) next("User Not Found...")
    const isMatch = await user.comparePassword(password)
    if (isMatch) {
        user.password = undefined;
        const token = user.createJWT()
        res.status(200).send({
            success: true,
            message: "User Login Successful",
            user,
            token
        })
    } else {
        next("Invalid User or Password")
    }

}