const jsonwebtoken=require('jsonwebtoken');


//Only varifying token and transfarring the contronl to the next middleware
const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.token;
    console.log(authHeader);
    if(authHeader)
    {  
          const token=authHeader.split(" ")[0];
          console.log("Token is "+token)
          jsonwebtoken.verify(token,"mdsa",(err,user)=>{
            console.log("User is "+JSON.stringify(user))
            if(err)
             {
                res.json(err)
                console.log("Inside token is not valid")
             }
             else
             {
                req.user=user;
               next();
               console.log("Inside jtkVeridfy")
             }
             
            
          })
    }
    else
    {
        res.status(401).send("You are not authenticated");
    }

}

//Varifying the token and autharising the user or admin
const verifyTokenAndAuthorazation=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isOwner){
            next();
        }
        else{
            res.status(403).send("You are not allowed to do that");
        }
    })
}


//Varifying the token and authriing only admin
const verifyTokenAndAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isOwner){
            next();
        }
        else{
            res.status(403).send("Bro, you are not admin");
        }
    })
}

module.exports={verifyToken,verifyTokenAndAuthorazation,verifyTokenAndAdmin};