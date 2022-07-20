import { Router } from "express";
import {body} from 'express-validator';
import { UserController } from "../controller/UserController";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { UserValidator } from "../validators/UserValidator";


export class  userReoutes {
    public router : Router;

    constructor(){
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
    }


    getRoutes(){
        
        // this.router.get('/signup',UserValidator.validSignUp(),GlobalMiddleware.checkError,UserController.signUp);
    }

    postRoutes(){
      
        this.router.post('/signup',UserValidator.validSignUp(),GlobalMiddleware.checkError,UserController.signUp);
        this.router.post('/login',UserValidator.loginVerify(),GlobalMiddleware.checkError,UserController.login);
    }

}


export default new userReoutes().router;