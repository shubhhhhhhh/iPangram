require("dotenv").config({ path: "./../../.env" });
const jwt = require("jsonwebtoken");

module.exports = {
    verifyTokenEmployee(request, response, next) {
        try {
            // console.log(request.headers)
            const secretToken = process.env.JWT_SECRET_KEY;
            const token = request.headers["authorization"].split(" ")[1];
            const verify = jwt.verify(token,secretToken)
            // console.log(verify)
            if(verify){
                next()
                // response.json({message:"ok"})
            }
        } catch (error) {
            response.status(401).json({status:"failed",message:"unauthorized ! Access Token was expired"})
        }
    }
}