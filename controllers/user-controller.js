const userModel = require("../models/user-model");

const registration = async (req, res, next) => {
    const { username, email } = req.body;
    const user = await userModel.findOne({ username });
    if (user) {
        res.status(401).json({ message: `${username} already exists` });
        return;
    }
    const newUser = new userModel(req.body);
    newUser.save();
    res.json({
        username,
        email
    })
}

const getAllUsers = async (req, res, next) => {
    return res.json(await userModel.find());
}

const authenticate = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (user) {
        if (!await user.validatePassword(password, user.password)) {
            res.status(401).json({ message: "Invalid Password" });
            return;
        }
        res.json({
            username,
            email: user.email
        })
        return;
    }
    res.status(401).json({ message: `${username} don't exist` });
}

module.exports = {
    registration,
    authenticate,
    getAllUsers
}