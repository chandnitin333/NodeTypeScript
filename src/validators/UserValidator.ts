
import { body,query } from "express-validator";

import { resolve } from "path/posix";

export class UserValidator{

    static validSignUp(){
     
        return [
            body('password','Password is required').isAlphanumeric().isLength({min:8,max:20}).withMessage('Password can be from 8-20 charector only'),
            body('userName','Username is required').isString().notEmpty(),
            body('email','please valid email').isEmail().notEmpty(),
        ]
    }



    static verifyUser(){
        
        return[body('userName','Verification token is required').isString()]
    } 



}