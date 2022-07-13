
import bodyParser = require("body-parser");
import { error } from "console";
import * as express from 'express';
import * as mongoose from 'mongoose';
import { getEnviromentVariable} from './enviroments/env';
import UserRouter from './routes/UserRouter';


export class Server{
    public  app : express.Application = express();
    constructor(){
        this.connectMongodb();
        this.configBodyParser();
        this.setRoutes();
        this.erorr404Handdler();
        this.handdleErrors();
    }


    connectMongodb(){
        let databseUrl  = getEnviromentVariable().db_url;
        mongoose.connect(databseUrl).then(()=>{
            console.log("Mongo is connect...!")  
        }).catch((err)=>{
            console.log("Error: "+err);
        });

    }

    configBodyParser(){
        
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({extended:true}));  //qs lybary

        
        // this.app.use(bodyParser.json());
    }

    setRoutes(){
        this.app.use('/api/user/',UserRouter);
    }


    erorr404Handdler(){
        this.app.use((req,res)=>{
            res.status(404).send({message:'Page Not Found..!',status_code:404})
        })    
    }

    handdleErrors(){
        this.app.use((error,req,res,next)=>{

            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message:error.message || 'Something went worng Please try again..!',
                status_code:errorStatus
            })
            
        })
    }   


}