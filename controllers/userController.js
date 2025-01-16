import userSchema from "../models/userModel.js";

export const updateUserController = async (req, res, next) => {
    const { name, lastname, email, location } = req.body;
    if (!name || !lastname || !email || !location)
        next("Please Provide All the Fields")
    const user = await userSchema.findOne({ _id: req.user.userId })
    user.name = name
    user.lastname = lastname
    user.email = email
    user.location = location

    await user.save()
    const token = user.createJWT()
    res.status(200).json({
        user,
        token
    })
}