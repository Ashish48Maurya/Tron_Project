const adminMiddleware = async(req,res,next)=>{
    try{
        const adminRole = req.User.isAdmin;
        if(!adminRole){
            return res.status(404).json({"message":"Access Denied , User is not an Admin"});
        }
        next();
    }
    catch(err){
        next(err);
    }
}
module.exports = adminMiddleware;