import { NextFunction, Request, Response } from "express";
import passport from "passport";

export const authorize=(req: Request, res: Response,next:NextFunction)=>{

    passport.authenticate("jwt",{session:false}, (err:any,user:any) => { 
        if(!user || err) {
            res.status(401).json({msg:"Unathorized"})
        }else {
            req.user=user;
            next();
        }
    })(req,res,next);
};

