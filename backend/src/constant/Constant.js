const bcrypt = require("bcryptjs")

module.exports = {
    getHashPassword(signupObj) {
        const salt = bcrypt.genSaltSync(10);
        signupObj.password = bcrypt.hashSync(signupObj.password,salt);
        return signupObj;
    },
    
    comparePassword(password,hash) {
        return bcrypt.compareSync(password,hash)
    },
}