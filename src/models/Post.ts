import * as mongoose from 'mongoose'
import { model } from 'mongoose';

const postSchema = new mongoose.Schema({
    
    post:{type:String,required:true},
    post_description:{type:String,required:true},
    posted_by:{type:String,required:true},
    content_type:{type:String,required:true},
    media:{type:Object,required:false},
    status:{type:String,required:true},
    published_time:{type:Date,required:true},
    is_publish:{type:Number,required:true},
    created_at:{type:Date,required:true,default: new Date()},
    updated_at:{type:Date,required:true,default: new Date()},
});

export default model('posts',postSchema)