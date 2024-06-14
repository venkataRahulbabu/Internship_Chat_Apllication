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

async function userDetails(request,response){
    try {
        const token = request.cookies.token || ""
        const user = await getUserDetailsFromToken(token)
        return response.status(200).json({
            message : "User Details!",
            data : user
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = userDetails;