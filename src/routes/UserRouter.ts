import { Router } from "express";
import {body} from 'express-validator';
import { PostController } from "../controller/PostController";
import { UserController } from "../controller/UserController";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { UserValidator } from "../validators/UserValidator";
import {upload} from '../config/Multer';
import { TuterialController } from "../controller/TuterialController";

export class  userReoutes {
    public router : Router;

    constructor(){
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.deleteRoute();
        this.putRoute();
    }


    getRoutes(){
        
        // this.router.get('/signup',UserValidator.validSignUp(),GlobalMiddleware.checkError,UserController.signUp);
        this.router.get('/tutorials',TuterialController.getTuterial);

        this.router.get('/tutorials/:id',TuterialController.getTutDetailsById);

        
    }

    
    postRoutes(){
      
        this.router.post('/signup',UserValidator.validSignUp(),GlobalMiddleware.checkError,UserController.signUp);
        this.router.post('/login',UserValidator.loginVerify(),GlobalMiddleware.checkError,UserController.login);
        // post router
        this.router.post('/post',upload.array("mediafile"),UserValidator.postVerify(),GlobalMiddleware.checkError, PostController.newPost);
        this.router.post('/getPosts',GlobalMiddleware.authenticate, PostController.getPostList);
        this.router.post('/getPostById',PostController.getPostDetailsById);
        this.router.post('/tutorials',TuterialController.addTuterial);
        
    }

    deleteRoute(){
        this.router.delete('/tutorials/:id',TuterialController.deltedTut);
    }
    putRoute(){
        this.router.put('/tutorials/:id',TuterialController.updateTut);
        
    }
}


export default new userReoutes().router;