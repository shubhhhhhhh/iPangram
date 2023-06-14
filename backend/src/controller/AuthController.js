const env = require("dotenv").config({ path: "../../.env" })
const AuthUser = require("../model/AuthModel")
const bcrypt = require("bcryptjs");
const jwtToken = require("jsonwebtoken")
const { getHashPassword, comparePassword } = require("../constant/Constant");

module.exports = {
    async signup(req, res) {
        const signupData = req.body
        const response = {}
        try {
            var obj;
            var id;
            if (req.body.role == "manager") {
                obj = await AuthUser.find({role : { $regex : '^m' }}).count();
                id = `M${obj + 1}`
            }
            else if (req.body.role == "employee") {
                obj = await AuthUser.find({ role: { $regex: '^e' } }).count();
                id = `E${obj + 1}`
            }
            signupData.empId = id
            const res = await new AuthUser(signupData).save();
            console.log(res)
            if (res) {
                response.status = "success",
                response.message = "signup successfully"
            }
            else {
                response.status = "failed",
                response.message = "signup unsuccessfully"
            }
        } catch (error) {
            response.status = "failed"
            response.message = error
        }
        res.json(response)
    },



    async login(req,res) {
        const loginData = req.body
        const response = {}
        try {
            const obj = await AuthUser.findOne({ email: loginData.email }, { __v: 0 })
            console.log(obj)
            const isPass = comparePassword(loginData.password, obj.password)
            //console.log(isPass)
            if (isPass) {
                var tokenData = {
                    id: obj.empId,
                    name: obj.firstName + obj.secondName,
                    email: obj.email,
                }
                console.log(tokenData)
                const secretKey = process.env.JWT_SECRET_KEY
                //console.log(secretKey)
                const token = jwtToken.sign(tokenData, secretKey, { expiresIn: "30d" })
               // console.log(token)

                response.status = "success"
                response.message = "login successfully"
                response.body = { id : obj.empId }
                response.token = token
            }
            else {
                response.status = "failed"
                response.message = "login unsuccessful"
            }

        } catch (error) {
            response.status = "failed";
            response.message = error ;
        }

        res.json(response)
    },

};