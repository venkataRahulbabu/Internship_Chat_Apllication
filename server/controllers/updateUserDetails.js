const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')

const getUserDetailsFromToken = async (token) => {
    if (!token) {
        return {
            message: "Session Timed Out!",
            logout: true,
        }
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserModel.findById(decode.id).select('-password');
    return user;
}

async function updateUserDetails(request, response) {
    try {
        const token = request.cookies.token || ""
        const user = await getUserDetailsFromToken(token)
        const { name, profile_pic } = request.body
        const updateUser = await UserModel.updateOne({ _id: user._id }, { name, profile_pic });
        const userInfomation = await UserModel.findById(user._id)
        return response.json({
            message: "User Updated Successfully!",
            data: userInfomation,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = updateUserDetails