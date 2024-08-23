import jwt from 'jsonwebtoken';

export const isAuth = (requiredRole) => async(req,res,next)=>{
      try {
        //headers
        let token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json("Token Not Found");
        }
        
        jwt.verify(token, process.env.SEC_KEY , function(err, decoded) {
            if(err){
                return res.status(403).json('Token is Invalid!!')
            }
            //decode add to req.user._id , role more details passed
            req.user = decoded;
            
            //role check
            if(requiredRole && !requiredRole.includes(req.user.role)){
                return res.status(403).json('Authorization denied contact admin!!')
            }
             //next middleware
            next();
          });
      } catch (error) {
        res.status(500).json({error : error.message})
      }
}

