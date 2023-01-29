const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.validatePassword = async function (password, passwordHash) {
    return await bcrypt.compare(password, passwordHash);
}

// when doing save operation, we are hashing password before saving it in database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
