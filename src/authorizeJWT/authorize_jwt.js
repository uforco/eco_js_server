import jwt from 'jsonwebtoken'

class AuthorizeJWT {

    static async generateJWT(data, expires){
        const time = expires || '1h' 
        const bearerToken = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: time})
        return bearerToken;
    }


}

export default AuthorizeJWT;