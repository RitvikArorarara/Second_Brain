import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import  {config}  from './config';


export const userMiddleware = async (req : Request , res : Response, next : NextFunction) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string, config.JWT_SECRET as string);
    if(decoded){
  
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }else{
      
        res.status(401).json({
            message: "You are not logged in"
        })
    }
}