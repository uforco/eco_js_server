import jwt from 'jsonwebtoken'

class AuthorizeJWT {

    static async generateJWT(data){
        const bearerToken = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '1h'})
        return bearerToken;
    }


}

export default AuthorizeJWT;