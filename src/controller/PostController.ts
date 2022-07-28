
import User from '../models/Users';
import * as Bcrypt from "bcrypt";
import * as Jwt from 'jsonwebtoken';
import { getEnviromentVariable } from "../enviroments/env";

import { Utils } from "../utils/Utils";
import { ApiResponse } from '../utils/ApiResponse';
import { resolve } from 'path';
import Post from '../models/Post';
import * as moment from 'moment';



export  class PostController{

     /**
     * New user signup process and send verification code to user email.
     * @function UserController/signUp
     * @param {object} req  - http request object.
     * @param {object} res  - http response object.
     * @param {object} next - callback function to handle next request.
     */

     static  async newPost(req,res,next){
        try{
            
            const  userCode = req.body.posted_by;
            const  post     = req.body.post;
            const  post_description = req.body.post_description;
            const  content_type =  req.body.content_type;
            // const  media    =  req.body.media;
            const  posted_by = req.body.posted_by;
          
            const media =  {
                url: req.files[0].path,
                type: req.files[0].mimetype.split("/")[0],
                thumb_url:req.files[0].path
            }
             
            
            const data ={
                
                post:post,
                post_description:post_description,
                content_type:content_type,
                media:media,
                status:'In-process',
                published_time:moment().format("YYYY-MM-DD HH:mm:ss"),
                is_publish: 1,
                posted_by:posted_by,
             
            }
            // res.send(data);
            let user = await new Post(data).save();
            ApiResponse.successResponseWithData(res,"Your post submitted successfully",user);
            

        }catch(e){
            next(e)
        }
        
     }

     static async getPostList(req,res,next){
            try{
                
                var  page = (typeof req.body.pageNumber == undefined  && typeof req.body.pageNumber == 'undefined')  ? 0 : parseInt(req.body.pageNumber) ;
                
                if (page <= 0) {
                    page = 1;
                }
                
                var itemsPerPage = 2;
                    
                let offset = (page - 1) * itemsPerPage;      
               
                let postDetails =  await Post.find().skip(offset).limit(itemsPerPage).select({'__v':0});

                let tradesCollectionCount = await Post.count()
                let totalPages = Math.ceil(tradesCollectionCount / itemsPerPage)
                let currentPage  = (offset != 0 ) ? Math.ceil(tradesCollectionCount % offset) : 1;
                
                const data = {
                    postDetails :postDetails,
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

     static async getPostDetailsById(req,res,next){
        try {
            let postId =  req.body.postId;            
            const postDetails = await  Post.findOne({postId}).select({'__v':0});
            const data = {
                postDetails:postDetails
            }
            ApiResponse.responseResult(res,data);
        } catch (error) {
            next(error)
        } 
        
     }


     static  async addTuterial(req,res,next){
        try{
            
        
            const  title     = req.body.title;
            const  description = req.body.post_description;
           
            
            const data ={
                
                title:title,
                description:description,
            }
            // res.send(data);
            let user = await new Post(data).save();
            ApiResponse.successResponseWithData(res,"Your post submitted successfully",user);
            

        }catch(e){
            next(e)
        }
        
     }
    
      
}