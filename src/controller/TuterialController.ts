
import User from '../models/Users';
import * as Bcrypt from "bcrypt";
import * as Jwt from 'jsonwebtoken';
import { getEnviromentVariable } from "../enviroments/env";

import { Utils } from "../utils/Utils";
import { ApiResponse } from '../utils/ApiResponse';
import { resolve } from 'path';
import Tuterial from '../models/Tuterials';
import * as moment from 'moment';



export  class TuterialController{

     /**
     * New user signup process and send verification code to user email.
     * @function UserController/signUp
     * @param {object} req  - http request object.
     * @param {object} res  - http response object.
     * @param {object} next - callback function to handle next request.
     */

    
     static async getTuterial(req,res,next){
            try{
                
                var  page = (typeof req.query.page == undefined  && typeof req.query.page == 'undefined')  ? 0 : parseInt(req.query.page) ;
                
                let title = req.query.title ?? '';

                if (page <= 0) {
                    page = 1;
                }
                // console.log("Query Value",req.query);
                
                var itemsPerPage = (typeof req.query.size == 'undefined') ? 2 : parseInt(req.query.size) ;
                    
                let offset = (page - 1) * itemsPerPage;      
                const search = {
                    title:title
                }
                let postDetails = {}
                console.log(title);
                postDetails =  (title =='') ? 
                    await Tuterial.find().skip(offset).limit(itemsPerPage).select({'__v':0})
                    :
                    await Tuterial.find({'title':title}).skip(offset).limit(itemsPerPage).select({'__v':0}) ;

                let tradesCollectionCount = 0;
                
                tradesCollectionCount = (title =='') ?  await Tuterial.count() :
                                        await Tuterial.find({'title':title}).count() ;

                let totalPages = Math.ceil(tradesCollectionCount / itemsPerPage)
                let currentPage  = (offset != 0 ) ? Math.ceil(tradesCollectionCount % offset) : 1;
                
                const data = {
                    tutorials :postDetails,
                    paging:{
                        total: tradesCollectionCount,
                        page: page,
                        pages: totalPages,
                    }
                }

                ApiResponse.responseResult(res,data);

            }catch(ex){
                next(ex)
            }


     }

     static async getTutDetailsById(req,res,next){
        try {
            let id =  req.params.id;         
            
            const tutDetails = await  Tuterial.findOne({"_id":id}).select({'__v':0});
            // const data = {
            //     postDetails:tutDetails
            // }
            res.send(tutDetails);
            // ApiResponse.responseResult(res,data);
        } catch (error) {
            next(error)
        } 
        
     }

     static async deltedTut(req,res,next){
        try {
            let id =  req.params.id;         
            

            
            const tutDetails = await  Tuterial.find({"_id":id}).remove();
           
            res.send(tutDetails);
            if(tutDetails){
                ApiResponse.notFoundResponse(res,"Deleted Successfully");
            }else{
                ApiResponse.ErrorResponse(res,"Something went wrong.")
            }
        } catch (error) {
            next(error)
        } 
        
     }


     static async updateTut(req,res,next){
        try {
            let id =  req.params.id;         
               
            const filter = { _id: id };
            const update = req.body ;
            console.log(update);
           
            let doc = await Tuterial.findOneAndUpdate(filter, update, {
                returnOriginal: false
            });


            // const tutDetails = await  Tuterial.find({"_id":id}).remove();
           
            res.send(doc);
            // if(tutDetails){
            //     ApiResponse.notFoundResponse(res,"Deleted Successfully");
            // }else{
            //     ApiResponse.ErrorResponse(res,"Something went wrong.")
            // }
        } catch (error) {
            next(error)
        } 
        
     }

     static  async addTuterial(req,res,next){
        try{
            
        
            const  title     = req.body.title;
            const  description = req.body.description;
           
            const data ={
                
                title:title,
                description:description,
            }
            
            let user = await new Tuterial(data).save();
            ApiResponse.successResponseWithData(res,"Added Successfully",user);
            

        }catch(e){
            next(e)
        }
        
     }
    
      
}