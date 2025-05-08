const jwt = require('jsonwebtoken');


const auth = (req,res,next) => {
    try {
        let token = req.headers.authorization;
        if(token){

            //As we are passing a bearer token so we have split to get the token at index 1
            token = token.split(" ")[1];

            //this will verify the tokens 
            let user = jwt.verify(token,process.env.SECREAT_KEY); 
            req.userId = user.id;
        }
        else{
           return res.status(400).json({
                message : "Unautorized User"
            })
        }

        next();


    } catch (error) {
       return res.status(400).json({
            message : "Unauthorized User"
        })
    }
}

module.exports = auth;