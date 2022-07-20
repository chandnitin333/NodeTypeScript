
import { body,query } from "express-validator";
import { resolve } from "path/posix";
import User from '../models/Users';


export class UserValidator{

    static validSignUp(){
     
        return [
            body('password','Password is required').isAlphanumeric().isLength({min:8,max:20}).withMessage('Password can be from 8-20 charector only'),
            body('username','Username is required').isString().notEmpty(),
            body('email','please valid email').isEmail().notEmpty(),
        ]
    }


    static loginVerify(){
        return[
            body('password','Password is required').notEmpty(),
            body('email','email is required').notEmpty().custom((email,{req})=>{
                return  User.findOne({email:email}).then(user=>{
                    if(user){
                        req.user= user;
                        return true
                    }else{
                        throw new Error("User does not exits");
                    }
                });
            })

        ]
    }

    static verifyUser(){
        
        return[body('username','Verification token is required').isString()]
    } 



}