
import User from '../models/Users';
import * as Bcrypt from "bcrypt";
import * as Jwt from 'jsonwebtoken';
import { getEnviromentVariable } from "../enviroments/env";

export  class UserController{

     /**
     * New user signup process and send verification code to user email.
     * @function UserController/signUp
     * @param {object} req  - http request object.
     * @param {object} res  - http response object.
     * @param {object} next - callback function to handle next request.
     */

     static  signUp(req,res,next){
        try{
         console.log("Here..!");
        console.log(req.body);
         res.send("signUp Here..");
        }catch(e){
            next(e)
        }
        
     }

     static async login(req,resp,next){

     }


}