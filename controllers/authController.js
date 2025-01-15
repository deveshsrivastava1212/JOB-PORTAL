import userSchema from "../models/userModel.js";

export const registerController = async (req, res, next) => {
    try {
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
        res.status(200).send({
            success: true,
            message: "User Registered Successfully",
            user
        })
    } catch (error) {
        next(error)
    }
}