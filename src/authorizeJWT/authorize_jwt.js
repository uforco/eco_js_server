import jwt from 'jsonwebtoken'

class AuthorizeJWT {

    static async generateJWT(data, expires){
        const time = expires || '1h'
        const bearerToken = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: time})
        return bearerToken;
    }


    static async varifyAuthrizetion(req, res, next){
        try{
            const token = await req.headers?.authorization?.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if(!decoded){
                return res.status(401).send("Unauthorized")
            }
            next()
        }catch(err){
            console.log( "jwt decode denied", err )
            return res.status(401).send("Unauthorized")
        }
    }

    static async varifyToken(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            return decoded
        }catch(err){
            console.log( "jwt decode denied", err )
            return undefined
        }
    }


}

export default AuthorizeJWT;